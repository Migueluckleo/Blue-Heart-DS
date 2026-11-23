---
contract_schema: sdd-project/0.2
contract_id: TOGGLE-001
amendment_id: TOGGLE-CONTEXTUAL-USAGE-001
name: Toggle · Uso contextual
type: component-amendment
version: 1.0.1
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/toggle.contract.v1.0.0.md
applies_to: [TOGGLE-001]
supersedes_scope: Amplía semántica y sustituye Description; conserva ocho variantes, anatomía, datos, API y defaults
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/selection-controls-contextual-usage.approval.2026-11-19.json
related_components: [CHECKBOX-001, RADIO-001, RADIO-GROUP-001, LOADER-001, INLINE-NOTIFICATION-001]
pattern_ids: [INDEPENDENT-CHOICES-001, BULK-SELECTION-001, EXCLUSIVE-CHOICE-001, IMMEDIATE-PREFERENCE-001, REVIEW-SAVE-001]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Toggle · Guía contextual

Complementa [TOGGLE-001](toggle.contract.v1.0.0.md) conforme al PDF de 20 páginas aprobado en este chat. Adopta sus criterios contextuales sin cambiar datos, tokens, anatomía ni API. Consulta los [patrones de selección y preferencias](../patterns/selection-controls.decisions.amendment.v1.0.0.md).

## Guía semántica normativa

### Intención y alternativa apropiada

**TOGGLE-INTENT-01.** Usa Toggle para una preferencia binaria cuyo cambio se aplica al alternarla: Avisos por correo. La convención local BlueHeart es aplicación inmediata. El anfitrión ejecuta y persiste; mover la perilla no acredita éxito de negocio. El estado es apagado/encendido, sin un punto intermedio.

**TOGGLE-INTENT-02.** Usa Checkbox para inclusión independiente, aceptación o selección en lote; Radio para alternativas excluyentes; Button para Guardar, Eliminar o Enviar. Si varios cambios deben revisarse y guardarse juntos, resuelve un formulario con el patrón apropiado. Evita un Toggle que aparenta aplicar al momento y depende de un Guardar lejano. Checkbox también puede seleccionar o filtrar de inmediato si el contexto lo explica; no elijas únicamente por la presencia de Guardar.

| Haz | Evita |
|---|---|
| Avisos por correo, con el mismo nombre al encender y apagar. | Cambiar el nombre a Activar avisos o Desactivar avisos según el valor. |
| Representar valor persistido y explicar una actualización pendiente o fallida. | Aparentar una preferencia guardada que el servicio rechazó. |
| Ajustar el anfitrión al texto y al área activable. | Estirar el riel o fabricar small/medium/large. |

### Nombre, visibilidad y geometría

**TOGGLE-LABEL-01.** Mantén nombre estable, afirmativo y en sentence case, que describa la preferencia en ambos estados. No agregues órdenes variables Activar/Desactivar ni textos Sí/No u On/Off como sustituto del nombre. La posición de la perilla comunica el valor además del color.

**TOGGLE-LABEL-02.** `Label`/`label` nombra y `Show label`/`showLabel=false` gobierna visibilidad. Mostrarlo es una decisión explícita. Si se oculta, conserva contexto visual y nombre accesible equivalente; la implementación mantiene aria-label a partir de label. Clic en riel o etiqueta alterna la misma preferencia. No existe labelPosition izquierda/derecha ni swaps de icono: la etiqueta va a la derecha, perilla y riel son geometría propia.

**TOGGLE-LAYOUT-01.** Un tamaño: riel 40 × 24 px, perilla de 20 px, gap de etiqueta 8 px, label hasta 320 px que crece y envuelve sin recortes. El máximo no reserva siempre ese ancho. Toggle conserva alineación central multilínea; no importes la de primera línea de Checkbox/Radio ni estires el riel para llenar el texto. El anfitrión ajusta el ancho y comprueba el resultado.

### Dos valores y cuatro estados

| Estado | Uso correcto | Evita |
|---|---|---|
| default | Disponible; selected conserva apagado o encendido. | Interpretar una perilla movida como persistencia confirmada. |
| hover | Respuesta temporal al puntero. | Dar foco o alternar por hover. |
| focus | Localizar el control operado con teclado. | Confundir foco con valor o exigir anillo por un clic. |
| disabled | Preferencia no operable; explicar cerca el requisito faltante. | Usarlo como falso error o exigir foco para conocer el motivo. |

**TOGGLE-COVERAGE-01.** Dos valores × cuatro estados = 8 variantes. No hay indeterminate, error, success, loading, pressed, read-only o size propios. Disabled conserva la diferencia de valor por posición de la perilla aunque comparta paleta. Para consulta compón el valor claramente; no inventes solo lectura. Conserva los cuatro temas y tokens internos; el tema sigue al producto, no expresa prioridad ni resultado.

### Persistencia, espera y recuperación

**TOGGLE-ASYNC-01.** El anfitrión mantiene valor y controla la operación. Si tarda, compón Loader junto al control y anuncia la espera cuando sea necesario. Define cómo evitar solicitudes contradictorias y gestionar sus respuestas. No agregues una variante loading al átomo ni declares un cambio remoto exitoso por el estado visual.

**TOGGLE-ASYNC-02.** Al confirmar, el valor visible debe corresponder al persistido; el feedback es proporcional y no mueve foco sin necesidad. Si falla, revierte al valor anterior y presenta Inline Notification con explicación y forma de reintentar: “No se guardó el cambio. Los avisos siguen desactivados. Intenta de nuevo”. Loader y notificación pertenecen a la pantalla, no son hijos/dependencias obligatorios de la anatomía de Toggle. Los ejemplos son ficticios y no implican servicios reales.

**TOGGLE-DISABLED-01.** Explica cerca “Registra un correo para habilitar los avisos” si ese es el requisito real. No dependas de enfocar el control deshabilitado ni de tooltip como única explicación. Permisos, persistencia y fallos corresponden al flujo; no crean variantes del componente.

### Teclado, foco y área activable

**TOGGLE-FOCUS-01.** Tab/Shift+Tab recorren controles disponibles y Espacio alterna el valor. Disabled se omite y es inerte. No hay promesa de activación con Enter. El anillo web usa `:focus-visible`, orientado a teclado conforme a la heurística del navegador. Distingue foco DOM del anillo visible: clic opera sin exigir el anillo de Tab; hover no enfoca. `previewState` es apariencia de muestrario, no manejo real de foco.

**TOGGLE-FOCUS-02.** Mantén halo sin recortes. El anfitrión conserva la cobertura táctil local de 44 × 44 px sin escalar el riel, verifica el objetivo real y evita solapamientos. Una etiqueta alta no demuestra toda esa área. Este criterio local no es una atribución al mínimo AA de WCAG 2.5.8 ni una certificación de accesibilidad global.

### Mapeo de propiedades

| Propiedad | Responsabilidad |
|---|---|
| selected obligatorio, onSelectedChange(boolean) | Valor controlado; sin estado intermedio. Persistencia a cargo del anfitrión. |
| label, showLabel=false | Nombre estable y visibilidad sin perder nombre accesible. |
| state de Figma | default/hover/focus/disabled. |
| disabled y atributos nativos admitidos | Disponibilidad, identidad y asociaciones; no agregan estados del DS. |
| previewState=hover/focus | Apariencia estática para muestrario. |
| className | Composición sin sustituir tokens ni fabricar variantes. |

Web usa input checkbox con `role=switch` y `checked` para comunicar valor. P-SLOTS NOT_APPLICABLE: riel, perilla, foco y Label son partes fijas; no hay iconos, contenido arbitrario ni subcomponentes intercambiables. Valores/aliases permanecen en el JSON delegado del contrato base.

## Description exacta

Texto preparado para futura sincronización autorizada; no afirma escritura o readback nuevo Figma.

TOGGLE-001 · Uso contextual v1.0.1. Preferencia binaria que aplica al alternar, con nombre estable como Avisos por correo. El anfitrión mantiene y persiste el valor; ante espera compone feedback y ante fallo revierte y explica cómo reintentar. Focus visible localiza teclado; Espacio alterna. Conserva nombre accesible, posición de perilla y un solo tamaño. No inventes mixed, error, loading o read-only propios ni lo uses como acción Guardar.

## Aceptación documental

Resolver TOGGLE-001 debe incluir esta guía y los patrones completos. Verificar ocho variantes, nombre estable, foco/teclado y separación de espera/fallo del átomo. El traspaso conserva responsabilidades del anfitrión sin afirmar persistencia remota ejecutada.
