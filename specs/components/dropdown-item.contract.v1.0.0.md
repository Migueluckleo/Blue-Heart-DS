---
contract_schema: sdd-project/0.2
contract_id: DROPDOWN-ITEM-001
name: Dropdown item
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Dropdown
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/dropdown-item.v1.0.0.json
source_data_digest_sha256: 2cd71e5cc4abec7858d87a8413364f1e9f6fd3f99f3a16c3eca682449ea1fc22
data_refs: [specs/data/dropdown-item.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Dropdown item · DROPDOWN-ITEM-001

La [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/dropdown-item.1.0.0.md.txt) y el [JSON delegado](../data/dropdown-item.v1.0.0.json) gobiernan 25 combinaciones. Option tiene siete estados/selecciones por tamaño. Header tiene tres tamaños y Divider solo medium/default/false. Label, Description y Group label son editables. ImageSquare y Check consumen Phosphor Outline Light, con roles cromáticos propios ligados a Label. Description se adapta al ancho de Content conforme al contrato. P-SLOTS NOT_APPLICABLE por posiciones fijas.

Figma conserva las transiciones hover observadas en la raíz vigente. Disabled, Header y Divider no activan una elección. El anfitrión define nombre, opción actual, selección, foco y teclado. El contraste heredado de Description en Hover y Selected queda documentado como excepción.

## Guía semántica normativa

Usa Option para un valor elegible, Header para identificar un grupo y Divider para separar secciones. W3C WAI diferencia las opciones elegibles de los nombres de grupo. Carbon trata las opciones de Dropdown como elecciones del mismo campo. [W3C WAI Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) · [Carbon Dropdown](https://www.carbondesignsystem.com/building-blocks/core/components/dropdown/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Elección con contexto | Usa Label como nombre y Description para un dato complementario. | Usar solo descripción o color para identificarla. |
| Opciones agrupadas | Usa Header o Divider como separadores sin activación. | Incluir encabezados en el recorrido de opciones. |
| Selección y disponibilidad | Muestra Check al seleccionar y mantén Disabled fuera de la elección. | Combinar Selected y Disabled como variante adicional. |

## Description exacta

DROPDOWN-ITEM-001 · Usa Option para una elección, Header para identificar un grupo y Divider para separar. Conserva Label visible y usa Description como contexto. Evita activar encabezados o divisores. Ficha local Dropdown item / DROPDOWN-ITEM-001.

## Aceptación

Verificar matriz, relaciones de color, Phosphor, transiciones almacenadas y crecimiento desde instancias. Probar en web selección, foco, navegación y contraste heredado.
