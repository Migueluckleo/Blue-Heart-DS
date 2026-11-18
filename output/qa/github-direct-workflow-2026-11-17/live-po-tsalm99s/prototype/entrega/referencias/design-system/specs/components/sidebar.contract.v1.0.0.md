---
contract_schema: sdd-project/0.2
contract_id: SIDEBAR-001
name: Sidebar
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Sidebar
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/sidebar.v1.0.0.json
source_data_digest_sha256: e987fe7b0aea2ab8cc2c1bda02f366eaab40caaafd83bc39d372ced7a9050005
data_refs: [specs/data/sidebar.v1.0.0.json, specs/data/sidebar-help.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, MENU-ITEM-001, ICON-BUTTON-001]
---

# Sidebar · SIDEBAR-001

El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/sidebar.1.0.0.md.txt), el [JSON de Sidebar](../data/sidebar.v1.0.0.json) y el [JSON del auxiliar](../data/sidebar-help.v1.0.0.json) preservan las dos presentaciones, el control, cuatro Slots y el auxiliar privado de seis fases. Sidebar reutiliza Icon Button ghost/small con los carets oficiales. El auxiliar reutiliza Menu item con Question Light y Fill, su Tooltip y los roles cromáticos del hijo.

## Guía semántica normativa

Usa Sidebar para navegación lateral persistente. Conserva un control accesible para expandir o contraer. El anfitrión define el contenido principal y las opciones inferiores de cada presentación, la altura disponible y la ruta actual. Mantén la ayuda en una ubicación coherente y asigna nombres accesibles a todos los controles iconográficos.

| Situación | Haz | Evita |
|---|---|---|
| Navegación contraída | Conserva nombre por destino y ofrece «Expandir navegación». | Depender de que la persona reconozca cada icono. |
| Menú expandido | Agrupa destinos y ayuda en sus Slots. | Convertir el número de la muestra en un límite. |
| Cambiar presentación | Mantén explícitas las listas que corresponden a cada presentación. | Prometer que el contenido personalizado se sincroniza automáticamente. |

El anfitrión resuelve rutas, permisos, scroll y adaptación móvil. [Carbon UI shell](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-left-panel/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Composición y Slots

P-SLOTS REQUIRED. Collapsed menu items, Collapsed lower options, Expanded menu items y Expanded lower options son Slots nativos independientes. Admiten 0..n sin sincronización entre variantes. Menu item es preferido y los pies conservan el divisor y el auxiliar de ayuda. El Icon Button superior queda expuesto. El auxiliar permanece privado con seis variantes y reacciones propias; su instancia de Menu item suprime el hover heredado para preservar el swap.

## Description exacta

| Set | Description |
|---|---|
| Sidebar | SIDEBAR-001 · Usa Sidebar para navegación lateral persistente. Mantén un control de expansión con nombre accesible. Organiza Menu items y opciones inferiores en los Slots de cada presentación. Evita asumir que se sincronizan. Ejemplo: navegación con ayuda al pie. Ficha local: Sidebar / SIDEBAR-001. |
| __Sidebar/Help | SIDEBAR-001 · Auxiliar privado de ayuda. Reutiliza Menu item y Question oficial para conservar el glyph y su color entre estados. Consúmelo desde el pie de Sidebar. Ficha local: Sidebar / SIDEBAR-001. |

## Aceptación

Verificar cuatro Slots, composición inicial, inserción, retirada y reordenamiento, independencia de presentaciones, botón vinculado, anchos, divisor y seis fases de ayuda. En web comprobar cambio controlado, nombres, teclado, y contenido independiente. Registrar los límites de reproducción nativa.
