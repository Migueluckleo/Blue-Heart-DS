await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('122:49'));
figma.skipInvisibleInstanceChildren=false;
const set=await figma.getNodeByIdAsync('122:274');
if(Object.keys(set.componentPropertyDefinitions).some(k=>k.split('#')[0]==='Show CTA'))throw Error('CTA already exists; inspect before retry');
const fontNames=(await figma.listAvailableFontsAsync()).filter(f=>f.fontName.family==='Manrope').map(f=>f.fontName);
if(!fontNames.some(f=>f.style==='Regular')||!fontNames.some(f=>f.style==='SemiBold'))throw Error('Manrope dependency unavailable');
const zero=$fig.getVar('VariableID:13:10'),gap=$fig.getVar('VariableID:13:3');
const rows=[];
for(const id of ["122:53","122:132","122:189","122:203","122:260"]){
 const host=await figma.getNodeByIdAsync(id);const content=host.children.find(c=>c.name==='Content');const text=content.children.find(c=>c.name==='Text');
 if(!content||!text)throw Error('Original anatomy changed '+id);
 const cta=$fig.instance('23:853',{name:'CTA',visible:false,isExposedInstance:true,layoutSizingHorizontal:'HUG',layoutSizingVertical:'FIXED',props:{Label:'Ver detalles','Show left icon':false,'Show right icon':false}}).booleanProp('Show CTA');
 const body=$fig.autoLayout({name:'Body',layoutMode:'VERTICAL',layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG',counterAxisAlignItems:'MIN',itemSpacing:gap,paddingLeft:zero,paddingTop:zero,paddingRight:zero,paddingBottom:zero,fills:[]},[$fig.get(text.id),cta]);
 $fig.get(content.id).append(body);
 $fig.get(id).set({description:"INLINE-NOTIFICATION-001 · Usa Inline Notification para explicar un estado junto al contenido afectado. Show CTA está apagado por defecto; al activarlo muestra un Button Secondary/small debajo del mensaje, con label editable. El anfitrión conecta la acción y decide cuándo se cierra; el CTA no descarta el aviso automáticamente. Elige el tipo según gravedad y evita depender solo del color. Ficha local Inline Notification / INLINE-NOTIFICATION-001."});
 rows.push({variant:id,content:content.id,text:text.id,body,cta});
}
$fig.get(set.id).set({description:"INLINE-NOTIFICATION-001 · Usa Inline Notification para explicar un estado junto al contenido afectado. Show CTA está apagado por defecto; al activarlo muestra un Button Secondary/small debajo del mensaje, con label editable. El anfitrión conecta la acción y decide cuándo se cierra; el CTA no descarta el aviso automáticamente. Elige el tipo según gravedad y evita depender solo del color. Ficha local Inline Notification / INLINE-NOTIFICATION-001."});
await $fig.done();
// Reparenting changes the meaning of layoutGrow; restore axes after materialization.
for (const row of rows) $fig.get(row.text).set({layoutSizingHorizontal:'FILL',layoutSizingVertical:'HUG'});
await $fig.done();
return {set:{id:set.id,key:set.key,properties:set.componentPropertyDefinitions,description:set.description},rows:rows.map(r=>({variant:r.variant,content:r.content,text:r.text,body:r.body.node.id,cta:r.cta.node.id,ctaProperties:r.cta.node.componentProperties,visible:r.cta.node.visible,isExposedInstance:r.cta.node.isExposedInstance,refs:r.cta.node.componentPropertyReferences})),mutatedIds:[set.id,...rows.flatMap(r=>[r.variant,r.content,r.text,r.body.node.id,r.cta.node.id])]};
