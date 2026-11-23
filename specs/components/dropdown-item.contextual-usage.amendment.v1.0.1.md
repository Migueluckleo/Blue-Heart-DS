---
contract_schema: sdd-project/0.2
contract_id: DROPDOWN-ITEM-001
amendment_id: DROPDOWN-ITEM-CONTEXTUAL-USAGE-001
name: Dropdown item · Uso contextual
type: component-amendment
version: 1.0.1
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/dropdown-item.contract.v1.0.0.md
applies_to: [DROPDOWN-ITEM-001]
supersedes_scope: Amplía semántica y sustituye Description; conserva las 25 combinaciones y todos los datos visuales
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/inputs-dropdowns-contextual-usage.approval.2026-11-19.json
related_components: [DROPDOWN-MENU-001, INPUT-001]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Dropdown item · Guía contextual

Complementa [DROPDOWN-ITEM-001](dropdown-item.contract.v1.0.0.md) conforme al PDF aprobado. La guía del [selector](dropdown-menu.contextual-usage.amendment.v1.0.1.md) y los [patrones compartidos](../patterns/inputs-dropdowns.forms.amendment.v1.0.0.md) definen la interacción completa; este ítem no la implementa por sí solo.

## Guía semántica normativa

### Tipos y anatomía

| Regla | Tipo o parte | Haz | Evita |
|---|---|---|---|
| DROPDOWN-ITEM-TYPE-01 | Option | Representar un valor elegible del mismo campo con Label identificable. | Mezclar valores con acciones como Guardar o Ver historial. |
| DROPDOWN-ITEM-TYPE-02 | Header | Nombrar un grupo de opciones relacionadas. | Convertir el encabezado en opción o incluirlo en el recorrido de elecciones. |
| DROPDOWN-ITEM-TYPE-03 | Divider | Separar secciones cuando mejore la lectura. | Tratar la línea como control o conservar separadores huérfanos al filtrar. |
| DROPDOWN-ITEM-CONTENT-01 | Label | Nombrar el valor con texto suficiente y consistente. | Usar solo descripción, color o un icono para identificarlo. |
| DROPDOWN-ITEM-CONTENT-02 | Description | Aportar contexto útil, como terminación de una cuenta. | Repetir Label o reemplazarlo por una descripción ambigua. |
| DROPDOWN-ITEM-ICON-01 | Icono izquierdo | Aclarar el tipo de opción si contribuye al significado, con Phosphor Outline/Light. | Dejar ImageSquare de muestra sin relación o inventar un segundo icono de contenido. |
| DROPDOWN-ITEM-SELECT-01 | Check derecho | Mostrar selección confirmada. | Interpretarlo como checkbox de multiselección o como opción activa sin confirmar. |

Show description y Show left icon están apagados por defecto en Figma; Description y swap son propiedades acotadas. En web `description` aporta el texto complementario y `icon`/`showLeftIcon` controlan el accesorio. Description se adapta al ancho de Content y puede crecer; no es una segunda etiqueta independiente.

### Activa, seleccionada, hover y disabled

**DROPDOWN-ITEM-STATE-01.** La candidata activa de teclado indica dónde se encuentra el recorrido; no cambia el valor del campo. La seleccionada conserva Check mientras se exploran otras. Hover solo comunica exploración con puntero y no confirma.

**DROPDOWN-ITEM-STATE-02.** Disabled conserva visibilidad si sirve al contexto, pero no se elige ni entra en el recorrido habilitado. No crees Selected + Disabled como una variante adicional. Header y Divider no activan una elección.

**DROPDOWN-ITEM-FOCUS-01.** El anfitrión coordina teclado y foco. En la composición web vigente el combobox conserva el foco DOM y comunica la opción candidata mediante aria-activedescendant; no hay un Tab por fila. La apariencia activa no significa mover el foco DOM al ítem ni selección persistente. El Input de búsqueda conserva su foco de edición.

### Matriz y tamaño

Option tiene siete combinaciones por tamaño: default/hover/focus/disabled sin selección y default/hover/focus con selección. Son 21 variantes. Header tiene tres tamaños, sin elección. Divider solo medium/default/sin selección. Total: 25, no el producto de todos los ejes posibles.

**DROPDOWN-ITEM-SIZE-01.** Las opciones de un mismo menú comparten tamaño. Small corresponde a un contexto denso si mantiene objetivos distinguibles; Medium es el punto de partida contextual del selector de escritorio; Large corresponde a un contexto más focalizado o de activación cómoda. No cambies tamaño para expresar prioridad. El API de DropdownItem conserva default Large; DropdownMenu y DropdownField pasan Medium por defecto. Search mantiene small cuando está presente.

### Mapeo de propiedades

| Dimensión | Figma | Web |
|---|---|---|
| Tipo | type=option/header/divider | `entry.type`; la forma de entry corresponde a cada tipo. |
| Contenido | Label, Description, Group label | `entry.label`, `entry.description`; Header usa label del grupo. |
| Accesorio | Show left icon, Left icon | `entry.icon`, `entry.showLeftIcon`; iconos oficiales. |
| Tamaño | size=small/medium/large | `size`; coherencia del menú. |
| Estado | state=default/hover/focus/disabled | Hover real; `active` identifica candidata; `entry.disabled` bloquea. |
| Selección | selected=false/true | `selected`; aria-selected y Check sin selección múltiple. |
| Identidad | Instancia del ítem | `entry.id`, `id`; identidad estable distinta de posición. |
| Activación | Elección coordinada por anfitrión | `onActivate`, `onMouseDown`; no implementan por sí solos el selector completo. |

Conserva colores, tipografía, roles de iconos, estados y bindings delegados. El tema sigue al producto; el contraste heredado de Description en ciertas interacciones permanece documentado y no acredita conformidad global. P-SLOTS NOT_APPLICABLE: el ítem tiene posiciones fijas; el Slot corresponde a Options del menú.

## Description exacta

DROPDOWN-ITEM-001 · Uso contextual v1.0.1. Option representa un valor del campo; Label identifica y Description añade contexto. Header nombra un grupo y Divider separa sin elegir. La candidata activa y el hover no confirman selección; Check representa el valor confirmado. Conserva tamaño común en Options, teclado coordinado por el combobox y Disabled fuera de la elección. No inventes Selected + Disabled ni selección múltiple. El ítem no implementa apertura, búsqueda y retorno de foco por sí solo.

## Aceptación documental

Verificar 21 variantes Option, tres Header y un Divider; propiedades, foco/candidata, Check, disabled, grupos, descripciones y accesorios. Resolver DROPDOWN-ITEM-001 debe incluir esta enmienda y patrones; conservar el contrato base y sus datos sin ampliar API o matriz.
