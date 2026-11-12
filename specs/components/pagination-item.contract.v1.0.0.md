---
contract_schema: sdd-project/0.2
contract_id: PAGINATION-ITEM-001
name: Pagination item
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Pagination
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/pagination-item.v1.0.0.json
source_data_digest_sha256: 9f68f69bfddb40cc2dd5d91361c60110883b4a546783aa3e2220caadf7721fda
data_refs: [specs/data/pagination-item.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Pagination item · PAGINATION-ITEM-001

La [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/pagination-item.1.0.0.md.txt) y el [JSON delegado](../data/pagination-item.v1.0.0.json) gobiernan nueve variantes. Page tiene default, hover, selected y focus. Icon tiene default, hover, focus y disabled. Ellipsis tiene default. Label e Icon son editables según tipo. Los cuatro carets Phosphor Outline Light se seleccionan por swap. La raíz Page ajusta su ancho al texto, con mínimo y alto de 32. Icon y Ellipsis miden 32 × 32. El foco tiene anillo absoluto y las dos reacciones nativas son hover reversible. Solo Selected cambia con el tema. P-SLOTS NOT_APPLICABLE por anatomía fija.

## Guía semántica normativa

Usa Page para navegar a un número, Icon para un extremo o movimiento adyacente y Ellipsis para indicar una secuencia omitida. GOV.UK identifica la página actual con aria-current y da nombres a los controles de dirección. El anfitrión aporta disponibilidad, nombres y destino. [GOV.UK Pagination](https://design-system.service.gov.uk/components/pagination/)

| Situación | Haz | Evita |
|---|---|---|
| Página activa | Identifica la actual con Selected y aria-current. | Marcar varias páginas como actuales. |
| Extremo de la lista | Deshabilita solo las flechas que no tienen destino y dales un nombre. | Usar color como única explicación del extremo. |
| Secuencia omitida | Usa Ellipsis como separador sin foco. | Convertir los puntos en un botón ambiguo. |

## Description exacta

PAGINATION-ITEM-001 · Usa Page para un número, Icon para una dirección y Ellipsis para una secuencia omitida. Identifica la página actual y nombra las flechas. Evita convertir Ellipsis en una acción. Ficha local Pagination item / PAGINATION-ITEM-001.

## Aceptación

Verificar matriz, reacciones, styles, bindings, carets, texto largo y foco desde instancias. En web verificar página actual, nombres, extremos, teclado y Ellipsis sin foco. El anfitrión puede ampliar a 44 px el área táctil.
