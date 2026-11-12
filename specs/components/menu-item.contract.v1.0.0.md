---
contract_schema: sdd-project/0.2
contract_id: MENU-ITEM-001
name: Menu item
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Sidebar
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/menu-item.v1.0.0.json
source_data_digest_sha256: 643cab489d2bbee5772fca082edeb7ead17159101978cc7144ba853540cbdf70
data_refs: [specs/data/menu-item.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, TOOLTIP-001]
---

# Menu item · MENU-ITEM-001

El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/menu-item.1.0.0.md.txt) y el [JSON delegado](../data/menu-item.v1.0.0.json) conservan 22 combinaciones válidas de orientación, presentación, estado y selección. Los iconos Fill y Light reutilizan HouseLine oficial, y el icono derecho reutiliza CaretDown. Collapsed compone Tooltip right/center/simple con tamaño natural y anclaje inicial centrado, según REQ-TOOLTIP. El JSON conserva las cajas originales para trazabilidad. Su Label propio se edita de forma independiente. El BETA fijo y Show beta se aplican a los tres estados verticales activos expandidos. La anatomía fija y las propiedades acotadas justifican P-SLOTS NOT_APPLICABLE.

## Guía semántica normativa

Usa Menu item para un destino o un control que despliega una rama en la navegación. Conserva el nombre accesible cuando el riel colapsado oculta Label. Usa Tooltip para orientación adicional. Marca como activo el destino actual o la rama que contiene la página actual según el contexto del anfitrión. El anfitrión resuelve rutas, permisos, jerarquía y colisiones de Tooltip.

| Situación | Haz | Evita |
|---|---|---|
| Riel colapsado | Conserva «Inicio» como nombre accesible y alinea la ayuda con el icono. | Depender de Tooltip como único nombre. |
| Rama con submenú | Usa un botón que expone expanded y conserva la navegación como enlaces. | Usar roles de menú de aplicación para una navegación de sitio. |
| Destino actual | Identifica la página actual con aria-current y mantiene el estado visible. | Marcar como página actual todas las ramas activas. |

Los aliases temáticos y estados se conservan. BETA mantiene su gradiente original y su contraste limitado documentado. [Carbon UI shell](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-left-panel/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Description exacta

MENU-ITEM-001 · Usa Menu item para destinos y ramas de navegación. Conserva un nombre accesible cuando se colapsa y usa Tooltip como ayuda complementaria. Indica la página actual y el estado de expansión. Evita inferir rutas o depender del icono. Ejemplo: Inicio en el riel colapsado. Ficha local: Menu item / MENU-ITEM-001.

## Aceptación

Verificar matriz, variantes, estilos, paths, gradiente y sus variables, swaps Phosphor, Label y Show beta, Tooltip enlazado y reacciones. En web verificar navegación, apertura de una rama por teclado, foco y anuncio de página actual.
