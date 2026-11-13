---
contract_schema: sdd-project/0.2
contract_id: CONVERSATION-001
name: Conversation Composer
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Conversation Composer
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "216:109"
target_node_ids: ["216:66"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/conversation-composer.v1.0.0.json
source_data_digest_sha256: 09d3ceea4314dade00e98a5a178909eb619fcb175a50e951180d07db87540918
data_refs: [specs/data/conversation-composer.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, BUTTON-001, ICON-BUTTON-001]
---

# Conversation Composer · CONVERSATION-001

## Propósito

Agrupa la redacción de un mensaje, el contexto inmediato y las acciones que acompañan la redacción en una conversación. El producto anfitrión gobierna los efectos de cada acción.

## Contrato

La instrucción de oficializar `206:1182` autoriza construir un maestro dedicado en la página **Conversation Composer** y preservar la propuesta en Playground. El [JSON delegado](../data/conversation-composer.v1.0.0.json) rige nombres, defaults, dependencias, geometría de referencia, correspondencias de bindings y texto exacto de Description. El [inventario de foundations](../tokens/blueheart-variables.v0.1.2.json) rige los valores.

## Anatomía

El orden es aviso breve opcional, región `message` opcional y superficie de redacción. La superficie contiene borrador, separador y fila de acciones. A la izquierda está Plus en un Icon Button ghost. A la derecha están el Slot `Tools` y, al final, PaperPlaneTilt en un Icon Button primary. La muestra trae Paperclip y Microphone en `Tools`. `message` contiene un texto con énfasis y un Button de muestra.

## Propiedades

| Figma | Valor inicial | React |
|---|---|---|
| show message | false | `showMessage` |
| show disclaimer | true | `showDisclaimer` |
| show extra actions | true | `showExtraActions` |
| message | Slot nativo con dos hijos iniciales | `message` |
| Tools | Slot nativo con dos Icon Button | `tools` |

El texto de aviso, placeholder, etiqueta accesible, borrador y callbacks son parámetros web. En Figma el aviso y el placeholder conservan las capas de texto observadas. El botón de acción principal conserva su posición y variante.

## Variantes y estados de configuración

Un componente principal sin set. Las tres booleanas controlan regiones independientes. Los estados de interacción de los botones pertenecen a sus respectivos maestros.

## Tamaños

El espécimen Figma mide 616 px de ancho. El control iconográfico pequeño mide 32 px. En web, 616 px es el máximo del ejemplo de referencia y el componente puede ajustarse al espacio disponible.

## Estados

La propuesta muestra el campo vacío y las herramientas de ejemplo. Con `show message` activo se revela su Slot. El texto introducido se gestiona como valor controlado en React.

## Comportamiento

La propuesta muestra reacciones de hover heredadas de los botones. La redacción web usa un textarea con saltos de línea nativos. Enviar invoca el callback de la acción principal. Plus, adjuntar y micrófono invocan únicamente los callbacks suministrados. Sin callback, el control correspondiente queda deshabilitado. El catálogo registra acciones en memoria. Se delegan al anfitrión el envío, su validación, la limpieza del borrador, adjuntos, permisos y grabación.

## Accesibilidad

Cada control requiere un nombre accesible y foco visible. Vincula el aviso persistente al campo mediante `aria-describedby`. Mantén disponible la etiqueta del campo después de introducir texto. La etiqueta web asociada con `label` puede ser visualmente oculta cuando el anfitrión aporta contexto e instrucciones visibles. El placeholder es una pista transitoria. El orden de teclado sigue el orden DOM. Las instrucciones críticas del producto deben permanecer visibles y el anfitrión comunica cambios de estado que requieran anuncio. [W3C WAI Labels](https://www.w3.org/WAI/tutorials/forms/labels/) · [W3C WAI Instructions](https://www.w3.org/WAI/tutorials/forms/instructions/)

## Tokens de diseño

El JSON delega el mapeo desde bindings de geometría y tipografía de la propuesta hacia los tokens de Conversation Composer y sus aliases semánticos locales. Los paints observados se corresponden con roles neutral base, subtle, muted, medium, strong y maximum y el acento `brand-accent`. El acento de marco conserva el mismo valor en los cuatro modos como en la fuente observada. Los controles anidados consumen sus recetas de modo. El texto de muestra conserva 160% de interlineado relativo y tracking de −0.24 px. Phosphor Outline Light conserva Plus, Paperclip, Microphone y PaperPlaneTilt.

## Reglas de contenido

Usa un aviso breve relacionado con la redacción. Usa `message` para un aviso contextual y una acción secundaria si corresponde. La cuota y fecha de la propuesta son contenido ilustrativo. Usa verbos específicos para nombrar las acciones y nombres distintos si sus efectos difieren.

## Reglas de composición

P-SLOTS **REQUIRED**. Ambos Slots pertenecen a Conversation Composer y admiten añadir, quitar, sustituir y reordenar hijos desde una instancia vinculada. `message` aloja contexto textual y, cuando conviene, un Button secondary small local. `Tools` aloja controles secundarios compactos, preferentemente Icon Button ghost small. Los dos hijos de cada ejemplo ilustran composición. En ambos Slots el mínimo y máximo configurados son nulos y el contenido inicial vacío está permitido; los límites del producto quedan a cargo del anfitrión. El anfitrión mantiene el padding, gap y alineación de ambas regiones. Los controles insertados conservan sus bindings y foco propios.

## Comportamiento adaptable

El ancho del maestro se puede ajustar en la instancia; el grupo de redacción y acciones sigue ese ancho. El texto puede crecer verticalmente. En web los hijos de `message` y `tools` pueden pasar a una segunda línea. A 320 px la muestra conserva acceso a los controles y mantiene la acción principal al final.

## Casos límite

`showMessage` activo y Slot vacío deja la región sin contenido. `Tools` vacío conserva la acción principal. Un borrador largo mantiene el ancho, respeta saltos de línea y puede crecer verticalmente con el control de tamaño nativo del textarea.

## Combinaciones excluidas

Evita poner una segunda acción primaria en `message` o `Tools`. Mantén Plus fuera de `Tools` y evita duplicar Enviar. El estado de cuota, un mensaje de muestra o el dibujo de un micrófono carecen de efectos de producto por sí mismos.

## Mapeo diseño ↔ código

Los botones Figma ghost y primary de icono se conservan como instancias locales y se componen con `IconButton` en React. El CTA remoto de muestra se homologa al Button secondary small oficial, cuyo borde adopta el color de marca de Button. El divisor web es un borde semántico y los iconos se sirven desde el paquete Phosphor existente. Los Slots se materializan como regiones de contenido React.

## Criterios de aceptación

- CC-01 · Maestro único, Description y enlace exactos, propuesta original preservada y páginas oficiales A–Z con posiciones protegidas.
- CC-02 · Tres booleanas con defaults correctos. Dos Slots nativos comprobados en una instancia vinculada con 0, 1, 2 y 3 hijos, orden, reemplazo y ancho reducido.
- CC-03 · Cotejar geometría, tipografía y paints contra fuente. Verificar bindings locales, controles oficiales, glyphs y reacciones heredadas.
- CC-04 · Chrome verifica redacción multilineal, navegación por teclado, nombre y foco, acciones con callbacks, ambos Slots y 320 px. El catálogo Next compila y documenta el uso.

## Ejemplos

Compara la configuración inicial con una conversación que incluye un aviso contextual y acciones secundarias. Usa los ejemplos en el catálogo local para comprobar la redacción y los callbacks de muestra.

## Fuente de verdad

[Propuesta original](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=206-1182) · [Lectura estructurada](../../sources/figma-snapshots/conversation-composer-2026-11-12/selection.json) · [Datos delegados](../data/conversation-composer.v1.0.0.json). La lectura documenta la propuesta observada. El contrato define el alcance de su oficialización.

## Gestión de cambios

Versiona las ampliaciones de API, roles, Slots o estados. Las reglas de producto se definen en el contexto que integra el componente.

## Historial

2026-11-12 · v1.0.0 · Oficialización delegada de la propuesta v0.1.0.

## Guía semántica normativa

Usa Conversation Composer en la zona de redacción de una conversación. Usa Text Area para un campo multilínea autónomo en un formulario e Inline Notification para avisos que gobiernan una sección completa. Mantén la jerarquía de acciones secundaria/primaria visible y utiliza los Slots únicamente para contenido pertinente al borrador. [Contrato Text Area](text-area.contract.v1.0.0.md) · [Contrato Inline Notification](inline-notification.contract.v1.0.0.md)

| Situación | Haz | Evita |
|---|---|---|
| Contexto de redacción | Pon un aviso breve en `message` si afecta a la conversación actual. | Usar el mensaje de cuota de la muestra como regla del producto. |
| Herramientas | Coloca las acciones secundarias en `Tools` y nómbralas por su efecto. | Duplicar la acción principal o añadir botones de relleno. |
| Etiqueta y ayuda | Conserva una etiqueta asociada y deja la instrucción imprescindible a la vista. | Usar solo el placeholder o el pictograma para explicar una acción. |
| Envío | Entrega el borrador al callback del anfitrión y deja allí el resultado y la validación. | Iniciar un envío al escribir o borrar el borrador al activar una herramienta. |

## Description exacta

Conversation Composer · CONVERSATION-001. Redacta un mensaje en una conversación. Usa message para contexto y Tools para acciones secundarias. Reserva el Icon Button primary para la acción principal. El anfitrión define qué hace cada acción.

## Corrección de bindings de componente · 2026-11-12

Los bindings propios y CSS consumen variables de Conversation Composer. Cada alias conserva el rol y valor por tema. Las instancias heredan los tokens de su maestro. [Mapa delegado de la corrección](../tokens/component-layer.correction.json).
