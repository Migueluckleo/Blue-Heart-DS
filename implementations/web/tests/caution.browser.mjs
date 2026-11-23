import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root=resolve('out'), qa=resolve('../../qa/implementations/caution-2026-11-23');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{
  const path=new URL(req.url,'http://localhost').pathname;
  const file=resolve(root,'.'+(path==='/'?'/index.html':path));
  if(!file.startsWith(root+sep)){res.writeHead(403).end();return;}
  try{res.writeHead(200,{'Content-Type':mime[extname(file)]??'application/octet-stream'});res.end(await readFile(file));}catch{res.writeHead(404).end();}
});
let browser;
try{
  await mkdir(qa,{recursive:true});
  await new Promise((done,fail)=>server.listen(0,'127.0.0.1',done).once('error',fail));
  const origin=`http://127.0.0.1:${server.address().port}`;
  browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1100}}),errors=[],results=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  await page.goto(origin);await page.evaluate(()=>document.fonts.ready);
  for(const theme of ['Contable','Administrativo','Servicios','Personas']){
    await page.getByRole('combobox',{name:'Tema',exact:true}).selectOption(theme);
    const badge=page.locator('#demo-badge [data-type=caution]');
    const measured=await badge.evaluate(el=>{
      const s=getComputedStyle(el);return{bg:s.backgroundColor,text:s.color,border:s.borderTopWidth,font:s.fontFamily};
    });
    assert.equal(measured.bg,'rgb(253, 234, 219)');assert.equal(measured.text,'rgb(154, 63, 6)');
    assert.equal(measured.border,'0px');assert.match(measured.font,/Manrope/);
    const progress=page.locator('#demo-progress-caution');
    assert.equal(await progress.getAttribute('aria-valuenow'),'75');
    assert.equal(await page.locator('#demo-progress-caution-unknown').getAttribute('aria-valuenow'),null);
    const indicators=await page.locator('[data-blueheart=linear-progress][data-type=caution] .bh-linear-progress-indicator').evaluateAll(nodes=>nodes.map(n=>getComputedStyle(n).backgroundColor));
    assert.deepEqual(indicators,['rgb(238, 122, 26)','rgb(238, 122, 26)']);
    results.push({theme,badge:measured,determinate:75,indeterminate:true,indicator:indicators[0]});
  }
  await page.locator('#demo-badge').screenshot({path:resolve(qa,'badges.png')});
  await page.locator('[data-blueheart=linear-progress][data-type=caution]').first().screenshot({path:resolve(qa,'progress.png')});
  await page.goto(origin+'/playground/body.html');await page.evaluate(()=>document.fonts.ready);
  const body=[];
  for(const theme of ['Contable','Administrativo','Servicios','Personas']){
    await page.getByRole('combobox',{name:'Tema del Playground'}).selectOption(theme);
    const row=page.locator('[data-color-tone=caution]');
    const measured=await row.evaluate(el=>{
      const style=p=>getComputedStyle(el.querySelector(`[data-color-property="${p}"]`));
      return{text:style('text').color,bg:style('bg').backgroundColor,stroke:style('stroke').borderColor,shape:getComputedStyle(el.querySelector('svg')).fill};
    });
    assert.deepEqual(measured,{text:'rgb(154, 63, 6)',bg:'rgb(253, 234, 219)',stroke:'rgb(154, 63, 6)',shape:'rgb(154, 63, 6)'});
    body.push({theme,...measured});
  }
  await page.locator('.bh-body-color-specimen').screenshot({path:resolve(qa,'body.png')});
  assert.deepEqual(errors,[]);
  await writeFile(resolve(qa,'browser.json'),JSON.stringify({status:'PASS',themes:results,body,consoleErrors:errors},null,2)+'\n');
  console.log('Caution browser PASS: Badge sin borde, progreso determinado/indeterminado y cuatro roles Body en los cuatro temas.');
}finally{await browser?.close();await new Promise(done=>server.close(done));}
