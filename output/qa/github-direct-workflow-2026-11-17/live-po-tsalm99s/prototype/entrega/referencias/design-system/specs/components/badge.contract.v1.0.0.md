---
contract_schema: sdd-project/0.2
contract_id: BADGE-001
name: Badge
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Badge
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/badge.v1.0.0.json
source_data_digest_sha256: e75335e5221e58c0807f4271ce0665b25ebcd6760cc36a157c6171daea7df781
data_refs: [specs/data/badge.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Badge · BADGE-001

El [contrato fuente v1.1.0](../../sources/figma-snapshots/root-families-2026-11-11/badge.1.1.0.md.txt) y el [JSON delegado](../data/badge.v1.0.0.json) fijan 18 variantes, seis tipos, tres tamaños y default subtle/small. Label es editable y los lados Phosphor se controlan de forma independiente. El default de cada swap es Presentation Outline/Fill. P-SLOTS NOT_APPLICABLE por anatomía fija con texto y swaps acotados. Los colores permanecen invariantes en los cuatro temas.

## Guía semántica normativa

Usa Badge como etiqueta de estado o atributo. Mantén una palabra o frase que comunique el significado sin depender del color. Usa success para un resultado confirmado, warning para atención, error para fallo, info para contexto o avance, y subtle o neutral para metadatos. Conserva el mismo tamaño en una lista o tabla.

| Situación | Haz | Evita |
|---|---|---|
| Moneda de un importe | Usa subtle/small con «MXN» o «USD» según el anfitrión. | Usar Badge como control para cambiar moneda. |
| Resultado | Muestra «Conciliado» o «Requiere revisión» y usa un icono decorativo si ayuda. | Apilar estados o comunicar el resultado solo por color. |
| Espacio insuficiente | Usa una etiqueta breve o un patrón que admita explicación. | Truncar Badge o convertir el icono derecho en un cierre. |

El anfitrión aporta contexto y anuncios al cambiar un estado. Warning conserva la excepción de contraste del contrato fuente. [Carbon Read-only tag](https://www.carbondesignsystem.com/building-blocks/core/components/tag/guidelines) · [Atlassian Lozenge](https://atlassian.design/components/lozenge/usage)

## Description exacta

BADGE-001 · Usa Badge para un estado o atributo sin interacción. Elige un texto breve que comunique significado y conserva el tamaño en listas. Los iconos son decorativos. Evita usar Badge como botón o cierre. Ejemplo: Conciliado o MXN. Ficha local: Badge / BADGE-001.

## Aceptación

Verificar 18 variantes, tres estilos, roles invariantes, geometría HUG, borde subtle y dos swaps Phosphor. Comprobar visibilidad independiente, contenido largo y contraste observado. En web verificar que la etiqueta permanece legible, con iconos decorativos y sin foco propio.
