if (figma.fileKey !== DATA.fileKey) throw Error('Wrong Stepper destination');
const collection=await figma.variables.getVariableCollectionByIdAsync(DATA.collection);
if (collection.name !== 'component') throw Error('Wrong collection');
const actualModes=collection.modes.map(mode=>mode.name);
if (JSON.stringify(actualModes)!==JSON.stringify(DATA.modes)) throw Error('Mode names or order changed');
const found=(await figma.variables.getLocalVariablesAsync()).filter(v=>v.name.startsWith('stepper/'));
const created=[];
const variables={};
for (const recipe of DATA.variables) {
  let variable=found.find(v=>v.name===recipe.name);
  if (!variable) {
    variable=figma.variables.createVariable(recipe.name,collection,recipe.resolvedType);
    variable.scopes=recipe.scopes;
    variable.description=recipe.description;
    variable.setVariableCodeSyntax('WEB',recipe.codeSyntax.WEB);
    for (const mode of collection.modes) {
      variable.setValueForMode(mode.modeId,recipe.valuesByMode[mode.name]);
    }
    created.push(variable.id);
  }
  if (variable.variableCollectionId!==collection.id||variable.resolvedType!==recipe.resolvedType||
      JSON.stringify(variable.scopes)!==JSON.stringify(recipe.scopes)) throw Error('Unexpected variable '+recipe.name);
  for (const mode of collection.modes) {
    const expected=recipe.valuesByMode[mode.name];
    const actual=variable.valuesByMode[mode.modeId];
    if (typeof expected==='number'?actual!==expected:actual?.id!==expected.id) throw Error('Alias drift '+recipe.name);
  }
  variables[recipe.name]={id:variable.id,key:variable.key,type:variable.resolvedType,values:variable.valuesByMode};
}
return {fileKey:figma.fileKey,collection:collection.id,variables,createdNodeIds:created,mutatedNodeIds:[]};
