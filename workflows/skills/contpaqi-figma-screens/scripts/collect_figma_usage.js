// Read-only use_figma body. Prefix with the JSON request emitted by verify_figma_usage.py collect.
if (figma.fileKey !== request.file_key) throw new Error('Wrong Figma file');
if (!['source', 'target'].includes(request.kind)) throw new Error('Unknown collection kind');
const page = await figma.getNodeByIdAsync(request.page_id);
if (!page || page.type !== 'PAGE') throw new Error('Expected actual page');
await figma.setCurrentPageAsync(page);
const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/s$/, '');
const ancestorIds = n => { const ids=[]; let p=n.parent; while(p&&p.type!=='DOCUMENT'){ids.push(p.id);p=p.parent;}return ids; };
const officialKeys=new Set(request.official_component_keys||[]);const mainCache=new Map();
async function mainOf(n){if(!mainCache.has(n.id))mainCache.set(n.id,await n.getMainComponentAsync());return mainCache.get(n.id);}
const inheritedControls=new Map();
async function insideVerifiedInstance(n){
  let p=n.parent,crossedSlot=false;
  while(p&&p.type!=='PAGE'){
    if(p.type==='SLOT')crossedSlot=true;
    if(p.type==='INSTANCE'){
      const m=await mainOf(p);
      if(m&&officialKeys.has(m.key)){
        if(!crossedSlot)return true;
        // Figma rewrites native-slot content IDs. Exempt inherited defaults only
        // when an actual counterpart exists inside this verified principal.
        const prefix='I'+p.id+';';if(!n.id.startsWith(prefix))return false;
        const path=n.id.slice(prefix.length);const sourceId=path.includes(';')?'I'+path:path;
        const source=await figma.getNodeByIdAsync(sourceId);
        if(!source||source.type!==n.type||!ancestorIds(source).includes(m.id))return false;
        if(n.type==='INSTANCE'){
          const actualMain=await mainOf(n),expectedMain=await mainOf(source);
          if(!actualMain||!expectedMain||actualMain.key!==expectedMain.key)return false;
          inheritedControls.set(n.id,{id:n.id,source_id:source.id,owner_id:p.id,owner_key:m.key,component_key:actualMain.key});
        }
        const signatures=async node=>(await bindingDetails(node)).map(b=>[b.property,b.variable_id,b.token,b.collection].join('|')).sort();
        if(JSON.stringify(await signatures(n))!==JSON.stringify(await signatures(source))){inheritedControls.delete(n.id);return false;}
        return true;
      }
    }
    p=p.parent;
  }
  return false;
}
const bindingFields = n => {
  const fields = 'boundVariables' in n ? Object.keys(n.boundVariables || {}) : [];
  for (const prop of ['fills','strokes']) if(prop in n && Array.isArray(n[prop])) n[prop].forEach((p,i)=>{
    for(const key of Object.keys(p.boundVariables||{})) fields.push(prop+'.'+i+'.'+key);
  });
  return fields.sort();
};
const styleCache = new Map();
const variableCache = new Map();
const collectionCache = new Map();
async function bindingDetails(n) {
  const found=[];
  async function add(property, alias) {
    if(!alias || alias.type!=='VARIABLE_ALIAS')return;
    if(!variableCache.has(alias.id))variableCache.set(alias.id,await figma.variables.getVariableByIdAsync(alias.id));
    const variable=variableCache.get(alias.id);if(!variable)return;
    if(!collectionCache.has(variable.variableCollectionId))collectionCache.set(variable.variableCollectionId,await figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId));
    const collection=collectionCache.get(variable.variableCollectionId);
    found.push({property,variable_id:variable.id,token:variable.name,collection:collection?collection.name:null});
  }
  for(const [property,value] of Object.entries(n.boundVariables||{})) {
    for(const alias of Array.isArray(value)?value:[value])await add(property,alias);
  }
  for(const field of ['fills','strokes'])if(Array.isArray(n[field]))for(let i=0;i<n[field].length;i++)for(const [property,alias]of Object.entries(n[field][i].boundVariables||{}))await add(field+'.'+i+'.'+property,alias);
  return found;
}
function textPath(text, root) {
  const segments = [];
  for (let part = text; part.id !== root.id; part = part.parent) {
    const parent = part.parent;
    if (!parent || !('children' in parent)) throw new Error('Text outside inspected subtree');
    if (!part.visible) return null;
    const matching = parent.children.filter(child => child.visible && child.type === part.type && child.name === part.name);
    const occurrence = matching.findIndex(child => child.id === part.id);
    if (occurrence < 0) throw new Error('Text path could not be matched');
    segments.unshift([part.type, part.name, occurrence]);
  }
  return JSON.stringify(segments);
}
async function textStyles(n) {
  const texts=n.type==='TEXT'?[n]:('children'in n?await Promise.all($fig.query('TEXT',n.id).values(['id']).map(r=>figma.getNodeByIdAsync(r.id))):[]);
  const keys=new Set();let unstyled=0;const text_runs=[];
  for(const t of texts){const path=textPath(t,n);if(path===null)continue;const entry={path,style_keys:[],font_metrics:[]};text_runs.push(entry);for(const run of t.getStyledTextSegments(['textStyleId','fontName','fontSize','lineHeight','letterSpacing','textDecoration'])){
    const {fontName,fontSize,lineHeight,letterSpacing,textDecoration}=run;
    entry.font_metrics.push({fontName,fontSize,lineHeight,letterSpacing,textDecoration});
    if(!run.textStyleId){unstyled++;entry.style_keys.push(null);continue;}
    if(!styleCache.has(run.textStyleId)){const style=await figma.getStyleByIdAsync(run.textStyleId);styleCache.set(run.textStyleId,style?style.key:null);}
    const key=styleCache.get(run.textStyleId);entry.style_keys.push(key);if(key)keys.add(key);else unstyled++;
  }}
  return {text_style_keys:[...keys].sort(),unstyled_text_runs:unstyled,text_runs};
}
async function describe(n) {
  let main=null;if(n.type==='INSTANCE')main=await mainOf(n);
  const styles=await textStyles(n);
  const properties={};
  if(n.type==='INSTANCE')for(const [k,v]of Object.entries(n.componentProperties))if(v.type==='VARIANT')properties[k]=v.value;
  if(n.type==='COMPONENT'&&n.variantProperties)Object.assign(properties,n.variantProperties);
  return {id:n.id,name:n.name,type:n.type,key:n.type==='COMPONENT'?n.key:null,
    parent_id:n.parent?n.parent.id:null,parent_name:n.parent?n.parent.name:null,parent_type:n.parent?n.parent.type:null,
    main_component_key:main?main.key:null,main_component_remote:main?main.remote:null,ancestor_ids:ancestorIds(n),
    reaction_count:'reactions'in n?n.reactions.length:0,child_count:'children'in n?n.children.length:0,
    layout_mode:'layoutMode'in n?n.layoutMode:null,binding_fields:bindingFields(n),binding_details:await bindingDetails(n),
    variant_properties:properties,...styles};
}
const result={schema_version:1,kind:request.kind,file_key:figma.fileKey,page_id:page.id,
  observed_at:new Date().toISOString(),complete:true,plan_sha256:request.plan_sha256,nodes:[]};
if(request.kind==='source'){
  if(!request.master_file_key || figma.fileKey!==request.master_file_key)throw new Error('Confirmed BlueHeart master required');
  for(const id of request.node_ids){const n=await figma.getNodeByIdAsync(id);if(!n||!['COMPONENT','COMPONENT_SET'].includes(n.type)||!ancestorIds(n).includes(page.id))throw new Error('Component absent from page: '+id);const mains=n.type==='COMPONENT_SET'?n.children.filter(c=>c.type==='COMPONENT'):[n];for(const main of mains)result.nodes.push(await describe(main));}
}else{
  result.screen=request.screen;result.placements=request.placements;
  const root=await figma.getNodeByIdAsync(request.root_id);
  if(!root||!('children'in root)||!ancestorIds(root).includes(page.id))throw new Error('Screen root absent from page');
  result.root_id=root.id;
  const all=[root,...await Promise.all($fig.query('*',root.id).values(['id']).map(r=>figma.getNodeByIdAsync(r.id)))];const byId=new Map(all.map(n=>[n.id,n]));
  result.root_ancestor_ids=ancestorIds(root);
  if(request.qa_root_id){const qa=await figma.getNodeByIdAsync(request.qa_root_id);if(!qa||!result.root_ancestor_ids.includes(qa.id))throw new Error('Screen outside QA container');result.qa_root={id:qa.id,name:qa.name,type:qa.type,parent_id:qa.parent?qa.parent.id:null};}
  const aliases=new Map();for(const f of request.families)for(const alias of [f.id,f.name,f.slug,...(f.exports||[])])if(alias){const k=norm(alias);if(!aliases.has(k))aliases.set(k,new Set());aliases.get(k).add(f.id);}
  result.candidates=[];result.instance_ids=[];const selected=new Set(Object.values(request.placements));
  for(const n of all){
    if(await insideVerifiedInstance(n))continue;
    if(n.type==='INSTANCE'){result.instance_ids.push(n.id);selected.add(n.id);}
    if(n.id===root.id&&n.type==='FRAME')continue; // Screen title is not a control declaration.
    if(!['FRAME','COMPONENT','RECTANGLE','INSTANCE'].includes(n.type))continue;
    const bits=n.name.split(/\s*[\/·]\s*/);const label=bits[0].toUpperCase()==='DS'?bits[1]:bits[0];
    const families=aliases.get(norm(label||''));
    if(families)for(const family of families){result.candidates.push({id:n.id,family});selected.add(n.id);}
  }
  for(const id of selected){const n=byId.get(id);if(!n)throw new Error('Placement outside screen: '+id);result.nodes.push(await describe(n));}
  result.inherited_source_controls=[...inheritedControls.values()];
}
if(request.node_limit!==undefined){
  const offset=request.node_offset||0,limit=request.node_limit;
  if(!Number.isInteger(offset)||offset<0||!Number.isInteger(limit)||limit<1)throw new Error('Invalid readback transport page');
  result.transport={offset,limit,total_nodes:result.nodes.length};
  result.nodes=result.nodes.slice(offset,offset+limit);
  result.complete=false; // Reassemble every numbered page before gate verification.
}
return result;
