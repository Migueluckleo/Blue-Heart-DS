import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import path from 'node:path';
import {test} from 'node:test';
import {pathToFileURL} from 'node:url';

const [runtimeArg, manifestPath, gensparkHtml, gensparkHandoff] = process.argv.slice(2);
const runtime = path.resolve(runtimeArg);
const root = path.join(runtime, 'scripts');
const require = createRequire(path.join(runtime, 'package.json'));
const parser = require('next/dist/compiled/babel/parser.js');
const load = file => import(pathToFileURL(path.join(root,file)).href);
const {auditComponentHtml,componentCatalog,usagePlan} = await load('component-enforcer.mjs');
const {verifyComponentSource} = await load('component-source.mjs');
const manifest = JSON.parse(readFileSync(manifestPath));
const catalog = componentCatalog(manifest);
const audit = (html, components, extra={}) => auditComponentHtml(Buffer.from(html), {components,...extra}, manifest);
const entry = (instanceId, componentId, exportName) => ({instanceId,componentId,exportName,kind:'ds'});
const jsx = content => verifyComponentSource(parser.parse(content, {sourceType:'module',plugins:['jsx','typescript']}),
  path.join(runtime,'app/page.tsx'), runtime, catalog);
const verifiedButton = entry('save','BUTTON-001','Button');
const localButton = {instanceId:'save',componentId:'LOCAL-Save',kind:'local-content'};

test('una familia exclusiva de Figma no se admite en el prototipador web', () => {
  const family = {id:'LOGOS-001',consumption_targets:['figma'],exports:[]};
  const scoped = componentCatalog({...manifest,
    components:[...manifest.components.filter(row=>row.id!==family.id),family]});
  assert.equal(scoped.families.has(family.id),false);
  assert.ok(scoped.families.get('BUTTON-001').includes('Button'));
  const brief = {components:[entry('logo',family.id,'Logos')],
    componentRequirements:[{instanceId:'logo',componentId:family.id}],
    screens:[{states:[{nodes:['logo']}]}]};
  const codes = usagePlan(brief,scoped).findings.map(finding=>finding.code);
  assert.ok(codes.includes('UNKNOWN_EXPORT'));
  assert.ok(codes.includes('UNKNOWN_REQUIREMENT'));
});

test('cada export del catálogo tiene la misma prueba de procedencia', () => {
  for (const [family, exports] of catalog.families) for (const exported of exports) {
    const imports = `import {DSNode as Mark} from './evidence'; import {${exported} as Verified} from '@contpaqi/ui';`;
    const example = body => jsx(`${imports} export default () => <Mark component="${family}" id="x" props={{}}>${body}</Mark>;`);
    assert.deepEqual(example('<Verified/>').map(edit=>edit.text), [` verifiedExport="${exported}"`]);
    assert.throws(()=>example('<div/>'), /DS_SOURCE/);
  }
  assert.throws(() => jsx(`import {DSNode} from './evidence'; import {Input} from '../ui';
    const Page = () => <DSNode component="BUTTON-001" id="x" props={{}}><Input/></DSNode>;`), /DS_SOURCE/);
  assert.throws(() => jsx(`import {DSNode} from './evidence'; import {Button} from '../ui';
    const Page = (Button: any) => <DSNode component="BUTTON-001" id="x" props={{}}><Button/></DSNode>;`), /DS_SOURCE/);
});

test('la declaración y el parecido no sustituyen al export oficial', () => {
  const html = exported => `<div data-ds-node="save" data-ds-component="BUTTON-001"${exported}>
    <button data-blueheart="button">Guardar</button></div>`;
  assert.equal(audit(html(' data-ds-export="Button"'), [verifiedButton]).status,'PASS');
  assert.ok(audit(html(''), [verifiedButton]).findings.some(finding=>finding.code==='UNVERIFIED_EXPORT'));
  const nestedNative = '<div data-blueheart="app-shell"><button data-ds-authored="true">Guardar</button></div>';
  assert.ok(audit(nestedNative, []).findings.some(finding=>finding.code==='COMPONENT_SUBSTITUTED'));
});

test('un requisito independiente detecta un sustituto local de cualquier familia', () => {
  for (const [family] of catalog.families) {
    const report = audit('<div data-ds-node="save" data-ds-component="LOCAL-Save">Control local</div>',
      [localButton], {componentRequirements:[{instanceId:'save',componentId:family}],
        screens:[{states:[{nodes:['save']}]}]});
    assert.ok(report.findings.some(finding=>finding.code==='COMPONENT_SUBSTITUTED'&&finding.detail.includes(family)));
  }
});

test('Chat requiere AppShell oficial en conversación y dentro del Slot Body', () => {
  const chat = '<div data-ds-node="chat" data-ds-component="CHAT-001" data-ds-export="Chat"><div data-blueheart="chat"></div></div>';
  const shell = (layout, content, slot = 'body', verified = true) =>
    `<div data-ds-node="shell" data-ds-component="APP-SHELL-001" ${verified ? 'data-ds-export="AppShell"' : ''}>
      <div data-blueheart="app-shell"><div class="bh-app-shell-body" data-layout="${layout}">
        <div data-slot="${slot}">${content}</div>
      </div></div>
    </div>`;
  const components = [entry('chat','CHAT-001','Chat'),entry('shell','APP-SHELL-001','AppShell')];
  const evidence = 'implementations/figma/app-shell-conversation/readback.json';
  const cut = {...manifest, files:{...manifest.files,[evidence]:'fixture'}};
  const findings = (html, snapshot = cut) => auditComponentHtml(Buffer.from(html), {components}, snapshot).findings;
  assert.deepEqual(findings(shell('conversation',chat)), []);
  for (const html of [chat,shell('grid',chat),shell('conversation',chat,'right-sidebar'),
    shell('conversation',chat,'body',false), shell('conversation','') + chat]) {
    assert.equal(findings(html).filter(finding => finding.code === 'CHAT_LAYOUT_REQUIRED').length, 1);
  }
  const older = {...cut,files:{...cut.files}};
  delete older.files[evidence];
  assert.deepEqual(findings(chat,older), []);
});

test('una excepción trazable conserva el contrato de fondo del Header', () => {
  const headerSource = manifest.components.find(row=>row.id==='HEADER-001').contract;
  const localHeader = {instanceId:'header',componentId:'LOCAL-Header',kind:'local-composition',
    compositionOf:['HEADER-ACTIONS-001'],exception:{componentIds:['HEADER-001'],
      reason:'El asset de marca del producto requiere una composición propia.',source:headerSource}};
  const html = role => `<style>.product-header{background:${role}}</style>
    <div data-ds-node="header" data-ds-component="LOCAL-Header"><header class="product-header">Vende</header></div>`;
  assert.equal(audit(html('var(--header-color-bg-default)'), [localHeader]).status,'PASS');
  assert.ok(audit(html('var(--brand-administrativo-strong)'), [localHeader]).findings
    .some(finding=>finding.code==='HEADER_BACKGROUND'));
  assert.ok(audit(html('var(--header-color-bg-default)'), [{...localHeader,exception:{...localHeader.exception,source:'missing.md'}}])
    .findings.some(finding=>finding.code==='INVALID_EXCEPTION'));
});

const input = gensparkHtml && readFileSync(gensparkHtml);
const handoff = gensparkHandoff && JSON.parse([...readFileSync(gensparkHandoff,'utf8')
  .matchAll(/^```json\s*\n([\s\S]*?)^```/gm)].at(-1)[1]);

test('HTML original de Genspark: Header, Shell y alineación del Sidebar', {skip:!input}, () => {
  const report = auditComponentHtml(input,handoff,manifest);
  assert.equal(report.status,'FAIL');
  assert.ok(report.findings.some(x=>x.code==='COMPONENT_SUBSTITUTED'&&x.id==='local-topbar'));
  assert.ok(report.findings.some(x=>x.code==='COMPONENT_SUBSTITUTED'&&x.id==='app-shell'));
  assert.ok(report.findings.some(x=>x.code==='HEADER_BACKGROUND'&&x.detail.includes('--brand-administrativo-strong')));
  assert.ok(report.observations.some(x=>x.code==='SIDEBAR_HOST_ALIGNMENT'));
});

test('HTML original de Genspark en Chrome: geometría y expansión', {skip:!input||!process.env.ENFORCER_CHROME}, async () => {
  const {chromium} = require('@playwright/test');
  const {inspectBrowserComponents} = await load('component-browser.mjs');
  const browser = await chromium.launch({channel:'chrome',args:['--disable-background-networking','--host-resolver-rules=MAP * ~NOTFOUND']});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:900},offline:true,serviceWorkers:'block'});
    await context.route(/^https?:/,route=>route.abort());
    const page = await context.newPage();
    await page.goto(pathToFileURL(gensparkHtml).href,{waitUntil:'load'});
    await page.locator('html[data-prototype-hydrated="true"]').waitFor({state:'attached'});
    const findings = await inspectBrowserComponents(page,catalog,usagePlan(handoff,catalog));
    console.log(JSON.stringify(findings.filter(x=>x.code.startsWith('HEADER_')||x.code.startsWith('SIDEBAR_'))));
    for (const code of ['HEADER_BACKGROUND','HEADER_GEOMETRY','HEADER_ANATOMY','SIDEBAR_HEIGHT','SIDEBAR_PRESENTATION']) {
      assert.ok(findings.some(finding=>finding.code===code),code);
    }
  } finally {
    await browser.close();
  }
});
