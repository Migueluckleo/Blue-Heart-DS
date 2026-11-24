---
contract_schema: sdd-project/0.2
contract_id: TABS-001
amendment_id: TABS-LOCAL-NAVIGATION-PATTERNS-001
name: Tabs · Navegación local y distinción frente a Chips
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-24
base_contract: specs/components/tabs.contract.v1.0.0.md
applies_to: [TABS-001, TAB-001, CHIP-001, APP-SHELL-001, SECTION-HEADER-001, DOT-001, STEPPER-001, RADIO-001, RADIO-GROUP-001, DROPDOWN-MENU-001, BUTTON-001]
related_components: [TABS-001, TAB-001, CHIP-001, APP-SHELL-001, SECTION-HEADER-001, DOT-001, STEPPER-001, RADIO-001, RADIO-GROUP-001, DROPDOWN-MENU-001, BUTTON-001, FOUNDATIONS-BODY-001]
pattern_ids: [TABS-LOCAL-SECTIONS-001, TABS-CHIPS-DISAMBIGUATION-001, TABS-FILTERS-COEXISTENCE-001, TABS-FORM-PANELS-001, TABS-OVERFLOW-001]
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/tabs-contextual-usage.approval.2026-11-24.json
supersedes_scope: Añade selección semántica entre Tabs y Chips y composición local; conserva los patrones previos, componentes, datos, tokens y API
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Tabs · Patrones de navegación local

Criterios del PDF de 22 páginas aprobado explícitamente el 24 de noviembre de 2026. Se usan con las guías de [Tabs](../components/tabs.contextual-usage.amendment.v1.0.0.md), [Tab](../components/tab.contextual-usage.amendment.v1.0.0.md), [Chip](../components/chip.contextual-usage.amendment.v1.0.1.md), [estado/filtros](badges-chips.status-filters.amendment.v1.0.0.md) y [formularios en App Shell](forms.app-shell.amendment.v1.0.0.md). No crea familias ni variantes por nombrar patrones. P-SLOTS NOT_APPLICABLE al patrón; conserva REQUIRED en Tabs y los Slots existentes del Shell.

## Guía semántica normativa

### TABS-CHIPS-DISAMBIGUATION-001 · Elegir por intención

**TABS-DECISION-01.** Antes de construir, registrar contexto que permanece, significado de cada opción, efecto de activarla y contenido que se conserva. Si cada opción abre una sección hermana con panel propio, usar TABS-001 + TAB-001. Si agrega, reemplaza, combina o quita criterios de la vista actual, usar CHIP-001 con el modo pertinente. Si responde un dato, ejecuta una acción, cambia de módulo o valida una etapa, usar el patrón de captura, acción, navegación o pasos correspondiente.

**TABS-DECISION-02.** Forma, contador, cantidad de opciones, selected y cambio visual no determinan familia. No convertir Pill/Segmented en Chip single por parecer redondeadas. No decidir por palabras aisladas ni por reutilizar una tabla. Un wrapper ARIA no transforma filtrado en sección. Si el brief es ambiguo, precisar el efecto con el contexto disponible y registrar la decisión material pendiente antes de construir lo dependiente.

| Brief y efecto declarado | Resolución | Motivo |
|---|---|---|
| «Pestañas del cliente: datos, movimientos, documentos» | Tabs, un panel por sección. | Secciones hermanas del mismo cliente. |
| «Pill para Resumen y Actividad», cada una abre su contenido | Tabs type=pill. | La presentación no sustituye la identidad. |
| «Emitidos/Recibidos», subvistas con alcance propio, misma tabla | Tabs si realmente son secciones. | La tabla común no elimina identidad y alcance. |
| «Mostrar solo movimientos pendientes» | Chip/filtro pertinente. | Restringe el conjunto de la vista actual. |
| «Incluir Ingresos y Egresos» | Chip multiple. | Criterios combinables dentro del panel. |
| «Una moneda para la vista actual» | Chip single. | Elección excluyente de un criterio. |
| «Elige el formato que se guardará» | Radio/Dropdown. | Valor del formulario. |
| «Lista/Cuadrícula» solo cambia presentación | Elección de modo, resolver familia disponible según contrato. | No justifica Tabs ni crear Content Switcher. |

**TABS-DECISION-03.** Si requiere Tabs, resolver el export real `Tabs` y sus items/paneles en web, o instancias vinculadas Tab/Tabs y Slot en Figma. La falta de una receta pronta no autoriza sustituir por Chips. Registrar la carencia de capacidad de la herramienta si impide el patrón; no disfrazar controles propios ni editar la biblioteca maestra para completar una pantalla.

### TABS-LOCAL-SECTIONS-001 · Secciones dentro de App Shell

**TABS-SHELL-01.** Header y Sidebar conservan contexto global. Sidebar cambia de área; no sustituye las secciones del objeto. Section Header identifica cliente, cuenta o tarea; Tabs se coloca después y antes del panel que gobierna, alineada y próxima al contenido. Para un detalle convencional usa Body/Flex; el patrón no crea `bodyLayout=tabs`. Los controles oficiales conservan sus recetas y el contenido propio usa Body por propiedad.

**TABS-SHELL-02.** Mantén una sola selección del conjunto y un panel por opción. Una acción del objeto puede quedar fuera del conjunto con alcance claro; una acción de Documentos pertenece a ese panel. No insertar Guardar/Exportar/Eliminar como Tabs ni mezclar acciones y nombres de secciones en la misma fila. Evita Tabs anidadas por defecto: para categorías del mismo conjunto evalúa filtros; para comparar contenido, secciones simultáneas; para secuencia dependiente, pasos. No usar Tabs si ocultan información que requiere leerse de forma continua o compararse a la vez.

**TABS-URL-01.** Una sección puede tener enlace profundo o estado en URL mediante el anfitrión sin convertirse automáticamente en módulo global. Tabs no implementa router, href, inicio, Atrás/Adelante, URLs inválidas o preservación de posición; componerlos y probarlos si se requieren. No fabricar paneles ficticios para navegar a páginas independientes.

### TABS-FILTERS-COEXISTENCE-001 · Navegación y filtros con alcance distinto

**TABS-FILTERS-01.** Pueden convivir Tabs de cliente (Datos generales / Movimientos / Documentos) y Chips dentro de Movimientos (Ingresos / Egresos / Traspasos). Tabs abre la sección; Chips modifica el conjunto dentro de ese panel. Cada grupo tiene su nombre, alcance, ubicación y semántica. No presentar dos filas redondeadas indistinguibles sin contexto ni sustituir la primera por Chips.

**TABS-FILTERS-02.** Declarar si filtros se conservan por panel o se comparten, cuándo se aplican y qué cuenta cada cantidad. Ningún componente lo deduce por su posición. Dot de Tab cuenta contenido del panel con significado accesible; Counter de Chip cuenta el alcance de su criterio. Ni la cantidad ni su formato determinan la familia. Conserva cero real y no lo inventes durante carga.

**TABS-FILTERS-03.** Una respuesta vacía o un fallo de consulta conserva la sección seleccionada, con feedback y recuperación en el panel. No cambiar a otra Tab automáticamente, invalidar el filtro sin razón o borrar criterios útiles. Disabled no significa cero resultados. El anfitrión controla disponibilidad, consulta, aplicación y persistencia; el patrón no agrega loading/error a Tab o Chip.

### TABS-FORM-PANELS-001 · Captura en secciones hermanas

**TABS-FORM-01.** Tabs permite consultar y editar secciones en orden libre. Cambiar de sección no valida una etapa ni significa Guardar. Si continuar depende de validación secuencial, usar FORM-STEPS-001 con Stepper y acciones, no Tabs. Si es importante comparar todos los datos, preferir FORM-SECTIONS-001 y contenido simultáneo.

**TABS-FORM-02.** Definir alcance del guardado (por sección o conjunto) y si se conserva captura al volver. El componente web actual mantiene paneles montados ocultos y el fixture conserva texto de Input; no acredita borrador remoto ni continuidad tras recargar. No borrar datos por cambiar de Tab ni prometer persistencia no implementada. El anfitrión resuelve pérdida real al salir/cambiar empresa conforme a formularios.

**TABS-FORM-03.** Si Guardar detecta un error en un panel oculto, el resumen identifica la sección; al seguirlo, activar esa sección y después enfocar el campo visible. No enfocar un campo oculto ni crear una Tab Error para sustituir el mensaje local. Al cambiar de Tab normalmente se conserva foco en la Tab activada; el salto a campo es una recuperación explícita, no la regla de toda navegación.

### TABS-OVERFLOW-001 · Nombres y acceso cuando falta ancho

**TABS-OVERFLOW-01.** Mantener una fila legible y el vínculo con el panel. Revisar nombres y jerarquía antes de comprimir. El anfitrión puede resolver desplazamiento horizontal con teclado y descubrimiento, manteniendo visible la enfocada y sin recortar el halo. Esa composición requiere implementación y QA propios: el API actual no incorpora scroll buttons, Más, orientación vertical o adaptación móvil. No cortar la parte distintiva, reducir tipografía/tokens ni sustituir la familia por Chip para que quepa.

## Registro para consumo autocontenido y aceptación

Antes de implementar, el mapa identifica intención, familia elegida y por qué; contexto que permanece; ID/Label/panel por sección; tipo uniforme; selección inicial; icono/conteo con alcance y nombre accesible; estados, datos y disponibilidad; orden y teclado; coexistencia/persistencia de filtros; URL/overflow/errores/captura si aplican. Resolver las fuentes e instancias/exports reales después de esa decisión. El nombre «Tabs» en el mapa no prueba reutilización ni semántica.

La consulta de cualquier familia en `applies_to` recupera este patrón sin convertirlo en capacidad del átomo. El handoff conserva completas las reglas pertinentes, con sus fuentes y límites. Probar casos de secciones, filtro único, filtros combinables, tabla compartida y Pill; verificar activación manual y recuperación cuando se use. No diagnosticar una causa histórica concreta del uso incorrecto de Chips sin el artefacto original.
