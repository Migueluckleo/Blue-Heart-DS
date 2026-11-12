# QA de implementación · Chip

2026-11-11 · CHIP-001 · PASS en Figma y web.

## Figma

La página Chips `126:2` contiene solo los cuatro sets. Large `429:62` → `126:60`, Medium `429:169` → `126:163`, Small `429:276` → `126:266` y Extra-small `429:383` → `126:369`. Ocho lotes de lectura independiente comprobaron 40 variantes, 288 nodos y 1832 bindings, con cero diferencias. Quedaron seis estilos vinculados, 40 variables existentes, 16 enlaces reversibles de hover y cuatro Descriptions con la guía `434:2`. [Primer lote de lectura](../../implementations/figma/root-families-2026-11-11/chip-large-0.readback.json)

La [lectura desde instancias](../../implementations/figma/root-families-2026-11-11/chip-consumer.readback.json) pasó 53 controles. Verificó 40 variantes en cuatro modos, igualdad de roles del glyph con Label, 16 combinaciones de opcionales por tamaño, textos largos y vacíos, Counter cero, sustitución y restauración de ambos iconos, anillo adaptable y limpieza de instancias. La reproducción de hover en presentador nativo queda NOT_RUN.

## Web

TypeScript, nueve pruebas Node y build de Next pasaron. El recorrido dirigido en Chrome confirmó radios con flechas, un único valor seleccionado, toggles independientes, Disabled, Counter cero, anillo visible de 2 px con separación de 2 px, remoción por Enter/Espacio y foco en el siguiente filtro o en Restaurar filtros. En las cuatro marcas el Label seleccionado y su glyph midieron 14.629:1 frente a la superficie y Count midió 17.853:1 frente a la suya. Los tamaños visuales por debajo de 44 px conservan el requisito de superficie táctil del anfitrión. [Pruebas de navegador](../../implementations/web/tests/buttons-loader.browser.mjs)
