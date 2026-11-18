import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import path from 'node:path';

const skill = realpathSync(fileURLToPath(new URL('../', import.meta.url)));
const arg = process.argv[2];
if (!arg) throw new Error('Uso: node <runtime>/scripts/init.mjs <proyecto-nuevo>');
const assets = path.join(skill, 'assets');
const releasePath = path.join(assets, 'release.json');
const manifestPath = path.join(assets, 'snapshot-manifest.json');
const sessionPaths = ['github-session.json'].map(name => path.join(assets, name)).filter(existsSync);
if (sessionPaths.length > 1) throw new Error('Sesión remota ambigua.');
const sessionPath = sessionPaths[0];
if (!existsSync(releasePath) || !existsSync(manifestPath)) {
  console.error('Falta la sesión remota. Consulta el workflow vigente y ejecuta su cargador start.');
  console.error('Con status PASS, ejecuta node <runtime>/scripts/init.mjs <proyecto-nuevo> usando la ruta runtime del comprobante.');
  process.exit(1);
}
const target = path.resolve(arg);
if (existsSync(target)) throw new Error('La salida ya existe; elige una carpeta nueva.');
if (target === skill || target.startsWith(skill + path.sep)) throw new Error('La salida debe quedar fuera de la skill.');
const snapshot = path.join(assets, 'design-system');
const readJSON = file => JSON.parse(readFileSync(file, 'utf8'));
const release = readJSON(releasePath);
const manifest = readJSON(manifestPath);
const ordered = Object.fromEntries(Object.entries(manifest.files).sort(([a],[b])=>a<b?-1:a>b?1:0));
const digest = createHash('sha256').update(JSON.stringify(ordered)).digest('hex');
if (manifest.schema_version !== 1 || release.ds_digest !== digest || manifest.ds_digest !== digest || release.version !== manifest.package_version) throw new Error('Release y snapshot no coinciden.');
for (const [relative, expected] of Object.entries(ordered)) {
  if (sessionPath && !existsSync(path.resolve(snapshot, relative))) continue;
  const file = realpathSync(path.resolve(snapshot, relative));
  if (!file.startsWith(realpathSync(snapshot) + path.sep)) throw new Error('Ruta fuera del snapshot.');
  if (createHash('sha256').update(readFileSync(file)).digest('hex') !== expected) throw new Error(`Snapshot alterado: ${relative}`);
}
if (sessionPath) {
  const session = readJSON(sessionPath);
  if (session.manifest_sha256 !== createHash('sha256').update(readFileSync(manifestPath)).digest('hex') || session.ds_digest !== manifest.ds_digest) throw new Error('La sesión remota y el catálogo difieren.');
  const webReceipt = readJSON(path.join(assets, 'web-inputs-receipt.json'));
  if (webReceipt.manifest_sha256 !== session.manifest_sha256 || webReceipt.status !== 'PASS') throw new Error('Falta el comprobante de fuentes web del mismo corte.');
  for (const required of webReceipt.files) {
    if (!Object.hasOwn(ordered, required)) throw new Error('Fuente web fuera del catálogo: '+required);
    if (!existsSync(path.resolve(snapshot, required))) throw new Error('Ejecuta github_workflow.py web antes de inicializar: '+required);
  }
}
const sourcePackage = readJSON(path.join(snapshot, 'implementations/web/package.json'));
const dependencies = sourcePackage.dependencies;
const development = ['tailwindcss','@tailwindcss/postcss','typescript','@types/react','@types/react-dom','@types/node','postcss','@playwright/test'];
const devDependencies = Object.fromEntries(development.map(key=>[key,sourcePackage.devDependencies[key]]));
for (const [name,version] of Object.entries({...dependencies,...devDependencies})) if (!/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(version)) throw new Error(`Dependencia sin versión exacta: ${name}`);
mkdirSync(target, {recursive:true});
cpSync(path.join(assets, 'starter'), target, {recursive:true});
cpSync(snapshot, path.join(target, 'references/design-system'), {recursive:true});
cpSync(manifestPath, path.join(target, 'references/snapshot-manifest.json'));
cpSync(releasePath, path.join(target, 'references/release.json'));
const publicDir = path.join(snapshot, 'implementations/web/public');
if (existsSync(publicDir)) cpSync(publicDir, path.join(target, 'public'), {recursive:true});
writeFileSync(path.join(target,'package.json'), JSON.stringify({name:'contpaqi-po-prototype',version:release.version,private:true,engines:sourcePackage.engines,scripts:{inventory:'node scripts/component-plan.mjs --inventory',plan:'node scripts/component-plan.mjs',build:'node scripts/prepare.mjs && next build --webpack && node scripts/inline-export.mjs out/index.html && node scripts/enforce-components.mjs --record-build',enforce:'node scripts/enforce-components.mjs',typecheck:'tsc --noEmit',capture:'node scripts/capture.mjs',handoff:'node scripts/handoff.mjs'},dependencies,devDependencies},null,2)+'\n');
console.log(`Fuente creada: ${target}\nEditar prototype/page.tsx, prototype/globals.css y brief.json. Instalar dependencias locales, build, capture, handoff. Versión ${release.version}; DS ${digest}.`);
