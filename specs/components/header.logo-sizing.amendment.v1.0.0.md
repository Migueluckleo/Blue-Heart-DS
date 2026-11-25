---
contract_schema: sdd-project/0.2
contract_id: HEADER-001-LOGO-SIZING
name: Header · Logotipos proporcionales
type: amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
applies_to: [HEADER-001, APP-SHELL-001]
amends: HEADER-001
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["90:439", "734:191", "105:7"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/header.logo-sizing.v1.0.0.json
source_data_digest_sha256: 853d58bb242c6a0c9047b8fe4d1cd51fd122cf511065c9b28359479382777d27
data_refs: [specs/data/header.logo-sizing.v1.0.0.json, specs/data/header.assets.v1.0.0.json, specs/tokens/header.logo-sizing.v1.0.0.json]
dependencies: [HEADER-001, APP-SHELL-001, LOGOS-001]
---

# Header y App Shell · Logotipos proporcionales

La propiedad `Altura` ofrece **40, 44 y 48 px**. El default es **48 px**. El ancho siempre corresponde a la proporción de la variante oficial según `ancho = ancho original × altura elegida / altura original`. El arte queda centrado verticalmente y visible completo.

## Figma

En [Header](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=90-439) elige **Logotipo** y **Altura** en la instancia expuesta. En [App Shell](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=105-7), abre **Header** para usar los mismos controles. [Header / Logotipo](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=734-191) admite las 75 opciones oficiales en las tres alturas. La [matriz](../data/header.logo-sizing.v1.0.0.json) registra el origen, las dimensiones originales y los 225 destinos. Cada opción enlaza el maestro de origen y escala toda su instancia uniformemente. La región de Header conserva los IDs, el default de Contabilidad horizontal y sus seis claves históricas. P-SLOTS NOT_APPLICABLE, con una sola región de marca.

En la verificación de App Shell Grid colapsado, se probó **Mi CONTPAQi / light** en su variante proporcional. A 48 px de alto, esta versión tiene un ancho aproximado de 325.80 px. La marca de la instancia de Figma es editable mediante Logotipo y puede cambiar después de la prueba. La alternativa `light2` mide 314.40 px a esa misma altura. Los maestros de Logos mantienen sus dimensiones oficiales con bloqueo de relación de aspecto. Para sustituir la marca dentro de Header usa los controles de marca y altura. El intercambio directo de maestros puede conservar la caja de la instancia anterior en Figma.

El ancho útil del anfitrión debe alojar el logo, los controles y el padding. La referencia de 1280 px admite las opciones de la matriz con los controles de muestra. La altura total de Header se ajusta al mayor contenido vertical, más el padding vigente.

## Tokens y web

Los [tokens de 40 y 44 px](../tokens/header.logo-sizing.v1.0.0.json) son internos, se enlazan a semantic → primitives en los cuatro temas y tienen scopes vacíos. 48 px reutiliza `header/size/logo-height`. Los roles de ancho del logo se derivan del arte.

React acepta `logo={{src, alt}}` y `logoHeight={40 | 44 | 48}`. Contabilidad horizontal y 48 px son los defaults. La galería permite elegir marca y altura. El elemento de imagen calcula el ancho intrínseco y Header amplía su caja según el espacio requerido por su contenido, con mínimo de 1152 px. El uso de los tres SVG es embebido en Header. La familia Logos conserva su alcance general Figma.

## Description exacta

HEADER-001 · Usa Header para identificar producto y contexto global. Elige Logotipo y Altura de 40, 44 o 48 px. El ancho conserva la proporción original. Compón versión, acciones, empresa y cuenta. Ficha local: Header / HEADER-001.
