import {readFileSync,writeFileSync,mkdirSync,cpSync,existsSync,realpathSync,rmSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';

const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const read=file=>JSON.parse(readFileSync(file,'utf8'));
const text=(value,label)=>{if(typeof value!=='string'||!value.trim())throw new Error(`Completar ${label}`);};
const array=(value,label,required=false)=>{if(!Array.isArray(value)||(required&&!value.length))throw new Error(`Completar ${label}`);};
const object=(value,label)=>{if(!value||typeof value!=='object'||Array.isArray(value))throw new Error(`Completar ${label}`);};
const brief=read('brief.json');
const release=read('references/release.json');
const manifest=read('references/snapshot-manifest.json');
const snapshot=realpathSync('references/design-system');
const sourceFiles=new Set();
function source(relative){
 const requested=path.resolve(snapshot,relative);
 if(!requested.startsWith(snapshot+path.sep)||!manifest.files[relative])throw new Error(`Fuente fuera del release: ${relative}`);
 if(!existsSync(requested))throw new Error(`Fuente ausente: ${relative}`);
 const file=realpathSync(requested);
 if(!file.startsWith(snapshot+path.sep))throw new Error(`Fuente fuera del release: ${relative}`);
 if(hash(readFileSync(file))!==manifest.files[relative])throw new Error(`Fuente alterada: ${relative}`);
 sourceFiles.add(relative);
 return {path:relative,sha256:manifest.files[relative]};
}
const ordered=Object.fromEntries(Object.entries(manifest.files).sort(([a],[b])=>a<b?-1:a>b?1:0));
if(hash(JSON.stringify(ordered))!==manifest.ds_digest||release.ds_digest!==manifest.ds_digest||release.version!==manifest.package_version)throw new Error('Release no coincide con snapshot.');
for(const key of ['title','objective'])text(brief[key],key);
for(const key of ['viewports','screens','components'])array(brief[key],key,true);
for(const key of ['transitions','decisions','limitations','checks'])array(brief[key],key);
const screenIds=new Set();
for(const screen of brief.screens){
 for(const key of ['id','name','entry','layout','content'])text(screen[key],`screen.${key}`);
 if(screenIds.has(screen.id))throw new Error('Pantalla duplicada.');screenIds.add(screen.id);
 array(screen.states,'screen.states',true);
 const stateIds=new Set();
 for(const state of screen.states){
  text(state.id,'state.id');text(state.name,'state.name');
  if(stateIds.has(state.id))throw new Error('Estado duplicado.');stateIds.add(state.id);
  array(state.actions,'state.actions');array(state.expect,'state.expect',true);array(state.nodes,'state.nodes',true);
 }
}
for(const transition of brief.transitions){
 for(const key of ['from','action','to','feedback'])text(transition[key],`transition.${key}`);
 if(!screenIds.has(transition.from)||!screenIds.has(transition.to))throw new Error('Transición a pantalla ausente.');
}
const tokenManifestPath='implementations/web/src/generated/tokens.manifest.json';
source(tokenManifestPath);
const tokenManifest=read(path.join(snapshot,tokenManifestPath));
if(brief.theme!==null&&!tokenManifest.modes.includes(brief.theme))throw new Error('Modo fuera del corte.');
const knownTokens=new Map(tokenManifest.tokens.map(token=>[token.name,token]));
const instanceIds=new Set();
const components=brief.components.map(component=>{
 for(const key of ['instanceId','componentId','exportName','placement'])text(component[key],`component.${key}`);
 if(instanceIds.has(component.instanceId))throw new Error('Instancia duplicada.');instanceIds.add(component.instanceId);
 object(component.props,'component.props');array(component.tokens,'component.tokens');array(component.slots,'component.slots',true);array(component.omissions,'component.omissions');
 if(component.stateProps!==undefined){object(component.stateProps,'component.stateProps');for(const props of Object.values(component.stateProps))object(props,'component.stateProps value');}
 for(const slot of component.slots){text(slot.name,'slot.name');text(slot.content,'slot.content');if(!['REQUIRED','NOT_APPLICABLE','UNRESOLVED'].includes(slot.status))throw new Error('Estado de Slots no válido.');}
 const tokens=component.tokens.map(name=>{
  const token=knownTokens.get(name);if(!token)throw new Error(`Token desconocido: ${name}`);
  if(token.collection==='primitive')throw new Error('No aplicar primitivas directamente a componentes.');
  source(token.source);return {name,collection:token.collection,css:token.css,source:source(token.source)};
 });
 if(component.kind==='local-content'){
  text(component.reason,'local-content.reason');array(component.tokens,'local-content.tokens');
  return {...component,tokens,identity:null,authority:'LOCAL_PROTOTYPE_ONLY'};
 }
 if(component.kind==='local-composition'){
  text(component.reason,'local.reason');array(component.compositionOf,'local.compositionOf',true);
  const compositionReferences=component.compositionOf.map(id=>{
   const base=manifest.components.find(item=>item.id===id);if(!base)throw new Error(`Componente base desconocido: ${id}`);
   return {id,contract:base.contract??base.base,version:base.version??null,amendments:base.amendments??[],sources:[base.contract??base.base,...(base.amendments??[])].map(source),figma:base.figma??null};
  });
  return {...component,tokens,identity:null,compositionReferences,authority:'LOCAL_PROTOTYPE_ONLY'};
 }
 if(component.kind!=='ds')throw new Error('component.kind debe ser ds, local-content o local-composition.');
 const identity=manifest.components.find(item=>item.id===component.componentId);
 if(!identity)throw new Error(`Identidad DS desconocida: ${component.componentId}`);
 if(!(identity.exports??[identity.exportName]).includes(component.exportName))throw new Error(`Export no pertenece a contrato: ${component.exportName}`);
 const sources=[identity.contract??identity.base,...(identity.amendments??[])].map(source);
 return {...component,tokens,identity:{id:identity.id,contract:identity.contract??identity.base,version:identity.version??null,amendments:identity.amendments??[],sources,figma:identity.figma??null},figmaProperties:component.figmaProperties??null,omissions:[...component.omissions,...(!identity.figma?['ID Figma no incluido o no resuelto en este snapshot; resolver desde evidencia antes de escribir.']:[]),...(!component.figmaProperties?['Mapeo de props React a propiedades Figma pendiente de comprobar en destino.']:[])]};
});
for(const screen of brief.screens)for(const state of screen.states)for(const id of state.nodes)if(!instanceIds.has(id))throw new Error(`Estado referencia instancia desconocida: ${id}`);
if(brief.figmaTarget!==null&&(typeof brief.figmaTarget!=='string'||!/^https:\/\/(www\.)?figma\.com\//.test(brief.figmaTarget)))throw new Error('Destino Figma debe ser URL proporcionada o null.');
const html=readFileSync('render.html');
const exportManifest=read('render.manifest.json');
if(hash(html)!==exportManifest.sha256)throw new Error('HTML alterado: volver a compilar.');
let capture={status:'NOT_RUN',states:[],errors:['No hay captura real; no afirmar funcionalidad ni medidas verificadas.']};
if(existsSync('capture/report.json')){
 capture=read('capture/report.json');
 if(capture.html_sha256!==hash(html)||capture.brief_sha256!==hash(readFileSync('brief.json')))throw new Error('Captura obsoleta: repetir capture tras cambios.');
 for(const state of capture.states){
  if(state.screenshot&&hash(readFileSync(path.join('capture',state.screenshot)))!==state.screenshot_sha256)throw new Error('Captura visual alterada.');
 }
}
const expected=brief.screens.flatMap(screen=>screen.states.flatMap(state=>brief.viewports.map(viewport=>`${screen.id}/${state.id}/${viewport.width}x${viewport.height}`)));
if(capture.status==='PASS'){
 const actual=capture.states.map(state=>`${state.screen_id}/${state.state_id}/${state.viewport.width}x${state.viewport.height}`);
 if(expected.length!==actual.length||expected.some(key=>!actual.includes(key))||capture.states.some(state=>state.status!=='PASS'))throw new Error('Cobertura de captura incompleta.');
}
// Schema1 additions: keep marker identity separate from measured metrics.
// A known inherited marker does not prove that descendant overrides match it.
const observedTypeIds=new Set(),unidentifiedText=[];
let textRunCount=0,legacyCaptureNodes=0;
for(const state of capture.states)for(const node of state.nodes){
 if(node.typography_style_id)observedTypeIds.add(node.typography_style_id);
 if(!Array.isArray(node.text_runs)){if(node.visible&&node.text?.trim())legacyCaptureNodes++;continue;}
 for(const run of node.text_runs){
  textRunCount++;
  if(run.typography_style_id)observedTypeIds.add(run.typography_style_id);
  else unidentifiedText.push({screen_id:state.screen_id,state_id:state.state_id,viewport:state.viewport,node_id:node.id,text:run.text,kind:run.kind});
 }
}
const typography={status:textRunCount?unidentifiedText.length||legacyCaptureNodes?'PARTIAL':'IDENTIFIED':'NOT_RUN',identity_origin:'getComputedStyle().getPropertyValue(--ds-type-style-id); observed, not inferred from font size',metric_validation:'NOT_PERFORMED; compare measured metrics and inherited overrides with the canonical recipe before Figma application',text_run_count:textRunCount,legacy_capture_nodes:legacyCaptureNodes,unidentified_text:unidentifiedText,styles:[]};
// Normative dependencies remain necessary even when capture is NOT_RUN.
// Family-specific amendments are already included through component identities.
const webInputs=read(path.join(snapshot,'config/web-inputs.json'));
const catalogPath=webInputs.typography_catalog;
const catalogSource=catalogPath ? source(catalogPath) : null;
const contractSource=webInputs.typography_contract ? source(webInputs.typography_contract) : null;
typography.catalog=catalogSource;
typography.contract=contractSource;
typography.amendments=(webInputs.typography_amendments ?? []).map(source);
typography.native_inheritance=null;
const catalog=catalogPath ? read(path.join(snapshot,catalogPath)) : {styles:[]};
if(observedTypeIds.size){
 for(const id of [...observedTypeIds].sort()){
  const style=catalog.styles.find(style=>style.id===id);
  if(!style)throw new Error(`Identidad tipográfica capturada fuera del catálogo: ${id}`);
  typography.styles.push({id,name:style.name,category:style.category,source:catalogSource,contract:contractSource,derived_from:style.derivedFrom??null});
 }
}
for(const component of components){
 const observed=capture.states.filter(state=>state.status==='PASS'&&state.nodes.some(node=>node.id===component.instanceId&&node.visible));
 const observedStates=[...new Set(observed.map(state=>state.screen_id+'/'+state.state_id))];
 const unobservedStateProps=Object.keys(component.stateProps??{}).filter(key=>!observedStates.includes(key));
 component.evidence={status:!observed.length?'NOT_OBSERVED':unobservedStateProps.length?'PARTIAL':capture.status==='PASS'?'PASS':'PARTIAL',observedStates,unobservedStateProps};
 if(!observed.length)component.omissions.push('Instancia declarada sin captura visible PASS; propiedades y medidas no verificadas.');
 if(unobservedStateProps.length)component.omissions.push('Props por estado sin captura visible PASS: '+unobservedStateProps.join(', '));
}
for(const check of brief.checks){text(check.name,'check.name');text(check.evidence,'check.evidence');if(!['PASS','FAIL','BLOCKED','NOT_RUN'].includes(check.status))throw new Error('Estado QA inválido.');}
const handoff={schema_version:1,producer_skill:release.skill_name,consumer_skill:release.companion_skill,package_version:release.version,ds_digest:release.ds_digest,html_sha256:hash(html),title:brief.title,objective:brief.objective,theme:brief.theme,viewports:brief.viewports,figmaTarget:brief.figmaTarget,sources:[...sourceFiles].sort().map(source),screens:brief.screens,transitions:brief.transitions,components,decisions:brief.decisions,limitations:brief.limitations,checks:brief.checks,typography,capture};
const destination='entrega';
if(existsSync(destination)&&!existsSync(path.join(destination,'.contpaqi-handoff')))throw new Error('entrega pertenece a otro proceso.');
// Replace only this generator's marked output; avoid stale screenshots or references.
rmSync(destination,{recursive:true,force:true});mkdirSync(destination,{recursive:true});
writeFileSync(path.join(destination,'.contpaqi-handoff'),`${release.skill_name}/${release.version}\n`);
cpSync('render.html',path.join(destination,'render.html'));
cpSync('render.manifest.json',path.join(destination,'render.manifest.json'));
cpSync('references',path.join(destination,'referencias'),{recursive:true});
if(existsSync('capture'))cpSync('capture',path.join(destination,'capturas'),{recursive:true});
writeFileSync(path.join(destination,'referencias/handoff.json'),JSON.stringify(handoff,null,2)+'\n');
const literal=value=>'`'+String(value).replaceAll('`','\\`')+'`';
const list=items=>items.length?items.map(item=>'- '+item).join('\n'):'- Ninguna declarada.';
let md=`# Replicar en Figma · ${brief.title}\n\nUsa $contpaqi-figma-screens para reproducir este prototipo BlueHeart en Figma con capas editables, instancias reales y Auto Layout. Abrir [render.html](render.html) directamente; no levantar un servidor. La preparación de este paquete no ejecutó Figma.\n\n- Objetivo: ${brief.objective}\n- Release: ${release.version}; DS SHA-256: ${literal(release.ds_digest)}.\n- HTML SHA-256: ${literal(handoff.html_sha256)}.\n- Tema: ${brief.theme??'sin modo configurado'}; viewports: ${brief.viewports.map(v=>`${v.width}×${v.height}`).join(', ')}.\n- Destino: ${brief.figmaTarget??'No proporcionado; resolver en la sesión de Figma antes de escribir.'}\n- QA file:// sin red: **${capture.status}**. ${capture.status==='PASS'?'Las acciones y aserciones enumeradas pasaron. La captura no prueba fidelidad Figma ni conformidad visual total.':'No afirmar que el archivo sea funcional ni que las medidas estén verificadas.'}\n\n[Identidades, propiedades y mediciones completas](referencias/handoff.json) · [Snapshot y hashes](referencias/snapshot-manifest.json). Este Markdown contiene el traspaso estructurado completo y puede pegarse solo en la habilidad de Figma. HTML, referencias y capturas son evidencia adicional opcional; si no están adjuntos no afirmar comparación visual con ellos.\n\n## Reglas y autoridad\n\nEl HTML gobierna composición local y textos. Los contratos y sus enmiendas gobiernan el DS; conservar estados de aprobación y registrar cualquier discrepancia. Verificar versión y digest compartidos, o hashes de todas las fuentes usadas. No reemplazar el DS por su apariencia, no crear primitivas nuevas, no usar primitivas directamente ni modificar el maestro. Las composiciones locales documentadas no se convierten en componentes oficiales.\n\nEl campo identity.figma conserva únicamente evidencia incluida; null exige resolver el identificador real. figmaProperties representa un mapeo declarado que debe contrastarse con el componente disponible. Reutilizar instancias y bindings, respetar variantes y Slots; children de React no prueba Slots nativos. Representar el comportamiento mediante estados/conexiones, sin prometer JavaScript en Figma.\n\n## Pantallas y estados\n\n`;
for(const screen of brief.screens){
 md+=`### ${screen.id} · ${screen.name}\n\n- Acceso: ${screen.entry}\n- Layout declarado: ${screen.layout}\n- Contenido: ${screen.content}\n\n`;
 for(const state of screen.states){
  md+=`**${state.id} · ${state.name}** · nodos: ${state.nodes.join(', ')}.\n\nAcciones reproducibles: ${literal(JSON.stringify(state.actions))}.\n\n`;
  for(const measured of capture.states.filter(item=>item.screen_id===screen.id&&item.state_id===state.id)){
   md+=`Captura ${measured.viewport.width}×${measured.viewport.height}: **${measured.status}** · [imagen real](capturas/${measured.screenshot}).\n\n`;
   for(const node of measured.nodes.filter(item=>item.visible))md+=`- ${literal(node.id)}: ${literal(JSON.stringify(node.bounding_box))}; fuente ${node.computed_style.fontFamily} ${node.computed_style.fontSize}/${node.computed_style.lineHeight}; estilo tipográfico raíz ${literal(node.typography_style_id??'sin marker')}; roles internos ${literal([...new Set((node.text_runs??[]).map(run=>run.typography_style_id??'sin marker'))].join(', '))}; color ${node.computed_style.color}; fondo ${node.computed_style.backgroundColor}; gap ${node.computed_style.gap}.\n`;
   md+='\n';
  }
 }
}
md+='## Componentes y composición\n\n';
md+=`Identidad tipográfica observada: **${typography.status}**; ${typography.text_run_count} fragmentos visibles, ${typography.unidentified_text.length} sin marker y ${typography.legacy_capture_nodes} nodos de captura anterior sin fragmentos. Los IDs se cotejan con el catálogo; las métricas calculadas se conservan por raíz y fragmento. Un marker heredado no acredita conformidad de métricas si un descendiente las sobrescribe.\n\n`;
for(const component of components){
 md+=`### ${component.instanceId} · ${component.exportName}\n\n- Identidad: ${component.componentId}; ${component.kind}.\n- Ubicación: ${component.placement}.\n- Props declaradas${component.evidence.status==='PASS'?' y cotejadas con los atributos de evidencia del HTML':' (cotejo '+component.evidence.status+')'}: ${literal(JSON.stringify(component.props))}.\n- Propiedades Figma declaradas: ${literal(JSON.stringify(component.figmaProperties??null))}.\n- Tokens: ${component.tokens.map(token=>literal(token.name)).join(', ')||'Sin tokens adicionales declarados; consultar contrato.'}\n- Slots/composición: ${literal(JSON.stringify(component.slots))}.\n`;
 if(component.identity){md+=`- Contrato: [${component.identity.contract}](referencias/design-system/${component.identity.contract}); versión ${component.identity.version??'no declarada en origen'}.\n- Figma observado: ${literal(JSON.stringify(component.identity.figma))}.\n`;for(const item of component.identity.sources)md+=`- Fuente ${item.path} · SHA-256 ${literal(item.sha256)}.\n`;}
 else md+=`- Decisión local: ${component.reason}; bases: ${(component.compositionOf??[]).join(', ')||'contenido local con tokens canónicos'}.\n`;
 md+=`\nOmisiones:\n\n${list(component.omissions)}\n\n`;
}
md+=`## Recorrido\n\n${list(brief.transitions.map(item=>`${item.from} → ${item.action} → ${item.to}: ${item.feedback}`))}\n\n## Decisiones locales\n\n${list(brief.decisions)}\n\n## Limitaciones\n\n${list(brief.limitations)}\n\n## QA y entrega Figma\n\n${list(brief.checks.map(item=>`${item.name}: ${item.status} — ${item.evidence}`))}\n\nQA real file://: ${capture.status}. Revisar [datos completos](referencias/handoff.json) y errores/solicitudes por estado. La revisión visual humana o del agente debe registrarse separadamente. Entregar enlace a frames reales, mapa de estados e instancias, conexiones, diferencias pendientes y lectura/QA del resultado Figma.\n`;
const portable={...handoff,capture:{...capture,states:capture.states.map(state=>({...state,nodes:state.nodes.map(({tokens,...node})=>node)}))}};
md+='\n## Traspaso estructurado autosuficiente\n\nEl siguiente bloque conserva las instrucciones y medidas necesarias al pegar solo este Markdown. Consulta el snapshot de la habilidad de Figma por IDs, rutas y hashes; resuelve diferencias de versión antes de construir. Las rutas de imágenes son referencias opcionales, no pruebas de haberlas visto.\n\n```json\n'+JSON.stringify(portable)+'\n```\n';
writeFileSync(path.join(destination,'replicar-en-figma.md'),md);
console.log(`Handoff ${release.version}: entrega/replicar-en-figma.md. QA offline ${capture.status}; Figma no ejecutado.`);
