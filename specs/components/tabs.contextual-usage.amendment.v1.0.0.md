---
contract_schema: sdd-project/0.2
contract_id: TABS-001
amendment_id: TABS-CONTEXTUAL-USAGE-001
name: Tabs · Uso contextual y navegación entre paneles
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-24
base_contract: specs/components/tabs.contract.v1.0.0.md
applies_to: [TABS-001]
dependencies: [TAB-001]
related_components: [TAB-001, CHIP-001, APP-SHELL-001, SECTION-HEADER-001, DOT-001, STEPPER-001]
pattern_ids: [TABS-LOCAL-SECTIONS-001, TABS-CHIPS-DISAMBIGUATION-001, TABS-FILTERS-COEXISTENCE-001, TABS-FORM-PANELS-001, TABS-OVERFLOW-001]
slot_applicability: REQUIRED
approval_ref: sources/inventories/tabs-contextual-usage.approval.2026-11-24.json
supersedes_scope: Amplía uso contextual y Description; conserva tres tipos, Slot, datos, tokens, API y activación manual existentes
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Tabs · Guía contextual

Adopta la revisión explícita del PDF de 22 páginas: «Así queda bien, crea el Markdown de Tabs e intégralo a sus componentes y patrones para que las skills autocontenidas distingan claramente cuándo usar Tabs y cuándo Chips». Es documentación de uso, no una nueva implementación ni una corrección cromática. Conserva [TABS-001](tabs.contract.v1.0.0.md), su JSON delegado y la [guía de Tab](tab.contextual-usage.amendment.v1.0.0.md). Lee los [patrones de navegación y selección](../patterns/tabs.local-navigation.amendment.v1.0.0.md) para elegir la familia por intención.

## Guía semántica normativa

### Intención y alternativas

**TABS-INTENT-01.** Usa Tabs para abrir secciones hermanas de un mismo contexto, con una selección y un panel asociado a cada opción. Datos generales, Movimientos y Documentos del mismo cliente son secciones; la persona sigue en ese cliente y puede volver a otra sección. Define qué representa cada opción, qué contenido abre y qué contexto se conserva antes de elegir la presentación.

**TABS-INTENT-02.** Usa Chip cuando la elección selecciona, combina o quita criterios dentro de la vista actual. Una opción activa, un cambio de contenido, un contador o una forma redondeada no bastan para decidir Tabs. Pill y Segmented siguen siendo Tabs si abren paneles. No resolver secciones con Chip single, botones `aria-pressed` o Chips renombrados por comodidad del renderer.

**TABS-INTENT-03.** Dos paneles pueden reutilizar la misma tabla. Emitidos y Recibidos pueden tener alcance y acciones propios: documentar su identidad antes de clasificarlos. En sentido inverso, envolver un filtro en `role=tabpanel` no cambia su intención. Todos, Pendientes y Resumen no son palabras reservadas a una familia. Lista/Cuadrícula solo como cambio de formato no justifica Tabs por sí solo.

| Necesidad | Familia y razón | Evita |
|---|---|---|
| Abrir secciones del cliente | Tabs; un panel por sección. | Chip single como pestaña. |
| Mostrar solo movimientos pendientes | Chip/filtro pertinente; restringe la vista actual. | Paneles ficticios para cada criterio. |
| Incluir Ingresos y Egresos | Chip multiple; criterios combinables. | Exclusividad de Tabs. |
| Quitar Periodo: este mes | Chip removable; retira una restricción. | Cerrar secciones o borrar registros con X. |
| Elegir un dato que se guardará | Radio/Dropdown u otro control de captura pertinente. | Confundir valor del formulario con navegación. |
| Cambiar de módulo o destino independiente | Menu item/enlace. | Tablist sin paneles del contexto actual. |
| Validar una etapa y continuar | Stepper + Button y anfitrión. | Tabs como wizard o progreso. |
| Guardar, exportar o eliminar | Button. | Mezclar acciones con secciones. |

### Tres presentaciones, una función

**TABS-TYPE-01.** El conjunto y sus hijos usan un solo tipo. No mezclar underline, pill y segmented en la misma fila, ni usarlos como tallas de una misma presentación. No existe `size=small/middle/large` en Tab/Tabs.

| Tipo existente | Contexto de uso aprobado | Base conservada |
|---|---|---|
| underline | Punto de partida para secciones principales de un detalle o área de trabajo. | Tab 44 px; padding horizontal 16/vertical 12; grupo gap 0, divisor inferior 1 px estirable. Default web. |
| pill | Secciones dentro de una región definida que necesita una fila más compacta, con relación clara al panel. | Tab 36 px; padding 16/8; grupo gap 4 sin contenedor pintado. La silueta no la vuelve Chip. |
| segmented | Pocas secciones cortas de una misma región. | Tab 28 px; padding 12/4; grupo padding 4, gap 4, radio 8 y fondo neutro sutil. |

**TABS-TYPE-02.** El tipo expresa composición, no importancia de negocio ni estado. No inventar Content Switcher, Toggle, orientación vertical, cierre de pestañas o activación automática por elegir Segmented. Las alturas visuales no acreditan comodidad táctil por sí solas; comprobar objetivos y separación en el contexto.

### Grupo, cantidad e identidad

**TABS-GROUP-01.** Mínimo dos opciones. No hay máximo técnico declarado; la raíz recomienda hasta seis y considera ideal 2–5 en Segmented. Son recomendaciones de legibilidad, no `maxChildren`. Las cuatro instancias iniciales de Figma son una muestra. Si hay demasiadas secciones, revisar jerarquía y ancho; no ocultarlas o sustituirlas por Chips para cumplir un límite inventado.

**TABS-GROUP-02.** P-SLOTS REQUIRED: Slot compartido con Tab como preferencia, admite insertar, retirar y reordenar Tab del mismo tipo. El consumidor Figma coordina tipo de grupo e hijos, orden, paneles y selección; no asumir sincronización automática. El equivalente web es `items`, no evidencia nueva de Slot nativo. Tab tiene anatomía fija y P-SLOTS NOT_APPLICABLE.

**TABS-ID-01.** Cada item conserva ID único y estable, Label visible no vacío y panel propio. `selectedId` identifica un item vigente; no vincular paneles por posición. Reordenar conserva identidad, contenido y selección. El API no corrige todos los datos inconsistentes: un selectedId inexistente puede dejar todos los paneles ocultos. Si se retira una opción o cambia disponibilidad, el anfitrión resuelve la selección conscientemente.

### Teclado, Focus y selección

**TABS-KEYBOARD-01.** La implementación actual es horizontal con activación manual. Tab/Shift+Tab entra o sale del conjunto; hay un punto de entrada habilitado. Flechas izquierda/derecha mueven foco entre opciones habilitadas, omiten disabled y hacen ciclo; Home/End llevan a extremos. Mover foco no abre otro panel. Enter/Espacio activa la enfocada y actualiza la selección mediante el anfitrión. En la implementación actual, Tab sale al panel activo y después a su contenido.

**TABS-FOCUS-01.** Selected indica el panel vigente; Focus localiza la siguiente operación al navegar con teclado. El anillo usa `:focus-visible` y la heurística del navegador: un clic puede dar foco DOM sin exigir anillo. No simular Focus por hover/clic ni confundirlo con selección. El trazo es 2 px con offset exterior 4 px; el contenedor reserva espacio y no lo recorta. Cambiar Label, icono o conteo conserva el halo adaptable.

**TABS-ACCESS-01.** Usa el conjunto completo con `tablist` nombrado, cada `tab` con `aria-selected` y `aria-controls`, y cada `tabpanel` nombrado por su Tab. Una Tab aislada no coordina paneles. No copiar las flechas de Chip single/Radio: en esos controles cambian foco y selección; en estas Tabs manuales solo exploran hasta activar. La asociación ARIA no sustituye la decisión semántica de producto.

### Estado del control y contenido del panel

**TABS-STATE-01.** Tab tiene default, hover, focus y disabled, independientes de selected. No expone pressed, loading, error, success o checked como variantes. Un fallo al obtener datos o un estado vacío permanece en el panel correspondiente, con mensaje y recuperación pertinentes. Reintentar es Button dentro del panel; no renombrar la Tab a Error ni sustituirla por Chip.

**TABS-DISABLED-01.** Disabled expresa indisponibilidad, no ausencia de resultados ni falta de importancia. Impide activar y se omite al recorrer el teclado. Conserva el selected recibido y puede conservar su panel; no selecciona otra sección automáticamente. Explica la condición desde el anfitrión cuando sea relevante y coordina selección/disponibilidad. Cero documentos puede abrir un panel vacío habilitado.

### Ancho y descubrimiento

**TABS-WIDTH-01.** El texto y los opcionales determinan el ancho. La muestra no fija el ancho total ni una cuadrícula de cuatro columnas. Mantén nombres completos y orden de lectura; revisa la redacción si no cabe. No reducir padding/tipografía, cortar la parte distintiva ni usar dos filas que pierdan relación con el panel.

**TABS-OVERFLOW-01.** El anfitrión propone mantener una fila y resolver desplazamiento horizontal cuando haga falta, con acceso de teclado, descubrimiento y Tab enfocada visible. La implementación actual no incorpora scroll buttons, menú Más, orientación vertical, agrupación automática o adaptación móvil. Una composición debe implementar y probar esa necesidad; indexar esta guía no la implementa. No sustituir Tabs por Chips para resolver ancho.

### Temas y límites conservados

**TABS-THEME-01.** Underline y Pill consumen roles de marca/neutros por tema. Segmented selected/default y selected/hover conservan tonos fijos de la raíz para los cuatro temas. El QA local registró 4.389:1 y 2.262:1 respectivamente para blanco sobre su fondo; no redondear a AA ni recolorear en el consumidor. Selected/focus usa superficie clara y texto/icono primarios con anillo. No trasladar el color hover a toda la matriz ni copiar la excepción de Badge warning a Tabs. No se certifica accesibilidad global.

### API y responsabilidades

| API pública | Uso |
|---|---|
| `Tabs` | `label`, `items`, `selectedId`, `onSelectionChange`; `type='underline'`, `className` opcional. |
| `TabsItem` | `id`, `label`, `panel`; opcionales `accessibleLabel`, `icon`, `badgeCount`, `disabled`. No expone showIcon por item. |
| Anfitrión | Estado, datos, autorización, carga, errores, conteo, persistencia, URL, overflow y recuperación. |

**TABS-HOST-01.** Todos los paneles web permanecen montados y los inactivos se ocultan. Esto puede conservar captura local al ir y volver; no acredita borrador remoto, continuidad tras recargar ni persistencia de un formulario que el anfitrión desmonta. Una ruta/URL puede representar selectedId mediante composición del anfitrión; Tabs no expone router, href, Atrás/Adelante o validación de rutas automáticamente.

## Description exacta

Texto para futura sincronización autorizada; no afirma escritura/readback Figma en esta entrega.

TABS-001 · Uso contextual v1.0.0. Usa Tabs para abrir secciones hermanas del mismo contexto, con una selección y un panel por opción. Underline, Pill y Segmented conservan navegación; no sustituir por Chips redondeados. Chips selecciona o filtra dentro de la vista actual. Mantén al menos dos Tab del mismo tipo, IDs estables y nombre del conjunto. Flechas mueven Focus; Enter/Espacio activa. El anfitrión gestiona datos, conteo, URL y overflow.

## Aceptación y fuentes

Resolver TABS-001 recupera esta guía, la de Tab y los patrones completos. Comprobar elección por intención, tres tipos sin size, identidad/paneles, mínimo dos, Slot, activación manual, Focus, disabled, contenido vacío/error y responsabilidades externas. La matriz y las 12 pruebas del PDF acreditan solo el fixture local documentado, no todos los productos ni Figma nuevo.

Procedencia: criterios contextuales EXPLICIT por aprobación del PDF; API y límites OBSERVED en `implementations/web/src/components/tabs.tsx`; anatomía/datos EXPLICIT en base/JSON delegados; contrastes OBSERVED en `qa/implementations/tabs-chain.v1.0.0.review.md`. La aprobación adopta el uso contextual sin reescribir esas evidencias. Referencias de consulta del PDF: [WAI Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), [GOV.UK Tabs](https://design-system.service.gov.uk/components/tabs/), [Carbon Tabs](https://www.carbondesignsystem.com/building-blocks/core/components/tabs/guidelines). No se importan variantes de otros sistemas.
