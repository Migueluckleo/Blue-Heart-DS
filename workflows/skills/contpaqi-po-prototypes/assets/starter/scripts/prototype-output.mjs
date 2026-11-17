const generic = /^(?:render|index|prototipo|prototype|prototipo-(?:de-)?blueheart|blueheart|mockup|poc)$/;
const reserved = /^(?:con|prn|aux|nul|com[0-9]|lpt[0-9])$/;

export function prototypeOutput(brief) {
  const labels = [brief.productName,brief.flowName,brief.title,brief.screens?.[0]?.name,brief.objective];
  for (const label of labels) {
    if (typeof label !== 'string') continue;
    const slug = label.normalize('NFKD').replace(/\p{Mark}/gu,'').toLowerCase()
      .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,72).replace(/-+$/,'');
    if (slug && !generic.test(slug)) {
      const stem = reserved.test(slug) ? `flujo-${slug}` : slug;
      return {html:`${stem}.html`,manifest:`${stem}.manifest.json`};
    }
  }
  throw new Error('Usa el nombre del producto o del flujo principal en el título o contenido del brief.');
}
