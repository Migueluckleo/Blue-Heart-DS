if (figma.fileKey !== DATA.fileKey) throw Error('Unexpected destination');
const set = await figma.getNodeByIdAsync(DATA.setId);
const page = set?.parent;
if (page?.id !== DATA.pageId || set.name !== DATA.setName) throw Error('Unexpected set');
await figma.setCurrentPageAsync(page);
set.documentationLinks = DATA.links;
const reordered = [];
if (DATA.variantOrder) {
  const byId = new Map(set.children.map(node => [node.id, node]));
  if (byId.size !== DATA.variantOrder.length || DATA.variantOrder.some(id => !byId.has(id))) {
    throw Error('Variant order does not match the master');
  }
  for (const [index,id] of DATA.variantOrder.entries()) {
    if (set.children[index].id === id) continue;
    set.insertChild(index,byId.get(id));
    reordered.push(id);
  }
  if (set.defaultVariant.id !== DATA.variantOrder[0]) throw Error('Default variant differs');
}
for (const [id,reactions] of Object.entries(DATA.reactions)) {
  const variant = await figma.getNodeByIdAsync(id);
  let parent = variant;
  while (parent && parent.id !== set.id) parent = parent.parent;
  if (!parent) throw Error('Wrong owner '+id);
  await variant.setReactionsAsync(reactions);
}
return {setId:set.id,documentationLinks:set.documentationLinks,reactions:Object.keys(DATA.reactions),reordered, defaultVariant:DATA.variantOrder ? set.defaultVariant.id : undefined,mutatedNodeIds:[set.id,...reordered,...Object.keys(DATA.reactions)]};
