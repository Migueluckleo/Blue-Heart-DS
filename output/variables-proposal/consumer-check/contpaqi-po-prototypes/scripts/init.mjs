import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import path from 'node:path';

const skill = realpathSync(fileURLToPath(new URL('../', import.meta.url)));
const arg = process.argv[2];
if (!arg) throw new Error('Uso: node scripts/init.mjs <carpeta-nueva>');
const target = path.resolve(arg);
if (existsSync(target)) throw new Error('La salida ya existe; elige una carpeta nueva.');
if (target === skill || target.startsWith(skill + path.sep)) throw new Error('La salida debe quedar fuera de la skill.');
const snapshot = path.join(skill, 'assets/design-system');
const readJSON = file => JSON.parse(readFileSync(file, 'utf8'));
const release = readJSON(path.join(skill, 'assets/release.json'));
const manifest = readJSON(path.join(skill, 'assets/snapshot-manifest.json'));
const ordered = Object.fromEntries(Object.entries(manifest.files).sort(([a],[b])=>a<b?-1:a>b?1:0));
const digest = createHash('sha256').update(JSON.stringify(ordered)).digest('hex');
if (manifest.schema_version !== 1 || release.ds_digest !== digest || manifest.ds_digest !== digest || release.version !== manifest.package_version) throw new Error('Release y snapshot no coinciden.');
for (const [relative, expected] of Object.entries(ordered)) {
  const file = realpathSync(path.resolve(snapshot, relative));
  if (!file.startsWith(realpathSync(snapshot) + path.sep)) throw new Error('Ruta fuera del snapshot.');
  if (createHash('sha256').update(readFileSync(file)).digest('hex') !== expected) throw new Error(`Snapshot alterado: ${relative}`);
}
const sourcePackage = readJSON(path.join(snapshot, 'implementations/web/package.json'));
const dependencies = sourcePackage.dependencies;
const development = ['tailwindcss','@tailwindcss/postcss','typescript','@types/react','@types/react-dom','@types/node','postcss','@playwright/test'];
const devDependencies = Object.fromEntries(development.map(key=>[key,sourcePackage.devDependencies[key]]));
for (const [name,version] of Object.entries({...dependencies,...devDependencies})) if (!/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(version)) throw new Error(`Dependencia sin versión exacta: ${name}`);
mkdirSync(target, {recursive:true});
cpSync(path.join(skill, 'assets/starter'), target, {recursive:true});
cpSync(snapshot, path.join(target, 'references/design-system'), {recursive:true});
cpSync(path.join(skill, 'assets/snapshot-manifest.json'), path.join(target, 'references/snapshot-manifest.json'));
cpSync(path.join(skill, 'assets/release.json'), path.join(target, 'references/release.json'));
const publicDir = path.join(snapshot, 'implementations/web/public');
if (existsSync(publicDir)) cpSync(publicDir, path.join(target, 'public'), {recursive:true});
writeFileSync(path.join(target,'package.json'), JSON.stringify({name:'contpaqi-po-prototype',version:release.version,private:true,engines:sourcePackage.engines,scripts:{build:'node scripts/prepare.mjs && next build --webpack && node scripts/inline-export.mjs out/index.html render.html',typecheck:'tsc --noEmit',capture:'node scripts/capture.mjs',handoff:'node scripts/handoff.mjs'},dependencies,devDependencies},null,2)+'\n');
console.log(`Fuente creada: ${target}\nEditar prototype/page.tsx, prototype/globals.css y brief.json. Instalar dependencias locales, build, capture, handoff. Versión ${release.version}; DS ${digest}.`);
