---
contract_schema: sdd-project/0.2
contract_id: COMPANY-SELECTOR-001
name: Company selector
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Header
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/company-selector.v1.0.0.json
source_data_digest_sha256: b4204d2fc109df390c288e7617c28b85038a543f5ceb8f61d5a2e0357f2d1f51
data_refs: [specs/data/company-selector.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Company selector · COMPANY-SELECTOR-001

El [contrato fuente v1.0.0](../../sources/figma-snapshots/root-families-2026-11-11/company-selector.1.0.0.md.txt) y el [JSON delegado](../data/company-selector.v1.0.0.json) gobiernan su composición. Conserva cuatro variantes default, hover, focus y open, Company name, RFC y Buildings/CaretDown oficiales. La razón social puede truncarse visualmente a una línea; el dato y el nombre accesible se conservan. RFC permanece visible y sin elipsis. El anfitrión aporta la lista de empresas. P-SLOTS NOT_APPLICABLE por composición fija según la variante y controles acotados.

## Guía semántica normativa

Muestra la empresa activa y su RFC. El control solicita abrir la lista del anfitrión, con foco y estado expandido. Conserva la identidad completa y confirma un cambio cuando el producto lo requiera.

| Situación | Haz | Evita |
|---|---|---|
| Razón social larga | Conserva el nombre accesible completo y el RFC visible. | Cortar el dato fuente o inferir la empresa. |
| Selección de empresa | Abre una lista de empresas disponibles. | Usar el estado open como confirmación de cambio. |
| Cambios sin guardar | Deja la confirmación al flujo anfitrión. | Cambiar el contexto sin la regla del producto. |

[Carbon UI shell header](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-header/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Description exacta

COMPANY-SELECTOR-001 · Usa Company selector para identificar la empresa activa y abrir su lista. Conserva nombre y RFC, y comunica la apertura con el caret. Evita inferir permisos o confirmar un cambio desde open. Ejemplo: Empresa de muestra. Ficha local: Company selector / COMPANY-SELECTOR-001.

## Aceptación

Verificar cuatro variantes, estilos, edición, iconos y rotación en open. Probar ancho y foco.
