---
contract_schema: sdd-project/0.2
contract_id: RADIO-001
amendment_id: RADIO-CONTEXTUAL-USAGE-001
name: Radio · Uso contextual
type: component-amendment
version: 1.0.1
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/radio.contract.v1.0.0.md
applies_to: [RADIO-001]
supersedes_scope: Amplía semántica y sustituye Description; preserva receta y registra diferencia web de alineación sin adoptarla como regla
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/selection-controls-contextual-usage.approval.2026-11-19.json
related_components: [RADIO-GROUP-001, CHECKBOX-001, TOGGLE-001]
pattern_ids: [INDEPENDENT-CHOICES-001, BULK-SELECTION-001, EXCLUSIVE-CHOICE-001, IMMEDIATE-PREFERENCE-001, REVIEW-SAVE-001]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Radio · Guía contextual

Complementa [RADIO-001](radio.contract.v1.0.0.md) con el PDF aprobado de 20 páginas. El componente individual representa una alternativa; [Radio group](radio-group.contextual-usage.amendment.v1.0.1.md) aporta contexto y composición. Consulta los [patrones de decisiones](../patterns/selection-controls.decisions.amendment.v1.0.0.md). No se cambian datos, tokens, API o comportamiento por convertir la propuesta a Markdown.

## Guía semántica normativa

### Intención y exclusividad

**RADIO-INTENT-01.** Usa Radio para una alternativa dentro de una decisión mutuamente excluyente. Ejemplo: Archivo PDF frente a Hoja de cálculo bajo Formato del reporte. Usa Checkbox para elecciones independientes o aceptación; Toggle para una preferencia binaria aplicada al alternar. No uses un radio aislado como casilla de aceptación ni varios radios autónomos que permitan marcar respuestas incompatibles.

**RADIO-VALUE-01.** El grupo conserva como máximo un valor seleccionado. Elegir otra alternativa reemplaza la anterior; pulsar la actual no la apaga. `selected` verdadero/falso es un eje visual, no prueba de exclusión automática en Figma. El anfitrión controla selección, disponibilidad y validación. Si la respuesta es opcional y debe poder retirarse, considera Ninguno o No aplica solo cuando sea una respuesta real del dominio.

**RADIO-INITIAL-01.** El valor inicial corresponde a un dato guardado o a un default justificado por el flujo. La primera opción de la muestra no obliga a preseleccionar la primera en producto. Puede iniciar sin selección cuando se necesite una decisión consciente. No cambies el valor por reordenar opciones ni identifiques la alternativa solo por su posición.

### Label, anatomía y geometría

**RADIO-LABEL-01.** Las etiquetas deben ser comparables y paralelas, con diferencias visibles. Mantén un título común mediante Radio group. `Show label` / `showLabel=false` por defecto en el átomo; las opciones del grupo lo muestran. Si se oculta, `label` mantiene un nombre accesible específico. Control y etiqueta forman la misma superficie operable. No hay labelPosition izquierda/derecha en este API; el label existente va a la derecha.

**RADIO-LAYOUT-01.** Un solo tamaño: Control 24 × 24 px, Circle 18 × 18 px y punto 8 × 8 px. Gap 8 px, label hasta 320 px, texto que envuelve sin elipsis. No hay size/small/medium/large, indeterminate, pressed, success o loading propios. El punto es geometría interna, no el componente público Dot ni un pictograma Phosphor intercambiable.

**RADIO-MULTILINE-01.** La receta canónica indica control junto a la primera línea; Toggle tiene alineación central propia. Diferencia OBSERVED registrada en la página 9 del PDF: la web vigente comparte `align-items:center` entre `.bh-toggle` y `.bh-radio` en `implementations/web/src/styles.css`, y centra Radio ante etiquetas multilínea. Las capturas conservan esa implementación como evidencia, sin convertirla en regla ni afirmar que ya se corrigió. Esta enmienda documental conserva la alineación exigida por el contrato y no modifica CSS.

### Dos valores y cinco estados

| Estado | Haz | Evita |
|---|---|---|
| default | Representar disponibilidad y el selected real. | Interpretarlo como elección validada o guardada. |
| hover | Dar respuesta temporal al puntero. | Seleccionar o enfocar por hover. |
| focus | Localizar el radio operado con teclado. | Confundirlo con un candidato de Dropdown pendiente de confirmar. |
| error | Asociar una explicación a la decisión del grupo. | Depender solo del borde rojo o cambiar el valor sin acción. |
| disabled | Mantener valor representado y explicar indisponibilidad cuando sea necesario. | Permitir operación o exigir foco para conocer el motivo. |

**RADIO-COVERAGE-01.** Dos valores × cinco estados = 10 variantes. Error y foco pueden coexistir durante la corrección en web. No hay read-only propio; para consulta compón el valor claramente. Conserva tema y roles del JSON delegado; no recolorees para fabricar éxito o prioridad.

### Teclado y foco

**RADIO-KEYBOARD-01.** En el radio group nativo de formulario, Tab/Shift+Tab permiten entrar y salir; normalmente se llega a la opción seleccionada. Si no hay selección, la entrada inversa puede variar por navegador. Flechas mueven foco y selección entre alternativas habilitadas; pueden volver al extremo opuesto y omiten disabled. Espacio elige la enfocada si aún no lo estaba y no apaga la actual. No agregues un Tab obligatorio por opción ni prometas activación con Enter. Este patrón no documenta un radio group dentro de una toolbar.

**RADIO-KEYBOARD-02.** A diferencia de Dropdown, aquí recorrer con flechas sí cambia la selección. Ese cambio no debe enviar el formulario ni provocar navegación inesperada. Si revela campos, mantén su contexto junto a la decisión.

**RADIO-FOCUS-01.** El anillo usa `:focus-visible`, orientado a teclado según la heurística del navegador. Distingue foco DOM, selección y anillo visible: clic en control/label opera sin exigir el anillo de navegación con Tab; hover no da foco. No recortes el halo. `previewState` es solo una apariencia de muestrario. El anfitrión verifica el objetivo activable y la cobertura táctil de 44 × 44 px prevista por la receta sin escalar el círculo; una etiqueta alta por sí sola no acredita toda esa área ni accesibilidad global.

### Mapeo y composición

| Propiedad | Uso |
|---|---|
| name, value | Nombre común dentro del grupo; nombres distintos entre decisiones y valores únicos y estables. |
| label, showLabel=false | Nombre de la alternativa; visibilidad sin perder nombre accesible. |
| selected obligatorio, onSelect(value) | Valor controlado; seleccionar otra alternativa reemplaza la anterior. |
| invalid, disabled y atributos nativos admitidos | Invalidez/disponibilidad y asociación mediante aria-describedby según el contexto. |
| previewState=hover/focus | Muestra estática; no gestiona foco ni selección. |
| className | Composición sin sustituir tokens o fabricar tamaños. |

P-SLOTS NOT_APPLICABLE para el átomo: Control, Circle, punto y Label son partes fijas. El Slot Options pertenece a RADIO-GROUP-001. No crea Slots arbitrarios ni propiedades de iconos.

## Description exacta

Texto preparado para sincronización futura autorizada; no afirma nueva escritura o readback Figma.

RADIO-001 · Uso contextual v1.0.1. Representa una alternativa de un grupo excluyente. El anfitrión mantiene un único valor, nombre común y validación. Elegir otra reemplaza la anterior; la actual no se apaga al pulsarla. Flechas mueven foco y selección; Focus visible orienta teclado y no equivale a hover. Mantén etiqueta accesible y completa. Un tamaño, sin mixed ni iconos intercambiables. La receta exige primera línea; la diferencia web multilínea sigue registrada, no corregida por esta guía.

## Aceptación documental

Resolver RADIO-001 debe incluir esta guía y los patrones. Verificar 10 variantes, semántica exclusiva, selección inicial, nombres/valores, teclado y diferencia de alineación. El traspaso conserva la distinción entre regla canónica y observación web.
