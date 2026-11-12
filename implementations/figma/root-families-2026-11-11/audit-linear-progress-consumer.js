if (figma.fileKey !== DATA.fileKey) throw Error('Wrong destination');
const page = await figma.getNodeByIdAsync(DATA.pageId);
if (page?.name !== 'Linear Progress Bar' || page.children.length !== 4) throw Error('Unexpected page');
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = false;
const checks = [];
const close = (actual,expected) => Math.abs(actual-expected) <= .03;
function add(name, pass, observed) { checks.push({name,pass:Boolean(pass),observed}); }
for (const [size,height,setId] of DATA.sets) {
  const set = await figma.getNodeByIdAsync(setId);
  const keys = Object.fromEntries(Object.keys(set.componentPropertyDefinitions).map(k=>[k.split('#')[0],k]));
  const sample = set.children[0].createInstance();
  const id = sample.id;
  const get = () => figma.getNodeByIdAsync(id);
  try {
    for (const value of ['0%','25%','50%','75%','100%','indeterminate']) {
      (await get()).setProperties({value});
      for (const width of [120,246,360,640]) {
        const instance = await get();
        instance.resize(width,instance.height);
        const track = instance.children.find(n=>n.name==='Track');
        const indicator = track.children[0];
        const glyph = value==='indeterminate' ? indicator.children[0] : indicator;
        const ratio = value==='indeterminate' ? 74/246 : (Number.parseInt(value,10)||25)/100;
        const x = value==='indeterminate' ? width*86/246 : value==='0%' ? -width/4 : 0;
        add(size+' '+value+' '+width,track.clipsContent && close(track.width,width) && close(track.height,height)
          && close(glyph.width,width*ratio) && close(glyph.height,height) && close(glyph.x,x),
          {track:[track.width,track.height],indicator:[glyph.x,glyph.width,glyph.height]});
      }
    }
    (await get()).setProperties({value:'100%'});
    for (let flags=0;flags<8;flags++) {
      const expected = [Boolean(flags&1),Boolean(flags&2),Boolean(flags&4)];
      const names = ['Show label','Show value','Show helper text'];
      (await get()).setProperties(Object.fromEntries(names.map((name,index)=>[keys[name],expected[index]])));
      const instance = await get();
      const header = instance.children.find(n=>n.name==='Header');
      const actual = [header.children[0].visible,header.children[1].visible,instance.children.find(n=>n.name==='Helper text').visible];
      add(size+' visibility '+flags,header.visible && actual.every((value,i)=>value===expected[i]),actual);
      if (flags===2) add(size+' value flush right',close(header.children[1].x+header.children[1].width,header.width),
        [header.children[1].x,header.children[1].width,header.width]);
    }
    if (size==='large') {
      const instance = await get();
      instance.setProperties({type:'success',[keys['Show label']]:false,[keys['Show value']]:false,[keys['Show helper text']]:false});
      instance.children.find(n=>n.name==='Header').visible=false;
      add('File Upload rail-only',close(instance.height,12),instance.height);
    }
  } finally {
    (await get())?.remove();
  }
}
return {checks:checks.length,mismatches:checks.filter(c=>!c.pass).slice(0,40),
  mismatchCount:checks.filter(c=>!c.pass).length,pageChildren:page.children.map(n=>n.id)};
