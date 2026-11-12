---
contract_schema: sdd-project/0.2
contract_id: CHECKBOX-001
name: Checkbox
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Checkbox
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/checkbox.v1.0.0.json
source_data_digest_sha256: 938e096280e8bf6890394c518181f6e4785bed7114f3a491a22c87204d1f0b5a
data_refs: [specs/data/checkbox.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Checkbox · CHECKBOX-001

El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/checkbox.1.0.0.md.txt) y el [JSON delegado](../data/checkbox.v1.0.0.json) conservan 15 combinaciones selected × state, Label, Show label, Control, Box, foco y las marcas Check y Minus de Phosphor. P-SLOTS NOT_APPLICABLE por anatomía fija. La región de etiqueta crece hasta el límite observado de 320 px y se alinea a la primera línea.

## Guía semántica normativa

Usa Checkbox para elecciones independientes y acciones sobre varios elementos. Expresa la opción con una etiqueta afirmativa y concreta. El anfitrión calcula el estado indeterminado si una parte del grupo está seleccionada. Al activar la casilla indeterminada, la selección pasa a true. El anfitrión controla el valor y la validación.

| Situación | Haz | Evita |
|---|---|---|
| Preferencias independientes | Permite marcar varias opciones. | Usar Checkbox para exigir una sola respuesta. |
| Selección de filas | Usa indeterminado si solo algunas filas aplicables están seleccionadas. | Convertir mixed en una preferencia independiente. |
| Aceptación requerida | Explica el error junto a la casilla y asocia su texto al control. | Preseleccionar consentimiento o depender del rojo. |

Conserva un nombre accesible cuando se oculta Label. La casilla nativa se activa con Espacio. Describe error y motivo de indisponibilidad cerca del control. [W3C Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) · [Atlassian Checkbox](https://atlassian.design/components/checkbox/usage)

## Description exacta

CHECKBOX-001 · Usa Checkbox para opciones independientes y selección en lote. Usa indeterminado si solo algunas filas están seleccionadas. Conserva una etiqueta accesible y explica los errores con texto. Evita preseleccionar consentimiento. Ejemplo: Seleccionar comprobantes visibles. Ficha local: Checkbox / CHECKBOX-001.

## Aceptación

Verificar 15 variantes, 29 variables, estilo, propiedades, IDs, reacciones y dos iconos Phosphor vinculados. Comprobar texto largo, foco, inercia disabled y alternancia. En web comprobar nombre, selección parcial, teclado y mensajes asociados.
