import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdtempSync,copyFileSync,rmSync} from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createRequire} from 'node:module';
import {pathToFileURL,fileURLToPath} from 'node:url';
const folder=path.dirname(fileURLToPath(import.meta.url));
const project=path.join(folder,'prototype');process.chdir(project);
const require=createRequire(path.join(project,'package.json'));
const {chromium}=require('@playwright/test');
const {componentCatalog,usagePlan}=await import(pathToFileURL(path.join(project,'scripts/component-enforcer.mjs')));
const {verifyComponentPlan}=await import(pathToFileURL(path.join(project,'scripts/component-plan.mjs')));
const {inspectBrowserComponents}=await import(pathToFileURL(path.join(project,'scripts/component-browser.mjs')));
const brief=JSON.parse(readFileSync('brief.json'));const manifest=JSON.parse(readFileSync('references/snapshot-manifest.json'));
const catalog=componentCatalog(manifest);const plan=usagePlan(brief,catalog,verifyComponentPlan(brief));
const html=path.join(project,'entrega/revision-de-cierre-qa.html');
const isolated=mkdtempSync(path.join(tmpdir(),'blueheart-renamed-'));
const renamed=path.join(isolated,'prototipo movido y renombrado.html');copyFileSync(html,renamed);
const report={status:'RUNNING',scope:'Published GitHub workflow; actual portable HTML, controlled theme attributes, keyboard, AppShell, Body and negative mutations',cases:[],negative_cases:[],http_requests:[]};
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const theme of ['contable','administrativo','servicios','personas'])for(const width of [1440,1280]){
  const context=await browser.newContext({viewport:{width,height:900},offline:true,serviceWorkers:'block'});
  await context.route(/^https?:/,route=>route.abort());const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))report.http_requests.push(r.url());});
  await page.goto(pathToFileURL(renamed).href,{waitUntil:'load'});await page.locator('html[data-prototype-hydrated="true"]').waitFor({state:'attached'});
  await page.evaluate(async theme=>{document.querySelector('[data-ds-theme]').setAttribute('data-ds-theme',theme);await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));},theme);
  assert.deepEqual(await inspectBrowserComponents(page,catalog,plan),[]);
  const measure=()=>page.evaluate(()=>{
   const style=id=>getComputedStyle(document.querySelector(`[data-ds-node="${id}"]`).firstElementChild);
   return {mainWidth:document.querySelector('.bh-app-shell-main').getBoundingClientRect().width,title:{size:style('title').fontSize,weight:style('title').fontWeight,line:style('title').lineHeight},button:{size:style('advance').fontSize,weight:style('advance').fontWeight,line:style('advance').lineHeight,sourceStyle:document.querySelector('#advance').getAttribute('style')},card:{padding:style('card').paddingTop,gap:style('card').gap,radius:style('card').borderRadius},groups:{heading:style('heading').gap,status:style('status').gap},brand:getComputedStyle(document.querySelector('[data-ds-node="count"]').firstElementChild).color,images:[...document.images].every(img=>img.complete&&img.naturalWidth>0),fonts:document.fonts.status};
  });
  const collapsed=await measure();assert.equal(collapsed.mainWidth,width-168);assert.deepEqual(collapsed.card,{padding:'24px',gap:'16px',radius:'16px'});assert.deepEqual(collapsed.groups,{heading:'4px',status:'8px'});assert.deepEqual(collapsed.title,{size:'20px',weight:'600',line:'28px'});assert.equal(collapsed.button.weight,'700');assert.equal(collapsed.button.size,'14px');assert.ok(!collapsed.button.sourceStyle.includes('--body-'));assert.equal(collapsed.images,true);
  await page.locator('#advance').focus();await page.locator('#advance').press('Enter');assert.equal(await page.getByRole('progressbar').getAttribute('aria-valuenow'),'50');
  await page.locator('#reset').focus();await page.locator('#reset').press('Space');assert.equal(await page.getByRole('progressbar').getAttribute('aria-valuenow'),'25');
  const toggle=page.locator('[data-blueheart="sidebar"] .bh-sidebar-control button');await toggle.focus();await toggle.press('Enter');
  const expanded=await measure();assert.equal(expanded.mainWidth,width-330);assert.equal(await page.locator('[data-blueheart="sidebar"]').getAttribute('data-collapsed'),'false');
  for(let i=0;i<3;i++)await page.locator('#advance').click();assert.equal(await page.getByRole('progressbar').getAttribute('aria-valuenow'),'100');assert.equal(await page.locator('#advance').isDisabled(),true);await page.locator('#reset').click();assert.equal(await page.getByRole('progressbar').getAttribute('aria-valuenow'),'25');
  if(theme==='contable'&&width===1440){
   await page.evaluate(()=>{const n=document.querySelector('[data-ds-node="card"]').firstElementChild;window.__padding=n.style.padding;n.style.padding='24px';});
   const literals=await inspectBrowserComponents(page,catalog,plan);assert.ok(literals.some(f=>f.code==='BODY_CONSUMPTION'));
   report.negative_cases.push({case:'Body padding replaced by same literal value',result:'REJECTED',findings:literals});
   await page.evaluate(()=>{document.querySelector('[data-ds-node="card"]').firstElementChild.style.padding=window.__padding;});
   await page.evaluate(()=>{const n=document.querySelector('[data-ds-node="card"]');window.__cardParent=n.parentElement;window.__cardNext=n.nextSibling;document.querySelector('[data-ds-theme]').append(n);});
   const outside=await inspectBrowserComponents(page,catalog,plan);assert.ok(outside.some(f=>f.code==='BODY_CONSUMPTION'));
   report.negative_cases.push({case:'Molecule outside AppShell Body',result:'REJECTED',findings:outside});
   await page.evaluate(()=>{window.__cardParent.insertBefore(document.querySelector('[data-ds-node="card"]'),window.__cardNext);});
   await page.evaluate(()=>{const original=document.querySelector('[data-ds-node="progress"]');window.__progress=original;const fake=document.createElement('progress');fake.setAttribute('data-ds-authored','true');fake.setAttribute('id','fake-progress');fake.value=25;fake.max=100;original.replaceWith(fake);});
   const fake=await inspectBrowserComponents(page,catalog,plan);assert.ok(fake.some(f=>f.code==='COMPONENT_SUBSTITUTED'));
   report.negative_cases.push({case:'Official Linear Progress replaced with authored native progress',result:'REJECTED',findings:fake});
   await page.evaluate(()=>document.querySelector('#fake-progress').replaceWith(window.__progress));
   assert.deepEqual(await inspectBrowserComponents(page,catalog,plan),[]);
  }
  assert.deepEqual(errors,[]);assert.equal(report.http_requests.length,0);
  const screenshot=`theme-${theme}-${width}.png`;await page.screenshot({path:path.join(folder,screenshot),fullPage:true});
  report.cases.push({theme,width,status:'PASS',collapsed,expanded,keyboard:'PASS',progress_limit_and_reset:'PASS',screenshot,errors});
  await context.close();
 }
 report.status='PASS';
}catch(error){report.status='FAIL';report.error=error.stack;throw error;}
finally{writeFileSync(path.join(folder,'browser-extra-report.json'),JSON.stringify(report,null,2)+'\n');await browser.close();rmSync(isolated,{recursive:true,force:true});}
console.log(JSON.stringify({status:report.status,cases:report.cases.length,negative_cases:report.negative_cases.length,http_requests:report.http_requests.length}));
