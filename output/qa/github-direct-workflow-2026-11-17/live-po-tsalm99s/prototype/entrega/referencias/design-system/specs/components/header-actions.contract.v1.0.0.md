---
contract_schema: sdd-project/0.2
contract_id: HEADER-ACTIONS-001
name: Header actions
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Header
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/header-actions.v1.0.0.json
source_data_digest_sha256: 3e82dd48a7972752ee6d662cdf7f63dbe7a3e456d8e5d1a4d89bf764026c4713
data_refs: [specs/data/header-actions.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, ICON-BUTTON-001]
---

# Header actions · HEADER-ACTIONS-001

El [contrato fuente v2.0.0](../../sources/figma-snapshots/root-families-2026-11-11/header-actions.2.0.0.md.txt) y el [JSON delegado](../data/header-actions.v1.0.0.json) gobiernan su composición. Conserva cinco composiciones actions 5/4/3/2/1 con grupos observados. Los wrappers alojan Icon Button ghost/large y el contador de Notificaciones reutiliza Dot mediante el botón. El glyph de Bell hereda el rol oficial cuando la raíz conserva el mismo color como literal. Cada variante conserva su lista fija. P-SLOTS NOT_APPLICABLE por composición fija según la variante y controles acotados.

## Guía semántica normativa

Usa Header actions para acciones globales con nombre accesible. Selecciona la variante con el conjunto previsto por el contrato. El anfitrión suministra destinos y número de notificaciones.

| Situación | Haz | Evita |
|---|---|---|
| Cuatro acciones | Conserva Sincronizar, Soporte, Aplicaciones y Notificaciones. | Tomar los primeros cuatro de la lista de cinco. |
| Notificaciones | Usa el Dot vinculado y comunica el conteo accesiblemente. | Convertir el contador de muestra en un dato de producto. |
| Acciones globales | Nombra cada acción por su intención. | Usar el nombre de la librería de iconos como etiqueta. |

[Carbon UI shell header](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-header/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Description exacta

HEADER-ACTIONS-001 · Usa Header actions para los conjuntos de acciones globales definidos. Mantén Icon Button oficial y nombra cada acción. El anfitrión aporta los destinos y el conteo. Evita tomar los primeros N de la variante de cinco. Ficha local: Header actions / HEADER-ACTIONS-001.

## Aceptación

Verificar conjuntos, wrappers, glyphs, Dot e identidad de Icon Button. En web comprobar nombres, activación y 99+.
