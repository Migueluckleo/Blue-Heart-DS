import assert from 'node:assert/strict';

export async function verifyConversationComposer(page) {
  const section = page.locator('section').filter({
    has: page.getByRole('heading', {name: 'Conversation Composer', exact: true}),
  });
  const composer = section.locator('[data-blueheart="conversation-composer"]');
  const draft = section.getByRole('textbox', {name: 'Mensaje de la conversación'});
  const send = section.getByRole('button', {name: 'Enviar mensaje'});
  const output = section.getByRole('status', {name: 'Resultado de muestra'});
  const message = section.getByRole('checkbox', {name: 'Mostrar mensaje contextual'});
  const tools = section.getByRole('checkbox', {name: 'Mostrar herramientas'});

  assert.equal((await composer.boundingBox()).width, 616);
  assert.equal((await composer.boundingBox()).height, 138);
  const description = await draft.getAttribute('aria-describedby');
  assert.ok(description);
  assert.match(await composer.locator('.bh-conversation-disclaimer').innerText(), /revisar la información/);
  assert.match(await draft.evaluate(el => getComputedStyle(el).fontFamily), /Manrope Variable/);
  await tools.focus();
  await page.keyboard.press('Tab');
  assert.equal(await draft.evaluate(el => el === document.activeElement), true);
  assert.equal(await draft.evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
  await page.keyboard.type('Primera línea');
  await page.keyboard.press('Enter');
  await page.keyboard.type('Segunda línea');
  const value = 'Primera línea\nSegunda línea';
  assert.equal(await draft.inputValue(), value);
  assert.equal(await output.textContent(), '');

  for (const name of ['Más acciones', 'Adjuntar archivo', 'Micrófono', 'Enviar mensaje']) {
    await page.keyboard.press('Tab');
    const control = section.getByRole('button', {name});
    assert.equal(await control.evaluate(el => el === document.activeElement), true);
    assert.equal(await control.locator('svg').count(), 1);
    assert.equal((await control.boundingBox()).width, 32);
    await page.keyboard.press('Space');
    assert.equal(await output.textContent(), name === 'Enviar mensaje' ? `Borrador recibido: ${value}` : name);
  }
  assert.equal(await draft.inputValue(), value);

  assert.equal(await section.getByText('Alcanzaste tu límite mensual de créditos.').count(), 0);
  await message.check();
  const secondary = section.getByRole('button', {name: 'Default'});
  assert.equal(await secondary.getAttribute('data-variant'), 'secondary');
  await secondary.click();
  assert.equal(await output.textContent(), 'Acción del aviso');
  await tools.uncheck();
  assert.equal(await section.getByRole('button', {name: 'Micrófono'}).count(), 0);
  assert.equal(await send.isEnabled(), true);
  await tools.check();
  assert.equal(await section.getByRole('button', {name: 'Adjuntar archivo'}).count(), 1);

  await send.hover();
  assert.equal(await send.getAttribute('data-state'), 'hover');

  const theme = page.getByRole('combobox', {name: 'Tema'});
  const fills = [];
  for (const mode of ['Contable', 'Administrativo', 'Servicios', 'Personas']) {
    await theme.selectOption(mode);
    fills.push(await send.evaluate(el => getComputedStyle(el).backgroundColor));
    const frameStroke = await composer.locator('.bh-conversation-field').evaluate(el => getComputedStyle(el).borderTopColor);
    assert.equal(frameStroke, 'rgb(191, 206, 254)');
  }
  assert.equal(new Set(fills).size, 4);

  const original = page.viewportSize();
  try {
    await page.setViewportSize({width: 368, height: 850});
    assert.equal((await composer.boundingBox()).width, 320);
    assert.equal(await composer.evaluate(el => el.scrollWidth), 320);
    const placement = await Promise.all([
      section.getByRole('button', {name: 'Micrófono'}).boundingBox(), send.boundingBox(),
    ]);
    assert.ok(placement[0].x + placement[0].width <= placement[1].x);
  } finally {
    await page.setViewportSize(original);
    await theme.selectOption('Contable');
  }
  return {width: 616, height: 138, narrowWidth: 320, multiline: true, focus: true,
    accessibleNames: true, actionCallbacks: 5, slotVisibility: true, fills};
}
