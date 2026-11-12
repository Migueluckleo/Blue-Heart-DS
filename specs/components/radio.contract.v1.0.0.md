---
contract_schema: sdd-project/0.2
contract_id: RADIO-001
name: Radio
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Radio Buttons
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/radio.v1.0.0.json
source_data_digest_sha256: 13023fc62683575609568abe29ec4060bbd069fc5d4df7be9fab96a641e62ee6
data_refs: [specs/data/radio.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Radio · RADIO-001

Conservar las 10 combinaciones observadas, sus propiedades, geometría, estilos y bindings. El [JSON delegado](../data/radio.v1.0.0.json) conserva la anatomía, valores observados y relaciones del set fuente 625:59. El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/radio.1.0.0.md.txt) aporta el comportamiento y los límites. El [inventario raíz](../../sources/figma-snapshots/root-families-2026-11-11/inventory.json) vincula el set con su página y sus dependencias.

El alcance de esta ficha es el componente individual. Las variantes y propiedades acotadas de texto/visibilidad no requieren Slots arbitrarios. El QA verifica solo el comportamiento sustentado, con controles Figma y web separados. Los referentes orientan casos de uso, sin ampliar la API observada.

## Guía semántica normativa

Usa Radio para una opción mutuamente excluyente dentro de un grupo. Haz visible el conjunto cuando comparar alternativas ayuda. Si se pueden elegir varias respuestas, usa Checkbox. Una preferencia binaria aplicada de inmediato corresponde a Toggle.

| Situación | Haz | Evita |
|---|---|---|
| Una elección | «Periodo del reporte» agrupa «Mes actual» y «Mes anterior». El grupo conserva una sola opción seleccionada. | Usar radios independientes para permitir elegir ambos periodos. |
| Error | Comunica la selección necesaria mediante el grupo y conserva un mensaje asociado. | Confiar solo en el borde de error o cambiar la selección sin acción del usuario. |
| Etiqueta larga | Conserva el control junto a la primera línea y permite envolver el texto. | Recortar el nombre o ocultarlo sin alternativa accesible. |

Control, círculo, punto de selección y foco son partes fijas. La etiqueta es opcional visualmente y conserva nombre accesible. El grupo anfitrión suministra nombre común, exclusividad y navegación con flechas en web. La fuente individual conserva default, hover, focus, disabled y error, con selected verdadero o falso. Sus dos reacciones observadas cambian de default a hover. La selección funcional en web se comprueba aparte del prototipo Figma.

Contraste editorial sobre exclusividad, etiquetas y teclado. [Carbon Radio button](https://www.carbondesignsystem.com/building-blocks/core/components/radio-button/guidelines) · [W3C Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

## Description exacta

RADIO-001 · Usa Radio como una opción de un conjunto excluyente, como «Mes actual» frente a «Mes anterior». El anfitrión aporta nombre de grupo, valor y exclusividad. Conserva el nombre accesible y el foco. Usa Checkbox para múltiples opciones y Toggle para una preferencia binaria inmediata. Comunica error con texto asociado. Ficha local: Radio / RADIO-001.

## Aceptación

Verificar cobertura, bindings, estilo, propiedad de cada capa y reacciones almacenadas según la captura. Probar en navegador el comportamiento aplicable. El código web aplica px únicamente a dimensiones y tipografía medidas. Los temas y aliases se resuelven por los datos canónicos.
