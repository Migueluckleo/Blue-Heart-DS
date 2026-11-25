import assert from 'node:assert/strict';

export async function verifyChatSidebar(page) {
  const example = page.locator('section').filter({has: page.getByRole('heading', {name: 'Chat Sidebar', exact: true})});
  const rail = example.locator('[data-blueheart=chat-sidebar][data-version=v2][data-mode=rail]');
  const panel = example.locator('[data-blueheart=chat-sidebar][data-version=v2][data-mode=panel]');
  const nav = rail.getByRole('navigation');
  assert.equal((await rail.boundingBox()).width, 79);
  assert.equal(await panel.count(), 0);
  assert.equal(await nav.getByRole('button', {pressed: true}).count(), 0);
  assert.equal(await nav.getByRole('button').count(), 4);
  assert.equal(await nav.locator('[data-blueheart=chat-rail-item]').count(), 4);
  const chats = nav.getByRole('button', {name: 'Chats', exact: true});
  assert.equal(await chats.locator('[data-blueheart=dot]').count(), 1);
  assert.equal(await chats.getAttribute('aria-describedby') !== null, true);
  assert.equal(await nav.locator('[data-blueheart=dot]').count(), 1);
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
  assert.equal(await chats.locator('[data-blueheart=dot]').count(), 1);
  try {
    await pair.evaluate(el => { el.style.blockSize = '440px'; });
    assert.equal((await rail.boundingBox()).height, 440);
    assert.equal((await panel.boundingBox()).height, 440);
    assert.equal(await panel.locator('[data-slot=content]').evaluate(el => getComputedStyle(el).overflowY), 'auto');
  } finally {
    await pair.evaluate(el => { el.style.removeProperty('block-size'); });
  }
  return {views: 4, neutralRail: true, panel: 264, rail: 79, narrowLayout: true, keyboard: true, linkedAssets: 2, meter: '42/150', shortHeight: 440};
}

export async function verifyChatRailItem(page) {
  const nav = page.getByRole('navigation', {name: 'Ejemplo de Chat Rail Item'});
  const chats = nav.getByRole('button', {name: 'Chats', exact: true});
  const links = nav.getByRole('button', {name: 'Vinculaciones', exact: true});
  const disabled = nav.getByRole('button', {name: 'Indicadores', exact: true});
  const themeSelect = page.getByRole('combobox', {name: 'Tema', exact: true});
  const appearance = control => control.evaluate(el => {
    const base = getComputedStyle(el);
    const focus = getComputedStyle(el, '::after');
    const icon = el.querySelector('svg').getBoundingClientRect();
    return {bg: base.backgroundColor, fg: base.color, size: [base.width, base.height],
      icon: [icon.width, icon.height], focus: el.matches(':focus-visible'), ring: focus.borderTopColor,
      ringTop: focus.top, ringWidth: focus.borderTopWidth, ringRadius: focus.borderTopLeftRadius};
  });
  const themes = [];
  for (const theme of ['Contable', 'Administrativo', 'Servicios', 'Personas']) {
    await themeSelect.selectOption(theme);
    await page.mouse.move(0, 0);
    assert.equal((await appearance(links)).bg, 'rgb(15, 23, 42)');
    assert.equal((await appearance(links)).fg, 'rgb(255, 255, 255)');
    await chats.hover();
    assert.equal((await appearance(chats)).bg, 'rgb(241, 245, 249)');
    await links.hover();
    assert.equal((await appearance(links)).bg, 'rgb(30, 41, 59)');
    await page.mouse.move(0, 0);
    await chats.focus();
    await page.keyboard.press('Tab');
    assert.equal(await links.evaluate(el => el === document.activeElement), true);
    const selected = await appearance(links);
    assert.equal(selected.focus, true);
    assert.equal(selected.bg, 'rgb(15, 23, 42)');
    assert.deepEqual([selected.ringTop, selected.ringWidth, selected.ringRadius], ['-4px', '2px', '12px']);
    const brand = await links.evaluate(el => {
      const probe = document.createElement('span');
      probe.style.color = 'var(--icon-button-color-stroke-focus)';
      el.appendChild(probe);
      try { return getComputedStyle(probe).color; }
      finally { probe.remove(); }
    });
    assert.equal(selected.ring, brand);
    assert.deepEqual(selected.size, ['48px', '48px']);
    assert.deepEqual(selected.icon, [24, 24]);
    const d = await chats.evaluate(el => {
      const dot = el.querySelector('[data-blueheart=dot]').getBoundingClientRect();
      const item = el.getBoundingClientRect();
      const description = document.getElementById(el.getAttribute('aria-describedby'))?.textContent;
      return [dot.width, dot.height, dot.top - item.top, item.right - dot.right, description];
    });
    assert.deepEqual(d, [12, 12, 4, 4, 'Tiene novedades']);
    assert.equal(await disabled.isDisabled(), true);
    await disabled.evaluate(el => el.click());
    assert.equal(await disabled.getAttribute('aria-pressed'), 'false');
    assert.equal(await links.getAttribute('aria-pressed'), 'true');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await chats.evaluate(el => el === document.activeElement), true);
    assert.equal((await appearance(chats)).ring, brand);
    await page.keyboard.press('Enter');
    assert.equal(await chats.getAttribute('aria-pressed'), 'true');
    assert.equal(await chats.locator('[data-blueheart=dot]').count(), 1);
    await links.focus();
    await page.keyboard.press('Space');
    assert.equal(await links.getAttribute('aria-pressed'), 'true');
    themes.push({theme, selected: selected.bg, ring: selected.ring, dot: d.slice(0, 4)});
  }
  return {themes, keyboard: true, disabled: true, preservesNotification: true};
}

export async function verifyChatSidebarV1(page) {
  const sample = page.getByRole('region', {name: 'Chat Sidebar V1', exact: true});
  const component = sample.locator('[data-version=v1]');
  const rail = component.and(sample.locator('[data-mode=rail]'));
  const panel = component.and(sample.locator('[data-mode=panel]'));
  const opener = rail.getByRole('button', {name: 'Abrir historial de chats'});
  assert.equal((await rail.boundingBox()).width, 64);
  assert.equal((await opener.boundingBox()).width, 32);
  assert.equal(await rail.getByRole('meter').count(), 0);
  await opener.focus();
  await page.keyboard.press('Enter');

  const close = panel.getByRole('button', {name: 'Cerrar historial de chats'});
  await panel.getByRole('heading', {name: 'Historial de chats'}).waitFor();
  await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Cerrar historial de chats');
  const original = await panel.boundingBox();
  assert.deepEqual([original.width, original.height], [310, 775]);
  const content = panel.locator('[data-slot=content]');
  const meter = panel.getByRole('meter', {name: 'Uso de IA de Pro Plan'});
  assert.equal(await meter.getAttribute('aria-valuenow'), '41');
  assert.equal(await content.getByRole('meter').count(), 0);
  assert.equal((await content.boundingBox()).width, 278);
  await page.keyboard.press('Tab');
  const search = panel.getByRole('button', {name: 'Buscar chats'});
  assert.equal(await search.evaluate(el => el === document.activeElement), true);
  await page.keyboard.press('Enter');
  assert.equal(await sample.getByLabel('Resultado del historial de chats').textContent(), 'Buscar chats');
  await panel.getByRole('button', {name: 'Nuevo chat', exact: true}).click();
  assert.equal(await sample.getByLabel('Resultado del historial de chats').textContent(), 'Nuevo chat');
  const folder = panel.getByRole('button', {name: 'Papeles de trabajo 2026'});
  await folder.click();
  assert.equal(await folder.getAttribute('aria-expanded'), 'true');
  const chat = panel.getByRole('button', {name: 'Reporte de Ingresos 2026'});
  await chat.click();
  assert.equal(await chat.getAttribute('aria-current'), 'true');

  const host = component.locator('..');
  await host.evaluate(el => {el.style.width = '280px'; el.style.height = '440px';});
  assert.deepEqual(await panel.evaluate(el => [el.offsetWidth, el.offsetHeight]), [280, 440]);
  assert.equal((await content.boundingBox()).width, 248);
  assert.equal(await content.evaluate(el => el.scrollHeight > el.clientHeight && getComputedStyle(el).overflowY === 'auto'), true);
  await host.evaluate(el => {el.style.width = '240px';});
  assert.equal((await panel.boundingBox()).width, 264);
  await host.evaluate(el => {el.style.removeProperty('width'); el.style.removeProperty('height');});
  await close.focus();
  await page.keyboard.press('Space');
  await opener.waitFor();
  await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Abrir historial de chats');
  return {rail:64,panel:310,minWidth:264,shortHeight:440,keyboard:true,callbacks:true,focusRestore:true,meter:'41/150'};
}
