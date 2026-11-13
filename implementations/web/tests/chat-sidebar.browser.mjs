import assert from 'node:assert/strict';

export async function verifyChatSidebar(page) {
  const example = page.locator('section').filter({has: page.getByRole('heading', {name: 'Chat Sidebar', exact: true})});
  const rail = example.locator('[data-blueheart=chat-sidebar][data-mode=rail]');
  const panel = example.locator('[data-blueheart=chat-sidebar][data-mode=panel]');
  const nav = rail.getByRole('navigation');
  assert.equal((await rail.boundingBox()).width, 79);
  assert.equal(await panel.count(), 0);
  assert.equal(await nav.getByRole('button', {pressed: true}).count(), 0);
  assert.equal(await nav.getByRole('button').count(), 4);
  const meter = rail.getByRole('meter', {name: 'Uso de IA de Pro Plan'});
  assert.equal(await meter.getAttribute('aria-valuenow'), '42');
  assert.equal(await meter.getAttribute('aria-valuemax'), '150');
  for (const view of ['Indicadores', 'Papeles de trabajo', 'Vinculaciones', 'Chats']) {
    const trigger = nav.getByRole('button', {name: view, exact: true});
    await trigger.focus();
    await page.keyboard.press('Space');
    await panel.getByRole('heading', {name: view, exact: true}).waitFor();
    assert.equal((await panel.boundingBox()).width, 264);
    assert.equal(await trigger.getAttribute('aria-pressed'), 'true');
    assert.equal(await nav.getByRole('button', {pressed: true}).count(), 1);
    if (view === 'Vinculaciones') {
      const assets = await panel.locator('img').evaluateAll(images => Promise.all(images.map(async image => {
        await image.decode();
        return image.naturalWidth > 0;
      })));
      assert.deepEqual(assets, [true, true]);
    }
  }
  const folder = panel.getByRole('button', {name: 'Análisis de IVA', exact: true});
  await folder.focus();
  await page.keyboard.press('Enter');
  assert.equal(await folder.getAttribute('aria-expanded'), 'true');
  const section = panel.getByRole('region', {name: 'Carpetas'});
  const title = 'Reembolsos de gastos de viaje aprobados en abril';
  const entry = section.getByRole('button', {name: title, exact: true});
  await entry.focus();
  await page.keyboard.press('Enter');
  assert.equal(await entry.getAttribute('aria-current'), 'true');
  await page.keyboard.press('Tab');
  assert.equal(await section.getByRole('button', {name: `Fijar ${title}`, exact: true}).evaluate(el => el === document.activeElement), true);
  assert.equal(await section.evaluate(el => el.clientWidth), await panel.locator('[data-slot=content]').evaluate(el => el.clientWidth));
  const pair = rail.locator('..');
  try {
    await pair.evaluate(el => { el.style.inlineSize = '290px'; });
    assert.equal((await panel.boundingBox()).width, 211);
    assert.equal(await panel.evaluate(el => el.scrollWidth), await panel.evaluate(el => el.clientWidth));
  } finally {
    await pair.evaluate(el => { el.style.removeProperty('inline-size'); });
  }
  await panel.getByRole('button', {name: 'Cerrar panel'}).click();
  assert.equal(await panel.count(), 0);
  assert.equal(await nav.getByRole('button', {pressed: true}).count(), 0);
  assert.equal(await meter.getAttribute('aria-valuenow'), '42');
  await nav.getByRole('button', {name: 'Chats', exact: true}).click();
  await panel.getByRole('heading', {name: 'Chats', exact: true}).waitFor();
  return {views: 4, neutralRail: true, panel: 264, rail: 79, narrowLayout: true, keyboard: true, linkedAssets: 2, meter: '42/150'};
}
