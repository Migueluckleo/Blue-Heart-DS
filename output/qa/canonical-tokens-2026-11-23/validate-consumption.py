"""Verify the unchanged active source stack, catalog, generated data and IDs."""
import hashlib
import json
import sys
import tarfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
digest = lambda b: hashlib.sha256(b).hexdigest()
config = json.loads((ROOT/'config/web-inputs.json').read_text())
paths = [e['path'] for e in config['token_sources']]
sources = []
for entry in config['token_sources']:
    actual = digest((ROOT/entry['path']).read_bytes())
    sources.append({'path': entry['path'], 'expected': entry['sha256'], 'actual': actual, 'match': actual == entry['sha256']})

configured = set(paths)
not_configured = []
for path in sorted((ROOT/'specs').rglob('*.json')):
    data = json.loads(path.read_text())
    token_data = ('collections' in data and any('variables' in c for c in data['collections'])) or ('variables' in data and ('collection' in data or 'tokens' in path.name)) or 'selectorVisibilityPolicy' in data
    if token_data and path.relative_to(ROOT).as_posix() not in configured:
        not_configured.append(path.relative_to(ROOT).as_posix())

sys.path.insert(0, str(ROOT/'implementations/web/scripts'))
import tokens
generated = tokens.build()
generation = {path: (ROOT/'implementations/web'/path).read_text() == content for path, content in generated.items()}
paths += ['implementations/web/src/generated/tokens.manifest.json', 'implementations/web/src/generated/tokens.css']
current = json.loads((ROOT/'catalog/current.json').read_text())
manifest_raw = (ROOT/current['manifest']).read_bytes()
manifest = json.loads(manifest_raw)
catalog = {
    'ds_digest': current['ds_digest'],
    'manifest_sha256': current['manifest_sha256'],
    'manifest_hash_match': digest(manifest_raw) == current['manifest_sha256'],
    'bundle_hash_match': digest((ROOT/current['bundle']).read_bytes()) == current['bundle_sha256'],
    'paths': [],
}
with tarfile.open(ROOT/current['bundle']) as bundle:
    for path in paths:
        h = digest((ROOT/path).read_bytes())
        catalog['paths'].append({'path': path, 'sha256': h, 'manifest_match': manifest['files'].get(path) == h, 'bundle_match': digest(bundle.extractfile(path).read()) == h})

capture = json.loads((HERE/'figma-variables.json').read_text())
by_id = {v['id']: v for v in capture['variables']}
caution_readback = json.loads((ROOT/'implementations/figma/caution-2026-11-23/readback.json').read_text())
caution_ids = []
for variable in caution_readback['variables']:
    actual = by_id.get(variable['id'])
    caution_ids.append({'logical_id': variable['logicalId'], 'target_id': variable['id'], 'match': bool(actual and actual['name'] == variable['name'] and actual['codeSyntax'] == variable['codeSyntax'] and actual['valuesByMode'] == variable['valuesByMode'] and actual['scopes'] == variable['scopes'])})

collections = {c['name']: c for c in capture['collections']}
mode_checks = {name: [m['name'] for m in collections[name]['modes']] == modes for name, modes in [('primitives', ['Value']), ('semantic', ['Value']), ('component', config['modes'])]}
result = {
    'kind': 'CURRENT_TOKEN_CONSUMPTION_AUDIT', 'date': '2026-11-23',
    'canonical_sources': sources, 'unconfigured_token_data': not_configured,
    'generated_files_match': generation, 'catalog': catalog,
    'caution_recorded_identity': caution_ids, 'collection_mode_checks': mode_checks,
    'figma_local_remote_variables': [v['id'] for v in capture['variables'] if v['remote']],
    'source_changes': [], 'installations': [], 'publications': [],
}
(HERE/'consumption.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({'source_hashes': len(sources), 'source_hash_errors': [s['path'] for s in sources if not s['match']], 'unconfigured_token_data': not_configured, 'generated_match': generation, 'catalog_paths_checked': len(catalog['paths']), 'catalog_errors': [p['path'] for p in catalog['paths'] if not p['manifest_match'] or not p['bundle_match']], 'catalog_manifest_hash_match': catalog['manifest_hash_match'], 'catalog_bundle_hash_match': catalog['bundle_hash_match'], 'caution_identity_count': len(caution_ids), 'caution_identity_errors': [c for c in caution_ids if not c['match']], 'collection_mode_checks': mode_checks}, ensure_ascii=False))
