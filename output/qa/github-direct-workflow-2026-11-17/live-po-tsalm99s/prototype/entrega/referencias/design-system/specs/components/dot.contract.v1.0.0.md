---
contract_schema: sdd-project/0.2
contract_id: DOT-001
name: Dot
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Dot
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/dot.v1.0.0.json
source_data_digest_sha256: 4e19e09d219d5234d42d400c223baa01a1d3ebda78c4d20f676cc5370eaab58e
data_refs: [specs/data/dot.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Dot · DOT-001

Conservar las 28 combinaciones observadas, sus propiedades, geometría, estilos y bindings. El [JSON delegado](../data/dot.v1.0.0.json) conserva la anatomía, valores observados y relaciones del set fuente 201:1556. El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/dot.1.1.0.md.txt) aporta el comportamiento y los límites. El [inventario raíz](../../sources/figma-snapshots/root-families-2026-11-11/inventory.json) vincula el set con su página y sus dependencias.

El alcance de esta ficha es el componente individual. Las variantes y propiedades acotadas de texto/visibilidad no requieren Slots arbitrarios. El QA verifica solo el comportamiento sustentado, con controles Figma y web separados. Los referentes orientan casos de uso, sin ampliar la API observada.

## Guía semántica normativa

Indica presencia, actividad, inactividad o una notificación sin captar foco. En un canal de ayuda, usa el punto de presencia junto al nombre y estado de una persona. Para pendientes, usa Count con un número breve o Count expand con el texto de límite que decida el anfitrión. Si el estado requiere explicación o resolución, usa texto o una notificación con contexto. Si la persona debe actuar, conserva esa acción en el control anfitrión.

| Situación | Haz | Evita |
|---|---|---|
| Presencia | Acompaña el punto junto a «Atención disponible» con un nombre o texto accesible. | Confiar en la diferencia cromática entre active e inactive. |
| Contador | Muestra «7» en el acceso a pendientes y comunica «7 pendientes» con el nombre del anfitrión. | Hacer del Dot un segundo control tabulable. |
| Exceso | Usa Count expand con «99+» si el consumidor aplica ese límite. | Esperar que un texto editable de Figma calcule el umbral. |

Presencia y notificación usan 16, 12 u 8 px. Count y Count expand se ofrecen en large o medium. Los contadores admiten default, brand, neutral y white. El fondo y el separador distinguen la forma. El texto del contador pertenece a la variante. White usa texto y borde oscuros. Count y Max count son independientes. El anfitrión decide cuando ocultar cero y, si cambia el estado, aporta anuncio cuando corresponda.

Contraste editorial sobre indicadores compactos y etiquetas visibles. [Atlassian Badge](https://atlassian.design/components/badge/usage) · [Carbon Tag](https://www.carbondesignsystem.com/building-blocks/core/components/tag/guidelines)

## Description exacta

DOT-001 · Usa Dot para presencia o conteo breve sin interacción. Elige el tamaño del anfitrión; Count y Count expand ofrecen default, brand, neutral o white. Acompaña el estado con texto o nombre accesible y usa un control anfitrión para actuar. Evita depender solo del color o esperar que Figma calcule el límite. Ejemplo: 7 pendientes. Ficha local: Dot / DOT-001.

## Aceptación

Verificar cobertura, bindings, estilo, propiedad de cada capa y reacciones almacenadas según la captura. Probar en navegador el comportamiento aplicable. El código web aplica px únicamente a dimensiones y tipografía medidas. Los temas y aliases se resuelven por los datos canónicos.
