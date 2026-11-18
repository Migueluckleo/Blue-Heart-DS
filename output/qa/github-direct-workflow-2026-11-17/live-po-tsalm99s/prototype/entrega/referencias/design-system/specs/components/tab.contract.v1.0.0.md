---
contract_schema: sdd-project/0.2
contract_id: TAB-001
name: Tab
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Tabs
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/tab.v1.0.0.json
source_data_digest_sha256: 1d8eea92f99b22f67bcf741ba2da55acaeac3b8e9153dcbc1b81f175134037b0
data_refs: [specs/data/tab.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, DOT-001]
---

# Tab · TAB-001

La [norma raíz 3.1.0](../../sources/figma-snapshots/root-families-2026-11-11/tab.3.1.0.md.txt) y el [JSON delegado](../data/tab.v1.0.0.json) gobiernan 24 variantes. Type underline, pill y segmented se combina con selected y default, hover, focus y disabled. Label, Show icon, Icon y Show badge conservan la API. ImageSquare Outline Light acompaña la etiqueta y Dot count/medium expone Count. Las alturas de referencia son 44/36/28, con ancho adaptable. P-SLOTS NOT_APPLICABLE por anatomía fija con dos partes opcionales. Figma guarda cuatro reacciones hover para underline y pill.

Segmented Selected conserva los tonos fijos de la raíz en default y hover, con blanco y sus contrastes registrados. Focus usa el anillo exterior y estilos de la matriz. El anfitrión controla selección, panel y conteo. Disabled conserva la selección recibida e impide la activación.

## Guía semántica normativa

Usa Tab para identificar una vista del mismo contexto. W3C WAI vincula cada tab con su panel y distingue foco de selección en activación manual. Carbon usa títulos breves para anticipar el contenido. BlueHeart ofrece underline, pill y segmented con la misma semántica. [W3C WAI Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) · [Carbon Tabs](https://www.carbondesignsystem.com/building-blocks/core/components/tabs/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Vista con nombre | Usa una etiqueta breve que anticipe el panel. | Quitar la etiqueta para usar solo el glyph. |
| Conteo relevante | Usa Dot count y proporciona el significado accesible del número. | Calcular el conteo dentro de Tab. |
| Vista no disponible | Conserva Disabled y explica la condición desde el anfitrión cuando sea relevante. | Cambiar automáticamente a otro panel. |

## Description exacta

TAB-001 · Usa Tab para nombrar una vista vinculada a su panel. Mantén una etiqueta clara y selecciona desde el grupo. Usa Dot solo si el conteo aporta contexto. Evita reemplazar la etiqueta por un icono. Ficha local Tab / TAB-001.

## Aceptación

Verificar las 24 variantes, estilos, reacciones guardadas, icono, Dot y anillo adaptable. En web comprobar semántica, estados y contraste de las variantes Segmented seleccionadas.
