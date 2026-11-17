import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Pagination } from '../src/components/pagination.tsx';

const render = props => renderToStaticMarkup(createElement(Pagination, {
  currentPage:1, totalPages:2, onPageChange:() => {}, ...props,
}));

test('Pagination derives record ranges and clamps a partial final page in both layouts', () => {
  for (const type of ['default','compact']) {
    assert.match(render({type,totalRecords:25,pageSize:20}), /1-20 de 25 registros/);
    const last = render({type,totalRecords:25,pageSize:20,currentPage:9,totalPages:9});
    assert.match(last, /21-25 de 25 registros/);
    assert.match(last, /<button(?=[^>]*aria-label="Página siguiente")(?=[^>]*disabled="")[^>]*>/);
    assert.doesNotMatch(last, /Página 9 de|aria-label="Página 9"/);
  }
});

test('Pagination keeps zero and single-result ranges visible with disabled boundaries', () => {
  for (const [totalRecords, range] of [[0,'0-0 de 0 registros'],[1,'1-1 de 1 registro'],[5,'1-5 de 5 registros']]) {
    const html = render({totalRecords,pageSize:20,totalPages:1});
    assert.ok(html.includes(range),range);
    assert.match(html, /<button(?=[^>]*aria-label="Página anterior")(?=[^>]*disabled="")[^>]*>/);
    assert.match(html, /<button(?=[^>]*aria-label="Página siguiente")(?=[^>]*disabled="")[^>]*>/);
  }
});

test('Pagination uses the selected rows value and preserves explicit range text', () => {
  const rows = {value:50,options:[20,50],onChange:() => {}};
  assert.match(render({totalRecords:75,pageSize:20,rows,currentPage:2}), /51-75 de 75 registros/);
  assert.match(render({totalRecords:25,range:'Resultados del filtro'}), /Resultados del filtro/);
  assert.doesNotMatch(render({totalRecords:25,range:'Resultados del filtro'}), /1-20 de 25 registros/);
  assert.match(render({currentPage:3,totalPages:5,type:'compact'}), /Página 3 de 5/);
  assert.equal(render({totalPages:1}), '');
  assert.doesNotMatch(render({totalRecords:-1}), /bh-pagination-range/);
});
