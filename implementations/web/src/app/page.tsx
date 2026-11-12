'use client';

import { useState } from 'react';
import catalog from '../generated/catalog.json';
import { examples } from '../generated/example-map';

type Entry = { slug: string; name: string; notes: string };
const families: Entry[] = catalog;

const themes = ['Contable', 'Administrativo', 'Servicios', 'Personas'];

export default function Catalog() {
  const [theme, setTheme] = useState(themes[0]);
  return (
    <main data-ds-theme={theme.toLowerCase()} className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-5 text-3xl font-semibold">Catálogo BlueHeart DS</h1>
      <label className="mb-6 flex items-center gap-2">
        Tema
        <select className="rounded border px-2 py-1" value={theme} onChange={event => setTheme(event.target.value)}>
          {themes.map(item => <option key={item}>{item}</option>)}
        </select>
      </label>
      {families.length === 0 && <p>Todavía no hay familias publicadas en este catálogo local.</p>}
      {families.map(({ slug, name, notes }) => {
        const Example = examples[slug];
        return <section className="mb-8" key={slug}>
          <h2 className="text-xl font-medium">{name}</h2>
          <p>{notes}</p>
          <Example />
          <a className="underline" href={`docs/${slug}.md`}>Ficha técnica de {name}</a>
        </section>;
      })}
    </main>
  );
}
