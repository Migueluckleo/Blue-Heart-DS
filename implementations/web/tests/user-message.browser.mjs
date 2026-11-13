import assert from 'node:assert/strict';

export async function verifyUserMessage(page) {
  const section = page.locator('section').filter({
    has: page.getByRole('heading', {name: 'User message', exact: true}),
  });
  const root = section.locator('[data-blueheart=user-message]');
  const bubble = root.locator('.bh-user-message-bubble');
  const message = bubble.locator('p');
  const metrics = await bubble.evaluate(el => {
    const p = el.querySelector('p');
    const css = getComputedStyle(el);
    const type = getComputedStyle(p);
    return [el.offsetWidth, el.offsetHeight, css.paddingTop, css.borderRadius, css.backgroundColor,
      type.color, type.fontSize, type.lineHeight, type.fontWeight, type.fontFamily];
  });
  assert.deepEqual(metrics.slice(0, 9), [494, 52, '16px', '8px', 'rgb(191, 206, 254)',
    'rgb(15, 23, 42)', '14px', '20px', '400']);
  assert.match(metrics[9], /Manrope Variable/);
  const edge = box => box.x + box.width;
  assert.equal(edge(await root.boundingBox()), edge(await bubble.boundingBox()));
  assert.equal(await root.locator('a, button, [tabindex]').count(), 0);
  const theme = page.getByRole('combobox', {name: 'Tema'});
  for (const mode of ['Contable', 'Administrativo', 'Servicios', 'Personas']) {
    await theme.selectOption(mode);
    assert.equal(await bubble.evaluate(el => getComputedStyle(el).backgroundColor), metrics[4]);
    assert.equal(await message.evaluate(el => getComputedStyle(el).color), metrics[5]);
  }
  const viewport = page.viewportSize();
  const sample = await message.textContent();
  try {
    await page.setViewportSize({width: 368, height: 850});
    await message.evaluate(p => {p.textContent = 'Mensaje de prueba\n' + 'a'.repeat(90);});
    assert.equal((await bubble.boundingBox()).width, 320);
    assert.ok((await message.boundingBox()).height >= 60);
    assert.equal(await message.evaluate(el => el.scrollWidth === el.clientWidth), true);
    assert.equal(await message.evaluate(el => getComputedStyle(el).whiteSpace), 'pre-wrap');
  } finally {
    await message.evaluate((p, value) => {p.textContent = value;}, sample);
    await page.setViewportSize(viewport);
    await theme.selectOption('Contable');
  }
  return {referenceBubble: [494, 52], narrowWidth: 320, themes: 4, longText: true};
}
