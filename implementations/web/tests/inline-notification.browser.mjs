import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root=resolve('out'),qa=resolve('../../output/qa/inline-notification-centered-cta-2026-11-26');
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
  const ctas=()=>notices.locator(':scope > [data-blueheart=button]');
  const dimensions=()=>notices.evaluateAll(nodes=>nodes.map(n=>({
    type:n.dataset.type,height:n.getBoundingClientRect().height,
    contentWidth:n.querySelector('.bh-inline-content').getBoundingClientRect().width,
  })));
  assert.equal(await notices.count(),5);assert.equal(await control.isChecked(),false);assert.equal(await ctas().count(),0);
  let activations=0;
  for(const theme of ['Contable','Administrativo','Servicios','Personas']){
    await page.getByRole('combobox',{name:'Tema',exact:true}).selectOption(theme);
    const off=await dimensions();
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
        const [content,button,dismiss]=el.children;
        const t=content.getBoundingClientRect(),b=button.getBoundingClientRect();
        const d=dismiss?.getBoundingClientRect(),style=getComputedStyle(button);
        const center=r=>r.top+r.height/2;
        return {
          height:el.getBoundingClientRect().height,contentWidth:t.width,buttonWidth:b.width,buttonHeight:b.height,
          rowGap:getComputedStyle(el).gap,textGap:getComputedStyle(content.querySelector('.bh-inline-text')).gap,
          centerDelta:center(b)-center(t),contentGap:b.left-t.right,
          dismissGap:d?d.left-b.right:null,dismissCenterDelta:d?center(d)-center(b):null,
          order:[...el.children].map(n=>n.dataset.blueheart??'content'),
          font:style.fontFamily,style:button.getAttribute('style'),
        };
      });
      assert.equal(metrics.buttonHeight,32);assert.equal(metrics.rowGap,'16px');assert.equal(metrics.textGap,'4px');
      assert.ok(Math.abs(metrics.centerDelta)<.1);
      assert.equal(metrics.contentGap,16);
      assert.deepEqual(metrics.order,type==='info'?['content','button','icon-button']:['content','button']);
      if(type==='info'){
        assert.equal(metrics.dismissGap,16);
        assert.ok(Math.abs(metrics.dismissCenterDelta)<.1);
      }
      assert.match(metrics.font,/Manrope/);
      assert.match(metrics.style,/var\(--[a-z-]*button/);
      const baseline=off.find(n=>n.type===type);
      assert.ok(metrics.height>=baseline.height);
      assert.ok(Math.abs(baseline.contentWidth-metrics.contentWidth-metrics.buttonWidth-16)<.1);
      await cta.click();activations++;
      assert.equal(await demo.locator('#demo-inline-cta-result').textContent(),`Activaciones locales de CTA: ${activations}`);
      assert.equal(await notices.count(),5);
      records.push({type,...metrics});
    }
    const keyboard=demo.locator('[data-type=info]').getByRole('button',{name:'Ver detalles',exact:true});
    await demo.getByRole('link',{name:'Ver historial',exact:true}).focus();
    await page.keyboard.press('Tab');
    assert.equal(await keyboard.evaluate(el=>el===document.activeElement),true);
    await page.keyboard.press('Tab');
    assert.equal(await demo.getByRole('button',{name:'Cerrar aviso informativo',exact:true}).evaluate(el=>el===document.activeElement),true);
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');activations++;
    await page.keyboard.press('Space');activations++;
    assert.equal(await demo.locator('#demo-inline-cta-result').textContent(),`Activaciones locales de CTA: ${activations}`);
    assert.equal(await notices.count(),5);
    await control.focus();await page.keyboard.press('Space');
    await page.waitForFunction(()=>document.querySelector('#demo-inline-notification [data-blueheart="inline-notification"]')?.dataset.showCta==='false');
    assert.equal(await ctas().count(),0);assert.deepEqual(await dimensions(),off);
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
    const r=el.getBoundingClientRect(),[content,button,dismiss]=el.children;
    const c=content.getBoundingClientRect(),b=button.getBoundingClientRect(),d=dismiss?.getBoundingClientRect();
    return {type:el.dataset.type,width:r.width,height:r.height,noOverflow:el.scrollWidth<=el.clientWidth,
      ctaWithin:b.left>=r.left&&b.right<=r.right,centerDelta:b.top+b.height/2-c.top-c.height/2,
      dismissDelta:d?d.top+d.height/2-b.top-b.height/2:null};
  }));
  for(const row of narrow){
    assert.equal(row.width,320);assert.equal(row.noOverflow,true);assert.equal(row.ctaWithin,true);
    assert.ok(Math.abs(row.centerDelta)<.1);
    if(row.dismissDelta!==null)assert.ok(Math.abs(row.dismissDelta)<.1);
  }
  assert.ok(narrow.find(r=>r.type==='info').height>124);
  await demo.screenshot({path:resolve(qa,'web-320.png')});
  await demo.evaluate(el=>{el.style.width='';});
  await demo.getByRole('link',{name:'Ver historial',exact:true}).click();assert.equal(new URL(page.url()).hash,'#demo-inline-details');
  await demo.getByRole('button',{name:'Cerrar aviso informativo',exact:true}).click();
  assert.equal(await notices.count(),4);assert.equal(await page.evaluate(()=>document.activeElement?.id),'demo-inline-restore');
  await demo.getByRole('button',{name:'Mostrar aviso informativo',exact:true}).press('Enter');assert.equal(await notices.count(),5);
  assert.deepEqual(errors,[]);
  const result={status:'PASS',themes,narrow,activations,defaultOff:true,secondarySmall:true,ctaBetweenContentAndDismiss:true,isotipoAspectPreserved:true,maxIsotipo:32,independentDismissAndLink:true,keyboard:true,pageErrors:errors};
  await writeFile(resolve(qa,'chrome.json'),JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify({status:'PASS',themes:4,types:5,activations,narrowWidths:narrow.map(r=>r.width),pageErrors:errors.length}));
}finally{await browser?.close();await new Promise(done=>server.close(done));}
