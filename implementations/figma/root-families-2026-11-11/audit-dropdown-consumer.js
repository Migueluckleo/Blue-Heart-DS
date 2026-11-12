figma.skipInvisibleInstanceChildren=false;
const items=await figma.getNodeByIdAsync('118:42');
const helper=await figma.getNodeByIdAsync('119:11');
const menu=await figma.getNodeByIdAsync('119:17');
const page=menu.parent;
await figma.setCurrentPageAsync(page);
const before=page.children.map(n=>n.id);
const checks=[];
const add=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
const find=(n,name)=>n.findOne(c=>c.name===name);
const key=(n,label)=>Object.keys(n.componentProperties).find(k=>k.split('#')[0]===label);
const equal=(a,b)=>Math.abs(a-b)<.05;
const by=(type,size='medium',state='default',selected='false')=>items.children.find(n=>{
 const p=n.variantProperties;return p.type===type&&p.size===size&&p.state===state&&p.selected===selected;
});
async function temp(main,fn){const n=main.createInstance();try{await fn(n);}finally{n.remove();}}
for(const size of ['large','medium','small']){
 const minimum={large:48,medium:40,small:32}[size];
 await temp(by('option',size,'focus','true'),async n=>{
   n.resize(160,n.height);
   n.setProperties({[key(n,'Show description')]:true,[key(n,'Show left icon')]:true,
     [key(n,'Label')]:'Comprobante de operaciones extraordinarias',
     [key(n,'Description')]:'Detalle complementario que se conserva en varias líneas a un ancho reducido.'});
   const content=find(n,'Content'), label=find(n,'Label'), description=find(n,'Description'), focus=find(n,'Focus ring');
   add(size+' responsive Description and focus',n.height>minimum&&equal(description.width,content.width)
     &&description.height>16&&description.layoutSizingHorizontal==='FILL'&&description.layoutSizingVertical==='HUG'
     &&equal(focus.width,n.width)&&equal(focus.height,n.height),
     [n.height,description.width,content.width,description.height,focus.height]);
   const icon=find(n,'Left icon'),check=find(n,'Check');
   const bindings=await Promise.all([label.boundVariables.fills[0].id,
    icon.findOne(c=>c.type==='VECTOR').boundVariables.fills[0].id,
    check.findOne(c=>c.type==='VECTOR').boundVariables.fills[0].id].map(id=>figma.variables.getVariableByIdAsync(id)));
   const vector=v=>Object.values(v.valuesByMode).map(value=>value.id).join(',');
   add(size+' linked glyphs and Label alias parity',icon.visible&&check.visible
     &&(await icon.getMainComponentAsync()).key==='f273018f11d7d4e938078bd0b21b0b3a9e7f2634'
     &&(await check.getMainComponentAsync()).key==='b0e1ef9e3dcc90870bbf7ef05b8ee937890eb31d'
     &&bindings.every(v=>vector(v)===vector(bindings[0])),bindings.map(v=>v.name));
 });
}
await temp(helper,async n=>{
 const thumb=find(n,'Thumb');
 add('Private Scrollbar reference geometry',n.width===12&&n.height===280&&thumb.width===4&&thumb.height===68,[n.width,n.height,thumb.width,thumb.height]);
 n.resize(12,208);
 add('Private thumb scales to a quarter',thumb.height===50,thumb.height);
});
const slotName=n=>n.findOne(c=>c.type==='SLOT'&&c.name==='Options');
const violations=n=>n.limitViolations.map(v=>typeof v==='string'?v:v.type);
const slotDef=Object.values(menu.componentPropertyDefinitions).find(p=>p.type==='SLOT');
add('Native Options constraints',slotDef.slotSettings.minChildren===1&&slotDef.slotSettings.maxChildren===null
  &&slotDef.slotSettings.stretchChildOnInsert&&slotDef.slotSettings.allowPreferredValuesOnly
  &&slotDef.preferredValues[0].key===items.key,slotDef);
for(const size of ['large','medium','small']){
 await temp(menu,async n=>{
  const slot=slotName(n),scrollbar=find(n,'Scrollbar');
  add(size+' initial sample',n.width===320&&n.height===210&&slot.children.length===5&&!scrollbar.visible,[n.width,n.height,slot.children.length,scrollbar.visible]);
  while(slot.children.length)slot.children.at(-1).remove();
  add(size+' minimum reported',violations(slot).includes('BELOW_MIN'),violations(slot));
  const illegal=figma.createFrame();
  let rejected;
  try{slot.appendChild(illegal);rejected=violations(slot);}
  catch(error){rejected=String(error);}
  finally{illegal.remove();}
  add(size+' incompatible insertion is reported or rejected',typeof rejected==='string'||rejected.length>0,rejected);
  function insert(main,label){
   const item=main.createInstance();
   const p=key(item,'Label');
   if(label&&p)item.setProperties({[p]:label});
   slot.appendChild(item);
   return item;
  }
  insert(by('option',size,'default','true'),'Elección actual');
  add(size+' one official option',slot.children.length===1&&violations(slot).length===0,violations(slot));
  for(let i=2;i<=5;i++)insert(by('option',size),`Opción ${i}`);
  add(size+' short content grows without scroll',slot.children.length===5&&n.height<320&&slot.overflowDirection==='VERTICAL',
   [n.height,slot.overflowDirection]);
  for(let i=6;i<=10;i++)insert(by('option',size),`Opción ${i}`);
  slot.insertChild(0,slot.children.at(-1));
  const last=slot.children[0];
  slot.children.at(-1).remove();
  insert(by('header',size));
  if(size==='medium'){
   slot.children.at(-1).remove();
   insert(by('divider'));
  }
  const mains=await Promise.all(slot.children.map(x=>x.getMainComponentAsync()));
  add(size+' ten, reordering and allowed replacement',slot.children.length===10&&slot.children[0].id===last.id
    &&mains.every(m=>m.parent.id===items.id)&&slot.children.filter(x=>x.variantProperties.selected==='true').length===1,
    mains.map(m=>m.name));
  n.resize(240,320);
  slot.layoutSizingVertical='FILL';
  n.setProperties({[key(n,'Show scrollbar')]:true});
  scrollbar.resize(12,slot.height);
  const thumb=find(scrollbar,'Thumb');
  add(size+' fitted viewport, right thumb and clipping',n.width===240&&n.height===320&&slot.height===318
    &&slot.overflowDirection==='VERTICAL'&&slot.clipsContent&&scrollbar.visible&&equal(thumb.height,(scrollbar.height-8)/4),
    [n.width,n.height,slot.height,slot.overflowDirection,scrollbar.height,thumb.height]);
 });
}
const after=page.children.map(n=>n.id);
add('Clean Dropdown page',before.join(',')===after.join(',')&&after.length===3,after);
return {status:checks.every(c=>c.pass)?'PASS':'FAIL',checks};
