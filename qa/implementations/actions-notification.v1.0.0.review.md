# QA de implementación · Floating Actions e Inline Notification

2026-11-11 · FLOATING-ACTIONS-001 e INLINE-NOTIFICATION-001 · PASS en Figma y web para este lote.

## Figma

[Floating Actions](../../implementations/figma/root-families-2026-11-11/floating-actions-0.readback.json) `912:12164` → `122:6`, página `122:2`. Lectura independiente de 12 nodos y 97 bindings. Conserva el efecto vinculado, Dot count/large/neutral, Button/text, Icon Button/ghost y el Slot horizontal abierto de acciones. La Description enlaza la guía fuente `914:12185`.

[Inline Notification](../../implementations/figma/root-families-2026-11-11/inline-notification-0.readback.json) `565:149` → `122:274`, página `122:49`. Lectura independiente de cinco variantes, 40 nodos y 240 bindings. Se verificaron el layout vertical del set y los rangos tipográficos tras aplicar la propiedad editable Description. La Description enlaza la guía fuente `571:28`.

[Prueba desde instancias](../../implementations/figma/root-families-2026-11-11/actions-notification-consumer.readback.json) · 48 comprobaciones PASS. Incluye General actions con 0, 1 y 8 hijos, edición de conteo y textos, cinco tipos de aviso a 320, 602 y 900 px, contenido largo, propiedades de visibilidad, estilos y glyphs. Se retiraron las instancias de prueba. Reproducción en el presentador nativo NOT_RUN.

## Web

TypeScript, nueve pruebas Node y build de Next pasaron. El recorrido dirigido en Chrome confirmó conteo de 3 a 8, acción por teclado, traspaso de foco al ocultar Seleccionar todos y restauración al cerrar. También confirmó roles status y alert, link real, cierre Ghost small por teclado, restauración de foco y reapertura. El contraste del indicador Warning midió 2.962:1, con el rol de origen y el título semántico conservados. [Pruebas de navegador](../../implementations/web/tests/buttons-loader.browser.mjs)

La corrida integral de Chrome se interrumpió al esperar el selector de archivos de File Upload. El recorrido dirigido ejecutó las comprobaciones de estas dos familias contra el mismo build y pasó.
