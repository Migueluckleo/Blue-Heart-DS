---
contract_schema: sdd-project/0.2
contract_id: SIDEBAR-001
amendment_id: SIDEBAR-SECONDARY-CONTROL-001
type: component-amendment
version: 1.0.1
status: DELEGATED_FOR_BUILD
base_contract: specs/components/sidebar.contract.v1.0.0.md
applies_to: [SIDEBAR-001]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Sidebar · Control Secondary en Figma y web

Decisión explícita del usuario, registrada el 2026-11-11. Esta enmienda sustituye únicamente el tipo del Icon Button de expansión y contracción en el maestro AI Blueheart DS y en su implementación web. La [raíz de origen](../../implementations/figma/root-families-2026-11-11/sidebar-secondary-user-override.source.json) conserva Ghost. La [lectura del maestro](../../implementations/figma/root-families-2026-11-11/sidebar-secondary-user-override.readback.json) observa Secondary en ambas variantes.

| Variante de destino | Control | Vínculo | Glyph |
|---|---|---|---|
| collapsed `61:219` | Expand Icon Button `61:221` | Icon Button/secondary `61:477`, variante `61:455` | CaretRight Light |
| expanded `61:309` | Collapse Icon Button `61:311` | Icon Button/secondary `61:477`, variante `61:455` | CaretLeft Light |

Ambos controles usan small, selected=false, state=default y Show badge=false. El maestro Sidebar es `61:426`, página `54:2`. El [Sidebar web](../../implementations/web/src/components/sidebar.tsx) consume el mismo Icon Button Secondary small en ambos estados. El cambio preserva la alternancia de Sidebar, sus cuatro áreas de contenido y el control enfocado. El ejemplo Next usa el componente directamente.

## Guía semántica normativa

Usa Sidebar para navegación lateral persistente. En Figma y web, usa Secondary small para que el control de expansión y contracción tenga una superficie definida. Conserva «Expandir navegación» y «Contraer navegación» como nombres accesibles en consumo web. El anfitrión define el contenido principal y las opciones inferiores de cada presentación, la altura disponible y la ruta actual.

| Situación | Haz | Evita |
|---|---|---|
| Navegación contraída | Usa CaretRight Light para expandir y da un nombre a cada destino. | Depender solo del icono. |
| Menú expandido | Usa CaretLeft Light para contraer y organiza los destinos en sus Slots. | Convertir la cantidad de la muestra en un límite. |
| Cambio de presentación | Mantén explícitas las listas de cada presentación y el foco del control. | Prometer sincronización automática de contenido personalizado. |

El anfitrión resuelve rutas, permisos, scroll y adaptación móvil. [Carbon UI shell](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-left-panel/guidelines) · [W3C Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

## Description del maestro

La Description existente nombra el control de expansión de forma genérica y sigue vigente. El enlace de guía conserva la referencia histórica a la raíz. La enmienda y la ficha de consumo documentan Secondary para el maestro de destino y el componente web.
