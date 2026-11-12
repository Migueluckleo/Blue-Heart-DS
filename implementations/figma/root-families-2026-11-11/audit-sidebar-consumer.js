if (figma.fileKey!==DATA.fileKey) throw Error('Wrong file');
figma.skipInvisibleInstanceChildren=false;
const ids=DATA.ids;
const menu=await figma.getNodeByIdAsync(ids.menu);
const top=await figma.getNodeByIdAsync(ids.top);
const sidebar=await figma.getNodeByIdAsync(ids.sidebar);
const help=await figma.getNodeByIdAsync(ids.help);
const ghost=await figma.getNodeByIdAsync(ids.ghost);
const page=menu.parent;
if (page.children.length!==4 || [top,sidebar,help].some(owner=>owner.parent.id!==page.id)) throw Error('Sidebar page scope');
const checks=[];
const add=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
const getKeys=n=>Object.fromEntries(Object.keys(n.componentProperties).map(k=>[k.split('#')[0],k]));
const byName=(n,name)=>n.findOne(c=>c.name===name);
async function temporary(main,fn) {
  await figma.setCurrentPageAsync(main.parent.type==='PAGE'?main.parent:main.parent.parent);
  const instance=main.createInstance();
  const id=instance.id;
  const get=()=>figma.getNodeByIdAsync(id);
  try { await fn(get); } finally { (await get())?.remove(); }
}
const choose=(orientation,type)=>menu.children.find(n=>n.name===`orientation=${orientation}, type=${type}, status=default, isActive=false`);
async function exercise(get,slotName,main) {
  const locate=async()=> (await get()).findOne(node=>node.type==='SLOT'&&node.name===slotName);
  const slot=await locate();
  const initial=slot.children.length;
  while ((await locate()).children.length) (await locate()).children.at(-1).remove();
  add(slotName+' empty',(await locate()).children.length===0 && !(await locate()).limitViolations.length,initial);
  (await locate()).appendChild(main.createInstance());
  add(slotName+' one',(await locate()).children.length===1,(await locate()).children.length);
  const count=initial+2;
  while ((await locate()).children.length<count) (await locate()).appendChild(main.createInstance());
  const before=(await locate()).children.map(c=>c.id);
  const current=await locate();
  current.insertChild(0,current.children.at(-1));
  const after=(await locate()).children;
  const linked=await Promise.all(after.map(node=>node.getMainComponentAsync()));
  add(slotName+' reorder and link',after.length===count && after[0].id===before.at(-1)
    && linked.every(node=>node.parent.id===menu.id),[initial,after.length]);
}
await temporary(top,async get=>{
  await exercise(get,'Menu items',choose('horizontal','collapsed'));
  const n=await get();
  n.resize(900,n.height);
  add('Top bar child width preserved',byName(n,'Menu items').children.every(c=>c.width===200),n.width);
});
await temporary(sidebar.children[0],async get=>{
  add('Sidebar collapsed width',(await get()).width===72,(await get()).width);
  await exercise(get,'Collapsed menu items',choose('vertical','collapsed'));
  await exercise(get,'Collapsed lower options',choose('vertical','collapsed'));
  (await get()).setProperties({state:'expanded'});
  const n=await get();
  add('Sidebar independent expanded content',n.width===234 && byName(n,'Expanded menu items').children.length===10,
    [n.width,byName(n,'Expanded menu items').children.length]);
  await exercise(get,'Expanded menu items',choose('vertical','expanded'));
  await exercise(get,'Expanded lower options',choose('vertical','expanded'));
});
const active=menu.children.find(n=>n.name==='orientation=vertical, type=expanded, status=default, isActive=true');
await temporary(active,async get=>{
  let n=await get();
  const keys=getKeys(n);
  n.setProperties({[keys.Label]:'Etiqueta de menú que excede el ancho disponible',[keys['Show beta']]:false});
  n=await get();
  const label=byName(n,'Label');
  add('Menu item beta and line limit',!byName(n,'Beta').visible && label.textTruncation==='ENDING'
    && label.maxLines===1,label.width);
});
const collapsed=menu.children.find(n=>n.name==='orientation=vertical, type=collapsed, status=hover, isActive=false');
await temporary(collapsed,async get=>{
  const n=await get();
  const tooltip=byName(n,'Tooltip');
  const keys=getKeys(tooltip);
  tooltip.setProperties({[keys.Label]:'Ayuda extendida para comprobar que la burbuja crece con su propio texto'});
  add('Menu item Tooltip grows independently',tooltip.width>68 && tooltip.width<=246,tooltip.width);
});
await temporary(help.children[0],async get=>{
  (await get()).setProperties({status:'hover'});
  const item=byName(await get(),'Menu item');
  const icon=byName(item,'Icon');
  const glyph=byName(icon,'Vector');
  add('Help hover retains Question and variable',(await icon.getMainComponentAsync()).key===DATA.questionFill
    && glyph.boundVariables.fills?.[0]?.id===DATA.questionColor,
    [(await icon.getMainComponentAsync()).key,glyph.boundVariables.fills?.[0]?.id]);
});
const small=ghost.children.find(n=>n.name==='size=small, selected=false, state=default');
await temporary(small,async get=>{
  const n=await get();
  const keys=getKeys(n);
  const caret=await figma.importComponentByKeyAsync(DATA.caret);
  n.setProperties({[keys.Icon]:caret.id,[keys['Show badge']]:true});
  const changed=await get();
  add('Icon Button swap, badge and size',(await byName(changed,'Icon').getMainComponentAsync()).key===DATA.caret
    && byName(changed,'Badge').visible && changed.width===32,changed.width);
});
add('Sidebar page cleanup',page.children.length===4,page.children.map(n=>n.id));
return {checks:checks.length,mismatchCount:checks.filter(x=>!x.pass).length,
  mismatches:checks.filter(x=>!x.pass),observed:checks};
