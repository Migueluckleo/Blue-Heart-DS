figma.skipInvisibleInstanceChildren=false;
const empty=await figma.getNodeByIdAsync('93:72');
const filled=await figma.getNodeByIdAsync('93:499');
const page=empty.parent;
await figma.setCurrentPageAsync(page);
const checks=[];
const add=(name,pass,observed)=>checks.push({name,pass:Boolean(pass),observed});
const equal=(a,b)=>Math.abs(a-b)<0.00001;
const find=(n,name)=>n.findOne(c=>c.name===name);
const key=(n,name)=>Object.keys(n.componentProperties).find(k=>k.split('#')[0]===name);
const caret=(n)=>find(n,'CaretDown');
const ids=()=>page.children.map(n=>n.id).join(',');
const before=ids();
add('Official page scope',page.children.length===2&&filled.parent.id===page.id,before);
const alternate=await figma.importComponentByKeyAsync('8ebba51c41e3b39511663395803390b9d2e3d3f7');
for (const set of [empty,filled]){
  for(const main of set.children){
    const size=main.variantProperties.size;
    const height={large:48,medium:40,small:32}[size];
    const field=find(main,'container-placeholder-text');
    const helper=find(main,'supporting-text');
    add(set.name+' '+main.name+' compact geometry',equal(main.width,464)&&equal(main.height,height+48)&&equal(field.height,height)&&equal(helper.height,16),[main.width,main.height,field.height,helper.height]);
  }
  const main=set.children.find(n=>n.name==='size=medium, status=focus');
  const n=main.createInstance();
  try {
    const long='Contenido de muestra que sobrepasa el espacio disponible en una sola línea';
    const help='Texto de ayuda que se extiende a varias líneas cuando el campo se hace más estrecho y mantiene visible toda la corrección solicitada.';
    const caretId=caret(n).id;
    n.resize(280,n.height);
    n.setProperties({[key(n,'Label')]:'Importe',[key(n,'Placeholder')]:long,
      [key(n,'Helper text')]:help,[key(n,'Show badge')]:true,[key(n,'Show tooltip')]:true,
      [key(n,'Icon')]:alternate.id,[key(n,'Required')]:false});
    const content=find(n,'Placeholder text');
    const message=find(n,'supporting-text');
    const badge=find(n,'Badge');
    const badgeOwner=await badge.getMainComponentAsync();
    badge.setProperties({[key(badge,'Label')]:'USD'});
    add(set.name+' constrained width and one-line ellipsis',equal(n.width,280)&&content.characters===long&&content.maxLines===1&&content.textTruncation==='ENDING',[n.width,content.width,content.maxLines]);
    add(set.name+' long helper grows',message.characters===help&&message.height>16&&message.textAutoResize==='HEIGHT',[message.height,n.height]);
    add(set.name+' Badge linked and editable',badge.visible&&badgeOwner.parent.name==='Badge'&&badgeOwner.variantProperties.type==='subtle'&&badgeOwner.variantProperties.size==='small'&&find(badge,'Label').characters==='USD',[badgeOwner.id,find(badge,'Label').characters]);
    add(set.name+' Label and optional properties',find(n,'Label').characters==='Importe'&&!find(n,'textbox').visible&&find(n,'Question').visible,[find(n,'Label').characters,find(n,'textbox').visible,find(n,'Question').visible]);
    const swapped=await figma.getNodeByIdAsync(caretId);
    add(set.name+' Phosphor swap',(await swapped?.getMainComponentAsync())?.key===alternate.key,alternate.key);
    n.setProperties({[key(n,'Show helper')]:false,[key(n,'Show placeholder')]:false,[key(n,'Show icon')]:false,
      [key(n,'Show badge')]:false,[key(n,'Show label')]:false});
    const layers=[find(n,'container-optional-helper'),find(n,'Placeholder text'),swapped,find(n,'Badge'),find(n,'Label')];
    const hidden=layers.map(layer=>{
      let node=layer;
      while(node.id!==n.id){if(!node.visible)return true;node=node.parent;}
      return false;
    });
    add(set.name+' all five visibility controls',hidden.every(Boolean),hidden);
  } finally { n.remove(); }
}
add('No temporary instances remain',ids()===before,ids());
return {status:checks.every(c=>c.pass)?'PASS':'FAIL',checks};
