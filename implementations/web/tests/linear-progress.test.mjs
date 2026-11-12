import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LinearProgress } from '../src/components/linear-progress.tsx';

function render(props) {
  return renderToStaticMarkup(createElement(LinearProgress, {id:'progress', label:'Cargando', ...props}));
}

test('Linear Progress exposes its range, exact current value and associated help', () => {
  const html = render({value:37, helperText:'37 de 100', valueText:'37 de 100'});
  for (const [name,value] of [['role','progressbar'],['aria-label','Cargando'],['aria-valuemin','0'],
    ['aria-valuemax','100'],['aria-valuenow','37'],['aria-valuetext','37 de 100'],['aria-describedby','progress-helper']]) {
    assert.ok(html.includes(`${name}="${value}"`), name);
  }
  assert.match(html, /--bh-progress-width:37%/);
});

test('Linear Progress supports unknown total and the File Upload rail-only composition', () => {
  const unknown = render({});
  assert.match(unknown, /data-determinate="false"/);
  assert.doesNotMatch(unknown, /aria-valuenow=/);
  const rail = render({type:'success', size:'large', value:100, showHeader:false, showHelperText:false, helperText:'Listo'});
  assert.match(rail, /aria-valuenow="100"/);
  assert.match(rail, /aria-label="Cargando"/);
  assert.doesNotMatch(rail, /bh-linear-progress-header|aria-describedby=|Listo/);
});
