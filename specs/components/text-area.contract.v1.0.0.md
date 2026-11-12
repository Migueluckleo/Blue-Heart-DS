---
contract_schema: sdd-project/0.2
contract_id: TEXT-AREA-001
name: Text Area
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Text Area
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/text-area.v1.0.0.json
source_data_digest_sha256: e75ce8b160269a20e8a855350e54151d09092ceb20740a6ba548ce144c7967b4
data_refs: [specs/data/text-area.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Text Area · TEXT-AREA-001

La [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/text-area.1.0.0.md.txt) y el [JSON delegado](../data/text-area.v1.0.0.json) gobiernan ocho variantes state × value. Label es obligatorio. Placeholder y Value son independientes. Helper y Counter tienen texto y visibilidad propios. Field inicia a 104 px, la muestra mide 305 px de ancho y el anfitrión define ancho y altura. Los estados conservan cuatro estilos Manrope, colores invariantes y Notches Phosphor Outline Light. P-SLOTS NOT_APPLICABLE por anatomía fija.

El consumidor web usa textarea, conserva el valor al cambiar altura y asocia ayuda y contador. El anfitrión decide el límite, el tratamiento del contenido extenso y la opción de redimensionar. El valor 300 pertenece al ejemplo fuente. Figma mantiene estados por variante y ningún gesto de entrada o resize.

## Guía semántica normativa

Usa Text Area para respuestas de varias líneas. GOV.UK distingue las respuestas extensas y recomienda ajustar la altura al contenido esperado. Carbon conserva etiqueta y ayuda visibles y permite que el contenido siga siendo alcanzable al desbordar. BlueHeart ofrece contador cuando el anfitrión lo necesita. [GOV.UK Textarea](https://design-system.service.gov.uk/components/textarea/) · [Carbon Text input](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Respuesta extensa | Da una etiqueta visible y permite leer el valor completo mediante scroll o altura suficiente. | Recortar la respuesta o usar Placeholder como etiqueta. |
| Límite de caracteres | Usa el límite del anfitrión y asocia el contador sin anunciar cada pulsación. | Adoptar 300 como regla de todos los productos. |
| Error de captura | Vincula la ayuda de corrección y conserva el valor escrito. | Indicar error solo por color o borrar el contenido. |

## Description exacta

TEXT-AREA-001 · Usa Text Area para una respuesta de varias líneas. Mantén Label visible, asocia la ayuda y muestra Counter cuando aporte contexto. Define altura y límite en el anfitrión. Evita tratar 300 como límite general. Ficha local Text Area / TEXT-AREA-001.

## Aceptación

Verificar 8 variantes, Value y Placeholder, 4 estilos, Notches, anchos 160/305/640, contador, ayuda y alto editable desde instancias. En Chrome comprobar entrada multilínea, foco, error, límite del anfitrión, disabled y aumento de altura con el valor conservado.
