---
contract_schema: sdd-project/0.2
contract_id: CHAT-SIDEBAR-001
name: Chat Sidebar
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Chat Sidebar
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "258:3325"
target_node_ids: ["258:3326"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/tokens/chat-sidebar.v1.0.0.json
source_data_digest_sha256: b28c5fcdb307ce1feb81401ccdb7397fe30b1598820d4b7fbe566864f9b77d80
data_refs: [specs/tokens/chat-sidebar.v1.0.0.json, specs/data/chat-sidebar.assets.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, CHAT-TOOL-ITEM-001, CHAT-HISTORY-ITEM-001, CHAT-SIDEBAR-SECTION-001, CHAT-PLAN-USAGE-001, ICON-BUTTON-001, DROPDOWN-MENU-001, LOGOS-001]
---

# Chat Sidebar · CHAT-SIDEBAR-001

## Propósito y anatomía

Panel lateral de herramientas de chat. Las vistas son Chats, Indicadores, Papeles de trabajo y Vinculaciones. Cada vista tiene un panel de 264 px y un rail de referencia de 79 px. El panel presenta título, búsqueda y cierre, atajos y contenido. El rail presenta cuatro Icon Button ghost large, con la vista actual seleccionada, y el indicador compacto de plan. El alto de 791 px es la referencia de Figma. El anfitrión controla selección, acciones, enlaces y los datos visibles. El Slot Content permite añadir, quitar, sustituir y reordenar secciones dentro del panel. El título y las acciones deben conservar el ancho disponible de su región. El Scrollbar nativo de Dropdown se reutiliza en tres especímenes Figma. Web usa el scroll del contenedor.

## Variantes y estados

En Figma hay nueve combinaciones. Las cuatro vistas existentes se ofrecen en Panel y Rail. `View=none, Mode=Rail` (258:2500) deja sin selección los cuatro Icon Button ghost large y mantiene el plan compacto. `View=Chats, Mode=Rail` (283:8726) conserva seleccionado el botón de Chats. La composición inicial de Playground usa el Rail sin selección. Las otras cinco composiciones muestran un Rail con selección y su Panel asociado. [Layouts verificados](../../implementations/figma/chat-playground-2026-11-13/README.md).

En React, `mode="rail"` admite `view="none"` para mostrar los cuatro botones sin selección. Cada botón sigue emitiendo su vista en `onViewChange`. El panel requiere una vista activa. El ejemplo abre con el Rail sin selección y vuelve a ese estado al cerrar el panel. El tamaño de referencia del Rail es 79 × 791 px. [Verificación en Figma](../../implementations/figma/chat-sidebar-rail-parity/readback.json).

## Mapa de componentes

| Región | Maestro Figma | Export web | Punto de composición |
| --- | --- | --- | --- |
| Atajos y carpetas | [Chat Tool Item](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=257-465) | `ChatToolItem` | Icono intercambiable, caret opcional y Extra actions |
| Fijados y recientes | [Chat History Item](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=257-498) | `ChatHistoryItem` | Slots Title y Actions, con metadato de actualización |
| Agrupación de filas | [Chat Sidebar Section](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=257-587) | `ChatSidebarSection` | Slot Items dentro de Content |
| Indicador de plan | [Chat Plan Usage](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=257-621) | `ChatPlanUsage` | Compact en el rail, Expanded disponible por separado |
| Acciones y vistas | [Icon Button](icon-button.contract.v1.0.0.md) | `IconButton` | Ghost small para acciones y ghost large para el rail |
| Scroll del panel | [Dropdown Menu](dropdown-menu.contract.v1.0.0.md) | Scroll del navegador | Desplazamiento de Content |
| Marca | [Logos](logos.contract.v1.0.0.md) y glyph de Vinculaciones | SVG del manifiesto | Logo Contabilidad y glyph de marca verificados |

## Tokens y composición

El [mapa delegado](../tokens/chat-sidebar.v1.0.0.json) da a cada maestro sus roles y aliases para los cuatro temas. Los controles oficiales conservan sus variables. El panel y sus átomos usan Fill en las regiones variables. Se conservan los glyphs Phosphor y el arte de marca verificado.

## Guía semántica normativa

Usa el rail para cambiar de vista y el panel para mostrar acciones y listas de esa vista. Mantén visibles la selección y los nombres de acción.

## Description exacta

Chat Sidebar · CHAT-SIDEBAR-001. Usa el rail para cambiar de vista y el panel para mostrar acciones y listas de esa vista. Mantén visibles la selección y los nombres de acción.

## Aceptación

Verifica bindings y dependencias, variantes, edición de Slots donde aplican, ancho Fill en las regiones del panel, y uso por teclado en web. Comprueba que los átomos se consuman mediante instancias o imports de los exports declarados.

## Procedencia

[Playground](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=203-93) · [Lectura estructurada](../../sources/figma-snapshots/chat-sidebar-2026-11-13/selection.json).
