---
contract_schema: sdd-project/0.2
contract_id: TOOLTIP-001
name: Tooltip
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Tooltip
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/tooltip.v1.0.0.json
source_data_digest_sha256: cfaf4ad606aea68d40b381693459d2675283b34c5733afda09fd59e6737f3bd0
data_refs: [specs/data/tooltip.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Tooltip · TOOLTIP-001

El [JSON delegado](../data/tooltip.v1.0.0.json) conserva el set fuente `708:157`, sus 24 variantes placement × arrow × type, 19 variables, tres estilos de texto y la sombra compartida. El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/tooltip.1.0.0.md.txt) gobierna anatomía y límites. Body, Title, Label y flecha propia componen una anatomía fija. Las propiedades de texto acotadas justifican P-SLOTS NOT_APPLICABLE.

## Guía semántica normativa

Usa Tooltip para ayuda breve y complementaria sobre un control que recibe foco. En simple, usa una frase corta. En rich, usa un título corto y una descripción de hasta dos líneas como guía de autoría. El texto puede crecer. Mantén la ayuda indispensable visible en la página. El anfitrión gestiona el anclaje, la colisión con bordes y el acceso en pantallas táctiles.

| Situación | Haz | Evita |
|---|---|---|
| Acción mediante icono | Muestra «Ver historial» junto a un control que conserve nombre accesible. | Usar una burbuja como único nombre del control. |
| Ayuda adicional | Resume en rich qué actividad muestra un panel. | Repetir el texto visible del disparador. |
| Error o condición de bloqueo | Pon la explicación junto al control afectado. | Ocultar una condición necesaria para continuar dentro de Tooltip. |

El anfitrión abre con foco o después de unos 300 ms de hover, conserva el foco del disparador y permite cerrar con Escape. La burbuja es texto sin controles. Usa `role=tooltip` y `aria-describedby` cuando corresponda. El anfitrión elige el placement que cabe. [Atlassian Tooltip](https://atlassian.design/components/tooltip/usage) · [W3C Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

## Description exacta

TOOLTIP-001 · Usa Tooltip para ayuda breve y complementaria al pasar el puntero o enfocar un control. Elige simple o rich y la colocación que quepa. Conserva un disparador con nombre accesible y salida con Escape. Evita acciones dentro de la burbuja o información imprescindible. Ejemplo: Ver historial. Ficha local: Tooltip / TOOLTIP-001.

## Aceptación

Conservar 24 combinaciones, Label compartida, Title solo rich, cuatro direcciones del path vectorial, sombra común y geometría observada. Body conserva máximo 240 px, tipografía vinculada, espaciados y crecimiento por texto. Comprobar IDs, bindings, estilo, propiedades, path, layout y captura representativa. Validar en web foco, Escape y asociación de la descripción con un disparador de ejemplo. El demo host fuente se excluye del maestro de destino.
