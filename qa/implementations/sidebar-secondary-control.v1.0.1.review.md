# QA de Figma y web · Sidebar v1.0.1

2026-11-11 · SIDEBAR-SECONDARY-CONTROL-001 · PASS.

La [lectura raíz](../../implementations/figma/root-families-2026-11-11/sidebar-secondary-user-override.source.json) confirmó Ghost/small, variante fuente `529:296`, en `749:65` y `749:147`. La [lectura de destino](../../implementations/figma/root-families-2026-11-11/sidebar-secondary-user-override.readback.json) confirmó Secondary/small `61:455` del set `61:477` en los dos controles `61:221` y `61:311`. Ambos miden 32×32, usan selected=false, state=default y Show badge=false, con los keys oficiales de CaretRight Light y CaretLeft Light.

La [búsqueda de consumidores](../../implementations/figma/root-families-2026-11-11/sidebar-secondary-user-override.consumers.json) revisó 17 páginas y 722 instancias del maestro y no encontró instancias adicionales del set Sidebar. Los dos glyphs resuelven `VariableID:8:824` de Secondary default. La Description vigente describe la función del control y conserva el enlace de guía. El cambio en Figma lo realizó el usuario. Reproducción de prototipo nativo NOT_RUN.

El [ejemplo Next en Chrome](../../implementations/web/tests/buttons-loader.browser.mjs) confirmó `data-variant="secondary"` contraído y expandido, 32×32, sin insignia y con carets distintos. Enter expande de 72 a 234 px, Espacio contrae a 72 px, y el foco queda en el botón en ambas transiciones. El nombre accesible y `aria-expanded` se actualizan, `aria-controls` conserva su referencia y los destinos de ejemplo se actualizan. TypeScript, 9 pruebas Node y build de Next pasaron. La [enmienda](../../specs/components/sidebar.secondary-control.amendment.v1.0.1.md) y la ficha del catálogo documentan el mismo Secondary.
