if (figma.fileKey !== 'yZsIpXywybsPDytjolwcP4') throw Error('Unexpected master');
const page=await figma.getNodeByIdAsync('126:2');
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren=false;
const masters=['126:60','126:163','126:266','126:369'];
const collection=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:6:22');
const names=['Show left icon','Show right icon','Show counter','Show remove'];
const layers=['Left icon','Right icon','Counter','Remove'];
const plus='46d251bb4099700c5852180f2370d265e5166432';
const close='4046be769b352c4e707a75fd12c03a00eb63f3f4';
const closeAsset=await figma.importComponentByKeyAsync(close);
const plusAsset=await figma.importComponentByKeyAsync(plus);
const checks=[];
const add=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
const child=(node,name)=>node.children.find(n=>n.name===name);
const key=(n,label)=>Object.keys(n.componentProperties).find(k=>k.split('#')[0]===label);
const change=(n,pairs)=>n.setProperties(Object.fromEntries(pairs.map(([p,v])=>[key(n,p),v])));
const paint=async node=>{
 const variable=await figma.variables.getVariableByIdAsync(node.boundVariables.fills[0].id);
 return variable.resolveForConsumer(node).value;
};
for(const [index,id] of masters.entries()){
 const set=await figma.getNodeByIdAsync(id);
 const height=[48,40,32,24][index];
 for(const main of set.children){
  const instance=main.createInstance();
  try{
   const label=child(instance,'Label');
   const count=child(child(instance,'Counter'),'Count');
   const icon=child(instance,'Left icon').findOne(n=>n.type==='VECTOR');
   const remove=child(instance,'Remove').findOne(n=>n.type==='VECTOR');
   const colors=[];
   for(const mode of collection.modes){
    instance.setExplicitVariableModeForCollection(collection,mode.modeId);
    colors.push(await Promise.all([instance,label,count,icon,remove].map(paint)));
   }
   const staticColors=colors.every(row=>JSON.stringify(row)===JSON.stringify(colors[0]));
   const sameGlyphs=colors.every(([,labelColor,,plusColor,removeColor])=>
     JSON.stringify(labelColor)===JSON.stringify(plusColor)&&JSON.stringify(labelColor)===JSON.stringify(removeColor));
   add(main.name+' geometry, bindings and four modes',instance.height===height&&staticColors&&sameGlyphs,{height:instance.height,staticColors,sameGlyphs});
   if(main.name.endsWith('selected=false, state=focus')){
    const base=instance.width;
    let optionalCases=0;
    for(let mask=0;mask<16;mask++){
     change(instance,names.map((n,i)=>[n,Boolean(mask&(1<<i))]));
     if(layers.every((n,i)=>child(instance,n).visible===Boolean(mask&(1<<i))))optionalCases++;
    }
    const all=instance.width;
    const long='Comprobantes de conciliación con etiqueta larga';
    change(instance,[['Label',long],['Counter','120 000']]);
    const ring=child(instance,'Focus ring');
    add(set.name+' edit, optional combinations and anchored ring',
      optionalCases===16&&all>base&&instance.width>all&&label.characters===long&&count.characters==='120 000'&&
      Math.abs(ring.width-instance.width-8)<.1&&Math.abs(ring.x+4)<.1&&Math.abs(ring.height-height-8)<.1,
      {optionalCases,base,all,edited:instance.width,ring:[ring.x,ring.width,ring.height]});
    change(instance,[['Label',''],['Counter','']]);
    add(set.name+' empty texts',label.characters===''&&count.characters==='',[label.characters,count.characters]);
    change(instance,[['Label','MXN'],['Counter','0'],['Left icon',closeAsset.id],['Right icon',closeAsset.id]]);
    const actualKeys=async()=>await Promise.all(['Left icon','Right icon'].map(async n=>(await child(instance,n).getMainComponentAsync()).key));
    const swapped=await actualKeys();
    change(instance,[['Left icon',plusAsset.id],['Right icon',plusAsset.id]]);
    const restored=await actualKeys();
    add(set.name+' swap and restore',swapped.every(k=>k===close)&&restored.every(k=>k===plus)&&count.characters==='0',
      {swapped,restored,count:count.characters});
   }
  }finally{instance.remove();}
 }
}
add('Clean official page',page.children.map(n=>n.id).join(',')===masters.join(','),page.children.map(n=>n.id));
return {status:checks.every(c=>c.pass)?'PASS':'FAIL',checks};
