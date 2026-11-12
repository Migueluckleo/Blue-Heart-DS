import {inspectComponentMarkup} from './component-enforcer.mjs';

function sidebarPresentation(button) {
  const main = button.closest('[data-blueheart="sidebar"]').querySelector('.bh-sidebar-main');
  const active = main?.querySelector('[data-blueheart="menu-item"][data-active="true"]');
  const target = active?.querySelector('.bh-menu-item-target');
  return {
    expanded:button.getAttribute('aria-expanded'),
    focused:document.activeElement === button,
    hasItems:!!main?.querySelector('a,button,[role="menuitem"]'),
    current:target?.getAttribute('aria-label') ?? target?.querySelector('.bh-menu-item-label')?.textContent.trim() ?? null,
  };
}

export async function inspectBrowserComponents(page, catalog, plan) {
  const markup = await page.evaluate(() => {
    const body = document.body.cloneNode(true);
    body.querySelectorAll('script,style,link').forEach(node => node.remove());
    return body.outerHTML;
  });
  const {findings,header} = inspectComponentMarkup(markup, catalog, plan);
  const headerId = header?.closest('[data-ds-node]')?.getAttribute('data-ds-node') ?? null;
  const measurements = await page.evaluate(headerId => {
    const findings = [];
    const sidebars = [];
    const report = (code, id, detail) => findings.push({code,id,detail});
    const visible = node => node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden';
    const token = (node, property, value) => {
      const probe = document.createElement('span');
      probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none';
      probe.style[property] = value;
      node.append(probe);
      const result = getComputedStyle(probe)[property];
      probe.remove();
      return result;
    };
    const headers = [...document.querySelectorAll('[data-blueheart="header"],[role="banner"],header')]
      .filter(node => visible(node) && (node.matches('[data-blueheart="header"],[role="banner"]')
        || !node.closest('main,section,article,aside,nav,[role="dialog"]')));
    if (headerId) {
      const wrapper = document.querySelector(`[data-ds-node="${CSS.escape(headerId)}"]`);
      const candidate = wrapper?.firstElementChild;
      if (candidate && visible(candidate) && !headers.includes(candidate)) headers.push(candidate);
    }
    for (const header of headers) {
      const style = getComputedStyle(header);
      const box = header.getBoundingClientRect();
      const expectedBg = token(header,'backgroundColor','var(--header-color-bg-default)');
      const expectedWidth = parseFloat(token(header,'width','calc(var(--header-size-min-width) * 1px)'));
      const expectedHeight = parseFloat(token(header,'height',
        'calc((var(--header-size-logo-height) + 2 * var(--header-spacing-padding)) * 1px)'));
      if (style.backgroundColor !== expectedBg) report('HEADER_BACKGROUND','header',
        `Fondo computado ${style.backgroundColor}; el rol del Header resuelve ${expectedBg}.`);
      if (!(expectedWidth > 0 && expectedHeight > 0)) {
        report('HEADER_TOKENS','header','Los tokens de geometría del Header no están disponibles.');
      } else if (box.height + 1 < expectedHeight || box.width + 1 < expectedWidth) report('HEADER_GEOMETRY','header',
        `Mide ${box.width} × ${box.height}; mínimos del corte ${expectedWidth} × ${expectedHeight}.`);
      if (!header.querySelector('.bh-header-logo') || !header.querySelector('.bh-header-content')) {
        report('HEADER_ANATOMY','header','Faltan los bloques de logo y contenido del Header.');
      }
      if (!header.matches('[data-blueheart="header"]') && !header.querySelector('.bh-header-logo:is(img,svg)')) {
        report('HEADER_BRAND_ASSET','header','La composición local debe usar el asset de marca oficial.');
      }
    }
    const sidebarElements = [...document.querySelectorAll('[data-blueheart="sidebar"]')].filter(visible);
    for (const sidebar of sidebarElements) {
      const collapsed = sidebar.dataset.collapsed === 'true';
      const state = collapsed ? 'collapsed' : 'expanded';
      const style = getComputedStyle(sidebar);
      const box = sidebar.getBoundingClientRect();
      const expectedBg = token(sidebar,'backgroundColor',`var(--sidebar-color-bg-${state})`);
      const expectedWidth = parseFloat(token(sidebar,'width',`calc(var(--sidebar-size-${state}-width) * 1px)`));
      if (style.backgroundColor !== expectedBg || !(expectedWidth > 0) || Math.abs(box.width - expectedWidth) > 1) {
        report('SIDEBAR_TOKENS','sidebar',`Fondo y ancho ${style.backgroundColor}, ${box.width}px; esperado ${expectedBg}, ${expectedWidth}px.`);
      }
      const lower = sidebar.querySelector('.bh-sidebar-lower');
      const toggle = sidebar.querySelector('.bh-sidebar-control [aria-expanded][aria-controls]');
      const small = parseFloat(token(sidebar,'width','calc(var(--icon-button-size-control-small) * 1px)'));
      if (!toggle || toggle.dataset.variant !== 'secondary'
        || !(small > 0) || Math.abs(toggle.getBoundingClientRect().width-small) > 1
        || toggle.getAttribute('aria-expanded') !== String(!collapsed)
        || !sidebar.querySelector('.bh-sidebar-content')?.matches(`#${CSS.escape(toggle.getAttribute('aria-controls'))}`)) {
        report('SIDEBAR_CONTROL','sidebar','El control debe ser Secondary small y exponer su estado y región controlada.');
      }
      let host = sidebar.parentElement;
      while (host && getComputedStyle(host).display === 'contents') host = host.parentElement;
      if (host && host.querySelector('main,[role="main"],.bh-app-shell-main')) {
        const hostBox = host.getBoundingClientRect();
        const hostStyle = getComputedStyle(host);
        const padding = parseFloat(hostStyle.paddingBottom) + parseFloat(hostStyle.borderBottomWidth);
        const availableBottom = Math.min(hostBox.bottom, innerHeight) - padding;
        if (box.top < availableBottom && box.bottom + 1 < availableBottom) {
          report('SIDEBAR_HEIGHT','sidebar',`Termina en y=${box.bottom}; el host ofrece espacio hasta y=${availableBottom}.`);
        }
      }
      if (lower && (!lower.querySelector('hr') || Math.abs(lower.getBoundingClientRect().bottom-box.bottom) > 1)) {
        report('SIDEBAR_FOOTER','sidebar','El área inferior debe conservar su divisor y quedar al pie del Sidebar.');
      }
      if (toggle && !sidebar.closest('[inert]')) sidebars.push(toggle.getAttribute('aria-controls'));
    }
    return {findings,sidebars};
  }, headerId);
  findings.push(...measurements.findings);
  for (const controlledId of measurements.sidebars) {
    const selector = '[data-blueheart="sidebar"] .bh-sidebar-control [aria-controls='
      + JSON.stringify(controlledId) + ']';
    const control = page.locator(selector);
    const original = await control.evaluate(sidebarPresentation);
    const previousFocus = await page.evaluateHandle(() => document.activeElement);
    try {
      await control.focus();
      await control.press('Enter');
      const opposite = await control.evaluate(sidebarPresentation);
      if (opposite.expanded === original.expanded || !opposite.focused) {
        findings.push({code:'SIDEBAR_TOGGLE',id:'sidebar',detail:'Enter debe alternar la presentación y conservar el foco.'});
      } else if (original.hasItems && !opposite.hasItems || original.current && original.current !== opposite.current) {
        findings.push({code:'SIDEBAR_PRESENTATION',id:'sidebar',
          detail:'Al alternar deben seguir disponibles los destinos y la ruta actual.'});
      }
    } finally {
      if (await control.getAttribute('aria-expanded') !== original.expanded) await control.press('Enter');
      await previousFocus.evaluate(node => {
        if (node instanceof HTMLElement && node.isConnected && node !== document.body) node.focus();
        else if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      });
      await previousFocus.dispose();
    }
  }
  return findings;
}
