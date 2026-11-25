# Implementaciones y bindings

Registro inicial vacío. Registrar alcance, fuente, versión y evidencia según [P05](../protocols/05-SELF-DOCUMENTATION-AND-TRACEABILITY.md).

## FOUNDATIONS-BLUEHEART-VARIABLES-001 v0.1.2

AI Blueheart DS · tres colecciones locales · `VALIDATED` para variables. [Mapa](../implementations/figma/variables-2026-11-11/id-map.json), [readback final](../implementations/figma/variables-2026-11-11/final-collections.readback.json) y [estado](../implementations/figma/variables-2026-11-11/blueheart-variables.v0.1.2.state.json). Escritura efectiva confirmada para variables.

## Buttons y Loader

Maestro AI Blueheart DS. [Página Buttons](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=22-3) y [página Loader](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=22-2). [IDs Buttons](../implementations/figma/buttons-loader-2026-11-11/buttons.state.json) y [IDs Loader](../implementations/figma/buttons-loader-2026-11-11/loader.state.json). El catálogo local Next.js exporta ambas familias.

## Logos · LOGOS-001

[Logos en AI Blueheart DS](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=170-2) · Figma VALIDATED_WITH_EXCEPTIONS por redondeo subpíxel documentado. Cinco sets y 68 variantes proceden de Librería v1.1.0. El set local [Beni y Navi](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=277-76) añade cuatro variantes verificadas, para un total de 6 sets y 72 variantes. [Lectura de Beni y Navi](../implementations/figma/logos-beni-navi-2026-11-13/readback.json). [Ficha, localizadores y matriz](../implementations/figma/logos-2026-11-12/README.md) · [Lectura final](../implementations/figma/logos-2026-11-12/fidelity.readback.json). Web NOT_APPLICABLE.

## Characters · CHARACTERS-001

[Página Characters](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=187-14) · BENI Standby `187:51`, NAVI Analysis `187:112`. [Mapa y lectura](../implementations/figma/characters-2026-11-12/readback.json) · [Ficha web](../implementations/web/docs/components/characters.md).

## Conversation Composer · CONVERSATION-001

[Maestro oficial 216:66](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=216-66), en la página Conversation Composer 216:109. React y ejemplo Next consumen los tokens y controles oficiales. [Lectura Figma](../implementations/figma/conversation-composer-2026-11-12/readback.json) · [Ficha técnica](../implementations/web/docs/components/conversation-composer.md) · [QA Figma y Chrome](../qa/implementations/conversation-composer.v1.0.0.review.md).

## Conversation Response · CONVERSATION-RESPONSE-001

[Set oficial 222:72](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=222-72) · página 222:309 y auxiliar Preview 222:111. La implementación web exporta la respuesta, la tarjeta y el glyph de copia para Icon Button. [Lectura de Figma](../implementations/figma/conversation-response-2026-11-12/readback.json) · [Ficha web](../implementations/web/docs/components/conversation-response.md).

## Consumo de tokens de componente · 2026-11-12

App Shell, Conversation Composer, Conversation Response y Stepper consumen los aliases de componente de la corrección. [Lectura posterior](../implementations/figma/component-token-layer-correction/readback.json) · [Mapa delegado](../specs/tokens/component-layer.correction.json).

## User message · USER-MESSAGE-001

[Maestro 237:19](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=237-19) en la página 237:20. [Lectura y QA de bindings](../implementations/figma/user-message-2026-11-13/readback.json) · [Ficha web](../implementations/web/docs/components/user-message.md).

## Chat · CHAT-001

[Set oficial 242:437](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=242-437) en la página Chat 242:658. [Lectura de los estados y Slots](../implementations/figma/chat-2026-11-13/readback.json) · [Ficha web](../implementations/web/docs/components/chat.md).

## Chat Sidebar · CHAT-SIDEBAR-001

[Set oficial 258:3326](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=258-3326) · [Lectura de Figma](../implementations/figma/chat-sidebar-2026-11-13/readback.json) · [Ficha web](../implementations/web/docs/components/chat-sidebar.md).

## Checkbox · Posición del label · 2026-11-17

[Checkbox 42:30](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=42-30) ofrece label position right/left. La [API React](../implementations/web/docs/components/checkbox.md) acepta labelPosition con default right.

## Pagination · Cantidad de registros · 2026-11-17

[Pagination 109:36](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=109-36) expone Range visible. React acepta totalRecords y pageSize para calcular el resumen. [Lectura](../implementations/figma/pagination-record-count-2026-11-17/readback.json).

## Pagination · Posición del resumen · 2026-11-17

[Pagination 109:36](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=109-36) ofrece range position left/right en Default y Compact. Web usa rangePosition, con left por defecto. [Lectura y QA](../implementations/figma/pagination-range-position-2026-11-17/readback.json).

## Table · Sticky Actions · 2026-11-17

[Table 331:2664](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=331-2664) conserva Default 142:92 y añade Sticky 331:1238. [Lectura y QA](../implementations/figma/table-sticky-actions-2026-11-17/readback.json) · [API web](../implementations/web/docs/components/table.md).

## Body · Contenido de producto · 2026-11-17

[Playground Body](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=347-2597) usa el App Shell oficial y cinco frames con controles vinculados. [Lectura](../implementations/figma/body-tokens-2026-11-17/readback.json) · [Tokens](../specs/tokens/body.v1.0.0.json).

## Política de visibilidad de tokens · 2026-11-17

[Corrección de selectores](../specs/foundations/token-visibility.contract.v1.0.0.md): Figma 1,098 scopes internos corregidos; 33 Body visibles, 1,429 internos ocultos. Web aplica la política al manifest efectivo sin cambiar CSS. Evidencia completa en [QA](../qa/implementations/token-visibility.v1.0.0.review.md). Sin publicar ni instalar.

## Chat Document Viewer y layout de documento · 2026-11-18

Chat Document Viewer 430:15516, página oficial 452:2; App Shell conversation-preview 453:5306/453:5430 y muestra Playground 458:7455. React export, layout controlado, ficha y ejemplo sin backend. 23 variables internas nuevas; solo Body continúa visible. [QA](../qa/implementations/chat-document-viewer.v1.0.0.review.md). No se publica ni instala.

## Dropdown menu · búsqueda opcional

Maestro 119:17 conserva key y Options#119:0. Show search añade Search small local con viewport intrínseco y capa fija. React DropdownField/DropdownMenu incorporan filtrado local opcional; Search embedded evita forms anidados. [QA](../qa/implementations/dropdown-menu.search.v1.0.0.review.md).

## Body · Colores semánticos por propiedad · 2026-11-18

[Muestra editable](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=504-9685), FRAME en Playground, con 19 tokens nuevos y 52 Body visibles. [Readback](../implementations/figma/body-semantic-colors-2026-11-18/readback.json). Web /playground/body muestra los mismos colores por propiedad; las cinco Cards y sus controles conservan anatomía y espaciado.

## Caution · 2026-11-23

FOUNDATIONS-CAUTION-001 v1.0.0 · Figma VALIDATED. [Mapa/readback](../implementations/figma/caution-2026-11-23/readback.json): 21 tokens nuevos; Badge 21 variantes; Linear Progress 105. Body 57 roles totales. Playground 576:9686 es muestra editable, no componente nuevo. Código web VALIDATED y fichas regeneradas. [QA](../qa/implementations/caution.v1.0.0.review.md). Sin publicación ni instalación.

## Inline Notification CTA · 2026-11-23

Figma y web PASS conforme a [INLINE-NOTIFICATION-001-CTA](../specs/components/inline-notification.cta.amendment.v1.0.0.md). Set 122:274 y cinco ID/key preservados; Show CTA#581:0=false; Secondary small expuesto, label y visibilidad preservados entre tipos. [QA](../qa/implementations/inline-notification.cta.v1.0.0.review.md), 56 tokens en cuatro temas, 17 pruebas/build y Chrome. Cierre derivado y aviso a Github encargados al chat Verificar Graphify actualizado según solicitud explícita. Sin publicación o instalación.

## Inline Notification · CTA derecho e Isotipo · 2026-11-23

Figma y web PASS conforme a [INLINE-NOTIFICATION-001-LAYOUT-ISOTIPO](../specs/components/inline-notification.layout-isotipo.amendment.v1.0.0.md). Sustituye el layout vertical inicial por CTA derecho/alineado abajo y agrega indicador icon/isotipo, máximo 32×32 proporcional. Mismo set principal y cinco tipos; helpers internos y 21 wrappers de marca. [QA](../qa/implementations/inline-notification.layout-isotipo.v1.0.0.review.md): 21 swaps, maestros preservados, token interno 32 con scopes vacíos, cuatro temas, 18 pruebas/build y Chrome. Cierre derivado encargado a Verificar Graphify actualizado con run nuevo; aviso a Github solo después de CURRENT.

## Body disabled y descriptions Dropdown · 2026-11-23

Figma VALIDATED: cuatro colores disabled en component/body/ (IDs 616:2–5), 61 Body visibles y 1,536 tokens locales; cinco descriptions Dropdown sincronizadas desde su JSON sin otros cambios. [QA Figma/web PASS](../qa/implementations/body.disabled.v1.0.0.review.md), [readback](../implementations/figma/body-disabled-2026-11-23/readback.json) y [datos delegados](../specs/tokens/body.disabled.v1.0.0.json). Generación, 18 tests, build y Chrome por cuatro temas correctos.

## Chat History Item · Estado documental de notificación · 2026-11-24

Maestro 257:498 y cuatro Dot observados; no se escriben o implementan en este encargo. [Enmienda](../specs/components/chat-history-item.notification.amendment.v1.0.0.md), [consumidores](../sources/figma-snapshots/chat-history-item-2026-11-24/consumers.json) y [QA documental](../qa/contracts/chat-history-item.notification.v1.0.0.review.md). La implementación web histórica queda STALE_FOR_NOTIFICATION frente a esta ampliación; su QA previo no acredita la booleana nueva.

## Header y App Shell · Espaciado propio · 2026-11-24

HEADER-APP-SHELL-SPACING-001 v1.0.0 · VALIDATED para el alcance de [QA Figma/web](../qa/implementations/header-app-shell.spacing.v1.0.0.review.md). [Mapa y scripts/readback](../implementations/figma/header-app-shell-spacing-2026-11-24/README.md). Header 90:439/page 90:2 y set App Shell 105:7/page 105:2: 62 bindings en 27 nodos, dos FLOAT nuevos VariableID:653:191/653:192, cuatro modos, scopes=[] y cadena semántica conservada. No se cambian medidas ni valores previos. Web consume los roles propios para exterior 32, ceros del Shell e interiores 32/24/8/0; contrato/API/versiones conservados. 32 layouts Chrome, menús, navegación y composición del documento PASS. Capturas Figma y 44 bindings Body de contenido preservados; sin publicar ni instalar.

## Chat Rail Item · 2026-11-24

[Maestro 662:19 y página 662:18](../implementations/figma/chat-rail-item-2026-11-24/README.md). VALIDATED en Figma y web. 20 controles del Rail migrados en cinco variantes, con selección y Phosphor existentes. Los nueve maestros Chat Sidebar conservan geometría de referencia y carecen de minHeight. Content#258:0 se comparte entre Rail y Panel, y los overrides Rail se preservan al cambiar View. [Readback](../implementations/figma/chat-rail-item-2026-11-24/readback.json).

## IMPL-CHAT-SIDEBAR-V1-2026-11-24

El set oficial 258:3326 incorpora Rail V1 711:354 y Panel V1 711:328. V2 permanece como default. Content#258:0 se conserva y se usa también en ambos nuevos maestros. [Figma y readback](../implementations/figma/chat-sidebar-v1-2026-11-24/README.md) · [API web](../implementations/web/docs/components/chat-sidebar.md).

## IMPL-LOGOS-CORPORATE-SVG · 2026-11-24

[Set CONTPAQi · 171:2535](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=171-2535). Los nuevos maestros son Mi CONTPAQi light2 (720:22), Mi Gestión light (720:67) y Portal Web light (720:68). El default sigue siendo 171:2719. [Readback](../implementations/figma/logos-2026-11-24/readback.json) · [Ficha](../implementations/figma/logos-2026-11-24/README.md).

## IMPL-HEADER-LOGO-SIZING · 2026-11-25

Header 90:439 conserva el nodo 90:1138 y expone Logotipo y Altura. El set 734:191 reúne 225 combinaciones. App Shell expone Header en los ocho maestros. La corrección se probó con Mi CONTPAQi / light en 105:8 y la revisión de sincronización confirmó que sigue disponible en el selector Logotipo. Web usa logo y logoHeight. [Figma y readback](../implementations/figma/header-logo-sizing-2026-11-25/README.md) · [API web](../implementations/web/docs/components/header.md).

## IMPL-FLOATING-ACTIONS-SELECTION-SCOPE · 2026-11-25

Floating Actions 122:6 conserva General actions 122:12 e incorpora el selector 759:29 y las cuatro filas de estado del set 758:29. Dot 32:33 tiene 36 combinaciones. Web expone selection y conserva selectAll. [Figma y readback](../implementations/figma/floating-selection-2026-11-25/README.md) · [Ficha web](../implementations/web/docs/components/floating-actions.md).
