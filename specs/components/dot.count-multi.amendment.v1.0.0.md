---
contract_schema: sdd-project/0.2
contract_id: DOT-001-COUNT-MULTI
name: Dot · Conteos de dos o más dígitos
type: amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
applies_to: [DOT-001]
amends: DOT-001
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["32:33"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/floating-actions.selection-scope.v1.0.0.json
source_data_digest_sha256: 495e4bac71f9e28436b0b4803061b341f015dd3eaf63d99453f7f3ea2bf23de0
data_refs: [specs/data/floating-actions.selection-scope.v1.0.0.json, specs/tokens/floating-actions.selection-scope.v1.0.0.json]
dependencies: [DOT-001]
---

# Dot · Conteos de dos o más dígitos

Cuando el contador muestra dos o más dígitos, aplica **8 px de padding a cada lado**. Conserva el alto de cada tamaño, 20 px en large y 16 px en medium, y ajusta el ancho al texto. `count-expand` usa el mismo padding lateral con el texto de límite decidido por el anfitrión. El contador de un dígito conserva su forma compacta.

En [Dot de Figma](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=32-33), elige `type=count-multi` para dos o más dígitos y edita la propiedad compartida `Count`. Las ocho opciones nuevas cubren large y medium en default, brand, neutral y white. `count-expand` conserva su propiedad independiente `Max count`. En React, `type=count` ajusta el padding automáticamente y cuenta dígitos decimales aunque el texto tenga separadores de millares. Presencia y notificación conservan su geometría.

El [token](../tokens/floating-actions.selection-scope.v1.0.0.json) `dot/spacing/counter-inline-wide` consume el semántico spacing-sm en los cuatro modos y tiene scopes vacíos. El [mapa](../data/floating-actions.selection-scope.v1.0.0.json) registra las 36 variantes vigentes y las ocho de límite que se actualizaron.
