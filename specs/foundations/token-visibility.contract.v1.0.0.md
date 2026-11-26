---
contract_schema: sdd-project/0.2
contract_id: FOUNDATIONS-TOKEN-VISIBILITY-001
name: Visibilidad de tokens · Body como interfaz de producto
type: tokens
status: DELEGATED_FOR_BUILD
version: 1.0.0
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
source_data_ref: specs/tokens/visibility.body-only.correction.json
source_data_digest_sha256: 6540fa3b6bb794cc5b265fc20c3ffbcba0bef54becf7c80e4f4ce881da1e2c41
data_refs: [specs/tokens/visibility.body-only.correction.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, FOUNDATIONS-BODY-001]
---

# Visibilidad de tokens en selectores

Política EXPLICIT solicitada el 17 de noviembre de 2026. Es una corrección de configuración y consumo; no cambia versiones de las familias ni autoriza publicar o instalar. Esta enmienda sustituye exclusivamente las reglas y datos anteriores de **scopes efectivos**. Los inventarios y snapshots históricos conservan sus bytes y procedencia. El JSON delegado gobierna la selección exacta y los scopes por token; sus descripciones de uso y todos los demás campos siguen en los JSON de origen.

## Interfaz para construir contenido de producto

Body significa únicamente **colección `component` y nombre que empiece por `body/`**, con coincidencia sensible a mayúsculas. Es la interfaz de tokens disponible para construir contenido específico de producto, como Cards y Widgets. No comprende `section-header/.../body`, `table/.../body` ni `characters/.../body`, ni un prefijo Body en otra colección.

Todos los tokens ajenos a esa selección deben tener `scopes = []` donde Figma lo admita: primitives, semantic y tokens internos de todas las familias. Continúan operativos como dependencias internas. Los componentes conservan sus tokens propios y su cadena **component → semantic → primitive**; el contenido a medida consume **component/body → semantic → primitive**. Ocultar un token de un selector no lo desvincula, borra o convierte en literal, y no significa ocultarlo de publicación.

## Scopes compatibles y específicos

| Función | Tipo | Scope |
|---|---|---|
| Color de texto | COLOR | TEXT_FILL |
| Fondo de frame o shape | COLOR | FRAME_FILL, SHAPE_FILL |
| Color de borde | COLOR | STROKE_COLOR |
| Relleno de forma o icono | COLOR | SHAPE_FILL |
| Familia tipográfica | STRING | FONT_FAMILY |
| Estilo/peso textual Regular/Semibold | STRING | FONT_STYLE |
| Tamaño de letra | FLOAT | FONT_SIZE |
| Interlineado | FLOAT | LINE_HEIGHT |
| Tracking | FLOAT | LETTER_SPACING |
| Gap y padding | FLOAT | GAP |
| Radius | FLOAT | CORNER_RADIUS |

Los 53 tokens Body actuales incluyen los 33 iniciales y los 20 colores de la [ampliación semántica](body.semantic-colors.amendment.v1.0.0.md), con esas funciones. `body/color/shape/inverse` consume neutral-base (blanco) y declara exclusivamente SHAPE_FILL, igual que los demás roles shape. No usar `ALL_SCOPES` ni `ALL_FILLS`. La API de Figma representa gap y padding mediante `GAP`; no existe un scope independiente de padding. Los pesos Body actuales son STRING: conservar `FONT_STYLE`, sin convertirlos a pesos numéricos.

La misma política se aplica a todas las medidas, no solo a COLOR: `body/spacing/*` se ofrece en gap y padding; `body/radius/*`, únicamente en corner radius; tamaños e interlineados tipográficos, en sus propiedades específicas. Los tokens numéricos internos de cada familia, semantic y primitives permanecen con scopes vacíos. No exponer spacing como sizing o radius por compartir tipo FLOAT.

### Lectura del selector frente al binding existente

OBSERVED en el editor, 2026-11-19: un campo que ya consume un token interno puede mostrar ese token actualmente asignado, incluso dentro del selector. Esto conserva la referencia activa y no significa que los demás tokens internos estén disponibles para construir contenido nuevo. Comprobar la oferta en un campo sin binding: debe mostrar únicamente los Body compatibles. No desvincular ni convertir el token activo a literal para hacer desaparecer su etiqueta, ni modificar publicabilidad. El gestor de Variables sigue siendo una interfaz de administración de dependencias; no es el selector de una propiedad.

La [revalidación de medidas](../../qa/implementations/token-visibility.measures.2026-11-19.review.md) contrasta scopes y UI real para gap, padding y corner radius; distingue el token ya asignado de las opciones ofrecidas en un campo nuevo.

Para futuras altas, declarar cada token `component/body/` por nombre, tipo y función en el JSON delegado y seleccionar exclusivamente los scopes que necesite. Un token Body sin declaración bloquea el QA/generación. Si se autoriza un rol de borde, usar `STROKE_COLOR` para color o `STROKE_FLOAT` para grosor; sizing usa `WIDTH_HEIGHT`, peso numérico `FONT_WEIGHT`, opacidad `OPACITY`, efectos `EFFECT_COLOR`/`EFFECT_FLOAT` y propiedades de párrafo sus scopes específicos. Estas correspondencias no crean tokens nuevos ni exponen tokens internos. Toda nueva familia y todo token fuera de Body nacen con `[]` y conservan el consumo interno por aliases.

Figma no distingue un scope exclusivo de icono: SHAPE_FILL abarca formas, vectores e iconos. Los fondos de shapes también requieren SHAPE_FILL, por lo que ambos grupos pueden coexistir en ese selector. Los nombres bg y shape y sus descripciones distinguen el uso; no se usa ALL_FILLS para resolverlo.

## Preservación obligatoria

Conservar IDs, keys, nombres, tipos, descripciones, modos y su orden, valores por modo, aliases, codeSyntax, bindings y visibilidad de publicación de variables y colecciones. Conservar los cinco estilos tipográficos Body, sus IDs, métricas y enlaces a variables. No editar el lienzo, estilos ni código visual de los componentes para cumplir esta política. Slots: NOT_APPLICABLE, se corrige metadato de variables sin añadir composición o componente.

## Datos canónicos y web

[La corrección JSON](../tokens/visibility.body-only.correction.json) se aplica después de los inventarios y enmiendas de tokens listados en [web-inputs](../../config/web-inputs.json). Solo sustituye scopes efectivos; conserva IDs, valores y aliases de las fuentes. El [generador](../../implementations/web/scripts/tokens.py) aplica [la validación de visibilidad](../../implementations/web/scripts/token_visibility.py) a todo el inventario y registra la enmienda en el manifest generado. El CSS y las referencias internas conservan su funcionamiento; la política de selectores no elimina variables CSS. Los scopes de un inventario histórico aislado no representan la configuración efectiva vigente: consumir también esta corrección o el manifest derivado.

## Aceptación y futuros cambios

TOKEN-QA-03 se ejecuta en cada alta o corrección junto a TOKEN-QA-01/02: releer las variables reales, comprobar que únicamente `component/body/` tiene scopes visibles exactos y compatibles, y que todos los demás tienen `[]`. Comparar antes/después todos los campos preservados y las huellas de bindings, paints, modos explícitos y referencias a estilos por página, incluyendo instancias anidadas y capas invisibles. Comparar íntegros los cinco estilos Body. En web comprobar manifest efectivo y cadenas por tema, y que una corrección solo de scopes no cambie el CSS. No tratar `[]` como un binding inválido: scopes filtra selectores; colección, tipo, rol y aliases validan el consumo interno.

Registrar por tipo cualquier rechazo real de la API al configurar scopes sin alterar su función, publicabilidad ni valores. El inventario actual contiene COLOR, FLOAT y STRING; BOOLEAN no está presente, por lo que no se afirma validación de ese tipo. Un tipo futuro se prueba explícitamente antes de cerrar; una incompatibilidad se reporta como limitación y bloquea la afirmación de visibilidad universal para ese tipo.

La solicitud autoriza implementación tras [QA documental](../../qa/contracts/token-visibility.v1.0.0.review.md), bajo DEC-AI-TECHNICAL-CLOSURE-001. Los resultados y límites se registran en el [QA de implementación](../../qa/implementations/token-visibility.v1.0.0.review.md) y sus lecturas de Figma. No publicar la biblioteca, modificar `hiddenFromPublishing` ni instalar skills como parte de esta corrección.

## Caution · 2026-11-23

La [enmienda Caution](caution.amendment.v1.0.0.md) amplía la política delegada con cuatro roles compatibles Body. El inventario efectivo suma 57 Body; primitivos, semánticos y demás componentes mantienen scopes vacíos.

## Body disabled · 2026-11-23

La [ampliación disabled](body.disabled.amendment.v1.0.0.md) agrega text/disabled, bg/disabled, stroke/disabled y shape/disabled con TEXT_FILL, FRAME_FILL/SHAPE_FILL, STROKE_COLOR y SHAPE_FILL respectivamente. Ese corte sumó 61 nombres visibles de Body. Focus significa scopes por propiedad, según aclaración explícita del usuario; no introduce un foco de teclado.

## Iconos sobre blanco · 2026-11-26

[Warning y Caution para iconos sobre blanco](body.icons-on-white.amendment.v1.0.0.md) añade dos roles exclusivamente SHAPE_FILL. Body suma 63 nombres visibles. El semántico de Caution conserva scopes vacíos.
