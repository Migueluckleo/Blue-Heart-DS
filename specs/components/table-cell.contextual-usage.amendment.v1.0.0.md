---
contract_schema: sdd-project/0.2
contract_id: TABLE-CELL-001
amendment_id: TABLE-CELL-CONTEXTUAL-USAGE-001
name: Table Cell y Capture Cell · Uso contextual
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-25
base_contract: specs/components/table-cell.contract.v1.0.0.md
applies_to: [TABLE-CELL-001]
dependencies: [AVATAR-001, BADGE-001, CHECKBOX-001, TOGGLE-001]
pattern_ids: [TABLE-COMPARISON-001, TABLE-ROW-ACTIONS-001, TABLE-BULK-SELECTION-001, TABLE-RESULTS-001]
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/tables-contextual-usage.approval.2026-11-25.json
supersedes_scope: Añade criterios de celdas, captura y acciones; conserva matrices, geometría, tokens y API existentes
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Table Cell y Capture Cell · Guía contextual

Lee [base](table-cell.contract.v1.0.0.md), [Table](table.contextual-usage.amendment.v1.0.0.md) y los [patrones](../patterns/tables-pagination-selection.amendment.v1.0.0.md). El PDF aprobado conserva 30 variantes Cell: seis tipos de cuerpo × cuatro estados y tres tipos de cabecera × dos estados. Capture tiene ocho combinaciones, no el producto cartesiano de todos los ejes de Cell. El auxiliar privado Cell actions ofrece cantidades expresas de una a cuatro acciones; no es un objetivo de diseño ni un Slot abierto.

## Guía semántica normativa

| Tipo o hijo | Cuándo usar | Evita |
|---|---|---|
| Cabecera | Nombre de columna, unidad y scope=col; default, Checkbox o Toggle según intención. | Título visual sin relación semántica; Toggle como Seleccionar todo. |
| Default | Valor de consulta. Avatar solo si ayuda a reconocer identidad. | Avatar decorativo en folios/importes. |
| Link | Identificador con destino real, por ejemplo Abrir F-1041. | Texto azul sin destino o clic sobre toda la fila. |
| Checkbox | Incluir el registro en una operación posterior; nombre por ID. | Interpretar selección como preferencia persistida. |
| Action | Ver, Editar o Eliminar ese registro. | Extender la acción de una celda a toda la selección. |
| Toggle | Configuración o disponibilidad de efecto inmediato soportado. | Selección de registros o simular persistencia con color. |
| Badge | Estado o atributo confirmado y consultable. | Foco, selección o edición inferida del Pencil decorativo. |
| Capture | Representación del valor/estado visual de captura. | Considerarla Input/Dropdown operativo, validación o grid. |

**CELL-LAYOUT-01.** Cabecera y cuerpo conservan 40 px, Manrope 14/20, cuerpo Regular y cabecera SemiBold. No hay eje size/small/medium/large. Label es una línea con elipsis; el anfitrión decide anchos y acceso al valor completo. Hijos oficiales mantienen receta/tamaño propios. Para números, usar contenido compuesto a la derecha desde el anfitrión; no existe prop align. No sobreescribir internos .bh-* ni cambiar tokens para fabricar otra densidad.

**CELL-CONTENT-01.** Cero es un valor real; Sin dato expresa ausencia. Fechas, separadores, moneda y unidades conservan el contexto del producto. Label del padre no renombra Badge, Checkbox, Toggle o Avatar: sus propiedades pertenecen al hijo. La horizontal está visible por defecto en web y la vertical oculta; los separadores facilitan comparación, no añaden jerarquías o estados.

**CELL-ICON-01.** Los iconos izquierdo/derecho de acompañamiento son decorativos de 20 px; default oculta ambos. Mostrar solo los que aportan significado. CaretDown no abre un menú ni ordena por sí solo. El enlace web kind=link necesita href; sin él queda texto. El subrayado web y la evidencia Figma conservan sus alcances.

**CELL-STATE-01.** El estado visual del padre y el valor del control hijo son independientes. Selected de Cell no selecciona una casilla ni añade un ID. Hover no reemplaza Focus. El stroke interior de Focus es de 2 px; `state=focus` no vuelve enfocada ni tabulable una celda. Cuando se compone un control real, su foco conserva la receta oficial. No inventar disabled, error, loading o success del padre.

| Matriz existente | Estados permitidos |
|---|---|
| Cuerpo default/link/checkbox/action/toggle/badge | default, selected, hover, focus |
| Cabecera default/checkbox/toggle | default, focus |
| Capture off/on | default, selected, hover, focus |

**CELL-CAPTURE-01.** Capture off presenta texto/placeholder; on presenta un valor capturado. La superficie actual no es input/select ni editor de celda: no hay búsqueda, validación, captura numérica/fecha ni confirmación por Enter implícitas. Para edición real, el anfitrión compone controles oficiales y define activación, confirmar/cancelar, errores, ancho/alto y recuperación; no sustituir su anatomía por un Dropdown sin esa decisión.

**CELL-ACTION-01.** Dar nombres accesibles con verbo y objeto: Ver F-1041, Editar F-1041. Las acciones siguen afectando solo esa fila aunque haya multiselección. El auxiliar histórico usa glyphs Phosphor de 20 px y swaps acotados; DotsThree no crea menú automático ni acredita objetivo táctil de 44 px. Sticky usa otra composición: superficie Cell más Icon Button ghost/small oficial de 32 px. Confirmaciones y recuperación pertenecen al flujo.

## Description exacta

TABLE-CELL-001 · Representa cabecera, dato y controles por registro. Conserva 40 px y las matrices de cada tipo. Checkbox selecciona por ID; Toggle cambia una preferencia; Badge informa. Link requiere destino y acción requiere nombre por fila. Capture representa captura sin implementar editor o validación. Focus visual no crea una parada de teclado.

## Límites y aceptación

P-SLOTS NOT_APPLICABLE: anatomía fija, propiedades acotadas y swaps del auxiliar. children permite componer controles web sin demostrar un Slot Figma nuevo. Conservar bases/datos/API y las excepciones heredadas: Link hover/selected en Servicios 4.308:1/4.442:1 y Capture off con mínimo 4.258:1. Son evidencia histórica, no nueva auditoría ni permiso para afirmar AA global o fabricar paleta privada.

Verificar selección padre/hijo independiente, nombres por fila, texto largo, orden de columnas y teclado nativo. No promover la apariencia de captura a funcionalidad de edición. [Aprobación](../../sources/inventories/tables-contextual-usage.approval.2026-11-25.json).
