figma.skipInvisibleInstanceChildren=false;
const set=await figma.getNodeByIdAsync('116:88');
const page=set.parent;
await figma.setCurrentPageAsync(page);
const before=page.children.map(n=>n.id);
const checks=[];
const add=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
const eq=(a,b)=>Math.abs(a-b)<.05;
const fields=n=>{const [label,body]=n.children;const [field,helper]=body.children;const [entry,footer]=field.children;const [counter,,icon]=footer.children;return {label,body,field,helper,entry,footer,counter,icon};};
const key=(n,name)=>Object.keys(n.componentProperties).find(k=>k.split('#')[0]===name);
for(const main of set.children){
 const n=main.createInstance();
 try {
  const p=fields(n);
  const asset=await p.icon.getMainComponentAsync();
  add(main.name+' base field and official Notches',n.width===305&&p.field.height===104&&p.label.height===23&&n.height===161
    &&asset.key==='d025009814c0137041e0db9b7af3890c46de7cee'&&p.icon.width===16,[n.width,p.field.height,p.label.height,n.height,asset.key]);
  for(const width of [160,305,640]){
   n.resize(width,n.height);
   const f=fields(n);
   add(main.name+' width '+width,n.width===width&&f.field.width===width&&f.field.height===104,[n.width,f.field.width,f.field.height]);
  }
 }finally{n.remove();}
}
const n=set.children[0].createInstance();
try{
 const placeholder='Ejemplo inicial';
 const value='Texto de prueba con una segunda línea.\nSegundo párrafo del campo.';
 const helper='Ayuda extensa para que el mensaje ocupe varias líneas y permita revisar el contenido completo desde el área de trabajo.';
 n.resize(160,n.height);
 n.setProperties({[key(n,'Placeholder')]:placeholder,[key(n,'Value')]:value,[key(n,'Helper text')]:helper,
  [key(n,'Counter')]:'130/300'});
 add('Independent Placeholder, Value and long helper before switch',fields(n).entry.characters===placeholder&&fields(n).helper.height>18,
  [fields(n).entry.characters,fields(n).helper.height]);
 n.setProperties({state:'error',value:'true'});
 const filled=fields(n);
 add('Filled error preserves Value, Helper and Counter',filled.entry.characters===value&&filled.helper.characters===helper&&filled.counter.characters==='130/300',
  [filled.entry.characters,filled.helper.height,filled.counter.characters]);
 const sameName='text-area/color/icon/error';
 const glyph=filled.icon.findOne(c=>c.type==='VECTOR');
 const color=await figma.variables.getVariableByIdAsync(glyph.boundVariables.fills[0].id);
 add('Error Notches role',color.name===sameName,color.name);
 n.setProperties({[key(n,'Show counter')]:false,[key(n,'Show helper')]:false});
 const minimal=fields(n);
 add('Optional content hidden and Notches stays on edge',!minimal.counter.visible&&!minimal.helper.visible
  &&eq(minimal.icon.x+minimal.icon.width,minimal.footer.width),[minimal.counter.visible,minimal.helper.visible,minimal.icon.x,minimal.footer.width]);
 n.resize(305,minimal.label.height+n.itemSpacing+180);
 minimal.body.layoutSizingVertical='FILL';
 minimal.field.setBoundVariable('height',null);
 minimal.field.layoutSizingVertical='FILL';
 const taller=fields(n);
 add('Editable instance height preserves multiline text',eq(taller.field.height,180)&&taller.entry.characters===value&&taller.entry.textTruncation==='DISABLED',
  [n.height,taller.field.height,taller.entry.height,taller.entry.textTruncation]);
 n.setProperties({value:'false',state:'focus'});
 add('Placeholder restored after variant switch',fields(n).entry.characters===placeholder,fields(n).entry.characters);
}finally{n.remove();}
const after=page.children.map(n=>n.id);
add('Clean Text Area page',after.join(',')===before.join(',')&&after.length===1,after);
return {status:checks.every(c=>c.pass)?'PASS':'FAIL',checks};
