---
contract_schema: sdd-project/0.2
contract_id: RADIO-GROUP-001
name: Radio group
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Radio Buttons
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/radio-group.v1.0.0.json
source_data_digest_sha256: ffd4ddf4116e552149cb3c8e4a1aea3670ae24f56482e7284862e3e39e79a52f
data_refs: [specs/data/radio-group.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, RADIO-001]
---

# Radio group · RADIO-GROUP-001

Conservar las cuatro combinaciones direction × state de la [captura delegada](../data/radio-group.v1.0.0.json) y las reglas del [contrato de la raíz](../../sources/figma-snapshots/root-families-2026-11-11/radio-group.1.0.0.md.txt). El set `625:166` contiene Title, Options y Helper text. Las opciones reutilizan el [Radio oficial](radio.contract.v1.0.0.md).

## Guía semántica normativa

Ofrece una sola respuesta entre alternativas breves visibles al mismo tiempo. Usa un título que enuncie la decisión y etiquetas paralelas. El grupo vertical admite de dos a cinco opciones. El horizontal admite hasta tres opciones cortas y requiere ancho suficiente. La selección, la disponibilidad y la validación pertenecen al anfitrión. Selecciona un valor inicial solo cuando el flujo lo justifique.

| Situación | Haz | Evita |
|---|---|---|
| Entrega de un comprobante | Agrupa «Correo electrónico» y «Descarga» bajo un título común. | Presentar las alternativas como acciones independientes. |
| Etiquetas largas | Usa la dirección vertical y deja crecer las etiquetas. | Forzar una sola línea o recortar las diferencias. |
| Validación | Conecta «Select an option» con el grupo. El anfitrión puede aportar contexto adicional. | Cambiar el mensaje fijo mediante Helper text en error. |

En web usa un nombre común, selección exclusiva, flechas nativas y mensajes asociados. Si ocultas el título visual, conserva su nombre accesible. La superficie táctil del anfitrión puede alcanzar 44 px conservando la anatomía interna.

Referentes editoriales sobre selección exclusiva y teclado. [Carbon Radio button](https://www.carbondesignsystem.com/building-blocks/core/components/radio-button/guidelines) · [W3C Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

## Composición y Options

Un Slot nativo `Options`, con propiedad común para las cuatro variantes, permite insertar, quitar, reordenar y sustituir instancias del Radio oficial. Mínimo nativo 2 y máximo nativo 5, con lista preferida restringida. El límite horizontal de 3 lo aplica el consumidor. Cada Radio insertado muestra un Label con texto. Conservar overrides, orden y selección al cambiar dirección o estado. La muestra usa tres opciones y selecciona la primera en default. En error muestra tres opciones deseleccionadas. El comportamiento efectivo de producto depende del anfitrión.

Title y Show title gobiernan el título. Show helper text gobierna la visibilidad en ambos estados. Helper text es editable en default. En error se mantiene literalmente «Select an option». Reutilizar las 12 instancias de muestra con vínculo a Radio. Conservar layout HUG, gap vertical 8 px, opciones horizontales con gap 24 px y los roles de color/estilos del JSON delegado. Las opciones heredan el tema.

## Description exacta

RADIO-GROUP-001 · Elige una alternativa entre opciones visibles. Usa Options con 2–5 Radio oficiales y hasta 3 en horizontal si caben sus etiquetas. Mantén un título accesible y un solo valor seleccionado. Evita recortar etiquetas o depender del color para el error. Ejemplo: Correo electrónico o Descarga. Ficha local: Radio group / RADIO-GROUP-001.

## Aceptación

Comprobar el Slot único y su configuración, las cuatro variantes, las 12 instancias vinculadas, bindings, estilos, contenido y límites. Desde una instancia de prueba comprobar 2/5 vertical, 2/3 horizontal, 0/1/6 y un tipo ajeno, operaciones de edición y preservación de contenido y selección. El consumidor valida 4 horizontal. Verificar texto largo, ancho, mensaje fijo y visibilidad. En web comprobar el estado controlado, selección exclusiva, asociación de mensajes y teclado.
