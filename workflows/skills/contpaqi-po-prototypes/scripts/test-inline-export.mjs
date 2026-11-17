import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const exporter=fileURLToPath(new URL('../assets/starter/scripts/inline-export.mjs',import.meta.url));
const root=mkdtempSync(path.join(tmpdir(),'contpaqi-export-test-'));
const cases=[
 ['embedded-data','background-image:url(data:image/png;base64,aW1hZ2U=)',true],
 ['embedded-quoted','background-image:url(&quot;data:image/png;base64,aW1hZ2U=&quot;)',true],
 ['local-fragment','filter:url(#shadow)',true],
 ['remote','background-image:url(https://example.invalid/image.png)',false],
 ['unresolved-local','background-image:url(/assets/image.png)',false],
 ['mixed','filter:url(#shadow);background-image:url(https://example.invalid/image.png)',false]
];
try{
 for(const [name,style,allowed] of cases){
  const directory=path.join(root,name);mkdirSync(directory);
  const input=path.join(directory,'index.html'),output=path.join(directory,'render.html');
  const html=`<!doctype html><html><body><div style="${style}">Evidence</div></body></html>`;
  writeFileSync(input,html);
  const result=spawnSync(process.execPath,[exporter,input,output],{encoding:'utf8'});
  assert.equal(result.status===0,allowed,`${name}: ${result.stderr}`);
  if(allowed)assert.equal(readFileSync(output,'utf8'),html,'Embedded value must be preserved');
  console.log(`PASS ${name}: ${allowed?'preserved':'rejected'}`);
 }
}finally{rmSync(root,{recursive:true,force:true});}
