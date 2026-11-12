---
contract_schema: sdd-project/0.2
contract_id: ICON-BUTTON-001
name: Icon Button
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Icon Buttons
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/icon-button.v1.0.0.json
source_data_digest_sha256: b461fe53d5caf47f44698b8bfcfc8f71ba82901da94985bd60f510d2324a3731
data_refs: [specs/data/icon-button.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, DOT-001]
---

# Icon Button · ICON-BUTTON-001

El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/icon-button.1.0.0.md.txt) y el [JSON delegado](../data/icon-button.v1.0.0.json) fijan 90 variantes. Primary y danger no exponen selected. Secondary y ghost exponen selected. Los cuatro sets reutilizan Bell Outline/Light por defecto, el swap oficial y Dot anidado por tamaño. P-SLOTS NOT_APPLICABLE por composición fija y un swap.

## Guía semántica normativa

Usa Icon Button para una acción reconocible en poco espacio. Da al botón un nombre accesible con verbo y objeto. Usa Dot como señal decorativa y comunica cualquier conteo importante desde el anfitrión. Secondary y ghost pueden comunicar alternancia. Las acciones destructivas necesitan identificar el objeto y confirmación según el flujo.

| Situación | Haz | Evita |
|---|---|---|
| Alternancia en una barra | Usa secondary o ghost y expón aria-pressed. | Comunicar la selección solo con color. |
| Notificaciones | Nombra la acción y comunica el conteo si es relevante. | Hacer de Dot un control propio o mostrar números en small. |
| Acción destructiva | Nombra el objeto y ofrece confirmación en el anfitrión. | Colocar indicador en danger o usar un icono ambiguo para una operación crítica. |

Tooltip y el tamaño táctil se resuelven en el anfitrión. [Material UI Icon Button](https://mui.com/material-ui/react-button/) · [W3C Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Description exacta

| Set | Description |
|---|---|
| Icon Button/primary | ICON-BUTTON-001 · Usa primary para una acción iconográfica principal. Conserva un nombre accesible y comunica conteos desde el anfitrión. Evita usar un icono ambiguo. Ejemplo: Abrir notificaciones. Ficha local: Icon Button / ICON-BUTTON-001. |
| Icon Button/secondary | ICON-BUTTON-001 · Usa secondary para una acción complementaria o alternancia. Comunica selected con aria-pressed cuando corresponda. Evita depender solo del color. Ejemplo: Fijar vista. Ficha local: Icon Button / ICON-BUTTON-001. |
| Icon Button/ghost | ICON-BUTTON-001 · Usa ghost para controles iconográficos discretos y alternancias. Conserva foco visible y nombre accesible. Evita deducir la acción de un caret sin contexto. Ejemplo: Expandir navegación. Ficha local: Icon Button / ICON-BUTTON-001. |
| Icon Button/danger | ICON-BUTTON-001 · Reserva danger para acciones destructivas. Identifica el objeto y aplica la confirmación del flujo. Evita añadir un indicador Dot a danger. Ejemplo: Eliminar borrador. Ficha local: Icon Button / ICON-BUTTON-001. |

## Aceptación

Verificar 90 variantes, swap oficial, vínculos Dot, anclaje, foco, 30 variables propias y reacciones almacenadas. En web comprobar nombre, estado selected, teclado, deshabilitado y restricciones de Dot.
