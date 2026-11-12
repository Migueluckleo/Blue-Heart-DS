figma.skipInvisibleInstanceChildren=false;
const tab=await figma.getNodeByIdAsync('113:86');
const tabs=await figma.getNodeByIdAsync('113:207');
const page=tabs.parent;
await figma.setCurrentPageAsync(page);
const before=page.children.map(n=>n.id);
const checks=[];
const add=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
const find=(n,name)=>n.findOne(c=>c.name===name);
const equal=(a,b)=>Math.abs(a-b)<.03;
const prop=(n,name)=>Object.keys(n.componentProperties).find(k=>k.split('#')[0]===name);
const owner=(type,selected='false',state='default')=>tab.children.find(n=>n.variantProperties.type===type&&n.variantProperties.selected===selected&&n.variantProperties.state===state);
async function temp(main,run){const n=main.createInstance();try{await run(n);}finally{n.remove();}}
for(const type of ['underline','pill','segmented']){
 const expected={underline:44,pill:36,segmented:28}[type];
 await temp(owner(type,'true','focus'),async n=>{
  n.setProperties({[prop(n,'Label')]:'Etiqueta larga para vista contable',[prop(n,'Show icon')]:true,[prop(n,'Show badge')]:true});
  const icon=find(n,'Icon'), badge=find(n,'Badge'), ring=find(n,'Focus ring');
  badge.setProperties({[prop(badge,'Count')]:'99+'});
  const linked=await Promise.all([icon.getMainComponentAsync(),badge.getMainComponentAsync()]);
  add(type+' options, Dot, and long focus ring',linked[0].key==='f273018f11d7d4e938078bd0b21b0b3a9e7f2634'&&linked[1].parent.name==='Dot'
    &&badge.visible&&icon.visible&&find(badge,'Count').characters==='99+'&&n.height===expected&&equal(ring.width,n.width+8)&&ring.x===-4,
    [n.width,n.height,ring.width,ring.x,linked[1].id]);
 });
 await temp(tabs.children.find(c=>c.variantProperties.type===type),async n=>{
  const locate=()=>n.findOne(c=>c.type==='SLOT'&&c.name==='Tabs');
  const initial=locate().children;
  add(type+' linked default selection',initial.length===4&&initial.filter(c=>c.variantProperties.selected==='true').length===1
    &&initial.every(c=>c.variantProperties.type===type),initial.map(c=>c.variantProperties.selected));
  while(locate().children.length)locate().children.at(-1).remove();
  const empty=locate().limitViolations.map(v=>typeof v==='string'?v:v.type);
  locate().appendChild(owner(type,'true').createInstance());
  const one=locate().limitViolations.map(v=>typeof v==='string'?v:v.type);
  add(type+' min two',empty.includes('BELOW_MIN')&&one.includes('BELOW_MIN'),[empty,one]);
  locate().appendChild(owner(type).createInstance());
  add(type+' two valid',locate().children.length===2&&locate().limitViolations.length===0,locate().children.length);
  for(let i=0;i<4;i++)locate().appendChild(owner(type).createInstance());
  const last=locate().children.at(-1);
  last.setProperties({[prop(last,'Label')]:'Nombre extenso para comprobar crecimiento del grupo'});
  locate().insertChild(0,last);
  const ordered=locate().children;
  const linked=await Promise.all(ordered.map(c=>c.getMainComponentAsync()));
  add(type+' six, long label and reorder',ordered.length===6&&ordered[0].id===last.id&&linked.every(c=>c.parent.id===tab.id)
    &&ordered.filter(c=>c.variantProperties.selected==='true').length===1&&locate().limitViolations.length===0&&n.width>300,
    [ordered.length,n.width]);
  if(type==='underline'){
    const divider=find(n,'Divider');
    add('Underline Divider follows width and bottom',equal(divider.width,n.width)&&equal(divider.y,n.height-1)&&!n.clipsContent,
      [divider.width,n.width,divider.y,n.height]);
  }
  const next=type==='segmented'?'underline':'segmented';
  n.setProperties({type:next});
  const slot=locate();
  add(type+' same Slot override in other presentation',slot?.children.length===6,slot?.children.length);
  for(const c of slot.children)c.setProperties({type:next});
  add(type+' host coordinates Tab types',slot.children.every(c=>c.variantProperties.type===next)&&slot.children.filter(c=>c.variantProperties.selected==='true').length===1,
    slot.children.map(c=>c.variantProperties.type));
 });
}
const after=page.children.map(n=>n.id);
add('Clean Tabs page',after.join(',')===before.join(',')&&after.length===2,after);
return {status:checks.every(c=>c.pass)?'PASS':'FAIL',checks};
