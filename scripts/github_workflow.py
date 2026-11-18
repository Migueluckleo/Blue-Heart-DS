#!/usr/bin/env python3
"""GitHub-only workflow session. No installed engine, bundle or persistent cache."""
from __future__ import annotations
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import shutil
import tempfile
from time import time_ns
from urllib.parse import quote
from urllib.request import HTTPRedirectHandler, Request, build_opener

REPO = 'Migueluckleo/Blue-Heart-DS'
API = 'https://api.github.com/repos/' + REPO
RAW = 'https://raw.githubusercontent.com/' + REPO
SKILLS = ('contpaqi-po-prototypes', 'contpaqi-figma-screens')
SHARED = ('scripts/github_workflow.py', 'scripts/consumer_graph.py')
CONSUMPTION = 'specs/foundations/product-consumption.contract.v1.0.0.md'
SHA = re.compile(r'[a-f0-9]{40}\Z')


def sha(data):
    return hashlib.sha256(data).hexdigest()


def encoded(value):
    return (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode()


def relative(name):
    p = PurePosixPath(name)
    if not name or p.is_absolute() or '..' in p.parts or str(p) != name or any(c in name for c in ('\\', ':', '\x00')):
        raise ValueError('Unsafe GitHub path')
    return name


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        raise ValueError('Unexpected remote redirect; check authentication')


def request(url, limit=16 * 1024 * 1024):
    req = Request(url, headers={'User-Agent': 'BlueHeart-Workflow', 'Cache-Control': 'no-cache'})
    with build_opener(NoRedirect).open(req, timeout=45) as response:
        data = response.read(limit + 1)
    if len(data) > limit:
        raise ValueError('GitHub response exceeds limit')
    return data


class GitHub:
    session_file = 'assets/github-session.json'
    repository = REPO
    delivery = 'github-direct-v2'
    engine = 'GITHUB'
    shared = SHARED
    identity_prefix = ''

    def __init__(self, commit=None, get=None):
        self.get = get or request
        self.requests = 0
        self.bytes = 0
        if commit is None:
            commit = self.api('/git/ref/heads/main?fresh=' + str(time_ns()))['object']['sha']
        if not isinstance(commit, str) or not SHA.fullmatch(commit):
            raise ValueError('Expected immutable GitHub commit')
        self.commit = commit

    def read(self, url):
        data = self.get(url)
        self.requests += 1
        self.bytes += len(data)
        return data

    def api(self, path):
        return json.loads(self.read(API + path))

    def raw(self, path):
        return self.read(self.url(path))

    def url(self, path):
        return RAW + '/' + self.commit + '/' + quote(relative(path), safe='/')

    def workflow_files(self, skill):
        roots = self.api('/contents/workflows/skills?ref=' + self.commit)
        entry = next(row for row in roots if row['name'] == skill and row['type'] == 'dir')
        tree = self.api('/git/trees/' + entry['sha'] + '?recursive=1')
        if tree.get('truncated'):
            raise ValueError('Incomplete workflow tree')
        files = {}
        for row in tree['tree']:
            if row['type'] == 'tree':
                continue
            if row['type'] != 'blob' or row['mode'] != '100644':
                raise ValueError('Unsupported workflow member')
            path = relative(row['path'])
            if not path.startswith('scripts/test-'):
                files[path] = row['sha']
        if 'WORKFLOW.md' not in files:
            raise ValueError('Missing remote workflow')
        return files


def write(base, path, data):
    relative(path)
    dest = base / path
    for parent in (dest, *dest.parents):
        if parent == base:
            break
        if parent.is_symlink():
            raise ValueError('Session symlink rejected')
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)


def session_client(runtime, get=None):
    sessions = [name for name in ('assets/github-session.json', 'assets/azure-session.json')
                if (runtime / name).is_file()]
    if len(sessions) != 1:
        raise ValueError('Expected exactly one remote session')
    session = json.loads((runtime / sessions[0]).read_bytes())
    if sessions[0] == 'assets/azure-session.json':
        from azure_workflow import AzureDevOps
        client_type = AzureDevOps
    else:
        client_type = GitHub
    if session.get('repository') != client_type.repository or session.get('delivery') != client_type.delivery:
        raise ValueError('Remote session origin mismatch')
    return session, client_type(session['commit'], get)


def source(runtime, path, get=None):
    """Fetch a required source once per job, always verify its catalog hash."""
    runtime = Path(runtime).resolve()
    relative(path)
    session, client = session_client(runtime, get)
    manifest_raw = (runtime / 'assets/snapshot-manifest.json').read_bytes()
    if sha(manifest_raw) != session['manifest_sha256']:
        raise ValueError('Session manifest changed')
    manifest = json.loads(manifest_raw)
    expected = manifest['files'].get(path)
    if not isinstance(expected, str) or not re.fullmatch('[a-f0-9]{64}', expected):
        raise ValueError('Source outside pinned catalog: ' + path)
    base = runtime / 'assets/design-system'
    dest = base / path
    for parent in (dest, *dest.parents):
        if parent == base:
            break
        if parent.is_symlink():
            raise ValueError('Session symlink rejected')
    data = dest.read_bytes() if dest.is_file() else client.raw(path)
    if sha(data) != expected:
        raise ValueError('Source integrity failure: ' + path)
    if not dest.exists():
        write(base, path, data)
        receipt = {'url': client.url(path), 'sha256': expected, 'bytes': len(data)}
        write(runtime, 'assets/source-receipts/' + sha(path.encode()) + '.json', encoded(receipt))
    return data


def start(skill, output, commit=None, get=None, *, client_type=GitHub):
    if skill not in SKILLS:
        raise ValueError('Unknown workflow')
    output = Path(output).absolute()
    if output.exists() or output.is_symlink():
        raise ValueError('Use a new work session folder')
    client = client_type(commit, get)
    pointer_raw = client.raw('catalog/current.json')
    pointer = json.loads(pointer_raw)
    identity = pointer['manifest_sha256']
    if pointer.get('schema_version') != 1 or not re.fullmatch('[a-f0-9]{64}', identity) or pointer['manifest'] != 'catalog/releases/' + identity + '/manifest.json':
        raise ValueError('Unsupported catalog identity')
    raw = client.raw(pointer['manifest'])
    manifest = json.loads(raw)
    canonical = json.dumps(manifest['files'], sort_keys=True, separators=(',', ':'), ensure_ascii=False).encode()
    if sha(raw) != identity or sha(canonical) != manifest['ds_digest'] or pointer['ds_digest'] != manifest['ds_digest']:
        raise ValueError('Catalog integrity failure')
    for path in manifest['files']:
        relative(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    stage = Path(tempfile.mkdtemp(prefix='.remote-workflow-', dir=output.parent))
    try:
        workflow_files = client.workflow_files(skill)
        prefix = 'workflows/skills/' + skill + '/'
        def fetch(item):
            path, expected = item
            data = client.raw(prefix + path)
            blob = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
            if blob != expected:
                raise ValueError('Workflow integrity failure: ' + path)
            write(stage, path, data)
        with ThreadPoolExecutor(max_workers=8) as pool:
            list(pool.map(fetch, workflow_files.items()))
        for path in client.shared:
            write(stage, path, client.raw(path))
        write(stage, 'assets/snapshot-manifest.json', raw)
        write(stage, 'assets/remote-receipt.json', pointer_raw)
        write(stage, 'references/components.json', encoded(manifest['components']))
        session = {'schema_version': 1, 'repository': client.repository, 'commit': client.commit,
                   'skill_name': client.identity_prefix + skill,
                   'manifest_sha256': identity, 'ds_digest': manifest['ds_digest'],
                   'delivery': client.delivery, 'source_reads': 'ON_DEMAND', 'offline_fallback': False}
        write(stage, client.session_file, encoded(session))
        release = {**session, 'version': manifest['package_version'], 'engine_version': client.engine + ':' + client.commit,
                   'catalog_url': client.url('catalog/current.json'),
                   'companion_skill': client.identity_prefix + next(name for name in SKILLS if name != skill)}
        write(stage, 'assets/release.json', encoded(release))
        graph = {'mode': 'fallback', 'reason': 'MISSING'}
        desc = manifest.get('consumption_graph')
        if desc:
            try:
                data = client.raw('catalog/releases/' + identity + '/consumption-graph.json')
                if sha(data) != desc['sha256'] or len(data) != desc['bytes']:
                    raise ValueError('Consumption graph integrity failure')
                # Validate through the same reader used by both remote workflows.
                import importlib.util
                spec = importlib.util.spec_from_file_location('session_consumer_graph', stage / 'scripts/consumer_graph.py')
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)
                module.validate_index(json.loads(data), manifest)
                write(stage, 'assets/consumption-graph.json', data)
                graph = {'mode': 'graph', 'reason': None}
            except (OSError, ValueError, KeyError, TypeError) as error:
                graph = {'mode': 'fallback', 'reason': str(error)}
        write(stage, 'assets/graph-receipt.json', encoded(graph))
        roles = json.loads(source(stage, 'config/figma-links.json', get))
        source(stage, CONSUMPTION, get)
        source(stage, 'specs/policies/product-consumption.v1.0.0.json', get)
        master = roles['master_destination']['file_key']
        if master == roles['root_source']['file_key']:
            raise ValueError('Figma source and master must differ')
        release['figma_library_file_key'] = master
        write(stage, 'assets/release.json', encoded(release))
        stage.rename(output)
    finally:
        if stage.exists():
            shutil.rmtree(stage)
    return {'status': 'PASS', 'runtime': str(output), **session, 'graph': graph,
            'network': {'requests': client.requests, 'bytes': client.bytes},
            'bundle_used': False, 'installed_resources_used': False}


def materialize_web(runtime, get=None):
    runtime = Path(runtime)
    manifest = json.loads((runtime / 'assets/snapshot-manifest.json').read_bytes())
    config = json.loads(source(runtime, 'config/web-inputs.json', get))
    delegated = {row['path'] for row in config['token_sources']}
    delegated.add('specs/policies/product-consumption.v1.0.0.json')
    paths = [p for p in manifest['files'] if p.startswith(('implementations/web/src/', 'implementations/web/public/assets/', 'references/'))
             or p.startswith(('specs/components/', 'specs/foundations/')) and p.endswith('.md')
             or p in delegated or p in ('config/web-inputs.json', 'implementations/web/components.registry.json',
             'implementations/web/package.json', 'registry/DEC-AI-TECHNICAL-CLOSURE-001.md', 'registry/contracts.md')]
    # Planning needs all family declarations, but delegated geometry/data stays
    # remote until a directed graph query requests a component that uses it.
    with ThreadPoolExecutor(max_workers=8) as pool:
        list(pool.map(lambda p: source(runtime, p, get), paths))
    receipt = {'status': 'PASS', 'purpose': 'WEB_BUILD_AND_PLAN', 'files': paths,
               'manifest_sha256': sha((runtime / 'assets/snapshot-manifest.json').read_bytes()),
               'bytes': sum((runtime / 'assets/design-system' / p).stat().st_size for p in paths)}
    write(runtime, 'assets/web-inputs-receipt.json', encoded(receipt))
    return {**receipt, 'files': len(paths), 'catalog_files': len(manifest['files']), 'bundle_used': False}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='action', required=True)
    new = commands.add_parser('start')
    new.add_argument('--skill', choices=SKILLS, required=True)
    new.add_argument('--output', type=Path, required=True)
    new.add_argument('--commit')
    fetch = commands.add_parser('read')
    fetch.add_argument('--runtime', type=Path, required=True)
    fetch.add_argument('--path', required=True)
    web = commands.add_parser('web')
    web.add_argument('--runtime', type=Path, required=True)
    args = parser.parse_args()
    try:
        if args.action == 'start':
            result = start(args.skill, args.output, args.commit)
        elif args.action == 'web':
            result = materialize_web(args.runtime)
        else:
            data = source(args.runtime, args.path)
            result = {'status': 'PASS', 'path': args.path, 'sha256': sha(data), 'text': data.decode('utf-8')}
    except (OSError, ValueError, KeyError, TypeError, StopIteration) as error:
        result = {'status': 'BLOCKED', 'error': str(error), 'offline_fallback': False}
    print(json.dumps(result, ensure_ascii=False))
    return 1 if result['status'] == 'BLOCKED' else 0


if __name__ == '__main__':
    raise SystemExit(main())
