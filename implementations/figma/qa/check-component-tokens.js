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
return {status: findings.length ? 'FAIL' : 'PASS', owners, bindingCount, overrideCount, findings};
