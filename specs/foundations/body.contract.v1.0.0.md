---
contract_schema: sdd-project/0.2
contract_id: FOUNDATIONS-BODY-001
name: Body · Tokens para contenido específico de producto
type: tokens
status: DELEGATED_FOR_BUILD
version: 1.0.0
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
source_data_ref: specs/tokens/body.v1.0.0.json
source_data_digest_sha256: d9862b8642147af2499f8a3527d8e2947daace0d8ab23e86705ed7d77af21d0b
data_refs: [specs/tokens/body.v1.0.0.json, specs/tokens/body.semantic-colors.v1.0.0.json, specs/tokens/visibility.body-only.correction.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Body · Tokens para contenido de producto

Solicitud explícita del 17 de noviembre de 2026. Body proporciona colores, tipografía y medidas para elementos específicos de cada software: Cards, Widgets y contenido construido bajo demanda. Se usan en Anticipa, Vende, Contabilidad y otros productos sin convertir cada composición en un componente del DS. El estándar describe la base visual; el producto conserva su estructura, contenido, datos y reglas.

## Arquitectura y consumo

La [política de visibilidad](token-visibility.contract.v1.0.0.md) gobierna los scopes efectivos: solo el prefijo exacto `body/` en `component` aparece en selectores y exclusivamente en propiedades compatibles. Los demás tokens siguen operativos como dependencias internas con scopes vacíos. Conservar estilos Body y bindings; consultar la corrección canónica vigente además del inventario histórico.

Los tokens `body/*` viven dentro de la colección **component**, no en una cuarta colección. Cada token apunta a un rol **semantic** y este a una **primitive** existente. El producto consume Body para su contenido propio. Los componentes oficiales conservan sus tokens de componente. No se copian colores o medidas resueltas ni se consumen primitivas directamente. Los cuatro modos son Contable, Administrativo, Servicios y Personas.

[Datos delegados y descripciones canónicas](../tokens/body.v1.0.0.json). La actualización de Body no crea ni documenta un catálogo de Cards. Las cinco muestras de Playground son únicamente demostraciones, permanecen como frames editables y quedan fuera del registro de familias, exports públicos y fichas de componentes. Por instrucción explícita, no se crean maestros ni sets de Card. Los botones y controles internos sí reutilizan instancias oficiales del DS.

## Colores de texto y fondo

| Token | Alias semántico | Uso |
|---|---|---|
| body/color/text/primary | neutral-maximum | Títulos, valores y contenido principal. |
| body/color/text/secondary | neutral-strong | Instrucciones, descripciones y contenido complementario. |
| body/color/text/brand | brand-strong y el strong de cada producto | Texto de marca con el tema activo. |
| body/color/text/warning | warning-strong | Mensajes de advertencia. |
| body/color/text/success | positive-default | Mensajes de éxito. |
| body/color/text/danger | danger-default | Mensajes de error o riesgo. |
| body/color/text/information | information-default | Mensajes informativos. |
| body/color/bg/primary | neutral-base | Superficie principal. |
| body/color/bg/emphasis | neutral-subtle | Énfasis sutil en neutrales. |

DERIVED: Brand usa los roles strong de marca para lectura en tamaños pequeños sobre ambos fondos. Warning incorpora un rol semántico warning-strong enlazado a amber/800: warning-default no ofrece contraste suficiente para texto normal en estos fondos. Se reutiliza la paleta; no cambia el inventario de primitivas ni los aliases de los componentes existentes. El significado debe expresarse también en el texto; el color no sustituye el mensaje.

La [ampliación semántica por propiedad](body.semantic-colors.amendment.v1.0.0.md) incorpora 20 roles: fondos brand/semánticos, bordes y formas/iconos, incluido `body/color/shape/inverse` → neutral-base (blanco) con scope SHAPE_FILL. Conserva estos nueve colores y sus IDs/aliases; Body suma 53 tokens. Lee también sus [datos delegados](../tokens/body.semantic-colors.v1.0.0.json).

## Tipografía

| Rol | Tamaño | Interlineado | Peso |
|---|---:|---:|---|
| H1 | 24 px | 32 px | Semibold |
| H2 | 20 px | 28 px | Semibold |
| H3 | 16 px | 24 px | Semibold |
| Instrucciones y descripciones | 14 px | 20 px | Regular |
| Caption | 12 px | 16 px | Regular |

Los tamaños son EXPLICIT y los headings descienden de cuatro en cuatro. Familia Manrope, pesos, tracking normal y los interlineados son DERIVED de la escala tipográfica existente del DS. Cada rol expone size y line-height; family, heading/weight, text/weight y tracking son compartidos. Los estilos Figma `body/heading/h1`, `body/heading/h2`, `body/heading/h3`, `body/description` y `body/caption` deben conservar su enlace a estos tokens. La jerarquía HTML pertenece al documento del producto; una talla visual no impone saltos de headings.

## Escala de gaps y paddings

| Token | Medida | Alias semántico |
|---|---:|---|
| body/spacing/xl | 32 px | spacing-2xl |
| body/spacing/lg | 24 px | spacing-xl |
| body/spacing/md | 16 px | spacing-lg |
| body/spacing/sm | 8 px | spacing-sm |
| body/spacing/xs | 4 px | spacing-xs |
| body/spacing/null | 0 px | spacing-none |

Se adopta la enumeración explícita de la solicitud: xs=4 y sm=8. La talla de Body no renombra la escala semántica existente. Los mismos tokens sirven para gap y padding.

## Radios

| Token | Medida | Alias semántico |
|---|---:|---|
| body/radius/lg | 16 px | radius-xl |
| body/radius/md | 8 px | radius-md |
| body/radius/sm | 4 px | radius-sm |
| body/radius/null | 0 px | radius-none |

## Padding y separación en composición

**BODY-COMPOSITION-SPACING-001 · EXPLICIT, 2026-11-26.** Aplica a pantallas de producto en Figma, web y sus dos workflows de consumo. Los límites visibles se miden en cada eje del layout según la relación entre componentes.

| Situación | Regla |
|---|---|
| Card, módulo o widget con borde visible o superficie de color distinta de `primary` | **24 px** de padding interior en los cuatro lados, usando `body/spacing/lg`. Un Header con fondo propio consume su token de componente a 24 px. |
| Card con fondo `primary` y radio de esquina de **16 px**, sombra visible o ambos | **24 px** de padding interior con `body/spacing/lg`. Cada rasgo basta para asignar el padding. |
| Wrapper de producto transparente o con fondo `primary`, sin borde ni rasgos de Card que delimiten la superficie | **0 px** de padding interior, usando `body/spacing/null` cuando hay un binding para el rol. |
| Bloques independientes | **32 px** entre límites visibles, usando `body/spacing/xl`. |
| Control y contenido que gobierna | **16 px** entre sus límites visibles. Ejemplo: Tabs y su Table o Card asociada. La composición usa `body/spacing/md` y Tabs web aplica su rol de familia. |
| Header y cuerpo dentro de App Shell | **32 px** superiores en Content, una sola vez, con `app-shell/spacing/content`. |

Para cada par de componentes del flujo, mide una separación positiva de **hasta 32 px**. Suma los márgenes, gaps e insets de wrappers sin límite visible que contribuyan al mismo tramo. Si un wrapper transparente aporta 24 px y su padre añade un gap de 32 px, la separación efectiva es 56 px y falla. El padding dentro de una superficie visible se mide desde su propio límite hacia el contenido. Las composiciones estructurales de un componente oficial conservan los requisitos de su contrato.

En una Card delimitada, usa 16 px entre segmentos de información, 8 px dentro de un segmento y 4 px entre título y descripción. El producto elige composición, contenido y radio con los tokens Body existentes.

## Uso en Figma y web

En Figma, vincula Auto Layout a Body en las composiciones de producto y a los roles propios en los maestros oficiales. En web, usa los aliases generados. Una Card de fondo `primary` con stroke visible, radio de 16 px o sombra visible toma `--body-spacing-lg` para padding y `--body-spacing-md` entre segmentos. Un bloque transparente usa `--body-spacing-null` como padding. Verifica la distancia de caja a caja con contenido real y en los modos del layout. Coloca el gap de la composición en un solo nivel del tramo.

## Aceptación

Verificar los 53 tokens Body (33 iniciales y 20 colores añadidos), el alias warning-strong, descripciones, scopes, sintaxis WEB, identidad y cadena por los cuatro modos. Cotejar los tamaños tipográficos, espaciamientos, radios y los cinco estilos compartidos. Validar cinco demos insertadas dentro del Slot Body de una instancia oficial de App Shell en Playground, con Fill en ancho, sin altas de familia ni fichas de Cards. Probar el consumo web, temas y menú del Shell; documentar el QA técnico de los tokens y la composición sin documentar las Cards como componentes.

[QA técnico](../../qa/implementations/body.v1.0.0.review.md) · [Lectura de bindings](../../implementations/figma/body-tokens-2026-11-17/readback.json).

## Ampliación Caution · 2026-11-23

La [enmienda Caution 1.0.0](caution.amendment.v1.0.0.md) añade cuatro roles Body para fondo, texto, stroke y shape. Total Body: 57. Conserva los roles y estilos anteriores.

## Ampliación disabled · 2026-11-23

La [enmienda disabled](body.disabled.amendment.v1.0.0.md) agrega cuatro colores de texto, fondo, stroke y shape con scopes por propiedad. Ese corte sumó 61 tokens Body y conservó Caution y los estilos anteriores. Lee sus [datos delegados](../tokens/body.disabled.v1.0.0.json) y la política vigente para obtener el inventario completo.

## Iconos Warning y Caution sobre blanco · 2026-11-26

Usa `body/color/shape/warning-on-white` y `body/color/shape/caution-on-white` para iconos de producto sobre bg/primary. La [enmienda](body.icons-on-white.amendment.v1.0.0.md) documenta aliases, contraste y scopes. Body suma 63 tokens.
