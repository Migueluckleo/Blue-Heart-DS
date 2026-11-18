---
contract_schema: sdd-project/0.2
contract_id: CHIP-001
name: Chip
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Chips
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/chip.v1.0.0.json
source_data_digest_sha256: b1f96ccc268c66ca5a4e6c841ef0821b417789bd1f6e8fdee7ffdb0a227926d3
data_refs: [specs/data/chip.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Chip · CHIP-001

La [norma fuente](../../sources/figma-snapshots/root-families-2026-11-11/chip.1.0.0.md.txt) y el [JSON delegado](../data/chip.v1.0.0.json) rigen cuatro sets de diez variantes. Cada set fija size y conserva selected false/true y default, hover, pressed, focus, disabled. La captura actual registra 16 enlaces nativos reversibles de hover, cuatro por tamaño. Foco y presión conservan sus definiciones visuales. La captura contiene 40 variables y seis estilos de texto. Selected usa roles neutros inversos, invariantes por tema. Disabled conserva el valor de selección.

Anatomía fija en horizontal con Left icon, Label, Counter, Right icon y Remove. Los textos y cuatro booleanos permiten editar contenido y visibilidad. Ambos swaps apuntan a PlusCircle Outline Light y Remove consume X Outline Light de [Phosphor oficial](../../sources/figma-snapshots/root-families-2026-11-11/phosphor-chip.json). P-SLOTS NOT_APPLICABLE. Texto, visibilidad y sustitución de un glyph cubren la variación observada.

Alturas 48, 40, 32 y 24. El ancho crece con Label y Counter. El borde de los estados activos no seleccionados se incluye en el layout. El anillo se extiende 4 px alrededor del contorno con stroke interno de 2 px. El anfitrión organiza el ancho disponible, wrap y desplazamiento. Los tamaños menores a 44 px requieren una superficie táctil ampliada desde el contexto de consumo. Counter conserva el valor cero visible.

## Guía semántica normativa

Usa Chip para filtros, selección o filtros aplicados. En selección única el anfitrión mantiene una opción activa y usa radios agrupados. En selección múltiple, cada botón conserva su nombre y anuncia aria-pressed. En un filtro aplicado, X se nombra «Quitar filtro» seguido de Label. El anfitrión decide el destino de foco al quitar y comunica el motivo de deshabilitar una opción cuando corresponda. [W3C WAI Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) · [W3C WAI Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

| Situación | Haz | Evita |
|---|---|---|
| Una moneda por vista | Agrupa MXN y USD con un nombre común y conserva una elección activa. | Presentar el grupo como botones independientes. |
| Varios estados de un comprobante | Usa toggles independientes y explica el universo filtrado desde el anfitrión. | Cambiar el nombre del control según su selección. |
| Filtro aplicado removible | Da nombre a X y mueve el foco al siguiente filtro o al control de agregar. | Mezclar selección y eliminación en la misma agrupación. |

## Description exacta

| Set | Description |
|---|---|
| Chip/large | CHIP-001 · Large. Usa Chip para filtros y selección. Expón el nombre y estado, conserva Counter opcional y nombra Quitar filtro. Evita mezclar modos en el mismo grupo. Ficha local Chip / CHIP-001. |
| Chip/medium | CHIP-001 · Medium. Usa Chip para filtros y selección. Expón el nombre y estado, conserva Counter opcional y nombra Quitar filtro. Evita mezclar modos en el mismo grupo. Ficha local Chip / CHIP-001. |
| Chip/small | CHIP-001 · Small. Usa Chip para filtros y selección. Expón el nombre y estado, conserva Counter opcional y nombra Quitar filtro. Evita mezclar modos en el mismo grupo. Ficha local Chip / CHIP-001. |
| Chip/extra-small | CHIP-001 · Extra-small. Usa Chip para filtros y selección. Expón el nombre y estado, conserva Counter opcional y nombra Quitar filtro. Evita mezclar modos en el mismo grupo. Ficha local Chip / CHIP-001. |

## Aceptación

Cotejar las 40 variantes, cuatro temas, seis estilos, 16 enlaces, swaps y bindings. Probar opcionales y crecimiento desde instancias, foco y edición de Label y Counter. En Chrome comprobar radios, selección múltiple, remoción, Disabled, cero visible y contraste de las partes activas.
