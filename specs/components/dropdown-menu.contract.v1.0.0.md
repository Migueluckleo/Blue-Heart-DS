---
contract_schema: sdd-project/0.2
contract_id: DROPDOWN-MENU-001
name: Dropdown menu
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Dropdown
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/dropdown-menu.v1.0.0.json
source_data_digest_sha256: e2a20a99097c07168aeab4801b312087a90c26dc2e1e7189cd03fd57fe1713ad
data_refs: [specs/data/dropdown-menu.v1.0.0.json, specs/data/dropdown-scrollbar.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, DROPDOWN-ITEM-001, INPUT-001]
---

# Dropdown menu · DROPDOWN-MENU-001

La [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/dropdown-menu.1.0.0.md.txt), el [JSON del menú](../data/dropdown-menu.v1.0.0.json) y el [JSON del auxiliar](../data/dropdown-scrollbar.v1.0.0.json) gobiernan un principal de 320 × 210 y un scrollbar privado. El auxiliar mantiene track de 12, thumb de 4 y proporción inicial de un cuarto del alto interior. Su digest SHA-256 es `a9765cd5ab2817be33449ace9b63cc61097a39056d2b5efd6cf1e191710278d4`.

P-SLOTS REQUIRED. Options es un Slot vertical de mínimo uno, sin máximo declarado, con preferencia exclusiva por Dropdown item y ajuste de ancho al insertar. Cinco opciones medium son contenido inicial. El borde temático, la elevación vinculada, el máximo de 320 y el overflow vertical de Options se conservan. El anfitrión ajusta el viewport al contenido y activa Show scrollbar al desbordar. El auxiliar nativo representa el thumb inicial. El navegador gobierna el desplazamiento web.

El disparador usa la superficie de Input fuera del menú, con gap de 4 y ancho compartido. El anfitrión define los datos y una selección. Web ofrece un combobox de solo selección, con listbox y foco activo por teclado. El ejemplo actualiza el valor y cierra el menú. El principal Figma conserva la anatomía de la raíz vigente.

## Guía semántica normativa

Usa Dropdown menu para elegir un valor de una lista definida por el anfitrión. W3C WAI relaciona combobox y listbox mediante controles y opción activa. Carbon mantiene la etiqueta del campo y distingue elección simple de multiselección. [W3C WAI Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) · [Carbon Dropdown](https://www.carbondesignsystem.com/building-blocks/core/components/dropdown/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Elegir moneda u otra opción | Mantén el nombre del campo y actualiza su valor al confirmar. | Presentar acciones de navegación como opciones del campo. |
| Lista extensa | Ajusta el viewport y permite desplazamiento cuando sobrepase el espacio. | Fijar cinco como máximo o simular seguimiento nativo del thumb privado. |
| Cerrar sin elegir | Conserva el valor anterior y devuelve foco al disparador según la acción. | Cambiar el valor al mover la opción activa. |

## Description exacta

| Dropdown menu | DROPDOWN-MENU-001 · Usa Dropdown menu para elegir un valor del campo. Coloca Dropdown item en Options y conserva una selección. Ajusta el viewport y habilita scroll cuando el contenido lo requiera. Ficha local Dropdown menu / DROPDOWN-MENU-001. |
| __Dropdown/Scrollbar small vertical | DROPDOWN-MENU-001 · Auxiliar privado para indicar desbordamiento en Dropdown. Conserva cuatro regiones flexibles y un thumb inicial de un cuarto del alto interior. Úsalo dentro de Dropdown menu. Ficha local Dropdown menu / DROPDOWN-MENU-001. |

## Aceptación

Verificar los tres maestros de la página, vínculos, sombra y límites de Options. Probar 1, 5 y 10 opciones, rechazo de contenido no preferido, orden, visibilidad, viewport y proporción del thumb. En Chrome probar apertura, teclado, elección, cierre, foco y scroll.
