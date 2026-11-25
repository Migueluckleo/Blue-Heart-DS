---
contract_schema: sdd-project/0.2
contract_id: CHAT-SIDEBAR-001-V1-V2
name: Chat Sidebar · Versiones V1 y V2
type: amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
applies_to: [CHAT-SIDEBAR-001]
amends: CHAT-SIDEBAR-001
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["258:3326", "711:354", "711:328"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/chat-sidebar.v1-rail-panel.v1.0.0.json
source_data_digest_sha256: 6e32a0873288cddac3d361fdffaa9dffd94edb1a6cf1f503850122a14a68f0e8
data_refs: [specs/data/chat-sidebar.v1-rail-panel.v1.0.0.json, specs/tokens/chat-sidebar.v1-rail-panel.v1.0.0.json]
dependencies: [CHAT-SIDEBAR-001, CHAT-TOOL-ITEM-001, CHAT-HISTORY-ITEM-001, CHAT-SIDEBAR-SECTION-001, CHAT-PLAN-USAGE-001, ICON-BUTTON-001]
---

# Chat Sidebar · Versiones V1 y V2

## Selección de versión

La propiedad `Version` se incorpora al [set Chat Sidebar](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=258-3326). `V2` es la opción predeterminada y conserva las nueve combinaciones, los IDs y Content documentados en la [enmienda de navegación](chat-sidebar.rail-item.amendment.v1.0.0.md). `V1` ofrece `View=Chats` en dos modos mutuamente excluyentes.

| Modo V1 | Dimensiones | Anatomía |
| --- | --- | --- |
| Rail | 64 px · Fill en alto | Acceso único a historial en Icon Button Ghost small con icono Chats. Borde izquierdo. |
| Panel | 310 px de referencia · Fill entre 264 y 310 px | Encabezado con cierre, título y búsqueda, Content desplazable con atajos e historial, y Chat Plan Usage Expanded al pie. Borde derecho. |

Coloca V1 en el lateral derecho del anfitrión. Usa un solo modo a la vez: abrir en Rail cambia a Panel, y el control de cierre vuelve a Rail. En Figma ambas acciones usan Change to. Buscar, crear un chat, desplegar carpetas y seleccionar conversaciones dependen del anfitrión. En web el catálogo demuestra callbacks locales y traslada el foco al disparador de la vista resultante. Los controles conservan el foco de marca del átomo.

## Slots y estados

El Slot nativo `Content#258:0` de la familia está presente en los once maestros. En V1 el Rail contiene el acceso único y el Panel contiene el atajo y las secciones de historial. Ambos Slots usan Fill × Fill, gap 32 y padding 0. La composición de ejemplo es editable desde instancia; los grupos reutilizan Chat Sidebar Section e Items. El encabezado y el plan viven fuera de Content para que permanezcan visibles al desplazarse. El título de Panel es editable mediante `History title`, con default «Historial de chats». Cambiar de Mode cambia la región de referencia. No se recomienda reaprovechar el contenido de una región para la otra por el significado distinto de sus controles.

V1 usa Icon Button Ghost small para abrir, cerrar y buscar, con iconos Phosphor Chats, X y MagnifyingGlass. V2 usa Chat Rail Item en su navegación multi-vista y conserva el Dot medium opcional. En V1 el disparador de la referencia no incluye Dot.

## Tokens y geometría

Consulta los [roles y aliases V1](../tokens/chat-sidebar.v1-rail-panel.v1.0.0.json) y el [mapa de las dos variantes](../data/chat-sidebar.v1-rail-panel.v1.0.0.json). Solo el componente consume `chat-sidebar/v1/*`, con aliases a semantic → primitives en Contable, Administrativo, Servicios y Personas. Los scopes quedan vacíos también para los nuevos soportes semánticos y primitivos. Los átomos consumen sus propios tokens salvo los overrides de composición registrados en V1.

Ambos modos usan superficie blanca, borde interior de 1 px y padding 16. Panel usa gap 32 entre regiones, 16 entre grupos, 8 entre filas y en el encabezado. El título es Manrope Bold 16/20. El footer usa la sombra de la referencia con offset 0/4, blur 6 y spread −2. La altura de 775 es de muestra, sin mínimo de maestro. Las cadenas literales y los números de plan de Anticipa son muestras. El ejemplo calcula el porcentaje a partir del consumo: 41 de 150 se muestra como 27 %.

El campo de búsqueda es una acción Icon Button Ghost small con objetivo 32×32. El glifo se centra dentro del botón; la referencia de Anticipa usa un glifo suelto.

## Guía semántica normativa

Usa V1 para abrir y cerrar un historial de chats desde un único acceso a la derecha. Usa V2 cuando el Rail mantenga varios módulos, muestre cuál está seleccionado o señale novedades por vista. El anfitrión controla acciones y datos. Coloca el plan fuera de Content para que el historial pueda desplazarse de forma independiente.

## Description exacta

V2 (predeterminada): navegación multi-vista en Rail y secciones en Panel. V1: historial a la derecha con acceso único en Rail y Panel con búsqueda y plan. Content admite reemplazo desde instancia.

## Procedencia

[Rail colapsado de Anticipa](https://www.figma.com/design/zuUq3gcF9T3CLid44bjY6W/Anticipa-Junio2026?node-id=21704-71850) · [Panel desplegado de Anticipa](https://www.figma.com/design/zuUq3gcF9T3CLid44bjY6W/Anticipa-Junio2026?node-id=21878-108548) · [Lectura de ambos nodos](../../sources/figma-snapshots/chat-sidebar-v1-2026-11-24/selection.json).
