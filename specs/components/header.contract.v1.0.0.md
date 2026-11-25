---
contract_schema: sdd-project/0.2
contract_id: HEADER-001
name: Header
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Header
figma_page_id: "90:2"
target_node_ids: ["90:439"]
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/header.v1.0.0.json
source_data_digest_sha256: 0fdeba3beb49476684bdc1f35701868cca2936aa8dd5834ff772f16737256bd9
data_refs: [specs/data/header.v1.0.0.json, specs/data/header.assets.v1.0.0.json, specs/tokens/header-app-shell.spacing.v1.0.0.json, specs/data/header-app-shell.spacing.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, BADGE-001, COMPANY-SELECTOR-001, USER-SELECTOR-001, HEADER-ACTIONS-001, LOGOS-001]
---

# Header · HEADER-001

El [contrato fuente v1.0.1](../../sources/figma-snapshots/root-families-2026-11-11/header.1.0.1.md.txt) y el [JSON delegado](../data/header.v1.0.0.json) gobiernan su composición. Conserva un maestro, cinco propiedades booleanas y Version. Reutiliza contables/contabilidad/horizontal, Badge info/medium, Header actions, Company selector y User selector. El badge vive dentro de Show version. Los divisores pertenecen a sus bloques. La fuente inicial mide 96 px de alto y mínimo 1152 px de ancho. La [enmienda de espaciado del 24 de noviembre](header-app-shell.spacing.amendment.v1.0.0.md) documenta la referencia actual de 112 px con padding exterior 32, conserva los 24 internos y delega sus bindings propios. La [enmienda de logotipos](header.logo-sizing.amendment.v1.0.0.md) documenta el selectores Logotipo y Altura de 40, 44 o 48 px con ancho proporcional. P-SLOTS NOT_APPLICABLE por composición fija según la variante y controles acotados.

## Guía semántica normativa

Identifica el producto y su contexto global. Muestra versión, etapa, acciones, empresa y cuenta según el producto. Elige Logotipo y una altura de 40, 44 o 48 px, con ancho proporcional al original. Delega los menús, permisos y confirmaciones al anfitrión.

| Situación | Haz | Evita |
|---|---|---|
| Versión preliminar | Asocia el Badge al bloque de versión. | Mostrar etapa como control independiente. |
| Contexto global | Mantén acciones, empresa y cuenta distinguibles. | Añadir destinos ajenos a la configuración. |
| Ancho limitado | Usa el mínimo del contrato y un patrón de anfitrión adecuado. | Recortar el logo o inferir un breakpoint. |

[Carbon UI shell header](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-header/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Description exacta

HEADER-001 · Usa Header para identificar producto y contexto global. Elige Logotipo y Altura de 40, 44 o 48 px. El ancho conserva la proporción original. Compón versión, acciones, empresa y cuenta. Ficha local: Header / HEADER-001.

## Aceptación

Verificar maestro, seis propiedades, vínculos, asset, guías y geometría. En web comprobar bloques, logo y controles locales.

## HEADER-FIRST-001 · Header obligatorio en el primer resultado

Al construir una plataforma nueva o una función nueva, el primer resultado entregado incluye completo el apartado [Header / Content](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=90-1189): Version, Actions, Company y User interaction, con los componentes oficiales y sus tokens internos. El AppShell conserva este Header; no lo omitas por criterio del agente ni porque el brief no lo mencione. Esta regla aplica tanto al PO Prototype como a la pantalla editable de Figma.

Solo una solicitud explícita del usuario permite omitir un bloque. Por ejemplo, después de mostrar el resultado completo, «remueve el user interaction» retira únicamente ese bloque del prototipo o de las pantallas Figma que se estén trabajando. La referencia inicial siempre es la composición completa; registra la solicitud de retirada como un cambio explícito del usuario, no como un nuevo valor por defecto para otras plataformas o funciones. Usa las propiedades soportadas por el Header, conserva los otros bloques y sus tokens, y no modifiques el principal del DS. Registra qué se quitó y la instrucción que lo sustenta en el mapa, el traspaso y el QA. Sin esa solicitud, la aceptación exige los cuatro bloques visibles en el primer resultado.
