---
contract_schema: sdd-project/0.2
contract_id: PAGINATION-001
name: Pagination
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Pagination
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/pagination.v1.0.0.json
source_data_digest_sha256: 227d84313f8d99bae3d99f92d4e1a8831349bf3533c6e79b891d1d3ce4a49c44
data_refs: [specs/data/pagination.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, PAGINATION-ITEM-001, INPUT-001]
---

# Pagination · PAGINATION-001

La [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/pagination.1.0.0.md.txt) y el [JSON delegado](../data/pagination.v1.0.0.json) gobiernan Default y Compact. Default ofrece rango opcional, navegación y filas por página. Compact conserva un texto de posición y dos flechas. Default consume Input/filled small con ancho 88 y sin label/helper/tooltip/badge visibles. Figma no decide las opciones ni abre un menú desde el principal. El anfitrión web aporta las opciones y eventos mediante un selector HTML con la superficie de Input. La referencia muestra 20, 50 y 100 filas.

P-SLOTS REQUIRED en Default. Pages acepta solo instancias de Pagination item, mínimo 1 y sin máximo declarado. Permite insertar, retirar y reordenar. El anfitrión mantiene la selección única, los extremos y el orden. Las muestras de 552 × 72 y 213 × 72 orientan la geometría sin fijar un ancho del producto.

## Guía semántica normativa

Usa Pagination para un conjunto de resultados que pueda dividirse en páginas. GOV.UK conserva la posición actual y ofrece destinos anterior y siguiente. Carbon añade el tamaño de página cuando ayuda a controlar el volumen visible. En BlueHeart, Default muestra números y Compact concentra el avance en dos flechas y un texto de posición. [GOV.UK Pagination](https://design-system.service.gov.uk/components/pagination/) · [Carbon Pagination](https://www.carbondesignsystem.com/building-blocks/core/components/pagination/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Listado extenso | Conserva extremos, vecinos y elipsis alrededor de la página actual. | Renderizar todos los números si la secuencia ya es extensa. |
| Cambio de filas por página | Actualiza página, rango y datos de forma coherente en el anfitrión. | Presentar un rango viejo con un conjunto de filas nuevo. |
| Interacción táctil | Elige Compact cuando convenga y habilita targets de 44 px desde el anfitrión. | Tratar 32 px visuales como objetivo táctil suficiente. |

## Description exacta

PAGINATION-001 · Usa Default para números, rango y filas por página. Usa Compact para anterior, siguiente y posición. Mantén una página actual y nombres claros en los extremos. Evita convertir la muestra en un límite de Pages. Ficha local Pagination / PAGINATION-001.

## Aceptación

Verificar Default, Compact, Slot Pages, Input y carets vinculados. Probar ancho, visibilidad, textos, extremos y cardinalidad desde instancias. En Chrome comprobar teclado, página actual, elipsis, cambio de filas, foco y área táctil del ejemplo.
