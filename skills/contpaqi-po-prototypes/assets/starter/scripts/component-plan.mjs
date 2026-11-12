import {createHash} from 'node:crypto';
import {existsSync, readFileSync, readdirSync, realpathSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const digest = value => createHash('sha256').update(value).digest('hex');
const read = file => JSON.parse(readFileSync(file, 'utf8'));
const planPath = 'references/component-plan.json';
const manifestPath = 'references/snapshot-manifest.json';
const registryPath = 'implementations/web/components.registry.json';

function need(condition, message) {
  if (!condition) throw new Error('DS_PLAN: ' + message);
}

function declarations(text) {
  const header = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text)?.[1];
  need(header, 'Contrato sin metadatos de autoridad.');
  const id = /^contract_id:\s*([\w-]+)\s*$/m.exec(header)?.[1];
  const status = /^status:\s*([A-Z_]+)\s*$/m.exec(header)?.[1];
  const dependencyField = /^dependencies:[ \t]*(.*)$/m.exec(header);
  if (!dependencyField) return {id, status, dependencies:[]};
  const value = dependencyField[1].trim();
  let values;
  if (value.startsWith('[') && value.endsWith(']')) {
    values = value.slice(1,-1).split(',').map(item=>item.trim()).filter(Boolean);
  } else if (!value) {
    const lines = header.slice(dependencyField.index + dependencyField[0].length).split(/\r?\n/).slice(1);
    values = [];
    for (const line of lines) {
      const item = /^\s*-\s+(\S+)$/.exec(line);
      if (!item) break;
      values.push(item[1]);
    }
    need(values.length, `Lista de dependencias vacía o ilegible de ${id}.`);
  }
  need(values && values.every(item=>/^(['"]?)[\w-]+\1$/.test(item)), `Dependencias ilegibles de ${id}.`);
  return {id, status, dependencies:values.map(item=>item.replace(/^['"]|['"]$/g,''))};
}

function loadCatalog() {
  const raw = readFileSync(manifestPath);
  const manifest = JSON.parse(raw);
  const release = read('references/release.json');
  const identity = digest(raw);
  const ordered = Object.fromEntries(Object.entries(manifest.files).sort(([a],[b])=>a<b?-1:a>b?1:0));
  need(manifest.schema_version === 1 && release.manifest_sha256 === identity && release.ds_digest === manifest.ds_digest
    && digest(JSON.stringify(ordered)) === manifest.ds_digest, 'El manifiesto y el recibo fijado difieren.');
  const root = realpathSync('references/design-system');
  const verified = new Map();
  const source = relative => {
    if (!verified.has(relative)) {
      need(typeof relative === 'string' && Object.hasOwn(manifest.files, relative), `Fuente fuera del corte: ${relative}.`);
      const file = realpathSync(path.resolve(root, relative));
      need(file.startsWith(root+path.sep), `Ruta fuera del corte: ${relative}.`);
      const bytes = readFileSync(file);
      const sha256 = digest(bytes);
      need(sha256 === manifest.files[relative], `Fuente alterada: ${relative}.`);
      verified.set(relative, {path:relative,sha256,text:bytes.toString('utf8')});
    }
    const {text,...receipt} = verified.get(relative);
    return receipt;
  };
  const registry = source(registryPath);
  const exportsIndex = source('implementations/web/src/index.ts');
  const catalog = new Map();
  for (const family of manifest.components) {
    need(!catalog.has(family.id), `Familia duplicada en el manifiesto: ${family.id}.`);
    catalog.set(family.id,family);
  }
  const specs = new Map();
  for (const relative of Object.keys(manifest.files).filter(name=>/^specs\/components\/[^/]+\.contract\.[^/]+\.md$/.test(name))) {
    source(relative);
    const {id} = declarations(verified.get(relative).text);
    need(id, `Spec de familia sin ID: ${relative}.`);
    const paths = specs.get(id) ?? [];
    paths.push(relative);
    specs.set(id,paths);
  }
  for (const [id,family] of catalog) need(specs.get(id)?.includes(family.contract), `Familia del manifiesto sin spec correspondiente: ${id}.`);
  for (const [id,paths] of specs) if (!catalog.has(id)) {
    need(paths.length === 1, `Spec de familia ambigua sin entrada de manifiesto: ${id}.`);
    catalog.set(id,{id,contract:paths[0],amendments:[],exports:[]});
  }
  const web = new Map();
  for (const family of JSON.parse(verified.get(registryPath).text)) {
    need(!web.has(family.id), `Familia duplicada en el registro web: ${family.id}.`);
    web.set(family.id,family);
  }
  const foundations = new Map();
  for (const relative of Object.keys(manifest.files).filter(name=>/^specs\/foundations\/.*\.md$/.test(name))) {
    source(relative);
    const {id} = declarations(verified.get(relative).text);
    if (id) {
      need(!foundations.has(id), `Identidad de foundations ambigua: ${id}.`);
      foundations.set(id, {id,contract:relative,amendments:[],exports:[]});
    }
  }
  const mapFamily = id => {
    const family = catalog.get(id) ?? foundations.get(id);
    need(family, `Contrato dependiente desconocido: ${id}.`);
    const contract = source(family.contract);
    const meta = declarations(verified.get(contract.path).text);
    need(meta.id === id && ['DELEGATED_FOR_BUILD','APPROVED'].includes(meta.status), `Contrato sin autoridad aplicable: ${id}.`);
    const amendments = family.amendments.map(source);
    const dependencies = [...new Set([ ...meta.dependencies,
      ...amendments.flatMap(item=>declarations(verified.get(item.path).text).dependencies)])];
    const registered = web.get(id);
    const exports = registered?.base === contract.path && (family.consumption_targets?.includes('web') ?? true)
      ? family.exports.filter(name=>registered.exports.includes(name)) : [];
    return {componentId:id,contract,amendments,exports,dependencies};
  };
  return {identity,manifest,registry,exportsIndex,catalog,mapFamily,source};
}

export function createComponentPlan(brief) {
  const {identity,manifest,registry,exportsIndex,catalog,mapFamily,source} = loadCatalog();
  const tracking = brief.componentFamilyTracking;
  need(Array.isArray(tracking), 'Completa componentFamilyTracking con todas las familias de npm run inventory.');
  const tracked = new Map();
  for (const row of tracking) {
    const {componentId,applicability,reason} = row;
    need(catalog.has(componentId), `Familia ajena al corte: ${componentId}.`);
    need(!tracked.has(componentId), `Familia duplicada en el seguimiento: ${componentId}.`);
    need(['APPLIES','NOT_APPLICABLE'].includes(applicability) && reason?.trim(), `Decide y justifica la aplicabilidad de ${componentId}.`);
    tracked.set(componentId,{componentId,applicability,reason});
  }
  const missing = [...catalog.keys()].filter(id=>!tracked.has(id));
  need(!missing.length, `Familias omitidas: ${missing.join(', ')}.`);
  const requirements = brief.componentRequirements;
  need(Array.isArray(requirements) && (requirements.length || brief.controlsAbsent?.trim()), 'Completa el mapa del brief o justifica una pantalla sin controles.');
  const seen = new Set();
  const controls = requirements.map(entry=>{
    const {instanceId, role, componentId, exportName, coverage, reason, evidence} = entry;
    need(typeof instanceId === 'string' && instanceId && !seen.has(instanceId) && role?.trim(), 'Cada control necesita ID único y rol del brief.');
    seen.add(instanceId);
    need(reason?.trim(), `Documenta el criterio de compatibilidad de ${instanceId}.`);
    if (coverage === 'NO_SPEC') {
      need(componentId === null && !exportName && evidence === registryPath, `Registra la búsqueda de ${instanceId} contra el catálogo del corte.`);
      return {instanceId,role,componentId,coverage,reason,evidence:registry,dependencies:[]};
    }
    need(catalog.has(componentId), `Familia no localizada para ${instanceId}.`);
    need(tracked.get(componentId).applicability === 'APPLIES', `La familia ${componentId} se usa en el brief y debe marcarse APPLIES.`);
    const family = mapFamily(componentId);
    const docs = `implementations/web/docs/components/${catalog.get(componentId).slug}.md`;
    need([family.contract.path,...family.amendments.map(item=>item.path),docs].includes(evidence), `La evidencia de ${instanceId} debe corresponder a ${componentId}.`);
    need(coverage === 'COMPATIBLE' && family.exports.includes(exportName)
      || coverage === 'SPEC_WITHOUT_WEB' && !family.exports.length && !exportName
      || coverage === 'WEB_INCOMPATIBLE' && family.exports.length && !exportName, `Cobertura o export incorrecto para ${instanceId}.`);
    const dependencies = new Map();
    const pending = [...family.dependencies];
    while (pending.length) {
      const id = pending.shift();
      if (id === componentId || dependencies.has(id)) continue;
      const mapped = mapFamily(id);
      dependencies.set(id,mapped);
      pending.push(...mapped.dependencies);
    }
    return {...family,instanceId,role,exportName:exportName??null,coverage,reason,evidence:source(evidence),dependencies:[...dependencies.values()]};
  });
  const families = [...tracked.values()].sort((a,b)=>a.componentId.localeCompare(b.componentId)).map(row=>{
    const {contract,amendments,exports} = mapFamily(row.componentId);
    const instances = controls.filter(control=>control.componentId===row.componentId).map(control=>control.instanceId);
    need(row.applicability !== 'APPLIES' || instances.length, `Familia aplicable sin controles mapeados: ${row.componentId}.`);
    return {...row,contract,amendments,exports,instances};
  });
  return {schema_version:1,manifest_sha256:identity,ds_digest:manifest.ds_digest,registry,exportsIndex,families,controls,controlsAbsent:brief.controlsAbsent??null};
}

export function verifyComponentPlan(brief) {
  need(existsSync(planPath), 'Ejecuta npm run plan con el inventario completo antes de construir.');
  const expected = createComponentPlan(brief);
  const existing = read(planPath);
  need(JSON.stringify(existing) === JSON.stringify(expected), 'Mapa ausente u obsoleto. Ejecuta npm run plan antes de implementar o al cambiar el alcance.');
  return existing;
}

function sourceReceipt(plan) {
  const files = {};
  function walk(directory) {
    for (const entry of readdirSync(directory,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))) {
      const file = path.join(directory,entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.isFile()) files[file] = digest(readFileSync(file));
      else need(false, `Archivo de prototipo no verificable: ${file}.`);
    }
  }
  walk('prototype');
  return {plan_sha256:digest(JSON.stringify(plan)),files};
}

export function recordComponentSource(plan) {
  writeFileSync('references/component-source.json',JSON.stringify(sourceReceipt(plan),null,2)+'\n');
}

export function verifyComponentSourceReceipt(plan) {
  const receipt = read('references/component-source.json');
  need(JSON.stringify(receipt) === JSON.stringify(sourceReceipt(plan)), 'Código o mapa cambiado desde el build. Repite build y captura.');
  return receipt;
}

export function verifyFamilyTracking(plan, components, capture) {
  const implemented = new Map(components.map(component=>[component.instanceId,component]));
  const controls = new Map(plan.controls.map(control=>[control.instanceId,control]));
  const observations = {};
  if (controls.size) need(capture.status === 'PASS', 'Falta una captura PASS para verificar las instancias aplicables.');
  for (const [id,control] of controls) {
    const actual = implemented.get(id);
    const seen = capture.states.filter(state=>state.status==='PASS' && state.nodes.some(node=>node.id===id && node.visible
      && node.component === actual?.componentId && (control.coverage !== 'COMPATIBLE' || node.export === control.exportName)));
    need(seen.length && actual?.evidence?.status==='PASS', `Control aplicable sin instancia verificada: ${id}.`);
    observations[id] = seen.map(state=>({screen:state.screen_id,state:state.state_id,viewport:state.viewport}));
  }
  return plan.families.map(family=>({...family,result:family.applicability==='NOT_APPLICABLE' ? 'NOT_APPLICABLE'
    : family.instances.every(id=>controls.get(id).coverage==='COMPATIBLE') ? 'VERIFIED' : 'EXCEPTION',
  observations:Object.fromEntries(family.instances.map(id=>[id,observations[id]]))}));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === '--inventory') {
    const {identity,catalog,mapFamily} = loadCatalog();
    const families = [...catalog.keys()].sort().map(id=>{
      const {contract,exports} = mapFamily(id);
      return {componentId:id,contract:contract.path,exports,applicability:null,reason:''};
    });
    console.log(JSON.stringify({manifest_sha256:identity,families},null,2));
  } else {
    const plan = createComponentPlan(read('brief.json'));
    writeFileSync(planPath, JSON.stringify(plan,null,2)+'\n');
    console.log(`Mapa BlueHeart verificado: ${plan.families.length} familias · ${plan.controls.length} controles · ${plan.manifest_sha256.slice(0,12)}`);
  }
}
