from pathlib import Path
import hashlib,json,subprocess,sys

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda p:json.loads((ROOT/p).read_text())
closure=read('graphify-out/ds-closure.json')
assert closure['status']=='CURRENT' and closure['run']=='2026-11-23-body-disabled-final'
pointer=read('catalog/current.json');manifest=read(pointer['manifest'])
assert sha((ROOT/pointer['manifest']).read_bytes())==pointer['manifest_sha256']
assert pointer['ds_digest']==manifest['ds_digest']
for path,h in manifest['files'].items():assert sha((ROOT/path).read_bytes())==h,path
config=read('config/web-inputs.json')
for e in config['token_sources']:assert sha((ROOT/e['path']).read_bytes())==e['sha256'],e['path']
policy=read('specs/policies/product-consumption.v1.0.0.json')
expected=set()
for entry in config['token_sources']:
 data=read(entry['path'])
 if any(c['name']=='component' and any(v['name'].startswith('body/') for v in c['variables']) for c in data.get('collections',[])):expected.add(entry['path'])
assert set(policy['body']['data_sources'])==expected
tokens=read('implementations/web/src/generated/tokens.manifest.json')['tokens']
assert len(tokens)==1536 and sum(t['collection']=='component' and t['name'].startswith('body/') for t in tokens)==61
assert sum('caution' in t['name'] for t in tokens)==21
comparison=read('qa/implementations/body-disabled-2026-11-23/canonical-validation.json')
assert not comparison['differences'] and not comparison['alias_or_mode_failures'] and comparison['mode_values_resolved']==5064
result={
 'schema_version':1,'kind':'CANONICAL_PHASE_COMPLETED','status':'PASS','date':'2026-11-23',
 'producer_phase':'Figma, canonical data, web QA and coordinated Graphify/catalog closure completed; producer chat remains active for consumer verification and GitHub publication',
 'producer_thread_id':'01a1cc0f-5fba-71c2-9451-d1a1f6779950',
 'run':closure['run'],'ds_digest':pointer['ds_digest'],
 'catalog_manifest':pointer['manifest'],'catalog_manifest_sha256':pointer['manifest_sha256'],
 'catalog_bundle_sha256':pointer['bundle_sha256'],
 'files':manifest['files'],
 'pins':{p:sha((ROOT/p).read_bytes()) for p in ['config/web-inputs.json','specs/tokens/body.disabled.v1.0.0.json','specs/tokens/visibility.body-only.correction.json','specs/policies/product-consumption.v1.0.0.json','implementations/web/src/generated/tokens.manifest.json','graphify-out/graph.json','graphify-out/ds-closure.json','qa/implementations/body.disabled.v1.0.0.review.md']},
 'tokens':1536,'body_tokens':61,'body_colors':37,'caution_tokens':21,'resolved_mode_values':5064,
 'body_data_sources':policy['body']['data_sources'],'versions_preserved':True,
 'graph':{'status':closure['status'],'nodes':closure['nodes'],'edges':closure['edges'],'declared_dependencies':closure['declared_dependencies']},
 'consumers':'Prepare/update packages from this cut without installations or Git writes; retain original versions and prior immutable artifacts',
 'publication':'Authorized by human only after consumer and graph verification; NOT_RUN in this phase receipt',
}
(HERE/'canonical-phase-completed.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k not in ['files','pins']},ensure_ascii=False))
