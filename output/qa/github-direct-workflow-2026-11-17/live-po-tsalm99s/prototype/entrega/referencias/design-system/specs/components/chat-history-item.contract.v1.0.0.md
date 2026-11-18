---
contract_schema: sdd-project/0.2
contract_id: CHAT-HISTORY-ITEM-001
name: Chat History Item
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Chat History Item
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "257:586"
target_node_ids: ["257:498"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/tokens/chat-sidebar.v1.0.0.json
source_data_digest_sha256: b28c5fcdb307ce1feb81401ccdb7397fe30b1598820d4b7fbe566864f9b77d80
data_refs: [specs/tokens/chat-sidebar.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, ICON-BUTTON-001]
---

# Chat History Item · CHAT-HISTORY-ITEM-001

## Propósito y anatomía

Fila de historial con título truncable, fecha relativa y Slot Actions. Title es un Slot nativo. Edita el texto de muestra directamente dentro del Slot. El maestro deja visible Updated en Default y acciones en Hover. Web también muestra acciones al enfocar la fila. PushPin y DotsThree se homologan a Icon Button ghost small. Los controles de 24 px de la propuesta pasan a 32 px para usar el maestro oficial.

## Variantes, propiedades y estados

Selected = false o true. State = Default o Hover. Se conservan las cuatro combinaciones.

## Tokens y composición

El [mapa delegado](../tokens/chat-sidebar.v1.0.0.json) da a cada maestro sus roles y aliases para los cuatro temas. Los controles oficiales conservan sus variables. El panel y sus átomos usan Fill en las regiones variables. Se conservan los glyphs Phosphor y el arte de marca verificado.

## Guía semántica normativa

Usa esta fila para identificar un elemento de historial. Mantén accesible el título completo y deja la selección, fijado y menú al anfitrión.

## Description exacta

Chat History Item · CHAT-HISTORY-ITEM-001. Usa esta fila para identificar un elemento de historial. Mantén accesible el título completo y deja la selección, fijado y menú al anfitrión.

## Aceptación

Verifica bindings y dependencias, variantes, edición de Slots donde aplican, ancho Fill en las regiones del panel, y uso por teclado en web. Comprueba que los átomos se consuman mediante instancias o imports de los exports declarados.

## Procedencia

[Playground](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=203-93) · [Lectura estructurada](../../sources/figma-snapshots/chat-sidebar-2026-11-13/selection.json).
