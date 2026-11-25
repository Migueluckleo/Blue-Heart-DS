import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import test from 'node:test';
import {Dot} from '../src/components/dot.tsx';
import {FloatingActions} from '../src/components/floating-actions.tsx';

test('Dot applies the wide token to multiple decimal digits and limit labels', () => {
  const wide = /--dot-spacing-counter-inline-wide/;
  for (const count of ['12', '2,600', '٣٤']) {
    assert.match(renderToStaticMarkup(createElement(Dot,{type:'count',count})),wide);
  }
  assert.doesNotMatch(renderToStaticMarkup(createElement(Dot,{type:'count',count:'7'})),wide);
  assert.doesNotMatch(renderToStaticMarkup(createElement(Dot,{type:'notification'})),wide);
  assert.match(renderToStaticMarkup(createElement(Dot,{type:'count-expand',maxCount:'99+'})),wide);
});

test('Floating Actions keeps independent scope metadata and supports the original selectAll API', () => {
  const base={count:'3',label:'Elementos seleccionados',selectAll:{label:'Acción histórica',onSelect() {}}};
  assert.match(renderToStaticMarkup(createElement(FloatingActions,base)),/Acción histórica/);
  const view=renderToStaticMarkup(createElement(FloatingActions,{...base,selection:{
    page:{countLabel:'50 comprobantes',context:'Página 1 de 12'},
    all:{countLabel:'2,600 comprobantes',context:'Todas las páginas',disabled:true},onSelect() {},
  }}));
  assert.match(view,/aria-haspopup="menu"/);
  assert.match(view,/Seleccionar solo esta página.*50 comprobantes.*Página 1 de 12/);
  assert.match(view,/disabled=""[^>]*><span>Seleccionar todo/);
  assert.doesNotMatch(view,/Acción histórica/);
});
