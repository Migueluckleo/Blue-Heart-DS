---
contract_schema: sdd-project/0.2
contract_id: TABLE-CELL-001
name: Table cell
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Table
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/table-cell.v1.0.0.json
source_data_digest_sha256: dbc81a89b7c2de5a672e0572787dc6d3b3973db68b294e8302a1390333b8fe94
data_refs: [specs/data/table-cell.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, AVATAR-001, BADGE-001, CHECKBOX-001, TOGGLE-001]
---

# Table cell · TABLE-CELL-001

La [norma fuente](../../sources/figma-snapshots/root-families-2026-11-11/table-cell.1.0.0.md.txt) y el [JSON delegado](../data/table-cell.v1.0.0.json) conservan 30 variantes Cell, ocho Capture y cuatro cantidades de Cell actions. La altura es 40. Label dispone de una línea con elipsis y conserva el estilo semántico de Header o Body. El foco es un stroke interior de 2 px. Los anchos iniciales pertenecen al anfitrión. P-SLOTS NOT_APPLICABLE porque cada variante tiene anatomía fija y los cuatro swaps del auxiliar cubren las cantidades expresas de 1 a 4.

Capture conserva tex-box propio, estados visuales y CaretDown. La captura y validación real pertenecen al anfitrión. Cell actions reutiliza Eye, PencilSimple, TrashSimple y DotsThree del [archivo oficial de Phosphor](../../sources/figma-snapshots/root-families-2026-11-11/phosphor-table.json), con roles de acción neutros. Table cell vincula Avatar image/medium, Checkbox, Toggle y Badge según receta. Las seis variantes con Avatar conservan su instancia y la fotografía original de Avatar image/medium.

La fuente conserva los contrastes heredados de Link hover/selected en Servicios y de Capture off hover/selected, por debajo de 4.5:1. Los glyphs propios siguen el rol de texto. El estado visual de la celda y el estado del control hijo se gestionan por separado.

## Guía semántica normativa

Usa una celda de encabezado para nombrar su columna y una celda de datos para el valor de la fila. Nombra los controles por su efecto y contexto. La guía WAI reserva el patrón de tabla para datos tabulares y recomienda el elemento HTML nativo. Carbon mantiene la densidad consistente entre encabezado y cuerpo. [W3C WAI Table](https://www.w3.org/WAI/ARIA/apg/patterns/table/) · [Carbon Data table](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Encabezado de columna | Usa un título breve y scope col. | Dar a la celda un título visual sin relación semántica. |
| Una acción de fila | Da a PencilSimple un nombre que incluya el elemento afectado. | Usar un glyph sin nombre o atribuir la acción a toda la fila. |
| Valor de captura | Muestra el texto y el estado del campo junto al control real del anfitrión. | Atribuir validación o persistencia al estado visual. |

## Description exacta

| Propietario | Description |
|---|---|
| Table cell | TABLE-CELL-001 · Usa Table cell para encabezados y datos. Conserva 40 px, roles de tema y controles oficiales. Nombra las acciones y ajusta la columna al contenido. Ficha local Table cell / TABLE-CELL-001. |
| Table capture cell | TABLE-CELL-001 · Usa Table capture cell para representar el valor o el estado visual de captura. El anfitrión resuelve edición y validación. Ficha local Table cell / TABLE-CELL-001. |
| __Table/Cell actions | TABLE-CELL-001 · Auxiliar privado para una a cuatro acciones de celda. Mantén instancias Phosphor de 20 px y da nombre a los botones en el anfitrión. Ficha local Table cell / TABLE-CELL-001. |

## Aceptación

Cotejar matrices, bindings, aliases, estilos, glyphs y crecimiento desde instancias. Verificar la diferencia entre Label, los controles hijos y Capture. Probar el recorrido web con encabezados, acción, selección de fila, estados y contenido largo. Registrar el alcance exacto de QA nativo y el límite fotográfico.
