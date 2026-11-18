---
contract_schema: sdd-project/0.2
contract_id: BREADCRUMB-001
name: Breadcrumb
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Breadcrumbs
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/breadcrumb.v1.0.0.json
source_data_digest_sha256: e585e2fe985afcdfe5e490f64a6182ac1d22786a2decdf9ff4f297010c002daf
data_refs: [specs/data/breadcrumb.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, BREADCRUMB-ITEM-001]
---

# Breadcrumb · BREADCRUMB-001

El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/breadcrumb.1.0.0.md.txt) y el [JSON delegado](../data/breadcrumb.v1.0.0.json) gobiernan levels 2, 3, 4, 5 y collapsed. Back reutiliza ArrowLeft oficial. Cada eslabón reutiliza [Breadcrumb item](breadcrumb-item.contract.v1.0.0.md) con instancias expuestas. P-SLOTS NOT_APPLICABLE. El contrato nativo fija la cantidad por variante y expone las instancias para edición; la ruta real y sus ancestros pertenecen al anfitrión.

## Guía semántica normativa

Muestra la ubicación actual en una jerarquía y ofrece acceso a ancestros. Back apunta al nivel inmediatamente superior. Para rutas largas, conserva el primer nivel, los dos últimos elementos visibles y un control para revelar los ancestros omitidos. El anfitrión aporta los destinos y controla el espacio disponible. En una presentación de retorno compacta, muestra el ancestro anterior y conserva su condición de enlace.

| Situación | Haz | Evita |
|---|---|---|
| Ruta corta | Ordena los ancestros y conserva el actual al final. | Tratar el actual como enlace o omitir su indicación. |
| Ruta larga | Expón los niveles omitidos mediante un control con nombre. | Inferir rutas comparando muestras de Figma. |
| Retorno | Enlaza Back al padre jerárquico. | Usar historial del navegador como equivalente. |

Usa una región de navegación con nombre y aria-current en la página actual. [Atlassian Breadcrumbs](https://atlassian.design/components/breadcrumbs/) · [W3C Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

## Description exacta

BREADCRUMB-001 · Usa Breadcrumb para ubicar una página en su jerarquía. Conserva el actual al final y usa Back para el padre inmediato. Revela los ancestros omitidos en rutas largas. Evita deducir destinos desde las muestras. Ejemplo: Contabilidad › Pólizas › Póliza P-0458. Ficha local: Breadcrumb / BREADCRUMB-001.

## Aceptación

Verificar cinco variantes, propiedades, exposición de instancias, vínculo a Breadcrumb item, orden, Back visible/oculto y único actual final. En web comprobar enlace al padre, ancestros ocultos, cierre del overflow y presentación compacta. La raíz representa rutas de muestra sin navegación nativa.
