---
contract_schema: sdd-project/0.2
contract_id: SECTION-HEADER-001
name: Section Header
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Section Header
figma_page_id: "96:2"
target_node_ids: ["287:461", "96:5", "287:151"]
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/section-header.v1.0.0.json
source_data_digest_sha256: 2cd006b86ff91b3d612e8eec8043cad150afd75f84c3ecae40e79f41c6c1fa77
data_refs: [specs/data/section-header.v1.0.0.json, specs/data/section-header.assets.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, BREADCRUMB-001, BADGE-001, INPUT-001, ICON-BUTTON-001, BUTTON-001, LOGOS-001]
---

# Section Header · SECTION-HEADER-001

La [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/section-header.1.0.0.md.txt) y el [JSON delegado](../data/section-header.v1.0.0.json) documentan la fuente raíz `891:28`. El [maestro vigente en AI Blueheart DS](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=287-461) conserva los siguientes controles. Dos textos y cuatro visibilidades controlan título, descripción, Breadcrumb, Metadata y fila de acciones. P-SLOTS REQUIRED. Metadata, Inputs y General actions son Slots nativos independientes de cero o más elementos. La muestra conserva Badge success/small y fecha, cinco Input/empty large, Gear Light en Icon Button Secondary large y Button Primary large.

La cabecera comienza con un ancho de ejemplo de 1225, padding 24 y radio 16. Content y Heading tienen mínimo 358, Metadata 294 y título con máximo 554. El contenedor de contenido usa wrap y separación de 32. El host comprueba el contenido al reducir el ancho y decide cuántos controles presentar. Título Manrope SemiBold 24, descripción y fecha Manrope Regular 14, interlínea AUTO. La excepción aprobada de contraste de la fecha se conserva.

## Variantes de encabezado

El set `287:461` usa la propiedad de variante `logo instead title`. Mantiene los textos, cuatro visibilidades y tres Slots. `Title` sigue editable y conserva su valor al alternar. Los IDs internos de propiedades fueron reasignados por Figma al formar el set.

| Figma | React | Encabezado visible | Alto del maestro a 1225 px |
| --- | --- | --- | --- |
| `false` (predeterminado, `96:5`) | `logoInsteadTitle={false}` | Título de texto | 219 px |
| `true` (`287:151`) | `logoInsteadTitle={true}` | Logo de Beni sin firma en el lugar del título | 218 px |

La variante con logo usa la instancia local del set [Beni y Navi](logos.contract.v1.0.0.md) y conserva su caja de 87 × 32 px. El recurso de web es el SVG del mismo maestro. React usa `title` como nombre accesible del encabezado en ambos modos y conserva el nivel definido en `headingLevel`. [Lectura y QA](../../implementations/figma/section-header-logo-replacement/readback.json).

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

Verificar maestro, propiedades, componentes vinculados, wrap y tres Slots desde instancias, incluyendo inserción, retiro, reordenamiento y ancho 640. Comprobar web con encabezado, controles accesibles y configuración estrecha. Registrar el contraste heredado de la fecha. En Figma, alternar el logo en una instancia y verificar que reemplaza el título, la dependencia local y la cadena de tokens de los controles.
