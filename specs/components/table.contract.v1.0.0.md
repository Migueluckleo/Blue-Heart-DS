---
contract_schema: sdd-project/0.2
contract_id: TABLE-001
name: Table
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Table
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/table.v1.0.0.json
source_data_digest_sha256: 0bd5635689f9340cfd04edbaf9581bcf888baa17a69d491c6a27137d4fab609e
data_refs: [specs/data/table.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, TABLE-CELL-001, PAGINATION-001]
---

# Table · TABLE-001

La [norma fuente](../../sources/figma-snapshots/root-families-2026-11-11/table.1.0.0.md.txt) gobierna Table. El [JSON delegado](../data/table.v1.0.0.json) cubre el principal, el thumb y las dos orientaciones del scrollbar privado, y delega las filas de muestra al snapshot verificado. La [lectura de la raíz](../../sources/figma-snapshots/root-families-2026-11-11/table-owner-slots.json) conserva la identidad del principal, Rows, nueve filas de muestra y los dos thumb Slots. La construcción del principal en Figma requiere Table cell completo. En la muestra, 83 instancias usan dos variantes con Avatar image/medium y lo ocultan inicialmente.

P-SLOTS REQUIRED. Rows nativo acepta una cabecera y cero o más filas de cuerpo. El mínimo es uno y el máximo queda abierto. Las filas usan instancias Cell y conservan columnas alineadas. El viewport recorta y permite desplazar ambos ejes. La cabecera participa en el desplazamiento. Los 1711 px de ancho y 360 px de viewport son iniciales de muestra. El equivalente web usa thead y tbody con filas identificadas por el anfitrión y overflow nativo.

Cada variante del scrollbar tiene un Slot privado que admite exactamente una instancia vinculada del thumb. Track 16, thumb 8 e inset 4. El [fit de origen](../../sources/figma-snapshots/root-families-2026-11-11/table-fit-instance.source.js.txt) aplica una longitud proporcional inicial. En Figma el contenido se desplaza nativamente y el indicador no sigue la posición. En web la barra pertenece al navegador. Pagination permanece fuera de Rows y reutiliza su contrato. El anfitrión resuelve datos, sort, selección y paginación.

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
| Table | TABLE-001 · Usa Table para comparar datos tabulares. Conserva cabecera en Rows, columnas alineadas y Pagination oficial. El anfitrión aporta datos y operaciones. Ficha local Table / TABLE-001. |
| __Table/Scrollbar thumb | TABLE-001 · Thumb privado vinculado para la longitud inicial de los indicadores. Conserva grosor y radio fuente. Ficha local Table / TABLE-001. |
| __Table/Scrollbar medium | TABLE-001 · Indicadores privados horizontal y vertical. Conserva el Slot de un thumb vinculado por orientación. Ficha local Table / TABLE-001. |

## Aceptación

Verificar los dos Slots privados y la posibilidad de ajustar la longitud conservando identidad y grosor. Verificar semántica, desplazamiento y paginación desde Chrome. Cotejar Table y Rows nativos con distintas cantidades, reordenación, viewport y limpieza.
