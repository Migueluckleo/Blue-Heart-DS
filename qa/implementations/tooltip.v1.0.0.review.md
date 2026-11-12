# QA de implementación · Tooltip

2026-11-11 · TOOLTIP-001 v1.0.0. [QA documental](../contracts/tooltip.v1.0.0.review.md).

Figma PASS para el maestro `38:22` en la página Tooltip `38:2`. La [lectura independiente de la matriz](../../implementations/figma/root-families-2026-11-11/) verificó las 24 combinaciones, geometría, bindings, propiedades, Description, guía, paths, tres estilos de texto y sombra compartida. Captura de los 24 estados inspeccionada. La [prueba consumidora temporal](../../implementations/figma/root-families-2026-11-11/tooltip-consumer.readback.json) confirmó que cambiar placement y tipo conserva Label, que Title aparece en rich y que un texto largo crece hasta Body de 240 px, texto de 216 px y ancho lateral de 246 px. La página conserva un único set. P-SLOTS NOT_APPLICABLE.

Web PASS. TypeScript, seis pruebas de Node, exportación Next y Chrome local. El ejemplo abrió con foco y hover, cerró con Escape, conservó el foco y vinculó el disparador con role=tooltip mediante aria-describedby. El anfitrión de ejemplo aplica 300 ms para el puntero. La detección de colisiones y la interacción táctil dependen de cada anfitrión. La reproducción interactiva nativa quedó NOT_RUN y el demo host de la fuente sigue excluido del maestro.
