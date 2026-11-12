if (figma.fileKey !== DATA.targetFileKey) throw Error('Wrong destination');
const set = await figma.getNodeByIdAsync(DATA.setId);
const radio = await figma.getNodeByIdAsync(DATA.radioId);
if (set?.parent?.id !== DATA.pageId || radio?.parent?.id !== DATA.pageId) throw Error('Unexpected page');
const page = set.parent;
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = false;
const checks = [];
function check(name, result, observed) { checks.push({name,pass:Boolean(result),observed}); }
const defs = set.componentPropertyDefinitions;
const options = Object.keys(defs).filter(key=>defs[key].type === 'SLOT');
const keys = Object.fromEntries(Object.keys(defs).map(key=>[key.split('#')[0],key]));
const radioKeys = Object.fromEntries(Object.keys(radio.componentPropertyDefinitions).map(key=>[key.split('#')[0],key]));
const restrictions = defs[options[0]];
check('single native Options',options.length===1 && options[0]===keys.Options,options);
check('native bounds and restriction',restrictions.slotSettings.minChildren===2 && restrictions.slotSettings.maxChildren===5 &&
  restrictions.slotSettings.allowPreferredValuesOnly && restrictions.preferredValues[0]?.key===radio.key,restrictions);
check('page ownership',page.children.length===2 && page.children.some(node=>node.id===radio.id),page.children.map(node=>node.id));
check('description and guide',set.description===DATA.description && set.documentationLinks[0]?.uri===DATA.guide,set.documentationLinks);
let bindings = 0;
let links = 0;
async function inspect(spec,node) {
  const id = DATA.nodes[spec.id];
  check('node '+spec.id,node?.id===id && node.type===spec.type && node.name===spec.name,
    [node?.id,node?.type,node?.name]);
  for (const field of ['width','height','x','y']) {
    check(spec.id+' '+field,Math.abs(node[field]-spec[field])<.03,node[field]);
  }
  if (spec.characters !== undefined) check(spec.id+' text',node.characters===spec.characters,node.characters);
  if (spec.textStyleId) check(spec.id+' style',node.textStyleId===DATA.styles[spec.textStyleId],node.textStyleId);
  if (spec.refs) for (const [field,key] of Object.entries(spec.refs)) {
    check(spec.id+' reference '+field,node.componentPropertyReferences[field]===keys[key.split('#')[0]],
      node.componentPropertyReferences[field]);
  }
  for (const [field,src] of Object.entries(spec.b)) {
    const value = node.boundVariables[field];
    const actual = Array.isArray(value) ? value[0]?.id : value?.id;
    check(spec.id+' '+field,actual===DATA.tokens[src].targetId,actual);
    bindings++;
  }
  if (spec.type==='INSTANCE') {
    const main = await node.getMainComponentAsync();
    check(spec.id+' official Radio',main?.id===DATA.radioNodes[spec.main.id],main?.id);
    links++;
  }
  for (let i=0;i<spec.children.length;i++) await inspect(spec.children[i],node.children[i]);
}
for (let i=0;i<DATA.variants.length;i++) await inspect(DATA.variants[i],set.children[i]);
const sample = set.children[0].createInstance();
const sampleId = sample.id;
const get = async () => await figma.getNodeByIdAsync(sampleId);
const slot = async () => (await get()).findOne(n=>n.type==='SLOT');
const counts = async label => {
  const current = await slot();
  return {label,count:current.children.length,violations:current.limitViolations};
};
const observations = [];
try {
  const first = await slot();
  const selectedMain = await first.children[0].getMainComponentAsync();
  const defaultMain = await first.children[1].getMainComponentAsync();
  observations.push(await counts('default sample'));
  const setCount = async n => {
    while ((await slot()).children.length>n) (await slot()).children.at(-1).remove();
    while ((await slot()).children.length<n) (await slot()).appendChild(defaultMain.createInstance());
  };
  for (const n of [2,1,0,5,6]) {
    await setCount(n);
    observations.push(await counts('vertical '+n));
  }
  await setCount(2);
  const wrong = figma.createFrame();
  try {
    (await slot()).appendChild(wrong);
    observations.push(await counts('foreign frame'));
  } catch (error) {
    observations.push({label:'foreign frame',rejected:String(error)});
  } finally {
    if (!wrong.removed) wrong.remove();
  }
  const testSlot = await slot();
  const widthBefore = (await get()).width;
  const custom = selectedMain.createInstance();
  testSlot.insertChild(0,custom);
  (await slot()).children[0].setProperties({[radioKeys.Label]:'Opción personalizada para comprobar etiquetas largas',[radioKeys['Show label']]:true});
  check('long label expands the group',(await get()).width > widthBefore,(await get()).width);
  const reorder = await slot();
  reorder.insertChild(1,reorder.children[0]);
  const signature = async () => (await slot()).children.map(n=>({
    name:n.componentProperties[radioKeys.Label]?.value,selected:n.componentProperties.selected?.value,
  }));
  const before = await signature();
  (await get()).setProperties({direction:'horizontal'});
  observations.push(await counts('horizontal 3'));
  check('direction preserves custom order, label and selection',JSON.stringify(await signature())===JSON.stringify(before),await signature());
  (await get()).setProperties({state:'error',[keys['Helper text']]:'changed'});
  const helper = (await get()).findOne(n=>n.type==='TEXT'&&n.name==='Helper text');
  check('error preserves custom options',JSON.stringify(await signature())===JSON.stringify(before),await signature());
  check('error message fixed',helper.characters==='Select an option',helper.characters);
  (await get()).setProperties({[keys['Show helper text']]:false});
  check('error helper can hide',!(await get()).findOne(n=>n.type==='TEXT'&&n.name==='Helper text').visible,null);
  check('title stays visible when helper hides',(await get()).findOne(n=>n.type==='TEXT'&&n.name==='Title').visible,null);
  (await get()).setProperties({state:'default',[keys['Show helper text']]:true,[keys['Helper text']]:'Ayuda visible'});
  check('default message editable',(await get()).findOne(n=>n.type==='TEXT'&&n.name==='Helper text').characters==='Ayuda visible',null);
  await setCount(4);
  observations.push(await counts('horizontal 4 (consumer limit)'));
  await setCount(2);
  observations.push(await counts('horizontal 2'));
} catch (error) {
  check('consumer operation',false,String(error));
} finally {
  (await get())?.remove();
}
check('ephemeral consumer removed',page.children.length===2,page.children.map(node=>node.id));
return {setId:set.id,variantCount:set.children.length,bindings,links,observations,
  checks:checks.length,mismatches:checks.filter(item=>!item.pass)};
