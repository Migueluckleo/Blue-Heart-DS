# QA de implementación · Pagination y Pagination item

2026-11-11 · PAGINATION-001 y PAGINATION-ITEM-001 · PASS en Figma y web.

## Figma

Página Pagination `109:2` con los dos sets oficiales. Pagination item `585:44` → `109:17` conserva nueve variantes y las dos reacciones hover guardadas. La lectura en [lote uno](../../implementations/figma/root-families-2026-11-11/pagination-item-0.readback.json) y [lote dos](../../implementations/figma/root-families-2026-11-11/pagination-item-5.readback.json) comprobó 20 nodos y 208 bindings. Pagination `585:219` → `109:36` conserva Default y Compact, Input/filled enlazado y Slot Pages. La primera lectura detectó el alias ausente del ancho del Input. Se [vinculó el ancho](../../implementations/figma/root-families-2026-11-11/pagination-rows-width.adjustment.json) a `VariableID:13:69` y la [lectura final](../../implementations/figma/root-families-2026-11-11/pagination-0.readback.json) comprobó 19 nodos, 248 bindings y cero diferencias. Las dos Descriptions enlazan la guía `594:34`.

La [prueba desde instancias](../../implementations/figma/root-families-2026-11-11/pagination-consumer.readback.json) pasó 16 comprobaciones. Incluye Label largo con anillo expansible, swap de los cuatro carets, ancho de 88 en el Input, visibilidad de rango y filas, mínimo 1 del Slot, 12 hijos, orden y sustitución, conservación al volver de Compact, texto largo de posición y limpieza de instancias. La reproducción visible en el presentador nativo permanece NOT_RUN.

## Web

TypeScript, nueve pruebas Node y build de Next pasaron. [Chrome en localhost](../../implementations/web/tests/buttons-loader.browser.mjs) comprobó aria-current, elipsis sin foco, nombres de flechas, foco al listado en el ejemplo, cambio de filas 20/50/100, rango y extremos. La composición de filas usa un selector HTML y comparte la superficie visual de Input small. La muestra Compact amplía la zona de interacción a 44 × 44 sin alterar la superficie de 32. La prueba comprueba esa geometría y activación por teclado.
