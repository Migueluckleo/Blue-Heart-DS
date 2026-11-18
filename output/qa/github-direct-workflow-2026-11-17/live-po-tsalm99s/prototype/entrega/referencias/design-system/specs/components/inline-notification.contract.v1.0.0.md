---
contract_schema: sdd-project/0.2
contract_id: INLINE-NOTIFICATION-001
name: Inline Notification
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Inline Notification
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/inline-notification.v1.0.0.json
source_data_digest_sha256: 3a7579f36f020e1f8242673fc39cb371aff6336e75df15c70942e523681b04ea
data_refs: [specs/data/inline-notification.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, ICON-BUTTON-001]
---

# Inline Notification · INLINE-NOTIFICATION-001

La [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/inline-notification.1.0.0.md.txt) y el [JSON delegado](../data/inline-notification.v1.0.0.json) gobiernan neutral, info, success, warning y error. Los indicadores oficiales son Confetti Regular e Info, CheckCircle, Warning y XCircle Fill. El cierre usa Icon Button/ghost small y X Light. Title, Description y cuatro controles de visibilidad conservan su API. P-SLOTS NOT_APPLICABLE por anatomía fija.

El ancho de referencia es 602, con mínimo 320 y altura adaptable. Description conserva un rango normal y otro semibold subrayado con color temático. El rango fuente carece de destino. El anfitrión proporciona el enlace funcional si aplica. El indicador Warning conserva la excepción de contraste fuente de 2.962:1.

## Guía semántica normativa

Usa Inline Notification junto al contenido afectado. Carbon sitúa el mensaje cerca de su contexto. W3C WAI reserva el anuncio de alerta para mensajes importantes que requieren atención oportuna. BlueHeart usa status para neutral, info y success, y alert para warning y error. [Carbon Notification](https://www.carbondesignsystem.com/building-blocks/core/components/notification/guidelines) · [W3C WAI Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

| Situación | Haz | Evita |
|---|---|---|
| Actualización informativa | Explica qué pasó y qué puede hacer la persona. | Depender solo del glyph o del color. |
| Error aún activo | Mantén visible el mensaje y omite el cierre cuando deba resolverse primero. | Descartar el mensaje automáticamente. |
| Enlace de detalle | Proporciona un destino real y un texto comprensible. | Tratar el subrayado Figma como enlace configurado. |

## Description exacta

INLINE-NOTIFICATION-001 · Usa Inline Notification para explicar un estado junto al contenido afectado. Elige el tipo según gravedad y decide desde el anfitrión cuándo se cierra. Evita depender solo del color. Ficha local Inline Notification / INLINE-NOTIFICATION-001.

## Aceptación

Verificar cinco variantes, siete propiedades, rangos, glyphs, cierre, visibilidades y ancho adaptable desde instancias. Probar en Chrome anuncio, foco, cierre, enlace y contraste de Warning.
