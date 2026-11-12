import { readFileSync, writeFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const input = path.resolve(process.argv[2] ?? 'out/index.html');
const output = path.resolve(process.argv[3] ?? 'render.html');
const root = realpathSync(path.dirname(input));
const files = new Map();
const hydrationResources = new Map();
const mime = { '.js':'text/javascript', '.css':'text/css', '.woff2':'font/woff2', '.woff':'font/woff', '.ttf':'font/ttf', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.gif':'image/gif', '.ico':'image/x-icon', '.avif':'image/avif' };
const isEmbedded = value => /^(?:data:|#)/i.test(value);
function local(value, base = input) {
  if (!value || /^(?:[a-z][\w+.-]*:|\/\/)/i.test(value)) throw new Error(`Recurso externo o vacío: ${value}`);
  const clean = decodeURIComponent(value.split(/[?#]/)[0]);
  const resolved = realpathSync(clean.startsWith('/') ? path.join(root, clean.slice(1)) : path.resolve(path.dirname(base), clean));
  if (!resolved.startsWith(root + path.sep)) throw new Error(`Recurso fuera del export: ${value}`);
  const bytes = readFileSync(resolved);
  files.set(path.relative(root, resolved), { bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
  return { resolved, bytes };
}
function uri(value, base) {
  if (isEmbedded(value)) return value;
  const { resolved, bytes } = local(value, base);
  const type = mime[path.extname(resolved).toLowerCase()];
  if (!type) throw new Error(`Tipo de asset no soportado: ${value}`);
  const fragment = value.includes('#') ? '#' + value.split('#').slice(1).join('#') : '';
  return `data:${type};base64,${bytes.toString('base64')}${fragment}`;
}
function attr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match ? (match[1] ?? match[2]).replaceAll('&amp;', '&') : null;
}
function css(value, base, seen = []) {
  const { resolved, bytes } = local(value, base);
  if (seen.includes(resolved)) throw new Error(`Import CSS circular: ${resolved}`);
  let code = bytes.toString('utf8');
  // Next's compiled CSS should contain no remaining imports; fail rather than drop conditions.
  if (/@import\s/i.test(code)) throw new Error('CSS contiene @import sin compilar. Compilar todas las hojas antes de empaquetar.');
  return code.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/g, (_, a, b, c) => `url("${uri(a ?? b ?? c, resolved)}")`);
}
let html = readFileSync(input, 'utf8');
if (/<base\b|<iframe\b|<object\b|<embed\b/i.test(html)) throw new Error('Elemento que requiere contexto externo no soportado.');
html = html.replace(/<link\b[^>]*>/gi, tag => {
  const rel = attr(tag, 'rel') ?? '';
  const href = attr(tag, 'href');
  if (/^(?:preload|modulepreload|prefetch|preconnect|dns-prefetch)$/i.test(rel)) return '';
  if (rel === 'stylesheet') {
    const code = css(href);
    if (/<\/style/i.test(code)) throw new Error('Cierre HTML no permitido en CSS.');
    const embedded = `data:text/css;base64,${Buffer.from(code).toString('base64')}`;
    hydrationResources.set(href, embedded);
    // Preserve React's resource identity/precedence across server HTML and hydration.
    return tag.replace(href, embedded);
  }
  if (/^(?:icon|shortcut icon|apple-touch-icon)$/i.test(rel)) return tag.replace(href, uri(href));
  throw new Error(`Link no soportado: ${rel}`);
});
html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi, (tag, attrs, content) => {
  const src = attr(`<script ${attrs}>`, 'src');
  if (!src) return tag;
  if (/\btype\s*=\s*["']module["']/i.test(attrs)) throw new Error('Módulos externos no soportados; usar build webpack del starter.');
  const code = local(src).bytes.toString('utf8');
  // Base64 avoids closing-script injection, preserves classic script semantics and Unicode.
  const nominal = /\bnomodule\b/i.test(attrs) ? ' nomodule' : '';
  const original = src.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  return `<script${nominal} data-original-src="${original}" src="data:text/javascript;base64,${Buffer.from(code).toString('base64')}"></script>`;
});
html = html.replace(/<(?:img|source|video|audio|input|image|use)\b[^>]*>/gi, tag => {
  if (/\ssrcset\s*=/i.test(tag)) throw new Error('srcSet no soportado: usar un asset local o SVG inline.');
  for (const name of ['src', 'poster', 'href', 'xlink:href']) {
    const value = attr(tag, name);
    if (value && !isEmbedded(value)) {
      const embedded = uri(value);
      hydrationResources.set(value, embedded);
      tag = tag.replace(value.replaceAll('&', '&amp;'), embedded);
    }
  }
  return tag;
});
for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
  const href = attr(tag, 'href');
  if (href && !href.startsWith('#')) throw new Error(`La navegación del prototipo debe ser local por hash: ${href}`);
}
for (const tag of html.match(/<[^!][^>]*>/g) ?? []) {
  const style = attr(tag, 'style');
  if (style && /url\(/i.test(style)) {
    const decoded = style.replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&#39;', "'");
    const remaining = decoded.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/gi, (_, a, b, c) => {
      if (!isEmbedded(a ?? b ?? c)) throw new Error('Asset en style inline sin embeber: usar data URI o referencia # local.');
      return '';
    });
    if (/url\(/i.test(remaining)) throw new Error('URL CSS inline no reconocida: usar data URI simple o referencia # local.');
  }
}
// Next serializes resource URLs in inline Flight data as well as DOM attributes.
// Keep both references identical so React does not recreate file:///_next links.
for (const [original, embedded] of hydrationResources) {
  const quoted = JSON.stringify(original);
  html = html.replaceAll(quoted, JSON.stringify(embedded));
  html = html.replaceAll(quoted.replaceAll('"', '\\"'), JSON.stringify(embedded).replaceAll('"', '\\"'));
}
writeFileSync(output, html);
const result = { schema:'contpaqi-single-html/1', source:'Next.js static export; single client flow', file:path.basename(output), sha256:createHash('sha256').update(html).digest('hex'), bytes:Buffer.byteLength(html), embedded:[...files].map(([file, item])=>({file,...item})), runtimeQA:'NOT_RUN; test the final file in an isolated folder with network blocked' };
writeFileSync(output.replace(/\.html?$/i, '') + '.manifest.json', JSON.stringify(result, null, 2) + '\n');
console.log(`HTML autónomo empaquetado: ${output} (${result.bytes} bytes, ${files.size} recursos). Falta verificar interacción file://.`);
