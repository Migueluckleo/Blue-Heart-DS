"""Local Graphify projection and offline publication gate; never performs semantic extraction."""
from __future__ import annotations
import argparse
import json
from pathlib import Path
import re
import subprocess
from ds_session import cached
from urllib.parse import unquote
from ds_core import yaml_documents, markdown_links, local_target, read_json, explicit_yaml_file_references
from ds_skills import source_inputs, safe, digest, compact
from consumer_graph import PUBLIC_ROOTS, validate_index

PREPARED = 'catalog/prepared/consumption-graph.json'
ATTESTATION = 'catalog/prepared/consumption-proof.json'
TOOLING = ['schemas/consumption-query.v1.schema.json','scripts/ds_consumption.py','scripts/consumer_graph.py','scripts/ds_remote.py','scripts/ds_skills.py',
           'scripts/ds_core.py','scripts/ds_graph_engine.py', 'scripts/ds_graph.py', 'scripts/ds_incremental.py',
    'scripts/ds_session.py', 'scripts/ds_close.py','scripts/ds_yaml.rb','config/ds-skills.json','config/ds-project.json']


def tooling_hashes(root):
    return {p:digest(safe(root,p).read_bytes()) for p in TOOLING}


def reference_targets(root, path, text):
    result = set(explicit_yaml_file_references(text))
    for line, target in markdown_links(text):
        dest = local_target(path,target,root)
        if dest:
            result.add((line,dest))
    for line, value in enumerate(text.splitlines(),1):
        for literal in re.findall(r'(?<!`)`([^`\n]+)`(?!`)',value):
            if not re.fullmatch(r'[\w./-]+\.(?:md|json|yaml|yml)',literal) or any(len(part)>255 for part in literal.split('/')):
                continue
            if '\\' in literal or '..' in Path(literal).parts or literal.startswith('/'):
                continue
            candidates = {literal, (Path(path).parent / literal).as_posix()}
            matches = {p for p in candidates if safe(root,p).is_file()}
            if len(matches) == 1:
                result.add((line,matches.pop()))
    return result


def location(value):
    # Historical Graphify outputs sometimes store a one-based line as an integer.
    return 'L'+str(value) if type(value) is int and value > 0 else value if isinstance(value,str) else ''


def declared_dependency_targets(texts, metadata, components):
    """Resolve only contract IDs explicitly declared in root YAML metadata."""
    targets = {c['id']: c['contract'] for c in components}
    for path, row in metadata.items():
        meta = row.get('value') or {}
        if path.startswith('specs/foundations/') and meta.get('contract_id'):
            targets[meta['contract_id']] = path
    references = {}
    for path, row in metadata.items():
        dependencies = (row.get('value') or {}).get('dependencies', [])
        if not dependencies:
            continue
        match = re.search(r'^dependencies\s*:', texts[path], re.M)
        if not isinstance(dependencies, list) or match is None:
            raise ValueError('Invalid contract dependencies: ' + path)
        line = texts[path].count('\n', 0, match.start()) + 1
        for dependency in dependencies:
            target = targets.get(dependency)
            if target not in texts:
                raise ValueError(f'Unresolved declared dependency {dependency} in {path}')
            references.setdefault(path, set()).add((line, target))
    return references


def project(root, state, graph, commit):
    """Project only independently verifiable, public fields; no free graph text escapes."""
    root = Path(root)
    paths = {p for p in state['files'] if p.startswith(PUBLIC_ROOTS) and p.endswith(('.md','.json','.yaml'))}
    nodes = {n['id']:n for n in graph['nodes']}
    if len(nodes) != len(graph['nodes']):
        raise ValueError('Duplicate graph IDs')
    edges = graph.get('links',graph.get('edges',[]))
    if any(e['source'] not in nodes or e['target'] not in nodes for e in edges):
        raise ValueError('Broken graph endpoints')
    represented = {n.get('source_file') for n in nodes.values() if n.get('source_file') in paths and n.get('sha256') == state['files'][n['source_file']]}
    metadata = yaml_documents(sorted(represented),root)
    if any(row.get('errors') for row in metadata.values()):
        raise ValueError('Invalid public document metadata')
    texts = {p:safe(root,p).read_text() for p in represented}
    documents = {}
    for p in sorted(represented):
        meta = metadata.get(p,{}).get('value',{}) or metadata.get(p,{}).get('metadata',{}) or {}
        # yaml_documents exposes metadata directly in its data field (see below).
        meta = metadata.get(p,{}).get('data',meta) or {}
        version = meta.get('version')
        if version is not None and not re.fullmatch(r'\d+(?:\.\d+){1,3}',str(version)):
            version = None
        status = meta.get('status','UNRESOLVED')
        if status not in {'APPROVED','DELEGATED_FOR_BUILD','DRAFT','IN_REVIEW','REJECTED','SUPERSEDED','CONFLICT'}:
            status = 'UNRESOLVED'
        documents[p] = {'sha256':state['files'][p],'version':version,'status':status,'sections':[]}
    # Only section locations, never semantic summaries or labels from internal graph data.
    section_keys = set()
    for n in nodes.values():
        p = n.get('source_file'); loc = location(n.get('source_location'))
        if p not in documents or not re.fullmatch(r'L\d+',loc):
            continue
        line = int(loc[1:]); lines = texts[p].splitlines()
        if line < 1 or line > len(lines) or not lines[line-1].startswith('#'):
            continue
        heading = lines[line-1].lower()
        kind = next((k for k,term in [('variants','variant'),('states','state'),('tokens','token')] if term in heading),None)
        if kind and (p,kind,line) not in section_keys:
            documents[p]['sections'].append({'kind':kind,'line':line});section_keys.add((p,kind,line))
    for doc in documents.values():
        doc['sections'].sort(key=lambda s:(s['line'],s['kind']))
    refs = {p:reference_targets(root,p,texts[p]) for p in documents if p.endswith('.md')}
    declared = declared_dependency_targets(texts, metadata, state['components'])
    relationships = {(path, target, line) for path, refs_for_path in declared.items() for line, target in refs_for_path}
    for edge in edges:
        a,b = nodes[edge['source']],nodes[edge['target']]
        pa,pb = a.get('source_file'),b.get('source_file')
        if pa == pb or pa not in documents or pb not in documents:
            continue
        for ev in edge.get('evidence_records',[edge]):
            if ev.get('relation') not in {'references','cites'} or ev.get('confidence') != 'EXTRACTED' or ev.get('confidence_score') != 1:
                continue
            p = ev.get('source_file'); loc = location(ev.get('source_location'))
            if p not in {pa,pb} or not re.fullmatch(r'L\d+',loc):
                continue
            target = pb if p == pa else pa;line = int(loc[1:])
            if (line,target) in refs.get(p,set()):
                relationships.add((p,target,line))
    tokens = {}
    for n in nodes.values():
        p = n.get('source_file'); loc = location(n.get('source_location'))
        if p not in documents or not p.endswith('.json') or not re.fullmatch(r'JSON:/(?:collections/\d+/)?variables/\d+',loc):
            continue
        value = json.loads(texts[p])
        pointer = loc[5:]
        for part in pointer.strip('/').split('/'):
            value = value[int(part)] if isinstance(value,list) else value[part]
        if isinstance(value,dict) and value.get('name') == n.get('label'):
            tokens[p+'#'+pointer] = {'source':p,'pointer':pointer,'name':value['name']}
    index = {'schema_version':1,'status':'CURRENT','ds_digest':state['ds_digest'], 'source_commit':commit,
             'source_graph_sha256':digest(compact(graph)), 'documents':documents, 'tokens':dict(sorted(tokens.items())),
             'relations':[{'source':a,'target':b,'line':line,'relation':'references','evidence':'EXTRACTED','confidence':1}
                          for a,b,line in sorted(relationships)],
             'components':{c['id']:{'roots':[c['contract'],*c['amendments']],
                                   'covered':all(p in documents for p in [c['contract'],*c['amendments']])}
                           for c in state['components']}}
    validate_index(index,state)
    return index


@cached
def validate_sources(root,state,index):
    validate_index(index,state)
    for path,node in index['documents'].items():
        if digest(safe(root,path).read_bytes()) != node['sha256']:
            raise ValueError('Source differs from preparation')
    metadata = yaml_documents(sorted(index['documents']),root)
    texts = {path: safe(root,path).read_text() for path in metadata}
    declared = declared_dependency_targets(texts, metadata, state['components'])
    for path,node in index['documents'].items():
        meta = metadata.get(path,{}).get('value',{}) or {}
        version = meta.get('version')
        if version is not None and not re.fullmatch(r'\d+(?:\.\d+){1,3}',str(version)): version = None
        status = meta.get('status','UNRESOLVED')
        if status not in {'APPROVED','DELEGATED_FOR_BUILD','DRAFT','IN_REVIEW','REJECTED','SUPERSEDED','CONFLICT'}: status = 'UNRESOLVED'
        if node['version'] != version or node['status'] != status:
            raise ValueError('Document metadata differs from source')
        lines = safe(root,path).read_text().splitlines()
        for section in node['sections']:
            line = section['line']
            term = {'variants':'variant','states':'state','tokens':'token'}[section['kind']]
            if line > len(lines) or not lines[line-1].startswith('#') or term not in lines[line-1].lower():
                raise ValueError('Unverifiable section')
    token_docs = {}
    for token in index['tokens'].values():
        p = token['source']
        if p not in token_docs: token_docs[p] = read_json(safe(root,p))
        value = token_docs[p]
        for part in token['pointer'].strip('/').split('/'):
            value = value[int(part)] if isinstance(value,list) else value[part]
        if value.get('name') != token['name']:
            raise ValueError('Unverifiable token')
    refs = {}
    for edge in index['relations']:
        p = edge['source']
        if p not in refs:
            refs[p] = reference_targets(root,p,safe(root,p).read_text()) | declared.get(p, set())
        if (edge['line'],edge['target']) not in refs[p]:
            raise ValueError('Unverifiable public relationship')
    actual = {(edge['source'], edge['line'], edge['target']) for edge in index['relations']}
    if any((path, line, target) not in actual for path, values in declared.items() for line, target in values):
        raise ValueError('Declared dependency missing from consumption graph')
    return index


def prepare(root):
    from ds_graph import check_graph
    root = Path(root).resolve()
    # ds_graph binds ROOT at import time; forbid checking a different checkout accidentally.
    from ds_core import ROOT
    if root != ROOT:
        raise ValueError('Preparation must run in this checkout')
    gate = check_graph(read_json(root/'config/ds-project.json'))
    publication = root/'graphify-out/PUBLICATION-STATE.json'
    if publication.exists() and read_json(publication).get('status') != 'CURRENT':
        raise ValueError('Publication graph is not CURRENT')
    if gate['status'] != 'CURRENT':
        raise ValueError('Graph is not CURRENT: '+json.dumps(gate['errors']))
    state = source_inputs(root)
    raw = safe(root,'graphify-out/graph.json').read_bytes()
    project_config = read_json(root/'config/ds-project.json')
    commit = None if project_config.get('source_mode') == 'local' else subprocess.check_output(
        ['git','rev-parse','HEAD'],cwd=root,text=True).strip()
    index = project(root,state,json.loads(raw),commit)
    index['source_graph_sha256'] = digest(raw)
    validate_sources(root,state,index)
    data = compact(index)
    proof = {'schema_version':1,'status':'CURRENT','index_sha256':digest(data),'ds_digest':state['ds_digest'],
             'source_commit':commit,'source_graph_sha256':digest(raw),'tooling':tooling_hashes(root)}
    if source_inputs(root)['ds_digest'] != state['ds_digest'] or check_graph(read_json(root/'config/ds-project.json'))['status'] != 'CURRENT':
        raise ValueError('Sources changed during preparation')
    for name,content in [(PREPARED,data),(ATTESTATION,compact(proof))]:
        target = safe(root,name);target.parent.mkdir(parents=True,exist_ok=True)
        temp = target.with_suffix('.tmp');temp.write_bytes(content);temp.replace(target)
    return {'status':'CURRENT','index_bytes':len(data),'documents':len(index['documents']),'relations':len(index['relations'])}


def prepared(root,state=None):
    root = Path(root).resolve();state = state or source_inputs(root)
    raw = safe(root,PREPARED).read_bytes();proof = read_json(safe(root,ATTESTATION))
    index = json.loads(raw)
    if proof.get('schema_version') != 1 or proof.get('status') != 'CURRENT' or proof.get('index_sha256') != digest(raw) or proof.get('ds_digest') != state['ds_digest'] or proof.get('tooling') != tooling_hashes(root):
        raise ValueError('Prepared consumption index is stale or altered; run local preparation')
    if proof.get('source_commit') != index.get('source_commit') or proof.get('source_graph_sha256') != index.get('source_graph_sha256'):
        raise ValueError('Preparation provenance mismatch')
    if digest(safe(root,'graphify-out/graph.json').read_bytes()) != proof['source_graph_sha256']:
        raise ValueError('Graph bytes changed since consumption preparation')
    validate_sources(root,state,index)
    return raw

def publication_check(root):
    """Explicit publication holds outrank a technically valid prepared snapshot."""
    state=source_inputs(root)
    if state['config'].get('delivery') == 'local-catalog-v1':
        raise ValueError('PUBLICATION_HOLD: local catalog')
    raw=prepared(root,state)
    metadata=yaml_documents(sorted(state['files']),Path(root))
    holds=[path for path,row in metadata.items()
           if isinstance(row.get('value'),dict) and str(row['value'].get('publication_policy','')).startswith('HOLD')]
    if holds:
        raise ValueError('PUBLICATION_HOLD: '+', '.join(sorted(holds)))
    return {'status':'CURRENT','index_bytes':len(raw),'publication_holds':[]}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    mode=parser.add_mutually_exclusive_group()
    mode.add_argument('--prepare',action='store_true')
    mode.add_argument('--publication-check',action='store_true')
    args = parser.parse_args()
    from ds_core import ROOT
    try:
        result = prepare(ROOT) if args.prepare else publication_check(ROOT) if args.publication_check else {'status':'CURRENT','index_bytes':len(prepared(ROOT))}
    except (ValueError,OSError,KeyError,TypeError,IndexError,subprocess.TimeoutExpired) as error:
        result = {'status':'BLOCKED','error':str(error)}
    print(json.dumps(result,ensure_ascii=False))
    raise SystemExit(0 if result['status'] == 'CURRENT' else 1)
