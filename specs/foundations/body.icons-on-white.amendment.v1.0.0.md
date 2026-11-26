---
contract_schema: sdd-project/0.2
contract_id: FOUNDATIONS-BODY-ICONS-ON-WHITE-001
name: Body · Warning y Caution para iconos sobre blanco
type: tokens
status: DELEGATED_FOR_BUILD
version: 1.0.0
amends: FOUNDATIONS-BODY-001
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/tokens/body.icons-on-white.v1.0.0.json
source_data_digest_sha256: 903a25bc62f7491290e5a22be0365ba97136d27355600a805c958b992d8ecaa4
data_refs: [specs/tokens/body.icons-on-white.v1.0.0.json, specs/tokens/caution.v1.0.0.json, specs/tokens/visibility.body-only.correction.json]
dependencies: [FOUNDATIONS-BODY-001, FOUNDATIONS-CAUTION-001, FOUNDATIONS-TOKEN-VISIBILITY-001, FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Body · Iconos Warning y Caution sobre blanco

Solicitud EXPLICIT del 26 de noviembre de 2026. Usa estos roles en iconos del contenido de producto sobre `body/color/bg/primary` blanco. Los dos roles aparecen exclusivamente en SHAPE_FILL dentro de component. Los roles existentes `shape/warning` y `shape/caution` siguen cubriendo los pares con fondos sutiles. Los estados de controles oficiales consumen su propia familia.

| Token Body | Cadena semántica | Valor en los cuatro temas | Contraste frente a #FFFFFF |
|---|---|---|---|
| `body/color/shape/warning-on-white` | `warning-default` → `amber/600` | #C97B00 | 3.32:1 |
| `body/color/shape/caution-on-white` | `caution-icon-on-white` → `caution-orange/600` | #C45C0A | 4.30:1 |

Los tonos 500 de las dos paletas tienen 2.18:1 y 2.83:1 sobre blanco, respectivamente. El 600 de cada paleta es el paso contiguo que supera el objetivo de 3:1 para iconos informativos. Esta verificación cubre el par exacto con blanco. La etiqueta o la forma también debe expresar el significado. El semántico añadido tiene scopes vacíos y conserva la familia `caution-orange`.

Verificar nombres, modos, aliases locales, scopes y CSS generado. Body pasa de 61 a 63 nombres visibles; el inventario efectivo pasa de 1,613 a 1,616. [Datos delegados](../tokens/body.icons-on-white.v1.0.0.json) · [Política de visibilidad](token-visibility.contract.v1.0.0.md).
