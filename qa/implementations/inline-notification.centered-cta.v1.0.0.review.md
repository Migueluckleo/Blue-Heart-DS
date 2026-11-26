# QA · Inline Notification con CTA centrado · 2026-11-26

La solicitud ubica el Secondary entre Content y Dismiss en la misma fila y permite mostrarlo u ocultarlo. Se reutilizó Show CTA con valor inicial false y el Button Secondary small existente. El set conserva las cinco variantes y el nombre editable del botón. [Contrato vigente](../../specs/components/inline-notification.layout-isotipo.amendment.v1.0.0.md).

## Figma · PASS

Set `122:274`. Las cinco variantes tienen Content, CTA y Dismiss en ese orden y centrados verticalmente. Se conservaron IDs, keys, el Button vinculado a `23:853`, la instancia expuesta y la referencia nativa `Show CTA#581:0`. El indicador se centra con el mensaje.

En instancias nuevas, los cinco tipos se probaron a 804, 602 y 320 px. Se comprobaron los gaps de 16, los centros coincidentes, recuperación del ancho al ocultar el CTA y la combinación con Dismiss oculto. Se editó el label y se cambió el tipo conservando visibilidad y label. La lectura geométrica usó un override largo. La captura a 602 px comprobó el texto original con sus dos rangos, el CTA y Dismiss visibles. Se retiraron todas las instancias temporales.

TOKEN-QA. La separación consume `inline-notification/spacing/content` → `spacing-lg` → `spacing/16` en los cuatro temas, con scopes internos vacíos. Las recetas visuales de CTA y Dismiss provienen de las instancias oficiales. [Set en Figma](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=122-274) · [Lectura y medidas](../../implementations/figma/inline-notification-centered-cta-2026-11-26/readback.json).

## Web · PASS

P07 verificó 52 familias y cero derivados desactualizados. TypeScript, 22 pruebas Node y el build estático pasaron. Chrome comprobó los cinco tipos, cuatro temas y 28 activaciones. La fila retira el espacio del CTA al ocultarlo, conserva el centro a 320 px con texto envuelto y admite los isotipos en su proporción. El orden de teclado recorrido fue enlace, CTA y Dismiss. CTA, enlace y Dismiss ejercieron sus acciones de forma independiente. [Chrome](../../output/qa/inline-notification-centered-cta-2026-11-26/chrome.json).
