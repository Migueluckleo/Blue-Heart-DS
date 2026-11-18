---
contract_schema: sdd-project/0.2
contract_id: BREADCRUMB-ITEM-001
name: Breadcrumb item
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Breadcrumbs
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/breadcrumb-item.v1.0.0.json
source_data_digest_sha256: c178d31d39e6b23f4dcfee768e11752e0de7f6754f4cfd41c29ef66f5e77fa51
data_refs: [specs/data/breadcrumb-item.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Breadcrumb item · BREADCRUMB-ITEM-001

El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/breadcrumb-item.1.0.0.md.txt) y el [JSON delegado](../data/breadcrumb-item.v1.0.0.json) fijan 13 combinaciones, Label, tipos text/icon/overflow, estados y composición. House y CaretRight reutilizan Phosphor oficial. El separador es decorativo. P-SLOTS NOT_APPLICABLE para el eslabón individual por su anatomía fija; la cardinalidad se revisa en Breadcrumb.

## Guía semántica normativa

Representa un ancestro navegable o la página actual dentro de una jerarquía. El anfitrión aporta rutas y orden. Usa House para Inicio con nombre accesible. Overflow usa tres puntos y pide mostrar ancestros omitidos. La página actual permanece visible como texto y se identifica con aria-current.

| Situación | Haz | Evita |
|---|---|---|
| Ancestro disponible | Enlaza «Documentos» con su ruta real. | Inferir la URL a partir de la etiqueta. |
| Inicio u overflow | Nombra la acción con «Inicio» o «Mostrar niveles anteriores». | Dejar el icono o los tres puntos como único nombre. |
| Página actual | Muestra «Comprobantes» como texto actual, sin separador. | Darle una acción de navegación. |

Usa un contenedor de navegación con nombre y lista ordenada. El anfitrión decide el comportamiento y contenido de overflow. [Atlassian Breadcrumbs](https://atlassian.design/components/breadcrumbs/) · [W3C Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

## Description exacta

BREADCRUMB-ITEM-001 · Usa este eslabón para un ancestro o la página actual. Nombra Inicio y overflow de forma accesible. Conserva el destino en el anfitrión y muestra la página actual como texto. Evita inferir rutas desde Label. Ejemplo: Documentos › Comprobantes. Ficha local: Breadcrumb item / BREADCRUMB-ITEM-001.

## Aceptación

Comprobar 13 combinaciones, geometría y anillo al editar Label, tres estilos, 20 variables e iconos oficiales. En web probar navegación, activación de overflow y página actual sin enlace.
