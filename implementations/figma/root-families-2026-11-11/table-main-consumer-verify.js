if (figma.fileKey !== DATA.fileKey) throw Error('Wrong Table destination');
const page=await figma.getNodeByIdAsync(DATA.pageId);
await figma.setCurrentPageAsync(page);
const temp=await figma.getNodeByIdAsync(DATA.temp);
if (temp?.type!=='FRAME'||temp.name!=='QA temporal Table'||temp.parent.id!==page.id) throw Error('Wrong QA frame');
figma.skipInvisibleInstanceChildren=false;
const checks=[];
const createdNodeIds=[];
const mutatedNodeIds=[];
function check(name,pass,observed) { checks.push({name,pass:Boolean(pass),observed}); }
const findRows=n=>n.findOne(c=>c.type==='SLOT'&&c.name==='Rows');
const size=(node)=>[node.width,node.height];
const properties=n=>Object.fromEntries(Object.entries(n.componentProperties).map(([k,v])=>[k.split('#')[0],v.value]));
try {
  for (const id of [DATA.normal,DATA.compact,DATA.extended]) {
    const instance=await figma.getNodeByIdAsync(id);
    check(instance.name+' remains linked',(await instance.getMainComponentAsync()).id===DATA.tableId);
  }
  const normal=await figma.getNodeByIdAsync(DATA.normal);
  const rows=findRows(normal);
  check('Initial rows, header and overflow',rows.children.length===9&&rows.children[0].name==='Header row'&&
    rows.overflowDirection==='BOTH'&&rows.clipsContent&&rows.children.every(r=>r.children.length===12),
    [rows.children.length,rows.children[0].name,rows.overflowDirection,rows.clipsContent]);
  const cell=rows.children[1].children[1];
  const avatar=cell.children.find(n=>n.name==='Avatar');
  const photo=avatar.children.find(n=>n.fills?.some(p=>p.type==='IMAGE'));
  const hash=photo?.fills.find(p=>p.type==='IMAGE')?.imageHash;
  check('Activated cell Avatar retains the original image',properties(cell)['Show avatar']&&avatar.visible&&
    (await avatar.getMainComponentAsync()).id==='83:12'&&hash===DATA.photoHash,hash);
  const collection=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:6:22');
  const heading=rows.children[0].children[1];
  const headingColor=await figma.variables.getVariableByIdAsync(heading.boundVariables.fills[0].id);
  await Promise.all(['Regular','SemiBold'].map(style=>figma.loadFontAsync({family:'Manrope',style})));
  const resolved=[];
  for(const mode of collection.modes){
    normal.setExplicitVariableModeForCollection(collection,mode.modeId);
    resolved.push(JSON.stringify(headingColor.resolveForConsumer(heading).value));
  }
  mutatedNodeIds.push(normal.id);
  check('Header follows the four component modes',resolved.length===4&&resolved[0]===resolved[1]&&
    resolved[2]===resolved[3]&&resolved[0]!==resolved[2],resolved);
  for (const config of [
    {id:DATA.compact,name:'Header only',width:2100,height:360,count:1,overflow:false},
    {id:DATA.extended,name:'Twelve rows',width:720,height:160,count:12,overflow:true},
  ]) {
    try {
      const n=await figma.getNodeByIdAsync(config.id);
      const slot=findRows(n);
      if (config.overflow) check('Rows reorder survived commit',slot.children[1].name===DATA.movedName,slot.children.slice(0,3).map(r=>r.name));
      n.resize(config.width,n.height);
      const result=await fitTableInstance(n.id,{viewportHeight:config.height});
      mutatedNodeIds.push(...result.mutatedNodeIds,...result.removedNodeIds);
      createdNodeIds.push(...result.createdNodeIds);
      check(config.name+' fit flags and rows',result.rows===config.count&&result.columns===12&&
        result.horizontal===config.overflow&&result.vertical===config.overflow&&result.viewportHeight===config.height,result);
      const after=await figma.getNodeByIdAsync(config.id);
      const viewport=findRows(after);
      const rowWidths=viewport.children.map(r=>r.children.map(c=>c.width));
      const aligned=rowWidths.every(widths=>widths.length===result.columnWidths.length&&
        widths.every((width,index)=>Math.abs(width-result.columnWidths[index])<.05));
      check(config.name+' alignment and native clipping',aligned&&viewport.clipsContent&&viewport.overflowDirection==='BOTH',
        {viewport:size(viewport),columns:rowWidths[0],content:[result.contentWidth,result.contentHeight]});
      const vertical=after.findOne(c=>c.type==='INSTANCE'&&c.name==='Vertical scrollbar');
      const horizontal=after.children.find(c=>c.name==='Horizontal scrollbar');
      const thumbs=[horizontal,vertical].map(bar=>bar.children.find(c=>c.type==='SLOT').children[0]);
      const lengths=[Math.max(8,(config.width-8)*Math.min(1,result.viewportWidth/result.contentWidth)),
        Math.max(8,(config.height-8)*Math.min(1,result.viewportHeight/result.contentHeight))];
      const physical=[thumbs[0].width,thumbs[1].height];
      check(config.name+' linked proportional thumbs',
        thumbs[0].height===8&&thumbs[1].width===8&&physical.every((value,index)=>Math.abs(value-lengths[index])<.05)&&
        (await thumbs[0].getMainComponentAsync()).id===DATA.thumb&&(await thumbs[1].getMainComponentAsync()).id===DATA.thumb&&
        horizontal.visible===config.overflow&&vertical.visible===config.overflow,
        {actual:physical,expected:lengths,visible:[horizontal.visible,vertical.visible]});
    } catch (error) {
      check(config.name+' fit executes',false,String(error));
    }
  }
} finally {
  mutatedNodeIds.push(temp.id);
  temp.remove();
}
check('Temporary instances cleaned',page.children.length===6&&page.children.every(n=>n.type==='COMPONENT'||n.type==='COMPONENT_SET'),page.children.map(n=>[n.id,n.name]));
return {status:checks.every(c=>c.pass)?'PASS':'FAIL',checks,createdNodeIds,mutatedNodeIds};
