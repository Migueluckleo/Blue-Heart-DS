// Supply DATA from the delegated recipe and verified destination IDs.
if (figma.fileKey !== DATA.fileKey) throw Error('Wrong destination');
const page = await figma.getNodeByIdAsync(DATA.pageId);
if (!page || page.type !== 'PAGE' || page.name !== DATA.pageName) throw Error('Wrong family page');
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = false;
const entries = Object.entries(DATA.tokens);
const checked = await Promise.all(entries.map(([, t]) => figma.variables.getVariableByIdAsync(t.targetId)));
for (let i = 0; i < entries.length; i++) {
  if (!checked[i] || checked[i].name !== entries[i][1].name || checked[i].resolvedType !== entries[i][1].type) {
    throw Error('Missing or different variable ' + entries[i][1].name);
  }
}
const variables = Object.fromEntries(entries.map(([id], i) => [id, checked[i]]));
const createdNodeIds = [];
const mutatedNodeIds = [page.id];
function mark(node) {
  createdNodeIds.push(node.id);
  return node;
}
function markTree(node) {
  mark(node);
  if ('children' in node) for (const child of node.children) markTree(child);
}
function bind(node, fields) {
  for (const [field, id] of Object.entries(fields)) {
    const variable = variables[id];
    if (!variable) throw Error('Unresolved binding ' + id);
    if (field === 'fills' || field === 'strokes') {
      node[field] = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', variable)];
    } else {
      node.setBoundVariable(field, variable);
    }
  }
}
function component(recipe) {
  const n = mark(figma.createComponent());
  n.name = recipe.name;
  n.resize(recipe.w, recipe.h);
  n.fills = [];
  n.strokes = [];
  n.clipsContent = false;
  return n;
}
function layout(n, sizing) {
  n.layoutMode = 'HORIZONTAL';
  n.primaryAxisSizingMode = sizing;
  n.counterAxisSizingMode = 'FIXED';
  n.primaryAxisAlignItems = 'CENTER';
  n.counterAxisAlignItems = 'CENTER';
}
const glyph = DATA.kind === 'button' ? await figma.importComponentByKeyAsync(DATA.iconKey) : null;
if (glyph) {
  if (!glyph.remote || glyph.key !== DATA.iconKey) throw Error('Phosphor identity differs');
  await Promise.all(['Bold', 'Regular'].map(style => figma.loadFontAsync({family:'Manrope', style})));
}
const out = [];
const warnings = [];
for (const recipe of DATA.sets) {
  if (page.children.some(n => n.name === recipe.name)) throw Error('Set already exists: ' + recipe.name);
  const rows = [];
  const nodes = new Map();
  const iconRefs = [];
  const labelRefs = [];
  for (const variant of recipe.variants) {
    const cycle = DATA.kind === 'cycle';
    const partData = cycle ? recipe.variants[0].geometry : null;
    const dim = cycle ? partData[0].w : variant.w;
    const n = component({...variant, w:dim, h:cycle ? dim : variant.h});
    if (cycle) {
      bind(n, variant.b);
      for (const part of partData) {
        const e = mark(figma.createEllipse());
        n.appendChild(e);
        e.name = part.name;
        e.resize(part.w, part.h);
        e.x = part.x;
        e.y = part.y;
        e.fills = [];
        e.arcData = part.name === 'Arc' ? variant.arc : part.arc;
        e.strokeAlign = part.align;
        e.strokeCap = part.cap;
        e.opacity = part.opacity;
        e.constraints = {horizontal:'SCALE', vertical:'SCALE'};
        bind(e, part.b);
      }
    } else if (DATA.kind === 'loader') {
      layout(n, 'FIXED');
      bind(n, variant.b);
      const master = await figma.getNodeByIdAsync(DATA.mains[variant.main]);
      if (!master || master.type !== 'COMPONENT') throw Error('Missing verified Loader phase');
      const spinner = master.createInstance();
      n.appendChild(spinner);
      spinner.name = 'Spinner';
      markTree(spinner);
      for (const part of variant.children) {
        const ellipse = spinner.findOne(x => x.type === 'ELLIPSE' && x.name === part.name);
        if (!ellipse) throw Error('Missing Loader part ' + part.name);
        bind(ellipse, {strokes:part.b.strokes});
        ellipse.opacity = part.opacity;
        mutatedNodeIds.push(ellipse.id);
      }
    } else {
      layout(n, 'AUTO');
      n.strokeAlign = 'INSIDE';
      n.strokesIncludedInLayout = false;
      n.minHeight = variant.h;
      n.maxHeight = variant.h;
      bind(n, variant.b);
      for (const part of variant.children) {
        if (part.type === 'TEXT') {
          const label = mark(figma.createText());
          const [font, size, leading, tracking, decoration] = part.font;
          label.name = part.name;
          label.fontName = {family:font.family, style:font.style};
          label.fontSize = size;
          label.lineHeight = leading;
          label.letterSpacing = tracking;
          label.textDecoration = decoration;
          label.textAlignHorizontal = 'CENTER';
          label.textAlignVertical = 'CENTER';
          label.characters = part.characters;
          label.textAutoResize = 'WIDTH_AND_HEIGHT';
          n.appendChild(label);
          label.layoutSizingHorizontal = 'HUG';
          label.layoutSizingVertical = 'HUG';
          bind(label, part.b);
          labelRefs.push(label);
        } else if (part.name === 'Focus ring') {
          const ring = mark(figma.createFrame());
          ring.name = part.name;
          ring.fills = [];
          n.appendChild(ring);
          ring.layoutPositioning = 'ABSOLUTE';
          ring.resize(part.w, part.h);
          ring.x = part.x;
          ring.y = part.y;
          ring.constraints = {horizontal:'STRETCH',vertical:'STRETCH'};
          ring.strokeAlign = part.align;
          bind(ring, part.b);
        } else {
          const main = part.name === 'Loader' ? await figma.getNodeByIdAsync(DATA.mains[part.main]) : glyph;
          if (!main || main.type !== 'COMPONENT') throw Error('Missing linked dependency ' + part.name);
          const instance = main.createInstance();
          n.appendChild(instance);
          instance.name = part.name;
          markTree(instance);
          if (part.name !== 'Loader') {
            instance.resize(part.w, part.h);
            const vector = instance.findOne(v => v.type === 'VECTOR');
            if (!vector) throw Error('Missing Phosphor vector');
            bind(vector, part.vector);
            mutatedNodeIds.push(vector.id);
            iconRefs.push(instance);
          }
          bind(instance, part.b);
          instance.visible = part.visible;
        }
      }
    }
    nodes.set(variant.id,n);
    rows.push({sourceId:variant.id,id:n.id,key:n.key,name:n.name});
  }
  const set = mark(figma.combineAsVariants([...nodes.values()], page));
  set.name = recipe.name;
  set.description = recipe.description;
  if (recipe.docs) {
    try { set.documentationLinks = [{uri:recipe.docs}]; }
    catch (err) { warnings.push(String(err)); }
  }
  set.fills = [];
  set.x = recipe.index * 760;
  set.y = 0;
  for (const [i, variant] of recipe.variants.entries()) {
    const n = nodes.get(variant.id);
    const cols = DATA.kind === 'button' ? 3 : DATA.kind === 'cycle' ? 6 : 4;
    n.x = DATA.kind === 'button' ? variant.x : 24 + i % cols * 110;
    n.y = DATA.kind === 'button' ? variant.y : 24 + Math.floor(i / cols) * 110;
  }
  const kids = [...nodes.values()];
  set.resize(Math.max(...kids.map(n => n.x + n.width)) + 24, Math.max(...kids.map(n => n.y + n.height)) + 24);
  if (DATA.kind === 'button') {
    const labelKey = set.addComponentProperty('Label','TEXT','Button');
    const left = set.addComponentProperty('Show left icon','BOOLEAN',false);
    const right = set.addComponentProperty('Show right icon','BOOLEAN',false);
    const preferredValues = [{type:'COMPONENT',key:DATA.iconKey}];
    const swapLeft = set.addComponentProperty('Left icon','INSTANCE_SWAP',glyph.id,{preferredValues});
    const swapRight = set.addComponentProperty('Right icon','INSTANCE_SWAP',glyph.id,{preferredValues});
    for (const label of labelRefs) label.componentPropertyReferences = {characters:labelKey};
    for (const icon of iconRefs) {
      icon.componentPropertyReferences = icon.name === 'Left icon'
        ? {visible:left,mainComponent:swapLeft} : {visible:right,mainComponent:swapRight};
    }
  }
  const relations = [];
  for (const v of recipe.variants) {
    const reactions = DATA.kind === 'cycle'
      ? [{trigger:{type:'AFTER_TIMEOUT',timeout:v.delay},actions:[{type:'NODE',navigation:'CHANGE_TO',destinationId:v.to,transition:null}]}]
      : (v.reactions ?? []);
    if (!reactions.length) continue;
    const local = reactions.map(r => ({trigger:r.trigger,actions:r.actions.map(a => {
      if (!nodes.has(a.destinationId)) throw Error('Unmapped reaction');
      return {...a,destinationId:nodes.get(a.destinationId).id};
    })}));
    relations.push(nodes.get(v.id).setReactionsAsync(local));
  }
  await Promise.all(relations);
  out.push({sourceId:recipe.id,id:set.id,key:set.key,name:set.name,variants:rows,description:set.description,
    docs:set.documentationLinks,properties:set.componentPropertyDefinitions});
}
return {fileKey:figma.fileKey,pageId:page.id,sets:out,createdNodeIds,mutatedNodeIds,warnings};
