---
contract_schema: sdd-project/0.2
contract_id: CHAT-PLAN-USAGE-001
name: Chat Plan Usage
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Chat Plan Usage
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "257:624"
target_node_ids: ["257:621"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/tokens/chat-sidebar.v1.0.0.json
source_data_digest_sha256: b28c5fcdb307ce1feb81401ccdb7397fe30b1598820d4b7fbe566864f9b77d80
data_refs: [specs/tokens/chat-sidebar.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Chat Plan Usage · CHAT-PLAN-USAGE-001

## Propósito y anatomía

Indicador de uso del plan con dos presentaciones. Expanded muestra nombre, etiqueta, cantidad, barra y porcentaje. Compact muestra un anillo e icono MagicWand. Las geometrías de referencia del indicador Figma se conservan. En web el anfitrión aporta el uso y el límite y la proporción se adapta a ambos valores. El contenido fijo se cubre con texto editable. La visualización numérica del anillo conserva el porcentaje como descripción accesible.

## Variantes, propiedades y estados

Mode = Expanded o Compact. La muestra indica Pro Plan y 42 de 150, con el texto 28% utilizado. El arco compacto original muestra un arco de aproximadamente 75%. Se conserva este dato visual en el espécimen Figma; la versión web usa la proporción del producto.

## Tokens y composición

El [mapa delegado](../tokens/chat-sidebar.v1.0.0.json) da a cada maestro sus roles y aliases para los cuatro temas. Los controles oficiales conservan sus variables. El panel y sus átomos usan Fill en las regiones variables. Se conservan los glyphs Phosphor y el arte de marca verificado.

## Guía semántica normativa

Usa el indicador para explicar uso de un plan. Mantén visibles o accesibles uso y límite. Deja los límites y acciones de cuenta al anfitrión.

## Description exacta

Chat Plan Usage · CHAT-PLAN-USAGE-001. Usa el indicador para explicar uso de un plan. Mantén visibles o accesibles uso y límite. Deja los límites y acciones de cuenta al anfitrión.

## Aceptación

Verifica bindings y dependencias, variantes, edición de Slots donde aplican, ancho Fill en las regiones del panel, y uso por teclado en web. Comprueba que los átomos se consuman mediante instancias o imports de los exports declarados.

## Procedencia

[Playground](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=203-93) · [Lectura estructurada](../../sources/figma-snapshots/chat-sidebar-2026-11-13/selection.json).
