---
contract_schema: sdd-project/0.2
contract_id: TABS-001
name: Tabs
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Tabs
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/tabs.v1.0.0.json
source_data_digest_sha256: f812fc4f752a6c667a1fb435b4eacbffbcf3b0ccd3dc2317757d90ad22eea74c
data_refs: [specs/data/tabs.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, TAB-001]
---

# Tabs · TABS-001

La [norma raíz 3.1.0](../../sources/figma-snapshots/root-families-2026-11-11/tabs.3.1.0.md.txt) y el [JSON delegado](../data/tabs.v1.0.0.json) gobiernan underline, pill y segmented. P-SLOTS REQUIRED. Un Slot compartido Tabs admite mínimo dos, sin máximo declarado, con Tab como preferencia. Cada variante comienza con cuatro instancias del mismo tipo y una seleccionada. El anfitrión mantiene el tipo, orden, panel y selección. La muestra de cuatro no fija la cardinalidad.

Underline usa divisor inferior estirable. Pill separa ítems por 4 px. Segmented conserva fondo, radio y padding de 4 px, con foco fuera del clip. Web usa tablist y tabpanels asociados, flechas horizontales, Home/End y activación manual con Enter o Espacio. El anfitrión controla la selección.

## Guía semántica normativa

Usa Tabs para cambiar de vista dentro del mismo contexto. W3C WAI define la asociación de cada tab con su panel y el recorrido por flechas. Carbon propone títulos breves y un orden lógico. Elige presentación según densidad y revisa el ancho con el contenido real. [W3C WAI Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) · [Carbon Tabs](https://www.carbondesignsystem.com/building-blocks/core/components/tabs/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Vistas de igual nivel | Mantén una selección y vincula cada opción a su panel. | Usar el grupo como una lista de acciones. |
| Cambio de cantidad | Inserta o reordena Tab del mismo tipo en el Slot y conserva las identidades. | Fijar cuatro como límite o inferir otro panel por posición. |
| Recorrido con teclado | Permite recorrer las opciones habilitadas y activar el panel elegido. | Cambiar panel solo al mover foco en activación manual. |

## Description exacta

TABS-001 · Usa Tabs para alternar entre vistas de un mismo contexto. Coloca al menos dos Tab del mismo tipo en el Slot, con una selección y un panel asociado. Evita usarlo como barra de acciones. Ficha local Tabs / TABS-001.

## Aceptación

Verificar tres variantes, Slot compartido, mínimo dos, preferencia Tab, divisor y edición de instancias con dos y seis hijos. En Chrome probar selección, paneles, flechas, Home/End, foco y Disabled.
