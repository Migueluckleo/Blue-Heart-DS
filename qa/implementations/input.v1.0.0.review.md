# QA de implementación · Input

2026-11-11 · INPUT-001 · PASS en Figma y web con excepción cromática fuente documentada.

## Figma

Input/empty `282:26` → `93:72` e Input/filled `282:139` → `93:499` en página Input `93:2`. Las lecturas independientes en siete lotes por set confirmaron las 42 variantes sin diferencias. Verificaron los 11 controles de propiedades por set, los aliases, los efectos vinculados por índice, las tres definiciones tipográficas aplicadas, el Badge subtle/small expuesto y los glyphs Phosphor oficiales. El maestro enlaza a la guía fuente `287:44`. La fuente y el destino conservan cero reacciones.

La [prueba desde instancias](../../implementations/figma/root-families-2026-11-11/input-consumer.readback.json) pasó 56 comprobaciones. Comprobó el ancho corto y las alturas de cada variante a tolerancia 0.00001. A 280 px, ambos sets conservaron elipsis en una línea para el contenido, crecimiento multilínea de ayuda, edición de la unidad USD en el Badge vinculado, cambio de glyph oficial y visibilidad independiente de las propiedades. Se retiraron las instancias temporales. La reproducción nativa no aplica a estados sin reacciones.

## Web

TypeScript, nueve pruebas Node y build de Next pasaron. [Chrome en localhost](../../implementations/web/tests/buttons-loader.browser.mjs) comprobó edición y envío con teclado, etiqueta, required, Badge MXN, vacío/lleno, error con aria-describedby, transición a success, read-only editable solo por su anfitrión, disabled y matriz de 42 variantes con alturas 48/40/32. La validación del importe pertenece al ejemplo, y el producto aporta sus propias reglas.

El borde de Input/empty default midió **2.564:1** contra la superficie del campo en el catálogo. La geometría y el alias de borde corresponden a la fuente. La medición no alcanza 3:1 para un contorno que identifique por sí solo el campo. La [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/input.2.0.1.md.txt) exige conservar y registrar esta condición. La prueba no declara conformidad global.
