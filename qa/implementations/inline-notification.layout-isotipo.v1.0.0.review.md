# QA · Inline Notification · CTA derecho e Isotipo

2026-11-23 · IMPLEMENTATION_REVIEW PASS en Figma y web. Contrato INLINE-NOTIFICATION-001-LAYOUT-ISOTIPO v1.0.0 DELEGATED_FOR_BUILD; user_audit NOT_REQUIRED, human_review_policy OPTIONAL_NON_BLOCKING. Sustituye el layout vertical del QA CTA inicial; ese resultado permanece histórico. Sin publicación de biblioteca ni instalación.

## Alcance verificado

La [enmienda vigente](../../specs/components/inline-notification.layout-isotipo.amendment.v1.0.0.md) aplica la referencia del usuario [589:81](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=589-81): CTA a la derecha del Body, alineado con el borde inferior del texto. Añade la alternativa Logo Isotipo ≤32×32 sin deformación. Se conservan Show CTA=false, Secondary small, edición del label y comportamiento independiente de enlace/cierre.

| Control | Resultado | Evidencia |
|---|---|---|
| REQ-RIGHT-01/02 | PASS | Text Fill/Hug absorbe espacio, Body horizontal/Hug y gap 16; CTA Hug a la derecha y alineación inferior exacta. Apagado no reserva ancho. |
| REQ-ISOTIPO-01 | PASS | Ícono default de 24 px de cada tipo; Show icon controla ambos modos. |
| REQ-ISOTIPO-02/03 | PASS | 21 swaps desde instancia, ambas dimensiones ≤32, ratio preservado, cero overrides de pintura y fuentes locales oficiales. |
| REQ-WEB-01 | PASS | imagen isotipo={src,alt}, contain, límite tokenizado, cinco tipos/cuatro temas y activos oficiales de muestra. |
| Preservación | PASS | Ocho propiedades principales sin cambios, cinco tipos/ID/key y 21 maestros Logos intactos; referencia del usuario conservada. |

## Figma

Set principal 122:274, key 7015680d121d3f5d709db132375826a019133a09, página Inline Notification 122:49. Las cinco variantes conservan sus ID/key y sus medidas de default sin CTA, 602×76. Description del set y de los cinco componentes coincide con la nueva guía normativa. La referencia 589:81 conserva posición 2393/352 y tamaño 804×76; es el frame fuente aportado por el usuario y no se borró ni modificó.

Dos dependencias internas en la misma familia: `Inline Notification / Indicator` 595:571 (source=icon/isotipo, swaps Icon/Isotipo) y `Inline Notification / Isotipos` 595:36 (21 productos). No se creó una familia pública ni un export web independiente. Los maestros oficiales Logos permanecen en Logos. Los cinco antiguos nodos internos Icon fueron reemplazados por instancias Indicator; la mutación registra su correspondencia. Las propiedades, textos, CTA y cierre principales conservan sus identidades. P-SLOTS NOT_APPLICABLE: indicador reemplazable y CTA fijo único, sin cardinalidad abierta.

El modo y sus swaps se editan desde Indicator expuesto. Frames de visibilidad separan Icon container e Isotipo container: la sustitución del hijo no puede superponer ambas alternativas. Los cinco íconos conservan sus roles de color `inline-notification/color/icon/<tipo>` y glyphs originales. Warning mantiene su excepción cromática fuente; no se recoloreó para certificar AA. El arte de marca mantiene sus fills/gradientes y no recibe tokens cromáticos.

Se probaron los 21 productos desde una instancia vinculada: tamaño contenido, ratio y referencia al maestro correctos. Error máximo de ratio 5.8122×10^-8 por precisión de Figma; cero overrides de fills/strokes/effects/opacity. Un Isotipo y el Label «Revisar ahora» se conservaron al pasar por info/success/warning/error/neutral. Show icon=false oculta el indicador sin borrar su selección; volver a true la restaura. Cambiar a icon vuelve a 24 px y oculta el logo; el modo logo usa 32 px. Las pruebas restauraron la muestra neutral y «Ver detalles».

| Caso | Medida observada | CTA |
|---|---|---|
| 804 px, icon o logo, mensaje de muestra | 804×76 | A la derecha; gap 16 y mismo borde inferior del texto |
| 602 px, descripción que envuelve | 602×96 | A la derecha; crece el Body |
| 320 px, Isotipo y descripción de 104 caracteres | 320×408 | A la derecha, dentro del contenedor |

La composición mínima deja una columna de texto estrecha cuando coinciden marca, cierre y CTA. Se verificó ausencia de clipping, no una garantía universal de legibilidad a 320 px. El consumidor debe elegir el ancho según su contenido; no se inventó un breakpoint que vuelva a apilar el CTA debajo. Revisión visual de la muestra Playground 582:9751: PASS.

TOKEN-QA-01/03: nuevo `inline-notification/size/isotipo-max`, VariableID:594:2, apunta a semantic size-3xl VariableID:8:265 y primitive size/3xl VariableID:11:132, valor 32 en cuatro modos. Scopes=[], codeSyntax `var(--inline-notification-size-isotipo-max)` y descripción iguales al JSON. El origen canónico usa semantic VariableID:6:239 y primitive VariableID:6:67; targetId permanece separado. No cambian los tokens anteriores. Lectura global posterior: 1,532 variables, 57 Body visibles y cero internos visibles. Solo se añadió el sizing interno. Los helpers consumen roles de componente; los 21 artes Logos permanecen vinculados al maestro sin overrides de pintura.

## Web

CTA row con Text flex y mínimo cero, gap de componente 16 y alineación inferior; Button Secondary small sigue siendo la dependencia oficial. La API añade isotipo opcional: showIcon decide visibilidad; ausencia del objeto conserva glyph; el alt identifica el producto y el mensaje conserva status/alert. El logo no toma foco ni recibe la gravedad por recolor.

Los SVG de Contabilidad (112×115) y XML en línea (156×115) se exportaron de los Isotipos oficiales 171:1574 y 171:1459. El manifiesto registra procedencia, geometría y SHA-256; el generador los copia al destino web. El consumo general de la familia Logos sigue siendo Figma; esta enmienda admite el uso embebido del Isotipo en Notification y no crea React Logos.

`pnpm ds:generate` y `pnpm verify` PASS: 51 familias cubiertas, cero derivados desactualizados, TypeScript, 18/18 pruebas y build estático. TOKEN-QA-02 PASS. Chrome PASS: cinco tipos, cuatro temas, dos proporciones de Isotipo por tema, ambas dimensiones ≤32 y ratio igual al natural. Los íconos y logos se alternan sin superposición. CTA a la derecha, mismo borde inferior del texto y gap 16. 28 activaciones de clic/Enter/Espacio; no descartan el aviso. Cierre, retorno de foco y enlace conservados. Cinco anchos 320 sin desbordes ni errores de página. Capturas ancha y estrecha revisadas.

Se corrigieron durante QA los ejes Fill/Hug de Body tras girarlo, las visibilidades independientes del swap y el color de los íconos heredado por las nuevas instancias. El primer test del image detectó que un máximo porcentual dependía del track; se reemplazó por el límite absoluto tokenizado de 32 px y pasó el QA repetido. Estos fallos están corregidos en el corte final, no se cambiaron los criterios para aceptarlos.

## Evidencia y cierre

- [QA documental](../contracts/inline-notification.layout-isotipo.v1.0.0.review.md), [datos de layout/indicador](../../specs/data/inline-notification.layout-isotipo.v1.0.0.json), [token nuevo](../../specs/tokens/inline-notification.indicator.v1.0.0.json) y [assets](../../specs/data/inline-notification.indicator.assets.v1.0.0.json).
- [Referencia](../../implementations/figma/inline-notification-right-isotipo-2026-11-23/reference.json), [helpers](../../implementations/figma/inline-notification-right-isotipo-2026-11-23/helpers.json), [mutación y mapeo](../../implementations/figma/inline-notification-right-isotipo-2026-11-23/mutation.json), [lectura final](../../implementations/figma/inline-notification-right-isotipo-2026-11-23/after.json), [prueba desde instancia](../../implementations/figma/inline-notification-right-isotipo-2026-11-23/consumer-qa.json) y [validación](../../implementations/figma/inline-notification-right-isotipo-2026-11-23/validation.json).
- Logs, chrome.json y capturas: `output/qa/inline-notification-right-isotipo-2026-11-23/`. Datos del primer CTA y sus snapshots conservados; fuentes técnicas anteriores respaldadas en `/private/tmp/bh-inline-right-before-_pgqiju0`.

Las guías canónicas de Figma y PO, contrato base, enmiendas, ficha y registro describen la disposición corregida. No se instala ni se crea una variante de la PO universal. El chat Verificar Graphify actualizado recibió la corrección y el aviso de no notificar a Github el corte vertical anterior. El nuevo run de cierre es `2026-11-23-inline-notification-right-isotipo`; solo después de COMPLETE_LOCAL/CURRENT debe notificar a Estado de Github para el push. Este QA del componente no anticipa el resultado derivado ni afirma un push.
