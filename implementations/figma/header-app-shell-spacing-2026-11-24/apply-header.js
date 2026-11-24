// Read-only preservation fingerprint. Validated against Node crypto before use.
function stableJson(value) {
  if (Array.isArray(value)) return '[' + value.map(v => stableJson(v) ?? 'null').join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.keys(value).sort().filter(k => value[k] !== undefined).map(k => JSON.stringify(k) + ':' + stableJson(value[k])).join(',') + '}';
  return JSON.stringify(value);
}
function sha256Utf8(input) {
  const s = unescape(encodeURIComponent(input));
  const primes = [], k = [], initial = [];
  for (let p = 2; primes.length < 64; p++) {
    if (primes.some(d => d * d <= p && p % d === 0)) continue;
    primes.push(p);
    k.push((Math.pow(p, 1 / 3) % 1 * 0x100000000) >>> 0);
    if (initial.length < 8) initial.push((Math.sqrt(p) % 1 * 0x100000000) >>> 0);
  }
  const bytes = Array.from(s, c => c.charCodeAt(0));
  const bitLength = bytes.length * 8;
  bytes.push(128);
  while (bytes.length % 64 !== 56) bytes.push(0);
  const upper = Math.floor(bitLength / 0x100000000), lower = bitLength >>> 0;
  for (const word of [upper, lower]) for (let shift = 24; shift >= 0; shift -= 8) bytes.push((word >>> shift) & 255);
  const h = initial.slice(), rotr = (v, n) => (v >>> n) | (v << (32 - n));
  for (let block = 0; block < bytes.length; block += 64) {
    const w = new Array(64);
    for (let i = 0; i < 16; i++) w[i] = ((bytes[block+i*4] << 24) | (bytes[block+i*4+1] << 16) | (bytes[block+i*4+2] << 8) | bytes[block+i*4+3]) >>> 0;
    for (let i = 16; i < 64; i++) {
      const a = w[i-15], b = w[i-2];
      const s0 = rotr(a,7) ^ rotr(a,18) ^ (a >>> 3), s1 = rotr(b,17) ^ rotr(b,19) ^ (b >>> 10);
      w[i] = (w[i-16] + s0 + w[i-7] + s1) >>> 0;
    }
    let [a,b,c,d,e,f,g,z] = h;
    for (let i = 0; i < 64; i++) {
      const s1 = rotr(e,6) ^ rotr(e,11) ^ rotr(e,25), ch = (e & f) ^ (~e & g);
      const t1 = (z + s1 + ch + k[i] + w[i]) >>> 0;
      const s0 = rotr(a,2) ^ rotr(a,13) ^ rotr(a,22), maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (s0 + maj) >>> 0;
      z=g; g=f; f=e; e=(d+t1)>>>0; d=c; c=b; b=a; a=(t1+t2)>>>0;
    }
    [a,b,c,d,e,f,g,z].forEach((v,i) => h[i] = (h[i] + v) >>> 0);
  }
  return h.map(n => n.toString(16).padStart(8,'0')).join('');
}
if (sha256Utf8('abc') !== 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad') throw new Error('SHA-256 runtime self-check failed');

const specs=[{"id":"layout-spacing:component:header-container-padding","name":"header/spacing/container-padding","resolvedType":"FLOAT","description":"Header · Padding exterior del contenedor. Conserva los 32 px elegidos por el usuario y consume spacing-2xl en los cuatro temas. Token interno oculto de los selectores.","scopes":[],"codeSyntax":{"WEB":"var(--header-spacing-container-padding)"},"valuesByMode":{"Contable":{"type":"VARIABLE_ALIAS","id":"VariableID:6:231"},"Administrativo":{"type":"VARIABLE_ALIAS","id":"VariableID:6:231"},"Servicios":{"type":"VARIABLE_ALIAS","id":"VariableID:6:231"},"Personas":{"type":"VARIABLE_ALIAS","id":"VariableID:6:231"}}},{"id":"layout-spacing:component:app-shell-none","name":"app-shell/spacing/none","resolvedType":"FLOAT","description":"App Shell · Ausencia de separación: 0 px para el gap Header–Content y el padding superior de Content. Consume spacing-none en los cuatro temas. Token interno oculto de los selectores.","scopes":[],"codeSyntax":{"WEB":"var(--app-shell-spacing-none)"},"valuesByMode":{"Contable":{"type":"VARIABLE_ALIAS","id":"VariableID:6:191"},"Administrativo":{"type":"VARIABLE_ALIAS","id":"VariableID:6:191"},"Servicios":{"type":"VARIABLE_ALIAS","id":"VariableID:6:191"},"Personas":{"type":"VARIABLE_ALIAS","id":"VariableID:6:191"}}}];const collection=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:6:22');if(!collection||collection.name!=='component')throw Error('Component collection changed');const vars=await figma.variables.getLocalVariablesAsync();const fields=['id','key','name','resolvedType','variableCollectionId','description','scopes','codeSyntax','hiddenFromPublishing','remote','valuesByMode'];const old=vars.filter(v=>!specs.some(s=>s.name===v.name)).map(v=>Object.fromEntries(fields.map(k=>[k,v[k]]).filter(([,v])=>v!==undefined))).sort((a,b)=>a.id.localeCompare(b.id));if(old.length!==1536||sha256Utf8(stableJson(old))!=="1be1ad92307f9a6797bb513f9823bd3ffdff3856642f80aaf52ab334f04b7dfd")throw Error('Previous variable corpus changed; read before writing');const root=await figma.getNodeByIdAsync('90:439');if(!root||root.key!=="184bc49c10c9c61b024cc49f5df95c4438f2f73d")throw Error('Header identity changed');for(const field of ['paddingTop','paddingRight','paddingBottom','paddingLeft'])if(root[field]!==32)throw Error('Header measure changed: '+field);await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('90:2'));const coll=$fig.getVarCollection(collection.id);const destination={'VariableID:6:231':'VariableID:8:257','VariableID:6:191':'VariableID:8:217'};const handles=[];const operations=[];for(const spec of specs){const matches=vars.filter(v=>v.variableCollectionId===collection.id&&v.name===spec.name);if(matches.length>1)throw Error('Duplicate token '+spec.name);if(matches.length){const v=matches[0];for(const mode of collection.modes){const desired=destination[spec.valuesByMode[mode.name].id];if(v.valuesByMode[mode.modeId]?.id!==desired)throw Error('Existing token mismatch '+spec.name);}if(JSON.stringify(v.scopes)!=='[]'||v.description!==spec.description||JSON.stringify(v.codeSyntax)!==JSON.stringify(spec.codeSyntax))throw Error('Existing token metadata mismatch');handles.push($fig.getVar(v.id));operations.push('REUSED');}else{const values={};for(const [mode,alias] of Object.entries(spec.valuesByMode))values[mode]=$fig.getVar(destination[alias.id]);handles.push(coll.numVar({name:spec.name,description:spec.description,values,scopes:[],codeSyntax:spec.codeSyntax}));operations.push('CREATED');}}$fig.get('90:439').set({paddingTop:handles[0],paddingRight:handles[0],paddingBottom:handles[0],paddingLeft:handles[0]});await $fig.done();const created=[];for(let i=0;i<handles.length;i++){const v=await figma.variables.getVariableByIdAsync(handles[i].id);created.push({logical_id:specs[i].id,id:v.id,key:v.key,name:v.name,resolvedType:v.resolvedType,description:v.description,scopes:v.scopes,codeSyntax:v.codeSyntax,hiddenFromPublishing:v.hiddenFromPublishing,valuesByMode:v.valuesByMode,operation:operations[i]});}const n=await figma.getNodeByIdAsync('90:439');return {created,mutatedNodeIds:['90:439'],pageId:'90:2',bindings:4,root:{id:n.id,key:n.key,width:n.width,height:n.height,padding:[n.paddingTop,n.paddingRight,n.paddingBottom,n.paddingLeft],boundVariables:n.boundVariables}};
