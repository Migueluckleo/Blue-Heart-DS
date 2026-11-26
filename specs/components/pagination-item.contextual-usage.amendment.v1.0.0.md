---
contract_schema: sdd-project/0.2
contract_id: PAGINATION-ITEM-001
amendment_id: PAGINATION-ITEM-CONTEXTUAL-USAGE-001
name: Pagination item · Uso contextual
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-25
base_contract: specs/components/pagination-item.contract.v1.0.0.md
applies_to: [PAGINATION-ITEM-001]
pattern_ids: [TABLE-PAGINATION-001]
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/tables-contextual-usage.approval.2026-11-25.json
supersedes_scope: Añade contexto y teclado; conserva nueve variantes, geometría y API
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Pagination item · Guía contextual

Lee [base](pagination-item.contract.v1.0.0.md), [Pagination](pagination.contextual-usage.amendment.v1.0.0.md) y [patrones](../patterns/tables-pagination-selection.amendment.v1.0.0.md). P-SLOTS NOT_APPLICABLE por anatomía fija.

## Guía semántica normativa

| Tipo | Intención | Estados fuente |
|---|---|---|
| Page | Navegar a un número. | default, hover, selected, focus |
| Icon | Primera, anterior, siguiente o última. | default, hover, focus, disabled |
| Ellipsis | Secuencia omitida. | default |

**PAGITEM-CURRENT-01.** Una sola página actual con selected y aria-current=page. Selected comunica posición, Focus comunica navegación de teclado y no se confunden. El anillo web puede acompañar a la página actual; no crea una décima variante Figma. No inventar Page disabled, Icon selected, pressed, loading o error.

**PAGITEM-NAME-01.** Cada flecha nombra su dirección y el anfitrión aporta destino/disponibilidad. Deshabilitar solo destinos imposibles: primera/anterior al inicio, siguiente/última al final. Ellipsis es texto no interactivo, sin foco ni clic; no abrir un menú de páginas por inferencia de los puntos.

**PAGITEM-GEOMETRY-01.** Page crece para números largos, con mínimo y alto 32 px. Icon/Ellipsis conservan 32 × 32; carets Phosphor Outline Light de 16. El foco tiene anillo exterior de 2 px con separación visible; no recortarlo al cambiar Label ni copiar el stroke interior de Table Cell. El anfitrión/touchTargets puede ampliar el objetivo táctil a 44 conservando receta visual. No prometer comodidad táctil universal por la superficie de muestra.

**PAGITEM-KEYBOARD-01.** Usar Tab/Shift+Tab y Enter/Espacio de botón; no roving focus de Tabs ni selección con flechas. No atribuir una carga completada al clic. Conservar nombres, extremos y foco al cambiar lote.

## Description exacta

PAGINATION-ITEM-001 · Page navega a un número, Icon indica dirección y Ellipsis omite una secuencia sin interacción. Una página actual; Focus de teclado independiente de selected. Conserva matriz y geometría; nombra flechas y deshabilita solo extremos sin destino.

## Aceptación

Verificar nueve variantes, números largos, foco sin recorte, aria-current único, nombres y elipsis fuera del recorrido. La evidencia web del PDF no acredita cambios nuevos de Figma. [Aprobación](../../sources/inventories/tables-contextual-usage.approval.2026-11-25.json).
