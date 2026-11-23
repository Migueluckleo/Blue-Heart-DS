await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('203:93'));
const page=figma.currentPage;
if(page.children.some(n=>n.name==='Inline Notification · CTA opcional'))throw Error('Specimen already exists');
const needed=['body/color/bg/primary','body/color/text/primary','body/spacing/xl','body/spacing/md','body/radius/lg'];
const all=await figma.variables.getLocalVariablesAsync();const ids=Object.fromEntries(all.filter(v=>needed.includes(v.name)).map(v=>[v.name,v.id]));
const v=name=>$fig.getVar(ids[name]);const text=(name,characters,style)=>$fig.text({name,characters,textStyle:$fig.getStyle(style),fills:[{type:'SOLID',color:v('body/color/text/primary')}],layoutSizingHorizontal:'FILL',textAutoResize:'HEIGHT'});
const y=Math.ceil(Math.max(0,...page.children.map(n=>n.y+n.height)))+80;
const samples=[];const children=[text('Title','Inline Notification · CTA opcional','body/heading/h1'),text('Usage','Show CTA apagado por defecto. Al activarlo: Button Secondary small, con label editable y acción independiente del cierre.','body/description')];
const off=$fig.instance('122:274',{name:'Default · CTA apagado',layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG',props:{type:'neutral'}});children.push(off);samples.push({kind:'default',node:off});
for(const type of ['neutral','info','success','warning','error']){const node=$fig.instance('122:274',{name:type+' · CTA encendido',layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG',props:{type,'Show CTA':true}});children.push(node);samples.push({kind:type,node});}
const narrow=$fig.instance('122:274',{name:'320 px · contenido largo',width:320,layoutSizingHorizontal:'FIXED',layoutSizingVertical:'HUG',props:{type:'warning','Show CTA':true,Title:'Revisión pendiente',Description:'Hay comprobantes pendientes de revisión. Consulta sus detalles antes de continuar con el siguiente paso.'}});children.push(narrow);samples.push({kind:'narrow',node:narrow});
const sheet=$fig.autoLayout({name:'Inline Notification · CTA opcional',x:100,y,width:666,layoutMode:'VERTICAL',layoutSizingHorizontal:'FIXED',layoutSizingVertical:'HUG',itemSpacing:v('body/spacing/xl'),paddingLeft:v('body/spacing/xl'),paddingTop:v('body/spacing/xl'),paddingRight:v('body/spacing/xl'),paddingBottom:v('body/spacing/xl'),cornerRadius:v('body/radius/lg'),fills:[{type:'SOLID',color:v('body/color/bg/primary')}]},children);
await $fig.done();
// A long mixed-text property override needs the shared description style and fill explicitly reapplied.
const queue=[narrow.node];let description;
while(queue.length){const n=queue.shift();if(n.type==='TEXT'&&n.name==='Description'){description=n;break;}if('children'in n)queue.push(...n.children);}
$fig.get(description.id).set({textStyle:$fig.getStyle('inline-notification/description'),fills:[{type:'SOLID',color:$fig.getVar('VariableID:13:20')}],textDecoration:'NONE'});
await $fig.done();return {sheet:{id:sheet.node.id,x:sheet.node.x,y:sheet.node.y,width:sheet.node.width,height:sheet.node.height},samples:samples.map(s=>({kind:s.kind,id:s.node.node.id,width:s.node.node.width,height:s.node.node.height,props:s.node.node.componentProperties})),tokenIds:ids,mutatedIds:[sheet.node.id,...samples.map(s=>s.node.node.id)]};
