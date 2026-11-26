import assert from 'node:assert/strict';

// Expanded item padding belongs to MenuItem, independently of its Sidebar host.
export async function verifyMenuItemSpacing(page) {
  const themes=page.getByRole('combobox',{name:'Tema'}), previousTheme=await themes.inputValue();
  const sidebar=page.getByRole('navigation',{name:'Navegación lateral de muestra'});
  const wasCollapsed=await sidebar.getAttribute('data-collapsed')==='true';
  if(wasCollapsed)await sidebar.getByRole('button',{name:'Expandir navegación'}).click();
  const cases=[];
  try {
    for(const theme of ['Contable','Administrativo','Servicios','Personas']) {
      await themes.selectOption(theme);
      for(const active of [true,false]) {
        const candidates=page.locator(`[data-blueheart="menu-item"][data-orientation="vertical"][data-type="expanded"][data-active="${active}"]`);
        const root=candidates.first(), target=root.locator('.bh-menu-item-target');
        await target.waitFor();
        for(const state of ['default','hover','focus']) {
          await page.mouse.move(0,0);await target.evaluate(e=>e.blur());
          if(state==='hover')await target.hover();
          if(state==='focus'){await themes.focus();await page.keyboard.press('Tab');await target.focus();}
          const measured=await target.evaluate(e=>{
            const c=getComputedStyle(e),r=e.getBoundingClientRect(),icon=e.querySelector('.bh-menu-item-icon').getBoundingClientRect();
            const labelNode=e.querySelector('.bh-menu-item-label'), label=labelNode.getBoundingClientRect();
            const text=document.createRange();text.selectNodeContents(labelNode);
            const caret=e.querySelector('.bh-menu-item-caret');
            return {padding:[c.paddingTop,c.paddingRight,c.paddingBottom,c.paddingLeft].map(parseFloat),gap:parseFloat(c.gap),
              iconInset:icon.left-r.left,iconLabelGap:label.left-icon.right,caretInset:caret?r.right-caret.getBoundingClientRect().right:null,width:r.width,
              labelAlignment:getComputedStyle(labelNode).textAlign,textInset:text.getBoundingClientRect().left-label.left};
          });
          assert.deepEqual(measured.padding,[12,16,12,24],`${theme}/${active}/${state}`);
          assert.equal(measured.gap,16);assert.equal(measured.iconInset,24);assert.equal(measured.iconLabelGap,16);
          assert.equal(measured.labelAlignment,'start',`${theme}/${active}/${state}`);
          assert.ok(Math.abs(measured.textInset)<1,`The visible text must start at the label's leading edge: ${measured.textInset}`);
          assert.equal(measured.width,234);if(measured.caretInset!==null)assert.equal(measured.caretInset,16);
          cases.push({theme,active,state,...measured});
        }
      }
    }
  } finally {
    await themes.selectOption(previousTheme);
    if(wasCollapsed)await sidebar.getByRole('button',{name:'Contraer navegación'}).click();
  }
  return {status:'PASS',cases,scope:'Expanded item internal spacing and visible label alignment, four themes and active/inactive default/hover/focus.'};
}
