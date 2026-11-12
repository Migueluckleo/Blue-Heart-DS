if (figma.fileKey !== DATA.fileKey) throw Error('Wrong Stepper destination');
const page=await figma.getNodeByIdAsync(DATA.pageId);
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren=false;
const set=await figma.getNodeByIdAsync(DATA.setId);
const collection=await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:6:22');
await Promise.all(['Regular','SemiBold'].map(style=>figma.loadFontAsync({family:'Manrope',style})));
const checks=[];
const createdNodeIds=[];
const removedNodeIds=[];
const check=(name,actual,expected)=>{if(actual!==expected)checks.push({name,actual,expected});};
const hex=paint=>[paint.r,paint.g,paint.b].map(c=>Math.round(c*255).toString(16).padStart(2,'0')).join('');
const fill=async node=>{
  const ref=node.boundVariables?.fills?.[0];
  if(!ref)throw Error('Missing fill '+node.name);
  const variable=await figma.variables.getVariableByIdAsync(ref.id);
  return hex(variable.resolveForConsumer(node).value);
};
let runs=0;
const modes={Contable:['3255f7','bfcefe'],Administrativo:['037255','93d3bf'],
  Servicios:['dc2f00','ffd8c8'],Personas:['8300f8','e0cafc']};
for(const main of set.children){
  const axes=Object.fromEntries(main.name.split(', ').map(axis=>axis.split('=')));
  const {state,position}=axes;
  const test=main.createInstance();
  createdNodeIds.push(test.id);
  try {
    const progress=test.children.find(n=>n.name==='Step progress');
    const number=progress.children.find(n=>n.name==='Number');
    const mark=number.children[0];
    const glyph=mark.findOne(n=>n.type==='VECTOR');
    const completed=state==='checked'&&position!=='end';
    const markKey=(await mark.getMainComponentAsync()).key;
    check(main.name+' Phosphor',markKey,completed?DATA.check:DATA.image);
    check(main.name+' reactions',test.reactions.length,0);
    for(const mode of collection.modes){
      test.setExplicitVariableModeForCollection(collection,mode.modeId);
      const [brand,accent]=modes[mode.name];
      const label=main.name+' / '+mode.name;
      check(label+' mark',await fill(number),completed?accent:state==='inactive'?'e2e8f0':brand);
      check(label+' icon',await fill(glyph),completed?brand:state==='inactive'?'64748b':'ffffff');
      const lines=progress.children.filter(n=>n.name==='Progress line');
      check(label+' connector count',lines.length,position==='middle'?2:1);
      for(const line of lines){
        const incoming=progress.children.indexOf(line)<progress.children.indexOf(number);
        const expected=incoming?(state==='inactive'?'e2e8f0':accent):(state==='checked'?accent:'e2e8f0');
        check(label+' connector '+incoming,await fill(line.children[0]),expected);
      }
      const terminal=progress.children.find(n=>n.name==='Content');
      if(terminal)check(label+' terminal',await fill(terminal.children[0]),'ffffff');
      const title=test.findOne(n=>n.type==='TEXT'&&n.name==='Step details');
      const step=test.findOne(n=>n.type==='TEXT'&&n.name==='text-step-1');
      const caption=test.findOne(n=>n.type==='TEXT'&&n.name==='Caption');
      check(label+' title',await fill(title),'64748b');
      check(label+' step label',await fill(step),'64748b');
      check(label+' caption',await fill(caption),'94a3b8');
      runs++;
    }
    if(main.id===set.defaultVariant.id){
      const props=Object.fromEntries(Object.keys(test.componentProperties).map(key=>[key.split('#')[0],key]));
      const image=await figma.importComponentByKeyAsync(DATA.image);
      test.setProperties({[props.step]:'PASO 2',[props.title]:'Datos fiscales',[props.caption]:'Información complementaria',
        [props['show caption']]:false,[props['show step']]:false,[props.icon]:image.id});
      const title=test.findOne(n=>n.type==='TEXT'&&n.name==='Step details');
      const step=test.findOne(n=>n.type==='TEXT'&&n.name==='text-step-1');
      const caption=test.findOne(n=>n.type==='TEXT'&&n.name==='Caption');
      check('editable title',title.characters,'Datos fiscales');
      check('hide step',step.visible,false);
      check('hide caption',caption.visible,false);
      test.setProperties({[props['show caption']]:true,[props['show step']]:true});
      check('editable step',step.characters,'PASO 2');
      check('editable caption',caption.characters,'Información complementaria');
      const swapped=test.findOne(n=>n.type==='FRAME'&&n.name==='Number').children[0];
      check('editable icon',(await swapped.getMainComponentAsync()).key,DATA.image);
    }
  } finally {
    removedNodeIds.push(test.id);
    test.remove();
  }
}
check('Clean official page',page.children.map(n=>n.id).sort().join(','),[DATA.lineId,DATA.setId].sort().join(','));
return {status:checks.length?'FAIL':'PASS',variants:set.children.length,modes:collection.modes.map(x=>x.name),
  variantModePairs:runs,mismatches:checks.slice(0,35),mismatchCount:checks.length,createdNodeIds,mutatedNodeIds:removedNodeIds};
