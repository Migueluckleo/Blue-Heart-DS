import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { verifyMenuItemSpacing } from './menu-item-spacing.browser.mjs';

const root=resolve('out'),out=resolve('../../output/qa/menu-item-padding-2026-11-25');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{
  const p=resolve(root,'.'+(new URL(req.url,'http://localhost').pathname==='/'?'/index.html':new URL(req.url,'http://localhost').pathname));
  if(!p.startsWith(root+sep))return res.writeHead(403).end();
  try{res.writeHead(200,{'Content-Type':types[extname(p)]||'application/octet-stream'}).end(await readFile(p));}
  catch{res.writeHead(404).end();}
});
let browser;
try{
  await mkdir(out,{recursive:true});await new Promise((done,fail)=>server.listen(0,'127.0.0.1',done).once('error',fail));
  const origin=`http://127.0.0.1:${server.address().port}`;
  browser=await chromium.launch({headless:true,channel:'chrome'});
  const page=await browser.newPage({viewport:{width:1400,height:950}});
  await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  await page.goto(origin);await page.getByRole('navigation',{name:'Menú de muestra'}).waitFor();await page.evaluate(()=>document.fonts.ready);
  const result=await verifyMenuItemSpacing(page);
  await page.getByRole('navigation',{name:'Menú de muestra'}).getByRole('button',{name:/Documentos/}).screenshot({path:out+'/expanded-item.png'});
  await writeFile(out+'/browser.json',JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify({status:result.status,cases:result.cases.length}));
}finally{await browser?.close();server.close();}
