"""Portable Graph-First reader. Single maintained source, packaged into both engines."""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import time

SCHEMA = 1
INTENTS = {'component', 'dependencies', 'evidence', 'tokens', 'variants', 'states'}
PUBLIC_ROOTS = ('specs/', 'drafts/contracts/', 'sources/inventories/')
HEX = re.compile(r'[a-f0-9]{64}\Z')


def canonical(value):
    return json.dumps(value, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode()


def sha(value):
    return hashlib.sha256(value).hexdigest()


def explicit_status(text):
    """Read only an unambiguous root status scalar; never infer approval."""
    lines = text.lstrip('\ufeff').splitlines()
    if not lines or lines[0].strip() != '---':
        return None
    statuses = []
    for line in lines[1:]:
        if line.strip() in {'---', '...'}:
            break
        match = re.match(r'^(?:status|"status"|\'status\')\s*:\s*(.*?)\s*$', line)
        if not match:
            continue
        scalar = re.fullmatch(r'(?:([A-Z_]+)|"([A-Z_]+)"|\'([A-Z_]+)\')(?:\s+#.*)?', match[1])
        if not scalar:
            raise ValueError('STATUS_UNRESOLVED')
        statuses.append(next(v for v in scalar.groups() if v is not None))
    if len(statuses) > 1:
        raise ValueError('STATUS_UNRESOLVED')
    return statuses[0] if statuses else None


def parse(data):
    def pairs(items):
        result = {}
        for k, v in items:
            if k in result:
                raise ValueError('INTEGRITY: duplicate key')
            result[k] = v
        return result
    return json.loads(data, object_pairs_hook=pairs)


def safe(root, name):
    p = PurePosixPath(name)
    if not name or p.is_absolute() or '..' in p.parts or str(p) != name or '\\' in name or ':' in name or '\x00' in name:
        raise ValueError('INTEGRITY: unsafe path')
    dest = root / name
    for ancestor in (dest, *dest.parents):
        if ancestor == root:
            break
        if ancestor.is_symlink():
            raise ValueError('INTEGRITY: symlink')
    if not dest.resolve().is_relative_to(root.resolve()):
        raise ValueError('INTEGRITY: outside snapshot')
    return dest


def validate_index(index, manifest):
    if not isinstance(index, dict) or index.get('schema_version') != SCHEMA:
        raise ValueError('INCOMPATIBLE')
    if index.get('status') != 'CURRENT' or index.get('ds_digest') != manifest['ds_digest']:
        raise ValueError('STALE')
    if set(index) != {'schema_version','status','ds_digest','source_commit','source_graph_sha256','documents','relations','components','tokens'}:
        raise ValueError('INTEGRITY: unexpected fields')
    if not isinstance(index['source_graph_sha256'],str) or (index['source_commit'] is not None and not isinstance(index['source_commit'],str)):
        raise ValueError('INTEGRITY: provenance types')
    if (index['source_commit'] is not None and not re.fullmatch('[a-f0-9]{40,64}', index['source_commit'])) or not HEX.fullmatch(index['source_graph_sha256']):
        raise ValueError('INTEGRITY: provenance')
    docs = index['documents']
    if not isinstance(docs, dict) or (not docs and manifest['components']):
        raise ValueError('COVERAGE_GAP')
    for path, node in docs.items():
        safe(Path('.'), path)
        if not path.startswith(PUBLIC_ROOTS) or path not in manifest['files']:
            raise ValueError('INTEGRITY: nonpublic node')
        if not isinstance(node,dict) or set(node) != {'sha256','version','status','sections'} or node['sha256'] != manifest['files'][path]:
            raise ValueError('INTEGRITY: node schema/hash')
        if node['version'] is not None and not re.fullmatch(r'\d+(?:\.\d+){1,3}', str(node['version'])):
            raise ValueError('INTEGRITY: version')
        if not isinstance(node['status'],str) or node['status'] not in {'APPROVED','DELEGATED_FOR_BUILD','DRAFT','IN_REVIEW','REJECTED','SUPERSEDED','UNRESOLVED','CONFLICT'}:
            raise ValueError('INTEGRITY: status')
        if not isinstance(node['sections'],list):
            raise ValueError('INTEGRITY: sections')
        for section in node['sections']:
            if not isinstance(section,dict) or set(section) != {'kind','line'} or not isinstance(section['kind'],str) or section['kind'] not in {'variants','states','tokens'} or type(section['line']) is not int or section['line'] < 1:
                raise ValueError('INTEGRITY: section')
    if not isinstance(index['relations'],list) or not isinstance(index['tokens'],dict) or not isinstance(index['components'],dict):
        raise ValueError('INTEGRITY: collection types')
    seen = set()
    for edge in index['relations']:
        if not isinstance(edge,dict) or set(edge) != {'source','target','line','relation','evidence','confidence'}:
            raise ValueError('INTEGRITY: edge schema')
        if not isinstance(edge['source'],str) or not isinstance(edge['target'],str) or edge['source'] not in docs or edge['target'] not in docs or type(edge['line']) is not int or edge['line'] < 1:
            raise ValueError('INTEGRITY: endpoint/location')
        if edge['relation'] != 'references' or edge['evidence'] != 'EXTRACTED' or edge['confidence'] != 1:
            raise ValueError('INTEGRITY: unsupported evidence')
        key = (edge['source'],edge['target'],edge['line'])
        if key in seen:
            raise ValueError('INTEGRITY: duplicate edge')
        seen.add(key)
    for identity, token in index['tokens'].items():
        if not isinstance(token,dict) or set(token) != {'source','pointer','name'} or not isinstance(token['source'],str) or not isinstance(token['pointer'],str) or token['source'] not in docs or not token['source'].endswith('.json') or not isinstance(token['name'],str) or not token['name'] or len(token['name']) > 256:
            raise ValueError('INTEGRITY: token')
        if not re.fullmatch(r'/(?:collections/\d+/)?variables/\d+', token['pointer']) or identity != token['source'] + '#' + token['pointer']:
            raise ValueError('INTEGRITY: token pointer')
    expected = {c['id']: [c['contract'], *c['amendments']] for c in manifest['components']}
    if set(index['components']) != set(expected):
        raise ValueError('COVERAGE_GAP: component map')
    for identity, coverage in index['components'].items():
        if not isinstance(coverage,dict) or set(coverage) != {'roots','covered'} or coverage['roots'] != expected[identity] or type(coverage['covered']) is not bool:
            raise ValueError('INTEGRITY: component mapping')
        if coverage['covered'] != all(p in docs for p in coverage['roots']):
            raise ValueError('INTEGRITY: coverage declaration')
    return index


class Reader:
    def __init__(self, runtime):
        self.runtime = Path(runtime).resolve()
        self.snapshot = safe(self.runtime, 'assets/design-system')
        raw = safe(self.runtime, 'assets/snapshot-manifest.json').read_bytes()
        self.manifest = parse(raw)
        receipt = parse(safe(self.runtime, 'assets/remote-receipt.json').read_bytes())
        if not isinstance(self.manifest,dict) or not isinstance(receipt,dict):
            raise ValueError('INTEGRITY: manifest/receipt type')
        if not isinstance(self.manifest.get('files'),dict) or not isinstance(self.manifest.get('components'),list):
            raise ValueError('INTEGRITY: manifest collections')
        self.identity = sha(raw)
        if receipt.get('manifest_sha256') != self.identity or self.manifest.get('schema_version') != 1:
            raise ValueError('INTEGRITY: snapshot identity')
        if sha(canonical(self.manifest['files'])) != self.manifest['ds_digest'] or receipt.get('ds_digest') != self.manifest['ds_digest']:
            raise ValueError('INTEGRITY: snapshot digest')
        self.index_bytes = 0
        self.index = None
        self.reason = 'MISSING'
        descriptor = self.manifest.get('consumption_graph')
        if descriptor:
            try:
                if not isinstance(descriptor,dict) or descriptor.get('schema_version') != SCHEMA:
                    raise ValueError('INCOMPATIBLE')
                raw = safe(self.runtime, 'assets/consumption-graph.json').read_bytes()
                self.index_bytes = len(raw)
                if len(raw) > 8 * 1024 * 1024 or sha(raw) != descriptor['sha256'] or len(raw) != descriptor['bytes']:
                    raise ValueError('INTEGRITY')
                self.index = validate_index(parse(raw), self.manifest)
                self.reason = None
            except (ValueError, OSError, KeyError, TypeError) as error:
                self.reason = str(error).split(':')[0] if isinstance(error, ValueError) else 'INTEGRITY'

    def query(self, request):
        start = time.perf_counter()
        result = {'schema_version':SCHEMA, 'status':'BLOCKED', 'mode':'graph' if self.index else 'fallback',
                  'reason':self.reason, 'snapshot':self.identity, 'nodes':[], 'relations':[], 'documents':[], 'tokens':[],
                  'metrics':{'files_read':0,'bytes_read':0,'index_bytes':self.index_bytes,'nodes_visited':0}}
        try:
            if not isinstance(request, dict) or request.get('schema_version') != SCHEMA or not isinstance(request.get('intent'),str) or request.get('intent') not in INTENTS or not isinstance(request.get('component'), str):
                raise ValueError('INVALID_QUERY')
            if set(request) - {'schema_version','component','intent','token','max_documents','max_bytes'}:
                raise ValueError('INVALID_QUERY')
            limit = request.get('max_documents', 32)
            byte_limit = request.get('max_bytes', 2000000)
            if type(limit) is not int or not 1 <= limit <= 128 or type(byte_limit) is not int or not 1 <= byte_limit <= 2000000:
                raise ValueError('INVALID_QUERY')
            matches = [c for c in self.manifest['components'] if c['id'] == request['component']]
            if not matches:
                raise ValueError('UNKNOWN_COMPONENT')
            if len(matches) != 1:
                raise ValueError('CONFLICT')
            component = matches[0]
            roots = [component['contract'], *component['amendments']]
            if self.index and not self.index['components'][component['id']]['covered']:
                result.update(mode='fallback', reason='COVERAGE_GAP')
            use_graph = result['mode'] == 'graph'
            paths = set(roots)
            requested_token = request.get('token')
            if requested_token is not None and (not isinstance(requested_token,str) or not requested_token):
                raise ValueError('INVALID_QUERY')
            if use_graph:
                # One explicit dependency hop, never traverse a global registry or all families.
                result['relations'] = [e for e in self.index['relations'] if e['source'] in paths]
                paths.update(e['target'] for e in result['relations'])
                if request['intent'] == 'dependencies':
                    for related in self.manifest['components']:
                        if related['contract'] in paths:
                            paths.update(related['amendments'])
                if request['intent'] == 'tokens':
                    foundation_data = [e for e in self.index['relations']
                                       if e['source'] in paths and e['source'].startswith('specs/foundations/')
                                       and e['target'].endswith('.json')]
                    result['relations'].extend(e for e in foundation_data if e not in result['relations'])
                    paths.update(e['target'] for e in foundation_data)
            selected_tokens = {}
            if use_graph and request['intent'] == 'tokens':
                selected_tokens = {k:t for k,t in self.index['tokens'].items()
                                   if t['source'] in paths and (requested_token is None or requested_token in {k,t['name']})}
                if requested_token and not selected_tokens:
                    raise ValueError('COVERAGE_GAP')
                if requested_token and len(selected_tokens) != 1:
                    raise ValueError('CONFLICT')
            if len(paths) > limit:
                raise ValueError('LIMIT_EXCEEDED')
            verified_texts = []
            for path in sorted(paths,key=lambda p:(p.endswith('.json'),p)):
                if path not in self.manifest['files']:
                    raise ValueError('INTEGRITY')
                data = safe(self.snapshot, path).read_bytes()
                result['metrics']['files_read'] += 1
                result['metrics']['bytes_read'] += len(data)
                if result['metrics']['bytes_read'] > byte_limit:
                    raise ValueError('LIMIT_EXCEEDED')
                if sha(data) != self.manifest['files'][path]:
                    raise ValueError('INTEGRITY')
                node = self.index['documents'].get(path) if use_graph else None
                if node and path in roots and node['status'] in {'SUPERSEDED','REJECTED'}:
                    raise ValueError('OBSOLETE_REFERENCE')
                if node and node['status'] == 'CONFLICT':
                    raise ValueError('CONFLICT')
                result['nodes'].append({'id':path,'source':path,'location':'L1',
                    'version':node['version'] if node else None,'document_status':node['status'] if node else 'UNRESOLVED',
                    'evidence':'EXTRACTED' if node else 'VERIFIED_SNAPSHOT','confidence':1,
                    'sections':node['sections'] if node else []})
                text = data.decode('utf-8')
                status = explicit_status(text) if path.endswith(('.md','.yaml','.yml')) else None
                if status == 'CONFLICT':
                    raise ValueError('CONFLICT')
                if path in roots and status in {'SUPERSEDED','REJECTED'}:
                    raise ValueError('OBSOLETE_REFERENCE')
                if not path.endswith('.json'):
                    verified_texts.append(text)
                if request['intent'] == 'tokens' and path.endswith('.json') and use_graph:
                    obj = parse(data)
                    for identity,token in selected_tokens.items():
                        if token['source'] != path: continue
                        if requested_token is None and not any(token['name'] in text for text in verified_texts): continue
                        value = obj
                        for part in token['pointer'].strip('/').split('/'):
                            value = value[int(part)] if isinstance(value,list) else value[part]
                        if not isinstance(value,dict) or value.get('name') != token['name']:
                            raise ValueError('INTEGRITY')
                        result['tokens'].append({'id':identity, 'source':path, 'location':'JSON:'+token['pointer'],
                                                 'evidence':'EXTRACTED','confidence':1,'value':value})
                    text = ''  # Return only addressed token objects, not the whole inventory.
                if use_graph and request['intent'] in {'variants','states'} and path == component['contract']:
                    sections = [sec for sec in node['sections'] if sec['kind'] == request['intent']]
                    if not sections:
                        raise ValueError('COVERAGE_GAP')
                    lines = text.splitlines(); chunks = []
                    for sec in sections:
                        begin = sec['line'] - 1; end = begin + 1
                        while end < len(lines) and not lines[end].startswith('## '): end += 1
                        chunks.append('\n'.join(lines[begin:end]))
                    text = '\n\n'.join(chunks)
                result['documents'].append({'path':path,'sha256':self.manifest['files'][path], 'text':text})
            if use_graph and request['intent'] == 'tokens' and not result['tokens']:
                raise ValueError('COVERAGE_GAP')
            result['metrics']['nodes_visited'] = len(paths) if use_graph else 0
            result['status'] = 'PASS' if use_graph else 'FALLBACK'
            result['coverage'] = 'DIRECT_REFERENCES' if use_graph else 'CONTRACT_AND_AMENDMENTS_ONLY'
        except (ValueError, KeyError, OSError, TypeError, IndexError, UnicodeError) as error:
            result.update(status='BLOCKED', reason=(str(error).split(':')[0] if isinstance(error,ValueError) else 'INTEGRITY'), nodes=[],relations=[],documents=[],tokens=[])
        result['metrics']['duration_ms'] = round((time.perf_counter() - start) * 1000, 3)
        result['metrics']['context_bytes'] = len(canonical({'nodes':result['nodes'],'relations':result['relations'],'documents':result['documents'],'tokens':result['tokens']}))
        return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--runtime', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--component', required=True)
    parser.add_argument('--token')
    parser.add_argument('--intent', choices=sorted(INTENTS), default='component')
    parser.add_argument('--max-documents', type=int, default=32)
    parser.add_argument('--max-bytes', type=int, default=2000000)
    args = parser.parse_args()
    try:
        result = Reader(args.runtime).query({'schema_version':1,'component':args.component,'intent':args.intent,
                                            'token':args.token,'max_documents':args.max_documents,'max_bytes':args.max_bytes})
    except (ValueError, KeyError, OSError, TypeError) as error:
        result = {'schema_version':1,'status':'BLOCKED','reason':str(error)}
    print(json.dumps(result,ensure_ascii=False))
    return 1 if result['status'] == 'BLOCKED' else 0

if __name__ == '__main__':
    raise SystemExit(main())
