import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root=resolve('out'),qa=resolve('../../output/qa/inline-notification-right-isotipo-2026-11-23');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{
  const file=resolve(root,'.'+(new URL(req.url,'http://localhost').pathname==='/'?'/index.html':new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(root+sep)){res.writeHead(403).end();return;}
  try{res.writeHead(200,{'Content-Type':mime[extname(file)]??'application/octet-stream'});res.end(await readFile(file));}catch{res.writeHead(404).end();}
});
let browser;
try{
  await mkdir(qa,{recursive:true});
  await new Promise((done,fail)=>server.listen(0,'127.0.0.1',done).once('error',fail));
  const origin=`http://127.0.0.1:${server.address().port}`;
  browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage({viewport:{width:1280,height:1100}}),errors=[],themes=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  await page.goto(origin);await page.evaluate(()=>document.fonts.ready);
  const demo=page.locator('#demo-inline-notification'),notices=demo.locator('[data-blueheart=inline-notification]');
  const control=demo.getByRole('checkbox',{name:'Mostrar CTA de las notificaciones'});
  const types=['neutral','info','success','warning','error'];
  const ctas=()=>demo.locator('.bh-inline-body > [data-blueheart=button]');
  const heights=()=>notices.evaluateAll(nodes=>nodes.map(n=>({type:n.dataset.type,height:n.getBoundingClientRect().height})));
  assert.equal(await notices.count(),5);assert.equal(await control.isChecked(),false);assert.equal(await ctas().count(),0);
  let activations=0;
  for(const theme of ['Contable','Administrativo','Servicios','Personas']){
    await page.getByRole('combobox',{name:'Tema',exact:true}).selectOption(theme);
    const off=await heights();
    await control.focus();await page.keyboard.press('Space');
    await page.waitForFunction(()=>document.querySelector('#demo-inline-notification [data-blueheart="inline-notification"]')?.dataset.showCta==='true');
    assert.equal(await ctas().count(),5);
    await page.mouse.move(0,0);
    const records=[];
    for(const type of types){
      const notice=demo.locator(`[data-blueheart=inline-notification][data-type="${type}"]`),cta=notice.getByRole('button',{name:'Ver detalles',exact:true});
      assert.equal(await cta.getAttribute('data-variant'),'secondary');assert.equal(await cta.getAttribute('data-size'),'small');
      assert.equal(await notice.locator('.bh-inline-text').getAttribute('role'),['warning','error'].includes(type)?'alert':'status');
      assert.equal(await cta.evaluate(el=>el.closest('[role=alert],[role=status]')===null),true);
      const metrics=await notice.evaluate(el=>{
        const body=el.querySelector('.bh-inline-body'),text=el.querySelector('.bh-inline-text'),button=body.querySelector('[data-blueheart=button]');
        const t=text.getBoundingClientRect(),b=button.getBoundingClientRect(),style=getComputedStyle(button);
        return {height:el.getBoundingClientRect().height,buttonHeight:b.height,bodyGap:getComputedStyle(body).gap,textGap:getComputedStyle(text).gap,aligned:Math.abs(b.bottom-t.bottom)<.1,space:b.left-t.right,rightOfText:b.left>=t.right,font:style.fontFamily,background:style.backgroundColor,color:style.color,style:button.getAttribute('style')};
      });
      assert.equal(metrics.buttonHeight,32);assert.equal(metrics.bodyGap,'16px');assert.equal(metrics.textGap,'4px');
      assert.equal(metrics.aligned,true);assert.equal(metrics.rightOfText,true);assert.equal(metrics.space,16);assert.match(metrics.font,/Manrope/);
      assert.match(metrics.style,/var\(--[a-z-]*button/);
      assert.ok(metrics.height>=off.find(n=>n.type===type).height);
      await cta.click();activations++;
      assert.equal(await demo.locator('#demo-inline-cta-result').textContent(),`Activaciones locales de CTA: ${activations}`);
      assert.equal(await notices.count(),5);
      records.push({type,...metrics});
    }
    const keyboard=demo.locator('[data-type=info]').getByRole('button',{name:'Ver detalles',exact:true});
    await keyboard.focus();await page.keyboard.press('Enter');activations++;
    await page.keyboard.press('Space');activations++;
    assert.equal(await demo.locator('#demo-inline-cta-result').textContent(),`Activaciones locales de CTA: ${activations}`);
    assert.equal(await notices.count(),5);
    await control.focus();await page.keyboard.press('Space');
    await page.waitForFunction(()=>document.querySelector('#demo-inline-notification [data-blueheart="inline-notification"]')?.dataset.showCta==='false');
    assert.equal(await ctas().count(),0);assert.deepEqual(await heights(),off);
    const logos=[];
    for(const [name,ratio] of [['Contabilidad',112/115],['XML en línea',156/115]]){
      await demo.getByRole('button',{name:'Isotipo '+name,exact:true}).click();
      const images=demo.locator('.bh-inline-isotipo img');assert.equal(await images.count(),5);
      await images.first().evaluate(img=>img.decode());
      for(const img of await images.all()){
        const box=await img.evaluate(el=>{const r=el.getBoundingClientRect();return {width:r.width,height:r.height,ratio:r.width/r.height,naturalWidth:el.naturalWidth,naturalHeight:el.naturalHeight,fit:getComputedStyle(el).objectFit,alt:el.alt};});
        assert.ok(box.width<=32.001&&box.height<=32.001,JSON.stringify(box));assert.ok(Math.abs(box.ratio-ratio)<.003,JSON.stringify(box));assert.equal(box.fit,'contain');assert.equal(box.alt,name);
        logos.push({name,...box});
      }
      assert.equal(await demo.locator('.bh-inline-indicator').count(),0);
    }
    await demo.getByRole('button',{name:'Ícono de estado',exact:true}).click();
    assert.equal(await demo.locator('.bh-inline-isotipo img').count(),0);assert.equal(await demo.locator('.bh-inline-indicator').count(),5);
    themes.push({theme,offHeights:off,records,logos,keyboard:true,offRemovesLayoutAndButton:true});
  }
  await page.getByRole('combobox',{name:'Tema',exact:true}).selectOption('Contable');
  await control.focus();await page.keyboard.press('Space');
  await page.waitForFunction(()=>document.querySelector('#demo-inline-notification [data-blueheart="inline-notification"]')?.dataset.showCta==='true');
  await demo.screenshot({path:resolve(qa,'web-wide.png')});
  await demo.getByRole('button',{name:'Isotipo Contabilidad',exact:true}).click();
  await demo.locator('.bh-inline-isotipo img').first().evaluate(img=>img.decode());
  await demo.evaluate(el=>{el.style.width='320px';});
  const narrow=await notices.evaluateAll(nodes=>nodes.map(el=>{
    const r=el.getBoundingClientRect(),b=el.querySelector('.bh-inline-body > button').getBoundingClientRect();
    return {type:el.dataset.type,width:r.width,height:r.height,noOverflow:el.scrollWidth<=el.clientWidth,ctaWithin:b.left>=r.left&&b.right<=r.right};
  }));
  for(const row of narrow){assert.equal(row.width,320);assert.equal(row.noOverflow,true);assert.equal(row.ctaWithin,true);}
  assert.ok(narrow.find(r=>r.type==='info').height>124);
  await demo.screenshot({path:resolve(qa,'web-320.png')});
  await demo.evaluate(el=>{el.style.width='';});
  await demo.getByRole('link',{name:'Ver historial',exact:true}).click();assert.equal(new URL(page.url()).hash,'#demo-inline-details');
  await demo.getByRole('button',{name:'Cerrar aviso informativo',exact:true}).click();
  assert.equal(await notices.count(),4);assert.equal(await page.evaluate(()=>document.activeElement?.id),'demo-inline-restore');
  await demo.getByRole('button',{name:'Mostrar aviso informativo',exact:true}).press('Enter');assert.equal(await notices.count(),5);
  assert.deepEqual(errors,[]);
  const result={status:'PASS',themes,narrow,activations,defaultOff:true,secondarySmall:true,ctaRightAndBottom:true,isotipoAspectPreserved:true,maxIsotipo:32,independentDismissAndLink:true,keyboard:true,pageErrors:errors};
  await writeFile(resolve(qa,'chrome.json'),JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify({status:'PASS',themes:4,types:5,activations,narrowWidths:narrow.map(r=>r.width),pageErrors:errors.length}));
}finally{await browser?.close();await new Promise(done=>server.close(done));}
