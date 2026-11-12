import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root = resolve('out');
const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.woff2':'font/woff2'};
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + sep)) {response.writeHead(403).end();return;}
  try {
    response.writeHead(200, {'Content-Type': types[extname(file)] ?? 'application/octet-stream'});
    response.end(await readFile(file));
  } catch {
    response.writeHead(404).end();
  }
});

let browser;
try {
  await new Promise((done,fail)=>server.listen(0,'127.0.0.1',done).once('error',fail));
  const origin=`http://127.0.0.1:${server.address().port}`;
  browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
  const page=await browser.newPage({viewport:{width:1400,height:950}});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  await page.goto(origin);
  const stepper=page.getByRole('list',{name:'Progreso del registro de empresa'});
  const items=stepper.getByRole('listitem');
  const current=stepper.locator('[aria-current="step"]');
  const next=page.getByRole('button',{name:'Continuar registro'});
  const previous=page.getByRole('button',{name:'Volver al paso anterior'});
  const themeSelect=page.getByRole('combobox',{name:'Tema'});
  const orientation=page.getByRole('combobox',{name:'Orientación del progreso'});
  assert.equal(await items.count(),4);
  assert.equal(await stepper.locator('button, a, [tabindex]').count(),0);
  assert.equal(await current.count(),1);
  assert.match(await current.textContent(),/Datos fiscales/);
  assert.match(await items.first().textContent(),/Completado/);
  assert.match(await items.last().textContent(),/Pendiente/);
  const themes={
    Contable:['rgb(50, 85, 247)','rgb(191, 206, 254)'],
    Administrativo:['rgb(3, 114, 85)','rgb(147, 211, 191)'],
    Servicios:['rgb(220, 47, 0)','rgb(255, 216, 200)'],
    Personas:['rgb(131, 0, 248)','rgb(224, 202, 252)'],
  };
  const neutral='rgb(226, 232, 240)';
  const color=(node,prop)=>node.evaluate((el,key)=>getComputedStyle(el)[key],prop);
  const resolved={};
  for (const direction of ['horizontal','vertical']) {
    await orientation.selectOption(direction);
    assert.equal(await stepper.getAttribute('data-orientation'),direction);
    for (const [theme,[brand,accent]] of Object.entries(themes)) {
      await themeSelect.selectOption(theme);
      const marks=stepper.locator('.bh-stepper-mark');
      const bg=await Promise.all((await marks.all()).map(el=>color(el,'backgroundColor')));
      assert.deepEqual(bg,[accent,brand,neutral,neutral]);
      assert.deepEqual(await Promise.all((await marks.all()).map(el=>color(el,'color'))),
        [brand,'rgb(255, 255, 255)','rgb(100, 116, 139)','rgb(100, 116, 139)']);
      assert.equal(await color(current.locator('.bh-stepper-line-before'),'backgroundColor'),accent);
      assert.equal(await color(current.locator('.bh-stepper-line-after'),'backgroundColor'),neutral);
      assert.equal(await color(current.locator('.bh-stepper-caption'),'color'),'rgb(148, 163, 184)');
      const mark=await marks.first().boundingBox();
      const line=await current.locator('.bh-stepper-line-before').boundingBox();
      assert.deepEqual([mark.width,mark.height],[32,32]);
      assert.deepEqual([line.width,line.height],direction==='horizontal'?[80,4]:[4,32]);
      resolved[`${direction}/${theme}`]=bg;
    }
  }
  await next.focus();
  await page.keyboard.press('Enter');
  assert.match(await current.textContent(),/Accesos/);
  assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Accesos');
  await next.focus();
  await page.keyboard.press('Space');
  assert.match(await current.textContent(),/Revisión/);
  assert.equal(await current.getAttribute('data-position'),'end');
  assert.equal(await next.isDisabled(),true);
  await previous.focus();
  await page.keyboard.press('Enter');
  assert.match(await current.textContent(),/Accesos/);
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({status:'PASS',themes:resolved,keyboard:true,focus:true,ariaCurrent:true}));
} finally {
  await browser?.close();
  server.close();
}
