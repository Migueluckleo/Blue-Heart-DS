import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,copyFileSync,rmSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {componentCatalog,projectComponentAudit,usagePlan} from './component-enforcer.mjs';
import {inspectBrowserComponents} from './component-browser.mjs';

const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const canonical=value=>JSON.stringify(value&&typeof value==='object'?Array.isArray(value)?value.map(item=>JSON.parse(canonical(item))):Object.fromEntries(Object.keys(value).sort().map(key=>[key,JSON.parse(canonical(value[key]))])):value);
const briefBytes=readFileSync('brief.json');
const brief=JSON.parse(briefBytes);
const html=readFileSync('render.html');
const manifest=JSON.parse(readFileSync('render.manifest.json'));
const catalog=componentCatalog(JSON.parse(readFileSync('references/snapshot-manifest.json')));
const plan=usagePlan(brief,catalog);
if(hash(html)!==manifest.sha256) throw new Error('HTML alterado después del build.');
if(!brief.screens?.length||!brief.viewports?.length) throw new Error('Completar screens y viewports antes de capturar.');
const report={schema_version:1,html_sha256:hash(html),brief_sha256:hash(briefBytes),status:'NOT_RUN',network:'HTTP(S) blocked; isolated renamed file with no neighboring assets',browser:null,states:[],errors:[],generated_at:new Date().toISOString()};
mkdirSync('capture',{recursive:true});
const save=()=>writeFileSync('capture/report.json',JSON.stringify(report,null,2)+'\n');
report.component_enforcement=projectComponentAudit(html,brief);
if(report.component_enforcement.status!=='PASS'){
  report.status='FAIL';
  report.errors.push('El enforcer estático detectó sustituciones o falta de procedencia.');
  save();
  throw new Error('Conformidad BlueHeart FAIL. Ver capture/report.json.');
}
const isolated=mkdtempSync(path.join(tmpdir(),'contpaqi-file-qa-'));
const portable=path.join(isolated,'prototipo renombrado.html');
copyFileSync('render.html',portable);
let browser;
try {
  let chromium;
  try {({chromium}=await import('@playwright/test'));browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});}
  catch(error){report.errors.push(`Navegador no disponible: ${error.message}`);save();process.exitCode=2;}
  if(browser){
    report.browser=browser.version();
    for(const viewport of brief.viewports){
      if(!Number.isInteger(viewport.width)||!Number.isInteger(viewport.height)||viewport.width<=0||viewport.height<=0)throw new Error('Viewport inválido.');
      for(const screen of brief.screens){
        if(!Array.isArray(screen.states)||!screen.states.length)throw new Error(`Faltan estados: ${screen.id}`);
        for(const state of screen.states){
          if(!/^[a-zA-Z0-9_-]+$/.test(screen.id)||!/^[a-zA-Z0-9_-]+$/.test(state.id))throw new Error('IDs de pantalla/estado deben ser seguros para nombre de archivo.');
          const result={screen_id:screen.id,state_id:state.id,viewport,status:'FAIL',actions:state.actions??[],assertions:[],nodes:[],theme:null,screenshot:null,errors:[],requests:[]};
          const context=await browser.newContext({viewport,offline:true,serviceWorkers:'block'});
          const page=await context.newPage();
          page.setDefaultTimeout(10000);
          const fileURL=pathToFileURL(portable).href;
          page.on('pageerror',error=>result.errors.push(error.message));
          page.on('console',message=>{if(message.type()==='error')result.errors.push(message.text());});
          page.on('request',request=>{const url=request.url();if(/^https?:/.test(url)||url.startsWith('file:')&&url.split('#')[0]!==fileURL)result.requests.push(url);});
          await context.route(/^https?:/,route=>route.abort());
          try {
            const hashEntry=state.hash??screen.hash??'';
            if(hashEntry&&!hashEntry.startsWith('#'))throw new Error('La entrada debe ser hash local.');
            await page.goto(fileURL+hashEntry,{waitUntil:'load'});
            await page.locator('html[data-prototype-hydrated="true"]').waitFor({state:'attached',timeout:10000});
            for(const action of result.actions){
              if(typeof action.selector!=='string')throw new Error('Acción sin selector explícito.');
              const locator=page.locator(action.selector);
              if(action.type==='click')await locator.click();
              else if(action.type==='fill')await locator.fill(action.value);
              else if(action.type==='press')await locator.press(action.key);
              else if(action.type==='check')await locator.check();
              else if(action.type==='uncheck')await locator.uncheck();
              else if(action.type==='select')await locator.selectOption(action.value);
              else throw new Error(`Acción no soportada: ${action.type}`);
            }
            await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
            if(!Array.isArray(state.expect)||!state.expect.length)throw new Error('Cada estado necesita al menos una aserción observable.');
            for(const expectation of state.expect){
              if(expectation.text===undefined&&expectation.visible===undefined)throw new Error('Aserción sin text ni visible.');
              const locator=page.locator(expectation.selector);
              const count=await locator.count();
              const actual=count?await locator.first().textContent():null;
              const visible=count?await locator.first().isVisible():false;
              const passed=(expectation.visible===undefined||expectation.visible===visible)&&(expectation.text===undefined||actual?.includes(expectation.text));
              result.assertions.push({...expectation,actual,visible,passed});
              if(!passed)throw new Error(`Aserción fallida: ${expectation.selector}`);
            }
            const measured=await page.evaluate(textCoverageIds=>{
              const styleKeys=['display','position','width','height','paddingTop','paddingRight','paddingBottom','paddingLeft','gap','rowGap','columnGap','flexDirection','justifyContent','alignItems','gridTemplateColumns','overflow','overflowX','overflowY','borderRadius','borderTopWidth','borderTopColor','backgroundColor','color','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','textAlign'];
              const nodes=[...document.querySelectorAll('[data-ds-node]')].map((element,order)=>{
                const root=getComputedStyle(element).display==='contents'?(element.firstElementChild??element):element;
                const rect=root.getBoundingClientRect();
                const css=getComputedStyle(root);
                const visible=rect.width>0&&rect.height>0&&css.visibility!=='hidden'&&!root.closest('[hidden]');
                return {id:element.getAttribute('data-ds-node'),parent_id:element.parentElement?.closest('[data-ds-node]')?.getAttribute('data-ds-node')??null,order,component:element.getAttribute('data-ds-component'),declared_props:JSON.parse(element.getAttribute('data-ds-props')??'{}'),tag:root.tagName,text:visible?(root.innerText??root.textContent):'',bounding_box:{x:rect.x,y:rect.y,width:rect.width,height:rect.height},visible,computed_style:Object.fromEntries(styleKeys.map(key=>[key,css[key]])),text_runs:[],tokens:Object.fromEntries([...css].filter(key=>key.startsWith('--ds-')&&key!=='--ds-type-style-id').map(key=>[key,css.getPropertyValue(key).trim()]))};
              });
              const unmapped_text=[];
              const nodeById=new Map(nodes.map(node=>[node.id,node]));
              const typeKeys=['fontFamily','fontSize','fontWeight','fontStyle','lineHeight','letterSpacing','textDecorationLine','textTransform'];
              const recordText=(parent,text,kind,rects)=>{
                const nearest=parent.closest('[data-ds-node]')?.getAttribute('data-ds-node');
                if(!textCoverageIds.includes(nearest))unmapped_text.push({text:text.trim(),parent_tag:parent.tagName,nearest_node:nearest??null});
                const owner=nodeById.get(nearest);
                if(owner){
                  // Read the actual text parent: a component root can contain
                  // several subroles, and a descendant may override inherited metrics.
                  const css=getComputedStyle(parent);
                  owner.text_runs.push({text,kind,tag:parent.tagName,computed_style:Object.fromEntries(typeKeys.map(key=>[key,css[key]])),bounding_boxes:rects.map(rect=>({x:rect.x,y:rect.y,width:rect.width,height:rect.height}))});
                }
              };
              const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
              while(walker.nextNode()){
                const node=walker.currentNode,parent=node.parentElement;
                if(!node.textContent.trim()||!parent||parent.closest('script,style,noscript,[hidden]'))continue;
                const css=getComputedStyle(parent);
                if(css.visibility==='hidden'||css.display==='none')continue;
                const range=document.createRange();range.selectNodeContents(node);
                const rects=[...range.getClientRects()].filter(rect=>rect.width>0&&rect.height>0);
                if(!rects.length)continue;
                recordText(parent,node.textContent,'text',rects);
              }
              // Values/placeholders of form controls are not DOM text nodes.
              for(const control of document.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]),textarea,select')){
                const css=getComputedStyle(control),rect=control.getBoundingClientRect();
                if(css.visibility==='hidden'||css.display==='none'||control.closest('[hidden]')||!rect.width||!rect.height)continue;
                const text=control.tagName==='SELECT'?[...control.selectedOptions].map(option=>option.text).join(' '):control.value||control.placeholder;
                if(text?.trim())recordText(control,text,control.value?'control-value':'control-placeholder',[rect]);
              }
              const faces=[...document.fonts].map(face=>({family:face.family,status:face.status,weight:face.weight,style:face.style}));
              return {nodes,unmapped_text,theme:document.querySelector('[data-ds-theme]')?.getAttribute('data-ds-theme')??null,broken_images:[...document.images].filter(img=>!img.complete||img.naturalWidth===0).map(img=>img.alt||img.src.slice(0,120)),fonts:{status:document.fonts.status,faces},page:{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}};
            },brief.components.filter(component=>['ds','local-content'].includes(component.kind)).map(component=>component.instanceId));
            Object.assign(result,measured);
            const visibleIds=result.nodes.filter(node=>node.visible).map(node=>node.id);
            if(new Set(result.nodes.map(node=>node.id)).size!==result.nodes.length)throw new Error('data-ds-node duplicado.');
            for(const id of state.nodes??[])if(!visibleIds.includes(id))throw new Error(`Nodo esperado no visible: ${id}`);
            for(const node of result.nodes){
              const declared=brief.components.find(item=>item.instanceId===node.id);
              if(!declared)throw new Error(`Nodo sin identidad en brief: ${node.id}`);
              const expectedProps=declared.stateProps?.[screen.id+'/'+state.id]??declared.props;
              if(declared.componentId!==node.component||canonical(expectedProps)!==canonical(node.declared_props))throw new Error(`Identidad/props no coinciden: ${node.id}`);
            }
            if(result.theme!==(brief.theme?.toLowerCase() ?? null))throw new Error('Tema renderizado distinto del brief.');
            if(result.broken_images.length)throw new Error(`Imágenes incompletas: ${result.broken_images.join(', ')}`);
            if(result.unmapped_text.length)throw new Error('Texto visible sin nodo local-content o instancia DS: '+result.unmapped_text.map(item=>item.text).join(' | '));
            if(result.requests.length)throw new Error('El HTML intentó cargar red o archivos vecinos.');
            if(result.errors.length)throw new Error('Errores de consola o ejecución.');
            result.component_findings=await inspectBrowserComponents(page,catalog,plan);
            if(result.component_findings.length)throw new Error('Conformidad BlueHeart FAIL en navegador.');
            result.status='PASS';
          }catch(error){result.errors.push(error.message);}
          const filename=`${screen.id}--${state.id}--${viewport.width}x${viewport.height}.png`;
          await page.screenshot({path:path.join('capture',filename),fullPage:true});
          result.screenshot=filename;
          result.screenshot_sha256=hash(readFileSync(path.join('capture',filename)));
          report.states.push(result);
          await context.close();
        }
      }
    }
    report.status=report.states.length&&report.states.every(state=>state.status==='PASS')?'PASS':'FAIL';
    save();
    if(report.status!=='PASS')process.exitCode=1;
  }
}catch(error){report.status='FAIL';report.errors.push(error.message);save();process.exitCode=1;}
finally{if(browser)await browser.close();rmSync(isolated,{recursive:true,force:true});}
console.log(`QA file:// ${report.status}: ${report.states.length} capturas. Evidencia: capture/report.json`);
