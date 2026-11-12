# QA de implementación · Dropdown

2026-11-11 · DROPDOWN-ITEM-001 y DROPDOWN-MENU-001 · PASS en Figma y web, con las limitaciones cromáticas fuente.

## Figma

La página Dropdown `118:2` contiene el set Dropdown item `394:29` → `118:42`, el auxiliar `395:11` → `119:11` y el menú `395:16` → `119:17`. Las 25 variantes del ítem pasaron lectura de cinco lotes y conservan 12 reacciones reversibles de hover. En capas Description ocultas, Figma devuelve FIXED/FIXED para sizing. La lectura cotejó layoutAlign=STRETCH y textAutoResize=HEIGHT y la prueba al mostrarlas confirmó FILL/HUG con crecimiento. La [lectura de Dropdown menu](../../implementations/figma/root-families-2026-11-11/dropdown-menu-0.readback.json) verificó Slot, elevación, overflow, 82 bindings y cero diferencias. La [lectura del auxiliar](../../implementations/figma/root-families-2026-11-11/dropdown-scrollbar-0.readback.json) verificó 15 bindings. Las tres Descriptions enlazan la guía `403:33`.

La [prueba desde instancias](../../implementations/figma/root-families-2026-11-11/dropdown-consumer.readback.json) pasó 31 comprobaciones. Incluye ancho 160 y crecimiento de Description, anillo adaptable, roles de glyph frente a Label en cuatro modos, los límites y preferencia de Options, sustitución por Header/Divider, orden, 1/5/10 hijos en los tres tamaños, viewport a 320, clips, dirección vertical y thumb de un cuarto del alto interior. Se retiraron las instancias temporales. La reproducción visual de hover y el gesto de desplazamiento en el presentador nativo quedan NOT_RUN.

## Web

TypeScript, nueve pruebas Node y build de Next pasaron. [Chrome en localhost](../../implementations/web/tests/buttons-loader.browser.mjs) comprobó combobox de solo selección con superficie Input, vínculos a listbox, opción activa distinta de seleccionada, Enter/Espacio, flechas, End con desplazamiento, salto de Disabled, Escape, selección por puntero, cierre exterior y foco conservado al elegir.

Description midió 4.344:1 en Hover en los cuatro temas y 4.291/4.518/4.480/4.258:1 en Selected por modo. Se conserva la [excepción de la norma fuente](../../sources/figma-snapshots/root-families-2026-11-11/dropdown-item.1.0.0.md.txt). El indicador privado nativo conserva su rol de 2.56:1 frente al fondo claro según su norma. El navegador se encarga de dibujar y desplazar el scrollbar web.
