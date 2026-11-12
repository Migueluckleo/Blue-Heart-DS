figma.skipInvisibleInstanceChildren=false;
const get=id=>figma.getNodeByIdAsync(id);
const descendant=(n,name)=>n.findOne(c=>c.name===name);
const key=(n,name)=>Object.keys(n.componentProperties).find(k=>k.split('#')[0]===name);
const groups={avatar:[],header:[]};
let checks=groups.avatar;
const add=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
async function temp(main,fn){
  const page=main.parent.type==='PAGE'?main.parent:main.parent.parent;
  await figma.setCurrentPageAsync(page);
  const before=page.children.map(n=>n.id).join(',');
  const instance=main.createInstance();
  try {await fn(instance);} catch(e){add(main.name,false,String(e));}
  finally {instance.remove();add(main.name+' cleanup',before===page.children.map(n=>n.id).join(','),page.id);}
}
const avatar=await get('83:18');
const group=await get('85:10');
const variant=(type,size)=>avatar.children.find(n=>n.name===`type=${type}, size=${size}`);
await temp(variant('text','extra-large'),async n=>{
  n.setProperties({[key(n,'Initials')]:'ÁL',[key(n,'Show status')]:false});
  add('Avatar initials and Status',descendant(n,'Initials')?.characters==='ÁL'&&!descendant(n,'Status')?.visible,[descendant(n,'Initials')?.characters,descendant(n,'Status')?.visible]);
  n.setProperties({type:'icon',[key(n,'Show status')]:true});
  const asset=await figma.importComponentByKeyAsync('ac05f135edf1318580f23b4e20de17744d0453f7');
  n.setProperties({[key(n,'Icon')]:asset.id});
  const icon=n.findOne(c=>c.type==='INSTANCE'&&c.name==='Icon');
  add('Avatar official Icon swap and Status', (await icon?.getMainComponentAsync())?.key===asset.key&&descendant(n,'Status')?.visible,[asset.key,descendant(n,'Status')?.visible]);
});
for(const main of group.children) await temp(main,async n=>{
  const size=main.variantProperties.size;
  const locate=()=>descendant(n,'Avatars');
  while(locate().children.length) locate().children.at(-1).remove();
  const empty=locate().limitViolations.map(v=>typeof v==='string'?v:v.type);
  for(const type of ['text','icon','text','icon']){
    const child=variant(type,size).createInstance();
    child.setProperties({[key(child,'Show status')]:false});
    locate().appendChild(child);
    if(locate().children.length===2) add(size+' lower valid',locate().limitViolations.length===0,locate().children.length);
  }
  const before=locate().children.map(c=>c.id);
  locate().insertChild(0,locate().children.at(-1));
  const linked=await Promise.all(locate().children.map(c=>c.getMainComponentAsync()));
  add(size+' four reorder official children',locate().children.length===4&&locate().children[0].id===before.at(-1)&&linked.every(c=>c.parent.id===avatar.id&&c.variantProperties.size===size)&&locate().limitViolations.length===0,linked.map(c=>c.name));
  locate().appendChild(variant('text',size).createInstance());
  const overflow=locate().limitViolations.map(v=>typeof v==='string'?v:v.type);
  add(size+' cardinality limits',empty.includes('BELOW_MIN')&&overflow.includes('ABOVE_MAX'),[empty,overflow]);
});
checks=groups.header;
const company=await get('90:105');
const account=await get('90:138');
const actions=await get('90:437');
const header=await get('90:439');
await temp(company.children[0],async n=>{
  const long='Empresa de prueba con un nombre extendido de varias palabras';
  n.setProperties({[key(n,'Company name')]:long,state:'open'});
  const label=descendant(n,'Company name');
  const caret=descendant(n,'Caret');
  add('Company long name and open caret',label?.characters===long&&Math.abs(caret?.rotation)===180,[label?.characters,label?.textTruncation,caret?.rotation]);
  for(const width of [240,280,320]){n.resize(width,n.height);add('Company width '+width,n.width===width,n.width);}
});
await temp(account.children[0],async n=>{
  n.setProperties({state:'open'});
  const linked=await descendant(n,'Avatar').getMainComponentAsync();
  add('User open and official 48px Avatar',n.variantProperties.state==='open'&&linked.parent.id===avatar.id&&descendant(n,'Avatar').width===48,[n.variantProperties.state,linked.id,descendant(n,'Avatar').width]);
});
await temp(actions.children[0],async n=>{
  for(const count of [5,4,3,2,1]){
    n.setProperties({actions:String(count)});
    const controls=n.findAll(c=>c.type==='INSTANCE'&&c.name==='icon-button');
    const linked=await Promise.all(controls.map(c=>c.getMainComponentAsync()));
    add('Header actions '+count,controls.length===count&&linked.every(c=>c.parent.name==='Icon Button/ghost')&&Boolean(descendant(n,'Notificaciones')),linked.map(c=>c.parent.name));
  }
});
await temp(header,async n=>{
  for(const width of [1280,1152]){n.resize(width,n.height);add('Header width '+width,n.width===width&&n.height===96,[n.width,n.height]);}
  for(const [name,layer] of [['Show version','Version'],['Show company','Company'],['Show actions','Actions'],['Show user','User selector']]){
    n.setProperties({[key(n,name)]:false});
    const target=descendant(n,layer);
    add(name,target?.visible===false,target?.visible);
    if(layer==='Version') add('Badge inside version visibility',target?.findOne(c=>c.name==='Release badge')!==null,target?.id);
    n.setProperties({[key(n,name)]:true});
  }
  n.setProperties({[key(n,'Show release badge')]:false});
  add('Release badge optional',descendant(n,'Release badge')?.visible===false,descendant(n,'Release badge')?.visible);
  const brand=await descendant(n,'contables').getMainComponentAsync();
  add('Header official brand key',brand.key==='e1770fa0d28362f0b2f2045caab556a5d18b7158',brand.key);
});
return Object.fromEntries(Object.entries(groups).map(([name,checks])=>[name,{status:checks.every(c=>c.pass)?'PASS':'FAIL',checks}]));
