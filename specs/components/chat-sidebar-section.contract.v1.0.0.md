---
contract_schema: sdd-project/0.2
contract_id: CHAT-SIDEBAR-SECTION-001
name: Chat Sidebar Section
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Chat Sidebar Section
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "257:603"
target_node_ids: ["257:587"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/tokens/chat-sidebar.v1.0.0.json
source_data_digest_sha256: b28c5fcdb307ce1feb81401ccdb7397fe30b1598820d4b7fbe566864f9b77d80
data_refs: [specs/tokens/chat-sidebar.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, ICON-BUTTON-001]
---

# Chat Sidebar Section · CHAT-SIDEBAR-SECTION-001

## Propósito y anatomía

Sección con título editable y cuerpo de filas. Title es editable, Show action controla el Icon Button opcional y Items es un Slot nativo de contenido vertical. El consumidor puede añadir, quitar y cambiar el orden de filas. El encabezado de muestra Carpetas aporta el control Plus cuando corresponde.

## Variantes, propiedades y estados

Componente único con texto editable y visibilidad opcional de la acción.

## Tokens y composición

El [mapa delegado](../tokens/chat-sidebar.v1.0.0.json) da a cada maestro sus roles y aliases para los cuatro temas. Los controles oficiales conservan sus variables. El panel y sus átomos usan Fill en las regiones variables. Se conservan los glyphs Phosphor y el arte de marca verificado.

## Guía semántica normativa

Usa encabezados como Fijados, Carpetas y Recientes para agrupar elementos. Usa la acción solo cuando la sección necesita una acción propia.

## Description exacta

Chat Sidebar Section · CHAT-SIDEBAR-SECTION-001. Usa encabezados como Fijados, Carpetas y Recientes para agrupar elementos. Usa la acción solo cuando la sección necesita una acción propia.

## Aceptación

Verifica bindings y dependencias, variantes, edición de Slots donde aplican, ancho Fill en las regiones del panel, y uso por teclado en web. Comprueba que los átomos se consuman mediante instancias o imports de los exports declarados.

## Procedencia

[Playground](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=203-93) · [Lectura estructurada](../../sources/figma-snapshots/chat-sidebar-2026-11-13/selection.json).
