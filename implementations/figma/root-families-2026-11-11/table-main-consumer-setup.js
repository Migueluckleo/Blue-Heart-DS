if (figma.fileKey !== DATA.fileKey) throw Error('Wrong Table destination');
const page = await figma.getNodeByIdAsync(DATA.pageId);
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = false;
const table = await figma.getNodeByIdAsync(DATA.tableId);
const original = await figma.getNodeByIdAsync(DATA.slotId);
const nodeIds = [];
const modified = [];
if (page.children.some(node=>node.name==='QA temporal Table')) throw Error('Existing QA frame');
const temp = figma.createFrame();
nodeIds.push(temp.id);
temp.name = 'QA temporal Table';
temp.fills = [];
const slot = instance => instance.findOne(n => n.type==='SLOT' && n.name==='Rows');
const create = name => {
  const instance = table.createInstance();
  temp.appendChild(instance);
  instance.name = name;
  nodeIds.push(instance.id);
  return instance;
};
const normal = create('Table · nueve filas');
const compact = create('Table · cabecera sola');
const extended = create('Table · doce filas');
const compactRows = slot(compact);
for (const row of [...compactRows.children].slice(1).reverse()) {
  modified.push(row.id);
  row.remove();
}
const editableRows = slot(extended);
const moved = editableRows.children[2];
const movedId = moved.id;
const movedName = moved.name;
editableRows.insertChild(1,moved);
modified.push(movedId);
const template = original.children[1];
const templates = await Promise.all(template.children.map(async node=>({
  main:await node.getMainComponentAsync(),width:node.width,height:node.height,
})));
for (let index=0; index<3; index++) {
  const row = figma.createFrame();
  nodeIds.push(row.id);
  row.name = 'Fila adicional '+(index+1);
  row.fills = [];
  row.layoutMode = 'HORIZONTAL';
  row.resize(template.width,template.height);
  editableRows.appendChild(row);
  row.layoutSizingHorizontal = 'FIXED';
  row.layoutSizingVertical = 'HUG';
  for (const {main,width,height} of templates) {
    const cell = main.createInstance();
    nodeIds.push(cell.id);
    cell.name = 'Cell';
    row.appendChild(cell);
    cell.resize(width,height);
  }
}
const normalRows = slot(normal);
const avatarCell = normalRows.children[1].children[1];
const [avatarKey] = Object.keys(avatarCell.componentProperties).filter(key=>key.startsWith('Show avatar#'));
if (!avatarKey) throw Error('Missing Show avatar');
await figma.loadFontAsync({family:'Manrope',style:'Regular'});
avatarCell.setProperties({[avatarKey]:true});
modified.push(avatarCell.id);
return {temp:temp.id,normal:normal.id,compact:compact.id,extended:extended.id,moved:movedId,
  movedName,avatarCell:avatarCell.id,counts:[normalRows.children.length,compactRows.children.length,editableRows.children.length],
  createdNodeIds:nodeIds,mutatedNodeIds:[...modified,normalRows.id,compactRows.id,editableRows.id]};
