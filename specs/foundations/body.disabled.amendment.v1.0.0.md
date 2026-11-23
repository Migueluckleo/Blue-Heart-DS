---
contract_schema: sdd-project/0.2
contract_id: FOUNDATIONS-BODY-DISABLED-001
name: Body · Colores disabled por propiedad
type: tokens
status: DELEGATED_FOR_BUILD
version: 1.0.0
amends: FOUNDATIONS-BODY-001
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
source_data_ref: specs/tokens/body.disabled.v1.0.0.json
source_data_digest_sha256: c7db141e768de6a8f45091427e396d135b8323182ec11db684101660d6b7544c
data_refs: [specs/tokens/body.disabled.v1.0.0.json, specs/tokens/visibility.body-only.correction.json]
dependencies: [FOUNDATIONS-BODY-001, FOUNDATIONS-TOKEN-VISIBILITY-001, FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Body · Disabled

Solicitud EXPLICIT del 23 de noviembre de 2026: incorporar colores de Body para elementos disabled con sus respectivos «focus». La aclaración vigente del usuario define focus como scopes por propiedad: texto, fondo, borde y formas/iconos. Esta ampliación no añade un estado de foco de teclado ni cambia la versión de Body o de las skills. Slots: NOT_APPLICABLE; son variables de foundation, no componentes.

Los cuatro nombres son `body/color/text/disabled`, `body/color/bg/disabled`, `body/color/stroke/disabled` y `body/color/shape/disabled`, en la colección component. Body pasa de 57 a 61 tokens; el inventario efectivo completo pasa de 1,532 a 1,536. Los datos delegados gobiernan sus IDs lógicos, description, codeSyntax, tipo, aliases y modos.

## Roles y scopes

| Propiedad | Alias semantic | Scope |
|---|---|---|
| Texto | neutral-soft | TEXT_FILL |
| Fondo | neutral-subtle | FRAME_FILL, SHAPE_FILL |
| Borde | neutral-muted | STROKE_COLOR |
| Formas e iconos | neutral-soft | SHAPE_FILL |

Los mapeos son DERIVED del uso disabled ya presente en Button e Input y de la escala neutral: texto/iconos neutral-soft, superficie neutral-subtle y borde neutral-muted. Se reutilizan los tres semánticos y sus primitivas vigentes, sin crear una nueva paleta, semánticos o colección. Los cuatro aliases son idénticos en Contable, Administrativo, Servicios y Personas. La cadena permanece component/body → semantic → primitives. Los tokens internos de componentes oficiales conservan sus propios roles.

La política de visibilidad enumera los cuatro nombres con esos scopes. Solo component/body/ aparece en selectores; todos los demás tokens mantienen scopes vacíos. No cambiar identidades previas, valores, aliases, bindings, estilos Body, codeSyntax ni visibilidad de publicación. No usar ALL_SCOPES o ALL_FILLS. Figma no ofrece un scope independiente para iconos; las formas y los fondos de shapes comparten SHAPE_FILL.

## Consumo

Usar estos roles para contenido específico de producto cuya interacción no esté disponible. Las propiedades CSS equivalentes son color, background, border-color y fill con `var(--body-color-<text|bg|stroke|shape>-disabled)`. El color comunica el estado; no bloquea eventos ni configura accesibilidad. El anfitrión aplica disabled o aria-disabled y su comportamiento según el elemento y su contrato. No confundir disabled con solo lectura, loading o un estilo de foco. No aplicar opacidad global que degrade texto o contenido no deshabilitado.

No se exige el contraste del texto activo a esta paleta de controles inactivos ni se presenta como contraste universal. Cuando el contenido deba seguir siendo legible y operativo, elegir sus roles activos apropiados. El espaciado 32 px entre bloques y 24/16/8/4 dentro de Cards permanece vigente.

## Corrección de metadatos Dropdown

La misma solicitud autoriza sincronizar en Figma las cinco descriptions identificadas en la auditoría del 23 de noviembre. Se copian literalmente de `specs/tokens/dropdown-menu.search.v1.0.0.json` hacia sus cinco targetId existentes; los datos normativos, aliases, scopes, valores y keys de Dropdown permanecen iguales. Es una corrección de metadatos, sin nueva versión del componente.

## Aceptación

Leer las cuatro nuevas variables después de la escritura, verificar los 16 aliases y su resolución por tema, sus scopes y codeSyntax. Comprobar total 1,536, Body 61 y cero tokens ajenos a Body visibles. Comparar las 11 definiciones previas afectadas/dependientes; solo cinco descriptions deben cambiar. Verificar las cinco descriptions exactas contra el JSON delegado de Dropdown. Generar CSS/manifest y probar los cuatro roles renderizados en cuatro temas. Confirmar hashes y cobertura de todos los JSON canónicos, Caution de 21 tokens incluido, y cerrar catálogo/Graphify. Propagar el corte a los paquetes y grafos de las skills autocontenidas conservando sus versiones y snapshots anteriores; la instalación requiere alcance propio. El usuario autorizó el push GitHub únicamente tras comprobar que todo esté al día.

Delegación sustentada por la solicitud y el [QA documental](../../qa/contracts/body.disabled.v1.0.0.review.md). La evidencia de implementación se registra después de ejecutar las verificaciones.
