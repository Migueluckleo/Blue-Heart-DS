import assert from 'node:assert/strict';

export async function verifyFloatingSelection(page) {
  const floating = page.getByRole('group',{name:'Acciones de selección',exact:true});
  const trigger = floating.getByRole('button',{name:'Seleccionar',exact:true});
  const menu = floating.getByRole('menu',{name:'Alcance de selección'});
  const pageOption = menu.getByRole('menuitem',{name:/Seleccionar solo esta página/});
  const all = menu.getByRole('menuitem',{name:/Seleccionar todo/});
  const dot = floating.locator('[data-blueheart=dot]');
  const readDot = () => dot.evaluate(el => [el.textContent, getComputedStyle(el).paddingInlineStart, getComputedStyle(el).paddingInlineEnd, el.offsetHeight]);
  const focused = locator => locator.evaluate(el=>el===document.activeElement);
  const box = await floating.boundingBox();
  assert.deepEqual([box.width,box.height],[1024,96]);
  assert.deepEqual(await readDot(),['3','0px','0px',20]);
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  await menu.waitFor();
  await trigger.getAttribute('aria-expanded').then(value=>assert.equal(value,'true'));
  assert.equal(await focused(pageOption),true);
  assert.match(await pageOption.textContent(),/50 comprobantes.*Página 1 de 12/);
  assert.match(await all.textContent(),/2,600 comprobantes.*Todas las páginas/);
  const popup = await menu.boundingBox();
  const anchor = await trigger.boundingBox();
  assert.equal(popup.width,300);
  assert.equal(popup.height,153);
  assert.ok(popup.y + popup.height <= anchor.y);
  await page.keyboard.press('Escape');
  await menu.waitFor({state:'hidden'});
  assert.equal(await focused(trigger),true);
  assert.deepEqual(await readDot(),['3','0px','0px',20]);

  await trigger.click();
  await menu.waitFor();
  await page.keyboard.press('Enter');
  await menu.waitFor({state:'hidden'});
  assert.deepEqual(await readDot(),['50','8px','8px',20]);
  assert.equal(await focused(trigger),true);
  await page.keyboard.press('ArrowUp');
  await menu.waitFor();
  assert.equal(await focused(all),true);
  await page.keyboard.press('Home');
  assert.equal(await focused(pageOption),true);
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await menu.waitFor({state:'hidden'});
  assert.deepEqual(await readDot(),['2,600','8px','8px',20]);

  await trigger.click();
  await menu.waitFor();
  await floating.getByRole('button',{name:'Descargar XML',exact:true}).click();
  await menu.waitFor({state:'hidden'});
  assert.match(await page.locator('#demo-floating-result').textContent(),/XML: 2,600 comprobantes/);
  await floating.getByRole('button',{name:'Cerrar acciones de selección'}).click();
  assert.equal(await floating.count(),0);
  assert.equal(await page.evaluate(()=>document.activeElement.id),'demo-floating-open');
  return {page:50,all:2600,wideInlinePadding:8,keyboard:true,overlay:[300,153],outsideDismiss:true,toolbarDismiss:true};
}
