---
contract_schema: sdd-project/0.2
contract_id: BUTTON-001
amendment_id: BUTTON-CONTEXTUAL-USAGE-001
name: Buttons · Uso contextual
type: component-amendment
version: 1.0.2
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/buttons.contract.v1.0.0.md
applies_to: [BUTTON-001]
supersedes_scope: Guía de uso y Description de buttons.usage.amendment.v1.0.1.md; conserva la base visual, los datos, las variantes y el API
dependencies: [LOADER-001]
pattern_ids: [BUTTON-PATTERN-FORM-001, BUTTON-PATTERN-STEPS-001, BUTTON-PATTERN-TOOLBAR-001, BUTTON-PATTERN-ROW-001, BUTTON-PATTERN-DESTRUCTIVE-001]
related_components: [ICON-BUTTON-001, TABLE-001, STEPPER-001, DROPDOWN-MENU-001]
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/buttons-contextual-usage.approval.2026-11-19.json
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Buttons · Guía contextual de uso

Amplía [BUTTON-001](buttons.contract.v1.0.0.md) y sustituye únicamente la guía semántica y las descripciones de [uso v1.0.1](buttons.usage.amendment.v1.0.1.md). La aprobación corresponde al PDF de 16 páginas con la aclaración de Focus. Los patrones asociados se encuentran en [composición de acciones](../patterns/buttons.actions.amendment.v1.0.0.md). Se mantienen la geometría, los bindings, el API y las 90 combinaciones existentes.

## Guía semántica normativa

### Propósito y elección del control

**BUTTON-INTENT-01.** Usa Button cuando una persona decide iniciar una operación. La etiqueta anticipa el resultado. Decide en este orden: intención, variante, tamaño, texto e iconos, estado y patrón. El anfitrión es la pantalla o flujo que conecta la operación, los permisos, las confirmaciones, los resultados y el foco.

| Intención | Control apropiado | Haz | Evita |
|---|---|---|---|
| Iniciar una operación | Button nativo | Guardar cambios, crear un reporte, abrir un diálogo o validar y avanzar un paso. | Representar una operación mediante un enlace sin destino real. |
| Cambiar de destino | Button/link con `href` | Ver historial con URL concreta. | Guardar, aprobar o eliminar mediante Link. |
| Elegir valores | Radio, Checkbox o Toggle según el caso | Conservar exclusividad y estado propios del control de selección. | Simular selección con Primary. |
| Cambiar de sección | Tabs, menú o navegación correspondiente | Usar la semántica de navegación de esa región. | Inventar `selected` como variante visual de Button. |
| Acción reconocible en poco espacio | Icon Button | Conservar nombre accesible y contexto suficiente. | Ocultar Label de Button para fabricar un Icon Button. |

### Variante y jerarquía

**BUTTON-VARIANT-01.** La variante expresa intención y énfasis; no expresa tamaño ni estado. Usa una única acción principal por vista o diálogo y conserva un tamaño coherente entre las acciones de un grupo.

| `variant` | Cuándo usar | Haz | Evita |
|---|---|---|---|
| `primary` | Completa el objetivo principal de la vista o diálogo. | Guardar cambios al terminar la edición. | Otro Primary para Cancelar que compita por atención. |
| `secondary` | Alternativa visible que acompaña a la principal. | Cancelar o Volver a edición. | Dar jerarquía secundaria a la acción que debe encontrarse primero. |
| `text` | Acción local terciaria de menor énfasis. | Restaurar filtros junto a los filtros aplicados. | Usarla como acción principal del formulario o como navegación a otra página. |
| `link` | Navegación a una URL concreta. | Ver historial con `href`. | Ejecutar un guardado, aprobación o eliminación. |
| `danger` | Acción destructiva o irreversible. | Eliminar borrador después de identificar objeto y consecuencia y solicitar confirmación. | Usar rojo como acento para Crear o Guardar. |

En la confirmación destructiva, Danger representa la decisión crítica. No agregues otro Primary que compita con ella. El patrón define una alternativa conservadora.

### Tamaño según contexto

Los nombres técnicos son `small`, `medium` y `large`. Normaliza «middle» a `medium`. Las medidas son datos delegados al [recetario de Buttons](../data/buttons.v1.0.0.json), no tamaños nuevos.

| Regla | `size` | Contexto apropiado | Evita |
|---|---|---|---|
| P-SIZE-01 | `small`, 32 px de alto | Acciones locales repetidas en tablas o herramientas densas de escritorio, cuando contexto y puntero permiten distinguir cada objetivo. | Reducirlo solo para que quepan más acciones o para resolver una etiqueta larga. |
| P-SIZE-02 | `medium`, 40 px de alto | Punto de partida contextual para formularios y barras de acciones de escritorio de densidad normal; acompaña controles de escala equivalente. | Aplicarlo universalmente sin revisar el área de interacción real. |
| P-SIZE-03 | `large`, 48 px de alto | Flujos breves y focalizados, baja densidad o contextos táctiles que necesitan un objetivo más cómodo. | Usarlo para expresar prioridad, que ya corresponde a la variante. |

**BUTTON-SIZE-COHERENCE-01.** Mantén el tamaño dentro del grupo. Si falta espacio, reorganiza o apila las acciones antes de mezclar tamaños. El default web sigue siendo `large`; el criterio contextual de `medium` no cambia ese default. Verifica ancho, alto y separación del objetivo en la pantalla. La altura por sí sola no demuestra conformidad de accesibilidad.

### Texto e iconos

Label conserva el significado de la acción. Los iconos son opcionales e independientes, apagados por defecto. Usa Phosphor oficial y conserva tamaño, color y peso de la receta; la fuente conserva Outline/Light. El API admite otros pesos, pero esa capacidad no define una jerarquía ni un estado nuevo.

| Regla | Configuración | Cuándo usar | Haz | Evita |
|---|---|---|---|---|
| P-ICON-01 | Sin icono: ambos `show…Icon=false` | Primera opción si el texto se entiende inmediatamente. | Guardar cambios solo con texto. | Decorar todas las acciones por sistema. |
| P-ICON-02 | Derecho: `showRightIcon=true` y `rightIcon` | Anticipa dirección del flujo o cambio de contexto real. | Continuar con ArrowRight; Abrir portal con marca externa si el destino lo justifica. | Un caret de menú para comunicar avance. |
| P-ICON-03 | Izquierdo: `showLeftIcon=true` y `leftIcon` | Ayuda a reconocer una operación como creación o descarga. | Plus con Crear reporte; DownloadSimple con Descargar reporte. | Dejar el PlusCircle de muestra en una acción sin relación. |
| P-ICON-04 | Ambos visibles con swaps independientes | Excepción: cada icono comunica algo diferente y el espacio lo permite. | Descarga a la izquierda y marca externa a la derecha solo si la operación realmente combina descarga y apertura externa. | Duplicar signos o mezclar pistas contradictorias. |

Un caret no implementa un menú. Si abre opciones, el anfitrión debe aportar menú real, semántica, teclado, apertura/cierre y retorno de foco, con las capacidades públicas disponibles. No inventes propiedades que el API de Button no expone.

### Etiquetas y redacción

**BUTTON-CONTENT-01.** Usa verbo en infinitivo y objeto cuando aclare; la guía fuente establece hasta tres palabras. Escribe Enviar solicitud en lugar de Aceptar si este último oculta la operación. Mantén los términos del producto: Guardar borrador y Publicar reporte son decisiones diferentes.

**P-CONTENT-01.** Ante una traducción larga o un término de negocio indispensable, conserva el significado y revisa el layout. Registra la excepción al límite editorial. No trunques una acción crítica ni inventes abreviaturas.

**BUTTON-CONTENT-02.** Durante la carga usa gerundio y elipsis: Guardar cambios → Guardando…; Enviar solicitud → Enviando…; Eliminar borrador → Eliminando…. El API usa `loadingLabel` para ese texto.

Cancelar cierra un intento; Descartar cambios pierde trabajo. Explica la pérdida antes de confirmar. La etiqueta y el encabezado identifican el objeto; en acciones críticas el diálogo nombra el registro afectado.

### Estados y navegación con teclado

Las cinco variantes y los tres tamaños conservan seis estados: 5 × 3 × 6 = 90 combinaciones.

| Estado | Significado y uso | Haz | Evita |
|---|---|---|---|
| `default` | Acción disponible. | Permitir iniciar la operación. | Usarlo para comunicar éxito de una operación anterior. |
| `hover` | Exploración temporal con puntero. | Dar respuesta visual al pasar el puntero. | Mostrar el anillo Focus o esconder información indispensable fuera de hover. |
| `pressed` | Activación momentánea al presionar. | Dar respuesta durante la pulsación. | Confundirlo con selección persistente o éxito. |
| `focus` | Ubicación al navegar con teclado. | Mostrar la señal al llegar con Tab o Shift+Tab. | Mostrarla por hover o por clic, o usarla como selección persistente. |
| `loading` | Operación ya iniciada. | Sustituir iconos por Loader, comunicar ocupado y bloquear duplicados. | Aceptar una segunda activación o usar el spinner como error. |
| `disabled` | No puede iniciarse la acción. | Explicar el requisito para habilitarla. | Ocultar el motivo en una ayuda que exija enfocar el botón deshabilitado. |

**BUTTON-FOCUS-01.** Focus se muestra al navegar con teclado, especialmente con Tab y Shift+Tab; no se activa por hover ni por clic. Enter y Espacio activan el botón enfocado. El anillo identifica dónde está la persona; no indica que la acción esté seleccionada o haya terminado. En web conserva el tratamiento `:focus-visible` del componente oficial. En una muestra aislada, `previewState="focus"` ilustra ese estado; no se fija como estado de producto.

No recortes el anillo con el contenedor. Al abrir o cerrar un diálogo conserva una ubicación lógica de foco; distinguir la ubicación del foco de teclado de su apariencia evita activar una decoración de Focus por cualquier interacción de puntero.

`success`, `error` y `selected` no amplían la matriz de Button. El éxito y el error pertenecen al flujo; la alternancia de Icon Button tiene su propio contrato.

### Carga, error y recuperación

**P-FLOW-01.** Antes de activar, explica qué se guardará y los requisitos pendientes. Tras activar, comunica Guardando…, conserva el ancho reservado y evita un segundo envío. El Loader interno es decorativo; Button comunica ocupado. La operación real pertenece al anfitrión.

**P-FLOW-02.** Cuando termina, retira la carga y comunica el resultado. Si falla, conserva los datos útiles, explica el error y ofrece reintento solo si repetir la operación es válido. No dejes girando el indicador como mensaje de error.

**P-FLOW-03.** Conserva o mueve el foco según el resultado y el siguiente paso del flujo. No prometas Cancelar si el proceso real no admite cancelación. Para Disabled usa una explicación específica como «Selecciona al menos un reporte para exportar».

### Anatomía, temas y tokens

| Parte | Responsabilidad |
|---|---|
| Contenedor | Área de acción, fondo, borde y radio. |
| Label | Nombre de la operación y resultado esperado. |
| Iconos opcionales | Apoyo semántico mediante swaps oficiales. |
| Foco exterior | Ubicación del control en navegación con teclado. |
| Loader compartido | Actividad ya iniciada; tamaño y color determinados por la receta. |

El tema sigue al producto: Contable, Administrativo, Servicios o Personas. No elijas otro tema para colorear un botón aislado. Danger conserva su semántica destructiva. Este corte no acredita un modo oscuro adicional.

Conserva HUG horizontal, alturas, padding, separación, tipografía, subrayado Link, radio y bindings delegados. El anfitrión decide layout, separación entre grupos y área táctil. No redefine tokens internos ni clases `.bh-*` para fabricar variantes.

El recetario conserva 48 referencias de tokens: 45 de Button y tres tamaños de Loader. Las categorías son medida (seis), espaciado (cuatro), radio/borde (cuatro), fondo (diez), contenido (catorce), tipografía (siete) y carga (tres). Se conservan las identidades exactas, incluida `button/font/line-hight`. Altura/icono: large 48/24, medium 40/20 y small 32/16 px. Los valores y aliases se leen de los datos delegados, no se mantienen como otro catálogo editable en esta guía.

### Accesibilidad y adaptación

Usa botón nativo para acciones y enlace real para navegación. Mantén nombre específico, teclado y foco visible. No dupliques el anuncio del Loader interno. El motivo de Disabled debe quedar visible o accesible.

Verifica texto, iconos y foco sobre la superficie real. Reorganiza o apila el grupo ante poco ancho o traducciones largas, conservando orden de lectura y foco; no comprimas el texto para resolver el layout. WCAG 2.2, 2.5.8, establece un objetivo de puntero de 24 × 24 CSS px con excepciones; revisa la experiencia real. Las alturas del DS no prueban conformidad global. El Loader local adapta su velocidad con movimiento reducido.

### Frontera con Icon Button

Usa [ICON-BUTTON-001](icon-button.contract.v1.0.0.md) para una acción reconocible en poco espacio y con nombre accesible. Si necesita explicación para entenderse o afecta una tarea importante, conserva preferentemente la etiqueta visible.

Primary y danger no exponen selected; secondary y ghost pueden alternar con selected y `aria-pressed`. Conserva un nombre estable. Dot es decorativo, el anfitrión comunica conteos relevantes; small no muestra número. Danger no admite Dot. Tooltip y área táctil pertenecen al anfitrión. Icon Button no ofrece Loading en su matriz actual.

### Mapeo de consumo

| Dimensión | Figma / concepto | API existente | Responsabilidad |
|---|---|---|---|
| Jerarquía | Button/primary, secondary, text, link, danger | `variant` | Elegir por intención. |
| Tamaño | size=small, medium, large | `size` | Elegir por contexto y coherencia del grupo. |
| Etiqueta | Label editable | `label`, `loadingLabel` | Nombrar resultado y proceso. |
| Iconos | Left icon / Right icon: visibilidad y swap | `showLeftIcon`, `showRightIcon`, `leftIcon`, `rightIcon` | Justificar cada pista. |
| Disponibilidad | state=loading / disabled | `loading`, `disabled`, `describedBy` | Bloquear y explicar. |
| Interacción | default / hover / pressed / focus | Interacción del componente; `previewState` solo para muestrario | Focus únicamente por navegación de teclado. |
| Navegación | Destino real | `variant="link"`, `href` | Conectar la URL. |
| Operación | Acción y envío | `type`, `onClick` | Ejecutar lógica del anfitrión. |
| Integración | Identificación y composición | `id`, `className` | No crear variantes mediante overrides. |
| Alternancia técnica | Capacidad del API | `ariaPressed` | No crea una variante selected de Button; preferir el control semántico apropiado. |

Cada instancia se asocia a `BUTTON-001`; cada patrón conserva su ID en [composición de acciones](../patterns/buttons.actions.amendment.v1.0.0.md). Registra intención, variante, tamaño, texto, iconos, estados, tema y responsabilidad del anfitrión. La composición acotada de Button no admite Slot arbitrario.

## Description exacta por set

Metadatos propuestos para sincronización cuando se autorice modificar Figma. Los IDs son del maestro registrado; este cambio documental no afirma escritura ni readback en Figma.

| Set | ID maestro | Description |
|---|---|---|
| Button/primary | 23:835 | BUTTON-001 · Uso contextual v1.0.2. Acción principal de la vista o diálogo, como Guardar cambios; evita otro Primary que compita. Elige small/medium/large por densidad y precisión, manteniendo tamaño en el grupo. Label anticipa el resultado; icono izquierdo reconoce operación y derecho anticipa dirección. Focus aparece al navegar con Tab y Shift+Tab, no por hover ni clic. Loading comunica Guardando… y bloquea duplicados. Patrones: formulario, pasos, barra, fila y confirmación destructiva. |
| Button/secondary | 23:952 | BUTTON-001 · Uso contextual v1.0.2. Alternativa visible a la principal, como Cancelar o Volver a edición. Conserva tamaño del grupo y texto específico. Usa iconos solo si aclaran operación o dirección. Focus identifica navegación con teclado, Tab y Shift+Tab; no hover ni clic. Durante Loading bloquea otra activación. |
| Button/text | 23:1070 | BUTTON-001 · Uso contextual v1.0.2. Acción local terciaria, como Restaurar filtros. Elige Primary si completa la tarea y Link si navega. Small sirve a acciones locales densas cuando el contexto permite distinguirlas. Conserva Label y Focus de teclado; no uses Focus como selección ni como hover. |
| Button/link | 23:1185 | BUTTON-001 · Uso contextual v1.0.2. Navega a un destino con href, como Ver historial; no guarda, aprueba ni elimina. La marca externa a la derecha solo corresponde a un cambio de contexto real. Conserva nombre y Focus al navegar con Tab/Shift+Tab; no por hover ni clic. Loading y Disabled bloquean el destino. |
| Button/danger | 23:1306 | BUTTON-001 · Uso contextual v1.0.2. Acción destructiva, como Eliminar borrador. El anfitrión identifica objeto y consecuencia, confirma y aporta una alternativa conservadora. No uses rojo como acento cotidiano. Conserva tamaño del grupo, Label específico y Focus de teclado. Loading bloquea duplicados; el anfitrión comunica resultado o error. |

## Aceptación documental

Verificar identidad de familia y cinco sets, tres tamaños, seis estados, cuatro configuraciones de iconos, cuatro temas, propiedades públicas, cinco patrones e IDs de reglas. El consumo debe devolver esta enmienda y la de patrones al resolver BUTTON-001 y conservar ambas en el traspaso autosuficiente. Conservar datos/recetas y defaults existentes. La integración documental no acredita una nueva escritura en Figma ni QA global de producto.
