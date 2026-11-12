import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdirSync,mkdtempSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {after,test} from 'node:test';
import {pathToFileURL} from 'node:url';

const runtime = path.resolve(process.argv[2]);
const {createComponentPlan,verifyFamilyTracking} = await import(pathToFileURL(path.join(runtime,'scripts/component-plan.mjs')));
const {usagePlan,componentCatalog} = await import(pathToFileURL(path.join(runtime,'scripts/component-enforcer.mjs')));
const oldDirectory = process.cwd();
const fixture = mkdtempSync(path.join(tmpdir(),'blueheart-coverage-'));
process.chdir(fixture);
after(()=>{process.chdir(oldDirectory); rmSync(fixture,{recursive:true,force:true});});
const sha = value => createHash('sha256').update(value).digest('hex');
const contract = id => `specs/components/${id.toLowerCase()}.contract.v1.0.0.md`;
const write = (file,text) => {mkdirSync(path.dirname(file),{recursive:true}); writeFileSync(file,text);};
const families = ['BREADCRUMB-001','DROPDOWN-MENU-001','INLINE-NOTIFICATION-001','LOGOS-001','MENU-ITEM-001','PAGINATION-001','TABLE-001'];
const components = families.filter(id=>id!=='LOGOS-001').map(id=>({id,contract:contract(id),amendments:[],exports:[id.replaceAll('-','')]}));
const registry = components.map(row=>({id:row.id,base:row.contract,exports:row.exports}));
const registryPath = 'implementations/web/components.registry.json';
const texts = {[registryPath]:JSON.stringify(registry),'implementations/web/src/index.ts':'// verified index'};
for(const id of families) texts[contract(id)] = `---\ncontract_id: ${id}\nstatus: DELEGATED_FOR_BUILD\n${id==='PAGINATION-001'?'dependencies: [DROPDOWN-MENU-001]\n':''}---\n# ${id}\n`;
const files = Object.fromEntries(Object.keys(texts).sort().map(file=>[file,sha(texts[file])]));
for(const [file,text] of Object.entries(texts)) write('references/design-system/'+file,text);
const manifest = {schema_version:1,components,files,ds_digest:sha(JSON.stringify(files))};
const raw = JSON.stringify(manifest);
write('references/snapshot-manifest.json',raw);
write('references/release.json',JSON.stringify({manifest_sha256:sha(raw),ds_digest:manifest.ds_digest}));
const catalog = componentCatalog(manifest);
function brief(active = ['PAGINATION-001','LOGOS-001']) {
  return {componentFamilyTracking:families.map(componentId=>({componentId,applicability:active.includes(componentId)?'APPLIES':'NOT_APPLICABLE',reason:active.includes(componentId)?'El brief incluye este control.':'El brief no requiere este control.'})),
    componentRequirements:active.map(componentId=>({instanceId:componentId,role:componentId,componentId,coverage:componentId==='LOGOS-001'?'SPEC_WITHOUT_WEB':'COMPATIBLE',exportName:catalog.families.get(componentId)?.[0]??null,reason:'La spec define el alcance de la instancia.',evidence:contract(componentId),...(componentId==='LOGOS-001'?{localCoverage:{search:'Marca del producto en un control web',candidates:[{componentId,gap:'NO_WEB_EXPORT',unmet:'La marca no tiene export web para usarla en este control.',evidence:contract(componentId)}]}}:{})})),
    screens:[{states:[{nodes:active}]}],components:active.map(componentId=>componentId==='LOGOS-001'?{instanceId:componentId,componentId:'LOCAL-Logo',kind:'local-composition',compositionOf:[],reason:'La spec define el alcance de la instancia.',exception:{componentIds:[componentId],source:contract(componentId),reason:'La spec define el alcance de la instancia.'}}:{instanceId:componentId,componentId,kind:'ds',exportName:catalog.families.get(componentId)[0]})};
}

test('rechaza una familia omitida, repetida o ajena al corte',()=>{
  for(const mutation of [rows=>rows.pop(),rows=>rows.push(rows[0]),rows=>rows.push({...rows[0],componentId:'EXTRA-001'})]) {
    const data = brief(); mutation(data.componentFamilyTracking);
    assert.throws(()=>createComponentPlan(data),/omitidas|duplicada|ajena/);
  }
});

test('las familias aplicables rechazan sustitutos de exports compatibles',()=>{
  const data = brief(families.filter(id=>id!=='TABLE-001'&&id!=='LOGOS-001'));
  const plan = createComponentPlan(data);
  for(const item of data.components) {item.kind='local-composition';item.componentId='LOCAL-'+item.instanceId;}
  assert.equal(usagePlan(data,catalog,plan).findings.filter(row=>row.code==='COMPONENT_SUBSTITUTED').length,5);
});

test('reconcilia una spec sin registro web y conserva familias que no aplican',()=>{
  const data = brief(); const plan = createComponentPlan(data);
  assert.deepEqual(usagePlan(data,catalog,plan).findings,[]);
  assert.equal(plan.controls.find(row=>row.componentId==='LOGOS-001').coverage,'SPEC_WITHOUT_WEB');
  assert.equal(plan.controls.find(row=>row.componentId==='PAGINATION-001').dependencies[0].componentId,'DROPDOWN-MENU-001');
  for(const component of data.components) component.evidence={status:'PASS'};
  const capture={status:'PASS',states:[{status:'PASS',screen_id:'home',state_id:'visible',viewport:{width:800,height:600},nodes:data.components.map(item=>({id:item.instanceId,component:item.componentId,export:item.exportName,visible:true}))}]};
  const results = new Map(verifyFamilyTracking(plan,data.components,capture).map(row=>[row.componentId,row.result]));
  assert.equal(results.get('TABLE-001'),'NOT_APPLICABLE');
  assert.equal(results.get('LOGOS-001'),'EXCEPTION');
  assert.equal(results.get('PAGINATION-001'),'VERIFIED');
  capture.states[0].nodes.shift();
  assert.throws(()=>verifyFamilyTracking(plan,data.components,capture),/sin instancia verificada/);
});


test('excepción semántica exige evidencia de alternativas y cede a un componente compatible',()=>{
  const data = brief(['DROPDOWN-MENU-001']);
  const requirement = data.componentRequirements[0];
  Object.assign(requirement,{coverage:'WEB_INCOMPATIBLE',exportName:null,reason:'La selección múltiple persiste varias sucursales.'});
  assert.throws(()=>createComponentPlan(data),/búsqueda funcional/);
  const primary={componentId:'DROPDOWN-MENU-001',gap:'BEHAVIOR',unmet:'El API selecciona una sola sucursal.',evidence:contract('DROPDOWN-MENU-001')};
  const alternative={componentId:'PAGINATION-001',gap:'PURPOSE',unmet:'Cambia página y no mantiene una selección de sucursales.',evidence:contract('PAGINATION-001')};
  requirement.localCoverage={search:'Selección múltiple y persistencia de sucursales, aunque el brief la llame filtro rápido.',candidates:[primary,alternative]};
  data.components[0]={instanceId:'DROPDOWN-MENU-001',kind:'local-composition',componentId:'LOCAL-Sucursal',compositionOf:[],reason:requirement.reason,exception:{componentIds:[requirement.componentId],reason:requirement.reason,source:requirement.evidence}};
  const plan=createComponentPlan(data);
  assert.deepEqual(usagePlan(data,catalog,plan).findings,[]);
  assert.equal(plan.controls[0].localCoverage.candidates[1].evidence.sha256,files[alternative.evidence]);
  alternative.gap='COMPATIBLE';
  assert.throws(()=>createComponentPlan(data),/Usa la alternativa compatible/);
});
