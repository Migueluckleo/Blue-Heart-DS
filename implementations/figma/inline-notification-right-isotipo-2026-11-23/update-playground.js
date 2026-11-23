await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('203:93'));figma.skipInvisibleInstanceChildren=false;
$fig.get('582:9751').set({width:868,name:'Inline Notification · CTA derecho e Isotipo'});
$fig.get('582:9752').set({characters:'Inline Notification · CTA derecho e Isotipo'});
const sheet=await figma.getNodeByIdAsync('582:9751');
const usage=sheet.children.find(n=>n.name==='Usage');if(usage)$fig.get(usage.id).set({characters:'CTA apagado por defecto; activo a la derecha del Body. Indicator permite ícono de estado o Logos Isotipo con máximo 32×32 y proporciones intactas.'});
await $fig.done();
const find=(root,name)=>{const q=[root];while(q.length){const n=q.shift();if(n.name===name)return n;if('children'in n)q.push(...n.children);}throw Error('Missing '+name);};
const changed=[];
for(const [hostId,product] of [['582:9789','contabilidad'],['582:9804','xml_en_linea']]){const host=await figma.getNodeByIdAsync(hostId);const indicator=find(host,'Indicator');$fig.get(indicator.id).set({props:{source:'isotipo',Isotipo:({contabilidad:'595:363',xml_en_linea:'595:349'})[product]}});changed.push({host:host.id,indicator:indicator.id,product});}
const narrowHost=await figma.getNodeByIdAsync('582:9849');$fig.get(find(narrowHost,'Indicator').id).set({props:{source:'isotipo'}});
const normal=$fig.instance('122:274',{name:'602 px · CTA derecho',width:602,layoutSizingHorizontal:'FIXED',layoutSizingVertical:'HUG',props:{type:'info','Show CTA':true}});$fig.get(sheet.id).append(normal);await $fig.done();
return {sheet:{id:sheet.id,width:sheet.width,height:sheet.height},changed,narrow:{id:narrowHost.id,width:narrowHost.width,height:narrowHost.height},normal:{id:normal.node.id,width:normal.node.width,height:normal.node.height},mutatedIds:[sheet.id,usage?.id,...changed.flatMap(c=>[c.host,c.indicator]),normal.node.id]};
