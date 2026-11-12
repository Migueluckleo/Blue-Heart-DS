// DATA contains destination IDs, approved variant data and identity expectations.
if (figma.fileKey !== DATA.fileKey) throw Error('Wrong destination');
const set = await figma.getNodeByIdAsync(DATA.setId);
if (set?.type !== (DATA.ownerType??'COMPONENT_SET') || set.parent?.id !== DATA.pageId) throw Error('Unexpected set');
await figma.setCurrentPageAsync(set.parent);
if (DATA.applyInstanceOverrides) figma.skipInvisibleInstanceChildren = false;
const mismatches = [];
let checkedNodes = 0;
let checkedBindings = 0;
const preferredSet = DATA.slotPreferredId ? await figma.getNodeByIdAsync(DATA.slotPreferredId) : null;
const preferredType = DATA.slotPreferredType ?? 'COMPONENT_SET';
function equal(actual, expected) {
  if (typeof expected === 'number') return typeof actual === 'number' && Math.abs(actual - expected) < .03;
  if (Array.isArray(expected)) return Array.isArray(actual) && actual.length === expected.length
    && expected.every((item, index) => equal(actual[index], item));
  if (expected && typeof expected === 'object') return actual && typeof actual === 'object'
    && Object.keys(expected).every(key => equal(actual[key], expected[key]));
  return actual === expected;
}
function check(id, key, actual, expected) {
  if (!equal(actual, expected)) mismatches.push({id,key,actual,expected});
}
async function verify(source, node) {
  const id = source.id;
  if (!node || node.id !== DATA.nodes[id]) {
    mismatches.push({id,key:'id',actual:node?.id,expected:DATA.nodes[id]});
    return;
  }
  checkedNodes++;
  const hiddenDescription = DATA.auditHiddenDescription && source.name==='Description'
    && source.type==='TEXT' && source.visible===false;
  for (const field of ['name','type','width','height','x','y','visible','layoutMode','layoutPositioning',
    'layoutSizingHorizontal','layoutSizingVertical','clipsContent','strokeAlign','rotation','characters',
    'constraints','minWidth','maxWidth','minHeight','maxHeight','dashPattern','textTruncation','maxLines','isExposedInstance',
    'itemReverseZIndex','layoutWrap','counterAxisSpacing','counterAxisAlignContent','overflowDirection',
    'gridRowCount','gridColumnCount','gridRowGap','gridColumnGap','gridRowSizes','gridColumnSizes',
    'gridRowAnchorIndex','gridColumnAnchorIndex','gridRowSpan','gridColumnSpan','gridChildHorizontalAlign','gridChildVerticalAlign']) {
    if (hiddenDescription && field.startsWith('layoutSizing')) continue;
    if (source[field] !== undefined) check(id,field,node[field],source[field]);
  }
  if (hiddenDescription) {
    check(id,'Description stretch while hidden',node.layoutAlign,'STRETCH');
    check(id,'Description grows when shown',node.textAutoResize,'HEIGHT');
  }
  if (source.textStyleId) check(id,'textStyleId',node.textStyleId,DATA.styles[source.textStyleId]);
  if (source.segments) {
    const parts = node.getStyledTextSegments(['textStyleId','boundVariables','fills']);
    const actual = parts.map(part=>({
      start:part.start,end:part.end,textStyleId:part.textStyleId,
      b:Object.fromEntries([...Object.entries(part.boundVariables).map(([field,v])=>[field,v.id]),
        ['fills',part.fills[0]?.boundVariables?.color?.id]]),
    }));
    const expected = source.segments.map(part=>({
      start:part.start,end:part.end,textStyleId:DATA.styles[part.textStyleId],
      b:Object.fromEntries(Object.entries(part.b).map(([field,key])=>[field,DATA.tokens[key].targetId])),
    }));
    check(id,'mixed text ranges',actual,expected);
  }
  if (source.effectStyleId) check(id,'effectStyleId',node.effectStyleId,DATA.effectStyleIds[source.effectStyleId]);
  if (source.vectorPaths) check(id,'vectorPaths',node.vectorPaths,source.vectorPaths);
  for (const [index,paint] of (source.fills??[]).entries()) {
    if (paint.type==='IMAGE') check(id,'image fill',node.fills[index],paint);
    if (!paint.gradientStops) continue;
    const actual = node.fills[index];
    check(id,'gradient transform',actual?.gradientTransform,paint.gradientTransform);
    check(id,'gradient opacity',actual?.opacity,paint.opacity);
    check(id,'gradient stops',actual?.gradientStops?.map(stop=>({
      position:stop.position, id:stop.boundVariables?.color?.id,
    })),paint.gradientStops.map(stop=>({position:stop.position,id:DATA.tokens[stop.binding]?.targetId})));
    checkedBindings += paint.gradientStops.filter(stop=>stop.binding).length;
  }
  if (source.refs) {
    for (const [field,key] of Object.entries(source.refs)) {
      check(id,'refs '+field,node.componentPropertyReferences?.[field]?.split('#')[0],key.split('#')[0]);
    }
  }
  if (source.reactions) {
    const expected = source.reactions.map(r => ({...r,actions:r.actions.map(a => ({
      ...a,destinationId:DATA.nodes[a.destinationId]??DATA.dependencies?.[a.destinationId],
    }))}));
    check(id,'reactions',node.reactions,expected);
  }
  for (const [field,variable] of Object.entries(source.b)) {
    const bound = node.boundVariables?.[field];
    check(id,'variable '+field,Array.isArray(bound) ? bound[0]?.id : bound?.id,DATA.tokens[variable].targetId);
    checkedBindings++;
  }
  if (source.type === 'INSTANCE') {
    const main = await node.getMainComponentAsync();
    if (source.main.remote) {
      check(id,'official remote key',main?.remote && main.key,source.main.key);
      const shapes = node.findAllWithCriteria({types:['VECTOR']});
      check(id,'remote vector layers',shapes.map(shape=>shape.name),source.vectorFills.map(shape=>shape.name));
      for (const [index,vector] of source.vectorFills.entries()) {
        if (vector.b.fills) {
          check(id,'remote vector fill '+index,shapes[index]?.boundVariables.fills?.[0]?.id,DATA.tokens[vector.b.fills].targetId);
          checkedBindings++;
        }
      }
    } else {
      check(id,'main ID',main?.id,DATA.dependencies[source.main.id]);
      if (DATA.applyInstanceOverrides) {
        const properties = Object.fromEntries(Object.entries(node.componentProperties).map(([key,prop])=>[key.split('#')[0],prop]));
        for (const [key,prop] of Object.entries(source.instanceProperties)) {
          if (prop.type === 'TEXT' || prop.type === 'BOOLEAN') {
            check(id,'override '+key,properties[key.split('#')[0]]?.value,prop.value);
          }
        }
        for (const [key,asset] of Object.entries(source.swapAssets??{})) {
          if (!asset.remote) continue;
          const actual = await figma.getNodeByIdAsync(properties[key.split('#')[0]]?.value);
          check(id,'nested swap '+key,actual?.key,asset.key);
        }
        const icon = source.nestedGlyph && node.children.find(child=>child.type==='INSTANCE');
        const iconKey = (await icon?.getMainComponentAsync())?.key;
        const seen = new Map();
        for (const [name,visible] of source.instanceVisibility??[]) {
          const index = seen.get(name)??0;
          seen.set(name,index+1);
          const layer = node.children.filter(child=>child.name===name)[index]
            ?? (source.nestedGlyph && iconKey===source.nestedGlyph.key ? icon : undefined);
          check(id,'nested visibility '+name,layer?.visible,visible);
        }
        if (source.nestedGlyph) {
          const glyph = icon?.findOne(child=>child.type==='VECTOR'&&child.name===source.nestedGlyph.name);
          check(id,'nested glyph key',iconKey,source.nestedGlyph.key);
          check(id,'nested glyph fill',glyph?.boundVariables.fills?.[0]?.id,DATA.tokens[source.nestedGlyph.b.fills].targetId);
          checkedBindings++;
        }
        if (source.nestedBadge) {
          const badge = node.findOne(child=>child.type==='INSTANCE'&&child.name==='Badge');
          check(id,'notification Dot visibility',badge?.visible,source.nestedBadge.visible);
          const actual = Object.fromEntries(Object.entries(badge?.componentProperties??{}).map(([key,value])=>[key.split('#')[0],value.value]));
          const expected = Object.fromEntries(Object.entries(source.nestedBadge.properties).map(([key,value])=>[key.split('#')[0],value.value]));
          check(id,'notification Dot properties',actual,expected);
        }
        for (const layer of source.linkedFills??[]) {
          const target = layer.path.reduce((parent,name)=>parent?.children.find(child=>child.name===name),node);
          check(id,'linked fill '+layer.path.join('/'),target?.boundVariables.fills?.[0]?.id,DATA.tokens[layer.b.fills].targetId);
          checkedBindings++;
        }
      }
    }
    return;
  }
  if (DATA.auditRowsSeparately && source.type==='SLOT' && source.name==='Rows') return;
  check(id,'children',node.children?.map(c=>c.id)??[],(source.children??[]).map(c=>DATA.nodes[c.id]));
  for (let index=0; index < (source.children??[]).length; index++) await verify(source.children[index],node.children[index]);
}
check(set.id,'pageName',set.parent.name,DATA.pageName);
for (const [field,value] of Object.entries(DATA.setLayout??{})) check(set.id,'set '+field,set[field],value);
check(set.id,'description',set.description,DATA.description);
check(set.id,'links',set.documentationLinks,DATA.links);
check(set.id,'variant IDs',set.type==='COMPONENT'?[set.id]:set.children.map(n=>n.id),DATA.variantIds);
for (const [source,spec] of Object.entries(DATA.effectStyles??{})) {
  const style = await figma.getStyleByIdAsync(DATA.effectStyleIds[source]);
  check(set.id,'effect style name',style?.name,spec.name);
  const expected = spec.effects.map(({bindings,...effect}) => {
    if (bindings) effect.boundVariables = Object.fromEntries(Object.entries(bindings)
      .map(([field,id])=>[field,{type:'VARIABLE_ALIAS',id:DATA.tokens[id].targetId}]));
    return effect;
  });
  check(set.id,'effect style values',style?.effects,expected);
}
for (const [key,property] of Object.entries(DATA.properties)) {
  const name = key.split('#')[0];
  const definition = Object.entries(set.componentPropertyDefinitions).find(([k])=>k.split('#')[0]===name)?.[1];
  if (property.type==='INSTANCE_SWAP') {
    const main = await figma.getNodeByIdAsync(definition?.defaultValue);
    check(set.id,'swap '+name,[definition?.type,main?.remote,main?.key],[property.type,true,DATA.swaps[key].key]);
  } else if (property.type==='SLOT') {
    const preferredValues=preferredSet?[{type:preferredType,key:preferredSet.key}]:property.preferredValues;
    check(set.id,'slot '+name,definition,{...property,preferredValues});
  } else if (DATA.ignoreVariantOptionOrder?.includes(name)) {
    check(set.id,'property '+name,{...definition,variantOptions:[...definition.variantOptions].sort()},
      {...property,variantOptions:[...property.variantOptions].sort()});
  } else check(set.id,'property '+name,definition,property);
}
for (const source of DATA.variants) await verify(source,await figma.getNodeByIdAsync(DATA.nodes[source.id]));
return {setId:set.id,pageId:set.parent.id,checkedNodes,checkedBindings,checkedVariants:DATA.variants.length,mismatchCount:mismatches.length,mismatches:mismatches.slice(0,45)};
