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
assert.equal(bodyTokens.length,33);
function value(token,mode){const v=token.values[mode]??token.values.Value;return v?.type==='VARIABLE_ALIAS'?value(byId.get(v.id),mode):v;}
function rgb(v){return `rgb(${['r','g','b'].map(k=>Math.round(v[k]*255)).join(', ')})`;}
function luminance(v){return ['r','g','b'].map(k=>v[k]<=.04045?v[k]/12.92:((v[k]+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);}
function contrast(a,b){const [lo,hi]=[luminance(a),luminance(b)].sort((a,b)=>a-b);return (hi+.05)/(lo+.05);}
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
    const actual=await page.locator('main').evaluate(el=>{
      const s=getComputedStyle(el),read=token=>s.getPropertyValue('--'+token.replaceAll('/','-')).trim();
      return Object.fromEntries(['primary','secondary','brand','warning','success','danger','information'].map(role=>[role,read('body/color/text/'+role)]));
    });
    const pairs=[];
    for(const token of bodyTokens.filter(t=>t.name.startsWith('body/color/text/'))){
      const color=value(token,mode),role=token.name.split('/').at(-1);
      const measured=await page.locator('main').evaluate((el,role)=>{
        const probe=document.createElement('span');probe.style.color=`var(--body-color-text-${role})`;el.appendChild(probe);
        const color=getComputedStyle(probe).color;probe.remove();return color;
      },role);
      assert.equal(measured,rgb(color),mode+' '+role);
      for(const bg of bodyTokens.filter(t=>t.name.startsWith('body/color/bg/'))){const ratio=contrast(color,value(bg,mode));assert.ok(ratio>=4.5,`${mode} ${role} ${bg.name} ${ratio}`);pairs.push(ratio);}
    }
    themes.push({mode,minContrast:Math.min(...pairs),colors:actual});
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
  const out=resolve(repo,'output/qa/body-tokens-2026-11-17');await mkdir(out,{recursive:true});
  await page.locator('[data-blueheart="app-shell"]').screenshot({path:resolve(out,'web-playground.png')});
  assert.deepEqual(errors,[]);
  const result={status:'PASS',cards:5,tokens:33,metrics,themes,shellBodyWidths:widths,keyboard:true};
  await writeFile(resolve(out,'chrome.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally{await browser?.close();server.close();}
