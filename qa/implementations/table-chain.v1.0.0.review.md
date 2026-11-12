# QA de implementación · Table y Table cell

2026-11-11 · TABLE-001 y TABLE-CELL-001 · PASS en Figma y web.

## Figma

La página `128:2` contiene seis propietarios del alcance oficial. [Cell actions](../../implementations/figma/root-families-2026-11-11/table-cell-actions-0.readback.json) `826:188` → `128:191` pasó cuatro cantidades y 66 bindings. [Capture cell](../../implementations/figma/root-families-2026-11-11/table-capture-cell-0.readback.json) `826:528` → `128:228` pasó ocho variantes y 378 bindings en dos lotes. [Thumb](../../implementations/figma/root-families-2026-11-11/table-scrollbar-thumb-0.readback.json) `841:2760` → `128:261` y [Scrollbar medium](../../implementations/figma/root-families-2026-11-11/table-scrollbar-medium-0.readback.json) `827:98` → `128:264` pasaron tres definiciones, dos Slots privados y 37 bindings. Se restituyó el binding de grosor en ambos thumbs de ejemplo, `128:266` y `128:269`, y se verificó de nuevo el scrollbar.

[Table cell](../../implementations/figma/root-families-2026-11-11/table-cell-final-0.readback.json) `826:459` → `129:44` conserva el mismo set. Se añadieron las seis variantes con Avatar image/medium y se restauró el [orden de origen y el default](../../implementations/figma/root-families-2026-11-11/table-cell-24.links-reactions.json). Seis lotes de lectura independiente pasaron las 30 variantes sin diferencias. Los cuatro enlaces nativos conservan el estilo fuente sin decoración explícita. El navegador presenta un enlace HTML subrayado y navegable. [Lectura de rangos fuente](../../sources/figma-snapshots/root-families-2026-11-11/table-link-decoration.json)

[Table](../../implementations/figma/root-families-2026-11-11/table-main-0.readback.json) `827:99` → `142:92` conserva 1711 × 432 px, Description y guía de origen. Rows es un Slot nativo con mínimo uno, máximo abierto y overflow BOTH. La [lectura de Rows](../../implementations/figma/root-families-2026-11-11/table-main-rows.readback.json) verificó las nueve filas iniciales, 108 celdas vinculadas y sus propiedades, los indicadores de ambos ejes y Pagination con 11 ítems e Input de 88 px con el valor 20. La captura del maestro mostró cabecera, ocho filas de cuerpo y Pagination.

La [prueba final desde instancias](../../implementations/figma/root-families-2026-11-11/table-main-consumer.readback.json) pasó 14 controles. Comprobó la foto original al activar Avatar desde una celda, los cuatro temas, cabecera sola, inserción hasta 12 filas, reordenación, alineación, clipping, desborde y fit de ambos thumbs vinculados. Retiró las instancias de prueba y confirmó los seis propietarios en la página. La [prueba previa de auxiliares](../../implementations/figma/root-families-2026-11-11/table-leaves-consumer.readback.json) conserva los 30 controles de su alcance. El gesto de desplazamiento en el presentador nativo quedó sin ejecutar.

## Web

TypeScript, nueve pruebas Node, build de Next y la suite integral de Chrome pasaron en el catálogo de 39 familias. Chrome confirmó encabezados y scope, selección con Checkbox, enlace y acción por teclado, cambio de Capture, desplazamiento horizontal y vertical con cabecera móvil, Pagination fuera del viewport, tamaño de página, orden, inserción, retirada y selección de filas. Link en Hover con tema Servicios midió 4.308:1, de acuerdo con la excepción de origen. La norma también registra Link Selected 4.442:1 y Capture off mínimo 4.258:1. [Pruebas de navegador](../../implementations/web/tests/buttons-loader.browser.mjs)

## Continuidad del activo

[Seis variantes de Table cell](../../sources/figma-snapshots/root-families-2026-11-11/table-cell-avatar-dependency.json) consumen Avatar image/medium `145:96` → `83:12`. La transferencia autorizada quedó verificada en el [acta de Avatar](avatar.v1.0.0.review.md). La muestra de Table usa dos de esas variantes en 83 celdas con Show avatar=false y permite activarlo desde una instancia.
