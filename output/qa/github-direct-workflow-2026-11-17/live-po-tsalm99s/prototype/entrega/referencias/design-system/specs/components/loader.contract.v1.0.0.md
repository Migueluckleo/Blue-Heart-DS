---
contract_schema: sdd-project/0.2
contract_id: LOADER-001
name: Loader
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
last_updated: 2026-11-11
figma_page_name: Loader
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "22:2"
target_node_ids: ["23:74", "23:171", "23:268", "23:365", "23:462", "23:559", "23:680"]
slot_applicability: NOT_APPLICABLE
readiness_by_target: {figma: READY, web: READY}
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
source_data_ref: specs/data/loader.v1.0.0.json
source_data_digest_sha256: 09a7070ebb3dd5b583ce613e61a59c3b8321fd75060da671a13a1b429049abfe
data_refs:
  - specs/data/loader.v1.0.0.json
  - sources/figma-snapshots/buttons-loader-2026-11-11/manifest.json
dependencies: ['FOUNDATIONS-BLUEHEART-VARIABLES-001']
---

# Loader · LOADER-001

Ingesta del [Figma raíz](../../sources/figma-snapshots/buttons-loader-2026-11-11/manifest.json) y recetario delegado de [bindings, geometría y reacciones](../data/loader.v1.0.0.json). La implementación usa el mapa verificado de [variables del maestro](../foundations/blueheart-variables.contract.v0.1.2.md). La captura registra versiones de origen y hashes. Construcción en la página Loader, reservada a los principales y sus variantes. P-SLOTS: `NOT_APPLICABLE` por composición acotada.

## Cobertura y comportamiento

- 24 variantes públicas, seis tamaños (16, 20, 24, 40, 64, 88 px) y cuatro roles cromáticos. Seis sets internos de 24 fases, con transición instantánea cada 0,033333335 s y vuelta nominal de 0,8 s. El riel y el arco son elipses nativas; el remate del arco es redondo. El riel on-color conserva opacidad 0,3. Son partes del indicador, no iconos.
- El anfitrión controla cuándo mostrar la espera. La guía fuente recomienda aproximadamente 300 ms y un mensaje de proceso al superar 2 s. Si se conoce el avance en una espera prolongada, usar un indicador determinado.
- Web usa SVG con los mismos roles y 24 pasos, 1,6 s para movimiento reducido. El anfitrión aporta mensaje accesible, con `role=status` y anuncio cortés. Dentro de Button, el indicador es decorativo y Button comunica que está ocupado.
- Se verifican geometría, vínculos, color y topología almacenada. Las reacciones almacenadas no miden fps ni reproducción real.

## Guía semántica normativa

Usa Loader para espera de duración indeterminada. Ajusta el tamaño al contenedor y elige brand para la marca del tema, neutral o strong sobre superficies claras y on-color sobre fondo de color. Mantén el contenido anterior si solo se actualiza una parte. El riel da contexto al arco y el arco indica que la operación continúa. La composición es fija; el texto y su posición pertenecen al anfitrión. No recibe foco ni activa acciones.

Haz que una espera prolongada vaya acompañada de «Cargando archivos…». Evita usar el indicador como único mensaje de error o elegir on-color sobre blanco. Procedencia: documentación del nodo fuente Loader y LOADER-001 v1.0.0 capturado.

## Aceptación

Verificar las 24 combinaciones, los 144 destinos y retornos, las elipses y sus aliases y los 15 vínculos desde Button. Verificar roles accesibles y el control de movimiento de web por separado.

## Implementación y QA

[Estado e IDs en el maestro](../../implementations/figma/buttons-loader-2026-11-11/loader.state.json) y [QA de Figma y web](../../qa/implementations/buttons-loader.v1.0.0.review.md). El recetario de consumo conserva los modos y la sintaxis WEB del inventario. Las magnitudes de la geometría y tipografía verificadas se convierten a px en el consumidor CSS. Manrope se entrega con el recurso variable local. El enlace del componente Figma remite a la documentación visible de su fuente. La ficha local queda identificada por contrato y se genera en el catálogo.
