---
contract_schema: sdd-project/0.2
contract_id: CHAT-TOOL-ITEM-001
name: Chat Tool Item
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Chat Tool Item
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "257:497"
target_node_ids: ["257:465"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/tokens/chat-sidebar.v1.0.0.json
source_data_digest_sha256: b28c5fcdb307ce1feb81401ccdb7397fe30b1598820d4b7fbe566864f9b77d80
data_refs: [specs/tokens/chat-sidebar.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, ICON-BUTTON-001]
---

# Chat Tool Item · CHAT-TOOL-ITEM-001

## Propósito y anatomía

Fila de herramienta con icono intercambiable, etiqueta editable, caret opcional y Slot Extra actions. La fila hace Fill horizontal en su anfitrión. En web, una acción deshabilitada usa un botón nativo deshabilitado. Las acciones extra se componen fuera del botón principal.

## Variantes, propiedades y estados

State = Default, Hover o Disabled. Hover conserva la reacción del maestro de origen. La visibilidad del caret y del Slot es independiente.

## Tokens y composición

El [mapa delegado](../tokens/chat-sidebar.v1.0.0.json) da a cada maestro sus roles y aliases para los cuatro temas. Los controles oficiales conservan sus variables. El panel y sus átomos usan Fill en las regiones variables. Se conservan los glyphs Phosphor y el arte de marca verificado.

## Guía semántica normativa

Usa la fila para iniciar una acción o expandir una agrupación que el anfitrión controle. Mantén el caret solo si indica una expansión.

## Description exacta

Chat Tool Item · CHAT-TOOL-ITEM-001. Usa la fila para iniciar una acción o expandir una agrupación que el anfitrión controle. Mantén el caret solo si indica una expansión.

## Aceptación

Verifica bindings y dependencias, variantes, edición de Slots donde aplican, ancho Fill en las regiones del panel, y uso por teclado en web. Comprueba que los átomos se consuman mediante instancias o imports de los exports declarados.

## Procedencia

[Playground](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=203-93) · [Lectura estructurada](../../sources/figma-snapshots/chat-sidebar-2026-11-13/selection.json).
