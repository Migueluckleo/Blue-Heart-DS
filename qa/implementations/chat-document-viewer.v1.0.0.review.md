# QA · Chat Document Viewer y App Shell con documento

2026-11-18 · CHAT-DOCUMENT-VIEWER-001 / APP-SHELL-DOCUMENT-PREVIEW-001.

**QA de implementación: PASS.** Figma y Chrome final con tracking normalizado verificados. El cierre local coordinado conserva su comprobante independiente. Publicación e instalación no autorizadas.

## Identidad, organización y composición Figma

El principal conserva ID `430:15516` y key `8fd980d14fcda0e04773de154aeaa23677f9d4d7`, ahora en página oficial Chat Document Viewer `452:2`, cuyo único hijo directo es el maestro. El orden A–Z conserva Thumbnail/separadores y Playground. La fuente `430:5222` permanece y la [muestra oficial nueva](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=458-7455) es `458:7455`.

App Shell `105:7` mantiene seis maestros previos y añade `453:5306` (collapsed) / `453:5430` (expanded), body layout=conversation-preview. A 1440 × 1024: Chat=374, documento=755, Rail=79 y gaps=32 px. Con menú expandido, documento=593 px. Documento Fill/Fill; encabezado Fill/Hug. Las variantes nuevas se colocan debajo de las anteriores, sin cubrir composiciones ajenas.

La composición tiene 1,635 descendientes y 1,636 nodos contando raíz: 664 INSTANCE, 230 FRAME, 172 TEXT, 22 SLOT y geometría vectorial. Los image fills corresponden a assets de identidad pequeños y Avatares de 24 px, incluidas ramas ocultas heredadas; no hay un raster de la interfaz completa. Captura MCP de composición inspeccionada: distribución, textos, iconos y controles visibles correctos. El Header oficial del ejemplo nuevo usa Contabilidad; la muestra original Anticipa se conserva.

## Slots · PASS

El visor mantiene Slot nativo preview#430:0, stretchChildOnInsert=true y sin límites de hijos. Desde instancia: cantidades 3→5→0→1→3, orden, reemplazo y reset, manteniendo el vínculo al principal. A 320 px, encabezado/título miden 320 px y el título largo crece hasta 108 px con Manrope Bold y estilo compartido. Toolbar y selector admiten wrap; la tabla tiene su propio desplazamiento.

App Shell tiene Slots nativos Body#105:0, Document preview#454:0 y Right sidebar#299:7. La API clone devolvió inicialmente frames con referencias SLOT; se reconstruyeron mediante createSlot, manteniendo keys compartidas. Se retiraron sólo seis propiedades automáticas sin referencias. Cada región pasó 1→3→0→1→1, reordenamiento, sustitución y reset en instancia. Cambiar collapsed→expanded conserva contenido añadido y el override Title del documento. Las instancias de QA se retiraron tras leer resultados; ningún maestro ajeno se modificó para simular edición.

## Tokens y dependencias · PASS

23 variables nuevas: tres primitives, tres semantic y 17 component (16 del visor y ancho de Chat de App Shell). Tokens propios del visor; Buttons y contenido mantienen sus familias. TOKEN-QA-01 final: **214 bindings, 32 overrides, cero hallazgos** sobre los tres maestros afectados. Se corrigieron cinco bindings externos del ejemplo: paints de Search (tres), tamaño de Visualización y gap del contenedor de tabla. Search hereda sus roles locales; el contenido de producto usa Body y su H3 compartido. Dos Tab remotas no Phosphor se sustituyeron por Tab pill locales. El readback exhaustivo de la composición no tiene aliases externos; las dependencias remotas restantes son iconos Phosphor.

TOKEN-QA-03: **PASS**. Huella completa idéntica de las 1,462 variables preexistentes: IDs, keys, nombres, tipos, descripciones, valores/aliases por modo, scopes, codeSyntax y publicabilidad. Colecciones, modos y orden intactos. Inventario final: 1,485 variables, sólo 33 component/body/* visibles y 1,452 internas con scopes vacíos. Cinco estilos Body conservados íntegros contra el corte verificado. Los campos, tipos, aliases y modos de las nuevas variables coinciden con el JSON delegado; los dos FLOAT decimales se verifican con codificación FLOAT32.

Dos estilos compartidos del visor: Manrope Bold 20 y Regular 14, AUTO y familia/estilo/tamaño/tracking enlazados a tokens propios. Figma fuerza PIXELS al vincular letterSpacing; asignar PERCENT después elimina el enlace, comprobado en instancia temporal. Se normaliza el 0.1% observado a 0.02 px (título) y 0.014 px (descripción). La API materializa 0.019999999552965164 / 0.014000000432133675 por FLOAT32. El JSON declara medidas decimales y la evidencia conserva el valor materializado, sin alterar el tracking de Body. AUTO no se sustituye por un token numérico inventado.

## Web

Export ChatDocumentViewer con props TypeScript, Buttons Secondary/Text medium, iconos Phosphor y children como preview. App Shell añade conversation-preview, documentPreview y documentExpanded. Expandir conserva Chat montado e inerte; cerrar/restaurar/reabrir conserva borrador y devuelve foco. Button sólo incorpora ariaPressed opcional, sin nuevas variantes/recetas visuales.

TypeScript y build Next estático: PASS. Doce tests Node existentes: PASS. P07/TOKEN-QA-02 cubre 51 familias. El ejemplo App Shell pasa a módulo separado para aislar dependencias; Grid/Flex conservan sus muestras y Conversation su inicio Standby salvo contexto de documento. `/playground/conversation-document` abre directamente la nueva composición.

El Header web conserva Version, cinco Actions, Company y User interaction mediante los componentes oficiales, conforme a la referencia y HEADER-FIRST-001. Chrome comprobó medidas 374/755/79, gap32, cuatro temas, Manrope 20/700 y 14/400, expansión por teclado con aria-pressed, restauración, cierre/reapertura, foco y borrador preservados, búsqueda local, Tabs y ocho Icon Buttons Ghost en Table Sticky Actions. A 320 px: título ajustado, toolbar sin overflow y selector sin solapamientos. También se probaron preview web vacío/un bloque/tres bloques, descripción opcional y apertura/cierre del Panel de herramientas: el documento conserva 329 px con menú y panel expandidos. La descarga emite callback y mensaje local explícito: la demo no genera ni finge descargar archivos. Red externa bloqueada; no se certifica Shell móvil ni renderizado PDF/Office. El host aporta el documento y su archivo.

## Evidencia y cierre

[Fuente](../../sources/figma-snapshots/chat-document-viewer-2026-11-18/component-before.json), [readback](../../implementations/figma/chat-document-viewer-2026-11-18/readback.json), [Slots del visor](../../implementations/figma/chat-document-viewer-2026-11-18/slots-qa.json), [tres Slots de App Shell](../../implementations/figma/chat-document-viewer-2026-11-18/shell-slots-qa.json), [tokens](../../implementations/figma/chat-document-viewer-2026-11-18/token-qa.json), [variables antes](../../implementations/figma/chat-document-viewer-2026-11-18/variables-before.json), [variables después](../../implementations/figma/chat-document-viewer-2026-11-18/variables-after.json), [capacidad de tracking](../../implementations/figma/chat-document-viewer-2026-11-18/tracking-capability.json) y [normalización](../../implementations/figma/chat-document-viewer-2026-11-18/tracking-normalization.json). QA web en output/qa/chat-document-viewer-2026-11-18, browser.json/PNG y [test](../../implementations/web/tests/chat-document-viewer.browser.mjs). El sandbox bloqueó el puerto localhost: Chrome se ejecutó con permiso para el servidor temporal local, manteniendo bloqueadas solicitudes externas.

Ambos workflows de consumo se actualizan en workflows/skills; los lanzadores permanecen iguales, conforme P08 github-direct-v2. El cierre queda en output/closures/2026-11-18-chat-document-viewer.json. Se prepara Graphify/catálogo local; no se publica ni instala. La disponibilidad de las nuevas fuentes desde GitHub para otros encargos queda pendiente de una publicación autorizada. Métricas de cuenta no observables: UNAVAILABLE.
