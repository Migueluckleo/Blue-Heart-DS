---
contract_schema: sdd-project/0.2
contract_id: USER-MESSAGE-001
name: User message
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: User message
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "237:20"
target_node_ids: ["237:19"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/tokens/user-message.v1.0.0.json
source_data_digest_sha256: 751c840291a40808d1c258186f31ad053dd67f7261daa5a2a5ad120b934147b7
data_refs: [specs/tokens/user-message.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# User message · USER-MESSAGE-001

## Propósito y anatomía

Presenta un mensaje de la persona en el historial de una conversación. Un contenedor alineado al extremo derecho aloja una burbuja y su texto. La propuesta mide 616 × 52 px. La burbuja llena hasta 494 px, con radio de 8 px y padding de 16 px. El texto se alinea a la izquierda y usa Manrope Regular 14/20 con tracking cero. El contenido largo crece en altura.

## Variantes, propiedades y estados

La propuesta tiene una configuración visual. El principal expone la propiedad de texto **Message** y el componente React recibe `message: string`. La muestra conserva el texto de origen. El anfitrión suministra el mensaje real y conserva su orden en el historial. El contrato cubre texto fijo por instancia y P-SLOTS queda NOT_APPLICABLE.

## Comportamiento y accesibilidad

La burbuja presenta texto y carece de acciones. El historial aporta el contexto de autoría, orden de lectura y anuncios de mensajes nuevos cuando corresponda. La burbuja queda fuera del orden de tabulación. React renderiza el contenido como texto, conserva saltos de línea y permite partir cadenas que excedan el ancho disponible.

## Tokens

El [JSON delegado](../tokens/user-message.v1.0.0.json) define 12 roles de `user-message` y la cadena de la medida de 494 px. Figma y web consumen los tokens de componente. El fondo mantiene el acento observado y el texto conserva neutral-maximum en los cuatro temas. Las demás medidas resuelven desde las foundations vigentes.

## Aceptación

Verifica la fidelidad de 616 × 52 px en el espécimen de origen, los IDs y aliases por modo, el máximo de 494 px, los 16 px de padding y el radio de 8 px. Prueba el ancho de 320 px, texto largo, edición desde instancia vinculada y el control de tokens en Figma y web. Comprueba el orden continuo de las páginas oficiales.

## Guía semántica normativa

Usa User message para el texto que la persona ya envió. [Conversation Composer](conversation-composer.contract.v1.0.0.md) cubre la redacción. [Conversation Response](conversation-response.contract.v1.0.0.md) presenta la respuesta del agente.

| Situación | Haz | Evita |
|---|---|---|
| Consulta enviada | Muestra el contenido mediante Message dentro del historial. | Reutilizar la burbuja para editar un borrador. |
| Mensaje largo | Deja que la burbuja crezca y respete saltos de línea. | Recortar información necesaria para interpretar la respuesta. |

## Description exacta

User message · USER-MESSAGE-001. Muestra el mensaje de la persona en una conversación. Edita Message y deja que el texto se ajuste al ancho disponible.

## Procedencia

[Propuesta en Playground](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=235-174) · [Lectura estructurada](../../sources/figma-snapshots/user-message-2026-11-13/selection.json).
