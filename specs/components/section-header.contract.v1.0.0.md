---
contract_schema: sdd-project/0.2
contract_id: SECTION-HEADER-001
name: Section Header
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Section Header
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/section-header.v1.0.0.json
source_data_digest_sha256: 2cd006b86ff91b3d612e8eec8043cad150afd75f84c3ecae40e79f41c6c1fa77
data_refs: [specs/data/section-header.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, BREADCRUMB-001, BADGE-001, INPUT-001, ICON-BUTTON-001, BUTTON-001]
---

# Section Header · SECTION-HEADER-001

La [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/section-header.1.0.0.md.txt) y el [JSON delegado](../data/section-header.v1.0.0.json) gobiernan el principal `891:28`. Dos textos y cuatro visibilidades controlan título, descripción, Breadcrumb, Metadata y fila de acciones. P-SLOTS REQUIRED. Metadata, Inputs y General actions son Slots nativos independientes de cero o más elementos. La muestra conserva Badge success/small y fecha, cinco Input/empty large, Gear Light en Icon Button Secondary large y Button Primary large.

La cabecera comienza con un ancho de ejemplo de 1225, padding 24 y radio 16. Content y Heading tienen mínimo 358, Metadata 294 y título con máximo 554. El contenedor de contenido usa wrap y separación de 32. El host comprueba el contenido al reducir el ancho y decide cuántos controles presentar. Título Manrope SemiBold 24, descripción y fecha Manrope Regular 14, interlínea AUTO. La excepción aprobada de contraste de la fecha se conserva.

## Guía semántica normativa

Usa Section Header para orientar dentro de una sección y colocar los controles que cambian su contenido. GOV.UK usa Breadcrumb para expresar jerarquía navegable. W3C WAI asigna el nivel de encabezado según la estructura de la página. BlueHeart combina ambas referencias con metadatos y controles opcionales gestionados por el anfitrión. [GOV.UK Breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/) · [W3C WAI Headings](https://www.w3.org/WAI/tutorials/page-structure/headings/)

| Situación | Haz | Evita |
|---|---|---|
| Encabezado de una sección | Usa el nivel de título apropiado y muestra Breadcrumb cuando ayude a orientarse. | Repetir el título o usar Breadcrumb como progreso. |
| Estado y actualización | Usa Metadata para estado o fecha relevantes y permite omitirlo cuando quede vacío. | Mezclar acciones y metadatos en la misma región. |
| Configuración y acciones | Mantén Inputs y General actions independientes y reduce los controles en contenedores estrechos. | Fijar cinco Inputs o inferir un breakpoint global. |

## Description exacta

SECTION-HEADER-001 · Usa Section Header para titular y orientar dentro de una sección. Compón Breadcrumb, Metadata, Inputs y General actions según el contenido. Mantén independientes los tres Slots. Ejemplo: comprobantes con estado y filtros. Ficha local: Section Header / SECTION-HEADER-001.

## Aceptación

Verificar maestro, propiedades, componentes vinculados, wrap y tres Slots desde instancias, incluyendo inserción, retiro, reordenamiento y ancho 640. Comprobar web con encabezado, controles accesibles y configuración estrecha. Registrar el contraste heredado de la fecha.
