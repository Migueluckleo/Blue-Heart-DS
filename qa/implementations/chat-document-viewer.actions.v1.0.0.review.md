---
qa_id: QA-CHAT-DOCUMENT-VIEWER-ACTIONS-20261119
review_type: IMPLEMENTATION_REVIEW
contract_ref: specs/components/chat-document-viewer.actions.amendment.v1.0.0.md
contract_version: 1.0.0
implementation_status: VALIDATED
target: [figma, web]
scope: Description, actions Slot, Ghost, tokens, composición y regresión de preview/App Shell
result: PASS
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# QA de implementación · Chat Document Viewer · actions

2026-11-19 · **PASS para el alcance definido**. Contrato propietario: [CHAT-DOCUMENT-VIEWER-001-ACTIONS](../../specs/components/chat-document-viewer.actions.amendment.v1.0.0.md). Cierra los pendientes de la revisión documental inicial sin reescribir su evidencia ni aumentar la versión. Publicación e instalación no ejecutadas.

## Figma · Description e identidad

Se sincronizaron la Description canónica del maestro y la descripción de actions#519:0 mediante editComponentProperty, sin recrear la propiedad. El [readback de metadatos](../../implementations/figma/chat-document-viewer-actions-2026-11-19/description-readback.json) coincide con el contrato. ID 430:15516, key 8fd980d14fcda0e04773de154aeaa23677f9d4d7, Title#453:2, Description#453:3 y preview#430:0 permanecen. La página 452:2 conserva únicamente el principal.

El [readback exhaustivo final](../../implementations/figma/chat-document-viewer-actions-2026-11-19/full-final-readback.json) mantiene 1,140 nodos, 422 invisibles y 501 instancias. Los 74 image fills heredados corresponden a Avatares de 24 px; no se introdujo un raster de la interfaz. El readback compacto anterior omite descendientes invisibles por configuración del lector y no sustituye este inventario completo.

## Slots · P-SLOTS 0.1.0

[Evidencia de operaciones](../../implementations/figma/chat-document-viewer-actions-2026-11-19/slots-qa.json), desde instancia temporal 529:9687 vinculada al maestro, dentro de Playground:

| Control | Resultado |
|---|---|
| SLOT-QA-01/02 | PASS. actions y preview nativos; keys/settings conservados; stretch=false/true respectivamente. |
| SLOT-QA-03/04 | PASS. Default: un toolbar con tres controles. Insertar otro hijo, retirar el toolbar y conservar un Ghost de 40 px, aumentar a cinco hijos, reordenar y sustituir un control. |
| SLOT-QA-05 | PASS de estructura vacía, sin mensaje de producto inventado. El editor Figma conserva 40 px en vacío; la web usa altura natural 0. Se documenta esta diferencia de plataforma y no se impone un mínimo universal. |
| SLOT-QA-06 | PASS. Title/Description largos editados sin perder contenido. Toolbar de 12 Ghost a 320 px: seis por fila, altura 96 px y gaps 16. Reset restauró el contenido original y 755 × 717. |
| SLOT-QA-07 | PASS. Cuatro modos de componente, instancia vinculada y bindings del toolbar conservados; controles oficiales heredan sus maestros y aliases. |
| SLOT-QA-08 | NOT_APPLICABLE para alternar variantes: el visor es COMPONENT único, sin set. PASS adicional de preservación de hijos/IDs al editar propiedades TEXT. |
| SLOT-QA-09 | PASS. preview conserva sus hijos durante todas las operaciones. Se retiró únicamente el marco temporal 529:9686 con sus descendientes; ausencia leída de vuelta. No se modificaron principales de Button, Icon Button o App Shell. |

La API global $fig.reorderChildren no estaba disponible; se recuperó el caso con FigPlanNode.reorderChildren, declarado en los typings, reiniciando solo el Slot de la instancia temporal. No se usó el maestro para simular edición del consumidor.

## Tokens, estilos y visibilidad

TOKEN-QA-01: **PASS**, verificador del proyecto con visor 430:15516, Ghost medium 59:72 y Secondary medium 23:847: **229 bindings, 26 overrides, cero hallazgos**, cadenas component → semantic → primitives por los cuatro modos. [Resultado](../../implementations/figma/chat-document-viewer-actions-2026-11-19/token-qa.json).

Los [16 tokens propios y dos estilos](../../implementations/figma/chat-document-viewer-actions-2026-11-19/preservation.json) coinciden con la lectura anterior en IDs/keys, nombres, valores/aliases por modo, scopes, codeSyntax y bindings tipográficos. Se conserva publicabilidad. Solo 52 variables de component con prefijo exacto body/ tienen scopes visibles, sin ALL_SCOPES ni namespaces ajenos. El JSON canónico permanece con SHA-256 5d3792222fde1e9f92b5bace9ad55021c3fc747e9abd45d869e3a68ce576bde4; no se crearon tokens.

## Web · API, comportamiento y visual

ChatDocumentViewer incorpora actions?: ReactNode. undefined conserva el toolbar estándar, null lo deja vacío y el contenido suministrado reemplaza todas las acciones. children conserva preview. Default: Secondary medium más dos IconButton Ghost medium, cajas 40 × 40 y glifos Phosphor Light 20 × 20. Los nombres accesibles proceden de labels; expanded controla aria-pressed/selected y Restaurar. Los callbacks ausentes deshabilitan los controles. El anfitrión gestiona acciones propias y foco.

`pnpm verify`: **PASS**, 51 familias en generación/TOKEN-QA-02, TypeScript, **15 tests**, build Next estático. Node v24.22.3 se tomó del runtime existente de Codex ajustando PATH del proceso; no hubo instalación. Chrome requirió el permiso de localhost tras EPERM del sandbox; servidor temporal 127.0.0.1 y solicitudes externas bloqueadas.

Browser QA: **PASS**, seis casos de actions (default, vacío, uno, cinco, orden inverso, doce), callbacks por teclado, disabled, retorno al default, búsqueda y tab seleccionada preservadas al cambiar actions. preview vacío/uno/tres, descripción opcional, expansión/restauración/cierre/reapertura, borrador y foco conservados. Cuatro temas con roles CSS propios y Ghost de 40 px; sin errores de página.

App Shell conserva 1440 px, Chat 374, documento 755, Rail 79 y gap 32. Ghost en x=659/715 respecto del visor; root actions gap 0, toolbar gap 16. Descargar es HUG: lectura web 151.484375 px y referencia Figma 152 px, sin forzar un ancho ni aplicar tolerancia para una comparación exacta. Título Manrope Variable 20/700/0.02 px y descripción 14/400 corresponden a los roles del contrato.

A 320 px, doce Ghost ocupan dos filas/96 px sin overflow. La revisión visual detectó que el grid del Search de muestra desbordaba su ancho e invadía Settings; se corrigió exclusivamente el contenedor `.bh-delivered-document-toolbar > .bh-search` con minmax(0,1fr). El readback de navegador confirma Search de 192 px y ausencia de solapamiento, vacío y con consulta. No se cambió Search global. Capturas final de Shell y ancho reducido inspeccionadas, con acciones, títulos e iconos legibles.

Comprobantes web: output/qa/chat-document-viewer-actions-completion-2026-11-19/browser.json, web-verify.log, web-browser.log, web-conversation-document.png y web-actions-twelve-320.png. [Test reproducible](../../implementations/web/tests/chat-document-viewer.browser.mjs) y [captura Figma](../../implementations/figma/chat-document-viewer-actions-2026-11-19/figma-default.png).

## Cierre y límites

Contratos y ficha del mismo alcance, registro, ambos workflows y catálogo se sincronizan mediante el cierre coordinado 2026-11-19-chat-document-viewer-actions-completion. El comprobante independiente reside en output/closures/2026-11-19-chat-document-viewer-actions-completion.json; su estado/hashes son la evidencia del resultado de Graphify y P08. Los lanzadores y copias instaladas no se cambian. No se ejecutan commit, push, publicación Figma ni instalación.

Este QA acredita metadatos, composición y comportamiento local del visor; no certifica descargas/servicios remotos, renderizado PDF/Office, WCAG integral ni un App Shell móvil. Los remotos existentes son dependencias heredadas; la procedencia no expuesta por MCP no se inventa. Las observaciones del corte documental anterior permanecen históricas, enlazadas al resultado actual.
