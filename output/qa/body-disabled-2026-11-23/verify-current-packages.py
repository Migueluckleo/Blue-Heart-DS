"""Independent read-only validation of the three current same-version ZIPs."""
from pathlib import Path
import base64,hashlib,json,sqlite3,tempfile,zipfile

HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2];WORK=ROOT.parent
sha=lambda b:hashlib.sha256(b).hexdigest()
cfg=json.loads((ROOT/'config/web-inputs.json').read_text())
phase=json.loads((HERE/'canonical-phase-completed.json').read_text())
expected_manifest=(ROOT/'implementations/web/src/generated/tokens.manifest.json').read_bytes()
expected_policy=json.loads((ROOT/'specs/policies/product-consumption.v1.0.0.json').read_text())
reports=[]
for slug,version,filename in [
 ('po-prototypes-autocontenida','1.1.0','po-prototypes-autocontenida-1.1.0.zip'),
 ('blueheart-figma-portable','1.1.0','Blueheart-figma-portable-1.1.0.zip'),
 ('blueheart-figma-local','1.0.5','blueheart-figma-local-1.0.5.zip'),
]:
 archive=WORK/'01-SKILLS/ZIP-ACTUALES'/filename
 actual_sha=sha(archive.read_bytes());assert actual_sha==archive.with_suffix('.zip.sha256').read_text().split()[0]
 with zipfile.ZipFile(archive) as z:
  assert z.testzip() is None
  names=[n for n in z.namelist() if not n.endswith('/')]
  mp=next(n for n in names if n.endswith('package-manifest.json'))
  prefix=mp[:-len('package-manifest.json')]
  get=lambda path:z.read(prefix+path)
  package=json.loads(get('package-manifest.json'));assert package['name']==slug and package['version']==version
  assert len(names)<=200
  for path,h in package['files'].items():assert sha(get(path))==h,(slug,path)
  index=json.loads(get('sources/index.json'))
  def source(path):
   e=index['entries'][path];record=json.loads(get(e['file'])[e['offset']:e['offset']+e['length']])
   raw=__import__('zlib').decompress(base64.b64decode(record['data']))
   assert sha(raw)==e['sha256']==record['sha256'],path
   return raw
  for entry in cfg['token_sources']:
   assert source(entry['path'])==(ROOT/entry['path']).read_bytes(),(slug,entry['path'])
  assert source('implementations/web/src/generated/tokens.manifest.json')==expected_manifest
  assert json.loads(source('specs/policies/product-consumption.v1.0.0.json'))['body']==expected_policy['body']
  graph_contract=json.loads(get('references/graph-contract.json'))
  source_manifest_raw=get('references/source-manifest.json' if slug=='po-prototypes-autocontenida' else 'assets/snapshot-manifest.json')
  source_manifest=json.loads(source_manifest_raw)
  graph_snapshot=source_manifest['snapshot_sha256'] if slug=='po-prototypes-autocontenida' else sha(source_manifest_raw)
  assert graph_contract['input_pins']['source_snapshot']==graph_snapshot
  assert graph_contract['input_pins']['source_manifest']==sha(source_manifest_raw)
  assert graph_contract['input_pins']['builder']==sha(get('scripts/graph.py'))
  graph_index='references/index.json' if slug=='po-prototypes-autocontenida' else 'references/local-index.json'
  assert graph_contract['input_pins']['index']==sha(get(graph_index))
  release_path='references/provenance.json' if slug=='po-prototypes-autocontenida' else 'assets/release.json'
  release=json.loads(get(release_path))
  assert release['canonical_ds_digest']==phase['ds_digest']
  db=get('state/knowledge.sqlite')
  with tempfile.TemporaryDirectory(prefix='blueheart-package-final-') as temp:
   p=Path(temp)/'knowledge.sqlite';p.write_bytes(db)
   with sqlite3.connect('file:'+str(p)+'?mode=ro&immutable=1',uri=True) as c:
    assert c.execute('PRAGMA integrity_check').fetchone()[0]=='ok'
    nodes=c.execute('SELECT count(*) FROM nodes').fetchone()[0];edges=c.execute('SELECT count(*) FROM edges').fetchone()[0]
    unresolved=c.execute("SELECT count(*) FROM nodes WHERE kind='unresolved_variable'").fetchone()[0]
    assert nodes==graph_contract['nodes'] and edges==graph_contract['edges'] and unresolved==0
  memory=get('state/memory.sqlite');installed=Path('/Users/miguel.leo/.codex/skills')/slug/'state/memory.sqlite'
  memory_preserved=sha(memory)==sha(installed.read_bytes()) if installed.exists() else None
  if installed.exists():assert memory_preserved,(slug,'memory bytes changed')
  manifest=json.loads(expected_manifest)
  reports.append({'skill':slug,'version':version,'artifact_revision':package.get('artifact_revision'),'zip':str(archive),'zip_sha256':actual_sha,'physical_files':len(names),'canonical_sources_checked':len(cfg['token_sources']),'effective_tokens':len(manifest['tokens']),'body_tokens':61,'caution_tokens':21,'source_snapshot':phase['ds_digest'],'graph':{'status':'PASS','nodes':nodes,'edges':edges,'unresolved_variables':unresolved,'sqlite_integrity':'ok','knowledge_sha256':sha(db)},'memory_sha256':sha(memory),'installed_memory_bytes_preserved':memory_preserved})
out={'status':'PASS','scope':'ZIP integrity, exact canonical token/manifest bytes, Body policy coverage, SQLite graph integrity and source pins; no installation or Figma prototype created','packages':reports}
(HERE/'consumer-verification.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(out,ensure_ascii=False))
