---
contract_schema: sdd-project/0.2
contract_id: BUTTON-001
amendment_id: BUTTON-USAGE-001
type: component-amendment
version: 1.0.1
status: DELEGATED_FOR_BUILD
base_contract: specs/components/buttons.contract.v1.0.0.md
applies_to: [BUTTON-001]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Buttons · Guía de uso v1.0.1

Esta enmienda amplía la guía de [Buttons v1.0.0](buttons.contract.v1.0.0.md#guía-semántica-normativa). La geometría, los bindings y la matriz de 90 variantes conservan su versión de implementación. El QA cubre texto, enlaces, ficha y preservación estructural.

## Guía semántica normativa

Usa Button cuando la persona decide iniciar una acción. El texto debe anticipar el resultado. Para elegir entre valores simultáneos, usa el control de selección que corresponda. Si la interacción cambia de destino, usa la variante Link y un enlace real.

| Variante | Cuándo usar | Haz | Evita |
|---|---|---|---|
| Primary | Acción que completa el objetivo de la vista o diálogo. | «Guardar borrador» en un editor de reporte. | Dar la misma prominencia a «Guardar borrador» y «Cancelar». |
| Secondary | Alternativa visible que acompaña la acción principal. | «Volver a edición» junto a «Guardar borrador». | Dar jerarquía secundaria a una acción que la persona necesita encontrar primero. |
| Text | Acción terciaria, local y de menor énfasis. | «Restaurar filtros» al lado de los filtros aplicados. | Usarla para la acción principal de un formulario o para navegar a otra vista. |
| Link | Navegación hacia una URL o destino concreto. | «Ver historial» con un href a la página de historial. | Usarlo para aprobar, guardar o eliminar un registro. |
| Danger | Acción destructiva o irreversible. La pantalla aporta confirmación con objeto y consecuencia. | «Eliminar borrador» en el diálogo que identifica el borrador afectado. | Usarlo como acento para resaltar una acción cotidiana. |

**Tamaño y composición.** Mantén un tamaño coherente en un grupo. Los tres tamaños conservan 48, 40 y 32 px de alto. El anfitrión decide el layout y comprueba el área táctil necesaria. Label aporta el nombre. Los iconos Phosphor son opcionales y se eligen por su contribución al significado. El foco exterior pertenece al control. La composición es acotada y P-SLOTS queda NOT_APPLICABLE.

**Estados.** Default comunica disponibilidad. Hover y pressed dan respuesta temporal a puntero o activación. Focus conserva una señal visible al tabular. Loading señala una acción ya iniciada, conserva el ancho en web y reemplaza los iconos por el Loader compartido. Disabled impide iniciar una acción y la pantalla explica el requisito para habilitarla. Un error posterior pertenece al flujo que lanzó la acción.

**Caso de carga.** Al activar «Guardar borrador» pasa a «Guardando…» y bloquea una segunda activación. La operación real pertenece al anfitrión. Cuando termina, la pantalla decide cómo comunicar el resultado y restablece la disponibilidad que corresponda. La demo del catálogo permite entrar y salir de carga mediante estado local.

**Accesibilidad.** Usa botón nativo para una acción y enlace con href para navegación. Mantén un nombre específico, el foco visible, la activación por teclado y la comunicación de ocupado en web. Si la acción está deshabilitada, deja visible o accesible el motivo. El color y los iconos complementan la etiqueta.

**Contraste editorial.** Atlassian y Carbon orientan la jerarquía de una acción principal, las alternativas y la claridad de etiquetas. La semántica, matriz y restricciones de BlueHeart siguen gobernadas por el contrato base. [Atlassian Button](https://atlassian.design/components/button/usage) · [Carbon Button](https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines)

## Description exacta por set

| Set | ID maestro | Description |
|---|---|---|
| Button/primary | 23:835 | BUTTON-001 · Uso v1.0.1. Usa Primary para la acción principal de una vista o diálogo, como «Guardar borrador». Evita dos acciones principales en el mismo grupo. Secondary acompaña alternativas y Link navega. Mantén el tamaño del grupo y un Label específico. Conserva el foco de teclado. Durante Loading, el Loader compartido indica «Guardando…» y el consumidor bloquea duplicados. Ficha local: Buttons / BUTTON-001. |
| Button/secondary | 23:952 | BUTTON-001 · Uso v1.0.1. Usa Secondary para una alternativa a la acción principal, como «Volver a edición». Evita darle el mismo énfasis que a «Guardar borrador». Mantén el tamaño del grupo, Label específico y foco visible. Los iconos Phosphor son opcionales. Durante Loading, el consumidor bloquea otra activación. Ficha local: Buttons / BUTTON-001. |
| Button/text | 23:1070 | BUTTON-001 · Uso v1.0.1. Usa Text para una acción local terciaria, como «Restaurar filtros». Elige Primary si la acción completa la tarea y Link si cambia de destino. Conserva Label explícito y foco visible. Loading usa el Loader compartido y comunica ocupado. Ficha local: Buttons / BUTTON-001. |
| Button/link | 23:1185 | BUTTON-001 · Uso v1.0.1. Usa Link para navegar, como «Ver historial». El consumidor aporta un href y conserva el nombre y foco de teclado. Usa un botón de acción para guardar, confirmar o eliminar. Durante Loading o Disabled, el consumidor impide activar el destino. Ficha local: Buttons / BUTTON-001. |
| Button/danger | 23:1306 | BUTTON-001 · Uso v1.0.1. Usa Danger para una acción destructiva, como «Eliminar borrador». La pantalla identifica el objeto, explica la consecuencia y solicita confirmación. Evita usarlo como énfasis decorativo. Conserva Label, foco y bloqueo de activaciones durante Loading. Ficha local: Buttons / BUTTON-001. |
