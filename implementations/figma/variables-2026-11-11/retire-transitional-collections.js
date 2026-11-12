// Prefix with the reconciled final collections, old ownership ledger and semantic alias map.
if (figma.fileKey !== plan.fileKey) throw Error('Wrong destination');
const current = await figma.variables.getLocalVariableCollectionsAsync();
const expected = [...plan.collections, ...plan.ownedOldCollections];
if (current.length !== expected.length) throw Error('Unexpected collection count');
const byId = new Map(current.map(collection => [collection.id, collection]));

for (const row of expected) {
  const collection = byId.get(row.id);
  if (!collection || collection.key !== row.key || collection.name !== row.name
      || collection.defaultModeId !== row.defaultModeId
      || collection.hiddenFromPublishing !== row.hiddenFromPublishing
      || JSON.stringify(collection.modes) !== JSON.stringify(row.modes)
      || JSON.stringify([...collection.variableIds].sort()) !== JSON.stringify(row.variableIds)) {
    throw Error('Collection or membership drift: ' + row.name);
  }
}

// Component aliases were read independently before entering this operation. The
// semantic boundary is checked again here, so no authorized consumer loses its target.
const semanticIds = Object.keys(plan.semanticAliases);
const primitives = new Set(plan.collections.find(c => c.name === 'primitives').variableIds);
const variables = await Promise.all(semanticIds.map(id => figma.variables.getVariableByIdAsync(id)));
for (const variable of variables) {
  const value = variable?.valuesByMode[plan.semanticAliasMode];
  if (value?.type !== 'VARIABLE_ALIAS' || !primitives.has(value.id)
      || plan.semanticAliases[variable.id] !== value.id) {
    throw Error('Semantic alias depends on a transitional or unexpected identity');
  }
}
const removed = [];
const errors = [];
for (const row of plan.ownedOldCollections) {
  try {
    byId.get(row.id).remove();
    removed.push({ id: row.id, key: row.key, name: row.name, variableCount: row.variableIds.length });
  } catch (error) {
    errors.push({ id: row.id, name: row.name, error: String(error) });
  }
}
return { fileKey: figma.fileKey, removed, errors };
