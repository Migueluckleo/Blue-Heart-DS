import assert from 'node:assert/strict';

export async function verifyChat(page) {
  const section = page.locator('section').filter({has: page.getByRole('heading', {name: 'Chat', exact: true})});
  const chat = section.locator('[data-blueheart=chat]');
  const editor = chat.getByRole('textbox', {name: 'Redactar mensaje en Chat'});
  const suggestion = chat.getByRole('button', {name: '¿Cuánto IVA tengo por pagar?'});
  const composer = chat.locator('[data-blueheart=conversation-composer]');
  assert.equal(await chat.getAttribute('data-state'), 'standby');
  assert.equal((await chat.boundingBox()).width, 750);
  assert.equal((await composer.boundingBox()).width, 616);
  assert.equal(await chat.getByRole('button', {pressed: false}).filter({hasText: 'IVA'}).count(), 1);
  const theme = page.getByRole('combobox', {name: 'Tema'});
  const accents = [];
  for (const mode of ['Contable', 'Administrativo', 'Servicios', 'Personas']) {
    await theme.selectOption(mode);
    accents.push(await chat.locator('.bh-chat-title strong').evaluate(el => getComputedStyle(el).color));
  }
  assert.equal(new Set(accents).size, 4);
  await suggestion.focus();
  await page.keyboard.press('Space');
  assert.equal(await editor.inputValue(), '¿Cuánto IVA tengo por pagar?');
  await chat.getByRole('button', {name: 'Enviar mensaje'}).focus();
  await page.keyboard.press('Enter');
  assert.equal(await chat.getAttribute('data-state'), 'started');
  assert.equal((await composer.boundingBox()).width, 750);
  const slot = chat.locator('[data-slot=messages]');
  assert.equal(await slot.locator('[data-blueheart=user-message]').innerText(), '¿Cuánto IVA tengo por pagar?');
  assert.equal(await slot.locator('[data-blueheart=conversation-response]').count(), 1);
  assert.equal(await chat.getByRole('status').innerText(), 'Mensaje recibido en la muestra');
  const viewport = page.viewportSize();
  try {
    await page.setViewportSize({width: 368, height: 850});
    for (const state of ['started', 'standby']) {
      await section.getByRole('combobox', {name: 'Estado de Chat'}).selectOption(state);
      assert.equal((await chat.boundingBox()).width, 320);
      assert.equal((await composer.boundingBox()).width, 320);
      assert.equal(await chat.evaluate(el => el.scrollWidth), 320);
    }
  } finally {
    await page.setViewportSize(viewport);
    await theme.selectOption('Contable');
  }
  return {states: 2, narrowWidth: 320, themes: 4, keyboard: true, localHistory: true};
}
