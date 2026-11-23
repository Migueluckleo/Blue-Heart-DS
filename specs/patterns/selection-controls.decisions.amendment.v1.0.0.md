---
contract_schema: sdd-project/0.2
contract_id: CHECKBOX-001
amendment_id: SELECTION-CONTROLS-DECISION-PATTERNS-001
name: Checkboxes, Radio Buttons y Toggles · Patrones de decisión
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/checkbox.contract.v1.0.0.md
applies_to: [CHECKBOX-001, RADIO-001, RADIO-GROUP-001, TOGGLE-001]
pattern_ids: [INDEPENDENT-CHOICES-001, BULK-SELECTION-001, EXCLUSIVE-CHOICE-001, IMMEDIATE-PREFERENCE-001, REVIEW-SAVE-001]
related_components: [CHECKBOX-001, RADIO-001, RADIO-GROUP-001, TOGGLE-001, BUTTON-001, LOADER-001, INLINE-NOTIFICATION-001]
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/selection-controls-contextual-usage.approval.2026-11-19.json
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Selección y preferencias · Patrones de decisión

Composiciones del PDF contextual aprobado de 20 páginas; no altas de nuevas familias ni variantes. Se asocian a las cuatro familias para que sus consultas y traspasos incluyan las reglas completas. Guías: [Checkbox](../components/checkbox.contextual-usage.amendment.v1.0.1.md), [Radio](../components/radio.contextual-usage.amendment.v1.0.1.md), [Radio group](../components/radio-group.contextual-usage.amendment.v1.0.1.md) y [Toggle](../components/toggle.contextual-usage.amendment.v1.0.1.md).

## Guía semántica normativa

### Reglas comunes

La intención determina el control: elecciones independientes → Checkbox; una respuesta excluyente visible → Radio group; preferencia binaria aplicada al alternar → Toggle. Un valor de catálogo puede requerir Dropdown; Guardar/Enviar/Eliminar son acciones. Checkbox también puede filtrar o seleccionar de inmediato si el alcance se entiende: la diferencia no se reduce a tener Guardar.

El anfitrión controla valores, permisos, validación, alcance y persistencia. Un valor elegido no equivale a dato guardado. Hay un único tamaño por estas familias; no inventar small/medium/large, iconos o estados no expuestos. La composición adapta ancho y cobertura táctil conservando tokens y geometría.

Focus de teclado localiza la interacción; hover no enfoca. Los anillos web usan :focus-visible, con heurística del navegador. Clic y etiqueta operan el mismo control sin exigir el anillo de Tab. Error y foco pueden coexistir. El recorrido de flechas de Radio cambia foco y selección, a diferencia de explorar candidatos de Dropdown. No deducir teclado, servicios o accesibilidad global de una captura.

### INDEPENDENT-CHOICES-001 · Elecciones independientes

**Intención:** decidir qué incluir. **Cuándo usar:** Totales, Cancelados y Observaciones en un reporte. **Alternativa:** Radio si solo una respuesta es válida.

**INDEPENDENT-CHOICES-01.** Una casilla por opción, frases afirmativas y combinaciones permitidas por el dato. Explica si se aplica al momento o al generar/guardar. Mantén lado del label consistente; right favorece listas y left puede acompañar un patrón que nombre antes del control. La posición no cambia semántica. Sin etiqueta visible conserva nombre específico.

**Haz:** permitir varias respuestas reales y mantener contexto. **Evita:** PDF y XLSX como casillas si solo se admite un formato; dobles negaciones; preseleccionar consentimiento o cobros; inferir validación o persistencia de la marca.

### BULK-SELECTION-001 · Selección en lote

**Intención:** operar un conjunto de elementos seleccionables. **Cuándo usar:** comprobantes de una página o resultados filtrados. **Alternativa:** preferencias independientes sin casilla maestra cuando no existe conjunto resumible.

**BULK-SELECTION-01.** Define el conjunto aplicable y sus permisos. Ninguno seleccionado → false; algunos → indeterminate; todos → true. Activar la maestra parcial pasa a true y el anfitrión selecciona el conjunto; desmarcar la completa lo limpia. Mixed se calcula, no se elige como tercera preferencia. El componente no conoce filas, filtros o páginas.

**BULK-SELECTION-02.** Nombra “esta página” o “todos los resultados filtrados” y define qué ocurre al filtrar/paginar y qué se conserva. No amplíes el alcance silenciosamente. Un conjunto vacío no se anuncia como todos seleccionados; explica ausencia de opciones. Conserva identidad estable y feedback del resultado.

**Haz:** nombres accesibles como Seleccionar comprobante FAC-024 y resumen comprensible. **Evita:** controles anónimos al ocultar Label, selección de filas no aplicables o pérdida silenciosa de selección útil.

### EXCLUSIVE-CHOICE-001 · Respuesta excluyente

**Intención:** una respuesta entre alternativas comparables. **Cuándo usar:** formato de reporte o entrega de comprobante. **Alternativas:** Checkbox si pueden coexistir, Dropdown si explorar un catálogo es más adecuado.

**EXCLUSIVE-CHOICE-01.** Title enuncia la decisión; Options reutiliza Radio oficiales. Vertical 2–5; horizontal 2–3 alternativas cortas que quepan completas. El Slot común Figma acepta 2–5; el límite horizontal lo aplica el consumidor. No hay wrap ni cambio de dirección automático. La cantidad de la muestra no es la cantidad obligatoria.

**EXCLUSIVE-CHOICE-02.** Conserva como máximo un valor controlado, nombres comunes por grupo y distintos entre decisiones, valores únicos/estables y labels no vacíos. Elegir otra reemplaza la anterior; la actual no se apaga al pulsarla. Valor inicial solo con dato guardado o default justificado; iniciar sin selección puede ser apropiado. Ninguno/No aplica solo como respuesta válida, nunca ficticia.

**EXCLUSIVE-CHOICE-03.** Flechas cambian foco y selección entre habilitadas; Tab entra/sale y Espacio selecciona. No envíes ni navegues inesperadamente por elegir. Si revela campos, conserva contexto. La pantalla valida al intentar continuar cuando el dato sea requerido y retira el error al corregir. El mensaje de Radio group en error es Select an option fijo; ayuda contextual adicional corresponde al anfitrión. No ocultes la explicación necesaria.

**Haz:** permitir etiquetas completas, primera línea conforme a receta y ancho suficiente. **Evita:** recortes o radios independientes incompatibles. **Diferencia observada:** web actual centra Radio multilínea; RADIO-MULTILINE-01 la registra sin aprobarla como nueva regla ni afirmar corrección ejecutada.

### IMMEDIATE-PREFERENCE-001 · Preferencia inmediata

**Intención:** encender/apagar una preferencia aplicada al alternar. **Cuándo usar:** Avisos por correo. **Alternativa:** formulario de revisión para cambios que requieren Guardar juntos.

**IMMEDIATE-PREFERENCE-01.** El nombre permanece igual en ambos valores. El anfitrión aplica y persiste; si tarda, compone Loader y anuncio apropiado, y define cómo evitar solicitudes contradictorias. Ante fallo revierte al valor anterior y compone Inline Notification con explicación y reintento. Esas piezas son externas, no Slots o variantes del Toggle. No presentar éxito remoto sin confirmación.

**Haz:** valor visible coherente con persistencia, feedback proporcional y foco sin movimientos innecesarios. **Evita:** nombre cambiante Activar/Desactivar, punto intermedio, variantes error/loading inventadas, Toggle como Guardar/Eliminar o aceptación preseleccionada.

### REVIEW-SAVE-001 · Revisión antes de guardar

**Intención:** revisar decisiones y confirmar un conjunto de cambios. **Cuándo usar:** formulario con varias elecciones relacionadas que requieren Guardar. **Alternativa:** preferencia inmediata cuando no necesita esa confirmación.

**REVIEW-SAVE-01.** Usa controles por intención, conserva captura/selección útil y acciones claras del flujo. El anfitrión explica qué se aplica al guardar, valida y conecta errores concretos. No prometas aplicación inmediata con un Toggle que espera un Guardar distante. La pantalla determina obligatoriedad; un default técnico o una muestra no es regla de negocio.

**Haz:** ayuda persistente cuando sea necesaria, invalidez y mensaje asociados, explicación cercana de disabled. **Evita:** color como única señal, borrar error por recibir foco, exigir enfocar un control deshabilitado o usar read-only inexistente. En “elige al menos una” valida el conjunto; required en cada casilla exigiría cada una.

### Registro de composición para consumo

Registra ID de patrón, intención, familias/exports reales, nombre del dato y alcance, valor inicial y origen, alternativas aplicables, identidad, labels/visibilidad/posición, dirección, estados, foco/teclado, validación, disponibilidad, persistencia y recuperación. Conserva la diferencia de Radio multilínea y límites reales. No añade un Slot arbitrario: solo Options de Radio group es REQUIRED; las anatomías individuales son fijas. Los estilos, valores y aliases siguen al propietario y a sus datos canónicos.
