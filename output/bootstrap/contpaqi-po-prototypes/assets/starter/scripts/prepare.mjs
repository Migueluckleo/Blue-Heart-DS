import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import parser from 'next/dist/compiled/babel/parser.js';

const root = process.cwd();
const walk = directory => readdirSync(directory,{withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(path.join(directory,item.name)):[path.join(directory,item.name)]);
const mime={'.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.avif':'image/avif','.ico':'image/x-icon','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf'};
const map={};
for (const file of (existsSync('public') ? walk('public') : [])) {
  const type=mime[path.extname(file).toLowerCase()];
  if (!type) throw new Error(`Asset public no soportado: ${file}`);
  map['/'+path.relative('public',file).split(path.sep).join('/')]=`data:${type};base64,${readFileSync(file).toString('base64')}`;
}
writeFileSync('offline-assets.ts',`// Generated from local public assets, including assets shown only after an action.\nconst assets:Record<string,string> = ${JSON.stringify(map)};\nexport function resolveOfflineAsset(value:string|undefined):string|undefined {\n if(value===undefined || /^(?:data:|#)/i.test(value)) return value;\n const found=assets[value];\n if(!found) throw new Error('Asset offline desconocido: '+value);\n return found;\n}\n`);
for (const [source,destination] of [['references/design-system/implementations/web/src','ui'],['prototype','app']]) {
  rmSync(destination,{recursive:true,force:true});
  cpSync(source,destination,{recursive:true});
}
for (const relative of ['ui/app','ui/examples.tsx','ui/variants.tsx','ui/generated/example-map.tsx']) rmSync(relative,{recursive:true,force:true});
writeFileSync('ui/styles.css',readFileSync('ui/styles.css','utf8').replace(/@import ['"]tailwindcss['"];/,"@import 'tailwindcss' source(none);\n@source '../app';\n@source './components';"));
let transformed=0;
for (const file of [...walk('app'),...walk('ui')].filter(x=>/\.tsx?$/.test(x))) {
  let code=readFileSync(file,'utf8');
  const source=parser.parse(code,{sourceType:'module',plugins:['typescript',...(file.endsWith('.tsx')?['jsx']:[])]});
  const edits=[];
  const visit=(node,parent)=>{
    if(!node||typeof node!=='object')return;
    if(node.type==='ImportExpression'||node.type==='CallExpression'&&node.callee?.type==='Import')throw new Error(`Import diferido no soportado: ${file}`);
    if(node.type==='JSXAttribute'&&node.name.name==='srcSet')throw new Error(`srcSet no soportado: ${file}`);
    const assetAttribute=node.type==='JSXAttribute'&&(['src','poster','xlinkHref'].includes(node.name.name)||node.name.name==='href'&&parent?.type==='JSXOpeningElement'&&['image','use'].includes(parent.name?.name));
    if(assetAttribute&&node.value){
      const value=node.value;
      const expression=value.type==='StringLiteral'?JSON.stringify(value.value):value.type==='JSXExpressionContainer'?code.slice(value.expression.start,value.expression.end):null;
      if(expression)edits.push({start:value.start,end:value.end,text:`{resolveOfflineAsset(${expression})}`});
    }
    for(const value of Object.values(node))if(Array.isArray(value))value.forEach(child=>visit(child,node));else if(value&&typeof value==='object'&&typeof value.type==='string')visit(value,node);
  };
  visit(source.program);
  if(edits.length){
    let relative=path.relative(path.dirname(path.resolve(file)),path.join(root,'offline-assets')).split(path.sep).join('/');
    if(!relative.startsWith('.'))relative='./'+relative;
    // Imports follow the client directive, so Next retains client component semantics.
    const statement=`\nimport { resolveOfflineAsset } from ${JSON.stringify(relative)};\n`;
    const at=source.program.directives.at(-1)?.end??0;
    edits.push({start:at,end:at,text:statement});
    for(const edit of edits.sort((a,b)=>b.start-a.start))code=code.slice(0,edit.start)+edit.text+code.slice(edit.end);
    transformed++;
  }
  writeFileSync(file,code);
}
console.log(`Preparación offline: ${Object.keys(map).length} assets incluidos; ${transformed} módulos con src/poster resueltos. Fuente editable intacta en prototype/.`);
