---
contract_schema: sdd-project/0.2
contract_id: TOP-BAR-001
name: Top bar
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Sidebar
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/top-bar.v1.0.0.json
source_data_digest_sha256: a5354cb90f80ef0b6d803ef760e2c89e68a97aa62017b1487e58b691b1fa9f44
data_refs: [specs/data/top-bar.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, MENU-ITEM-001]
---

# Top bar · TOP-BAR-001

El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/top-bar.1.0.0.md.txt) y el [JSON delegado](../data/top-bar.v1.0.0.json) gobiernan el maestro horizontal. P-SLOTS REQUIRED. Menu items es un Slot nativo que admite insertar, quitar y ordenar Menu item. Los cuatro hijos iniciales son muestra. El Slot conserva gap y tamaño de cada item al redimensionar el host. El popup de muestra permanece fuera del maestro.

## Guía semántica normativa

Agrupa destinos del mismo nivel en una barra horizontal. El anfitrión aporta el orden, la ruta activa y el comportamiento cuando falta espacio. Mantén nombres que identifiquen cada destino y usa una región de navegación con nombre.

| Situación | Haz | Evita |
|---|---|---|
| Navegación de sección | Agrupa destinos relacionados en Menu items. | Mezclar acciones ajenas al recorrido. |
| Ancho limitado | Decide overflow o patrón alternativo desde el anfitrión. | Suponer que la barra se adapta a un modo móvil automáticamente. |
| Destino activo | Conserva un estado visual y aria-current cuando corresponda. | Hacer depender la ubicación solo del color. |

Carbon distingue navegación de primer nivel y navegación lateral en el shell. [Carbon UI shell](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-left-panel/guidelines)

## Description exacta

TOP-BAR-001 · Usa Top bar para destinos del mismo nivel. Ordena Menu items y conserva la ubicación actual. El anfitrión decide cómo resolver el espacio disponible. Evita convertir cuatro ítems de muestra en un límite. Ejemplo: Inicio, Ventas y Reportes. Ficha local: Top bar / TOP-BAR-001.

## Aceptación

Verificar maestro único, Slot nativo y clave preferida del Menu item, opciones editables, bindings, comportamiento con 0..n hijos y conservación de vínculos. Probar semántica de navegación y ancho limitado en web.
