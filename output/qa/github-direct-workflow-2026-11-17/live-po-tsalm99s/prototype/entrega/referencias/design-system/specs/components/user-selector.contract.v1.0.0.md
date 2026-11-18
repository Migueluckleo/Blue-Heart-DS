---
contract_schema: sdd-project/0.2
contract_id: USER-SELECTOR-001
name: User selector
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Header
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/user-selector.v1.0.0.json
source_data_digest_sha256: 882964ba8daf03eadcff102ea8e90699672279779cd357addf0e87f757dd1104
data_refs: [specs/data/user-selector.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, AVATAR-001]
---

# User selector · USER-SELECTOR-001

El [contrato fuente v1.0.0](../../sources/figma-snapshots/root-families-2026-11-11/user-selector.1.0.0.md.txt) y el [JSON delegado](../data/user-selector.v1.0.0.json) gobiernan su composición. Conserva cuatro variantes. El selector reutiliza Avatar text/extra-large, sin Status, y CaretDown Light. Avatar conserva exposición y propiedades. El selector no agrega un nombre propio en Figma. La cuenta y el menú pertenecen al anfitrión. P-SLOTS NOT_APPLICABLE por composición fija según la variante y controles acotados.

## Guía semántica normativa

Usa este control para solicitar las opciones de cuenta. El anfitrión proporciona un nombre accesible, controla el menú y comunica su estado. Avatar representa la cuenta sin duplicar el anuncio.

| Situación | Haz | Evita |
|---|---|---|
| Cuenta activa | Nombra «Cuenta de Julia» en el control. | Depender solo de las iniciales. |
| Menú abierto | Comunica expanded y conserva el foco. | Usar open como una acción de sesión. |
| Imagen de cuenta | Reutiliza Avatar con el tamaño del selector. | Duplicar fotos, fuentes o Dot en el selector. |

[Carbon UI shell header](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-header/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Description exacta

USER-SELECTOR-001 · Usa User selector para abrir las opciones de cuenta. Conserva un nombre accesible y el Avatar vinculado. Evita duplicar el contenido del Avatar o atribuir una acción de sesión al estado open. Ficha local: User selector / USER-SELECTOR-001.

## Aceptación

Verificar las cuatro variantes, Avatar expuesto, caret y rotación, geometría y estados accesibles del botón web.
