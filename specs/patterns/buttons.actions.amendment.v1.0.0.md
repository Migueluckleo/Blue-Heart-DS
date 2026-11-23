---
contract_schema: sdd-project/0.2
contract_id: BUTTON-001
amendment_id: BUTTON-ACTION-PATTERNS-001
name: Buttons · Patrones de acciones
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/buttons.contract.v1.0.0.md
applies_to: [BUTTON-001]
pattern_ids: [BUTTON-PATTERN-FORM-001, BUTTON-PATTERN-STEPS-001, BUTTON-PATTERN-TOOLBAR-001, BUTTON-PATTERN-ROW-001, BUTTON-PATTERN-DESTRUCTIVE-001]
related_components: [ICON-BUTTON-001, TABLE-001, STEPPER-001, DROPDOWN-MENU-001]
approval_ref: sources/inventories/buttons-contextual-usage.approval.2026-11-19.json
slot_applicability: NOT_APPLICABLE
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Buttons · Patrones de composición de acciones

Este documento complementa [la guía contextual de BUTTON-001](../components/buttons.contextual-usage.amendment.v1.0.2.md). Los patrones son composiciones de producto, no nuevas familias atómicas ni variantes. Su asociación como enmienda de BUTTON-001 permite incluir sus reglas completas en consultas e interfaces de traspaso autocontenidas. Los componentes vecinos se resuelven con su propia identidad cuando realmente se utilizan.

## Guía semántica normativa

### Reglas comunes del grupo

Cada grupo tiene un objetivo y una única acción principal. Mantén tamaño y orden consistentes; el layout decide la posición. Los ejemplos muestran lectura de izquierda a derecha, no una posición universal obligatoria. Con poco espacio, reorganiza o apila el grupo conservando el orden de lectura. No cambies jerarquía con otro tamaño ni con iconos adicionales.

Focus solo se muestra al navegar con teclado, especialmente con Tab y Shift+Tab. Hover comunica exploración con puntero; pressed comunica pulsación momentánea. Ninguno representa selección persistente ni éxito. El anfitrión gestiona apertura, cierre y retorno lógico del foco.

### BUTTON-PATTERN-FORM-001 · Completar o salir de un formulario

**Intención:** terminar una edición o salir del intento. **Cuándo usar:** al finalizar la captura o edición. **Alternativa:** si la interacción solo elige un valor, usar su control de selección.

**P-PATTERN-01.** Compón Guardar cambios como Primary y Cancelar como Secondary, del mismo tamaño. Medium es el punto de partida contextual de escritorio; aplica la guía de densidad y precisión para elegir otro tamaño. Antes de guardar explica requisitos pendientes. Guardando… bloquea duplicados. Comunica fin o error y conserva datos útiles ante fallo.

**Haz:** distinguir Cancelar de Descartar cambios y explicar una salida que pierda trabajo. **Evita:** dos Primary, tamaños mezclados o un botón deshabilitado sin motivo. El formulario aporta validación, persistencia, mensajes y confirmación de pérdida; Button solo representa y activa la decisión.

### BUTTON-PATTERN-STEPS-001 · Avance con estado

**Intención:** regresar o validar y avanzar dentro de un flujo. **Cuándo usar:** proceso dividido en pasos. **Alternativa:** Link si únicamente cambia a una URL sin ejecutar la operación del paso.

**P-PATTERN-02.** Compón Volver como Secondary y Continuar como Primary, con tamaño coherente. ArrowLeft a la izquierda de Volver y ArrowRight a la derecha de Continuar aportan dirección cuando la aclaran. Continuar valida y avanza; no se convierte en Link si ejecuta esa operación.

**Haz:** conservar datos al regresar y ubicar el foco en el contexto lógico del paso. **Evita:** perder captura sin explicación, anunciar éxito al presionar o usar caret de menú para avanzar. Stepper, si se utiliza, indica progreso conforme a su contrato; no ejecuta automáticamente las acciones de los botones.

### BUTTON-PATTERN-TOOLBAR-001 · Acción principal y apoyo

**Intención:** iniciar el trabajo principal de una vista y ofrecer una operación complementaria. **Cuándo usar:** barra de trabajo con acciones relacionadas al contenido. **Alternativa:** acciones de fila para operaciones de un registro específico.

**P-PATTERN-03.** Compón Crear reporte como Primary y Exportar reporte como Secondary. Plus a la izquierda ayuda a reconocer creación; DownloadSimple a la izquierda puede identificar una exportación que efectivamente descarga. Mantén tamaño coherente y el énfasis principal ligado al objetivo de la vista.

**Haz:** explicar qué selección o datos se exportarán. **Evita:** asumir que cualquier exportación descarga, mezclar tamaños para expresar prioridad o habilitar una acción sin requisitos satisfechos. La pantalla aporta selección, disponibilidad, proceso y resultado.

### BUTTON-PATTERN-ROW-001 · Acción local repetida en tabla

**Intención:** actuar sobre un registro identificable. **Cuándo usar:** operaciones locales repetidas junto a filas. **Alternativa:** barra de acciones para un alcance global o selección múltiple.

**P-PATTERN-04.** Usa Editar reporte como acción local Text; Small corresponde al contexto denso de escritorio cuando permite distinguir los objetivos. El texto, fila o nombre accesible identifica el registro. Un control de más acciones necesita un menú real y la semántica del componente que lo dispara.

**Haz:** conservar el contexto del registro, objetivo activable y Focus de teclado sin recortar su anillo. **Evita:** usar Icon Button ambiguo para una decisión crítica o asumir que un caret aislado implementa un menú. Si usas Icon Button, Table o Dropdown Menu, registra esas familias y resuelve sus contratos; no heredan automáticamente variantes de Button.

### BUTTON-PATTERN-DESTRUCTIVE-001 · Confirmar una pérdida

**Intención:** confirmar una operación destructiva o irreversible. **Cuándo usar:** eliminar o perder datos. **Alternativa:** una salida conservadora que mantenga el objeto o el trabajo.

**P-DANGER-01.** El anfitrión nombra objeto, alcance y consecuencia real antes de la confirmación. Ejemplo ficticio: «¿Eliminar el borrador REP-024?». Si se eliminan varios registros, indica cuántos y cuáles. No copies consecuencias del ejemplo si la operación real difiere.

**P-DANGER-02.** Compón Conservar borrador como Secondary y Eliminar borrador como Danger. Danger representa la decisión crítica; no agregues un Primary que compita. Color e icono complementan texto y explicación, no los sustituyen.

**P-DANGER-03.** Para pérdidas irreversibles, sitúa inicialmente el foco en la alternativa conservadora. Al cerrar, regresa al disparador o a una ubicación lógica si desapareció. La ubicación del foco se gestiona por el flujo; la apariencia Focus corresponde a navegación con teclado. Durante Eliminando… bloquea duplicados. Ante error explica qué ocurrió y qué acción sigue disponible.

**Haz:** conservar una alternativa claramente nombrada y una confirmación específica. **Evita:** rojo decorativo, confirmación genérica sin objeto, icono ambiguo o promesa de deshacer que no existe. El patrón no decide permisos ni reversibilidad ni crea un componente Modal nuevo.

### Registro para consumo

Por grupo registra el ID de patrón, objetivo, alcance de datos, familias realmente usadas, intención y jerarquía de cada acción, tamaño común, texto, iconos, estados, requisitos de disponibilidad, confirmación, resultado y recuperación/foco. El mapa previo y el traspaso deben conservar esas decisiones. Los contratos de los componentes gobiernan sus propiedades; este patrón gobierna cómo se combinan para una tarea.
