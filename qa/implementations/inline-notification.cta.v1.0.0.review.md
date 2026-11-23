# QA · Inline Notification · CTA opcional

2026-11-23 · IMPLEMENTATION_REVIEW PASS para Figma y web. Contrato INLINE-NOTIFICATION-001-CTA v1.0.0, DELEGATED_FOR_BUILD; user_audit NOT_REQUIRED, human_review_policy OPTIONAL_NON_BLOCKING. P-SLOTS NOT_APPLICABLE: un único botón opcional fijo, sin región de cardinalidad abierta.

## Resultado y trazabilidad

La [enmienda](../../specs/components/inline-notification.cta.amendment.v1.0.0.md) y sus [datos canónicos](../../specs/data/inline-notification.cta.v1.0.0.json) implementan la solicitud explícita: CTA opcional, apagado por defecto, Button Secondary al activarlo. Se actualizó el [contrato base](../../specs/components/inline-notification.contract.v1.0.0.md), su Description normativa, código, ficha y galería. La decisión derivada de usar small debajo del mensaje queda documentada.

| Requisito | Resultado | Evidencia |
|---|---|---|
| REQ-CTA-01 · Apagado por defecto | PASS | Show CTA#581:0 BOOLEAN false; showCta=false en React. Sin botón web ni espacio reservado. |
| REQ-CTA-02 · Secondary oficial | PASS | Cinco instancias nativas de Button/secondary small/default 23:853; web compone Button secondary/small. |
| REQ-CTA-03 · Acción independiente | PASS | La activación web no retira el aviso; enlace y cierre conservan sus efectos. |
| REQ-CTA-04 · Preservación | PASS | Siete propiedades previas idénticas, cinco ID/key, 41 nodos anteriores con bindings, referencias, contenido, estilos y medidas iguales. |

## Figma

[Maestro](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=122-274): set 122:274, key 7015680d121d3f5d709db132375826a019133a09, página única Inline Notification 122:49. La página conserva solo su set. Las variantes 122:53, 122:132, 122:189, 122:203 y 122:260 mantienen identidades y cinco tipos. El set tiene ocho propiedades; las siete anteriores conservan nombres, IDs, tipos y defaults. Description del set y de las cinco variantes coincide con el contrato base.

El nuevo Body vertical agrupa el Text original y el Button; usa Fill horizontal, Hug vertical, gap inline-notification/spacing/content=16 y padding none. Text vuelve a Fill horizontal/Hug vertical tras el cambio de padre. Las cinco CTA están ocultas por default, vinculadas a Show CTA#581:0 y expuestas como instancias anidadas para editar Label. La dependencia sigue en Buttons; no hay nuevos maestros, sets o tokens.

[Muestra editable de Playground](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=582-9751): default apagado, cinco tipos encendidos y caso de 320 px con descripción de 104 caracteres. El default conserva 602×76; los cinco encendidos miden 602×124 y el caso estrecho 320×204. Apagar el CTA desde una instancia restaura 76 px. Se modificó el Label a «Revisar ahora», se recorrieron los cinco tipos y se conservó el override, la visibilidad y la exposición. Ocultar Description no oculta CTA. La prueba restableció tipo neutral y label «Ver detalles».

TOKEN-QA-01/03 PASS: 56 tokens consumidos por los principales y dependencias, todos de component, scopes vacíos y cadenas a semantic y primitives válidas en Contable, Administrativo, Servicios y Personas. Lectura global: 1,531 variables, 57 Body visibles compatibles y cero variables visibles fuera de body/ en component. No se escribieron variables. Se conservan los rangos Regular/SemiBold subrayado de Description y sus bindings 13:20/13:24. Warning conserva su excepción histórica 2.962:1; este QA no la certifica como AA.

La revisión visual final pasó sobre la muestra 666×1292. El primer montaje reveló que reubicar Text cambiaba sus ejes de Fill/Hug: se corrigió y se comprobó su equivalencia con la geometría previa. El override de texto mixto de la muestra larga quedó inicialmente sin fill en la operación MCP; se restableció su estilo compartido inline-notification/description y sus bindings de fuente/color desde componente. La lectura posterior y la segunda captura verifican texto legible sin recorte. Los principales y sus rangos permanecen intactos. Dos consultas de lectura superaron el límite de respuesta y se repitieron con payload compacto; no comprometieron escrituras de canvas.

## Web

API aditiva: showCta=false, ctaLabel="Ver detalles" y onCta. El anfitrión aporta la función; no se inventan operación remota ni cierre automático. El Button queda fuera del nodo de texto con role status/alert, mantiene nombre visible y recibe teclado/clic nativos. El componente conserva showDismiss/onDismiss y el enlace como partes independientes.

`pnpm ds:generate` y `pnpm verify` PASS: 51 familias, cero derivados desactualizados, TypeScript, 17/17 pruebas y build estático. Dos pruebas verifican default, receta, independencia de visibilidades y contenido vacío. TOKEN-QA-02 PASS en ds:check; el nuevo contenedor consume spacing de Inline Notification y el Button conserva su receta de componente.

Chrome PASS en cinco tipos y cuatro temas: CTA secondary/small de 32 px, gap de Body 16 px, separación de texto 4 px y alineación con el texto. Encender agrega 48 px; apagar restaura todas las alturas previas. Se ejecutaron 28 activaciones reales de clic/Enter/Espacio sin descartar las notificaciones; cierre y enlace mantienen su efecto, y el cierre devuelve foco al restaurador. Los cinco casos pasan a 320 px sin desbordes y con botón dentro de límites. El mensaje informativo crece al envolver su contenido. Cero errores de página y solicitudes externas bloqueadas. Capturas ancha y estrecha revisadas visualmente.

## Evidencia y coordinación

- [QA documental](../contracts/inline-notification.cta.v1.0.0.review.md).
- [Estado Figma previo](../../implementations/figma/inline-notification-cta-2026-11-23/before.json), [mutación](../../implementations/figma/inline-notification-cta-2026-11-23/mutation.json), [lectura posterior](../../implementations/figma/inline-notification-cta-2026-11-23/after.json), [tokens por modo](../../implementations/figma/inline-notification-cta-2026-11-23/tokens.json), [prueba desde instancia](../../implementations/figma/inline-notification-cta-2026-11-23/consumer-qa.json) y [validación final](../../implementations/figma/inline-notification-cta-2026-11-23/validation-final.json).
- Evidencia local `output/qa/inline-notification-cta-2026-11-23/`: logs, chrome.json, figma-final.png, web-wide.png y web-320.png. Los datos históricos inline-notification.v1.0.0.json conservan SHA-256 3a7579f36f020e1f8242673fc39cb371aff6336e75df15c70942e523681b04ea. Datos CTA SHA-256 7d30558169bcdbf93b5fbbacea1338b158aee51820b7622d444316c0df1d7690.

Las guías canónicas de Figma y PO incluyen el default, dependencia, propiedades y pruebas de esta enmienda. No se instalan ni se crean variantes de la PO universal ni se modifican snapshots cerrados. La frescura derivada de Graphify/catálogo y el push se verifican por separado: por solicitud del usuario, el chat **Verificar Graphify actualizado** recibe este corte para completar el cierre coordinado `2026-11-23-inline-notification-cta`, comprobar conexiones/hashes y notificar después al chat **Estado de Github**. Este PASS del componente no afirma un push ni anticipa el resultado de esa verificación. Sin publicación de biblioteca ni instalación.
