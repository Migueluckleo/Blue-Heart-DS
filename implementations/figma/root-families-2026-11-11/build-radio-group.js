// Run with the variable/style preparation prefix of build-native-set.js and RADIO-GROUP-001 data.
const radio = await figma.getNodeByIdAsync(DATA.radioId);
if (page.name !== 'Radio Buttons' || radio?.parent?.id !== page.id ||
    page.children.length !== 1 || radio.name !== 'Radio') throw Error('Unexpected Radio family page');
const radioKeys = Object.fromEntries(Object.keys(radio.componentPropertyDefinitions).map(key=>[key.split('#')[0],key]));
const slotDef = Object.values(DATA.properties).find(prop=>prop.type === 'SLOT');
const nodes = {};
const group = [];
let base;
let propKeys;
function assign(name, value, node) {
  if (value !== undefined && name in node) node[name] = value;
}
async function decorate(node, spec) {
  nodes[spec.id] = node.id;
  node.name = spec.name;
  if (spec.type === 'INSTANCE') return;
  node.resize(spec.width,spec.height);
  for (const field of ['layoutMode','primaryAxisSizingMode','counterAxisSizingMode',
    'primaryAxisAlignItems','counterAxisAlignItems','paddingTop','paddingBottom','paddingLeft','paddingRight',
    'itemSpacing','clipsContent','layoutSizingHorizontal','layoutSizingVertical','visible']) assign(field,spec[field],node);
  if (node.type === 'TEXT') {
    node.fontName = {family:spec.fontName.family,style:spec.fontName.style};
    node.characters = spec.characters;
    node.textAutoResize = spec.textAutoResize;
    await node.setTextStyleIdAsync(styles[spec.textStyleId].id);
  }
  node.fills = spec.b.fills
    ? spec.fills.map(fill=>figma.variables.setBoundVariableForPaint(fill,'color',vars[spec.b.fills]))
    : spec.fills;
  for (const [field, key] of Object.entries(spec.b)) {
    if (field !== 'fills') node.setBoundVariable(field,vars[key]);
  }
}
for (const v of DATA.variants) {
  const root = base ? base.clone() : figma.createComponent();
  if (!base) {
    root.layoutMode = 'VERTICAL';
    root.appendChild(figma.createText());
    const slot = root.createSlot();
    slot.name = 'Options';
    const key = root.editComponentProperty(slot.componentPropertyReferences.slotContentId,{
      name:'Options',description:slotDef.description,slotSettings:slotDef.slotSettings,
      preferredValues:[{type:'COMPONENT_SET',key:radio.key}],
    });
    slot.componentPropertyReferences = {slotContentId:key};
    root.appendChild(figma.createText());
    propKeys = {Options:key};
    for (const [source, prop] of Object.entries(DATA.properties)) {
      if (prop.type === 'TEXT' || prop.type === 'BOOLEAN') {
        const name = source.split('#')[0];
        propKeys[name] = root.addComponentProperty(name,prop.type,prop.defaultValue);
      }
    }
  }
  page.appendChild(root);
  const [title,slot,helper] = root.children;
  if (slot.type !== 'SLOT') throw Error('Native Options slot missing');
  const [titleSpec,slotSpec,helperSpec] = v.children;
  await decorate(root,v);
  await decorate(title,titleSpec);
  await decorate(slot,slotSpec);
  await decorate(helper,helperSpec);
  for (let i=0; i<slotSpec.children.length; i++) {
    const spec = slotSpec.children[i];
    const main = await figma.getNodeByIdAsync(DATA.radioNodes[spec.main.id]);
    if (main?.parent?.id !== radio.id) throw Error('Missing official Radio variant '+spec.main.id);
    const option = slot.children[i] ?? main.createInstance();
    if (i >= slot.children.length) slot.appendChild(option);
    if ((await option.getMainComponentAsync())?.id !== main.id) option.swapComponent(main);
    const values = Object.fromEntries(Object.entries(spec.instanceProperties)
      .filter(([,prop])=>prop.type === 'BOOLEAN' || prop.type === 'TEXT')
      .map(([key,prop])=>[radioKeys[key.split('#')[0]],prop.value]));
    option.setProperties(values);
    await decorate(option,spec);
  }
  for (const [node,spec] of [[title,titleSpec],[helper,helperSpec]]) {
    node.componentPropertyReferences = Object.fromEntries(
      Object.entries(spec.refs).map(([field,key])=>[field,propKeys[key.split('#')[0]]]),
    );
    node.characters = spec.characters;
  }
  group.push(root);
  if (!base) base = root;
}
const set = figma.combineAsVariants(group,page);
set.name = 'Radio group';
set.fills = [];
set.clipsContent = false;
set.resize(726,312);
set.x = 600;
set.y = 100;
set.description = DATA.description;
set.documentationLinks = [{uri:DATA.guide}];
const defs = set.componentPropertyDefinitions;
const options = Object.keys(defs).filter(key=>defs[key].type === 'SLOT');
if (options.length !== 1 || group.some(root=>root.children[1].componentPropertyReferences.slotContentId !== options[0])) {
  throw Error('Options identity not shared');
}
for (let i=0;i<group.length;i++) {
  group[i].x = DATA.variants[i].x;
  group[i].y = DATA.variants[i].y;
}
return {setId:set.id,pageId:page.id,radioId:radio.id,radioKey:radio.key,properties:defs,
  createdNodeIds:[set.id,...Object.values(nodes)],mutatedNodeIds:[page.id],nodes,
  styles:Object.fromEntries(Object.entries(styles).map(([source,s])=>[source,s.id]))};
