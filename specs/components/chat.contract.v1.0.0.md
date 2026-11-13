---
contract_schema: sdd-project/0.2
contract_id: CHAT-001
name: Chat
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Chat
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "242:658"
target_node_ids: ["242:437"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/tokens/chat.v1.0.0.json
source_data_digest_sha256: 4950488963f3818edf8b0b8201c2d83eab961075bd26e649987b7a998a2a23d7
data_refs: [specs/tokens/chat.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, CHARACTERS-001, CHIP-001, CONVERSATION-001, CONVERSATION-RESPONSE-001, USER-MESSAGE-001]
---

# Chat · CHAT-001

## Propósito y anatomía

Chat organiza la bienvenida, la redacción y el historial de una conversación. El ancho de referencia es 750 px y el máximo observado es 816 px. La estructura vertical usa 32 px de inset superior y de separación principal. El diseño no aporta un fondo propio.

## Variantes, propiedades y estados

| State | Composición |
|---|---|
| Standby | BENI Standby, saludo de 32/40, subtítulo de 20/28, Composer de hasta 616 px y tres sugerencias Chip medium en la muestra. |
| Started | Historial en la parte inferior de su región, estado de 14/20 y Composer al ancho disponible. La muestra mide 750 × 683 px y contiene un User message y un Conversation Response. |

Se nombra `State` al eje provisional `Property 1`. Standby es el valor inicial. El texto del nombre y del estado es editable. El nombre usa la marca del tema. Las ramas ocultas de demostración se retiran de cada variante oficial. Se mantienen los IDs de la propuesta. Se conservan las transiciones heredadas de BENI y Chip.

## Composición y accesibilidad

`Messages` es un Slot nativo en Started. Admite añadir, quitar, sustituir, reordenar y quedar vacío. Los dos hijos de muestra ilustran orden de lectura. Los límites de historial, desplazamiento, cargas y respuestas los define el anfitrión. Standby conserva sus tres sugerencias en Figma y la web acepta una lista de sugerencias suministrada por el anfitrión. El catálogo usa controles nativos con nombre y foco y un estado informativo con `role="status"`. El texto del nombre se ajusta al ancho disponible.

## Comportamiento

El anfitrión controla el estado, el borrador, la selección de sugerencias y el envío. La propuesta carece de una transición propia entre las dos variantes. En la muestra web una sugerencia rellena el borrador y el envío local de texto lleva a Started. Los mensajes de muestra, la valoración y el estado ilustran composición sin backend.

## Tokens

Los [datos delegados](../tokens/chat.v1.0.0.json) definen los roles de Chat y el ancho máximo de 816 px. Los maestros anidados conservan sus propios tokens. QA coteja la cadena component → semantic → primitives en los cuatro temas.

## Aceptación

Verificar los dos estados y la geometría de referencia, Description, vínculos locales, bindings por modo, edición y reordenamiento de Messages en una instancia y reflujo web a 320 px. Probar sugerencias y envío local por teclado. Confirmar el orden A–Z antes de Playground.

## Guía semántica normativa

Usa Standby para ofrecer un comienzo y Started para mostrar los mensajes de la conversación. Usa Composer para la entrada y el Slot Messages para mensajes en orden cronológico. [Conversation Composer](conversation-composer.contract.v1.0.0.md) · [Conversation Response](conversation-response.contract.v1.0.0.md) · [User message](user-message.contract.v1.0.0.md)

| Situación | Haz | Evita |
|---|---|---|
| Bienvenida | Ofrece sugerencias concretas como punto de partida. | Presentar sugerencias como mensajes ya enviados. |
| Conversación iniciada | Conserva identidad y orden de los mensajes. | Usar el estado de espera como si fuera una respuesta. |
| Integración | Define el comportamiento de las acciones en el producto. | Usar el comportamiento de muestra como regla de negocio. |

## Description exacta

Chat · CHAT-001. Compone la bienvenida y una conversación. Usa Standby para la bienvenida y Started para el historial. Edita Messages desde una instancia. El anfitrión gestiona el borrador y el estado.

## Procedencia

[Set provisional](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=238-2236) · [Lectura estructurada](../../sources/figma-snapshots/chat-2026-11-13/selection.json).
