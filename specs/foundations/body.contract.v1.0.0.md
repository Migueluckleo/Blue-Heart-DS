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

## Separación entre Cards y bloques independientes

La separación entre Cards y entre bloques de información independientes usa `body/spacing/xl`, **32 px**. Esta regla es EXPLICIT por aclaración del usuario y se aplica al espacio exterior entre bloques. No se reemplaza por el espaciado interno de una Card.

## Estándar interno de composición de Cards

- Padding interno de cada Card: `body/spacing/lg`, 24 px.
- Separación entre segmentos de información: `body/spacing/md`, 16 px.
- Separación dentro de un segmento: `body/spacing/sm`, 8 px.
- Separación entre título y descripción: `body/spacing/xs`, 4 px.

El estándar 24/16/8/4 corresponde únicamente a elementos internos de cada Card, no al espacio entre Cards. Este es el estándar inicial. El producto puede ajustar la composición usando cualquiera de los tokens Body definidos, según el contenido y el espacio disponible. El radio se elige según la necesidad; la demostración usa lg. Estas reglas no fijan una anatomía universal, cantidad de segmentos, estado, acción, tamaño o catálogo de Cards.

## Uso en web

Los aliases CSS se generan desde los datos delegados. Por ejemplo, una composición de producto usa `padding: calc(var(--body-spacing-lg) * 1px)`, `gap: calc(var(--body-spacing-md) * 1px)`, `background: var(--body-color-bg-primary)` y `color: var(--body-color-text-primary)`. Sus segmentos usan sm y el par título/descripción usa xs. Las propiedades tipográficas consumen sus roles Body y aplican px solo a medidas; font-weight y tracking conservan la unidad correspondiente.

## Aceptación

Verificar los 53 tokens Body (33 iniciales y 20 colores añadidos), el alias warning-strong, descripciones, scopes, sintaxis WEB, identidad y cadena por los cuatro modos. Cotejar los tamaños tipográficos, espaciamientos, radios y los cinco estilos compartidos. Validar cinco demos insertadas dentro del Slot Body de una instancia oficial de App Shell en Playground, con Fill en ancho, sin altas de familia ni fichas de Cards. Probar el consumo web, temas y menú del Shell; documentar el QA técnico de los tokens y la composición sin documentar las Cards como componentes.

[QA técnico](../../qa/implementations/body.v1.0.0.review.md) · [Lectura de bindings](../../implementations/figma/body-tokens-2026-11-17/readback.json).

## Ampliación Caution · 2026-11-23

La [enmienda Caution 1.0.0](caution.amendment.v1.0.0.md) añade cuatro roles Body para fondo, texto, stroke y shape. Total Body: 57. Conserva los roles y estilos anteriores.

## Ampliación disabled · 2026-11-23

La [enmienda disabled](body.disabled.amendment.v1.0.0.md) agrega cuatro colores de texto, fondo, stroke y shape con scopes por propiedad. Body suma 61 tokens; Caution y los estilos anteriores se conservan. Lee sus [datos delegados](../tokens/body.disabled.v1.0.0.json) y la política vigente para obtener el inventario completo.
