const ownerIds=['90:439','105:7'];
// Prepend const ownerIds = [...] with the current family master IDs.
figma.skipInvisibleInstanceChildren = false;

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const layers = new Map(collections.map(collection => [collection.id, collection.name]));
const variables = new Map((await figma.variables.getLocalVariablesAsync()).map(variable => [variable.id, variable]));
const findings = [];
let bindingCount = 0;
let overrideCount = 0;

function check(node, fields = null) {
  for (const [field, value] of Object.entries(node.boundVariables ?? {})) {
    if (fields && !fields.some(key => key.includes('variable') || key === field.toLowerCase()
      || field.toLowerCase().includes(key))) continue;
    for (const alias of Array.isArray(value) ? value : [value]) {
      if (alias?.type !== 'VARIABLE_ALIAS') continue;
      bindingCount++;
      const token = variables.get(alias.id);
      const layer = layers.get(token?.variableCollectionId);
      if (layer !== 'component') {
        findings.push({node: node.id, field, token: token?.name ?? alias.id, layer: layer ?? 'external'});
        continue;
      }
      const collection = collections.find(candidate => candidate.id === token.variableCollectionId);
      for (const mode of collection.modes) {
        const semantic = variables.get(token.valuesByMode[mode.modeId]?.id);
        const semanticMode = collections.find(candidate => candidate.id === semantic?.variableCollectionId)?.defaultModeId;
        const primitive = variables.get(semantic?.valuesByMode[semanticMode]?.id);
        if (layers.get(semantic?.variableCollectionId) !== 'semantic'
          || layers.get(primitive?.variableCollectionId) !== 'primitives'
          || semantic.resolvedType !== token.resolvedType || primitive.resolvedType !== token.resolvedType) {
          findings.push({node: node.id, field, token: token.name, mode: mode.name, issue: 'alias-chain'});
        }
      }
    }
  }
}

async function visit(node) {
  if (node.type === 'INSTANCE') {
    const main = await node.getMainComponentAsync();
    if (!main) findings.push({node: node.id, issue: 'missing-main-component'});
    const localFields = Object.entries(node.boundVariables ?? {}).filter(([field, value]) =>
      JSON.stringify(value) !== JSON.stringify(main?.boundVariables?.[field])).map(([field]) => field.toLowerCase());
    check(node, localFields);
    for (const override of node.overrides) {
      const fields = override.overriddenFields.map(field => field.toLowerCase()).filter(field =>
        /variable|fill|stroke|font|effect|spacing|padding|radius|width|height/.test(field));
      if (!fields.length) continue;
      overrideCount++;
      const child = await figma.getNodeByIdAsync(override.id);
      if (child) check(child, fields);
      else findings.push({node: override.id, issue: 'unreadable-override'});
    }
    return;
  }
  check(node);
  if ('children' in node) for (const child of node.children) await visit(child);
}

if (!ownerIds.length) throw Error('Provide the family master IDs');
const owners = [];
for (const id of ownerIds) {
  const owner = await figma.getNodeByIdAsync(id);
  if (!owner || !['COMPONENT', 'COMPONENT_SET'].includes(owner.type)) {
    findings.push({node: id, issue: 'unreadable-master'});
    continue;
  }
  owners.push({id, name: owner.name});
  await visit(owner);
}
const requested=[{"id":"90:439","property":"paddingTop","value":32,"token":"header/spacing/container-padding"},{"id":"90:439","property":"paddingRight","value":32,"token":"header/spacing/container-padding"},{"id":"90:439","property":"paddingBottom","value":32,"token":"header/spacing/container-padding"},{"id":"90:439","property":"paddingLeft","value":32,"token":"header/spacing/container-padding"},{"id":"105:3","property":"itemSpacing","value":0,"token":"app-shell/spacing/none"},{"id":"105:4","property":"itemSpacing","value":0,"token":"app-shell/spacing/none"},{"id":"105:5","property":"itemSpacing","value":0,"token":"app-shell/spacing/none"},{"id":"105:6","property":"itemSpacing","value":0,"token":"app-shell/spacing/none"},{"id":"299:1332","property":"itemSpacing","value":0,"token":"app-shell/spacing/none"},{"id":"299:2120","property":"itemSpacing","value":0,"token":"app-shell/spacing/none"},{"id":"453:5306","property":"itemSpacing","value":0,"token":"app-shell/spacing/none"},{"id":"453:5430","property":"itemSpacing","value":0,"token":"app-shell/spacing/none"},{"id":"105:8","property":"paddingTop","value":32,"token":"header/spacing/container-padding"},{"id":"105:8","property":"paddingRight","value":32,"token":"header/spacing/container-padding"},{"id":"105:8","property":"paddingBottom","value":32,"token":"header/spacing/container-padding"},{"id":"105:8","property":"paddingLeft","value":32,"token":"header/spacing/container-padding"},{"id":"105:267","property":"paddingTop","value":0,"token":"app-shell/spacing/none"},{"id":"105:267","property":"paddingBottom","value":32,"token":"app-shell/spacing/content"},{"id":"105:717","property":"paddingTop","value":32,"token":"header/spacing/container-padding"},{"id":"105:717","property":"paddingRight","value":32,"token":"header/spacing/container-padding"},{"id":"105:717","property":"paddingBottom","value":32,"token":"header/spacing/container-padding"},{"id":"105:717","property":"paddingLeft","value":32,"token":"header/spacing/container-padding"},{"id":"105:837","property":"paddingTop","value":0,"token":"app-shell/spacing/none"},{"id":"105:837","property":"paddingBottom","value":32,"token":"app-shell/spacing/content"},{"id":"105:1145","property":"paddingTop","value":32,"token":"header/spacing/container-padding"},{"id":"105:1145","property":"paddingRight","value":32,"token":"header/spacing/container-padding"},{"id":"105:1145","property":"paddingBottom","value":32,"token":"header/spacing/container-padding"},{"id":"105:1145","property":"paddingLeft","value":32,"token":"header/spacing/container-padding"},{"id":"105:1265","property":"paddingTop","value":0,"token":"app-shell/spacing/none"},{"id":"105:1265","property":"paddingBottom","value":32,"token":"app-shell/spacing/content"},{"id":"105:1489","property":"paddingTop","value":32,"token":"header/spacing/container-padding"},{"id":"105:1489","property":"paddingRight","value":32,"token":"header/spacing/container-padding"},{"id":"105:1489","property":"paddingBottom","value":32,"token":"header/spacing/container-padding"},{"id":"105:1489","property":"paddingLeft","value":32,"token":"header/spacing/container-padding"},{"id":"105:1609","property":"paddingTop","value":0,"token":"app-shell/spacing/none"},{"id":"105:1609","property":"paddingBottom","value":32,"token":"app-shell/spacing/content"},{"id":"299:1324","property":"paddingTop","value":32,"token":"header/spacing/container-padding"},{"id":"299:1324","property":"paddingRight","value":32,"token":"header/spacing/container-padding"},{"id":"299:1324","property":"paddingBottom","value":32,"token":"header/spacing/container-padding"},{"id":"299:1324","property":"paddingLeft","value":32,"token":"header/spacing/container-padding"},{"id":"299:1325","property":"paddingTop","value":0,"token":"app-shell/spacing/none"},{"id":"299:1325","property":"paddingBottom","value":32,"token":"app-shell/spacing/content"},{"id":"299:2112","property":"paddingTop","value":32,"token":"header/spacing/container-padding"},{"id":"299:2112","property":"paddingRight","value":32,"token":"header/spacing/container-padding"},{"id":"299:2112","property":"paddingBottom","value":32,"token":"header/spacing/container-padding"},{"id":"299:2112","property":"paddingLeft","value":32,"token":"header/spacing/container-padding"},{"id":"299:2113","property":"paddingTop","value":0,"token":"app-shell/spacing/none"},{"id":"299:2113","property":"paddingBottom","value":32,"token":"app-shell/spacing/content"},{"id":"453:5307","property":"paddingTop","value":32,"token":"header/spacing/container-padding"},{"id":"453:5307","property":"paddingRight","value":32,"token":"header/spacing/container-padding"},{"id":"453:5307","property":"paddingBottom","value":32,"token":"header/spacing/container-padding"},{"id":"453:5307","property":"paddingLeft","value":32,"token":"header/spacing/container-padding"},{"id":"453:5308","property":"paddingTop","value":0,"token":"app-shell/spacing/none"},{"id":"453:5308","property":"paddingBottom","value":32,"token":"app-shell/spacing/content"},{"id":"453:5431","property":"paddingTop","value":32,"token":"header/spacing/container-padding"},{"id":"453:5431","property":"paddingRight","value":32,"token":"header/spacing/container-padding"},{"id":"453:5431","property":"paddingBottom","value":32,"token":"header/spacing/container-padding"},{"id":"453:5431","property":"paddingLeft","value":32,"token":"header/spacing/container-padding"},{"id":"453:5432","property":"paddingTop","value":0,"token":"app-shell/spacing/none"},{"id":"453:5432","property":"paddingBottom","value":32,"token":"app-shell/spacing/content"},{"id":"299:1329","property":"itemSpacing","value":32,"token":"app-shell/spacing/content"},{"id":"299:2117","property":"itemSpacing","value":32,"token":"app-shell/spacing/content"}];const targetIds={"header/spacing/container-padding":"VariableID:653:191","app-shell/spacing/none":"VariableID:653:192","app-shell/spacing/content":"VariableID:227:65"};const requestedFindings=[];for(const b of requested){const n=await figma.getNodeByIdAsync(b.id);if(!n||n[b.property]!==b.value||n.boundVariables?.[b.property]?.id!==targetIds[b.token])requestedFindings.push({node:b.id,field:b.property,value:n?.[b.property],binding:n?.boundVariables?.[b.property]});}return {status:findings.length||requestedFindings.length?'FAIL':'PASS',owners,bindingCount,overrideCount,findings,requestedBindings:requested.length,requestedFindings};

