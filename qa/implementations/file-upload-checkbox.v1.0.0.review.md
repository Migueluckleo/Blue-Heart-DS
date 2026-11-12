# QA de implementación · File Upload y Checkbox

2026-11-11 · FILE-UPLOAD-001 y CHECKBOX-001 v1.0.0. [QA documental](../contracts/file-upload-checkbox.v1.0.0.review.md).

Figma PASS. File Upload `42:131` contiene seis variantes y Checkbox `42:30` quince. [Lecturas de matriz](../../implementations/figma/root-families-2026-11-11/) sin discrepancias. File Upload conserva los seis estilos y rangos de texto, enlaces, dos reacciones propias, seis Buttons oficiales y un Linear Progress oficial success/large/100%. Los iconos CloudArrowUp, XCircle, CheckCircle, Check y Minus se verificaron por key directamente en Phosphor y por instancia en destino. Checkbox conserva 18 reacciones y la ausencia de transición en disabled. Las capturas de ambos sets se inspeccionaron.

La [prueba consumidora](../../implementations/figma/root-families-2026-11-11/file-upload-checkbox-consumer.readback.json) ejecutó 20 comprobaciones. Checkbox conservó etiqueta larga, alineación a la primera línea y contenido al cambiar selección/estado. File Upload conservó anillo, riel y ancho en 280/500/720 y los cuatro pares de visibilidad. Las dos páginas quedaron con un maestro por familia. P-SLOTS NOT_APPLICABLE. Reproducción interactiva nativa NOT_RUN. El contraste de File Upload conserva la excepción documentada en el contrato fuente.

Web PASS. TypeScript, ocho pruebas Node, exportación Next y recorrido Chrome. Chrome verificó indeterminate a true con Espacio, alternancia y disabled de Checkbox. Verificó selector de archivos nativo por Enter, feedback de rechazo, arrastre con archivo ficticio, riel de confirmación al 100% y disabled. Los archivos de prueba se generaron en memoria. El anfitrión de ejemplo simula la confirmación local, sin transferencias ni servicios.
