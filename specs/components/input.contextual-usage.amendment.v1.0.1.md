---
contract_schema: sdd-project/0.2
contract_id: INPUT-001
amendment_id: INPUT-CONTEXTUAL-USAGE-001
name: Input · Uso contextual
type: component-amendment
version: 1.0.1
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/input.contract.v1.0.0.md
applies_to: [INPUT-001]
supersedes_scope: Amplía la guía semántica y sustituye Description del contrato base; conserva geometría, variantes, datos, API y defaults
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/inputs-dropdowns-contextual-usage.approval.2026-11-19.json
related_components: [DROPDOWN-MENU-001, BADGE-001, SEARCH-001]
pattern_ids: [FORM-CAPTURE-SELECT-001, DEPENDENT-FIELDS-001, FILTER-CAPTURE-SELECT-001, FIELD-VALIDATION-001]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Input · Guía contextual

Complementa [INPUT-001](input.contract.v1.0.0.md) conforme al PDF aprobado de Inputs y Dropdowns, 20 páginas. Los criterios contextuales del PDF se adoptan por aprobación explícita; no cambian el API, sus defaults ni los datos delegados. Consulta también los [patrones de captura y selección](../patterns/inputs-dropdowns.forms.amendment.v1.0.0.md).

## Guía semántica normativa

### Propósito y alternativa apropiada

**INPUT-INTENT-01.** Usa Input para escribir un dato breve de una línea: nombre, correo o referencia. Usa [Dropdown](dropdown-menu.contextual-usage.amendment.v1.0.1.md) cuando el valor deba elegirse de una lista definida. Un caret visible no convierte un Input en selector. Usa Text Area para respuestas de varias líneas y Search para buscar en un conjunto. Considera Radio cuando comparar alternativas visibles sea útil; no hay un umbral universal de cantidad de opciones. La selección múltiple necesita su cobertura específica.

El anfitrión es la pantalla o flujo que define formato, validación, permisos, dependencias, persistencia y resultado. La captura de un valor no guarda automáticamente todo el formulario.

### Etiqueta, ejemplo y ayuda

| Regla | Parte | Haz | Evita |
|---|---|---|---|
| INPUT-LABEL-01 | Label | Nombre breve y específico, como Correo electrónico. Mantén preferentemente Show label. | Ocultar Label sin contexto visual inequívoco y sin nombre accesible. |
| INPUT-PLACEHOLDER-01 | Placeholder | Ejemplo de formato cuando etiqueta y ayuda ya explican el dato. | Tratarlo como valor guardado o usarlo como única etiqueta o instrucción. |
| INPUT-HELPER-01 | Helper text | Instrucción persistente sobre formato, requisito o corrección. | Esconder información indispensable detrás de un tooltip. |
| INPUT-REQUIRED-01 | Required | Declarar la obligatoriedad real del dato; el asterisco complementa la semántica nativa. | Convertir un dato opcional en obligatorio por el default técnico. |

El placeholder desaparece al capturar un valor, no por el mero hecho de enfocar. Ocultar ayuda redundante mediante Show helper es válido; conserva el mensaje que explica error o disponibilidad. Para un campo opcional, decláralo como tal; añade “(opcional)” a la etiqueta cuando ayude a distinguir excepciones. El API conserva `required=true` por defecto.

### Tamaño según contexto

| Regla | Tamaño y altura de campo | Uso apropiado | Evita |
|---|---|---|---|
| INPUT-SIZE-01 | small, 32 px | Captura local o filtros en escritorio denso cuando sea fácil localizar y activar el objetivo. | Reducir para ocultar una etiqueta larga o agregar más campos. |
| INPUT-SIZE-02 | medium, 40 px | Punto de partida contextual para formularios y filtros de escritorio de densidad normal; acompaña controles de escala equivalente. | Interpretarlo como un cambio del default de Input. |
| INPUT-SIZE-03 | large, 48 px | Captura focalizada, baja densidad o mayor comodidad al activar el campo. | Usarlo para expresar importancia del dato. |

**INPUT-SIZE-04.** Mantén escala coherente dentro del grupo y verifica el área activable real. Las alturas no incluyen Label ni ayuda. El ancho fuente de 464 px es adaptable. El tamaño no define el ancho ni garantiza accesibilidad táctil. Normaliza “middle” a `medium`. Input conserva default `large`; DropdownField y DropdownMenu conservan default `medium`.

### Accesorios: semántica y límites

**INPUT-ICON-01.** Propón ocultar el accesorio si no aporta significado. Para captura libre, usa `showIcon=false` cuando el caret sugiera una elección inexistente. Un Envelope puede identificar un correo, pero no lo envía. El accesorio existente está a la derecha; Input no ofrece posiciones izquierda/derecha independientes como Button. Conserva Phosphor Outline/Light, tamaños y roles de la receta.

**INPUT-ICON-02.** El default visual incluye CaretDown con `showIcon=true`. Si la persona debe elegir un valor, consume DropdownField y su comportamiento real. No simules la apertura de una lista mostrando un caret en un Input de texto.

**INPUT-BADGE-01.** Usa Badge subtle/small para una unidad verificada, por ejemplo MXN junto a un importe. El dato se escribe en el campo; Badge no almacena el valor ni convierte la unidad. `showBadge=false` por defecto; `badgeLabel` permite identificar la unidad.

**INPUT-TOOLTIP-01.** Show tooltip muestra Question junto a Label. El glyph por sí solo no implementa ayuda interactiva: el anfitrión resuelve semántica, apertura/cierre, foco y accesibilidad. Una restricción indispensable permanece en la ayuda del campo. `showTooltip=false` por defecto.

### Empty, filled y siete estados

Empty y filled indican si existe valor; no expresan validación. Cada apariencia conserva tres tamaños y siete estados: 2 × 3 × 7 = 42 combinaciones.

| Estado | Significado | Haz | Evita |
|---|---|---|---|
| default | Disponible para capturar. | Mantener etiqueta y ayuda necesarias. | Interpretarlo como validación exitosa. |
| hover | Puntero sobre el campo. | Dar respuesta temporal de exploración. | Confundirlo con edición o insertar el cursor por hover. |
| focus | Campo que recibe entrada. | Mantener localización y posición de inserción mientras se edita. | Confundirlo con éxito, error o selección de un valor. |
| success | Comprobación concluida. | Mostrarlo tras una validación real y con significado. | Marcar éxito solo porque hay texto. |
| error | Dato que requiere corrección. | Explicar problema y solución junto al campo. | Depender solo del color o de “Valor inválido”. |
| read-only | Consulta sin edición. | Conservar lectura y copia de un dato útil, como folio asignado. | Deshabilitar un valor que debe poder copiarse. |
| disabled | Captura no disponible. | Explicar qué falta para habilitarla. | Dejar un campo inaccesible sin motivo comprensible. |

### Focus de edición y foco de Button

**INPUT-FOCUS-01.** Tab y Shift+Tab permiten llegar al Input y mostrar su ubicación. Hacer clic dentro también inicia la edición y le da foco. La implementación vigente usa `:focus-within` para el tratamiento visual de edición; no se traslada automáticamente la regla de Focus de Button, reservada allí a navegación de teclado.

**INPUT-FOCUS-02.** Hover no coloca el cursor ni da foco. Un campo puede estar vacío o lleno y enfocado. El marco localiza dónde se escribe y el cursor de texto señala la posición de inserción. El foco vacío medium/small conserva su separación exterior específica.

**INPUT-FOCUS-03.** Error y foco pueden coexistir durante la corrección. Mantén el mensaje y el indicador de edición; no borres el error solo porque el campo recibió foco. Los estados controlados sirven para representar la situación real y para muestras; no sustituyen la interacción de edición.

### Validación, corrección y disponibilidad

**INPUT-VALIDATION-01.** No cambies a Error por cada carácter de una respuesta todavía incompleta. Mantén la ayuda de formato. Evalúa al terminar la captura o al intentar continuar según el flujo; la pantalla define las reglas y el momento pertinente.

**INPUT-VALIDATION-02.** Ante error conserva lo escrito y asocia una corrección concreta. Haz: “Incluye el dominio. Ejemplo: ana@empresa.mx.” Evita: “Valor inválido.” Error usa `aria-invalid`; la ayuda se vincula mediante `aria-describedby`.

**INPUT-VALIDATION-03.** Revalida cuando sea útil y usa Success tras una comprobación concluida. Formato válido de correo no garantiza existencia ni entrega de mensajes. No existe estado nativo de loading o validación remota en Input; espera y resultado pertenecen al flujo.

**INPUT-AVAILABILITY-01.** Read-only conserva consulta/copia; Disabled impide capturar por un requisito pendiente. Explica “Selecciona primero una empresa” cerca del campo. No exijas enfocar el campo deshabilitado para conocer el motivo. El producto decide qué dato es obligatorio; el default de `required` no es una regla de negocio.

### Mapeo de propiedades y composición

| Dimensión | Propiedades existentes | Responsabilidad |
|---|---|---|
| Identificación | id, name | Identificar y conectar el dato con su contexto. |
| Tipo de entrada | type: text/email/search/url/tel/password | Elegir el tipo admitido; no inventar `number` ni otras props no expuestas. |
| Contenido | label, placeholder, helperText, value, defaultValue | Separar nombre, ejemplo, ayuda y valor real. |
| Visibilidad | showLabel, showPlaceholder, showHelper | Conservar contexto y nombre accesible; el componente mantiene aria-label cuando oculta Label. |
| Accesorios | showIcon, icon, showTooltip, showBadge, badgeLabel | Justificar cada pista, unidad o ayuda. |
| Obligatoriedad y presentación | required, size, status | Reflejar requisito real, escala y estado. |
| Captura y validación | onValueChange, onBlur | Conectar el comportamiento del anfitrión; no atribuir guardado al componente. |
| Integración | className | Componer sin sobrescribir tokens internos ni fabricar variantes. |

Los 11 controles de contenido/visibilidad de cada set se suman a size/status. Label, campo, ayuda y accesorios conservan posiciones fijas; Badge es composición vinculada. P-SLOTS NOT_APPLICABLE. Conserva la base, sus 48 referencias de tokens y sus estilos; no mantengas otro catálogo de valores editables en esta guía. Los cuatro temas siguen al producto. El QA existente registra una excepción de contraste del borde vacío: conservar esa condición explícita y verificar la pantalla real no equivale a certificar accesibilidad global ni a recolorear el DS.

## Description exacta por set

Texto preparado para sincronización cuando se autorice editar Figma; este cambio documental no afirma escritura o readback nuevo.

| Set | Description |
|---|---|
| Input/empty | INPUT-001 · Uso contextual v1.0.1. Captura un dato de una línea. Mantén Label y ayuda suficientes; Placeholder es un ejemplo y no el valor. Elige small/medium/large por contexto, con escala coherente. Empty no significa error. Focus de edición puede recibirse con Tab/Shift+Tab o clic dentro; hover no da foco. CaretDown no implementa un selector. Required refleja una regla real. |
| Input/filled | INPUT-001 · Uso contextual v1.0.1. Representa un dato de una línea con valor. Filled no implica éxito. Conserva captura al corregir errores y muestra una solución concreta. Read-only permite consulta/copia; Disabled necesita explicación. Focus identifica edición por teclado o clic y puede coexistir con error. Badge aporta unidad; no almacena ni convierte el valor. |

## Aceptación documental

Verificar 42 combinaciones, 11 controles de contenido/visibilidad, tipos y defaults públicos, foco de edición, distinción entre read-only/disabled y patrones. Resolver INPUT-001 debe incluir esta guía y la enmienda de patrones; el traspaso debe conservar sus reglas completas. No se amplían datos, bindings, estados ni props.
