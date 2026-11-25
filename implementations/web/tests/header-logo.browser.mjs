import assert from 'node:assert/strict';

export async function verifyHeaderLogos(page) {
  const picker = page.getByRole('combobox', {name: 'Logotipo del encabezado'});
  const sizePicker = page.getByRole('combobox', {name: 'Altura del logotipo'});
  const header = page.locator('[data-blueheart="header"]').filter({has:page.locator('#demo-header-company')});
  const logo = header.locator('.bh-header-logo');
  const options = ['CONTPAQi Contabilidad', 'Portal Web', 'Mi CONTPAQi', 'Mi Gestión'];
  const results = [];
  const host = header.locator('..');
  try {
    for (const width of [1280, 1152]) {
      await host.evaluate((element, width) => {element.style.inlineSize = width + 'px';}, width);
      for (const [index,name] of options.entries()) {
        await picker.selectOption(String(index));
        await logo.evaluate(image => image.decode());
        for (const [sizeIndex,height] of [40,44,48].entries()) {
          await sizePicker.selectOption(String(sizeIndex));
          const size = await header.evaluate(element => {
            const logo = element.querySelector('.bh-header-logo');
            const controls = element.querySelector('.bh-header-content');
            const outer = element.getBoundingClientRect();
            const box = logo.getBoundingClientRect();
            const content = controls.getBoundingClientRect();
            const style = getComputedStyle(logo);
            return {name:logo.alt,height:box.height,width:box.width,ratio:logo.naturalWidth/logo.naturalHeight,
              gap:content.left-box.right,right:outer.right-content.right,fit:style.objectFit,headerHeight:outer.height};
          });
          assert.equal(size.name,name);
          assert.equal(size.height,height,name);
          assert.ok(Math.abs(size.width-size.ratio*height)<0.08,name);
          assert.ok(size.gap>=-0.05 && size.right>=31.95,name);
          assert.equal(size.fit,'contain',name);
          assert.equal(size.headerHeight,112,name);
          results.push({host:width,name,height:size.height,width:size.width});
        }
      }
    }
  } finally {
    await picker.selectOption('0');
    await sizePicker.selectOption('2');
    await host.evaluate(element => element.style.removeProperty('inline-size'));
  }
  return results;
}
