import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdirSync,mkdtempSync,readFileSync,rmSync,writeFileSync,cpSync,symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {after,test} from 'node:test';
import {pathToFileURL} from 'node:url';

const repo=process.cwd();
const fixture=mkdtempSync(path.join(tmpdir(),'product-consumption-'));
const scripts=path.join(fixture,'scripts');
cpSync(path.resolve('workflows/skills/contpaqi-po-prototypes/assets/starter/scripts'),scripts,{recursive:true});
symlinkSync(path.resolve('implementations/web/node_modules'),path.join(fixture,'node_modules'));
const {createComponentPlan}=await import(pathToFileURL(path.join(scripts,'component-plan.mjs')));
const {auditComponentHtml}=await import(pathToFileURL(path.join(scripts,'component-enforcer.mjs')));
const original=process.cwd();process.chdir(fixture);
after(()=>{process.chdir(original);rmSync(fixture,{recursive:true,force:true});});
const hash=value=>createHash('sha256').update(value).digest('hex');
const write=(file,text)=>{mkdirSync(path.dirname(file),{recursive:true});writeFileSync(file,text);};
const pairs=[['APP-SHELL-001','AppShell','app-shell'],['BUTTON-001','Button','buttons'],['LINEAR-PROGRESS-001','LinearProgress','linear-progress']];
const components=pairs.map(([id,exportName,slug])=>({id,slug,contract:`specs/components/${slug}.contract.v1.0.0.md`,exports:[exportName],amendments:[]}));
const texts={
  'implementations/web/components.registry.json':JSON.stringify(components.map(c=>({id:c.id,base:c.contract,exports:c.exports}))),
  'implementations/web/src/index.ts':'// fixture public exports',
};
for(const c of components)texts[c.contract]=`---\ncontract_id: ${c.id}\nstatus: DELEGATED_FOR_BUILD\n---\n# ${c.id}\n`;
for(const file of ['specs/foundations/product-consumption.contract.v1.0.0.md','specs/policies/product-consumption.v1.0.0.json','specs/tokens/body.v1.0.0.json'])texts[file]=readFileSync(path.join(repo,file),'utf8');
const files=Object.fromEntries(Object.keys(texts).sort().map(file=>[file,hash(texts[file])]));
for(const [file,text]of Object.entries(texts))write('references/design-system/'+file,text);
const manifest={schema_version:1,components,files,ds_digest:hash(JSON.stringify(files))};
const raw=JSON.stringify(manifest);
write('references/snapshot-manifest.json',raw);
write('references/release.json',JSON.stringify({manifest_sha256:hash(raw),ds_digest:manifest.ds_digest}));
function brief(){return {
  componentFamilyTracking:components.map(c=>({componentId:c.id,applicability:'APPLIES',reason:'El caso de prueba usa esta familia.'})),
  componentRequirements:components.map(c=>({instanceId:c.slug,role:c.id,componentId:c.id,exportName:c.exports[0],coverage:'COMPATIBLE',reason:'Consume el componente oficial.',evidence:c.contract})),
  screens:[{id:'home',states:[{id:'default',nodes:[...components.map(c=>c.slug),'card']}]}],
  components:[...components.map(c=>({instanceId:c.slug,componentId:c.id,exportName:c.exports[0],kind:'ds'})),{
    instanceId:'card',componentId:'LOCAL-Card',kind:'local-composition',moleculeType:'card',hostInstance:'app-shell',slot:'body',reason:'Resumen de cobros del producto.',compositionOf:['BUTTON-001','LINEAR-PROGRESS-001'],tokens:['body/spacing/lg','body/color/bg/primary'],bodyBindings:[{property:'padding',token:'body/spacing/lg'},{property:'backgroundColor',token:'body/color/bg/primary'}]
  }]
};}

test('acepta AppShell con molécula Body y controles oficiales incluido progreso',()=>{
  const plan=createComponentPlan(brief());assert.equal(plan.consumption.local_construction,'MOLECULES_ONLY');assert.equal(plan.consumption.molecules[0].moleculeType,'card');
});
test('rechaza cada estado que omita el AppShell oficial',()=>{
  const b=brief();b.screens[0].states.push({id:'without-shell',nodes:['card','linear-progress']});assert.throws(()=>createComponentPlan(b),/requiere AppShell/);
});
test('rechaza átomos locales y tokens inventados, internos o semánticos para la molécula',()=>{
  for(const mutate of [c=>c.moleculeType='atom',c=>c.tokens=['button/font/family'],c=>c.tokens=['body/nonexistent'],c=>c.tokens=['neutral-base'],c=>c.bodyBindings=[]]){
    const b=brief();mutate(b.components.at(-1));assert.throws(()=>createComponentPlan(b));
  }
});
test('rechaza moléculas fuera de Body y contenido sin molécula propietaria',()=>{
  const b=brief();b.components.at(-1).slot='sidebar';assert.throws(()=>createComponentPlan(b),/Body de AppShell/);
  const c=brief();c.components.push({instanceId:'title',kind:'local-content',tokens:['body/font/heading/h2/size'],bodyBindings:[{property:'fontSize',token:'body/font/heading/h2/size'}]});assert.throws(()=>createComponentPlan(c),/propietaria/);
});
test('detecta sustituciones de progreso nativo y role progressbar sin DS',()=>{
  for(const html of ['<progress value="70" max="100"></progress>','<div role="progressbar" aria-valuenow="70"></div>']){
    assert.ok(auditComponentHtml(Buffer.from(html),{components:[]},manifest).findings.some(f=>f.code==='COMPONENT_SUBSTITUTED'));
  }
});
