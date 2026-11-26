import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

export async function verifyStickyTable(page) {
  const table = page.getByRole('table',{name:'Comprobantes ficticios'});
  const root = table.locator('..').locator('..');
  const viewport = table.locator('..');
  const toggle = page.getByRole('checkbox',{name:'Fijar acciones a la derecha'});
  assert.equal(await root.getAttribute('data-sticky-actions'),'false');
  await toggle.focus();
  await page.keyboard.press('Space');
  assert.equal(await root.getAttribute('data-sticky-actions'),'true');
  assert.equal(await table.getByRole('columnheader',{name:'Acciones'}).getAttribute('scope'),'col');
  const actionHeader = table.locator('thead tr > :last-child');
  const actionCell = table.locator('tbody tr > :last-child').first();
  const firstDataCell = table.locator('tbody tr > :first-child').first();
  const buttons = table.getByRole('button');
  const actionCount=await table.locator('tbody tr').count()*2;
  assert.equal(await buttons.count(),actionCount);
  assert.equal(await table.locator('[data-blueheart="icon-button"][data-variant="ghost"]').count(),actionCount);
  assert.deepEqual(await buttons.first().evaluate(el=>[el.offsetWidth,el.offsetHeight]),[32,32]);
  const geometry = () => table.evaluate(el=>{
    const v=el.parentElement, h=el.querySelector('thead tr:last-child > :last-child');
    const a=el.querySelector('tbody tr > :last-child'),d=el.querySelector('tbody tr > :first-child');
    const r=n=>{const b=n.getBoundingClientRect();return {x:b.x,y:b.y,right:b.right,width:b.width,height:b.height};};
    return {header:r(h),actions:r(a),data:r(d),edge:v.getBoundingClientRect().left+v.clientWidth};
  });
  await viewport.evaluate(el=>el.scrollTo(0,0));
  const initial = await geometry();
  assert.equal(initial.actions.right,initial.edge);
  assert.equal(initial.actions.width,136);
  for (const left of [128,10000]) {
    await viewport.evaluate((el,left)=>el.scrollTo(left,0),left);
    const next = await geometry();
    assert.equal(next.actions.x,initial.actions.x);
    assert.equal(next.header.x,initial.header.x);
    assert.ok(next.data.x<initial.data.x);
    assert.equal(next.actions.y,next.data.y);
  }
  const themes=[];
  for (const theme of ['Contable','Administrativo','Servicios','Personas']) {
    await page.getByRole('combobox',{name:'Tema'}).selectOption(theme);
    const surfaces=await actionCell.evaluate(el=>{
      const style=getComputedStyle(el),row=el.parentElement;
      return {actions:style.backgroundColor,data:getComputedStyle(row.children[1]).backgroundColor,
        shadow:style.boxShadow,header:getComputedStyle(el.closest('table').querySelector('th:last-child')).backgroundColor};
    });
    assert.equal(surfaces.actions,surfaces.data);
    assert.doesNotMatch(surfaces.actions,/rgba\([^)]*, 0\)/);
    assert.match(surfaces.shadow,/-4px 0px 16px -2px/);
    themes.push({theme,...surfaces});
  }
  await buttons.first().focus();
  await page.keyboard.press('Enter');
  assert.equal(await buttons.first().getAttribute('data-state'),'focus');
  assert.match(await page.locator('#demo-table-action').textContent(),/Vista local del folio/);
  await page.keyboard.press('Tab');
  assert.equal(await buttons.nth(1).evaluate(el=>el===document.activeElement),true);
  await page.keyboard.press('Space');
  assert.match(await page.locator('#demo-table-action').textContent(),/Edición local del folio/);
  const beforeY=await geometry();
  const footer=await root.locator('.bh-table-pagination').boundingBox();
  await viewport.evaluate(el=>el.scrollTo(el.scrollLeft,40));
  const afterY=await geometry();
  assert.equal(afterY.actions.y,afterY.data.y);
  assert.equal(afterY.actions.y,beforeY.actions.y-40);
  assert.equal(afterY.header.y,beforeY.header.y-40);
  assert.equal((await root.locator('.bh-table-pagination').boundingBox()).y,footer.y);
  await root.evaluate(el=>el.style.maxWidth='320px');
  await viewport.evaluate(el=>el.scrollTo(10000,0));
  const narrow=await geometry();
  assert.equal(narrow.actions.right,narrow.edge);
  assert.equal(narrow.actions.width,136);
  await mkdir('test-results',{recursive:true});
  await root.screenshot({path:'test-results/table-sticky-actions.png'});
  await root.evaluate(el=>el.style.maxWidth='');
  await toggle.focus();
  await page.keyboard.press('Space');
  assert.equal(await root.getAttribute('data-sticky-actions'),'false');
  assert.equal(await table.getByRole('columnheader').count(),4);
  assert.equal(await table.getByRole('button').count(),0);
  const uncappedTable = page.getByRole('table',{name:'Ejemplos de celdas de comprobantes'});
  const uncapped = await uncappedTable.evaluate(el=>{
    const viewport = el.parentElement;
    return {height:viewport.clientHeight,contentHeight:el.offsetHeight,maxHeight:getComputedStyle(viewport).maxHeight};
  });
  assert.equal(uncapped.maxHeight,'none');
  assert.equal(uncapped.height,uncapped.contentHeight);

  const measureHeight = () => table.evaluate(el=>{
    const viewport = el.parentElement;
    const pagination = viewport.nextElementSibling;
    return {
      rows:el.tBodies[0].rows.length,
      height:viewport.clientHeight,
      scrollHeight:viewport.scrollHeight,
      contentHeight:el.offsetHeight,
      paginationGap:pagination.getBoundingClientRect().top-viewport.getBoundingClientRect().bottom,
    };
  });
  const capped = await measureHeight();
  assert.ok(capped.height<capped.contentHeight);
  const remove = page.getByRole('button',{name:'Retirar primera fila'});
  for (let index = 0; index < 12; index++) await remove.click();
  assert.equal(await remove.isDisabled(),true);
  const empty = await measureHeight();
  assert.equal(empty.rows,0);
  assert.equal(empty.height,empty.contentHeight);
  assert.equal(empty.height,empty.scrollHeight);
  assert.equal(empty.paginationGap,0);

  await page.getByRole('button',{name:'Agregar fila de muestra'}).click();
  await toggle.focus();
  await page.keyboard.press('Space');
  const single = await measureHeight();
  assert.equal(single.rows,1);
  assert.equal(single.height,single.contentHeight);
  assert.equal(single.height,single.scrollHeight);
  assert.ok(single.height>empty.height && single.height<capped.height);
  assert.equal(single.paginationGap,0);
  assert.equal(await table.getByRole('button').count(),2);
  return {positions:3,verticalAlignment:true,mobileWidth:320,ghostButtons:actionCount,keyboard:true,themes,
    viewportHeight:{uncapped,capped,empty,single}};
}
