# QA de implementación · Tab y Tabs

2026-11-11 · TAB-001 y TABS-001 · PASS en Figma y web con las excepciones de contraste de la raíz.

## Figma

La página Tabs `113:2` contiene Tab `79:26` → `113:86` y Tabs `105:223` → `113:207`. Tab pasó lectura de las 24 variantes en cuatro lotes, 102 nodos y 906 bindings. Conserva 4 reacciones hover, ImageSquare Light, Dot count/medium y el estilo de sombra seleccionado. Tabs conserva tres variantes y un Slot compartido. El Divider inferior se [recolocó](../../implementations/figma/root-families-2026-11-11/tabs-divider.adjustment.json) después del crecimiento de Auto Layout. La [lectura final](../../implementations/figma/root-families-2026-11-11/tabs-0.readback.json) confirmó cero diferencias en 19 nodos y 109 bindings. Las guías fuente enlazadas son `82:2` y `111:461`.

La [prueba desde instancias](../../implementations/figma/root-families-2026-11-11/tabs-consumer.readback.json) pasó 23 comprobaciones. Incluye etiquetas largas, Dot 99+, anillos que se estiran, límites 0/1/2, seis instancias vinculadas, reordenamiento, selección única, Divider estirable, preservación de overrides y coordinación explícita del tipo al cambiar presentación. Solo los dos sets oficiales quedan en la página. La reproducción visible del hover nativo permanece NOT_RUN.

## Web

TypeScript, nueve pruebas Node y build de Next pasaron. [Chrome en localhost](../../implementations/web/tests/buttons-loader.browser.mjs) comprobó tablist, tabpanel e IDs vinculados, foco con flechas y Home/End, salto de Disabled, activación manual con Espacio, semántica de selección y nombre accesible con conteo. Los colores seleccionados de Segmented, incluidos icono y texto blancos, se verificaron en los cuatro temas. El contraste observado fue **4.389:1** en default y **2.262:1** en hover. Ambas excepciones se conservan según la [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/tab.3.1.0.md.txt).
