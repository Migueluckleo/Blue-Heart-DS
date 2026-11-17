---
contract_schema: sdd-project/0.2
contract_id: CHECKBOX-001
name: Checkbox
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Checkbox
figma_page_id: "42:2"
target_node_ids: ["42:30"]
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/checkbox.v1.0.0.json
source_data_digest_sha256: 938e096280e8bf6890394c518181f6e4785bed7114f3a491a22c87204d1f0b5a
data_refs: [specs/data/checkbox.v1.0.0.json, specs/data/checkbox.label-position.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Checkbox · CHECKBOX-001

El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/checkbox.1.0.0.md.txt) y el [JSON delegado](../data/checkbox.v1.0.0.json) conservan las 15 combinaciones originales selected × state, Label, Show label, Control, Box, foco y las marcas Check y Minus de Phosphor. P-SLOTS NOT_APPLICABLE por anatomía fija. La región de etiqueta crece hasta el límite observado de 320 px y se alinea a la primera línea.

## Variantes y posición del label

Por solicitud del usuario del 17 de noviembre de 2026, el label se puede colocar a la izquierda o a la derecha del control. En Figma, `label position=right/left`. En React, `labelPosition="right"/"left"`. El valor predeterminado es `right`. La posición se aplica si `Show label` o `showLabel` está activo. `Label` y `Show label` conservan sus propiedades.

Los tres valores de selección y cinco estados ofrecen ambas posiciones, para un total de 30 variantes. La etiqueta izquierda se coloca antes del Control; el espacio entre ambos usa el mismo token `checkbox/spacing/label-gap`. Se conserva la alineación superior y el límite de texto de 320 px. La posición carece de efectos sobre la selección, el nombre accesible o la validación. El foco y el clic sobre la etiqueta operan la misma casilla. En web, la entrada conserva su posición en el DOM y el label cambia de posición visual dentro del elemento `label`. `Show label` y `showLabel` son `false` por defecto. [Mapa de las 30 variantes](../data/checkbox.label-position.v1.0.0.json) · [Lectura y QA](../../implementations/figma/checkbox-label-position-2026-11-17/readback.json).

## Guía semántica normativa

Usa Checkbox para elecciones independientes y acciones sobre varios elementos. Expresa la opción con una etiqueta afirmativa y concreta. El anfitrión calcula el estado indeterminado si una parte del grupo está seleccionada. Al activar la casilla indeterminada, la selección pasa a true. El anfitrión controla el valor y la validación.

| Situación | Haz | Evita |
|---|---|---|
| Preferencias independientes | Permite marcar varias opciones. | Usar Checkbox para exigir una sola respuesta. |
| Selección de filas | Usa indeterminado si solo algunas filas aplicables están seleccionadas. | Convertir mixed en una preferencia independiente. |
| Aceptación requerida | Explica el error junto a la casilla y asocia su texto al control. | Preseleccionar consentimiento o depender del rojo. |

Conserva un nombre accesible cuando se oculta Label. La casilla nativa se activa con Espacio. Describe error y motivo de indisponibilidad cerca del control. [W3C Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) · [Atlassian Checkbox](https://atlassian.design/components/checkbox/usage)

## Description exacta

CHECKBOX-001 · Usa Checkbox para opciones independientes y selección en lote. Elige label position left o right para ubicar la etiqueta. Conserva un nombre accesible al ocultarla y explica los errores.

## Aceptación

Verificar 30 variantes y las dos posiciones de etiqueta, 29 variables, estilo, propiedades, IDs, reacciones y dos iconos Phosphor vinculados. Comprobar texto largo, foco, inercia disabled y alternancia. En web comprobar nombre, selección parcial, teclado y mensajes asociados.
