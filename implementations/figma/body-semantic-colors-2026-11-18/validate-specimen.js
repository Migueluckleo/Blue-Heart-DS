// Prepend const tokenIds = {...}; const sheetId = '...'; const newTokenIds = [...];
figma.skipInvisibleInstanceChildren=false;
const sheet=await figma.getNodeByIdAsync(sheetId);
const collection=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:6:22');
const semanticCollection=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:6:21');
const all=await figma.variables.getLocalVariablesAsync();
const byId=new Map(all.map(v=>[v.id,v]));
const nodes=[];$fig.query('*',sheetId).each(n=>{nodes.push(n);});await $fig.done();
const types={},findings=[],fonts=new Set(),styleIds=new Set();let bindingCount=0,imageCount=0;
for(const n of nodes){
 types[n.type]=(types[n.type]||0)+1;
 if(n.type==='TEXT'){fonts.add(n.fontName.family);styleIds.add(n.textStyleId);if(!n.textStyleId) findings.push({node:n.id,issue:'missing-shared-style'});if(n.width<1||n.height<1)findings.push({node:n.id,issue:'empty-text-bounds'});}
 if('fills'in n&&Array.isArray(n.fills))imageCount+=n.fills.filter(p=>p.type==='IMAGE').length;
 for(const [field,val]of Object.entries(n.boundVariables||{}))for(const alias of Array.isArray(val)?val:[val]){if(alias?.type!=='VARIABLE_ALIAS')continue;bindingCount++;const v=byId.get(alias.id);if(!v||v.variableCollectionId!==collection.id||!v.name.startsWith('body/'))findings.push({node:n.id,field,token:alias.id,issue:'body-binding-role'});}
}
let chainsChecked=0;const body=[];
for(const [name,id]of Object.entries(tokenIds)){
 const v=await figma.variables.getVariableByIdAsync(id);body.push(v);
 for(const mode of collection.modes){
  const a=v.valuesByMode[mode.modeId];const s=a?.type==='VARIABLE_ALIAS'?byId.get(a.id):null;
  const b=s?.valuesByMode[semanticCollection.defaultModeId];const p=b?.type==='VARIABLE_ALIAS'?byId.get(b.id):null;
  chainsChecked++;
  if(s?.variableCollectionId!==semanticCollection.id||p?.variableCollectionId!=='VariableCollectionId:10:2'||s?.resolvedType!==v.resolvedType||p?.resolvedType!==v.resolvedType)findings.push({token:name,mode:mode.name,issue:'alias-chain'});
 }
}
const visible=all.filter(v=>v.scopes.length);
for(const v of visible)if(v.variableCollectionId!==collection.id||!v.name.startsWith('body/')||v.scopes.includes('ALL_SCOPES')||v.scopes.includes('ALL_FILLS'))findings.push({token:v.id,issue:'selector-visibility'});
const modes=[];
for(const mode of collection.modes){
 sheet.setExplicitVariableModeForCollection(collection,mode.modeId);
 const colors={};for(const v of body.filter(v=>v.resolvedType==='COLOR'))colors[v.name]=v.resolveForConsumer(sheet).value;
 modes.push({name:mode.name,id:mode.modeId,colors});
}
sheet.clearExplicitVariableModeForCollection(collection);
const added=[];
for(const id of newTokenIds){const v=await figma.variables.getVariableByIdAsync(id);added.push({id:v.id,key:v.key,name:v.name,collection:v.variableCollectionId,type:v.resolvedType,description:v.description,scopes:v.scopes,codeSyntax:v.codeSyntax,valuesByMode:v.valuesByMode,hiddenFromPublishing:v.hiddenFromPublishing});}
const page=await figma.getNodeByIdAsync('203:93');
const result={status:findings.length?'FAIL':'PASS',sheet:{id:sheet.id,type:sheet.type,width:sheet.width,height:sheet.height,explicitVariableModes:sheet.explicitVariableModes},counts:{variables:all.length,visible:visible.length,hidden:all.length-visible.length,body:body.length},visible:visible.map(v=>({id:v.id,name:v.name,type:v.resolvedType,scopes:v.scopes})),added,modes,types,fonts:[...fonts],styleIds:[...styleIds],imageCount,bindingCount,chainsChecked,findings,playgroundChildren:page.children.map(n=>({id:n.id,name:n.name,type:n.type,x:n.x,y:n.y,width:n.width,height:n.height}))};
if(JSON.stringify(result).length>45000)throw Error('Split validation response');return result;
