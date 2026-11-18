import test from 'node:test';
import assert from 'node:assert/strict';
import { filterDropdownEntries } from '../src/components/dropdown-menu.tsx';

const entries = [
  {id:'h1',type:'header',label:'América'},
  {id:'a',type:'option',label:'MXN',description:'Peso mexicano'},
  {id:'d1',type:'divider'},
  {id:'b',type:'option',label:'USD',description:'Dólar estadounidense'},
  {id:'d2',type:'divider'},
  {id:'h2',type:'header',label:'Europa'},
  {id:'d3',type:'divider'},
  {id:'c',type:'option',label:'EUR',description:'Euro',disabled:true},
  {id:'d4',type:'divider'},
];

test('search matches accents, case and description without changing the source', () => {
  const before=JSON.stringify(entries);
  assert.deepEqual(filterDropdownEntries(entries,'  DOLAR ').map(x=>x.id),['h1','b']);
  assert.deepEqual(filterDropdownEntries(entries,'mxn').map(x=>x.id),['h1','a']);
  assert.equal(JSON.stringify(entries),before);
  assert.equal(filterDropdownEntries(entries,' '),entries);
});
test('only separators between matching options and nonempty groups survive', () => {
  assert.deepEqual(filterDropdownEntries(entries,'o').map(x=>x.id),['h1','a','d1','b','h2','c']);
});
test('disabled matches remain visible; no matches produce no fictional option', () => {
  assert.deepEqual(filterDropdownEntries(entries,'euro').map(x=>x.id),['h2','c']);
  assert.equal(filterDropdownEntries(entries,'euro')[1].disabled,true);
  assert.deepEqual(filterDropdownEntries(entries,'no existe'),[]);
});
