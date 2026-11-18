---
contract_schema: sdd-project/0.2
contract_id: INPUT-001
name: Input
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Input
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/input.v1.0.0.json
source_data_digest_sha256: 278e03f496399925f22ceb36cd061e5bf381a11ee83f39609c3f958f6f2bc87a
data_refs: [specs/data/input.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, BADGE-001]
---

# Input · INPUT-001

La [norma raíz 2.0.1](../../sources/figma-snapshots/root-families-2026-11-11/input.2.0.1.md.txt) y el [JSON delegado](../data/input.v1.0.0.json) gobiernan 42 variantes en Input/empty `282:26` e Input/filled `282:139`, 21 por set. Tres tamaños (48/40/32 px de campo), siete estados y 11 propiedades de contenido o visibilidad por set. El ancho fuente de 464 px es un ejemplo adaptable. Se conservan tres estilos de texto Manrope, dos estilos de efecto con aliases y geometría específica de foco. P-SLOTS NOT_APPLICABLE. Etiqueta, campo, ayuda y accesorios son posiciones fijas y el Badge expuesto es una composición vinculada.

Question y CaretDown son Phosphor Outline Light. Question sigue Label y CaretDown sigue contenido, con la excepción cromática documentada en filled/disabled. Badge subtle/small expuesto y oculto por defecto conserva Label MXN editable. Figma conserva estados por variante y ninguna reacción. La implementación web incorpora edición real de una línea, estados controlados por el anfitrión y semántica HTML. El host proporciona validación, ayudas interactivas y cualquier disparador para un selector.

## Guía semántica normativa

Usa Input para capturar un dato breve de una sola línea. Mantén una etiqueta corta y usa la ayuda persistente para el formato. GOV.UK enfatiza etiquetas visibles y mensajes con una corrección concreta. Carbon distingue el estado de solo lectura del deshabilitado y mantiene la ayuda bajo el campo. BlueHeart admite un ejemplo de formato como placeholder cuando la etiqueta y la ayuda ya explican el dato. [GOV.UK Text input](https://design-system.service.gov.uk/components/text-input/) · [Carbon Text input](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Capturar un importe | Usa una etiqueta como «Importe», ayuda de formato y Badge subtle para la unidad MXN. | Guardar el valor dentro del Badge o explicar el formato solo con placeholder. |
| Validación de un campo | Muestra el mensaje junto al campo y vincúlalo con aria-describedby al reportar error. Reserva Success para validación concluida. | Cambiar a error mientras se escribe cada carácter o depender solo del color. |
| Dato visible para consulta | Usa read-only cuando el dato deba poder leerse o copiarse. Para disabled, explica cerca por qué no está disponible. | Deshabilitar un valor que el usuario necesita copiar. |

## Description exacta

| Input/empty | INPUT-001 · Usa Input para capturar un dato de una línea. Mantén etiqueta y ayuda accesibles. Elige empty para la apariencia sin valor. Ejemplo: Importe con ayuda de formato y Badge MXN. Ficha local: Input / INPUT-001. |
| Input/filled | INPUT-001 · Usa Input para capturar un dato de una línea. Elige filled para representar contenido. Asocia un mensaje cuando reportes error y usa read-only si el usuario puede copiar. Ficha local: Input / INPUT-001. |

## Aceptación

Comprobar 42 variantes, 11 propiedades, los dos estilos de foco, vinculación Badge/Phosphor y edición nativa. Probar Figma con ancho 280, textos largos, ayuda multilínea y Badge editable. Probar web con teclado, valor vacío/lleno, asociación de etiqueta y ayuda, error, solo lectura y deshabilitado. Medir contraste del borde vacío y conservar el resultado.
