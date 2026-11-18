---
contract_schema: sdd-project/0.2
contract_id: HEADER-001
name: Header
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Header
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/header.v1.0.0.json
source_data_digest_sha256: 0fdeba3beb49476684bdc1f35701868cca2936aa8dd5834ff772f16737256bd9
data_refs: [specs/data/header.v1.0.0.json, specs/data/header.assets.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, BADGE-001, COMPANY-SELECTOR-001, USER-SELECTOR-001, HEADER-ACTIONS-001]
---

# Header · HEADER-001

El [contrato fuente v1.0.1](../../sources/figma-snapshots/root-families-2026-11-11/header.1.0.1.md.txt) y el [JSON delegado](../data/header.v1.0.0.json) gobiernan su composición. Conserva un maestro, cinco propiedades booleanas y Version. Reutiliza contables/contabilidad/horizontal, Badge info/medium, Header actions, Company selector y User selector. El badge vive dentro de Show version. Los divisores pertenecen a sus bloques. La configuración de muestra conserva 96 px de alto y mínimo 1152 px de ancho. P-SLOTS NOT_APPLICABLE por composición fija según la variante y controles acotados.

## Guía semántica normativa

Identifica el producto y su contexto global. Muestra versión, etapa, acciones, empresa y cuenta según el producto. Mantén la proporción del logo original y delega los menús, permisos y confirmaciones al anfitrión.

| Situación | Haz | Evita |
|---|---|---|
| Versión preliminar | Asocia el Badge al bloque de versión. | Mostrar etapa como control independiente. |
| Contexto global | Mantén acciones, empresa y cuenta distinguibles. | Añadir destinos ajenos a la configuración. |
| Ancho limitado | Usa el mínimo del contrato y un patrón de anfitrión adecuado. | Recortar el logo o inferir un breakpoint. |

[Carbon UI shell header](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-header/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Description exacta

HEADER-001 · Usa Header para identificar producto y contexto global. Conserva el logo oficial y compón versión, acciones, empresa y cuenta. Evita recortar el logo o inferir destinos. Ejemplo: encabezado de Contabilidad. Ficha local: Header / HEADER-001.

## Aceptación

Verificar maestro, seis propiedades, vínculos, asset, guías y geometría. En web comprobar bloques, logo y controles locales.
