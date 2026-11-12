figma.skipInvisibleInstanceChildren=false;
const floating=await figma.getNodeByIdAsync('122:6');
const inline=await figma.getNodeByIdAsync('122:274');
const checks=[];
const add=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
const find=(n,name)=>n.findOne(c=>c.name===name);
const key=(n,label)=>Object.keys(n.componentProperties).find(k=>k.split('#')[0]===label);
const ids=p=>p.children.map(n=>n.id).join(',');
async function temp(main,fn){
 const page=main.parent.type==='PAGE'?main.parent:main.parent.parent;
 const before=ids(page);
 await figma.setCurrentPageAsync(page);
 const n=main.createInstance();
 try{await fn(n);}finally{n.remove();add(main.name+' clean page',before===ids(page)&&page.children.length===1,ids(page));}
}
await temp(floating,async n=>{
 const slot=n.findOne(c=>c.type==='SLOT'&&c.name==='General actions');
 const selection=find(n,'Selected count');
 const button=await slot.children[0].getMainComponentAsync();
 const close=await slot.children.at(-1).getMainComponentAsync();
 const dot=await selection.getMainComponentAsync();
 add('Floating Actions dimensions, Slot and links',n.width===1024&&n.height===96&&slot.children.length===6
  &&button.parent.name==='Button/text'&&close.parent.name==='Icon Button/ghost'&&dot.parent.name==='Dot'
  &&dot.variantProperties.color==='neutral',[n.width,n.height,slot.children.length,button.id,close.id,dot.id]);
 n.setProperties({[key(n,'Label')]:'Elementos de conciliación seleccionados',[key(n,'Select all')]:'Seleccionar todos (300)'});
 selection.setProperties({[key(selection,'Count')]:'42'});
 add('Editable summary and neutral Dot',find(n,'Label').characters==='Elementos de conciliación seleccionados'
  &&find(n,'Select all').characters==='Seleccionar todos (300)'&&find(selection,'Count').characters==='42',
  [find(n,'Label').characters,find(selection,'Count').characters]);
 n.setProperties({[key(n,'Show select all')]:false});
 add('Select all optional',!find(n,'Select all').visible,find(n,'Select all').visible);
 while(slot.children.length)slot.children.at(-1).remove();
 add('General actions permits zero',slot.children.length===0&&slot.limitViolations.length===0,slot.children.length);
 slot.appendChild(button.createInstance());
 add('General actions permits one',slot.children.length===1&&slot.limitViolations.length===0,slot.children.length);
 for(let i=0;i<6;i++)slot.appendChild(button.createInstance());
 const newClose=close.createInstance();
 slot.appendChild(newClose);slot.insertChild(0,newClose);
 const expected=[newClose.id,...slot.children.slice(1).map(c=>c.id)];
 add('General actions permits eight and reordering',slot.children.map(c=>c.id).join(',')===expected.join(',')
  &&slot.children.length===8&&slot.limitViolations.length===0,slot.children.length);
 slot.children.at(-1).remove();
 add('General actions removal and linked replacement',slot.children.length===7
  &&(await slot.children[0].getMainComponentAsync()).id===close.id,slot.children.length);
});
for(const main of inline.children){
 await temp(main,async n=>{
  const label=main.variantProperties.type;
  const description=find(n,'Description'), icon=find(n,'Icon'), dismiss=find(n,'Dismiss');
  const parts=description.getStyledTextSegments(['textStyleId','textDecoration']);
  const glyph=await icon.getMainComponentAsync(), control=await dismiss.getMainComponentAsync();
  add(label+' initial geometry, styles and linked controls',n.width===602&&n.height===76&&glyph.remote&&icon.width===24
    &&control.parent.name==='Icon Button/ghost'&&dismiss.width===32&&parts.length===2&&parts[1].textDecoration==='UNDERLINE',
    [n.width,n.height,glyph.key,control.id,parts.map(p=>p.textDecoration)]);
  n.resize(320,n.height);
  const long='Una descripción extensa del aviso conserva el contenido en varias líneas cuando el área disponible se reduce y muestra dónde revisar el estado.';
  n.setProperties({[key(n,'Title')]:'Aviso contextual',[key(n,'Description')]:long});
  add(label+' width 320 and long copy',n.width===320&&n.height>76&&description.characters===long&&find(n,'Title').characters==='Aviso contextual',
    [n.width,n.height,description.height]);
  n.resize(900,n.height);
  add(label+' width 900 and retained content',n.width===900&&description.characters===long,[n.width,n.height]);
  for(const [property,layer] of [['Show title','Title'],['Show description','Description'],['Show icon','Icon'],['Show dismiss','Dismiss target']]){
   n.setProperties({[key(n,property)]:false});
   const actual=find(n,layer)?.visible;
   add(label+' '+property,actual===false,actual);
   n.setProperties({[key(n,property)]:true});
  }
 });
}
return {status:checks.every(c=>c.pass)?'PASS':'FAIL',checks};
