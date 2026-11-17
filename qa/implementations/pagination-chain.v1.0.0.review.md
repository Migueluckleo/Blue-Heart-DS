# QA de implementación · Pagination y Pagination item

2026-11-11 · PAGINATION-001 y PAGINATION-ITEM-001 · PASS en Figma y web.

## Figma

Página Pagination `109:2` con los dos sets oficiales. Pagination item `585:44` → `109:17` conserva nueve variantes y las dos reacciones hover guardadas. La lectura en [lote uno](../../implementations/figma/root-families-2026-11-11/pagination-item-0.readback.json) y [lote dos](../../implementations/figma/root-families-2026-11-11/pagination-item-5.readback.json) comprobó 20 nodos y 208 bindings. Pagination `585:219` → `109:36` conserva Default y Compact, Input/filled enlazado y Slot Pages. La primera lectura detectó el alias ausente del ancho del Input. Se [vinculó el ancho](../../implementations/figma/root-families-2026-11-11/pagination-rows-width.adjustment.json) a `VariableID:13:69` y la [lectura final](../../implementations/figma/root-families-2026-11-11/pagination-0.readback.json) comprobó 19 nodos, 248 bindings y cero diferencias. Las dos Descriptions enlazan la guía `594:34`.

La [prueba desde instancias](../../implementations/figma/root-families-2026-11-11/pagination-consumer.readback.json) pasó 16 comprobaciones. Incluye Label largo con anillo expansible, swap de los cuatro carets, ancho de 88 en el Input, visibilidad de rango y filas, mínimo 1 del Slot, 12 hijos, orden y sustitución, conservación al volver de Compact, texto largo de posición y limpieza de instancias. La reproducción visible en el presentador nativo permanece NOT_RUN.

## Web

TypeScript, nueve pruebas Node y build de Next pasaron. [Chrome en localhost](../../implementations/web/tests/buttons-loader.browser.mjs) comprobó aria-current, elipsis sin foco, nombres de flechas, foco al listado en el ejemplo, cambio de filas 20/50/100, rango y extremos. La composición de filas usa un selector HTML y comparte la superficie visual de Input small. La muestra Compact amplía la zona de interacción a 44 × 44 sin alterar la superficie de 32. La prueba comprueba esa geometría y activación por teclado.

## Rango y cantidad de registros · 2026-11-17

PASS. Default y Compact usan Range visible por defecto y texto completo con registros. Desde una instancia se comprobó el texto 1-20 de 25 registros, la última página 21-25 de 25 registros, el cambio de presentación y la visibilidad. Pages conserva sus hijos al volver a Default. El ancho Hug permite el texto completo.

TOKEN-QA-01 pasó con 54 bindings y 9 overrides. Las 12 pruebas Node cubren la última página parcial, vacío, singular, tamaño del selector, rango manual y navegación heredada. TypeScript, build y Chrome pasaron. Chrome comprobó rango y navegación por teclado al cambiar de página y tamaño, junto con el consumo desde Table. [Lectura del maestro](../../implementations/figma/pagination-record-count-2026-11-17/readback.json) · [API React](../../implementations/web/docs/components/pagination.md).

## Posición del resumen · 2026-11-17

PASS. Figma expone range position left/right y conserva los maestros existentes como left, con default 109:34. Las cuatro combinaciones de Default/Compact y left/right conservan Range, Show range y Page label. Pages mantiene sus 11 hijos de muestra al alternar las presentaciones y posiciones; el selector de filas conserva su visibilidad. En right, el rango queda después de todos los controles, incluido el selector de filas. Lectura y revisión visual aprobaron la matriz sin recortes ni solapamientos.

TOKEN-QA-01: PASS con 108 bindings y 18 overrides revisados, sin consumo directo semántico. Se mantienen los estilos tipográficos y los aliases de componente existentes.

Web acepta rangePosition left/right, default left. Chrome comprobó por geometría ambas posiciones en las dos presentaciones, conservación de página, tamaño de filas y resumen, teclado y consumo desde Table. Las 12 pruebas Node, TypeScript, build, generación documental y diff check pasaron. La suite Chrome completa pasó en el reintento, tras un timeout inicial de File Upload anterior a las pruebas de Pagination; no requirió cambios en ese componente. [Evidencia](../../implementations/figma/pagination-range-position-2026-11-17/readback.json) · [API React](../../implementations/web/docs/components/pagination.md).
