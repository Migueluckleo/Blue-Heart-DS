figma.skipInvisibleInstanceChildren=false;
const item=await figma.getNodeByIdAsync('109:17');
const group=await figma.getNodeByIdAsync('109:36');
const page=group.parent;
await figma.setCurrentPageAsync(page);
const before=page.children.map(n=>n.id);
const checks=[];
const add=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
const find=(n,name)=>n.findOne(c=>c.name===name);
const props=(n,label)=>Object.keys(n.componentProperties).find(k=>k.split('#')[0]===label);
const locate=(type,state)=>item.children.find(c=>c.variantProperties.type===type&&c.variantProperties.state===state);
const equal=(a,b)=>Math.abs(a-b)<.03;
async function temp(main,fn){
  const n=main.createInstance();
  try{await fn(n);}finally{n.remove();}
}
await temp(locate('page','focus'),async n=>{
  n.setProperties({[props(n,'Label')]:'1234567'});
  const ring=find(n,'Focus ring');
  add('Long page label and stretch focus ring',n.width>32&&n.height===32&&equal(ring.width,n.width+8)&&ring.x===-4,
    [n.width,n.height,ring.width,ring.x]);
});
await temp(locate('icon','default'),async n=>{
  const keys=['791ac575d3135af604b137c620e66fb2bec69d1c','4472d4a157a44ccd6e7e4911b4c9dcad1dc04b34',
    'e2fc671298e81c590f5a4a5272d9c97709515666','e0c3dba96eb798c7b3ca6ddb8bb5bced41505ccc'];
  for(const key of keys){
    const main=await figma.importComponentByKeyAsync(key);
    n.setProperties({[props(n,'Icon')]:main.id});
    const icon=n.children.find(c=>c.type==='INSTANCE');
    add('Caret swap '+key,(await icon.getMainComponentAsync()).key===key&&icon.width===16,key);
  }
});
const variant=type=>group.children.find(c=>c.variantProperties.type===type);
await temp(variant('default'),async n=>{
  const slot=()=>n.findOne(c=>c.type==='SLOT'&&c.name==='Pages');
  const selected=slot().children.filter(c=>c.variantProperties.state==='selected');
  add('Default source dimensions and selection',n.width===552&&n.height===72&&slot().children.length===11&&selected.length===1,[n.width,n.height,slot().children.length,selected.length]);
  const rows=find(n,'Rows per page');
  const main=await rows.getMainComponentAsync();
  add('Official Input trigger and width alias',main.parent.id==='93:499'&&main.variantProperties.size==='small'&&rows.width===88&&rows.boundVariables.width?.id==='VariableID:13:69',
    [main.id,rows.width,rows.boundVariables.width?.id]);
  n.setProperties({[props(n,'Show range')]:true,[props(n,'Range')]:'101–200 de 12 400',[props(n,'Show rows per page')]:false});
  add('Range text and rows visibility',find(n,'Range').visible&&find(n,'Range').characters==='101–200 de 12 400'&&!rows.visible,
    [find(n,'Range').characters,rows.visible,n.width]);
  while(slot().children.length)slot().children.at(-1).remove();
  const empty=slot().limitViolations.map(v=>typeof v==='string'?v:v.type);
  add('Pages rejects empty by cardinality',empty.includes('BELOW_MIN'),empty);
  const addPage=label=>{
    const child=locate('page','default').createInstance();
    child.setProperties({[props(child,'Label')]:label});
    slot().appendChild(child);
    return child;
  };
  addPage('1');
  add('Pages admits one official item',slot().children.length===1&&slot().limitViolations.length===0,slot().children.length);
  for(let i=2;i<=12;i++)addPage(String(i));
  const last=slot().children.at(-1);
  slot().insertChild(0,last);
  const linked=await Promise.all(slot().children.map(c=>c.getMainComponentAsync()));
  add('Pages admits twelve and reorders',slot().children.length===12&&slot().children[0].id===last.id&&slot().limitViolations.length===0&&linked.every(c=>c.parent.id===item.id),
    [slot().children.length,slot().limitViolations]);
  slot().children.at(-1).remove();
  addPage('20');
  add('Pages removes and substitutes',slot().children.length===12&&find(slot().children.at(-1),'Label').characters==='20',slot().children.length);
  n.setProperties({type:'compact'});
  add('Compact hides Default-only regions',!slot()&&!find(n,'Rows per page')&&!find(n,'Range'),n.variantProperties.type);
  n.setProperties({type:'default'});
  const restored=slot()?.children.length;
  add('Default Pages override returns after Compact',restored===12,restored);
});
await temp(variant('compact'),async n=>{
  const label=find(n,'Page label');
  const starting=n.width;
  n.setProperties({[props(n,'Page label')]:'Página 123 de 150'});
  add('Compact position and HUG width',starting===213&&n.height===72&&label.characters==='Página 123 de 150'&&n.width>starting,
    [starting,n.width,n.height,label.characters]);
});
const after=page.children.map(n=>n.id);
add('Clean Pagination page',after.join(',')===before.join(',')&&after.length===2,after);
return {status:checks.every(c=>c.pass)?'PASS':'FAIL',checks};
