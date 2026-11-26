---
contract_schema: sdd-project/0.2
contract_id: TABLE-001
amendment_id: TABLE-CONTEXTUAL-USAGE-001
name: Table · Uso contextual
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-25
base_contract: specs/components/table.contract.v1.0.0.md
applies_to: [TABLE-001]
dependencies: [TABLE-CELL-001, PAGINATION-001]
related_components: [FLOATING-ACTIONS-001]
pattern_ids: [TABLE-COMPARISON-001, TABLE-APP-SHELL-001, TABLE-ROW-ACTIONS-001, TABLE-BULK-SELECTION-001, TABLE-SELECTION-SCOPE-001, TABLE-RESULTS-001]
slot_applicability: REQUIRED
approval_ref: sources/inventories/tables-contextual-usage.approval.2026-11-25.json
supersedes_scope: Añade uso contextual aprobado; conserva anatomía, Slots, datos, tokens y API base
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Table · Guía contextual

Adopta el PDF de 29 páginas actualizado al 25 de noviembre y la decisión «Bien hazlo MD». Lee [Table base](table.contract.v1.0.0.md), [celdas](table-cell.contextual-usage.amendment.v1.0.0.md), [paginación](pagination.contextual-usage.amendment.v1.0.0.md) y los [patrones de composición](../patterns/tables-pagination-selection.amendment.v1.0.0.md). La aprobación documenta uso; no acredita modificaciones nuevas de Figma o capacidades de datos.

## Guía semántica normativa

**TABLE-INTENT-01.** Usa Table para comparar entidades del mismo tipo mediante columnas estables: folio, cliente, importe y estado de comprobantes. Una fila identifica un registro. No elegirla solo por cantidad de elementos. Para contenido narrativo o estructura variable, evaluar lista/composición; para un objeto, detalle o formulario; para secciones hermanas, Tabs. No inventar una familia Card para cubrir esas alternativas.

**TABLE-SCHEMA-01.** Antes de construir, declarar entidad, ID estable, columnas y unidades, contenido de cada celda, acciones, selección, orden, estados y paginación. Cabecera y cuerpo conservan orden y anchos aunque falte un dato o una acción. No identificar registros por posición: ordenar y paginar no cambia su identidad.

**TABLE-COMPOSE-01.** Alojar en Body de App Shell; para el listado convencional, Flex según contexto. Header/Sidebar mantienen contexto global y Section Header identifica el conjunto. Título, búsqueda y filtros describen ese conjunto. Pagination queda debajo y fuera del viewport de filas. Dos conjuntos independientes necesitan regiones y paginadores distinguibles. No crear un nuevo bodyLayout ni duplicar selector de empresa sin necesidad.

**TABLE-SLOTS-01.** P-SLOTS REQUIRED. Rows admite una cabecera y cero o más registros, sin máximo declarado; mínimo uno cuenta la cabecera. Las nueve filas y dimensiones de muestra no son límites. Web conserva una tabla nativa con thead, tbody, th scope=col y td. El scroll permite ambos ejes y la cabecera se desplaza verticalmente; no prometer cabecera congelada.

| Necesidad | Haz | Evita |
|---|---|---|
| Comparar importes | Una moneda/unidad identificada, formato consistente y columnas alineadas. | Mezclar monedas o representar ausencia como cero. |
| Texto largo | Label de una línea con elipsis y acceso claro al dato completo cuando sea necesario. | Depender solo de hover/title para información esencial. |
| Desborde | Conservar columnas y permitir scroll. | Comprimir tipografía/hijos u ocultar datos sin decisión de producto. |
| Edición intensiva | Resolver flujo, controles, validación y recuperación reales. | Prometer grid, fórmulas o edición masiva por mostrar Capture Cell. |
| Operación en lote | Checkbox por ID y Floating Actions desde dos seleccionados. | Usar Toggle, Badge o selected visual como colección de registros. |

**TABLE-STICKY-01.** Default desplaza todas las columnas. Sticky fija solo la última columna de acciones a la derecha con superficie opaca y sombra oficial. Cabecera, datos y acciones se mueven juntos al desplazar verticalmente. En Figma coordinar Rows y Actions por ID, orden y altura en cada inserción, baja o reordenación; ambas regiones conservan mínimo uno y máximo abierto. Viewport usa Fill en ancho y Hug en altura. En ambas variantes, su altura sigue la cabecera y las filas, con Pagination fuera de Viewport. Cambiar de variante con Rows sobrescrito requiere adaptar la columna separada de Actions.

**TABLE-STICKY-02.** Web usa una sola tabla; no duplicar controles ni filas para fijar acciones. `stickyActions` solo fija la celda final. Declarar su ancho en columnWidths, suficiente para sus controles; los 136 px para Ver/Editar son ejemplo. Usar Icon Button ghost/small oficial, con nombre por registro. Conservar estados de superficie y foco. No reemplazar las acciones históricas de Table Cell para afirmar que ambas composiciones son idénticas.

**TABLE-HOST-01.** El anfitrión mantiene consulta, filtros, orden y aria-sort, colección seleccionada, permisos, resultados, retorno y foco. Si ordenar se ofrece, habilitar un control real, definir criterio/dirección/desempate y actualizar datos y cabecera juntos. No hacer interactiva una columna sin respuesta ni atribuir callbacks de orden a Table Cell. Ordenar solo el lote visible debe declararse para no sugerir orden global.

**TABLE-KEYBOARD-01.** El viewport web tiene tabIndex=0 para desplazamiento; Tab/Shift+Tab recorre enlaces y controles habilitados. Las celdas de texto no se convierten en paradas ni el conjunto en grid por representar Focus. Enter activa enlaces; botones y casillas conservan su teclado. No tabindex positivos, flechas de grid ni clic de fila que compita con controles internos.

## Description exacta

Para futura sincronización autorizada; no afirma escritura Figma en esta entrega.

TABLE-001 · Compara entidades por columnas e IDs estables dentro de Body. Default desplaza columnas; Sticky fija solo acciones a la derecha y conserva scroll vertical compartido. Pagination queda fuera del viewport, con contador a la derecha en Default. Checkbox selecciona por ID; desde dos registros usa Floating Actions centrada en pantalla y a 32 px abajo. El anfitrión controla datos, alcance, orden y foco.

## Consumo y aceptación

API conservada: Table(label, children, viewportHeight, columnWidths, stickyActions, pagination). `viewportHeight` es un máximo opcional en píxeles y solo produce scroll vertical cuando las filas superan ese máximo. No añadir props de filtrado, loading, captura, selección o anclaje por esta guía. Los tokens y medidas siguen sus JSON delegados y contratos, no los dibujos del PDF.

Comprobar esquema/IDs, semántica, desborde y Sticky sin duplicación, acciones por fila, alcance explícito de selección, resultado/vacío/error y coordinación de página/rango. Las pruebas del PDF acreditan únicamente fixtures locales, no consultas o exportaciones remotas ni AA global. [Aprobación y hashes](../../sources/inventories/tables-contextual-usage.approval.2026-11-25.json).
