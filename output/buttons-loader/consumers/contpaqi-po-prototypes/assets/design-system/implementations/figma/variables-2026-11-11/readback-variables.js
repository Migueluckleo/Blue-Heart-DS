// Independent read-only verification. Prefix with the destination and expected fingerprints.
if (figma.fileKey !== plan.fileKey) throw Error('Wrong destination');

function normalize(value) {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, normalize(value[key])]));
  }
  return value;
}

function fingerprint(value) {
  const data = JSON.stringify(normalize(value));
  let hash = 0xcbf29ce484222325n;
  for (let i = 0; i < data.length; i++) {
    hash = BigInt.asUintN(64, (hash ^ BigInt(data.charCodeAt(i))) * 0x100000001b3n);
  }
  if (hash < 0n) hash += 0x10000000000000000n;
  return hash.toString(16).padStart(16, '0') + '/' + data.length;
}

const actual = await Promise.all(plan.rows.map(row => figma.variables.getVariableByIdAsync(row.id)));
const results = actual.map((variable, index) => {
  if (!variable) return { id: plan.rows[index].id, found: false, pass: false };
  const row = {
    id: variable.id,
    key: variable.key,
    name: variable.name,
    type: variable.resolvedType,
    collectionId: variable.variableCollectionId,
    description: variable.description,
    scopes: [...variable.scopes].sort(),
    codeSyntax: variable.codeSyntax,
    hidden: variable.hiddenFromPublishing,
    remote: variable.remote,
    values: variable.valuesByMode,
  };
  const observed = fingerprint(row);
  return { id: row.id, observed, pass: observed === plan.rows[index].expected,
    modeValues: Object.keys(row.values).length,
    aliases: Object.values(row.values).filter(value => value?.type === 'VARIABLE_ALIAS').length };
});
return { fileKey: figma.fileKey, results, pass: results.every(row => row.pass) };
