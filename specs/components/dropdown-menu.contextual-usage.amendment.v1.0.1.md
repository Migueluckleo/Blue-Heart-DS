---
contract_schema: sdd-project/0.2
contract_id: DROPDOWN-MENU-001
amendment_id: DROPDOWN-MENU-CONTEXTUAL-USAGE-001
name: Dropdown menu · Uso contextual
type: component-amendment
version: 1.0.1
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/dropdown-menu.contract.v1.0.0.md
applies_to: [DROPDOWN-MENU-001]
supersedes_scope: Amplía la guía semántica y sustituye Description; conserva el contrato base y todas las reglas de búsqueda opcional DM-S01 a DM-S08
slot_applicability: REQUIRED
approval_ref: sources/inventories/inputs-dropdowns-contextual-usage.approval.2026-11-19.json
related_components: [INPUT-001, DROPDOWN-ITEM-001, SEARCH-001]
pattern_ids: [FORM-CAPTURE-SELECT-001, DEPENDENT-FIELDS-001, FILTER-CAPTURE-SELECT-001, FIELD-VALIDATION-001]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Dropdown menu · Guía contextual

Complementa el [contrato base](dropdown-menu.contract.v1.0.0.md) y la [enmienda de búsqueda opcional](dropdown-menu.search.amendment.v1.0.0.md), sin sustituir su geometría, datos, API, defaults ni reglas DM-S01 a DM-S08. El alcance contextual se adopta del PDF aprobado de 20 páginas. Consulta los [patrones compartidos](../patterns/inputs-dropdowns.forms.amendment.v1.0.0.md) y la [guía de Dropdown item](dropdown-item.contextual-usage.amendment.v1.0.1.md).

## Guía semántica normativa

### Propósito y alcance del valor

**DROPDOWN-INTENT-01.** Usa Dropdown para elegir un valor de una lista definida por el anfitrión: moneda, cuenta o categoría. El nombre del campo permanece visible y el valor solo cambia al confirmar una opción. Para escribir un dato libre usa Input; para varias líneas usa Text Area; para buscar en un conjunto usa Search. Considera alternativas visibles cuando compararlas sea importante, sin fijar un umbral universal de cantidad.

**DROPDOWN-INTENT-02.** El selector actual conserva una selección simple. La búsqueda reduce opciones visibles; no acepta un valor libre, crea elementos, guarda el formulario ni introduce selección múltiple. Un menú de acciones o navegación necesita el patrón apropiado. Evita mezclar monedas con Guardar, Eliminar o Ver historial como opciones del mismo campo.

### Anatomía, tamaño y Slot

El disparador usa superficie Input fuera del menú y conserva etiqueta y valor. DropdownField coordina disparador y popup; DropdownMenu ofrece la superficie, búsqueda opcional y lista. [Dropdown item](dropdown-item.contextual-usage.amendment.v1.0.1.md) representa valores y separadores.

**DROPDOWN-SLOT-01.** Options es Slot vertical con al menos un hijo, sin máximo declarado, con preferencia exclusiva por Dropdown item y ajuste al ancho al insertar. Cinco opciones medium son contenido inicial, no un límite. Header y Divider no eligen. Mantén tamaño común entre opciones y controla una selección como máximo.

**DROPDOWN-SIZE-01.** Usa Small para contexto local denso cuando los objetivos sigan siendo distinguibles; Medium como punto de partida contextual de escritorio normal y Large para un contexto más focalizado o de activación más cómoda. Conserva coherencia del grupo. No uses otro tamaño para expresar prioridad. DropdownField y DropdownMenu conservan default Medium; la recomendación contextual no cambia el default Large de Input o de DropdownItem.

**DROPDOWN-LAYOUT-01.** Popup y disparador comparten ancho, con separación de 4 px. El alto máximo del menú es 320 px; el anfitrión puede limitarlo más. No fijes la altura del ejemplo de 210 px para cualquier cantidad. Search permanece visible y solo Options se desplaza. Show scrollbar representa desbordamiento nativo de diseño; el navegador controla el desplazamiento web. El auxiliar privado no es un control consumible independiente.

### Lista simple o búsqueda opcional

**DROPDOWN-SEARCH-01.** Activa Show search cuando longitud, similitud o familiaridad de las opciones dificulte localizar un valor. Una lista breve y reconocible puede explorarse sin consulta. No hay un número universal que obligue a activar búsqueda.

**DROPDOWN-SEARCH-02.** `showSearch=false` por defecto. Al activarlo, Search small de 32 px ocupa el ancho disponible sobre Options y fuera del Slot. No hereda el tamaño de opciones o disparador. Conserva padding de contenido 4 px y separación de búsqueda/opciones 16 px según la enmienda vigente.

**DROPDOWN-SEARCH-03.** Filtra por Label y Description sin distinguir mayúsculas ni acentos. La consulta no cambia la selección; cerrar reinicia la consulta local y conserva el valor confirmado. Mantén grupos con coincidencias, elimina encabezados/divisores huérfanos y conserva coincidencias Disabled visibles sin permitir elegirlas. No hay búsqueda remota incorporada.

### Activa, seleccionada y hover

**DROPDOWN-ACTIVE-01.** La opción activa es candidata de la interacción. La seleccionada conserva el valor confirmado y su Check. Mover la candidata con flechas no cambia el valor. Hover da respuesta temporal al puntero; no equivale a selección ni a confirmación.

**DROPDOWN-ACTIVE-02.** En web el foco DOM permanece en el combobox, que comunica la candidata mediante `aria-activedescendant`; no se mueve a cada fila ni se agrega un Tab por opción. Disabled queda fuera de la elección y del recorrido de opciones habilitadas; Header y Divider no activan valores. La combinación Selected + Disabled no es una variante adicional del ítem.

### Teclado y retorno de foco

| Regla | Situación | Comportamiento |
|---|---|---|
| DROPDOWN-KEY-01 | Abrir sin búsqueda | Enter, Espacio o flechas desde el disparador. |
| DROPDOWN-KEY-02 | Abrir con búsqueda | El foco pasa al campo de consulta. |
| DROPDOWN-KEY-03 | Recorrer | Flechas arriba/abajo recorren opciones habilitadas sin confirmar. |
| DROPDOWN-KEY-04 | Confirmar | Enter elige la candidata; sin búsqueda, Espacio también. Actualiza el valor, cierra y devuelve foco al disparador. |
| DROPDOWN-KEY-05 | Home/End sin búsqueda | Con lista abierta, van al principio/final de las opciones habilitadas. |
| DROPDOWN-KEY-06 | Editar búsqueda | Espacio, Home y End conservan su función de texto. La composición IME no confirma accidentalmente. |
| DROPDOWN-KEY-07 | Cancelar | Escape cierra sin cambiar selección; retorna al disparador según el contexto y modo de búsqueda vigente. |
| DROPDOWN-KEY-08 | Salir | Tab permite salir y el popup cierra al abandonar el campo compuesto. Clic exterior cierra sin secuestrar el foco. |

El foco de edición del buscador sigue su control editable. No extrapoles al texto editable la regla de Focus de Button. Una ubicación de foco y una opción activa no son selección persistente.

### Vacío, disponibilidad y recuperación

**DROPDOWN-EMPTY-01.** Sin coincidencias, muestra y anuncia Sin resultados. Permite cambiar o limpiar la consulta. No agregues una opción ficticia Sin resultados o Crear nuevo. Esta situación difiere de una lista sin opciones disponibles.

**DROPDOWN-EMPTY-02.** DropdownField no abre si no hay opciones habilitadas. El anfitrión explica cerca el motivo y la acción posible. No dejes un selector deshabilitado sin explicación.

**DROPDOWN-RECOVERY-01.** Carga y error de obtención de datos pertenecen al flujo. DropdownField no expone props nativos de loading, error o read-only. Representa feedback con cobertura existente y registra las decisiones del anfitrión; no inventes variantes ni coloques un mensaje de sistema como valor seleccionable.

**DROPDOWN-DATA-01.** Usa IDs estables para opciones; su posición o texto no debe ser su única identidad técnica. Si cambia un dato del que depende el catálogo, comprueba que la selección anterior siga siendo válida. No selecciones silenciosamente el primer resultado. Elegir un valor no guarda por sí mismo todo el formulario.

### Propiedades públicas y responsabilidades

| Propiedad o concepto | Uso y límite |
|---|---|
| label, placeholder | Nombre del dato y texto visible cuando no hay valor. |
| entries | Opciones con Label, Description e icono opcionales; headers/dividers no eligen. |
| selectedId, onSelectionChange | Selección simple confirmada y cambio controlado por el anfitrión. |
| size | Escala común de opciones y disparador en DropdownField; default medium. |
| disabled | Disponibilidad del selector, con explicación contextual aportada fuera del control. |
| maxHeight | Límite de todo el popup, incluida búsqueda; Options usa el espacio restante. |
| showSearch | Búsqueda opcional, false por defecto. Search conserva small. |
| searchLabel, searchPlaceholder | Nombre de la consulta y ejemplo visible; defaults “Buscar en ${label}” y “Buscar…”. |
| id, activeId, hidden | Identidad del listbox, candidata y visibilidad al consumir DropdownMenu directamente. |
| searchValue, onSearchChange | Consulta controlada directa; si no se aporta searchValue, DropdownMenu conserva consulta local. |
| onSearchKeyDown, searchInputProps | Coordinación directa de teclado y atributos ARIA admitidos. |
| className | Integración sin redefinir tokens internos o fabricar variantes. |
| Options, Show scrollbar | Slot y señal nativa de desbordamiento de diseño; no equivalen a scroll programado web. |

En consumo directo de DropdownMenu, el anfitrión coordina consulta, candidata, selección, apertura/cierre, teclado y foco. DropdownField proporciona esa coordinación existente. Conserva Search oficial fuera del listbox y del Slot; la adaptación embedded evita formularios anidados. No amplíes el API mediante props supuestas.

### Temas y legibilidad

El tema sigue al producto: Contable, Administrativo, Servicios o Personas. Conserva los tokens internos de cada componente, el borde, elevación, tamaños y roles. No cambies el tema de un menú aislado para recolorearlo. El QA heredado registra condiciones de contraste de Description en ciertas interacciones; conservarlas y revisar el contexto real no certifica conformidad global ni autoriza recolorear el DS.

## Description exacta

Texto preparado para sincronización futura autorizada, sin afirmar una escritura nueva en Figma.

| Componente | Description |
|---|---|
| Dropdown menu | DROPDOWN-MENU-001 · Uso contextual v1.0.1. Elige un valor del campo con selección simple. Conserva etiqueta y una opción confirmada; mover la candidata o buscar no cambia el valor. Options consume Dropdown item del mismo tamaño. Activa Show search para localizar opciones cuando ayude, con Search small fuera del Slot. Conserva scroll en Options, teclado, cierre y retorno lógico de foco. Sin coincidencias anuncia Sin resultados sin opción ficticia. No mezcles acciones, valores libres o selección múltiple. |
| __Dropdown/Scrollbar small vertical | DROPDOWN-MENU-001 · Auxiliar privado de desbordamiento dentro de Dropdown menu. Conserva anatomía y proporción inicial de su receta; no es una implementación del scroll nativo web ni un control consumible independiente. |

## Aceptación documental

Resolver DROPDOWN-MENU-001 debe incluir base, búsqueda opcional DM-S01/08, esta guía, guía del ítem y patrones pertinentes mediante sus identidades y dependencias. Verificar simple/búsqueda, candidata frente a selección, teclado, IME, vacío, disabled, scroll y límites reales del API. No se altera la matriz ni la semántica de selección simple.
