// Build-only adapter for Next 16.4's private asset-prefix module.
// Does not intercept network, history or errors. External dependencies still fail QA.
export function getAssetPrefix() {
  const script = document.currentScript;
  if (!(script instanceof HTMLScriptElement)) throw new Error('Missing current Next script');
  const original = script.getAttribute('data-original-src');
  const pathname = original ?? new URL(script.src).pathname;
  const at = pathname.indexOf('/_next/');
  if (at < 0) throw new Error('Missing original Next asset path');
  return pathname.slice(0, at);
}
