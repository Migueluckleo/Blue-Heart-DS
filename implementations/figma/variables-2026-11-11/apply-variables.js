// Run inside the Figma Plugin API. Prefix with the attested plan payload.
if (figma.fileKey !== plan.fileKey) throw Error('Wrong destination');

function normalize(value) {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, normalize(value[key])]));
  }
  return value;
}

const equal = (left, right) => JSON.stringify(normalize(left)) === JSON.stringify(normalize(right));
const collection = await figma.variables.getVariableCollectionByIdAsync(plan.collection.id);
if (!collection || collection.key !== plan.collection.key || collection.name !== plan.collection.name
    || !equal(collection.modes, plan.collection.modes)) {
  throw Error('Collection identity or modes changed');
}

const existing = new Map();
for (const variable of await figma.variables.getLocalVariablesAsync()) {
  if (variable.variableCollectionId !== collection.id) continue;
  if (existing.has(variable.name)) throw Error('Ambiguous identity: ' + variable.name);
  existing.set(variable.name, variable);
}

const targetIds = new Set(plan.rows.flatMap(row => Object.values(row.values)
  .filter(value => value?.type === 'VARIABLE_ALIAS').map(value => value.id)));
const targets = new Map();
for (const variable of await Promise.all([...targetIds].map(id => figma.variables.getVariableByIdAsync(id)))) {
  if (!variable || variable.remote) throw Error('Alias target is not local');
  targets.set(variable.id, variable);
}

const fontRows = plan.rows.filter(row => !existing.has(row.name) && row.scopes.includes('FONT_FAMILY'));
if (fontRows.length) {
  const available = await figma.listAvailableFontsAsync();
  const names = new Set();
  for (const row of fontRows) {
    for (const initial of Object.values(row.values)) {
      let value = initial;
      const visited = new Set();
      while (value?.type === 'VARIABLE_ALIAS') {
        if (visited.has(value.id)) throw Error('Font alias cycle');
        visited.add(value.id);
        const variable = targets.get(value.id) || await figma.variables.getVariableByIdAsync(value.id);
        const modes = Object.values(variable?.valuesByMode ?? {});
        if (modes.length !== 1) throw Error('Ambiguous font alias');
        value = modes[0];
      }
      if (typeof value !== 'string') throw Error('Invalid font family');
      names.add(value);
    }
  }
  for (const name of names) {
    const exact = available.filter(font => font.fontName.family === name);
    if (!exact.length) throw Error('Font unavailable: ' + name);
    await figma.loadFontAsync((exact.find(font => font.fontName.style === 'Regular') || exact[0]).fontName);
  }
}

function metadata(variable) {
  return {
    name: variable.name,
    type: variable.resolvedType,
    description: variable.description,
    scopes: [...variable.scopes].sort(),
    codeSyntax: variable.codeSyntax,
    hidden: variable.hiddenFromPublishing,
  };
}

function writeValues(variable, values) {
  for (const [mode, value] of Object.entries(values)) {
    if (value?.type === 'VARIABLE_ALIAS' && targets.get(value.id)?.resolvedType !== variable.resolvedType) {
      throw Error('Incompatible target for ' + value.id);
    }
    variable.setValueForMode(mode, value?.type === 'VARIABLE_ALIAS'
      ? figma.variables.createVariableAlias(targets.get(value.id)) : value);
  }
}

const results = [];
const errors = [];
for (const row of plan.rows) {
  const { id, values, priorValues, owned, ...expected } = row;
  expected.scopes.sort();
  let variable = existing.get(row.name);
  let action = 'reused_exact';
  try {
    if (variable) {
      if (owned && (owned.id !== variable.id || owned.key !== variable.key)) {
        throw Error('Previously recorded variable identity changed');
      }
      if (!equal(metadata(variable), expected)) throw Error('Existing metadata differs');
      if (!equal(variable.valuesByMode, values)) {
        if (!owned || !priorValues || !equal(variable.valuesByMode, priorValues)) {
          throw Error('Existing value differs from both approved states');
        }
        action = 'rebound';
        writeValues(variable, values);
      }
    } else {
      if (owned || priorValues) throw Error('Previously recorded variable is missing');
      action = 'created';
      variable = figma.variables.createVariable(row.name, collection, row.type);
      variable.description = row.description;
      variable.scopes = row.scopes;
      variable.hiddenFromPublishing = row.hidden;
      for (const [platform, value] of Object.entries(row.codeSyntax)) {
        variable.setVariableCodeSyntax(platform, value);
      }
      writeValues(variable, values);
    }
    if (!equal(metadata(variable), expected) || !equal(variable.valuesByMode, values)) {
      throw Error('Immediate readback differs');
    }
    results.push({ sourceId: id, id: variable.id, key: variable.key, action });
  } catch (error) {
    errors.push({ sourceId: id, name: row.name, id: variable?.id ?? null, action, error: String(error) });
  }
}
return { fileKey: figma.fileKey, collection: collection.name, results, errors };
