if (figma.fileKey !== DATA.fileKey) throw Error('Wrong Table destination');
const page = await figma.getNodeByIdAsync(DATA.pageId);
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = false;
const table = await figma.getNodeByIdAsync(DATA.tableId);
const rows = await figma.getNodeByIdAsync(DATA.slotId);
if (table.type !== 'COMPONENT' || table.parent.id !== page.id || rows.type !== 'SLOT' ||
    rows.parent.parent.id !== table.id) throw Error('Unexpected Rows owner');

const createdNodeIds = [];
const mutatedNodeIds = new Set();
const mappedRows = {};
const mappedCells = {};
const checks = [];
function check(label, actual, expected) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) checks.push({label, actual, expected});
}
function propertyValues(node) {
  return Object.fromEntries(Object.entries(node.componentProperties).map(([key, value]) => [key.split('#')[0], [key, value.value]]));
}
function applyProperties(node, expected) {
  const current = propertyValues(node);
  const changes = {};
  for (const [name, value] of Object.entries(expected)) {
    if (!current[name]) throw Error('Missing instance property '+node.id+' '+name);
    const [key, actual] = current[name];
    if (value !== actual) changes[key] = value;
  }
  if (!Object.keys(changes).length) return;
  node.setProperties(changes);
  mutatedNodeIds.add(node.id);
}
function verifyProperties(node, expected) {
  const values = propertyValues(node);
  for (const [name, value] of Object.entries(expected)) check(node.id+' '+name, values[name]?.[1], value);
}
const writing = DATA.operation === 'build';
if (writing) {
  if (rows.children.length) throw Error('Rows already populated');
  const styles = ['Regular','SemiBold'];
  await Promise.all(styles.map(style => figma.loadFontAsync({family:'Manrope',style})));
}
const cellMains = new Map();
for (const target of new Set(DATA.rows.flatMap(row=>row[3].map(cell=>cell[1])))) {
  const main = await figma.getNodeByIdAsync(target);
  if (main?.type !== 'COMPONENT' || main.parent.id !== DATA.cellSet) throw Error('Unexpected Cell '+target);
  cellMains.set(target, main);
}
for (const [index,[sourceId,name,geometry,cells]] of DATA.rows.entries()) {
  const row = writing ? figma.createFrame() : rows.children[index];
  if (!row || row.type !== 'FRAME') throw Error('Missing row '+name);
  if (writing) {
    createdNodeIds.push(row.id);
    rows.appendChild(row);
    row.name = name;
    row.layoutMode = geometry.layoutMode;
    row.resize(geometry.width,geometry.height);
    row.fills = [];
    row.strokes = [];
    for (const field of ['primaryAxisAlignItems','counterAxisAlignItems','paddingLeft','paddingTop','paddingRight',
      'paddingBottom','itemSpacing','clipsContent','layoutSizingHorizontal','layoutSizingVertical']) row[field]=geometry[field];
    mutatedNodeIds.add(rows.id);
  }
  mappedRows[sourceId] = row.id;
  check(sourceId+' name',row.name,name);
  for (const [cellIndex,[sid,target,width,props,nested]] of cells.entries()) {
    const cell = writing ? cellMains.get(target).createInstance() : row.children[cellIndex];
    if (!cell || cell.type !== 'INSTANCE') throw Error('Missing Cell '+sid);
    if (writing) {
      createdNodeIds.push(cell.id);
      row.appendChild(cell);
      cell.name = 'Cell';
      applyProperties(cell,props);
      cell.resize(width,geometry.height);
      cell.layoutSizingHorizontal = 'FIXED';
    }
    mappedCells[sid] = cell.id;
    check(sid+' master',(await cell.getMainComponentAsync()).id,target);
    check(sid+' dimensions',[cell.width,cell.height],[width,geometry.height]);
    verifyProperties(cell,props);
    for (const [childName,properties] of nested) {
      const child = cell.children.find(node => node.name === childName && node.type === 'INSTANCE');
      if (!child) throw Error('Missing child '+childName+' on '+sid);
      if (writing) applyProperties(child,properties);
      verifyProperties(child,properties);
    }
  }
  check(sourceId+' cell count',row.children.length,cells.length);
  for (const [field,value] of Object.entries(geometry)) check(sourceId+' '+field,row[field],value);
}
const thumb = await figma.getNodeByIdAsync(DATA.thumb);
const thickness = await figma.variables.getVariableByIdAsync(DATA.thickness);
for (const [id,axis,width,height] of DATA.bars) {
  const bar = await figma.getNodeByIdAsync(id);
  const slot = bar.children.find(node => node.type==='SLOT');
  if (slot.children.length!==1) throw Error('Unexpected Thumb Slot '+id);
  const field = axis==='height' ? 'width' : 'height';
  if (writing) {
    const n = thumb.createInstance();
    n.name='Thumb';
    n.resize(width,height);
    n.setBoundVariable(field,thickness);
    const previous=slot.children[0].id;
    slot.children[0].remove();
    slot.appendChild(n);
    createdNodeIds.push(n.id);
    mutatedNodeIds.add(previous);
    mutatedNodeIds.add(slot.id);
    mutatedNodeIds.add(id);
  }
  const n=slot.children[0];
  check(id+' thumb',[(await n.getMainComponentAsync()).id,n.width,n.height,n.boundVariables[field]?.id],
    [thumb.id,width,height,thickness.id]);
}
const pagination=await figma.getNodeByIdAsync(DATA.pagination.id);
const pages=pagination.children.find(n=>n.type==='SLOT'&&n.name==='Pages');
const input=pagination.children.find(n=>n.type==='INSTANCE'&&n.name==='Rows per page');
check('Rows count',rows.children.length,DATA.rows.length);
check('Rows viewport',[rows.width,rows.height,rows.clipsContent,rows.overflowDirection],[1711,360,true,'BOTH']);
check('Pagination items',pages.children.map(n=>n.name),DATA.pagination.names);
check('Rows per page input',[input.width,propertyValues(input).Placeholder?.[1]],[DATA.pagination.inputWidth,DATA.pagination.inputText]);
return {status:checks.length?'FAIL':'PASS',tableId:table.id,rowsId:rows.id,rows:rows.children.length,
  cells:Object.keys(mappedCells).length,mappedRows,mappedCells,createdNodeIds,mutatedNodeIds:[...mutatedNodeIds],mismatches:checks.slice(0,25),mismatchCount:checks.length};
