import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root=resolve('out'),repo=resolve('../..');
const config=JSON.parse(await readFile(resolve(repo,'config/web-inputs.json'),'utf8'));
const byId=new Map(),bodyTokens=[];
for(const source of config.token_sources){
  const data=JSON.parse(await readFile(resolve(repo,source.path),'utf8'));
  for(const collection of data.collections??[]){
    const modes=Object.fromEntries(collection.modes.map(mode=>[mode.modeId,mode.name]));
    for(const v of collection.variables){
      const row={...v,values:Object.fromEntries(Object.entries(v.valuesByMode).map(([m,value])=>[modes[m]??m,value]))};
      byId.set(v.id,row);if(v.targetId)byId.set(v.targetId,row);
      if(v.name.startsWith('body/'))bodyTokens.push(row);
    }
  }
}
assert.equal(bodyTokens.length,63);
const bodyByName=new Map(bodyTokens.map(token=>[token.name,token]));
const manifest=JSON.parse(await readFile(resolve(repo,'implementations/web/src/generated/tokens.manifest.json'),'utf8'));
const policy=JSON.parse(await readFile(resolve(repo,'specs/tokens/visibility.body-only.correction.json'),'utf8')).selectorVisibilityPolicy;
assert.equal(policy.bodyTokens.length,63);
for(const token of manifest.tokens){
  const declared=token.collection==='component'&&token.name.startsWith('body/')?policy.bodyTokens.find(row=>row.name===token.name):null;
  assert.deepEqual(token.scopes,declared?.scopes??[],token.name);
}
function value(token,mode){const v=token.values[mode]??token.values.Value;return v?.type==='VARIABLE_ALIAS'?value(byId.get(v.id),mode):v;}
function rgb(v){return `rgb(${['r','g','b'].map(k=>Math.round(v[k]*255)).join(', ')})`;}
function luminance(v){return ['r','g','b'].map(k=>v[k]<=.04045?v[k]/12.92:((v[k]+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);}
function contrast(a,b){const [lo,hi]=[luminance(a),luminance(b)].sort((a,b)=>a-b);return (hi+.05)/(lo+.05);}
const inverseToken=bodyByName.get('body/color/shape/inverse');
assert.deepEqual(inverseToken.scopes,['SHAPE_FILL']);
const iconsOnWhite=[
  {role:'warning-on-white',semantic:'warning-default',primitive:'amber/600'},
  {role:'caution-on-white',semantic:'caution-icon-on-white',primitive:'caution-orange/600'},
];
for(const {role,semantic,primitive} of iconsOnWhite){
  const token=bodyByName.get('body/color/shape/'+role);
  assert.deepEqual(token.scopes,['SHAPE_FILL']);
  for(const mode of config.modes){
    const alias=byId.get(token.values[mode].id);
    assert.equal(alias.name,semantic);
    assert.deepEqual(alias.scopes,[]);
    assert.equal(byId.get((alias.values[mode]??alias.values.Value).id).name,primitive);
  }
}
for(const mode of config.modes){
  const alias=inverseToken.values[mode];assert.equal(alias.type,'VARIABLE_ALIAS');
  const semantic=byId.get(alias.id);assert.equal(semantic.name,'neutral-base');
  const primitive=byId.get((semantic.values[mode]??semantic.values.Value).id);assert.equal(primitive.name,'neutral/100');
  assert.deepEqual(value(inverseToken,mode),{r:1,g:1,b:1,a:1});
}
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{
  const path=new URL(req.url,'http://localhost').pathname;
  const file=resolve(root,'.'+(path==='/'?'/index.html':path));
  if(!file.startsWith(root+sep)){res.writeHead(403).end();return;}
  try{res.writeHead(200,{'Content-Type':mime[extname(file)]??'application/octet-stream'});res.end(await readFile(file));}catch{res.writeHead(404).end();}
});
let browser;
try{
  await new Promise((done,fail)=>server.listen(0,'127.0.0.1',done).once('error',fail));
  const origin=`http://127.0.0.1:${server.address().port}`;
  browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage({viewport:{width:1536,height:1200}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  await page.goto(origin+'/playground/body.html');await page.evaluate(()=>document.fonts.ready);
  const cards=page.locator('.bh-body-demo-card'),canvas=page.locator('.bh-body-content');
  assert.equal(await cards.count(),5);
  assert.equal(await canvas.evaluate(el=>getComputedStyle(el).gap),'32px');
  for(const row of await page.locator('.bh-body-demo-row').all())assert.equal(await row.evaluate(el=>getComputedStyle(el).gap),'32px');
  const composition=await page.locator('.bh-body-playground-shell').evaluate(el=>{
    const padding=node=>{
      const style=getComputedStyle(node);
      return [style.paddingTop,style.paddingRight,style.paddingBottom,style.paddingLeft].map(parseFloat);
    };
    const rect=selector=>el.querySelector(selector).getBoundingClientRect();
    const rows=[...el.querySelectorAll('.bh-body-demo-row')];
    return {
      headerPadding:padding(el.querySelector('.bh-header')),
      headerToMain:rect('.bh-app-shell-main').top-rect('.bh-header').bottom,
      canvasPadding:padding(el.querySelector('.bh-body-content')),
      betweenRows:rows[1].getBoundingClientRect().top-rows[0].getBoundingClientRect().bottom,
      betweenBlocks:rect('.bh-tabs-list').top-rows[1].getBoundingClientRect().bottom,
      cardPadding:[...el.querySelectorAll('.bh-body-demo-card')].map(node=>({
        padding:padding(node),stroke:getComputedStyle(node).borderTopStyle,weight:getComputedStyle(node).borderTopWidth,
      })),
      widgetPadding:[...el.querySelectorAll('.bh-body-widget')].map(padding),
    };
  });
  assert.deepEqual(composition.headerPadding,[24,24,24,24]);
  assert.equal(composition.headerToMain,32);
  assert.deepEqual(composition.canvasPadding,[0,0,0,0]);
  assert.equal(composition.betweenRows,32);
  assert.equal(composition.betweenBlocks,32);
  assert.deepEqual(composition.cardPadding,Array.from({length:5},()=>({padding:[24,24,24,24],stroke:'solid',weight:'1px'})));
  assert.deepEqual(composition.widgetPadding,[[24,24,24,24],[24,24,24,24]]);
  const tablist=page.getByRole('tablist',{name:'Estado de comprobantes'});
  const tabGap=async ()=>{
    const bar=await tablist.boundingBox();
    const table=await page.getByRole('tabpanel').locator('[data-blueheart="table"]').boundingBox();
    return table.y-bar.y-bar.height;
  };
  assert.equal(await tabGap(),16);
  assert.equal(await page.getByRole('tabpanel').getByRole('row').count(),3);
  await tablist.getByRole('tab',{name:'Por revisar'}).focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  assert.equal(await tabGap(),16);
  assert.equal(await page.getByRole('tabpanel').getByRole('row').count(),2);
  composition.tabsToTable=16;
  assert.deepEqual(await cards.evaluateAll(nodes=>nodes.map(n=>n.dataset.demoKind)),['summary','receivables','channels','reconciliation','review']);
  assert.equal(await page.getByRole('progressbar').count(),5);
  assert.equal(await page.locator('.bh-body-demo-card [data-blueheart=button]').count(),7);
  assert.equal(await page.locator('.bh-body-demo-card [data-blueheart=icon-button][data-variant=ghost]').count(),2);
  const metrics=await cards.first().evaluate(card=>{
    const style=getComputedStyle(card),get=selector=>{const s=getComputedStyle(card.querySelector(selector));return [s.fontSize,s.lineHeight,s.fontWeight];};
    return {padding:[style.paddingTop,style.paddingRight,style.paddingBottom,style.paddingLeft],gap:style.gap,radius:style.borderRadius,
      titleDescription:getComputedStyle(card.querySelector('.bh-body-title-description')).gap,segment:getComputedStyle(card.querySelector('.bh-body-widget')).gap,
      h1:get('.bh-body-h1'),h2:get('.bh-body-h2'),h3:get('.bh-body-h3'),description:get('.bh-body-description'),caption:get('.bh-body-caption'),font:getComputedStyle(card.querySelector('h3')).fontFamily};
  });
  assert.deepEqual(metrics.padding,['24px','24px','24px','24px']);assert.equal(metrics.gap,'16px');assert.equal(metrics.radius,'16px');
  assert.equal(metrics.titleDescription,'4px');assert.equal(metrics.segment,'8px');
  for(const [role,expected]of Object.entries({h1:['24px','32px','600'],h2:['20px','28px','600'],h3:['16px','24px','600'],description:['14px','20px','400'],caption:['12px','16px','400']}))assert.deepEqual(metrics[role],expected);
  assert.match(metrics.font,/Manrope Variable/);
  const themes=[];
  for(const mode of ['Contable','Administrativo','Servicios','Personas']){
    await page.getByRole('combobox',{name:'Tema del Playground'}).selectOption(mode);
    const surfaces=await page.locator('.bh-body-playground-shell').evaluate(el=>{
      const header=getComputedStyle(el.querySelector('.bh-header'));
      const section=getComputedStyle(el.querySelector('.bh-section-header'));
      return {header:header.backgroundColor,body:getComputedStyle(el).backgroundColor,sectionPadding:section.padding};
    });
    assert.equal(surfaces.header,rgb(value(bodyByName.get('body/color/bg/emphasis'),mode)));
    assert.notEqual(surfaces.header,surfaces.body);
    assert.equal(surfaces.sectionPadding,'24px');
    for(const {role} of iconsOnWhite){
      const token=bodyByName.get('body/color/shape/'+role);
      const icon=page.locator(`[data-color-role="${role}"] > svg`);
      const measured=await icon.evaluate(el=>({
        foreground:getComputedStyle(el).color,
        background:getComputedStyle(el.closest('.bh-body-color-specimen')).backgroundColor,
      }));
      const white=value(bodyByName.get('body/color/bg/primary'),mode);
      assert.deepEqual(white,{r:1,g:1,b:1,a:1});
      assert.deepEqual(measured,{foreground:rgb(value(token,mode)),background:rgb(white)});
      assert.ok(contrast(value(token,mode),white)>=3);
    }
    const actual=await page.locator('main').evaluate(el=>{
      const s=getComputedStyle(el),read=token=>s.getPropertyValue('--'+token.replaceAll('/','-')).trim();
      return Object.fromEntries(['primary','secondary','brand','warning','caution','success','danger','information'].map(role=>[role,read('body/color/text/'+role)]));
    });
    const pairs=[];
    for(const token of bodyTokens.filter(t=>t.name.startsWith('body/color/text/'))){
      const color=value(token,mode),role=token.name.split('/').at(-1);
      const measured=await page.locator('main').evaluate((el,role)=>{
        const probe=document.createElement('span');probe.style.color=`var(--body-color-text-${role})`;el.appendChild(probe);
        const color=getComputedStyle(probe).color;probe.remove();return color;
      },role);
      assert.equal(measured,rgb(color),mode+' '+role);
      if(role!=='disabled')for(const bg of bodyTokens.filter(t=>['body/color/bg/primary','body/color/bg/emphasis'].includes(t.name))){const ratio=contrast(color,value(bg,mode));assert.ok(ratio>=4.5,`${mode} ${role} ${bg.name} ${ratio}`);pairs.push(ratio);}
    }
    const semanticPairs=[];
    for(const tone of ['primary','secondary','brand','warning','caution','success','danger','information']){
      const row=page.locator(`.bh-body-color-row[data-color-tone="${tone}"]`),bgTone=tone==='secondary'?'emphasis':tone;
      const measured=await row.evaluate(el=>{
        const style=property=>getComputedStyle(el.querySelector(`[data-color-property="${property}"]`));
        return {text:style('text').color,bg:style('bg').backgroundColor,pairedText:style('bg').color,
          stroke:style('stroke').borderColor,shape:getComputedStyle(el.querySelector('svg')).fill};
      });
      const colors=Object.fromEntries(['text','bg','stroke','shape'].map(group=>[group,value(bodyByName.get(`body/color/${group}/${group==='bg'?bgTone:tone}`),mode)]));
      for(const group of Object.keys(colors))assert.equal(measured[group],rgb(colors[group]),mode+' '+tone+' '+group);
      assert.equal(measured.pairedText,rgb(colors.text));
      const textRatio=contrast(colors.text,colors.bg),shapeRatio=contrast(colors.shape,colors.bg);
      const strokeRatio=contrast(colors.stroke,value(bodyByName.get('body/color/bg/primary'),mode));
      assert.ok(textRatio>=4.5,mode+' '+tone+' text');assert.ok(shapeRatio>=3,mode+' '+tone+' shape');
      if(tone!=='secondary')assert.ok(strokeRatio>=3,mode+' '+tone+' stroke');
      semanticPairs.push({tone,textRatio,shapeRatio,strokeRatio,decorativeBorder:tone==='secondary'});
    }
    const inverse=await page.locator('[data-color-role="inverse"]').evaluate(el=>({
      shape:getComputedStyle(el.querySelector('circle')).fill,backgroundShape:getComputedStyle(el.querySelector('rect')).fill,
    }));
    assert.equal(inverse.shape,rgb(value(inverseToken,mode)),mode+' inverse');
    const brandShape=value(bodyByName.get('body/color/shape/brand'),mode);
    assert.equal(inverse.backgroundShape,rgb(brandShape));
    const inverseContrast=contrast(value(inverseToken,mode),brandShape);
    assert.ok(inverseContrast>=3,mode+' inverse/brand shape contrast');
    const disabled=await page.locator('main').evaluate(el=>{
      const probe=document.createElement('div');probe.style.cssText='color:var(--body-color-text-disabled);background:var(--body-color-bg-disabled);border:1px solid var(--body-color-stroke-disabled)';
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.style.fill='var(--body-color-shape-disabled)';probe.appendChild(svg);el.appendChild(probe);
      const style=getComputedStyle(probe),result={text:style.color,bg:style.backgroundColor,stroke:style.borderColor,shape:getComputedStyle(svg).fill};probe.remove();return result;
    });
    for(const group of ['text','bg','stroke','shape'])assert.equal(disabled[group],rgb(value(bodyByName.get(`body/color/${group}/disabled`),mode)),mode+' disabled '+group);
    assert.deepEqual(disabled,{text:'rgb(148, 163, 184)',bg:'rgb(241, 245, 249)',stroke:'rgb(226, 232, 240)',shape:'rgb(148, 163, 184)'});
    themes.push({mode,minContrast:Math.min(...pairs),colors:actual,semanticPairs,disabled,inverse:{...inverse,contrast:inverseContrast}});
  }
  const widths=[];
  for(const expanded of [false,true,false]){
    if(expanded!==((await page.getByRole('button',{name:'Contraer navegación'}).count())>0)){
      await page.getByRole('button',{name:expanded?'Expandir navegación':'Contraer navegación'}).focus();await page.keyboard.press('Space');
    }
    const width=await canvas.evaluate(el=>el.getBoundingClientRect().width);assert.equal(width,expanded?1110:1272);widths.push(width);
    assert.equal(await cards.count(),5);
    for(const card of await cards.all())assert.equal(await card.evaluate(el=>el.scrollWidth<=el.clientWidth),true);
  }
  const choices=page.getByRole('checkbox',{name:'Incluir movimientos pendientes'});
  await choices.focus();await page.keyboard.press('Space');
  assert.equal(await page.getByRole('progressbar',{name:'Movimientos conciliados'}).getAttribute('aria-valuenow'),'100');
  await page.keyboard.press('Space');
  assert.equal(await page.getByRole('progressbar',{name:'Movimientos conciliados'}).getAttribute('aria-valuenow'),'75');
  await page.getByRole('button',{name:'Ver balance',exact:true}).focus();await page.keyboard.press('Enter');
  assert.match(await page.getByRole('status').textContent(),/balance/);
  await page.getByRole('button',{name:'Ver Referencia y RFC',exact:true}).focus();await page.keyboard.press('Space');
  assert.match(await page.getByRole('status').textContent(),/Referencia y RFC/);
  await page.getByRole('combobox',{name:'Tema del Playground'}).selectOption('Contable');
  const out=resolve(repo,process.env.BODY_QA_DIR??'qa/implementations/caution-2026-11-23/body-regression');await mkdir(out,{recursive:true});
  await page.locator('.bh-body-color-specimen').screenshot({path:resolve(out,'web-color-roles.png')});
  await page.setViewportSize({width:320,height:900});
  assert.equal(await page.locator('.bh-body-color-row').count(),8);
  const inverseSample=page.locator('[data-color-role="inverse"]');
  assert.equal(await inverseSample.count(),1);
  assert.equal(await inverseSample.evaluate(el=>el.scrollWidth<=el.clientWidth),true);
  assert.ok(await page.locator('.bh-body-color-scroll').evaluate(el=>el.scrollWidth>el.clientWidth));
  assert.deepEqual(errors,[]);
  const result={status:'PASS',cards:5,tokens:bodyTokens.length,colorTokens:bodyTokens.filter(t=>t.resolvedType==='COLOR').length,newColorTokens:30,visibleScopes:policy.bodyTokens.length,shapeRoles:bodyTokens.filter(t=>t.name.startsWith('body/color/shape/')).length,disabledPropertyChecks:themes.length*4,onWhiteChecks:themes.length*iconsOnWhite.length,inverseAliasChain:true,metrics,composition,themes,shellBodyWidths:widths,keyboard:true,narrowSpecimenScroll:true};
  await writeFile(resolve(out,'chrome.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally{await browser?.close();server.close();}
