# QA de implementación · File Upload y Checkbox

2026-11-11 · FILE-UPLOAD-001 y CHECKBOX-001 v1.0.0. [QA documental](../contracts/file-upload-checkbox.v1.0.0.review.md).

Figma PASS. File Upload `42:131` contiene seis variantes y Checkbox `42:30` quince. [Lecturas de matriz](../../implementations/figma/root-families-2026-11-11/) sin discrepancias. File Upload conserva los seis estilos y rangos de texto, enlaces, dos reacciones propias, seis Buttons oficiales y un Linear Progress oficial success/large/100%. Los iconos CloudArrowUp, XCircle, CheckCircle, Check y Minus se verificaron por key directamente en Phosphor y por instancia en destino. Checkbox conserva 18 reacciones y la ausencia de transición en disabled. Las capturas de ambos sets se inspeccionaron.

La [prueba consumidora](../../implementations/figma/root-families-2026-11-11/file-upload-checkbox-consumer.readback.json) ejecutó 20 comprobaciones. Checkbox conservó etiqueta larga, alineación a la primera línea y contenido al cambiar selección/estado. File Upload conservó anillo, riel y ancho en 280/500/720 y los cuatro pares de visibilidad. Las dos páginas quedaron con un maestro por familia. P-SLOTS NOT_APPLICABLE. Reproducción interactiva nativa NOT_RUN. El contraste de File Upload conserva la excepción documentada en el contrato fuente.

Web PASS. TypeScript, ocho pruebas Node, exportación Next y recorrido Chrome. Chrome verificó indeterminate a true con Espacio, alternancia y disabled de Checkbox. Verificó selector de archivos nativo por Enter, feedback de rechazo, arrastre con archivo ficticio, riel de confirmación al 100% y disabled. Los archivos de prueba se generaron en memoria. El anfitrión de ejemplo simula la confirmación local, sin transferencias ni servicios.

## Checkbox · Posición del label · 2026-11-17

PASS Figma y web. El set conserva los IDs originales de la derecha y añade las 15 variantes de etiqueta izquierda. Las 30 combinaciones conservan el texto personalizado al cambiar de posición, admiten etiqueta larga hasta 320 px y mantienen 24 × 24 px con etiqueta oculta. Se verificaron los destinos de las reacciones para que el cambio de selección y hover mantenga el lado del label. Las dos propiedades existentes de texto y visibilidad conservan sus claves.

TOKEN-QA-01 pasó con 1284 bindings y 40 overrides. Las dos referencias remotas corresponden a Check y Minus de Phosphor. La revisión visual cubrió false, true e indeterminate en ambos lados y la composición temporal se retiró. Chrome comprobó orden visual, espacio de 8 px, clic de etiqueta, Espacio, foco, disabled y texto largo a 220 px. TypeScript y build de Next pasaron. [Lectura del maestro](../../implementations/figma/checkbox-label-position-2026-11-17/readback.json) · [Ficha React](../../implementations/web/docs/components/checkbox.md).
