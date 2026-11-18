---
contract_schema: sdd-project/0.2
contract_id: CONVERSATION-RESPONSE-001
name: Conversation Response
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Conversation Response
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "222:309"
target_node_ids: ["222:72"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/conversation-response.v1.0.0.json
source_data_digest_sha256: 60d61d1039c903b358a492299d72f3726e6273f44c30bc1a620a7e60bc8e4291
data_refs: [specs/data/conversation-response.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, CHARACTERS-001, BADGE-001, BUTTON-001, ICON-BUTTON-001]
---

# Conversation Response · CONVERSATION-RESPONSE-001

## Propósito

Presenta el contenido de una respuesta de BENI o NAVI dentro de una conversación. La identidad contextualiza quién responde. Los resultados y las acciones acompañan la respuesta.

## Contrato

Se oficializa el set provisional 218:1236 conservando la propuesta de Playground. Se asigna CONVERSATION-RESPONSE-001 para distinguir su contrato del de Conversation Composer, que ya usa CONVERSATION-001. Los [datos delegados](../data/conversation-response.v1.0.0.json) rigen variantes, Slots, muestra, localizadores, bindings y Description. Las [foundations](../tokens/blueheart-variables.v0.1.2.json) rigen los valores de tokens.

## Anatomía

A la izquierda va el personaje. La columna de contenido contiene identidad (nombre y Badge), Body, Previews, Secondary content, Additional actions y Feedback actions. El auxiliar privado `.Conversation / Preview` contiene el glyph Phosphor Table Outline Light, título editable y un Badge Tabla. El auxiliar es una tarjeta informativa.

## Propiedades

| Figma | Default | React |
|---|---|---|
| Agent | BENI | `agent` |
| Body | Texto de ejemplo | `body` |
| Previews | Preview tabular | `previews` |
| Secondary content | Texto de ejemplo | `secondaryContent` |
| Additional actions | Dos Button | `additionalActions` |
| Feedback actions | Tres Icon Button | `feedbackActions` |
| Show previews | true | `showPreviews` |
| Show secondary content | true | `showSecondaryContent` |
| Show additional actions | true | `showAdditionalActions` |
| Title (auxiliar) | Título tabular de ejemplo | `title` |

Los textos de demostración viven en el catálogo. El anfitrión entrega el cuerpo y el contenido opcional.

## Variantes y estados

| Agent | Personaje | Categoría |
|---|---|---|
| BENI | BENI Standby, Frame 01 | Fiscal y contable |
| NAVI | NAVI Analysis, Frame 01 | Super Agente |

Los estados de los botones y el bucle de cada personaje provienen de sus maestros. En web, `animateAgent` permite al anfitrión activar el bucle. La preferencia de movimiento reducido conserva el fotograma inicial. El valor inicial en web es estático.

## Tamaños

La referencia mide 616 px y la columna de contenido 544 px. El personaje usa 32 px de ancho y conserva su relación de aspecto. La tarjeta tiene padding y gap de 16 px y glyph de 24 px. Se homologan los Badge claros a Badge subtle medium de 24 px (fuente 25 px). Se homologan los controles de valoración a Icon Button ghost small de 32 px (fuente 24 px). El botón secundario conserva la receta oficial del tema.

## Estados de contenido

Los tres booleanos controlan regiones independientes. Los cinco Slots admiten contenido vacío. La muestra trae respectivamente 1, 1, 1, 2 y 3 hijos. El número de muestra describe la evidencia observada.

## Comportamiento

En Figma se conservan las reacciones locales heredadas y la animación de Characters. El anfitrión define cuándo llega una respuesta, la lógica de creación de indicadores, dashboard, valoración y copia. El ejemplo web informa las activaciones en memoria. La tarjeta de preview presenta contenido sin capturar foco ni ejecutar navegación.

## Accesibilidad

El artículo se identifica con el nombre visible del agente y el personaje es decorativo. Los controles interactivos requieren nombre accesible, activación nativa y foco visible. Comunica el resultado de una acción con el mecanismo de estado apropiado, sin mover el foco para un aviso rutinario. La muestra anuncia su resultado con `output`. [W3C APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) · [W3C WCAG Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) · [W3C WCAG Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

## Tokens de diseño

Los tokens de Conversation Response cubren padding, gap, radio, stroke, superficie, acento y texto mediante aliases semánticos locales. El cuerpo usa Manrope Regular 14/20, el nombre Manrope Bold 14/20 y el título del Preview Manrope Bold 16/24. El marco del preview conserva el acento observado. Button, Badge y Characters consumen sus propios tokens. ThumbsUp y ThumbsDown conservan Phosphor Light. El control Copiar conserva el [glifo interno de Table de la fuente](../../sources/assets/conversation-response/copy.svg) en su caja de 16 px.

## Reglas de contenido

Usa el nombre del agente y su categoría correspondiente. Inserta primero la respuesta. Añade un título descriptivo para cada resultado y etiquetas de acción que indiquen su efecto.

## Reglas de composición

P-SLOTS **REQUIRED**. Body, Previews y Secondary content son regiones verticales, estiran los hijos insertados y se ajustan al contenido. Additional actions y Feedback actions son filas que pueden envolver, con los controles alineados al inicio. Los cinco Slots admiten inserción, retiro, reemplazo y reordenamiento, con mínimo y máximo de Figma sin configurar. Respeta el orden de lectura. Additional actions aloja acciones del resultado. Feedback actions aloja controles para valoración y copia.

## Comportamiento adaptable

La columna de contenido reduce su ancho mientras la identidad y las acciones pueden envolver. El texto y títulos largos pueden crecer en altura. El ancho de referencia de 616 px se reduce a 320 px en los ensayos de consumo.

## Casos límite

Una región vacía desaparece del flujo visual. Una vista sin previews puede incluir acciones pertinentes a la respuesta. En web, un título largo en la tarjeta conserva salto de línea y el anfitrión aporta el contenido del cuerpo.

## Combinaciones excluidas

Evita mezclar el nombre, la categoría y el personaje de agentes distintos. Evita competir con dos acciones primarias en el mismo grupo o mostrar acciones sin un efecto definido por el anfitrión.

## Mapeo diseño ↔ código

El set se conserva en dos variantes. El componente React compone Characters, Badge, Button e IconButton oficiales. Los Slots corresponden a regiones React y el auxiliar Preview se ofrece con título tipado. La fuente identifica Copiar como el arte privado de Table. Su SVG original se conserva como asset y se aplica en web con el color del Icon Button. La tarjeta mantiene el glyph Table de Phosphor.

## Criterios de aceptación

- CR-01 · Figma lee dos variantes, un auxiliar, las Description y el enlace, vínculos locales y cinco Slots. La propuesta conserva su ID y el listado queda A–Z.
- CR-02 · Verificar ambos agentes, tres booleanos y operación real de los Slots desde instancias. Probar conteos inferiores y superiores a la muestra, vacío, reordenamiento, sustitución y ancho de 320 px.
- CR-03 · Chrome verifica ambos agentes, geometría y reflujo, teclado y foco, acciones locales, Slots y la ficha del catálogo Next.

## Ejemplos

El catálogo alterna BENI y NAVI. Permite ocultar previews, contenido secundario y acciones adicionales. Los controles de muestra escriben su resultado en un aviso local.

## Fuente de verdad

[Propuesta Figma](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=218-1236) · [Lectura estructurada](../../sources/figma-snapshots/conversation-response-2026-11-12/selection.json) · [Datos delegados](../data/conversation-response.v1.0.0.json).

## Gestión de cambios

Versiona cambios de anatomía, Slots, identidad, comportamientos y roles. Los efectos de negocio se especifican en el producto anfitrión.

## Historial

2026-11-12 · v1.0.0 · Oficialización delegada del set provisional.

## Guía semántica normativa

Usa Conversation Response para la respuesta de un agente en el historial. Usa Conversation Composer para el campo de redacción y los controles de quien pregunta. Para un resultado que puede leerse junto a la respuesta, usa Previews. Usa las acciones de resultado para efectos sobre el contenido y reserva la fila de feedback para valorar o copiar. [Conversation Composer](conversation-composer.contract.v1.0.0.md)

| Situación | Haz | Evita |
|---|---|---|
| Respuesta directa | Pon el contenido principal en Body. | Enterrar la respuesta bajo tarjetas o acciones. |
| Resultado tabular | Usa un título específico en Previews. | Dar a la tarjeta un gesto de navegación sin definir su destino. |
| Acciones | Distingue la acción principal del resultado y nombra los iconos. | Usar el pictograma como único nombre accesible. |
| Valoración | Confirma el resultado de la acción con el mecanismo de estado adecuado. | Mover el foco a un aviso rutinario. |

## Description exacta

Conversation Response · CONVERSATION-RESPONSE-001. Presenta una respuesta de BENI o NAVI. Usa Body para la respuesta, Previews para resultados y los Slots restantes para contexto y acciones. El anfitrión gestiona la respuesta y la valoración.

CONVERSATION-RESPONSE-001. Tarjeta auxiliar para mostrar el título de un resultado tabular. Insértala en Previews de Conversation Response.

## Corrección de bindings de componente · 2026-11-12

Los bindings propios y CSS consumen variables de Conversation Response. Cada alias conserva el rol y valor por tema. Las instancias heredan los tokens de su maestro. [Mapa delegado de la corrección](../tokens/component-layer.correction.json).
