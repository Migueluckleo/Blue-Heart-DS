---
contract_schema: sdd-project/0.2
contract_id: RADIO-GROUP-001
amendment_id: RADIO-GROUP-CONTEXTUAL-USAGE-001
name: Radio group · Uso contextual
type: component-amendment
version: 1.0.1
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/radio-group.contract.v1.0.0.md
applies_to: [RADIO-GROUP-001]
supersedes_scope: Amplía semántica y sustituye Description; conserva Options, cardinalidades, ayuda fija, cuatro variantes y API
slot_applicability: REQUIRED
approval_ref: sources/inventories/selection-controls-contextual-usage.approval.2026-11-19.json
related_components: [RADIO-001, CHECKBOX-001, TOGGLE-001, DROPDOWN-MENU-001]
pattern_ids: [INDEPENDENT-CHOICES-001, BULK-SELECTION-001, EXCLUSIVE-CHOICE-001, IMMEDIATE-PREFERENCE-001, REVIEW-SAVE-001]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Radio group · Guía contextual

Complementa [RADIO-GROUP-001](radio-group.contract.v1.0.0.md) y consume el [Radio oficial](radio.contextual-usage.amendment.v1.0.1.md). Adopta los criterios del PDF aprobado de 20 páginas sin alterar datos, tokens, API o defaults. Consulta los [patrones de selección](../patterns/selection-controls.decisions.amendment.v1.0.0.md).

## Guía semántica normativa

### Decisión, título y ayuda

**RADIO-GROUP-INTENT-01.** Usa alternativas visibles cuando compararlas ayude a tomar una sola decisión. Title enuncia la pregunta, por ejemplo Formato del reporte; cada Radio nombra una respuesta paralela, como Archivo PDF y Hoja de cálculo. No repitas el título en todas las alternativas ni presentes las respuestas como acciones independientes. Si varias pueden coexistir usa Checkbox; si es una preferencia binaria inmediata usa Toggle. Considera Dropdown cuando explorar un catálogo resulte más adecuado; no extiendas la capacidad del grupo para alojar una lista larga.

**RADIO-GROUP-TITLE-01.** `Title`/`title` y `Show title`/`showTitle=true` gobiernan nombre y visibilidad. Si se oculta el título visual, conserva nombre accesible; la implementación web mantiene legend oculto visualmente y `aria-labelledby`. La pantalla justifica el contexto inequívoco.

**RADIO-GROUP-HELPER-01.** Helper text aclara la decisión en default. `Show helper text`/`showHelperText=true` gobierna visibilidad en ambos estados. En error se conserva literalmente **Select an option**; modificar `Helper text`/`helperText` no reemplaza ese mensaje. Si hace falta explicación contextual en español, el anfitrión aporta texto visible adicional y asociado. Evita ocultar ayuda/error sin explicación equivalente. No inventes una prop de mensaje de error editable.

### Dirección y Options

| Regla | Uso | Evita |
|---|---|---|
| RADIO-GROUP-DIRECTION-01 | Vertical, por defecto, para 2–5 opciones; favorece texto largo, ancho limitado y comparación por comienzos alineados. | Recortar diferencias para conservar una sola línea. |
| RADIO-GROUP-DIRECTION-02 | Horizontal para 2–3 opciones cortas que quepan completas, comprobadas con texto real y traducciones. | Forzar una cuarta alternativa o reducir el control para que quepa. |
| RADIO-GROUP-DIRECTION-03 | El anfitrión decide dirección y ancho disponible. | Prometer cambio responsive o wrap automático que la receta no ofrece. |

**RADIO-GROUP-SLOT-01.** P-SLOTS REQUIRED: único Slot nativo Options común para las cuatro variantes, restringido a Radio oficiales; mínimo nativo 2 y máximo nativo 5. El límite horizontal de 3 pertenece al consumidor. Figma puede aceptar 4 en el Slot común y aun así incumplir el contrato horizontal; no atribuyas un rechazo nativo inexistente. La API web rechaza cardinalidades fuera de 2–5 vertical o 2–3 horizontal.

**RADIO-GROUP-SLOT-02.** Insertar, quitar, reordenar o sustituir Radio conserva contenido, orden, overrides y selección al cambiar direction/state. Las tres opciones iniciales son una muestra, no cantidad obligatoria. Cada hijo tiene Label visible y no vacío. No insertes contenido arbitrario ni fabriques otra implementación del círculo. Options vertical mantiene gap 8 px y horizontal gap 24 px; los hijos conservan tema y tokens del propietario. La colección tipada `options` en React es el equivalente web, no un Slot Figma nativo.

### Valor inicial, exclusividad y validación

**RADIO-GROUP-VALUE-01.** El anfitrión mantiene como máximo un valor elegido. Un dato guardado o default justificado puede iniciar seleccionado; una decisión consciente puede iniciar vacía sin error. La muestra con la primera elegida no dicta una regla de producto. `value`/`onValueChange` coordinan el estado controlado; `name` es común dentro del grupo y distinto entre decisiones. Cada opción web tiene `value` único y estable, `label` no vacío y `disabled` opcional. No uses la posición como identidad.

**RADIO-GROUP-VALUE-02.** Elegir otra reemplaza la anterior; la actual no se apaga al pulsarla. Para una decisión opcional que deba retirarse, considera Ninguno/No aplica solo si son valores válidos del dominio. No agregues respuestas ficticias para eludir validación.

**RADIO-GROUP-VALIDATION-01.** La pantalla define obligatoriedad, cuándo validar y cuándo retirar el error. Valida al intentar continuar si corresponde y conserva selecciones útiles. El grupo representa default/error; no hay una prop required de grupo en este API ni variantes propias loading, success, read-only o disabled del contenedor. La indisponibilidad por alternativa se comunica en cada Radio y se explica cuando haga falta. `aria-invalid` y las asociaciones de ayuda existen en web; el anfitrión aporta contexto adicional sin depender del color.

### Teclado, foco y geometría

**RADIO-GROUP-KEYBOARD-01.** En este grupo nativo de formulario, Tab/Shift+Tab entran/salen y normalmente llegan al seleccionado; entrada inversa con el grupo vacío puede variar por navegador. Flechas cambian foco **y selección** entre opciones habilitadas y omiten disabled; Espacio elige la enfocada y no apaga la actual. No lo confundas con candidatos de Dropdown ni agregues Tab por alternativa. Seleccionar no envía el formulario ni provoca navegación inesperada. No se extiende este comportamiento al caso especial de toolbar.

**RADIO-GROUP-FOCUS-01.** El anillo de Radio sigue `:focus-visible` orientado a teclado; hover no enfoca. Distingue foco DOM, anillo y selección. Mantén halo sin recorte y permite corregir error con foco visible. Checkbox y Radio tienen un tamaño interno de Control 24 px; el anfitrión conserva la cobertura táctil 44 × 44 px indicada en la receta sin escalarlo ni afirmar que un label alto la acredita automáticamente.

**RADIO-GROUP-COVERAGE-01.** Dos direcciones × dos estados = 4 variantes. Title usa su estilo propio, Helper el suyo, y las opciones el de Radio. No hay size/small/medium/large. Texto largo puede ampliar alto/ancho; el grupo no promete wrap automático. La diferencia **RADIO-MULTILINE-01** continúa aplicando a sus hijos: receta exige primera línea, web actual centra Radio multilínea; esta guía no corrige ni adopta esa diferencia. Los colores/aliases viven en los datos delegados, no en un inventario editable paralelo.

### Mapeo de propiedades

| Propiedades | Responsabilidad |
|---|---|
| title, showTitle=true | Decisión y nombre accesible aun ocultando título visual. |
| helperText, showHelperText=true | Ayuda editable en default; visibilidad de mensaje fijo en error. |
| direction=vertical, state=default | Disposición y condición respaldadas por la receta. |
| options: value, label, disabled? | Contenido permitido, cardinalidades, identidad y disponibilidad. |
| name, value?, onValueChange | Agrupar y conservar una única selección controlada. |

## Description exacta

Texto preparado para sincronización futura autorizada; no afirma nueva escritura/readback Figma.

RADIO-GROUP-001 · Uso contextual v1.0.1. Enuncia una decisión con título accesible y alternativas comparables. Usa Options con 2–5 Radio oficiales en vertical o 2–3 cortos en horizontal; no hay wrap automático. El anfitrión controla selección única, valor inicial y validación. Flechas cambian foco y selección. Conserva Select an option fijo en error y aporta contexto adicional desde la pantalla cuando sea necesario. No extiendas cardinalidades ni inventes tamaños o estados.

## Aceptación documental

Resolver RADIO-GROUP-001 incluye esta guía, la de Radio por su dependencia vigente y los patrones. Verificar cuatro variantes, Slot común y límite horizontal de consumidor, ayudas/visibilidad, valor controlado y teclado. Conservar el hallazgo multilínea explícito en el traspaso.
