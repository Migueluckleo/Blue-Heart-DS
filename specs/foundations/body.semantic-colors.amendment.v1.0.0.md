---
contract_schema: sdd-project/0.2
contract_id: FOUNDATIONS-BODY-SEMANTIC-COLORS-001
name: Body · Colores semánticos por propiedad
type: tokens
status: DELEGATED_FOR_BUILD
version: 1.0.0
amends: FOUNDATIONS-BODY-001
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
source_data_ref: specs/tokens/body.semantic-colors.v1.0.0.json
source_data_digest_sha256: 0ea0106dd8f55cb826ebdc83f4243d6828edc56207480759145edcedd2a68490
data_refs: [specs/tokens/body.semantic-colors.v1.0.0.json, specs/tokens/visibility.body-only.correction.json]
dependencies: [FOUNDATIONS-BODY-001, FOUNDATIONS-BLUEHEART-VARIABLES-001, FOUNDATIONS-TOKEN-VISIBILITY-001]
---

# Body · Colores semánticos por propiedad

## Propósito y alcance

EXPLICIT: solicitud del 18 de noviembre de 2026 para construir contenido específico de producto con colores semánticos de Body, consumiendo los roles semantic existentes. La aclaración del usuario define «focus» como **scopes por propiedad: texto, fondo, borde y formas/iconos**. Body sigue siendo exclusivamente el prefijo `body/` en la colección `component`.

Se conservan los 33 tokens iniciales, sus valores/IDs y cinco estilos tipográficos. La ampliación del 18 de noviembre agregó 19 colores. La corrección EXPLICIT del 19 de noviembre incorpora `body/color/shape/inverse`, solicitado para consumir el semántico blanco: son 20 colores añadidos y Body suma 53 tokens. Se conserva la versión 1.0.0 por tratarse de una corrección del alcance. Reutilizar los cuatro colores de texto semánticos existentes. Los nuevos nombres, mapeos funcionales y specimen son DERIVED dentro de este alcance; la [captura anterior](../../sources/figma-snapshots/body-semantic-colors-2026-11-18/before-before.json) verifica roles e identidades. No se crea una familia de Cards ni controles del DS. Slots: NOT_APPLICABLE, ampliación de foundation con muestras de uso.

## Matriz de roles y aliases

| Sufijo | text existente | bg | stroke | shape |
|---|---|---|---|---|
| primary | neutral-maximum | neutral-base (existente) | neutral-medium | neutral-maximum |
| secondary / emphasis | text/secondary → neutral-strong | bg/emphasis → neutral-subtle (existente) | stroke/secondary → neutral-muted | shape/secondary → neutral-strong |
| brand | strong del tema | subtle del tema | strong del tema | strong del tema |
| warning | warning-strong | warning-subtle | warning-strong | warning-strong |
| success | positive-default | positive-subtle | positive-default | positive-default |
| danger | danger-default | danger-subtle | danger-default | danger-default |
| information | information-default | information-subtle | information-default | information-default |
| inverse (solo shape) | — | — | — | neutral-base → neutral/100 (#FFFFFF) |

Los nombres completos son `body/color/<text|bg|stroke|shape>/<sufijo>`. No se crea bg/secondary: se conserva bg/emphasis. Brand cambia según Contable/Administrativo/Servicios/Personas: brand, brand-administrativo, brand-servicios y brand-personas; se conserva el nombre Body y se selecciona el alias por modo. Los otros roles son iguales entre modos. Success consume el namespace semantic positive; information conserva su nombre público actual.

Los tokens añadidos son cinco bg (brand y cuatro semánticos), siete stroke y ocho shape. `body/color/shape/inverse` referencia `neutral-base` en los cuatro modos, que a su vez referencia `neutral/100`, blanco opaco (#FFFFFF). No representa un estado semántico ni crea roles inverse en text, bg o stroke. El ID lógico y los IDs fuente de los aliases se conservan separados del `targetId` real de AI Blueheart DS en el JSON. Cada valor es VARIABLE_ALIAS de **component/body → semantic → primitives**. Se reutilizan las primitivas y semánticos, incluido warning-strong ya existente; no se copian colores resueltos ni se alteran colores de otras familias.

## Scopes y selectores

| Grupo Body | Scope exacto | Uso |
|---|---|---|
| color/text/* | TEXT_FILL | Títulos, instrucciones y mensajes de contenido específico. |
| color/bg/* | FRAME_FILL, SHAPE_FILL | Superficies en frames y shapes. |
| color/stroke/* | STROKE_COLOR | Color de contornos y separadores. |
| color/shape/* | SHAPE_FILL | Rellenos de formas, vectores e iconos del contenido. |

Figma no ofrece ICON_FILL ni discrimina intención de fondo frente a icono en un shape. Por eso bg y shape pueden coexistir en SHAPE_FILL; el nombre y la descripción definen la función. No ampliar a ALL_FILLS/ALL_SCOPES. Los demás tokens siguen ocultos con scopes=[] y operativos como dependencias internas. La [política canónica](../tokens/visibility.body-only.correction.json) enumera los 53 nombres por tipo/scope y se aplica después de los datos de tokens en web.

## Consumo y legibilidad

El producto usa Body para Cards, Widgets, indicadores, iconos y bloques propios construidos bajo demanda. Los Buttons, Badges, Icon Buttons y demás componentes oficiales conservan sus tokens internos. Los colores describen significado: el contenido también debe expresar advertencia, éxito, error o información con texto/forma apropiados.

La matriz recomienda emparejar text/<tono> y shape/<tono> con bg/<tono>, o texto principal sobre un fondo sutil. Esta recomendación excluye inverse: el blanco de `shape/inverse` se usa sobre superficies gráficas oscuras o intensas; la muestra lo empareja con `shape/brand` y verifica contraste en los cuatro temas. No usarlo como forma visible sobre bg/primary o fondos sutiles sin comprobar el contraste. Mantener el mensaje aunque cambie el color. Los tests validan esos pares concretos en cuatro temas, además de los siete textos sobre primary/emphasis; no se deduce contraste universal entre cualquier par de tokens. stroke/primary da un límite perceptible, mientras stroke/secondary es un separador neutro sutil decorativo y no sirve como única señal de un control o estado.

En web, un bloque propio puede consumir `background: var(--body-color-bg-warning)`, `color: var(--body-color-text-warning)` y `border-color: var(--body-color-stroke-warning)`. Una forma usa `fill: var(--body-color-shape-warning)`; una forma blanca sobre una superficie gráfica de marca usa `fill: var(--body-color-shape-inverse)`. En Figma se vincula la propiedad equivalente al mismo rol. Las medidas y estándares previos (32 px entre bloques; 24/16/8/4 internos) se conservan.

## Documentación y reglas futuras

Las descripciones canónicas, codeSyntax WEB, aliases por tema e IDs de destino están en los datos delegados. Los contratos de Body y visibilidad y las dos guías operativas deben enlazar esta ampliación. Los launchers conservan su versión; el consumo requiere fuentes y catálogo del mismo corte. El encargo histórico del 18 de noviembre solicitó coordinar el push con «Estados de Github». Esta corrección se cierra localmente, con documentación, catálogo, ambas guías y Graphify del mismo corte; no añade una publicación, instalación o push.

Todo futuro token Body declara función, nombre exacto, tipo y scopes compatibles en los datos y en la política. Todo token ajeno a Body mantiene scopes vacíos. Validar TOKEN-QA-01/02/03, aliases por cuatro modos y preservación de bindings/estilos antes de cerrar cada alta o corrección. La ampliación no publica la biblioteca Figma ni instala skills.

## Aceptación

Body = 53 tokens, 29 COLOR en total (20 añadidos sobre los nueve iniciales), sin nombres duplicados. `shape/inverse` tiene únicamente SHAPE_FILL y alias a neutral-base en cuatro modos, con resolución blanca opaca. Leer posteriormente IDs, valores, codeSyntax y scopes, verificar las cadenas y que ningún token ajeno a Body esté visible. Para la corrección inverse, comparar los 52 tokens Body previos, neutral-base y neutral/100, y los cinco estilos tipográficos sin cambios. La aceptación original de la ampliación del 18 de noviembre conserva su evidencia histórica de 53 registros Body/dependencias. Verificar muestra editable en Playground con bindings de texto, frame/shape fill y stroke, sin componentes nuevos. Generar CSS/manifest y verificar valores renderizados por tema, pares de contraste y ausencia de regresión de las cinco Cards/espaciados. Actualizar contratos, QA, guías, catálogo y Graphify por el cierre del proyecto.
