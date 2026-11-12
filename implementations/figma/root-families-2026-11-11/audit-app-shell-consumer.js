figma.skipInvisibleInstanceChildren=false;
const set=await figma.getNodeByIdAsync('105:7');
const page=set.parent;
await figma.setCurrentPageAsync(page);
const before=page.children.map(n=>n.id);
const checks=[];
const add=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
const by=(n,name)=>n.findOne(c=>c.name===name);
const slot=n=>n.findOne(c=>c.type==='SLOT'&&c.name==='Body');
const badgeSet=await figma.getNodeByIdAsync('64:90');
const badge=badgeSet.children.find(n=>n.variantProperties.type==='subtle'&&n.variantProperties.size==='small');
function insertBadge(target,label){
  const n=badge.createInstance();
  const key=Object.keys(n.componentProperties).find(k=>k.startsWith('Label#'));
  n.setProperties({[key]:label});
  target.appendChild(n);
  return n;
}
function labels(target){
  return target.children.map(n=>Object.entries(n.componentProperties??{}).find(([k])=>k.startsWith('Label#'))?.[1].value??n.name);
}
for(const variant of set.children){
  const n=variant.createInstance();
  try{
    const source=variant.variantProperties;
    const expanded=source.menu==='expanded';
    const grid=source['body layout']==='grid';
    const main=by(n,'Main'), body=slot(n);
    const header=by(n,'Header'), sidebar=by(n,'Sidebar'), section=by(n,'Section Header');
    const linked=await Promise.all([header,sidebar,section].map(n=>n.getMainComponentAsync()));
    const control=by(sidebar,expanded?'Collapse Icon Button':'Expand Icon Button');
    const controlMain=await control?.getMainComponentAsync();
    add(variant.name+' linked dependencies and Secondary',linked[0].id==='90:439'&&linked[1].parent.id==='61:426'&&linked[2].id==='96:5'&&controlMain?.parent.id==='61:477',
      linked.map(x=>x.id).concat(controlMain?.id));
    add(variant.name+' dimensions and shared Body',n.width===1440&&n.height===1024&&main.width===(expanded?1110:1272)&&body.width===main.width&&section.width===main.width
      &&body.componentPropertyReferences.slotContentId===Object.keys(set.componentPropertyDefinitions).find(k=>k.startsWith('Body#')),
      [n.width,n.height,main.width,body.width,section.width,body.componentPropertyReferences.slotContentId]);
    const first=body.children[0];
    if(grid){
      const spans=first.children.map(c=>c.gridColumnSpan);
      add(variant.name+' native Grid tracks and spans',first.layoutMode==='GRID'&&first.gridColumnCount===4&&first.gridRowCount===4&&first.gridColumnGap===32&&first.gridRowGap===32
        &&spans.join(',')==='4,1,1,1,1,2,2,3,1'&&first.children[1].width===(expanded?253.5:294),[spans,first.children[1].width]);
    }else{
      add(variant.name+' native Flex row widths',first.layoutMode==='HORIZONTAL'&&body.children.length===2&&first.children.every(c=>c.width===(expanded?539:620)),
        first.children.map(c=>c.width));
    }
    while(slot(n).children.length)slot(n).children.at(-1).remove();
    add(variant.name+' empty allowed',slot(n).children.length===0&&slot(n).limitViolations.length===0,slot(n).children.length);
    insertBadge(slot(n),'Primero');
    add(variant.name+' one allowed',slot(n).children.length===1,labels(slot(n)));
    insertBadge(slot(n),'Segundo');
    insertBadge(slot(n),'Tercero');
    slot(n).insertChild(0,slot(n).children.at(-1));
    const order=labels(slot(n));
    add(variant.name+' three and reorder',order.join(',')==='Tercero,Primero,Segundo'&&slot(n).limitViolations.length===0,order);
    slot(n).children[1].remove();
    insertBadge(slot(n),'Reemplazo');
    const next=labels(slot(n));
    add(variant.name+' remove and replace',next.join(',')==='Tercero,Segundo,Reemplazo',next);
    n.setProperties({menu:expanded?'collapsed':'expanded','body layout':grid?'flex':'grid'});
    add(variant.name+' overrides across both axes',labels(slot(n)).join(',')===next.join(','),labels(slot(n)));
    n.resize(1280,n.height);
    const resized=by(n,'Main');
    const long=insertBadge(slot(n),'Contenido de revisión que mantiene el orden al ajustar el ancho de la pantalla');
    add(variant.name+' reduced width and longer content',resized.width===(expanded?1112:950)&&slot(n).width===resized.width&&long.width<=slot(n).width,
      [resized.width,slot(n).width,long.width]);
  }finally{n.remove();}
}
const after=page.children.map(n=>n.id);
add('Clean page and original variant count',before.join(',')===after.join(',')&&after.length===1&&set.children.length===4,after);
return {status:checks.every(c=>c.pass)?'PASS':'FAIL',checks};
