// DATA contains one delegated set, its mutation receipt and the family page membership.
if (figma.fileKey !== DATA.fileKey) throw Error('Wrong file');
const page = await figma.getNodeByIdAsync(DATA.pageId);
if (!page || page.type !== 'PAGE' || page.name !== DATA.pageName) throw Error('Wrong page');
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = false;
const recipe = DATA.sets[0];
const expected = DATA.receipt;
const set = page.children.find(n => n.id === expected.id);
const errors = [];
const results = [];
const eq = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const close = (a,b) => typeof a === 'number' && Math.abs(a-b) < 0.08;
function verify(ok, id, what, observed) {
  if (!ok) errors.push({id,what,observed});
}
const membership = page.children.map(n => ({id:n.id,type:n.type,name:n.name}));
verify(membership.every(n => n.type === 'COMPONENT_SET' && DATA.memberIds.includes(n.id))
  && membership.length === DATA.memberIds.length, page.id, 'direct membership', membership);
if (!set || set.type !== 'COMPONENT_SET') throw Error('Missing expected component set');
verify(set.name === recipe.name && set.key === expected.key, set.id, 'set identity', set.name);
verify(set.description === recipe.description, set.id, 'Description', set.description);
if (recipe.docs) verify(set.documentationLinks?.some(x => x.uri === recipe.docs), set.id, 'documentation link', set.documentationLinks);
verify(set.children.length === expected.variants.length, set.id, 'set children', set.children.length);
const props = set.componentPropertyDefinitions;
if (DATA.kind === 'button') {
  for (const name of ['Label','Show left icon','Show right icon','Left icon','Right icon']) {
    const p = Object.entries(props).find(([key]) => key.startsWith(name+'#'))?.[1];
    const type = name === 'Label' ? 'TEXT' : name.startsWith('Show') ? 'BOOLEAN' : 'INSTANCE_SWAP';
    verify(p?.type === type, set.id, name+' property', p);
    if (type === 'INSTANCE_SWAP') verify(p?.preferredValues?.some(x => x.key === DATA.iconKey), set.id, name+' preferred key', p);
    else verify(p?.defaultValue === (type === 'TEXT' ? 'Button' : false), set.id, name+' default', p);
  }
}
const targetBySource = Object.fromEntries(expected.variants.map(v => [v.sourceId,v.id]));
function binding(node,key) {
  const found = node.boundVariables?.[key];
  return Array.isArray(found) ? found[0]?.id : found?.id;
}
function bindings(node, fields) {
  for (const [key,id] of Object.entries(fields)) {
    verify(binding(node,key) === DATA.tokens[id].targetId, node.id, 'binding '+key, binding(node,key));
  }
}
function ellipse(node, part, arc) {
  bindings(node,part.b);
  verify(node.strokeCap === part.cap && node.strokeAlign === part.align, node.id,'stroke cap and alignment',[node.strokeCap,node.strokeAlign]);
  verify(close(node.opacity,part.opacity),node.id,'opacity',node.opacity);
  const a = node.arcData;
  verify(Math.abs(a.startingAngle-arc.startingAngle) < 0.00001 && Math.abs(a.endingAngle-arc.endingAngle) < 0.00001
    && Math.abs(a.innerRadius-arc.innerRadius) < 0.00001, node.id,'arc',a);
}
let linkedIcons=0, linkedLoaders=0, checkedReactions=0;
for (const variant of recipe.variants) {
  const id=targetBySource[variant.id];
  const n=set.children.find(child => child.id === id);
  if (!n || n.type !== 'COMPONENT') throw Error('Missing variant '+variant.name);
  verify(n.name === variant.name,id,'variant name',n.name);
  bindings(n,variant.b);
  if (DATA.kind === 'cycle') {
    verify(n.children.length===2,id,'phase anatomy',n.children.map(x=>x.name));
    for (const part of recipe.variants[0].geometry) {
      const child=n.children.find(x=>x.name===part.name&&x.type==='ELLIPSE');
      if (!child) throw Error('Missing phase ellipse');
      ellipse(child,part,part.name==='Arc'?variant.arc:part.arc);
    }
    const reaction=n.reactions[0];
    verify(n.reactions.length===1 && reaction?.trigger?.type==='AFTER_TIMEOUT'
      && Math.abs(reaction?.trigger?.timeout-variant.delay)<0.000001
      && reaction?.actions?.[0]?.destinationId===targetBySource[variant.to]
      && reaction.actions[0].navigation==='CHANGE_TO' && reaction.actions[0].transition===null,id,'cycle edge',reaction);
    checkedReactions++;
  } else if (DATA.kind === 'loader') {
    verify(close(n.width,variant.w)&&close(n.height,variant.h),id,'loader dimensions',[n.width,n.height]);
    const spinner=n.children[0], main=spinner?.type==='INSTANCE'?await spinner.getMainComponentAsync():null;
    verify(n.children.length===1 && main?.id===DATA.mains[variant.main],id,'linked spinner',main?.id);
    for (const part of variant.children) {
      const child=spinner?.children.find(x=>x.name===part.name&&x.type==='ELLIPSE');
      if (!child) throw Error('Missing public Loader ellipse');
      ellipse(child,part,part.arc);
    }
  } else {
    verify(close(n.width,variant.w)&&close(n.height,variant.h),id,'button dimensions',[n.width,n.height,variant.w,variant.h]);
    verify(eq(n.children.map(c=>c.name),variant.children.map(c=>c.name)),id,'button anatomy',n.children.map(c=>c.name));
    for (const part of variant.children) {
      const child=n.children.find(x=>x.name===part.name);
      if (!child || child.type!==part.type) throw Error('Missing Button part '+part.name);
      bindings(child,part.b);
      if (child.type==='TEXT') {
        const [font,size,leading,tracking,decoration]=part.font;
        verify(child.characters===part.characters && child.fontName.family===font.family && child.fontName.style===font.style
          && child.fontSize===size && eq(child.lineHeight,leading) && eq(child.letterSpacing,tracking)
          && child.textDecoration===decoration && child.componentPropertyReferences?.characters?.startsWith('Label#'),
          child.id,'typography and Label',[child.characters,child.fontName,child.fontSize,child.lineHeight,child.letterSpacing,child.textDecoration]);
      } else if (child.type==='INSTANCE') {
        const main=await child.getMainComponentAsync();
        if (part.name==='Loader') {
          verify(main?.id===DATA.mains[part.main],child.id,'public Loader link',main?.id);
          linkedLoaders++;
        } else {
          verify(main?.remote && main.key===DATA.iconKey,child.id,'official Phosphor link',main?.key);
          verify(child.visible===part.visible && child.componentPropertyReferences?.mainComponent && child.componentPropertyReferences?.visible,child.id,'visibility and swap property',child.componentPropertyReferences);
          const vector=child.findOne(v=>v.type==='VECTOR');
          if (!vector) throw Error('Missing linked vector');
          bindings(vector,part.vector);
          linkedIcons++;
        }
      } else {
        verify(child.layoutPositioning==='ABSOLUTE' && child.constraints.horizontal==='STRETCH' && child.constraints.vertical==='STRETCH'
          && close(child.x,part.x)&&close(child.y,part.y)&&close(child.width,part.w)&&close(child.height,part.h),
          child.id,'focus geometry',[child.x,child.y,child.width,child.height]);
      }
    }
    const actionMap = r => ({trigger:r.trigger.type,actions:r.actions.map(a=>[a.destinationId,a.navigation,a.transition])});
    const expectedReactions=variant.reactions.map(r=>actionMap({...r,actions:r.actions.map(a=>({...a,destinationId:targetBySource[a.destinationId]}))}));
    verify(eq(n.reactions.map(actionMap),expectedReactions),id,'prototype reactions',n.reactions.map(actionMap));
    checkedReactions+=n.reactions.length;
  }
  results.push({id,sourceId:variant.id,name:n.name});
}
return {fileKey:figma.fileKey,pageId:page.id,membership,setId:set.id,name:set.name,description:set.description,
  documentationLinks:set.documentationLinks,results,linkedIcons,linkedLoaders,checkedReactions,errors};
