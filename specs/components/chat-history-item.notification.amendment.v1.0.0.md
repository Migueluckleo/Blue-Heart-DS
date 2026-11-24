---
contract_schema: sdd-project/0.2
contract_id: CHAT-HISTORY-ITEM-001-NOTIFICATION
name: Chat History Item · Indicador opcional de notificación
type: amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
base_contract: specs/components/chat-history-item.contract.v1.0.0.md
applies_to: [CHAT-HISTORY-ITEM-001]
amends: CHAT-HISTORY-ITEM-001
figma_page_name: Chat History Item
figma_page_id: "257:586"
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["257:498"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/chat-history-item.notification.v1.0.0.json
source_data_digest_sha256: 4dd414b3c9f634929eaffdb5a1b9367124ad95575c1fe0e850f992b53ee72fe9
data_refs: [specs/data/chat-history-item.notification.v1.0.0.json, specs/tokens/chat-sidebar.v1.0.0.json]
dependencies: [CHAT-HISTORY-ITEM-001, DOT-001, ICON-BUTTON-001, FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Chat History Item · Indicador opcional de notificación

## Alcance, fuente y precedencia

EXPLICIT, 2026-11-24: «A este también se le hicieron modificaciones, por favor documéntalas», con [257:498](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=257-498). La revisión documenta una booleana nueva y cuatro instancias Dot en el set existente. Conserva versión 1.0.0, las cuatro variantes, sus ID/key, Title/Actions nativos, Updated, controles oficiales y comportamiento previo del anfitrión. No crea otra familia ni una variante por visibilidad del indicador.

La [inspección MD](../../sources/figma-snapshots/chat-history-item-2026-11-24/component-contract.md), el [YAML sincronizado](../../sources/figma-snapshots/chat-history-item-2026-11-24/component-contract.yaml), [snapshot](../../sources/figma-snapshots/chat-history-item-2026-11-24/raw-evidence.json) y [captura](../../sources/figma-snapshots/chat-history-item-2026-11-24/history.png) son evidencia OBSERVED de solo lectura. Los [datos delegados](../data/chat-history-item.notification.v1.0.0.json) gobiernan la propiedad nueva y sus localizadores, geometría observada y mapa de variantes/Slots. Los valores y descripciones de tokens siguen en sus fuentes existentes. Delegación documental tras [QA PASS](../../qa/contracts/chat-history-item.notification.v1.0.0.review.md), conforme a DEC-AI-TECHNICAL-CLOSURE-001; no autoriza implementar paridad web por anticipado.

## Cambio documentado

CHI-N01 MUST: exponer la propiedad exacta `show notification#628:0`, BOOLEAN, default=false, compartida por las cuatro variantes. Su binding controla `visible` en una instancia Dot por variante. No confundirla con `Show badge` de los Icon Button anidados: estos ocho Badge internos permanecen ocultos y tienen otra responsabilidad.

| Variante vigente | ID | Dot añadido | Valor leído |
|---|---|---|---|
| Selected=false, State=Default | 257:499 | 628:9010 | false |
| Selected=false, State=Hover | 257:506 | 628:9015 | false |
| Selected=true, State=Default | 257:513 | 628:9011 | false |
| Selected=true, State=Hover | 257:520 | 628:9013 | false |

El set local 257:498/key 312e59cef01748ee3b8a3c17942a496ab710f56e sigue en la página Chat History Item 257:586. La referencia anterior de origen 246:3536 enumera cinco propiedades, sin esta booleana; la lectura actual enumera seis. Se conservan distintos los IDs de origen y destino; no se fabrica una captura local inmediatamente anterior.

## Indicador, dependencia y layout

CHI-N02 MUST: reutilizar Dot local 32:41/key 012c408fce0c65c1432f38da2d881e12e0fdf857, del set 32:33, con type=notification, size=small y color=default. No dibujar un círculo independiente ni usar Count como significado de este indicador. Count y Max count son props de la dependencia, sin contador visible en esta variante.

CHI-N03 MUST: conservar caja 8×8, layoutPositioning=ABSOLUTE, constraints horizontal=MAX y vertical=MIN. En la fila de muestra de ancho 258, x=246 e y=4, de donde se deriva inset derecho 4. La instancia no participa en el flujo horizontal ni reserva ancho para Title, Updated o Actions. Dot mantiene radio full y su borde blanco OUTSIDE de 1. La booleana habilita visibilidad; no define por sí sola un gesto interactivo.

CHI-N04 MUST: el Dot consume sus cinco tokens: size/presence-small → size-sm, radius/container → radius-full, border/width-regular → stroke-xs, color/bg/alert → danger-default y color/stroke/separator → neutral-base. Todos son de component/dot y conservan aliases semantic → primitives por cuatro modos. No se agregan tokens de Chat History Item para duplicar los roles ya resueltos de Dot.

## Partes y comportamiento conservados

Title#796:13 y Actions#796:15 siguen siendo Slots nativos. Title: stretchChildOnInsert=true, FILL/HUG, vertical, sin padding ni gap; su muestra contiene un Title text que trunca a una línea. Actions: stretchChildOnInsert=false, HUG/HUG, horizontal con WRAP, gap 16 y row gap 8; muestra dos Icon Button Ghost small. Ambos mantienen displayEmptyByDefault=false, minChildren/maxChildren=null, allowPreferredValuesOnly=false y preferredValues=[]. No se confunde la muestra de uno/dos hijos con límites de producto. P-SLOTS permanece REQUIRED; el indicador fijo opcional no reemplaza estos Slots.

Updated#796:14 conserva el texto de muestra «1 sem». Default muestra Updated y oculta Actions; Hover hace la sustitución inversa. Selected continúa independiente. Las dos variantes Default tienen ON_HOVER → CHANGE_TO a su Hover correspondiente, Smart Animate/EASE_OUT de aproximadamente 0.3 s; no se deducen descargas, apertura de menús, persistencia de fijado ni navegación desde esas reacciones.

Las filas conservan padding vertical 8/horizontal 16, mínimo de alto 40, radio 8 y ancho de referencia 258. Gap 8 en false/Default y 16 en las otras tres. Title text usa Manrope Regular 14/20 px, tracking 0, auto-resize HEIGHT, truncation ENDING y maxLines=1. Updated usa Manrope Medium 12/20 px, tracking 0, HUG, sin truncamiento. No hay estilos nombrados usados; las métricas consumen variables propias.

Los altos actuales 40 en Default y 48 en Hover responden a la homologación anterior a Ghost small de 32 más padding; no se atribuyen como novedad del indicador. Las cajas guardadas de Actions oculto no fijan geometría de producto. No hay borde visible ni sombra de fila. Los colores de Hover/Selected conservan sus tokens propios y los iconos mantienen Outline/Light.

## Herencia, consumo y límites

CHI-N05: se leyeron siete instancias con nombre exacto Chat History Item en el set oficial Chat Sidebar 258:3326. Todas conservan main=257:499/257:513, ancho FILL y reciben show notification=false. La lectura comprueba herencia de la propiedad, no una prueba de toggling, edición de Slots o preservación tras alternar variantes.

El anfitrión decide cuándo encender/apagar el indicador y qué evento de producto representa. No se define una nueva notificación de servicio, conteo de mensajes no leídos, descarte automático o una acción al hacer click. Mantener accesible el título completo y definir el anuncio de la información si resulta necesario en el producto; esta lectura no acredita ARIA, teclado, foco o WCAG.

**Web STALE_FOR_NOTIFICATION:** [ChatHistoryItem](../../implementations/web/src/components/chat-sidebar.tsx) conserva title/updated/selected/onSelect/actions, sin la nueva booleana ni instancia Dot. Se registra esa diferencia; la documentación no presenta una prop web nueva como existente ni ejecuta su implementación. El catálogo técnico debe mostrar el estado y enlazar esta enmienda.

La Description del set sigue explicando su propósito. Las cuatro variantes todavía contienen la etiqueta v0.1.0, aunque el contrato vigente sea v1.0.0. Es metadata observada pendiente de armonización, no un cambio de versión; se conserva sin escritura Figma en este alcance documental.

## QA y cierre documental

CHI-N06: reconciliar MD/YAML/JSON, seis props, cuatro bindings booleanos, cuatro variantes, 65 nodos incluidos invisibles y vectores, 28 instancias, cuatro componentes únicos, 84 variables locales (26 directas + 58 transitivas), cero estilos nombrados y 104 cadenas directas por cuatro modos. Verificar namespaces y scopes internos, keys, glyphs activos y el mapa de consumidores. La metadata externa de biblioteca/archivo/versión de los iconos no es expuesta por MCP: NOT_EXPOSED_BY_FIGMA_MCP.

La activación true, cambio de variantes, operaciones Slots y responsive no se ejecutaron por tratarse de documentación de solo lectura. El QA histórico conserva el alcance que probó. Mantener catálogo, registros y Graphify del mismo corte local, sin publicar, instalar o modificar código de esta familia.

## Historial

2026-11-24 · v1.0.0 · Se documenta show notification y Dot oficial opcional; defaults, herencia, tokens, metadata antigua y diferencia web quedan registrados.
