import assert from 'node:assert/strict';

export async function verifyConversationResponse(page) {
  const section = page.locator('section').filter({
    has: page.getByRole('heading', {name: 'Conversation Response', exact: true}),
  });
  const article = section.locator('article');
  const agent = section.getByRole('combobox', {name: 'Agente de respuesta'});
  const output = section.getByRole('status', {name: 'Resultado de la acción de respuesta'});
  const expectedSlots = ['body', 'previews', 'secondary-content', 'additional-actions', 'feedback-actions'];
  assert.equal((await article.boundingBox()).width, 616);
  for (const [identity, category, glyph] of [['BENI', 'Fiscal y contable', 'beni'], ['NAVI', 'Super Agente', 'navi']]) {
    await agent.selectOption(identity);
    assert.equal(await section.getByRole('article', {name: identity}).count(), 1);
    assert.equal(await article.getByText(category, {exact: true}).count(), 1);
    const art = article.locator(`[data-character="${glyph}"]`);
    assert.equal(await art.getAttribute('aria-hidden'), 'true');
    assert.equal((await art.boundingBox()).width, 32);
    assert.deepEqual(await article.locator('[data-slot]').evaluateAll(nodes => nodes.map(n => n.dataset.slot)), expectedSlots);
  }
  const preview = article.locator('[data-blueheart=conversation-response-preview]');
  assert.equal(await preview.getByText('Tabla', {exact: true}).count(), 1);
  assert.equal((await preview.locator('.bh-response-table-icon').boundingBox()).width, 24);
  assert.equal(await preview.locator('button, a, [tabindex]').count(), 0);
  assert.equal(await article.getByRole('button', {name: 'Agregar a dashboard'}).getAttribute('data-variant'), 'secondary');
  const copy = article.getByRole('button', {name: 'Copiar respuesta'});
  assert.match(await copy.locator('image').getAttribute('href'), /^data:image\/svg\+xml;base64,/);
  assert.equal((await copy.locator('svg').boundingBox()).width, 16);
  assert.equal((await copy.boundingBox()).width, 32);
  await section.getByRole('checkbox', {name: 'Mostrar acciones adicionales'}).focus();
  for (const name of ['Crear indicador', 'Agregar a dashboard', 'Me gusta', 'No me gusta', 'Copiar respuesta']) {
    const control = article.getByRole('button', {name, exact: true});
    await page.keyboard.press('Tab');
    assert.equal(await control.evaluate(el => el === document.activeElement), true);
    if (name === 'Crear indicador') assert.equal(await control.getAttribute('data-focus'), 'true');
    await page.keyboard.press('Space');
    assert.equal(await output.textContent(), name);
  }
  for (const [label, slot] of [['Mostrar previews', 'previews'],
    ['Mostrar contenido secundario', 'secondary-content'], ['Mostrar acciones adicionales', 'additional-actions']]) {
    const toggle = section.getByRole('checkbox', {name: label});
    await toggle.uncheck();
    assert.equal(await article.locator(`[data-slot="${slot}"]`).count(), 0);
    assert.equal(await copy.isVisible(), true);
    await toggle.check();
  }
  const viewport = page.viewportSize();
  try {
    await page.setViewportSize({width: 368, height: 850});
    assert.equal((await article.boundingBox()).width, 320);
    assert.equal(await article.evaluate(n => n.scrollWidth), 320);
    const buttons = article.locator('[data-slot=additional-actions] button');
    const first = await buttons.nth(0).boundingBox();
    const second = await buttons.nth(1).boundingBox();
    assert.ok(second.y > first.y);
  } finally {
    await page.setViewportSize(viewport);
  }
  return {agents: 2, slots: expectedSlots, width: 616, narrowWidth: 320, keyboardActions: 5, copyAsset: 'original embedded SVG'};
}
