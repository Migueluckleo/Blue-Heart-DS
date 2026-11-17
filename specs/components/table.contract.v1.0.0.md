---
contract_schema: sdd-project/0.2
contract_id: TABLE-001
name: Table
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Table
figma_page_id: "128:2"
target_node_ids: ["331:2664"]
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/table.v1.0.0.json
source_data_digest_sha256: 0bd5635689f9340cfd04edbaf9581bcf888baa17a69d491c6a27137d4fab609e
data_refs: [specs/data/table.v1.0.0.json, specs/tokens/table.sticky-actions.v1.0.0.json, specs/data/table.sticky-actions.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, TABLE-CELL-001, PAGINATION-001, ICON-BUTTON-001]
---

# Table · TABLE-001

La [norma fuente](../../sources/figma-snapshots/root-families-2026-11-11/table.1.0.0.md.txt) gobierna Table. El [JSON delegado](../data/table.v1.0.0.json) cubre el principal, el thumb y las dos orientaciones del scrollbar privado, y delega las filas de muestra al snapshot verificado. La [lectura de la raíz](../../sources/figma-snapshots/root-families-2026-11-11/table-owner-slots.json) conserva la identidad del principal, Rows, nueve filas de muestra y los dos thumb Slots. La construcción del principal en Figma requiere Table cell completo. En la muestra, 83 instancias usan dos variantes con Avatar image/medium y lo ocultan inicialmente.

P-SLOTS REQUIRED. Rows nativo acepta una cabecera y cero o más filas de cuerpo. El mínimo es uno y el máximo queda abierto. Las filas usan instancias Cell y conservan columnas alineadas. El viewport recorta y permite desplazar ambos ejes. La cabecera participa en el desplazamiento. Los 1711 px de ancho y 360 px de viewport son iniciales de muestra. El equivalente web usa thead y tbody con filas identificadas por el anfitrión y overflow nativo.

Cada variante del scrollbar tiene un Slot privado que admite exactamente una instancia vinculada del thumb. Track 16, thumb 8 e inset 4. El [fit de origen](../../sources/figma-snapshots/root-families-2026-11-11/table-fit-instance.source.js.txt) aplica una longitud proporcional inicial. En Figma el contenido se desplaza nativamente y el indicador no sigue la posición. En web la barra pertenece al navegador. Pagination permanece fuera de Rows y reutiliza su contrato. El anfitrión resuelve datos, sort, selección y paginación.

## Variantes y Sticky Actions

Solicitud explícita del 17 de noviembre de 2026: añadir una variante con la última columna de acciones fija a la derecha durante el desplazamiento horizontal y sombra hacia el contenido, usando Icon Buttons Ghost oficiales. La referencia es la imagen adjunta del usuario; sus estilos de botones no se adoptan. Se conserva la versión contractual 1.0.0 y la variante Default como predeterminada.

Figma ofrece `actions=default/sticky`. Web expone `stickyActions?: boolean`, por defecto false. En sticky, la cabecera de acciones y todas sus celdas permanecen en el borde derecho del viewport; el resto de columnas se desplaza horizontalmente. Al desplazar verticalmente, cabecera, datos y acciones se mueven juntos. No se congela la cabecera. Pagination permanece fuera del viewport.

La columna usa superficie opaca de Table cell: cabecera, default, hover, selected y focus mantienen sus roles de la familia. La sombra es una decisión de implementación DERIVED a partir de la referencia y la escala existente: offset X -4 px, Y 0, blur 16 px, spread -2 px y color shadow/md del DS. Los cinco roles consumen tokens table/* de componente, con cadena semantic → primitives y los cuatro temas. No se infieren medidas exactas de la imagen.

En Figma, Sticky separa el desplazamiento horizontal de datos del vertical compartido: un viewport vertical contiene una composición horizontal de Data viewport y Actions. Rows contiene la cabecera y las filas de datos; Actions es un Slot nativo con una celda de cabecera y una celda de acciones por cada fila, en el mismo orden y con igual altura. Ambos Slots tienen mínimo uno y máximo abierto. Cada alta, baja o reordenación de filas debe aplicarse a ambos Slots. La muestra de nueve filas no es un límite. Los indicadores privados conservan su carácter decorativo: Show vertical scrollbar corresponde a Default; Sticky usa el viewport vertical compartido sin ese indicador privado. Los ajustes de contenido deben conservar altura Hug para que el scroll vertical compartido alcance todas las filas. No se sustituyen celdas de datos por copias de acciones. Para ajustar el alto de una instancia Sticky, fija su alto total a viewportHeight + el alto de Pagination y pon Viewport en Fill vertical; el contenido interior mantiene Hug. Cambiar de variante desde una instancia con Rows sobrescrito requiere adaptar la última columna al esquema separado de Actions.

Las celdas de acciones combinan la superficie oficial Table cell con Icon Button/ghost small de 32 px y sus estados nativos. La muestra usa Ver y Editar con Phosphor Eye y PencilSimple; son ejemplos de acciones, no reglas de producto. En web cada botón necesita nombre accesible por fila y el anfitrión aporta el callback. El contenido de acciones sigue siendo configurable. No se alteran los botones de las variantes históricas de Table cell.

En web se conserva una única tabla semántica: `thead`, `tbody`, `th scope=col` y `td`, sin duplicar filas ni controles. El anfitrión coloca la columna de acciones al final de cada fila y declara su ancho en columnWidths. Sticky solo fija esa última celda. El scroll, el foco, los eventos y la selección usan las mismas filas. La superficie pinned debe conservar los estados de Table cell y el foco de Ghost. El ancho de la columna debe contener sus botones; para la muestra de dos acciones se usan 136 px. Las acciones pueden quedar vacías en una fila manteniendo su celda y el alineamiento.

[Mapa de nodos y decisiones](../data/table.sticky-actions.v1.0.0.json) · [Lectura y QA](../../implementations/figma/table-sticky-actions-2026-11-17/readback.json) · [Tokens de sombra](../tokens/table.sticky-actions.v1.0.0.json).

## Guía semántica normativa

Usa Table para comparar valores alineados por columna y recorrer filas. La tabla HTML conserva semántica de filas y encabezados, con controles de fila alcanzables por el teclado. Carbon mantiene cabecera y cuerpo a la misma altura e incorpora paginación para lotes. BlueHeart mantiene 40 px por fila y reutiliza Pagination. [W3C WAI Table](https://www.w3.org/WAI/ARIA/apg/patterns/table/) · [Carbon Data table](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Comparar comprobantes | Mantén encabezados de columna y alinea su contenido. | Mezclar densidades entre filas y encabezado. |
| Desborde en contenedor reducido | Conserva el ancho de columnas y permite desplazar el viewport. | Fijar un límite de filas igual a la muestra o prometer cabecera congelada. |
| Cambiar página o tamaño | Reutiliza Pagination y sincroniza los datos en el anfitrión. | Atribuir filtrado o persistencia al componente visual. |

## Description exacta

| Propietario | Description |
|---|---|
| Table | TABLE-001 · Default desplaza todas las columnas. Sticky fija las acciones a la derecha con sombra lateral e Icon Buttons Ghost oficiales. La cabecera acompaña el scroll vertical; Pagination queda fuera. Coordina Rows y Actions por fila en Sticky. Ficha local Table / TABLE-001. |
| __Table/Scrollbar thumb | TABLE-001 · Thumb privado vinculado para la longitud inicial de los indicadores. Conserva grosor y radio fuente. Ficha local Table / TABLE-001. |
| __Table/Scrollbar medium | TABLE-001 · Indicadores privados horizontal y vertical. Conserva el Slot de un thumb vinculado por orientación. Ficha local Table / TABLE-001. |

## Aceptación

Verificar los dos Slots privados y la posibilidad de ajustar la longitud conservando identidad y grosor. Verificar semántica, desplazamiento y paginación desde Chrome. Cotejar Table y Rows nativos con distintas cantidades, reordenación, viewport y limpieza.
