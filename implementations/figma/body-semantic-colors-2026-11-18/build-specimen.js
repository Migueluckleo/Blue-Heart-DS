// Prepend const tokenIds = {...}; const specimenY = ...; using the verified ledger.
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('203:93'));
const v=name=>$fig.getVar(tokenIds[name]);
const sp=size=>v('body/spacing/'+size);
const color=(group,tone)=>v('body/color/'+group+'/'+tone);
const styles={h1:'S:67e5f01c76a09f73a80919a34a90e56b700f3bdc,',h3:'S:fb6e99abaaf76882ef5f3ea91abdb1f1a763e5ae,',description:'S:0a7ce447c7a2731966b56eaf8df96c19ec08c4ec,',caption:'S:47d3c4e7ce6e2b7ed3c144abeb0596ae82d1eef3,'};
const fonts=(await figma.listAvailableFontsAsync()).filter(f=>f.fontName.family==='Manrope');
if(!fonts.length)throw Error('Manrope unavailable');
const text=(name,characters,width,role='description',tone='primary')=>$fig.text({name,characters,width,textAutoResize:'HEIGHT',layoutSizingHorizontal:'FIXED',textStyle:$fig.getStyle(styles[role]),fills:[{type:'SOLID',color:color('text',tone)}]});
const layout=(name,children,props={})=>$fig.autoLayout({name,layoutMode:'HORIZONTAL',counterAxisAlignItems:'CENTER',itemSpacing:sp('md'),paddingLeft:sp('md'),paddingRight:sp('md'),paddingTop:sp('sm'),paddingBottom:sp('sm'),fills:[],...props},children);
const headers=[['role','Rol',120],['text','Texto',160],['bg','Fondo',200],['stroke','Borde',160],['shape','Forma / icono',144]];
const header=layout('Column labels',headers.map(([id,label,width])=>text(id,label,width,'caption')),{layoutSizingHorizontal:'FILL'});
const rows=[];
const labels={primary:'Principal',secondary:'Secundario',brand:'Marca',warning:'Advertencia',success:'Éxito',danger:'Peligro',information:'Información'};
for(const tone of Object.keys(labels)){
 const bgTone=tone==='secondary'?'emphasis':tone;
 const swatch=(name,width,group,roleTone,children)=>layout(name,children,{width,height:48,layoutSizingHorizontal:'FIXED',layoutSizingVertical:'FIXED',primaryAxisAlignItems:'CENTER',paddingLeft:sp('sm'),paddingRight:sp('sm'),cornerRadius:v('body/radius/md'),fills:[{type:'SOLID',color:color('bg',group==='bg'?roleTone:'primary')}],...(group==='stroke'?{strokes:[{type:'SOLID',color:color('stroke',roleTone)}],strokeWeight:1}:{})});
 const bg=swatch('bg/'+bgTone,200,'bg',bgTone,[text('paired text',labels[tone],160,'description',tone)]);
 const stroke=swatch('stroke/'+tone,160,'stroke',tone,[text('border label',tone==='secondary'?'Decorativo':'Contorno',130,'caption')]);
 const shape=layout('shape/'+tone,[$fig.ellipse({name:'shape fill',width:24,height:24,fills:[{type:'SOLID',color:color('shape',tone)}]}),text('shape label','Relleno',88,'caption')],{width:144,height:48,layoutSizingHorizontal:'FIXED',layoutSizingVertical:'FIXED',itemSpacing:sp('sm'),paddingLeft:sp('sm'),paddingRight:sp('sm')});
 const row=layout('Tone/'+tone,[text('tone',tone,120,'h3'),text('text/'+tone,labels[tone],160,'description',tone),bg,stroke,shape],{layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG'});
 rows.push({tone,row,bg,stroke,shape});
}
const sheet=$fig.autoLayout({name:'Body · Semantic color roles',x:100,y:specimenY,width:1040,layoutMode:'VERTICAL',layoutSizingHorizontal:'FIXED',layoutSizingVertical:'HUG',itemSpacing:sp('md'),paddingLeft:sp('xl'),paddingRight:sp('xl'),paddingTop:sp('xl'),paddingBottom:sp('xl'),cornerRadius:v('body/radius/lg'),fills:[{type:'SOLID',color:color('bg','primary')}],strokes:[{type:'SOLID',color:color('stroke','secondary')}],strokeWeight:1},[
 text('Title','Body · Colores por propiedad',976,'h1'),
 text('Description','Interfaz para contenido específico de producto. Body → semantic → primitives. Modos: Contable, Administrativo, Servicios y Personas.',976),
 header,...rows.map(r=>r.row),
 text('Scope note','Texto: TEXT_FILL · Fondo: FRAME_FILL / SHAPE_FILL · Borde: STROKE_COLOR · Forma/icono: SHAPE_FILL. Figma comparte el selector de formas e iconos.',976,'caption'),
 text('Decorative border note','Borde secondary es decorativo. Los componentes oficiales conservan sus tokens internos. Muestra editable de tokens; no es un componente consumible.',976,'caption')
]);
await $fig.done();
return {sheet:{id:sheet.id,width:sheet.node.width,height:sheet.node.height,type:sheet.node.type},rows:rows.map(r=>({tone:r.tone,row:r.row.id,bg:r.bg.id,stroke:r.stroke.id,shape:r.shape.id})),fonts:fonts.map(f=>f.fontName)};
