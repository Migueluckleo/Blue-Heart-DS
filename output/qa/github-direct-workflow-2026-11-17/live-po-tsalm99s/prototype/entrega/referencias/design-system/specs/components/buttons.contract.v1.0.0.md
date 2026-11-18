---
contract_schema: sdd-project/0.2
contract_id: BUTTON-001
name: Buttons
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
last_updated: 2026-11-11
figma_page_name: Buttons
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "22:3"
target_node_ids: ["23:1306", "23:1185", "23:835", "23:952", "23:1070"]
slot_applicability: NOT_APPLICABLE
readiness_by_target: {figma: READY, web: READY}
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
source_data_ref: specs/data/buttons.v1.0.0.json
source_data_digest_sha256: d271e1de91be664fe0c78eef8ea311fdafa52073535f4349a7d78f7611d4c9fa
data_refs:
  - specs/data/buttons.v1.0.0.json
  - sources/figma-snapshots/buttons-loader-2026-11-11/manifest.json
dependencies: ['FOUNDATIONS-BLUEHEART-VARIABLES-001', 'LOADER-001']
---

# Buttons · BUTTON-001

Ingesta del [Figma raíz](../../sources/figma-snapshots/buttons-loader-2026-11-11/manifest.json) y recetario delegado de [bindings, geometría y reacciones](../data/buttons.v1.0.0.json). La implementación usa el mapa verificado de [variables del maestro](../foundations/blueheart-variables.contract.v0.1.2.md). La captura registra versiones de origen y hashes. Construcción en la página Buttons, reservada a los principales y sus variantes. P-SLOTS: `NOT_APPLICABLE` por composición acotada.

## Cobertura y comportamiento

- Cinco sets de 18 variantes, tres tamaños (48, 40, 32 px) y seis estados observados. Conserva HUG horizontal, radio, padding, tipografía, subrayado Link, iconos y foco exterior observados. Conserva las reacciones por ID y tamaño, incluida la transición Secondary focus a hover del mismo tamaño.
- Label editable; dos iconos opcionales independientes apagados por defecto. Usa la instancia remota PlusCircle Outline/Light y mantiene el swap y el color del vector por receta. Phosphor es la fuente autorizada. Loading sustituye iconos por [Loader](loader.contract.v1.0.0.md) con color y tamaño según receta. El set expone propiedades acotadas y no necesita Slot arbitrario.
- Web usa botón nativo para acciones y enlace con href para navegación. La carga bloquea activaciones y anuncia `aria-busy`; la caja reserva el ancho normal durante la operación. Disabled bloquea la acción. El anfitrión explica el motivo, conecta la acción, gestiona confirmaciones y aporta el contexto de error. El ejemplo usa estado local.
- El foco es visible en teclado y se conserva durante la interacción aplicable. Las alturas fuente se conservan. Una pantalla puede necesitar ampliar su área táctil según contexto. La geometría fuente no acredita conformidad WCAG.

## Guía semántica normativa

Usa primary para una única acción principal por vista o diálogo. Secondary acompaña una acción alternativa; text reduce jerarquía para una acción terciaria; link navega; danger reserva acciones destructivas que el anfitrión debe confirmar con objeto y consecuencia. Evita dos acciones primary que compitan. Mantén un tamaño coherente en el grupo.

El contenedor aporta el área de interacción y el foco, Label identifica el resultado, los iconos son opcionales y Loader indica actividad en curso. Usa un verbo en infinitivo y un objeto cuando aclare, con hasta tres palabras según la guía fuente. Para cargar, usa gerundio y elipsis. La posición de las acciones y el área táctil son responsabilidad de la pantalla.

Haz «Guardar cambios» como primary, con una alternativa secondary como «Cancelar». Evita activar dos veces la misma acción mientras aparece «Guardando…». Usa link con una URL cuando el propósito sea navegar. Procedencia: descripción vigente de los cinco sets y reglas REQ-USAGE, REQ-CONTENT, REQ-LOADING y REQ-ACCESSIBILITY de BUTTON-001 v4.0.1 capturado.

## Aceptación

Verificar 90 combinaciones, propiedades, 150 instancias oficiales de icono, 15 composiciones loading, variables remapeadas, foco y reacciones por variante. Probar interacción web de forma independiente.

## Implementación y QA

[Estado e IDs en el maestro](../../implementations/figma/buttons-loader-2026-11-11/buttons.state.json) y [QA de Figma y web](../../qa/implementations/buttons-loader.v1.0.0.review.md). El recetario de consumo conserva los modos y la sintaxis WEB del inventario. Las magnitudes de la geometría y tipografía verificadas se convierten a px en el consumidor CSS. Manrope se entrega con el recurso variable local. El enlace del componente Figma remite a la documentación visible de su fuente. La ficha local queda identificada por contrato y se genera en el catálogo.
