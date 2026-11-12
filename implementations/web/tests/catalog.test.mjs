import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));

test('the generated catalogue covers the family registry', () => {
  const registry = read('../components.registry.json');
  const catalogue = read('../src/generated/catalog.json');
  assert.deepEqual(catalogue.map(entry => entry.id), registry.map(entry => entry.id).sort());
});

test('Icon Button and Menu item preserve the delegated visual matrices', () => {
  const icons = read('../src/generated/icon-button-recipes.json');
  const items = read('../src/generated/menu-item-recipes.json');
  assert.equal(Object.keys(icons).length, 90);
  assert.equal(Object.keys(items).length, 22);
  assert.equal(icons['ghost/small/false/default'].control, '--icon-button-size-control-small');
  assert.equal(icons['primary/small/true/default'], undefined);
  assert.equal(items['vertical/collapsed/default/false'].Icon, '--menu-item-color-icon-inverse');
  assert.equal(items['vertical/expanded/default/true'].Union, '--menu-item-color-shape-active-default');
  assert.equal(items['horizontal/expanded/default/true'], undefined);
});
