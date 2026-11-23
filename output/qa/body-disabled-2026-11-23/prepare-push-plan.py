from pathlib import Path
import hashlib,json,subprocess
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
git=lambda *args:subprocess.check_output(['git',*args],cwd=ROOT)
read=lambda p:json.loads((ROOT/p).read_text())
pointer=read('catalog/current.json');closure=read('graphify-out/ds-closure.json')
assert closure['status']=='CURRENT' and closure['run']=='2026-11-23-body-disabled-final'
assert git('branch','--show-current').decode().strip()=='main'
assert not git('diff','--cached','--name-only').strip(),'Existing staged changes require inspection'
paths={p.decode() for p in git('diff','--name-only','-z').split(b'\0') if p and not p.decode().startswith('output/')}
roots=['specs','config','implementations','sources','qa','registry','scripts','tests','workflows']
paths.update(p.decode() for p in git('ls-files','--others','--exclude-standard','-z','--',*roots).split(b'\0') if p)
release=str(Path(pointer['manifest']).parent)
extra=[release,'graphify-out/runs/'+closure['run'],'output/qa/canonical-tokens-2026-11-23','output/qa/body-disabled-2026-11-23']
for prefix in extra:
 paths.update(p.decode() for p in git('ls-files','--others','--exclude-standard','-z','--',prefix).split(b'\0') if p)
receipt='output/closures/'+closure['run']+'.json'
paths.add(receipt)
files=[]
for path in sorted(paths):
 p=ROOT/path
 files.append({'path':path,'sha256':hashlib.sha256(p.read_bytes()).hexdigest() if p.is_file() else None,'bytes':p.stat().st_size if p.is_file() else 0})
result={'kind':'REVIEWED_CANONICAL_PUSH_PLAN','branch':'main','remote':'origin','expected_parent':git('rev-parse','HEAD').decode().strip(),'ds_digest':pointer['ds_digest'],'closure_run':closure['run'],'files':files,'scope':'All pending active DS sources and their validated current catalog/Graphify outputs, plus the token audit evidence. Untracked archived releases, unrelated operational output and mutable caches stay local.'}
(HERE/'push-plan.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'files':len(files),'bytes':sum(f['bytes'] for f in files),'expected_parent':result['expected_parent'],'ds_digest':result['ds_digest']},ensure_ascii=False))
