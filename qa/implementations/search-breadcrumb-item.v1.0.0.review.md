# QA de implementación · Search, Breadcrumb item y Breadcrumb

2026-11-11 · SEARCH-001, BREADCRUMB-ITEM-001 y BREADCRUMB-001 v1.0.0. [QA de Search y eslabón](../contracts/search-breadcrumb-item.v1.0.0.review.md) · [QA de Breadcrumb](../contracts/breadcrumb.v1.0.0.review.md).

Figma PASS. [Lecturas independientes](../../implementations/figma/root-families-2026-11-11/) verificaron 15 variantes Search `47:73`, 13 Breadcrumb item `47:130` y cinco Breadcrumb `50:138`, con cero discrepancias. Se comprobaron Description, guías, bindings, tipografía, geometría y Phosphor por key. Breadcrumb conserva 18 instancias expuestas del eslabón, el Back oficial, un solo actual final y las cinco cantidades observadas. Search conserva sus reacciones almacenadas. Las tres capturas se inspeccionaron.

La [prueba consumidora](../../implementations/figma/root-families-2026-11-11/search-breadcrumb-consumer.readback.json) verificó 25 controles. Search conservó Placeholder y Value independientes, truncamiento y anillo en 136/260/768. Breadcrumb item redimensionó su anillo con Label y omitió el separador en current. Breadcrumb conservó la cantidad, eslabones expuestos y actual final en todas sus variantes. Show back retiró 24 px. Las páginas quedaron con los maestros de cada familia. P-SLOTS NOT_APPLICABLE según los contratos. Reproducción interactiva nativa NOT_RUN.

Web PASS. TypeScript, ocho pruebas Node, exportación Next y Chrome local. Search conservó «Muñoz Ñandú» al enviar con Enter y devolvió el foco al limpiar. Breadcrumb item probó Inicio, overflow por teclado y página actual sin enlace. Breadcrumb probó enlace al padre, exposición y cierre con Escape, restauración de foco y retorno compacto. Las consultas y rutas son datos locales de demostración.
