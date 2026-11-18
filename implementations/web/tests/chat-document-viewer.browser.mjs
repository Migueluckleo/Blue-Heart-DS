import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('out'), output = resolve('../../output/qa/chat-document-viewer-2026-11-18');
const mime = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml'};
const server = createServer(async (request,response) => {
  const path = new URL(request.url,'http://localhost').pathname;
  const file = resolve(root,'.'+(path === '/' ? '/index.html' : path));
  if (!file.startsWith(root+sep)) {response.writeHead(403).end();return;}
  try {response.writeHead(200,{'Content-Type':mime[extname(file)]??'application/octet-stream'});response.end(await readFile(file));}
  catch {response.writeHead(404).end();}
});
let browser;
try {
  await mkdir(output,{recursive:true});
  await new Promise((done,fail) => server.listen(0,'127.0.0.1',done).once('error',fail));
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({channel:'chrome',headless:true});
  const page = await browser.newPage({viewport:{width:1536,height:1240}}), errors = [];
  page.on('pageerror',error => errors.push(error.message));
  await page.route('**/*',route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
  await page.goto(origin+'/playground/conversation-document.html');
  await page.evaluate(() => document.fonts.ready);
  const shell = page.locator('[data-blueheart="app-shell"]');
  const viewer = shell.locator('[data-blueheart="chat-document-viewer"]');
  const panel = viewer.getByRole('tabpanel');
  const chat = shell.locator('[data-blueheart="chat"]');
  const header=shell.locator('[data-blueheart="header"]');
  assert.equal(await header.locator('.bh-header-version').count(),1);
  assert.equal(await header.locator('[data-blueheart="header-actions"] button').count(),5);
  assert.equal(await header.locator('[data-blueheart="company-selector"]').count(),1);
  assert.equal(await header.locator('[data-blueheart="user-selector"]').count(),1);
  const metrics = await shell.evaluate(el => {
    const rect = selector => {const r=el.querySelector(selector).getBoundingClientRect();return {width:r.width,height:r.height,x:r.x,y:r.y};};
    const title = getComputedStyle(el.querySelector('.bh-document-viewer-title'));
    const description = getComputedStyle(el.querySelector('.bh-document-viewer-description'));
    return {shell:el.getBoundingClientRect().width,chat:rect('.bh-app-shell-conversation'),document:rect('.bh-app-shell-document'),
      rail:rect('.bh-app-shell-right'),body:rect('.bh-app-shell-body'),gap:getComputedStyle(el.querySelector('.bh-app-shell-body')).gap,
      title:[title.fontFamily,title.fontSize,title.fontWeight,title.letterSpacing],description:[description.fontSize,description.fontWeight]};
  });
  assert.equal(metrics.shell,1440);assert.equal(metrics.chat.width,374);assert.equal(metrics.document.width,755);assert.equal(metrics.rail.width,79);
  assert.equal(metrics.gap,'32px');assert.match(metrics.title[0],/Manrope Variable/);
  assert.deepEqual(metrics.title.slice(1),['20px','700','0.02px']);assert.deepEqual(metrics.description,['14px','400']);
  assert.equal(await panel.locator('[data-blueheart="table"][data-sticky-actions="true"]').count(),1);
  assert.equal(await panel.locator('tbody [data-blueheart="icon-button"][data-variant="ghost"]').count(),8);
  const themes = [];
  for (const mode of ['contable','administrativo','servicios','personas']) {
    await page.evaluate(mode => document.documentElement.dataset.dsTheme=mode,mode);
    themes.push(await viewer.evaluate((el,mode) => ({mode,color:getComputedStyle(el.querySelector('.bh-document-viewer-title')).color,
      background:getComputedStyle(el).backgroundColor,font:getComputedStyle(el.querySelector('.bh-document-viewer-title')).fontFamily}),mode));
  }
  await page.evaluate(() => document.documentElement.dataset.dsTheme='contable');
  await shell.screenshot({path:resolve(output,'web-conversation-document.png')});
  const editor = chat.getByRole('textbox',{name:'Redactar en conversación de App Shell'});
  await editor.fill('Borrador que debe conservarse');
  await viewer.getByRole('button',{name:'Expandir',exact:true}).focus();await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('.bh-app-shell-conversation').hidden);
  assert.equal(await chat.isVisible(),false);
  assert.equal(await viewer.getByRole('button',{name:'Restaurar',pressed:true}).count(),1);
  assert.ok((await viewer.boundingBox()).width > metrics.document.width);
  await viewer.getByRole('button',{name:'Restaurar',exact:true}).click();
  assert.equal(await editor.inputValue(),'Borrador que debe conservarse');
  await viewer.getByRole('button',{name:'Descargar xls',exact:true}).click();
  assert.match(await page.getByRole('status').last().innerText(),/solicitud de descarga/);
  await viewer.getByRole('button',{name:'Cerrar',exact:true}).focus();await page.keyboard.press('Enter');
  assert.equal(await shell.locator('[data-blueheart="chat-document-viewer"]').count(),0);
  assert.equal(await editor.inputValue(),'Borrador que debe conservarse');
  const reopen = page.getByRole('button',{name:'Abrir documento entregado',exact:true});
  assert.equal(await reopen.evaluate(el => el === document.activeElement),true);
  await page.keyboard.press('Enter');assert.equal(await viewer.count(),1);
  const menu = shell.getByRole('button',{name:/Expandir menú|Expandir navegación/});
  if (await menu.count()) await menu.first().click();
  else await shell.locator('[data-blueheart="sidebar"] button').first().click();
  assert.equal((await shell.locator('.bh-app-shell-document').boundingBox()).width,593);
  await shell.locator('[data-blueheart="chat-sidebar"][data-mode="rail"]').getByRole('button',{name:'Chats',exact:true}).click();
  assert.equal((await shell.locator('.bh-app-shell-document').boundingBox()).width,329);
  await shell.getByRole('button',{name:'Cerrar panel',exact:true}).click();
  assert.equal((await shell.locator('.bh-app-shell-document').boundingBox()).width,593);
  const search = viewer.getByRole('searchbox',{name:'Buscar facturas del documento'});
  await search.fill('no existe en la muestra');assert.equal(await panel.locator('tbody tr').count(),0);
  await search.clear();assert.equal(await panel.locator('tbody tr').count(),8);
  await viewer.getByRole('tab',{name:'CFDIs Recibidos'}).focus();await page.keyboard.press('Enter');
  assert.equal(await viewer.getByRole('tab',{name:'CFDIs Recibidos',selected:true}).count(),1);
  // El ancho reducido pertenece al visor; el Shell de esta referencia es de escritorio.
  await shell.locator('.bh-app-shell-document').evaluate(el => {el.style.flex='none';el.style.width='320px';});
  const narrow = await viewer.evaluate(el => {
    const title=el.querySelector('.bh-document-viewer-title').getBoundingClientRect(), root=el.getBoundingClientRect();
    const label=el.querySelector('.bh-delivered-document-visualization > h3').getBoundingClientRect();
    const tabs=el.querySelector('[role="tablist"]').getBoundingClientRect();
    return {width:root.width,titleWidth:title.width,toolbarScroll:el.querySelector('.bh-document-viewer-actions').scrollWidth,
      noOverlap:tabs.y >= label.bottom || tabs.x >= label.right};
  });
  assert.equal(narrow.width,320);assert.equal(narrow.titleWidth,320);assert.ok(narrow.toolbarScroll<=320);assert.equal(narrow.noOverlap,true);
  await page.goto(origin);await page.evaluate(() => document.fonts.ready);
  const sample=page.locator('section').filter({has:page.getByRole('heading',{name:'Chat Document Viewer',exact:true})});
  const sampleViewer=sample.locator('[data-blueheart="chat-document-viewer"]');
  const content=sample.getByRole('combobox',{name:'Contenido del preview'});
  const slotCounts=[];
  for(const [mode,count]of [['empty',0],['single',1],['multiple',3]]) {
    await content.selectOption(mode);
    const actual=await sampleViewer.locator('[data-slot="preview"]').evaluate(el=>el.children.length);
    assert.equal(actual,count);slotCounts.push(actual);
    assert.equal(await sampleViewer.getByRole('button',{name:'Descargar xls',exact:true}).count(),1);
  }
  await sample.getByRole('checkbox',{name:'Mostrar descripción del documento'}).uncheck();
  assert.equal(await sampleViewer.locator('.bh-document-viewer-description').count(),0);
  assert.deepEqual(errors,[]);
  const result={status:'PASS',metrics,themes,narrow,headerBlocks:['Version','Actions','Company','User interaction'],
    keyboard:true,callbacks:true,focusRestored:true,draftPreserved:true,
    expandedMenuPreviewWidth:593,expandedToolsPreviewWidth:329,webSlotCounts:slotCounts,optionalDescription:true,
    search:true,tabs:true,stickyGhostActions:8,network:'LOCAL_ONLY',errors};
  await writeFile(resolve(output,'browser.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
} finally {await browser?.close();server.close();}
