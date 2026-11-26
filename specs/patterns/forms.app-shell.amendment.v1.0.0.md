---
contract_schema: sdd-project/0.2
contract_id: APP-SHELL-001
amendment_id: FORMS-APP-SHELL-PATTERNS-001
name: Formularios · Composición dentro de App Shell
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-20
base_contract: specs/components/app-shell.contract.v1.0.0.md
applies_to: [APP-SHELL-001, SECTION-HEADER-001, INPUT-001, DROPDOWN-MENU-001, DROPDOWN-ITEM-001, TEXT-AREA-001, BUTTON-001, CHECKBOX-001, RADIO-001, RADIO-GROUP-001, TOGGLE-001, STEPPER-001, INLINE-NOTIFICATION-001]
pattern_ids: [FORM-SIMPLE-001, FORM-SECTIONS-001, FORM-STEPS-001, FORM-REVIEW-001, FORM-ROWS-001, FORM-INLINE-ACTIONS-001, FORM-FIELD-RELATIONS-001, FORM-HIERARCHY-001, FORM-REPEATER-001, FORM-VALIDATION-001, FORM-SUBMISSION-001, FORM-EXIT-CONTEXT-001]
related_components: [APP-SHELL-001, SECTION-HEADER-001, INPUT-001, DROPDOWN-MENU-001, DROPDOWN-ITEM-001, TEXT-AREA-001, BUTTON-001, CHECKBOX-001, RADIO-001, RADIO-GROUP-001, TOGGLE-001, STEPPER-001, INLINE-NOTIFICATION-001, BADGE-001, FOUNDATIONS-BODY-001]
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/forms-app-shell.approval.2026-11-20.json
supersedes_scope: Añade composición y comportamiento contextual de formularios; conserva contratos, guías y patrones previos, datos, variantes, Slots, tokens y API
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Formularios dentro de App Shell

Reglas adoptadas del PDF v0.2 de 25 páginas aprobado en este chat: «Está bien, documenta el MD». Incluye la indicación explícita «Los botones deben estar alineados a la caja del input». Es un patrón de producto, no una familia Form, Row, Error Summary, Repeater, Card o Modal del DS ni un `bodyLayout=form`. Las escenas del PDF son ejemplos ficticios; no acreditan validación de negocio, servicios, navegación, persistencia o accesibilidad global implementadas.

Fuentes propietarias: [App Shell](../components/app-shell.contract.v1.0.0.md), [Section Header](../components/section-header.contract.v1.0.0.md), [Body](../foundations/body.contract.v1.0.0.md) y [colores Body](../foundations/body.semantic-colors.amendment.v1.0.0.md). Reutiliza [captura y selección](inputs-dropdowns.forms.amendment.v1.0.0.md), [acciones](buttons.actions.amendment.v1.0.0.md), [decisiones](selection-controls.decisions.amendment.v1.0.0.md) y [estado/unidad/filtros](badges-chips.status-filters.amendment.v1.0.0.md). Este documento añade la composición del formulario sin convertir ejemplos en capacidades de los controles.

## Guía semántica normativa

### Alcance del anfitrión y de App Shell

**FORM-SHELL-01.** Para captura convencional usa `bodyLayout="flex"` e inserta el formulario en Body (`children` en web). Header conserva empresa/usuario globales; Sidebar cambia de área y no representa pasos ni secciones del formulario. Section Header orienta con título de tarea, descripción y Breadcrumb solo si hay jerarquía real. Metadata puede mostrar un borrador confirmado; no infiere guardado. Body contiene instrucciones, grupos, errores, revisión y acciones.

**FORM-SHELL-02.** No dupliques el selector de la empresa global dentro de la captura. Puedes resumir su valor como consulta y filtrar catálogos por ese contexto. Grid mantiene su propósito de módulos alineados; conversation y conversation-preview conservan los suyos. Los cuatro tracks de Grid no autorizan cuatro campos por fila. El anfitrión controla valores, validación, alcance, permisos, guardado, anuncios, foco y recuperación.

**FORM-SHELL-03.** No fijes 1024 px como altura que recorta el contenido. La preferencia contextual es flujo vertical de la página con una región principal de desplazamiento, evitando scroll por sección. Footer persistente es opcional: reserva espacio y evita que cubra controles, ayudas, menús, errores o foco. Expandir/contraer Sidebar conserva captura y orden; prueba ancho útil, zoom al 200%, último campo y acciones. El Shell actual es de escritorio: estos criterios no prueban un Shell móvil automático.

P-SLOTS NOT_APPLICABLE al patrón: no crea maestro ni Slot. Se usan los Slots existentes de App Shell y Section Header con sus restricciones; Input y Button siguen siendo hermanos de una composición, no nuevos Slots entre sí. Las colecciones repetidas conservan identidad en el anfitrión y no acreditan un Slot Figma nuevo.

### FORM-SIMPLE-001 · Tarea breve y continua

**Intención:** capturar datos relacionados con un cierre claro. **Cuándo usar:** contacto u otra tarea sin etapas independientes. **Alternativa:** secciones para grupos que conviene comparar; pasos para secuencia dependiente. La cantidad de campos por sí sola no determina complejidad.

**FORM-SIMPLE-01.** Una columna como base, solo datos necesarios y orden de lectura de la tarea, no de la base de datos. Explica requisitos y qué se aplicará al guardar. Mantén Label visible y estable, ayuda necesaria cerca y placeholder como ejemplo, nunca como única etiqueta. La obligatoriedad es regla del dato, no el default técnico de Input; explica la convención de * y usa «opcional» consistentemente. No preselecciones consentimiento. Un valor inicial requiere dato vigente o motivo explícito.

**FORM-SIMPLE-02.** Cancelar como Secondary y Guardar cambios como Primary, del mismo tamaño. Evita Restablecer que borre toda la captura junto a Guardar, dos Primary o un botón deshabilitado sin motivo. Cancelar no implica descartar datos sin explicar una pérdida real. Una elección del formulario no se persiste por aparecer seleccionada.

### FORM-SECTIONS-001 · Grupos en la misma pantalla

**Intención:** mantener visión de conjunto entre grupos relacionados. **Cuándo usar:** Cuenta y operación junto a Entrega. **Alternativa:** pasos si cada etapa tiene objetivo propio y dependencia real.

**FORM-SECTIONS-01.** Nombra cada sección por su objetivo, conserva orden y relación entre grupos y ofrece un guardado conjunto de alcance claro. Usa texto largo o preguntas de opciones a fila completa cuando necesiten lectura. No conviertas cada campo en Card, ocultes grupos en acordeones por decoración ni distribuyas varios Guardar ambiguos. El scroll conserva el contexto de la tarea.

### FORM-STEPS-001 · Secuencia con dependencias

**Intención:** reducir carga de una tarea dividida en objetivos estables. **Cuándo usar:** Operación → Entrega → Revisión. **Alternativas:** secciones si se necesita comparar todo; gestión de tareas si son trabajos independientes que se completan en distinto orden. No crear un paso por campo ni usar wizard solo porque el formulario es largo.

**FORM-STEPS-01.** Continuar valida los datos aplicables del paso actual y avanza; no significa guardar toda la operación. Volver conserva captura y permite regresar sin exigir completar el paso actual. Si cambia una decisión anterior, revisa dependencias y comunica lo que debe corregirse. Explica si existe borrador persistido: avanzar en memoria no acredita guardado remoto.

**FORM-STEPS-02.** Stepper identifica un único paso actual y estados reales; el anfitrión aporta navegación y validación. No marcar completado por pulsar Label ni convertirlo en menú: Stepper actual no implementa navegación libre. Cambiar de paso lleva el foco al encabezado del nuevo contexto. No esconder instrucciones críticas en su caption de contraste reducido. Conserva [STEPPER-001](../components/stepper.contract.v1.0.0.md) y BUTTON-PATTERN-STEPS-001.

### FORM-REVIEW-001 · Revisar antes de confirmar

**Intención:** comprobar datos y consecuencia antes de un cierre relevante. **Cuándo usar:** volumen, riesgo o dependencias que lo justifiquen. En una tarea simple puede bastar la captura visible.

**FORM-REVIEW-01.** Resume valores legibles, empresa y alcance; distingue opcional no proporcionado de cero. Cambiar datos conduce a un destino específico y regresa a revisión sin enviar. Revalida cambios afectados. La confirmación nombra la acción real, como Guardar operación, no Continuar o Aceptar que oculten el registro/envío. El resumen no es otro formulario ni una familia Summary List nueva.

### FORM-ROWS-001 · Cantidad y distribución por fila

**FORM-ROW-COUNT-01.** Una fila con un campo es la regla base, incluidos formularios complejos. Prefiérela para nombre completo, correo, referencias largas o preguntas independientes. Dos campos pueden compartir fila si están relacionados, son breves, caben completos y el recorrido izquierda → derecha es inequívoco. No rellenar espacio con datos independientes.

**FORM-ROW-COUNT-02.** Tres campos son una excepción para datos breves de una misma unidad reconocible: número exterior, interior y código postal dentro de Domicilio, con Calle en una fila propia. No son el default. Evita cuatro o más campos de captura por fila en este patrón; una edición tabular necesita otro patrón con cobertura específica. 1/2/3 es una convención contextual aprobada de BlueHeart, no un límite universal de WCAG ni una variante de App Shell.

**FORM-ROW-WIDTH-01.** El ancho sigue al contenido esperado y al espacio útil de Body. Simple tiene máximo contextual de 720 px; complejo por secciones, 960 px. Son decisiones del patrón, no tokens ni anchos del maestro. Usa Fill hasta ese límite, alineación inicial y espacio restante libre; no estires un nombre a todo el escritorio. Dos columnas requieren ancho suficiente para Label, valor, ayuda y objetivo activable. Si no caben, apila en orden de lectura; no comprimas texto, recortes errores ni ocultes etiquetas. No se fija breakpoint global.

**FORM-ROW-WIDTH-02.** Un botón consume ancho aunque no cuente como campo. No agregarlo a una fila saturada. En contenedores estrechos, el par o trío de campos vuelve a una columna; una acción local pasa debajo de su campo y ayuda, antes del siguiente dato. Reorganiza el grupo final de acciones sin cambiar el orden semántico. Evita CSS order que altere el significado.

| Situación | Haz | Evita |
|---|---|---|
| Una pregunta independiente | Un campo por fila y ancho legible. | Emparejarlo con otra pregunta solo para ahorrar espacio. |
| Nombre y apellidos separados por el dato | Dos campos relacionados si caben. | Deducir que toda captura de nombre debe dividirse. |
| Tres piezas breves de domicilio | Trío excepcional dentro del grupo, con etiquetas completas. | Convertir tres columnas en estructura universal o usar cuatro por los tracks del Shell. |
| Texto largo, opciones o error extenso | Fila completa o apilado con lectura íntegra. | Encoger la tipografía o truncar la diferencia importante. |

### FORM-INLINE-ACTIONS-001 · Campos y acciones locales

**FORM-INLINE-SCOPE-01.** Un campo + un botón es la composición habitual cuando el botón opera sobre ese dato: Buscar contacto o Comprobar código. Dos campos + un botón son una excepción cuando forman la misma microtarea y caben, por ejemplo Serie + Folio + Consultar comprobante. No se guarda el resto del formulario. Nombra el objeto, valida solo el alcance afectado y presenta el resultado cerca; muestra espera y conserva captura ante fallo.

**FORM-INLINE-HIERARCHY-01.** Usa Secondary para la acción local; Text puede servir para apoyo de menor énfasis. Reserva Primary para la principal del formulario o paso. Guardar, Continuar y Cancelar permanecen en el grupo de acciones correspondiente, no junto a un dato aislado. No colocar Eliminar registro en esa fila. Una acción local no dispara el submit completo; el anfitrión debe conservar esa distinción también al operar con teclado.

**FORM-INLINE-ALIGN-01.** El botón debe alinearse con la **caja del input**, tomando únicamente el rectángulo del control. Label queda arriba; ayuda y error quedan debajo. Con talla y altura equivalentes, input y botón comparten borde superior e inferior. No alinear con Label, con el helper/error ni con el centro del bloque completo. No cambiar talla para compensar la altura de una etiqueta.

**FORM-INLINE-ALIGN-02.** El mensaje puede crecer o partirse sin desplazar verticalmente el botón respecto de la caja. Si Label ocupa varias líneas, reserva su espacio antes de alinear controles; en una microtarea de dos campos, conserva también la alineación de sus cajas. Al apilar por falta de espacio, la acción local queda después del campo y su ayuda. No exigir alineación horizontal entre elementos que ya ocupan filas distintas.

Las escenas aprobadas verifican cajas de 40 px y delta superior/inferior cero en ayuda, error y dos campos + botón. Esa medida acredita las capturas concretas, no una API de Row ni una implementación responsive. La implementación consumidora debe mantener la regla con etiquetas largas, mensajes dinámicos, zoom, menú expandido/contraído y los tamaños realmente usados, sin sobrescribir anatomía o tokens internos para fabricar coincidencia.

### FORM-FIELD-RELATIONS-001 · Significado, dependencia y validación

**FORM-RELATION-01.** Fila organiza espacio; grupo expresa información. Nombre y correo pertenecen a Destinatario aunque estén apilados. Usa título, proximidad, orden y agrupación semántica apropiados; `fieldset`/`legend` pueden identificar una unidad relacionada. Mantén nombres comprensibles por campo. Un borde, color o fila compartida no sustituyen la relación accesible.

**FORM-RELATION-02.** Empresa condiciona Cuenta; Mínimo y Máximo se validan juntos. Explica la dependencia o restricción cerca del grupo e identifica los datos a revisar. Una cuenta solo se conserva al cambiar empresa si sigue siendo válida; no elegir la primera opción silenciosamente. Antes del dato padre explica la indisponibilidad del hijo. La carga es feedback del anfitrión, no variante loading de Dropdown.

**FORM-CONDITIONAL-01.** Revela un campo condicional cerca de su elección, como Correo de entrega después de elegir correo. Mantén foco en la decisión; Tab llega al nuevo campo por orden natural. No enviar ni navegar inesperadamente. Al ocultarlo, retíralo de validación y envío aplicables; define conservación temporal para volver atrás o descarte. No enviar datos ocultos obsoletos ni arrastrar datos sensibles o de otra empresa sin comprobar contexto.

### FORM-HIERARCHY-001 · De la tarea al dato

**FORM-HIERARCHY-01.** Tarea → sección → subgrupo cuando aporte → Label → control → ayuda/error. Un título principal de tarea en Section Header; no duplicarlo en Body. Sección nombra el objetivo, por ejemplo Entrega del comprobante. Subgrupo reúne una entidad, por ejemplo Destinatario, y se omite cuando no aporta. Label nombra el dato y no se convierte en heading. Los niveles semánticos siguen la estructura HTML, sin saltos impuestos por la talla visual.

**FORM-HIERARCHY-02.** La importancia se expresa con estructura, texto y orden, no con colores decorativos o tamaños mezclados. Large no significa obligatorio ni Primary significa campo importante. Una acción principal termina la tarea; acciones locales tienen menor énfasis junto a sus datos; salida permanece en el grupo final. No llenar cada sección de Primary.

**FORM-BODY-01.** El contenido propio consume Body; los componentes conservan sus tokens internos. Entre bloques independientes usa xl=32 px. En superficies con borde o fondo distinto de primary, padding lg=24; una Card primary con radio de 16 px o sombra visible también usa 24. Los wrappers de superficie base sin delimitación usan 0. Segmentos md=16, contenido relacionado sm=8 y título/descripción xs=4. Mide el tramo visible según la [regla de composición](../foundations/body.contract.v1.0.0.md#padding-y-separación-en-composición). El producto ajusta composición solo con tokens Body existentes. No confundir espacio interno con separación exterior ni crear un catálogo de Cards. H1 24/32, H2 20/28, H3 16/24, descripción 14/20 conservan su propietario y no sustituyen las recetas de Label.

**FORM-SIZE-01.** Medium es punto de partida contextual de escritorio para Input/Dropdown/Button; Small requiere densidad justificada y Large comodidad/tarea focal. Conserva una talla por grupo comparable y la precisión activable; no cambies defaults técnicos. Checkbox/Radio/Toggle tienen una talla. En captura libre oculta un caret sin lista real. Badge MXN identifica unidad, no selecciona ni convierte; Tooltip no contiene instrucciones imprescindibles.

### FORM-REPEATER-001 · Repetir una entidad completa

**FORM-REPEATER-01.** Solo si el dato admite varios elementos. Cada grupo conserva título e identidad estable; valores/errores no migran al cambiar el orden. Agregar contacto crea un grupo y enfoca su primer dato. Quitar identifica el elemento; no equivale a eliminar un registro guardado. Después enfoca el grupo siguiente, anterior o Agregar si quedó vacío. Explica mínimo/máximo reales cuando existan: el ejemplo no los define. No se crea componente Repeater ni Slot nuevo.

### Elección de componentes y límites de API

Input captura una línea; Text Area varias; Dropdown elige catálogo y su consulta reduce opciones sin confirmar por foco; Radio group expresa una respuesta excluyente visible; Checkbox combina decisiones que se guardan juntas. «Elige al menos una» valida el conjunto, no `required` en cada casilla. Toggle expresa preferencia inmediata: sepárala de cambios que esperan Guardar; evita persistencia ambigua. Badge informa sin foco; Chip conserva su patrón de filtro/elección y no sustituye automáticamente una pregunta. Button ejecuta acciones. Resolver las guías de las familias realmente usadas.

No inventar controles de fecha/número, multiselect o autocomplete por un glyph. Las brechas existentes permanecen: DropdownField no expone error/helper/required propios y Radio group conserva «Select an option» fijo. La composición consumidora aporta contexto accesible y verifica asociaciones, foco y anuncios sin fingir props. Conserva la diferencia registrada de Radio multilínea y las excepciones cromáticas de Stepper, Badge/Inline Notification warning; ninguna acredita accesibilidad global.

### FORM-VALIDATION-001 · Corregir con contexto

**FORM-VALIDATION-01.** No mostrar error por cada carácter incompleto. Validar al terminar el dato cuando ayude, al continuar o al intentar guardar según la tarea. Mantener ayuda útil, requisitos y valores. Tras envío inválido, enfocar el resumen de problemas; sus enlaces llevan al campo concreto. Añadir mensaje local e invalidez asociada. El resumen es composición Body/enlaces, no una variante de Inline Notification. Error y foco pueden coexistir; no borrar el error por enfocar ni marcar Success sin comprobación real.

**FORM-VALIDATION-02.** Separar error del dato, restricción entre datos y permiso/servicio. «Incluye el dominio del correo» se corrige en el campo; una cuenta incompatible identifica la relación; un servicio caído no invalida el correo. No usar «Valor inválido» sin solución ni borrar captura. Read-only conserva consulta/copia; Disabled impide operar y necesita motivo visible. Un tooltip sobre un control deshabilitado no basta.

**FORM-FOCUS-01.** Lectura y Tab siguen la tarea, sin tabindex positivo ni movimientos por cada valor. Input/Text Area pueden enfocarse por clic o teclado para editar; Button y selección muestran su halo de teclado con `:focus-visible` y heurística del navegador. Distingue foco DOM de anillo. En pantalla nueva orienta con el título; al cambiar paso enfoca su encabezado; tras errores, resumen y desde él el campo. No recortar ni cubrir foco.

**FORM-KEYBOARD-01.** Enter envía cuando corresponde, sin saltar validación. Text Area conserva salto de línea. En Dropdown, Enter confirma la opción antes que el formulario; Escape cierra el desplegable sin cancelar toda la captura. Las acciones locales no realizan submit global. Radio conserva flechas para foco/selección; explorar candidatos de Dropdown no confirma valores. El anfitrión verifica estas interacciones, no las deduce de la escena.

### FORM-SUBMISSION-001 · Guardar, confirmar y recuperar

**FORM-SUBMISSION-01.** El clic inicia; la respuesta confirma. Define la transacción y evita duplicados también en el anfitrión. Guardando… usa Loading de Button. Decide si se permite edición durante espera y evita que respuestas antiguas sobrescriban cambios posteriores. Cancelar durante envío requiere poder abortarlo realmente; salir no revierte una solicitud. Si no está disponible, explica el motivo cercano.

**FORM-SUBMISSION-02.** Si falla, conserva datos útiles y recuperación concreta. Un fallo de conexión no demuestra que el servidor no guardó; sin confirmación, comprueba el estado antes de repetir una operación que pudiera haberse registrado. Borrador es opcional y requiere capacidad real; distingue local/remoto y no afirma registro definitivo completo. Los mensajes del flujo no agregan variantes loading/error a controles que no las exponen.

**FORM-RESULT-01.** Solo con resultado confirmado, identifica qué se guardó y en qué empresa/contexto, mostrando valores definitivos si el servidor los ajustó. Ofrece siguiente paso pertinente: volver al listado o ir al detalle. No cerrar antes de resolver errores ni depender solo de un toast temporal. Crear otro es opcional y abre captura nueva sin arrastrar datos sensibles. Edición posterior carga valores guardados y explica permisos; cambios simultáneos requieren revisar el conflicto antes de sobrescribir.

### FORM-EXIT-CONTEXT-001 · Salir o cambiar de empresa

**FORM-EXIT-01.** Sin cambios, salir directamente. Con trabajo que se perdería, explicar qué se descarta y ofrecer Seguir editando como alternativa conservadora; Descartar cambios es Danger. Cancelar, navegador, cambio de área o empresa deben resolver la pérdida real según el flujo. No confirmar toda salida aunque no haya trabajo pendiente. El contenedor de confirmación necesita cobertura propia; no se crea Modal por este patrón.

**FORM-EXIT-02.** Resuelve captura pendiente antes del cambio global de empresa. Después recarga catálogos/permisos y no reutilices cuentas o borradores de otra empresa silenciosamente. Si hay borrador o expiración, informa su estado real y la recuperación posible; no prometas continuidad tras cerrar sin capacidad. Descartar captura no elimina un registro guardado: borrar es otra operación con alcance y recuperación propios.

## Mapeo y aceptación para consumo autocontenido

Por formulario registrar patrón elegido y motivo, empresa/contexto, familias y exports reales, ubicación Body/Flex, secciones/subgrupos, filas y orden, ancho/talla, datos iniciales y origen, obligatoriedad, dependencias/condicionales y envío aplicable, alcance/jerarquía de acciones, referencia de alineación a caja, validación/resumen, foco, guardado/duplicados/resultado incierto, salida y recuperación. Conservar los requisitos completos en el traspaso; no sustituirlos por el nombre del patrón o del PDF.

Consultas de APP-SHELL-001 y de las familias en `applies_to` deben recuperar este documento. Leerlo selectivamente cuando el presupuesto de contexto lo requiera, sin truncar reglas. No declarar familias, exports, APIs, tokens ni maestros nuevos por indexarlo. La aprobación es documental y contextual; las implementaciones concretas verifican sus reglas, asociación accesible y comportamiento según alcance.
