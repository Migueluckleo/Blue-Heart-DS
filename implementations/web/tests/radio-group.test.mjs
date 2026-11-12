import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RadioGroup } from '../src/components/radio-group.tsx';

function render(count, props = {}) {
  const options = Array.from({length: count}, (_, index) => ({
    value: String(index),
    label: 'Alternativa ' + index,
  }));
  return renderToStaticMarkup(createElement(RadioGroup, {name: 'choice', title: 'Alternativas', options, ...props}));
}

test('Radio group enforces the source cardinality by direction', () => {
  for (const count of [0, 1, 6]) assert.throws(() => render(count), RangeError);
  for (const count of [2, 5]) assert.match(render(count), /role="radiogroup"/);
  for (const count of [2, 3]) assert.match(render(count, {direction:'horizontal'}), /data-direction="horizontal"/);
  assert.throws(() => render(4, {direction:'horizontal'}), RangeError);
});

test('Radio group keeps the fixed error message and a named group with hidden title', () => {
  const html = render(2, {state:'error', helperText:'Overridden helper', showTitle:false, value:'1'});
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /aria-describedby="[^"]+-helper"/);
  assert.match(html, /<legend class="sr-only"[^>]*>Alternativas<\/legend>/);
  assert.match(html, /Select an option/);
  assert.doesNotMatch(html, /Overridden helper/);
  assert.equal((html.match(/checked=""/g) ?? []).length, 1);
});
