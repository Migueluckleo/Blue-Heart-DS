---
contract_schema: sdd-project/0.2
contract_id: FLOATING-ACTIONS-001
name: Floating Actions
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Floating Actions
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/floating-actions.v1.0.0.json
source_data_digest_sha256: 8e9f700d1ced76db172fb15bd03ded0b1ae495c4068b759fb969328f9e8fb294
data_refs: [specs/data/floating-actions.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, DOT-001, BUTTON-001, ICON-BUTTON-001]
---

# Floating Actions · FLOATING-ACTIONS-001

La [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/floating-actions.1.0.0.md.txt) y el [JSON delegado](../data/floating-actions.v1.0.0.json) gobiernan el principal de 1024 × 96. La captura de la raíz vigente muestra dos regiones FILL de 484 con gap central de 8. La norma describe 488 en su referencia histórica. El ancho de región es un resultado del layout, sin valor fijo ni token nuevo.

La región Selection summary reutiliza Dot count/large/neutral, Label y Select all con visibilidad controlada. P-SLOTS REQUIRED. General actions es un Slot horizontal nativo de cardinalidad abierta. Su muestra incluye cuatro Button/text con PlusCircle Light, Divider y Close con Icon Button/ghost y X Light. Todas las acciones están dentro del Slot. El anfitrión aporta contenido, conteo y eventos.

## Guía semántica normativa

Usa Floating Actions para mostrar las acciones aplicables a una selección existente. Carbon reúne las acciones en lote al seleccionar filas. BlueHeart conserva un resumen, una acción opcional de seleccionar todo y una región editable de acciones. [Carbon Data table](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Hay elementos seleccionados | Muestra el conteo y nombra la acción según su efecto sobre la selección. | Ejecutar una acción sobre filas fuera de la selección. |
| Selección de todo el conjunto | Explicita el universo al que aplica y deja que el anfitrión calcule el conteo. | Confundir la página visible con el conjunto filtrado. |
| Muchas acciones o poco ancho | Reduce o reorganiza las acciones desde el anfitrión. | Fijar el número de acciones de la muestra o inferir saltos automáticos. |

## Description exacta

FLOATING-ACTIONS-001 · Usa Floating Actions para acciones sobre elementos seleccionados. Mantén el conteo, nombra las acciones y ajusta General actions al ancho. Evita fijar la cantidad de botones de la muestra. Ficha local Floating Actions / FLOATING-ACTIONS-001.

## Aceptación

Verificar geometría, sombras y bindings, dependencias, textos y Slot desde instancias con cero, uno y más hijos que la muestra. Probar en Chrome selección total, acciones de muestra, cierre y foco controlado por el anfitrión.
