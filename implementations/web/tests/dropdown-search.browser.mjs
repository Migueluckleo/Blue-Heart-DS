import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('out'), output = resolve('../../output/qa/dropdown-search-2026-11-18');
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
  const page = await browser.newPage({viewport:{width:1536,height:1200}}), errors = [];
  page.on('pageerror',error => errors.push(error.message));
  await page.route('**/*',route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
  await page.goto(origin+'/');
  await page.evaluate(() => document.fonts.ready);
  const standard=page.getByRole('combobox',{name:'Moneda del comprobante',exact:true});
  await standard.focus(); await page.keyboard.press('ArrowDown');
  assert.equal(await page.getByRole('listbox',{name:'Moneda del comprobante',exact:true}).locator('[data-blueheart="search"]').count(),0);
  await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter');
  assert.equal(await standard.textContent(),'USD');
  assert.equal(await standard.getAttribute('aria-expanded'),'false');
  assert.equal(await standard.evaluate(el=>el===document.activeElement),true);
  const trigger=page.getByRole('button',{name:'Moneda con búsqueda',exact:true});
  await trigger.click();
  const search=page.getByRole('combobox',{name:'Buscar moneda',exact:true});
  const list=page.getByRole('listbox',{name:'Moneda con búsqueda',exact:true});
  const popup=trigger.locator('xpath=ancestor::*[contains(@class,"bh-dropdown-field")]').locator('.bh-dropdown-menu');
  await search.waitFor({state:'visible'});
  assert.equal(await search.evaluate(el=>el===document.activeElement),true);
  assert.equal(await list.locator('input').count(),0);
  assert.equal(await popup.locator('form').count(),0);
  assert.equal(await search.getAttribute('aria-controls'),await list.getAttribute('id'));
  const defaultGeometry=await popup.evaluate(el=>{
    const s=el.querySelector('.bh-dropdown-search').getBoundingClientRect(),l=el.querySelector('[role="listbox"]').getBoundingClientRect();
    const style=getComputedStyle(el);
    return {width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height,
      searchHeight:s.height,gap:l.top-s.bottom,contentMax:style.getPropertyValue('--dropdown-menu-size-content-max').trim()};
  });
  assert.equal(defaultGeometry.width,320); assert.equal(defaultGeometry.height,320);
  assert.equal(defaultGeometry.searchHeight,32); assert.equal(defaultGeometry.gap,16);
  const yBefore=(await search.boundingBox()).y;
  await list.evaluate(el=>{el.scrollTop=el.scrollHeight;});
  assert.equal((await search.boundingBox()).y,yBefore);
  assert.ok(await list.evaluate(el=>el.scrollTop>0));
  await search.fill('dolar');
  assert.equal(await list.getByRole('option').count(),2);
  assert.equal(await list.getByRole('option',{name:'USD',exact:true}).count(),1);
  assert.equal(await list.getByRole('option',{name:'CAD',exact:true}).count(),1);
  await page.keyboard.press('Enter');
  assert.equal(await trigger.textContent(),'USD');
  assert.equal(await trigger.evaluate(el=>el===document.activeElement),true);
  await trigger.click(); assert.equal(await search.inputValue(),'');
  await search.fill('euRO');
  assert.equal(await list.getByRole('option').count(),1);
  const disabled=list.getByRole('option',{name:'EUR',exact:true});
  assert.equal(await disabled.getAttribute('aria-disabled'),'true');
  assert.equal(await search.getAttribute('aria-activedescendant'),null);
  await disabled.click({force:true}); await page.keyboard.press('Enter');
  assert.equal(await trigger.getAttribute('aria-expanded'),'true'); assert.equal(await trigger.textContent(),'USD');
  await search.fill('No existe');
  assert.equal(await list.getByRole('option').count(),0);
  assert.equal(await list.getByRole('group').count(),0);
  assert.equal(await popup.getByRole('status').innerText(),'Sin resultados');
  await page.keyboard.press('Enter');
  assert.equal(await trigger.getAttribute('aria-expanded'),'true');
  await popup.getByRole('button',{name:'Limpiar búsqueda'}).click();
  assert.equal(await search.inputValue(),''); assert.equal(await search.evaluate(el=>el===document.activeElement),true);
  await search.fill('Peso'); await page.keyboard.press('Space');
  assert.equal(await search.inputValue(),'Peso ');
  const active=await search.getAttribute('aria-activedescendant');
  await page.keyboard.press('Home');
  assert.equal(await search.getAttribute('aria-activedescendant'),active);
  await page.keyboard.press('End');
  assert.equal(await search.evaluate(el=>el.selectionStart),5);
  await page.keyboard.press('ArrowLeft');
  assert.equal(await search.evaluate(el=>el.selectionStart),4);
  assert.equal(await search.getAttribute('aria-activedescendant'),active);
  await search.evaluate(el=>el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',keyCode:229,bubbles:true,isComposing:true})));
  assert.equal(await trigger.getAttribute('aria-expanded'),'true');
  await search.fill('Peso'); await page.keyboard.press('ArrowDown');
  const activeAfter=await search.getAttribute('aria-activedescendant'); assert.notEqual(active,activeAfter);
  await page.keyboard.press('Escape');
  assert.equal(await trigger.getAttribute('aria-expanded'),'false');
  assert.equal(await trigger.evaluate(el=>el===document.activeElement),true);
  await trigger.click(); await search.fill('CAD'); await page.keyboard.press('Enter');
  assert.equal(await trigger.textContent(),'CAD'); assert.equal(await standard.textContent(),'CAD');
  await trigger.click(); await search.focus(); await page.keyboard.press('Tab');
  assert.equal(await trigger.getAttribute('aria-expanded'),'false');
  await trigger.click(); await search.fill('USD');
  await page.getByRole('heading',{name:'Dropdown menu',exact:true}).click();
  assert.equal(await trigger.getAttribute('aria-expanded'),'false');
  const themes=[];
  for(const theme of ['Contable','Administrativo','Servicios','Personas']) {
    await page.getByRole('combobox',{name:'Tema',exact:true}).selectOption(theme);
    await trigger.click();
    const tokens=await popup.evaluate(el=>{
      const s=getComputedStyle(el),search=getComputedStyle(el.querySelector('.bh-dropdown-search'));
      return {gap:search.marginBlockEnd,searchHeight:search.minBlockSize,bg:s.backgroundColor,border:s.borderColor,
        ownGap:s.getPropertyValue('--dropdown-menu-spacing-search-gap').trim()};
    });
    assert.equal(tokens.gap,'16px');assert.equal(tokens.searchHeight,'32px');
    themes.push({theme,...tokens});
    await page.keyboard.press('Escape');
  }
  await trigger.click(); await search.fill('dolar');
  await popup.screenshot({path:resolve(output,'web-search.png')});
  await page.keyboard.press('Escape');
  assert.deepEqual(errors,[]);
  const result={status:'PASS',standardRegression:true,filterAccentsAndDescription:true,disabled:true,
    noResults:true,groups:true,clearFocus:true,keyboard:true,ime:true,closeFocus:true,tab:true,
    outsideClick:true,independentScroll:true,noNestedForms:true,aria:true,defaultGeometry,themes,errors};
  await writeFile(resolve(output,'browser.json'),JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result));
} finally {await browser?.close();server.close();}
