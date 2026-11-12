import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '../src/components/button.tsx';
import { Loader } from '../src/components/loader.tsx';

const render = (component, props) => renderToStaticMarkup(createElement(component, props));
const read = async name => JSON.parse(await readFile(new URL(`../src/generated/${name}.json`, import.meta.url), 'utf8'));

test('the delegated matrices expose 90 Button recipes and 24 Loader variants', async () => {
  const buttons = Object.values(await read('buttons-recipes'));
  const loader = Object.values(await read('loader-recipes'));
  assert.equal(buttons.length, 90);
  assert.equal(loader.length, 24);
  const ids = new Set(loader.map(row => row.id));
  assert.equal(buttons.filter(row => row.loader && ids.has(row.loader)).length, 15);
  assert.equal(buttons.filter(row => row.icons.length === 2).length, 75);
});

test('busy Button exposes the shared Loader and native link semantics only when active', () => {
  const markup = render(Button, {variant:'link', href:'#target', loading:true});
  assert.match(markup, /^<a\b[^>]*role="link"/);
  assert.match(markup, /aria-busy="true"/);
  assert.doesNotMatch(markup, /href=/);
  assert.match(markup, /data-blueheart="loader" data-size="medium" data-color="brand"/);
  assert.match(render(Button, {variant:'link', href:'#target'}), /href="#target"/);
  const disabled = render(Button, {disabled:true, loading:true});
  assert.match(disabled, /disabled=""/);
  assert.doesNotMatch(disabled, /data-blueheart="loader"|aria-busy/);
});

test('Loader is decorative by default and has a polite live label when requested', () => {
  assert.match(render(Loader, {}), /aria-hidden="true"/);
  const labeled = render(Loader, {label:'Cargando archivos…', color:'on-color'});
  assert.match(labeled, /role="status" aria-live="polite"/);
  assert.match(labeled, /Cargando archivos…/);
  assert.match(labeled, /stroke-opacity="0.3"/);
});
