---
contract_schema: sdd-project/0.2
contract_id: CHECKBOX-001
amendment_id: CHECKBOX-CONTEXTUAL-USAGE-001
name: Checkbox · Uso contextual
type: component-amendment
version: 1.0.1
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/checkbox.contract.v1.0.0.md
applies_to: [CHECKBOX-001]
supersedes_scope: Amplía semántica y sustituye Description; conserva base, geometría, variantes, datos, tokens, API y defaults
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/selection-controls-contextual-usage.approval.2026-11-19.json
related_components: [RADIO-001, RADIO-GROUP-001, TOGGLE-001]
pattern_ids: [INDEPENDENT-CHOICES-001, BULK-SELECTION-001, EXCLUSIVE-CHOICE-001, IMMEDIATE-PREFERENCE-001, REVIEW-SAVE-001]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Checkbox · Guía contextual

Complementa [CHECKBOX-001](checkbox.contract.v1.0.0.md) con el PDF de 20 páginas aprobado en este chat. Los nuevos criterios contextuales se adoptan por aprobación explícita; no cambian la receta ni amplían propiedades. Consulta los [patrones de selección y preferencias](../patterns/selection-controls.decisions.amendment.v1.0.0.md).

## Guía semántica normativa

### Intención y alternativas

**CHECKBOX-INTENT-01.** Usa Checkbox para elecciones independientes, aceptación y selección de elementos para acciones en lote. Pueden elegirse cero, una o varias opciones cuando las reglas del dato lo permitan. Seleccionar una no elimina las demás. Para una respuesta excluyente usa [Radio group](radio-group.contextual-usage.amendment.v1.0.1.md); para una preferencia binaria que aplica al alternar usa [Toggle](toggle.contextual-usage.amendment.v1.0.1.md). Guardar, enviar o eliminar corresponden a acciones, no a una casilla que las ejecute de forma ambigua.

**CHECKBOX-INTENT-02.** Checkbox también puede seleccionar o filtrar de inmediato si la pantalla lo explica. No reduzcas su diferencia con Toggle a la presencia de Guardar: su intención principal es inclusión o elección independiente. La pantalla o flujo anfitrión controla valores, permisos, alcance, validación y persistencia.

| Situación | Haz | Evita |
|---|---|---|
| Incluir en un reporte | Permitir combinar Totales, Cancelados y Observaciones. | Casillas para PDF y XLSX si solo se admite un formato. |
| Seleccionar filas | Explicar conjunto aplicable y selección parcial. | Extender silenciosamente la selección a otras páginas. |
| Aceptación | Mantener frase explícita y validación asociada. | Preseleccionar consentimiento o cobros. |

### Label, posición y visibilidad

**CHECKBOX-LABEL-01.** Usa una frase afirmativa, específica y en sentence case: “Recibir una copia del reporte”. La marca significa incluir o aceptar esa frase. Evita dobles negaciones como “No dejar de recibir”. Un valor inicial debe reflejar un dato existente o una decisión justificada; no se deduce de una muestra seleccionada.

**CHECKBOX-LABEL-02.** Propón `right`, predeterminado, en listas de opciones donde la marca precede al texto. Considera `left` cuando el patrón ubique el nombre antes del control. Mantén un lado consistente en el grupo y una proximidad clara. `label position` en Figma y `labelPosition` en web no cambian selección, nombre accesible ni validación; operan cuando la etiqueta está visible.

**CHECKBOX-LABEL-03.** El texto crece hasta un máximo de 320 px y envuelve; el control queda junto a la primera línea, sin recortar significado ni centrarlo respecto del párrafo completo. Ese máximo no es un ancho reservado ni un límite de caracteres. El anfitrión adapta anchos más estrechos y comprueba el resultado.

**CHECKBOX-LABEL-04.** `Show label` / `showLabel` es `false` por defecto. Mostrar etiqueta es una decisión explícita de composición. Ocúltala solo con contexto visual inequívoco y nombre accesible específico; en una tabla usa, por ejemplo, “Seleccionar comprobante FAC-024”. El API conserva `label` para el nombre cuando se oculta el texto. El clic en etiqueta y en casilla opera la misma opción.

### Selección y cinco estados

**CHECKBOX-MIXED-01.** `selected` admite `false`, `true` o `indeterminate`. False no tiene marca; true muestra Check; indeterminate muestra Minus y comunica mixed. El anfitrión calcula la selección parcial; no es una tercera preferencia que la persona elige manualmente. Al activar indeterminate, el callback recibe true. No implementes un ciclo manual false → true → mixed.

| Estado | Significado y uso | Evita |
|---|---|---|
| default | Disponible para elegir; selected conserva el valor. | Interpretarlo como validación exitosa o dato guardado. |
| hover | Respuesta temporal al puntero. | Dar foco o cambiar selección por hover. |
| focus | Localizar el control operado con teclado. | Confundir anillo con selección o dibujarlo por un simple hover. |
| error | Una regla validada requiere corrección; explicar con texto externo asociado. | Confiar solo en el borde rojo o iniciar una opción pendiente como fallo. |
| disabled | No se puede operar; conservar el valor y explicar la causa. | Interpretarlo necesariamente como false o depender de enfocarlo para explicar el motivo. |

**CHECKBOX-COVERAGE-01.** Tres valores × cinco estados × dos posiciones = 30 variantes. Hay un solo tamaño: Control 24 × 24 px, Box 18 × 18 px, marca 12 px y separación de etiqueta de 8 px. No hay size/small/medium/large, success, loading ni read-only propios. La densidad y el área activable se componen en el anfitrión conservando la geometría. Check y Minus son marcas fijas de Phosphor, no swaps decorativos ni iconos a izquierda/derecha del label.

### Selección en lote y alcance

**CHECKBOX-BULK-01.** Para el conjunto aplicable: ninguno seleccionado → false; algunos → indeterminate; todos → true. Activar la maestra parcial selecciona el conjunto; desmarcar la maestra completa lo limpia. La casilla aislada solo comunica un valor: no conoce filas, filtros, permisos o páginas.

**CHECKBOX-BULK-02.** Define y nombra “esta página” o “todos los resultados filtrados”, qué filas son seleccionables, qué ocurre al filtrar o paginar y qué se conserva. No cambies el alcance silenciosamente. Si el conjunto aplicable está vacío, no anuncies “todos seleccionados”; explica la ausencia de elementos disponibles. El patrón [BULK-SELECTION-001](../patterns/selection-controls.decisions.amendment.v1.0.0.md) gobierna la composición.

### Validación y disponibilidad

**CHECKBOX-VALIDATION-01.** El anfitrión define obligatoriedad y momento de validación. Una casilla opcional desmarcada está en default. Valida la aceptación requerida al intentar continuar; conserva el contexto y vincula una corrección concreta, por ejemplo “Confirma la revisión de los datos para continuar”. `invalid` comunica `aria-invalid`; el texto externo se asocia mediante `aria-describedby`.

**CHECKBOX-VALIDATION-02.** Recibir foco no resuelve el error. El anfitrión revalida y retira el mensaje al cumplirse la regla. No borres otras selecciones útiles. Los atributos nativos incluyen `required` cuando aplica; en “elige al menos una” valida el conjunto en el anfitrión: poner required en cada casilla exigiría cada una.

**CHECKBOX-DISABLED-01.** Explica cerca “Selecciona una empresa con sucursales” si falta ese requisito. No uses un tooltip sobre el control deshabilitado como única explicación. Disabled puede conservar selección. Para consulta sin edición, compón una representación clara del valor; no inventes una variante read-only.

### Teclado, Focus, tema y área de activación

**CHECKBOX-FOCUS-01.** Tab y Shift+Tab recorren controles disponibles; Espacio alterna false/true y convierte mixed a true. Disabled se omite. Hover no enfoca. El anillo web usa `:focus-visible`, orientado a navegación de teclado y gestionado por la heurística del navegador. Distingue foco DOM del indicador visible: el clic opera el control sin exigir un anillo como si se hubiera llegado con Tab. No prometas activación con Enter. `previewState` solo representa hover/focus en muestrarios.

**CHECKBOX-FOCUS-02.** Mantén el anillo sin recortes y su localización durante la corrección; error y foco pueden coexistir. Conserva los cuatro temas y los roles internos: el tema sigue al producto, no significa éxito o prioridad. El anfitrión verifica el objetivo real, amplía cobertura táctil y evita solapamientos sin escalar la figura. Un label alto por sí solo no demuestra un área de 44 × 44 px; el criterio táctil local no debe atribuirse al mínimo AA de WCAG 2.5.8. No se certifica accesibilidad global desde las muestras.

### Mapeo de propiedades

| Dimensión | Propiedades / mecanismo | Responsabilidad |
|---|---|---|
| Valor | selected obligatorio; onSelectedChange(boolean) | Mantener selección controlada; calcular mixed fuera del átomo. |
| Contenido | Label/label; Show label/showLabel=false | Nombre de la elección y su visibilidad; conservar nombre accesible. |
| Posición | label position/labelPosition=right o left | Alinear composición; sin efecto semántico. |
| Condición | state de Figma; invalid y disabled en web | Representar situación real, con ayuda externa. |
| Integración nativa | id, name, value, required, aria-describedby y otros atributos admitidos | Identidad, datos y asociación de mensajes; no validación automática de conjunto. |
| Muestrario y composición | previewState=hover/focus; className | Apariencia de muestra y anfitrión; sin sustituir tokens ni crear variantes. |

P-SLOTS NOT_APPLICABLE: Control, Box, Label y marcas son anatomía fija; texto/visibilidad/posición no crean contenido arbitrario. Los valores y aliases pertenecen al JSON delegado del contrato base; esta guía no mantiene un catálogo paralelo.

## Description exacta

Texto preparado para futura sincronización autorizada; no afirma escritura o readback nuevo de Figma.

CHECKBOX-001 · Uso contextual v1.0.1. Usa Checkbox para elecciones independientes y selección en lote. Expresa la opción de forma afirmativa. Elige label right o left con consistencia; conserva nombre accesible al ocultarlo. El anfitrión calcula indeterminate y define el alcance; activarlo pasa a true. Focus localiza navegación de teclado y no equivale a selección. Explica error e indisponibilidad. Un solo tamaño, sin variantes loading, success o read-only.

## Aceptación documental

Resolver CHECKBOX-001 debe devolver esta guía y los patrones completos. Verificar 30 variantes, ambos lados del label, selección parcial, alcance, foco/teclado, error y defaults sin cambiar datos, tokens o API. Preservar los patrones pertinentes en el traspaso autocontenido.
