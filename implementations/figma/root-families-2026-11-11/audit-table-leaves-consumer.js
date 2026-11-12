if(figma.fileKey!=='yZsIpXywybsPDytjolwcP4')throw Error('Wrong destination');
const page=await figma.getNodeByIdAsync('128:2');
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren=false;
const actions=await figma.getNodeByIdAsync('128:191');
const capture=await figma.getNodeByIdAsync('128:228');
const thumb=await figma.getNodeByIdAsync('128:261');
const scrollbars=await figma.getNodeByIdAsync('128:264');
const cells=await figma.getNodeByIdAsync('129:44');
const checks=[];
const check=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
const key=(n,name)=>Object.keys(n.componentProperties).find(k=>k.split('#')[0]===name);
const change=(n,values)=>n.setProperties(Object.fromEntries(Object.entries(values).map(([name,value])=>[key(n,name),value])));
const find=(n,name)=>n.findOne(c=>c.name===name);
const mainId=async n=>(await n?.getMainComponentAsync())?.id;
const mainKey=async n=>(await n?.getMainComponentAsync())?.key;
async function temp(main,test){
 const n=main.createInstance();
 try{await test(n);}finally{n.remove();}
}
const caret='bc84188a38d95b6865a7c6a57820ee2330e43f34';
const pencil='407e99584a7dcdd00970ee097f482cc382474687';
const caretAsset=await figma.importComponentByKeyAsync(caret);
for(const main of actions.children){
 await temp(main,async n=>{
  const amount=Number(main.name.split('=')[1]);
  const glyphs=n.children;
  check(main.name+' width and glyphs',glyphs.length===amount&&n.width===amount*20+(amount-1)*8&&
    glyphs.every(child=>child.width===20&&child.height===20),[glyphs.length,n.width]);
  if(amount===4){
   change(n,{'Icon 2':caretAsset.id});
   const swapped=await mainKey(find(n,'Icon 2'));
   const original=await figma.importComponentByKeyAsync(pencil);
   change(n,{'Icon 2':original.id});
   check('Action swap and restoration',swapped===caret&&await mainKey(find(n,'Icon 2'))===pencil,swapped);
  }
 });
}
for(const main of capture.children){
 await temp(main,async n=>{
  n.resize(160,40);
  const text='Texto de conciliación contable más largo que la columna';
  change(n,{'Label':text,'Show left icon':true,'Show right icon':true});
  const label=find(n,'Label'),box=find(n,'tex-box');
  const resolved=await Promise.all(['Left icon','Right icon'].map(name=>mainKey(find(n,name))));
  check(main.name+' narrow editable capture',n.height===40&&box.width===144&&label.width<box.width&&
    label.characters===text&&label.textTruncation==='ENDING'&&label.maxLines===1&&resolved.every(key=>key===caret),
    {width:n.width,box:box.width,label:label.width,ellipsis:label.textTruncation,glyphs:resolved});
  n.resize(300,40);
  change(n,{'Show left icon':false,'Show right icon':false});
  check(main.name+' wider capture hides glyphs',box.width===284&&label.width>220&&
    !find(n,'Left icon').visible&&!find(n,'Right icon').visible,{box:box.width,label:label.width});
 });
}
const thickness=await figma.variables.getVariableByIdAsync('VariableID:13:313');
for(const main of scrollbars.children){
 await temp(main,async n=>{
  const vertical=main.name.endsWith('=vertical');
  const slot=n.children.find(c=>c.type==='SLOT');
  const definition=n.componentProperties[slot.componentPropertyReferences.slotContentId];
  const old=slot.children[0];
  const before=[await mainId(old),old.width,old.height];
  const replacement=thumb.createInstance();
  replacement.name='Thumb';
  replacement.resize(vertical?8:120,vertical?120:8);
  replacement.setBoundVariable(vertical?'width':'height',thickness);
  old.remove();slot.appendChild(replacement);
  const child=slot.children[0];
  const observed=[slot.children.length,await mainId(child),child.width,child.height,
    child.boundVariables[vertical?'width':'height']?.id];
  check(main.name+' linked thumb Slot',definition?.type==='SLOT'&&before[0]===thumb.id&&
    observed.join(',')===[1,thumb.id,vertical?8:120,vertical?120:8,thickness.id].join(','),
    {before,observed});
 });
}
for(const [kind,name,target] of [['checkbox','Checkbox','42:4'],['toggle','Toggle','32:98'],
 ['badge','Badge','64:91'],['action','Actions',actions.defaultVariant.id]]){
 const main=cells.children.find(c=>c.name==='item=concept, type='+kind+', state=default');
 await temp(main,async n=>{
  const found=find(n,name);
  check(kind+' keeps its own master',n.height===40&&await mainId(found)===target,
    {height:n.height,main:await mainId(found)});
 });
}
const link=cells.children.find(c=>c.name==='item=concept, type=link, state=default');
await temp(link,async n=>{
 n.resize(155,40);
 const text='Folio con descripción extensa de comprobante';
 change(n,{'Label':text,'Show left icon':true,'Show right icon':true});
 const label=find(n,'Label');
 check('Link remains editable and bounded',label.characters===text&&label.width<n.width&&
   label.textTruncation==='ENDING'&&label.maxLines===1&&label.textDecoration==='NONE',
   {text:label.characters,width:label.width,ellipsis:label.textTruncation,decoration:label.textDecoration});
});
check('Partial set has exactly 24 variants',cells.children.length===24&&!cells.children.some(c=>c.name.includes('type=default')),
  cells.children.length);
const approved=[actions.id,capture.id,thumb.id,scrollbars.id,cells.id];
check('Table page has five scoped owners',page.children.length===approved.length&&page.children.every(n=>approved.includes(n.id)),
  page.children.map(n=>[n.id,n.name]));
return {status:checks.every(c=>c.pass)?'PASS':'FAIL',checks};
