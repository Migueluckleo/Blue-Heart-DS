figma.skipInvisibleInstanceChildren=false;
const main=await figma.getNodeByIdAsync('96:5');
await figma.setCurrentPageAsync(main.parent);
const before=main.parent.children.map(n=>n.id);
const checks=[];
const add=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
const instance=main.createInstance();
const by=(n,name)=>n.findOne(c=>c.name===name);
const slot=name=>instance.findOne(n=>n.type==='SLOT'&&n.name===name);
const key=name=>Object.keys(instance.componentProperties).find(k=>k.split('#')[0]===name);
const counts=()=>['Metadata','Inputs','General actions'].map(name=>slot(name).children.length);
try{
  const initial=counts();
  add('Default Slots and geometry',initial.join(',')==='2,5,2'&&main.width===1225&&main.height===219,[initial,main.width,main.height]);
  for(const name of ['Metadata','Inputs','General actions']){
    const s=slot(name);
    const seed=await s.children.find(c=>c.type==='INSTANCE').getMainComponentAsync();
    const beforeCounts=counts();
    const expected=['Metadata','Inputs','General actions'].indexOf(name);
    while(s.children.length)s.children.at(-1).remove();
    add(name+' permits empty',s.children.length===0&&s.limitViolations.length===0,s.children.length);
    const small=seed.createInstance();s.appendChild(small);
    add(name+' permits one',s.children.length===1&&s.limitViolations.length===0,s.children.length);
    for(let i=0;i<beforeCounts[expected];i++)s.appendChild(seed.createInstance());
    const last=s.children.at(-1);
    s.insertChild(0,last);
    const after=counts();
    const linked=await s.children[0].getMainComponentAsync();
    add(name+' larger and reorder independently',s.children[0].id===last.id&&linked.id===seed.id&&after[expected]===beforeCounts[expected]+1
      &&after.every((v,i)=>i===expected||v===beforeCounts[i])&&s.limitViolations.length===0,after);
  }
  while(slot('Inputs').children.length>2)slot('Inputs').children.at(-1).remove();
  while(slot('General actions').children.length>1)slot('General actions').children.at(-1).remove();
  const title='Consulta mensual de comprobantes y sus relaciones con documentos contables';
  const description='La sección se adapta al espacio de consulta y presenta información de trabajo cuando el título se extiende.';
  instance.resize(640,instance.height);
  instance.setProperties({[key('Title')]:title,[key('Description')]:description});
  const heading=by(instance,'Heading');
  const metadata=slot('Metadata');
  add('640 px title and Content wrap',instance.width===640&&by(instance,'Title').characters===title&&by(instance,'Description').characters===description
    &&metadata.y>=heading.y+heading.height&&by(instance,'Content').layoutWrap==='WRAP',
    [instance.width,heading.y,heading.height,metadata.y]);
  for(const [property,layer] of [['Show breadcrumbs','Breadcrumb'],['Show description','Description'],['Show metadata','Metadata'],['Show actions','Main actions']]){
    instance.setProperties({[key(property)]:false});const n=by(instance,layer);add(property,!n.visible,n.visible);
    instance.setProperties({[key(property)]:true});
  }
}finally{instance.remove();}
const after=main.parent.children.map(n=>n.id);
add('Temporary instance removed',after.join(',')===before.join(',')&&after.length===1,after);
return {status:checks.every(c=>c.pass)?'PASS':'FAIL',checks};
