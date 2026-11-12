# QA de implementación · Linear Progress Bar

2026-11-11 · LINEAR-PROGRESS-001 v1.0.0. [QA documental](../contracts/linear-progress.v1.0.0.review.md).

Figma PASS. Página `39:2` y sets `39:29` auxiliar, `39:87` small, `40:175` medium, `40:348` large. [Lecturas de matriz](../../implementations/figma/root-families-2026-11-11/) con 84 variantes y cero discrepancias. Se verificaron 60 reacciones con sus destinos remapeados, enlaces a guía y 12 instancias del auxiliar. Las capturas representativas small y large se inspeccionaron. La [prueba consumidora](../../implementations/figma/root-families-2026-11-11/linear-progress-consumer.readback.json) ejecutó 100 controles de proporciones, clipping, tamaños 120/246/360/640, visibilidad independiente y riel success de 12 px para File Upload. No dejó instancias temporales. P-SLOTS NOT_APPLICABLE. Reproducción interactiva nativa NOT_RUN. Las reacciones almacenadas y las proporciones de las fases se verificaron con lectura independiente.

Web PASS. El ejemplo comunica progreso medido y total desconocido. Node comprobó nombre, valor exacto, ausencia de valor para indeterminado y API para solo riel. Chrome verificó 0, 25, 50, 75 y 100, anchos proporcionales, grosor, detención del ejemplo y movimiento reducido. TypeScript y exportación Next pasaron. El producto decide el avance, el tratamiento de error y la confirmación final.
