// DATA is the selected source capture and the verified variable map.
if (figma.fileKey !== DATA.targetFileKey) throw Error('Wrong destination');
const matches = figma.root.children.filter(p => p.name === DATA.pageName);
if (matches.length > 1 || (DATA.pageId && matches[0]?.id !== DATA.pageId)) throw Error('Page identity drift');
const page = matches[0] || figma.createPage();
page.name = DATA.pageName;
await figma.setCurrentPageAsync(page);
if (DATA.applyInstanceOverrides) figma.skipInvisibleInstanceChildren = false;
const created = matches.length ? [] : [page.id];
const key = ([id, t]) => figma.variables.getVariableByIdAsync(t.targetId).then(v => {
  if (!v || v.name !== t.name || v.resolvedType !== t.type) throw Error('Variable mismatch '+t.name);
  return [id,v];
});
const vars = Object.fromEntries(await Promise.all(Object.entries(DATA.tokens).map(key)));
const fonts = [...new Map([...Object.values(DATA.styles).map(s=>s.fontName),...(DATA.fonts??[])].map(font=>[font.family+'/'+font.style,font])).values()];
await Promise.all(fonts.map(({family,style}) => figma.loadFontAsync({family,style})));
const styles = {};
const existingStyles = await figma.getLocalTextStylesAsync();
const basicStyle = ['fontSize','lineHeight','letterSpacing','textDecoration','textCase','paragraphIndent','paragraphSpacing'];
for (const [id, spec] of Object.entries(DATA.styles)) {
  const matches = existingStyles.filter(s => s.name === spec.name);
  if (matches.length > 1) throw Error('Ambiguous style '+spec.name);
  const s = matches[0] || figma.createTextStyle();
  if (!matches.length) {
    created.push(s.id);
    s.name = spec.name;
    s.description = spec.description;
    s.fontName = {family:spec.fontName.family,style:spec.fontName.style};
    for (const prop of basicStyle) if (spec[prop] !== undefined) s[prop] = spec[prop];
    for (const [field,source] of Object.entries(spec.b)) s.setBoundVariable(field,vars[source]);
  }
  for (const [field, source] of Object.entries(spec.b)) {
    if (s.boundVariables[field]?.id !== vars[source].id) throw Error('Style binding drift '+spec.name+' '+field);
  }
  styles[id] = s;
}
const effectStyles = {};
if (DATA.effectStyles) {
  const localEffects = await figma.getLocalEffectStylesAsync();
  for (const [id,spec] of Object.entries(DATA.effectStyles)) {
    const matches = localEffects.filter(style => style.name === spec.name);
    if (matches.length > 1) throw Error('Ambiguous effect style '+spec.name);
    const style = matches[0] || figma.createEffectStyle();
    if (!matches.length) {
      created.push(style.id);
      style.name = spec.name;
      style.description = spec.description;
      style.effects = spec.effects.map(({bindings,...effect}) => {
        for (const [field,source] of Object.entries(bindings??{})) {
          effect = figma.variables.setBoundVariableForEffect(effect,field,vars[source]);
        }
        return effect;
      });
    }
    effectStyles[id] = style.id;
  }
}
const fields = ['layoutMode','layoutWrap','primaryAxisSizingMode','counterAxisSizingMode','primaryAxisAlignItems','counterAxisAlignItems',
  'counterAxisAlignContent','counterAxisSpacing',
  'paddingTop','paddingRight','paddingBottom','paddingLeft','itemSpacing','minWidth','maxWidth','minHeight','maxHeight',
  'strokesIncludedInLayout','clipsContent','cornerRadius','strokeWeight','strokeAlign','rotation','dashPattern','cornerSmoothing',
  'itemReverseZIndex','overflowDirection'];
const gridFields = ['gridRowCount','gridColumnCount','gridRowGap','gridColumnGap','gridRowSizes','gridColumnSizes'];
const gridChildFields = ['gridRowSpan','gridColumnSpan','gridChildHorizontalAlign','gridChildVerticalAlign'];
const textFields = ['fontSize','lineHeight','letterSpacing','textDecoration','textAlignHorizontal','textAlignVertical','textAutoResize','textTruncation','maxLines'];
const nodes = {};
const textStyles = {};
const refs = [];
const deferredTextRanges = [];
const remoteMains = new Map();
const slotKeys = {};
const preferredSet = DATA.slotPreferredId ? await figma.getNodeByIdAsync(DATA.slotPreferredId) : null;
const preferredType = DATA.slotPreferredType ?? 'COMPONENT_SET';
const sharedSlotKeys = {};
let preparedOwner;
function paint(source, variable) {
  if (!variable) return (source??[]).filter(p=>!(DATA.deferImages && p.type==='IMAGE')).map(p => p.gradientStops ? {...p,gradientStops:p.gradientStops.map(stop => {
    const {binding,...value}=stop;
    return binding ? {...value,boundVariables:{color:{type:'VARIABLE_ALIAS',id:vars[binding].id}}} : value;
  })} : p);
  if (source?.length !== 1 || source[0].type !== 'SOLID') throw Error('Expected one solid paint');
  return [figma.variables.setBoundVariableForPaint(source[0],'color',variable)];
}
async function instanceMain(spec) {
  if (!spec.main.remote) return await figma.getNodeByIdAsync(DATA.dependencies?.[spec.main.id]);
  const key = spec.main.key;
  if (!DATA.remoteKeys?.includes(key)) throw Error('Unverified remote component '+key);
  if (!remoteMains.has(key)) {
    const component = await figma.importComponentByKeyAsync(key);
    if (!component.remote || component.key !== key) throw Error('Remote identity drift '+key);
    remoteMains.set(key,component);
  }
  return remoteMains.get(key);
}
async function applyTextRanges(node, ranges) {
  for (const range of ranges) {
    for (const [field,source] of Object.entries(range.b)) {
      if (field === 'fills') node.setRangeFills(range.start,range.end,paint(range.fills,vars[source]));
      else node.setRangeBoundVariable(range.start,range.end,field,vars[source]);
    }
    await node.setRangeTextStyleIdAsync(range.start,range.end,styles[range.textStyleId].id);
  }
}
async function make(spec, parent, preparedNode, componentOwner) {
  let node;
  if (preparedNode) {
    node = preparedNode;
  } else if (spec.type === 'INSTANCE') {
    const main = await instanceMain(spec);
    if (main?.type !== 'COMPONENT') throw Error('Missing instance dependency '+spec.main.id);
    node = main.createInstance();
  } else if (spec.type === 'SLOT') {
    const source = spec.refs.slotContentId;
    const prop = DATA.properties[source];
    if (!componentOwner || (prop.preferredValues?.length && preferredSet?.type !== preferredType)) {
      throw Error('Invalid native slot owner or preferred values');
    }
    const preferredValues = preferredSet ? [{type:preferredType,key:preferredSet.key}] : [];
    node = componentOwner.createSlot();
    const nativeKey = node.componentPropertyReferences.slotContentId;
    if (sharedSlotKeys[source]) {
      const key = sharedSlotKeys[source];
      node.componentPropertyReferences = {slotContentId:key};
      if (nativeKey!==key && nativeKey in preparedOwner.componentPropertyDefinitions) preparedOwner.deleteComponentProperty(nativeKey);
    } else {
      slotKeys[source] = componentOwner.editComponentProperty(nativeKey,{
        name:source.split('#')[0],description:prop.description,slotSettings:prop.slotSettings,
        preferredValues,
      });
      node.componentPropertyReferences = {slotContentId:slotKeys[source]};
    }
  } else {
    const factory = {COMPONENT:'createComponent',TEXT:'createText',ELLIPSE:'createEllipse',VECTOR:'createVector',
      FRAME:'createFrame',LINE:'createLine',RECTANGLE:'createRectangle'}[spec.type];
    if (!factory) throw Error('Unsupported native node '+spec.type);
    node = figma[factory]();
  }
  created.push(node.id);
  nodes[spec.id] = node.id;
  if (!preparedNode && parent.layoutMode==='GRID') {
    parent.appendChildAt(node,spec.gridRowAnchorIndex,spec.gridColumnAnchorIndex);
    for (const field of gridChildFields) node[field] = spec[field];
  } else if (!preparedNode) parent.appendChild(node);
  node.name = spec.name;
  if (spec.type === 'INSTANCE') {
    if (DATA.applyInstanceOverrides && !spec.main.remote) {
      const keys = Object.fromEntries(Object.keys(node.componentProperties).map(key=>[key.split('#')[0],key]));
      const values = Object.fromEntries(Object.entries(spec.instanceProperties)
        .filter(([,prop])=>prop.type === 'BOOLEAN' || prop.type === 'TEXT')
        .map(([key,prop])=>[keys[key.split('#')[0]],prop.value]));
      for (const [source,asset] of Object.entries(spec.swapAssets??{})) {
        const property = keys[source.split('#')[0]];
        if (!property || !asset.remote) continue;
        const current = await figma.getNodeByIdAsync(node.componentProperties[property].value);
        if (current?.key !== asset.key) values[property] = (await instanceMain({main:asset})).id;
      }
      if (Object.keys(values).length) node.setProperties(values);
      if (spec.nestedTooltip) {
        const tip = node.findOne(child=>child.type==='INSTANCE'&&child.name==='Tooltip');
        if (!tip) throw Error('Missing nested Tooltip '+spec.id);
        const tipKeys = Object.fromEntries(Object.keys(tip.componentProperties).map(key=>[key.split('#')[0],key]));
        const tipValues = Object.fromEntries(Object.entries(spec.nestedTooltip)
          .filter(([,prop])=>prop.type==='TEXT')
          .map(([key,prop])=>[tipKeys[key.split('#')[0]],prop.value]));
        tip.setProperties(tipValues);
      }
      if (spec.nestedGlyph) {
        const icon = node.children.find(child=>child.type==='INSTANCE');
        const main = await icon?.getMainComponentAsync();
        const shape = icon?.findOne(child=>child.type==='VECTOR'&&child.name===spec.nestedGlyph.name);
        if (!shape || main?.key!==spec.nestedGlyph.key) throw Error('Unexpected nested glyph '+spec.id);
        if (shape.boundVariables.fills?.[0]?.id!==vars[spec.nestedGlyph.b.fills].id) {
          shape.fills = paint(spec.nestedGlyph.fills,vars[spec.nestedGlyph.b.fills]);
        }
      }
      for (const layer of spec.linkedFills??[]) {
        const target = layer.path.reduce((parent,name)=>parent?.children.find(child=>child.name===name),node);
        if (!target) throw Error('Missing linked fill '+spec.id+' '+layer.path.join('/'));
        if (target.boundVariables.fills?.[0]?.id!==vars[layer.b.fills].id) target.fills = paint(layer.fills,vars[layer.b.fills]);
      }
      if (DATA.overrideInstanceReactions && spec.reactions) {
        const reactions = spec.reactions.map(r=>({...r,actions:r.actions.map(a=>({
          ...a,destinationId:DATA.dependencies[a.destinationId],
        }))}));
        await node.setReactionsAsync(reactions);
      }
      const seen = new Map();
      for (const [name,visible] of spec.instanceVisibility??[]) {
        const index = seen.get(name)??0;
        seen.set(name,index+1);
        const child = node.children.filter(child=>child.name===name)[index];
        if (child && child.visible !== visible) child.visible = visible;
      }
    }
    if (spec.layoutPositioning === 'ABSOLUTE') node.layoutPositioning = 'ABSOLUTE';
    if (!spec.keepNaturalSize) node.resize(spec.width,spec.height);
    if (spec.rotation !== undefined) node.rotation = spec.rotation;
    node.constraints = spec.constraints;
    node.visible = spec.visible;
    if (spec.isExposedInstance !== undefined) node.isExposedInstance = spec.isExposedInstance;
    if (DATA.applyInstanceOverrides && (spec.layoutPositioning !== 'ABSOLUTE' || spec.keepNaturalSize)) {
      node.layoutSizingHorizontal = spec.layoutSizingHorizontal;
      node.layoutSizingVertical = spec.layoutSizingVertical;
    }
    if (DATA.overrideLocalInstanceWidth && !spec.main.remote && spec.b.width &&
        node.boundVariables.width?.id!==vars[spec.b.width].id) {
      node.setBoundVariable('width',vars[spec.b.width]);
    }
    if (!spec.main.remote && DATA.overrideLocalInstanceDimensions) {
      for (const field of ['width','height']) {
        if (spec.b[field] && node.boundVariables[field]?.id!==vars[spec.b[field]].id) {
          node.setBoundVariable(field,vars[spec.b[field]]);
        }
      }
    }
    if (spec.main.remote) {
      for (const [field,source] of Object.entries(spec.b)) {
        if (field === 'fills') node.fills = paint(spec.fills,vars[source]);
        else node.setBoundVariable(field,vars[source]);
      }
    }
    if (spec.vectorFills) {
      const vectors = node.findAllWithCriteria({types:['VECTOR']});
      if (vectors.length !== spec.vectorFills.length) throw Error('Remote vector anatomy drift '+spec.id);
      for (const [index,vector] of vectors.entries()) {
        const expected = spec.vectorFills[index];
        if (vector.name !== expected.name) throw Error('Remote vector identity drift '+spec.id);
        if (expected.b.fills) vector.fills = paint(expected.fills,vars[expected.b.fills]);
      }
    }
    node.x = spec.x;
    node.y = spec.y;
    if (spec.refs) refs.push([node,spec.refs]);
    return node;
  }
  if (spec.type === 'TEXT') {
    const font = spec.fontName ?? spec.segments[0].fontName;
    node.fontName = {family:font.family,style:font.style};
    node.characters = spec.characters;
    for (const field of textFields) if (spec[field] !== undefined) node[field] = spec[field];
  }
  if (spec.type === 'VECTOR') node.vectorPaths = spec.vectorPaths;
  if (spec.type !== 'VECTOR' || (spec.width > 0 && spec.height > 0)) node.resize(spec.width,spec.height);
  if (spec.layoutPositioning === 'ABSOLUTE') node.layoutPositioning = 'ABSOLUTE';
  for (const field of fields) {
    if (field === 'strokesIncludedInLayout' && node.layoutMode === 'NONE') continue;
    if (spec[field] !== undefined && field in node) node[field] = spec[field];
  }
  if (spec.layoutMode==='GRID') {
    for (const field of gridFields) node[field] = spec[field];
  }
  node.visible = spec.visible;
  if (spec.constraints && 'constraints' in node) node.constraints = spec.constraints;
  if (spec.effectStyleId && spec.fills?.some(fill=>fill.gradientStops)) {
    await node.setEffectStyleIdAsync(effectStyles[spec.effectStyleId]);
  }
  node.fills = paint(spec.fills,vars[spec.b.fills]);
  node.strokes = paint(spec.strokes,vars[spec.b.strokes]);
  const owner = node.type==='COMPONENT' ? node : componentOwner;
  for (const child of spec.children ?? []) await make(child,node,undefined,owner);
  for (const field of ['layoutSizingHorizontal','layoutSizingVertical']) {
    if (spec[field] !== undefined && (parent.type !== 'PAGE' || spec[field] !== 'FILL')) node[field] = spec[field];
  }
  for (const [field,source] of Object.entries(spec.b)) {
    if (field !== 'fills' && field !== 'strokes') node.setBoundVariable(field,vars[source]);
  }
  if (spec.type === 'TEXT' && spec.textStyleId) {
    const style = styles[spec.textStyleId];
    if (!style) throw Error('Missing linked text style');
    await node.setTextStyleIdAsync(style.id);
    textStyles[spec.id] = style.id;
  }
  if (spec.segments && spec.refs?.characters) deferredTextRanges.push([node,spec.segments]);
  else if (spec.segments) await applyTextRanges(node,spec.segments);
  if (spec.effectStyleId && !spec.fills?.some(fill=>fill.gradientStops)) {
    await node.setEffectStyleIdAsync(effectStyles[spec.effectStyleId]);
  }
  if (DATA.restoreAbsoluteOffsets) {
    for (const child of spec.children??[]) {
      if (child.layoutPositioning!=='ABSOLUTE') continue;
      const layer=await figma.getNodeByIdAsync(nodes[child.id]);
      layer.x=child.x;
      layer.y=child.y;
    }
  }
  node.x = spec.x;
  node.y = spec.y;
  const references = Object.fromEntries(Object.entries(spec.refs??{}).filter(([field])=>field!=='slotContentId'));
  if (Object.keys(references).length) refs.push([node,references]);
  return node;
}
const existing = page.children.find(n => n.name === DATA.setName);
if (page.children.some(n => n.id !== existing?.id && !DATA.allowedSiblingIds?.includes(n.id)) ||
    (DATA.setId && existing?.id !== DATA.setId)) throw Error('Unexpected family member');
if (existing?.children.some(c => DATA.variants.some(v => v.name === c.name))) throw Error('Variant already exists; inspect');
const standalone = DATA.ownerType === 'COMPONENT';
if (standalone && (existing || DATA.variants.length !== 1)) throw Error('Unexpected standalone owner');
const mains = [];
if (DATA.sharedSlots?.length) {
  if (existing) throw Error('Unexpected shared Slot scope');
  const roots=DATA.variants.map(spec=>{const node=figma.createComponent();node.name=spec.name;return node;});
  preparedOwner=figma.combineAsVariants(roots,page);
  for (const source of DATA.sharedSlots) {
    const prop=DATA.properties[source];
    if (prop.preferredValues?.length && preferredSet?.type!==preferredType) throw Error('Unresolved Slot preference');
    sharedSlotKeys[source]=preparedOwner.addComponentProperty(source.split('#')[0],'SLOT','',{
      description:prop.description,slotSettings:prop.slotSettings,
      preferredValues:preferredSet?[{type:preferredType,key:preferredSet.key}]:[],
    });
  }
  for (const [index,v] of DATA.variants.entries()) mains.push(await make(v,preparedOwner,roots[index]));
} else for (const v of DATA.variants) mains.push(await make(v,page));
const set = existing || preparedOwner || (standalone ? mains[0] : figma.combineAsVariants(mains,page));
if (existing) for (const main of mains) set.appendChild(main);
else if (!standalone) created.push(set.id);
set.name = DATA.setName;
set.description = DATA.description;
if (!standalone) set.fills = [];
const properties = {};
for (const [source, prop] of Object.entries(DATA.properties)) {
  if (prop.type === 'VARIANT') continue;
  if (prop.type === 'SLOT') continue;
  const name = source.split('#')[0];
  const key = Object.keys(set.componentPropertyDefinitions).find(k => k.startsWith(name+'#'));
  if (key) properties[source] = key;
  else if (prop.type === 'INSTANCE_SWAP') {
    const main = await instanceMain({main:DATA.swaps[source]});
    properties[source] = set.addComponentProperty(name,prop.type,main.id,{preferredValues:prop.preferredValues??[]});
  } else properties[source] = set.addComponentProperty(name,prop.type,prop.defaultValue);
}
for (const [node,map] of refs) node.componentPropertyReferences = {...node.componentPropertyReferences,...Object.fromEntries(
  Object.entries(map).map(([field,source]) => {
    if (!properties[source]) throw Error('Unresolved component property '+source);
    return [field,properties[source]];
  }),
)};
for (const [node,ranges] of deferredTextRanges) await applyTextRanges(node,ranges);
for (let i=0;i<mains.length;i++) {
  mains[i].x = DATA.variants[i].x;
  mains[i].y = DATA.variants[i].y;
}
if (!standalone) set.resize(Math.max(...set.children.map(n=>n.x+n.width))+24,Math.max(...set.children.map(n=>n.y+n.height))+24);
if (DATA.setGeometry) {
  if (!standalone) set.resize(DATA.setGeometry.width,DATA.setGeometry.height);
  set.x = DATA.setGeometry.x;
  set.y = DATA.setGeometry.y;
}
if (DATA.setLayout) {
  for (const [field,value] of Object.entries(DATA.setLayout)) set[field]=value;
  for (const [index,main] of mains.entries()) {
    main.layoutSizingHorizontal=DATA.variants[index].layoutSizingHorizontal;
    main.layoutSizingVertical=DATA.variants[index].layoutSizingVertical;
  }
}
return {fileKey:figma.fileKey,pageId:page.id,setId:set.id,createdNodeIds:created,mutatedNodeIds:[page.id,set.id],nodes,textStyles,
  styles:Object.fromEntries(Object.entries(styles).map(([source,s])=>[source,s.id])),effectStyles,
  variants:mains.map(n=>({id:n.id,name:n.name})),properties:set.componentPropertyDefinitions};
