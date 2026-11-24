# Recepción de fuentes BlueHeart

Registrar las primeras ligas en [config/figma-links.json](../config/figma-links.json) y completar esta bitácora según [P02](../protocols/02-DOCUMENT-INGESTION-AND-STORAGE.md). Las listas vacías y campos null representan pendientes.

| Campo | Rol y datos a registrar |
|---|---|
| root_source | Raíz de solo lectura para Specs, variables, JSON canónicos y componentes. |
| foundation_sources | Fuentes de variables, estilos y assets. Entradas con URL, alcance, versión o captura, y localizadores observados. |
| family_sources | Una entrada por fuente de familia o patrón, con familia, URL, nodo, versión o captura y alcance. |
| master_destination | Archivo maestro confirmado para construcción P04. URL, file key leído, permiso y alcance autorizado. |
| consumption_sandbox | Archivo separado para prototipos editables. URL, file key leído, permiso y alcance autorizado. |

Conservar la URL original, quién la entregó, cuándo, rol, versión y hash del snapshot. Confirmar identidad y accesos en la fase solicitada. Para cada artefacto distinguir IDs de origen y destino, guardar el original y vincularlo desde el contrato. Las ligas son evidencias de entrada. La autoridad se registra con su alcance y QA.

## Ligas recibidas

El usuario confirmó los roles el 11 de noviembre de 2026. Blue Heart DS queda como raíz de solo lectura y AI Blueheart DS como destino de trabajo P04. [La configuración](../config/figma-links.json) conserva las ligas tal como se entregaron. El selector de la URL no asigna página de trabajo. La comprobación de solo lectura mediante el conector oficial de la cuenta de CONTPAQi devolvió Cover en la raíz y Page 1 en el maestro. Una lectura con Plugin API confirmó editor Design y una página en el maestro. La escritura efectiva sigue `UNVERIFIED`. Page 1 es una observación, sin asignación de familia. La verificación de acceso se recibió del chat coordinador. No se creó ni modificó contenido.

[Captura de variables](../sources/figma-snapshots/variables-2026-11-11/capture-manifest.json) de solo lectura. Se reconciliaron las 3 colecciones y 1.187 IDs. Quedan pendientes fuentes por familia, estilos y assets fuera del alcance, la página de cada familia y el sandbox de consumo.

## Buttons, Loader y Phosphor

[Manifiesto de lectura](../sources/figma-snapshots/buttons-loader-2026-11-11/manifest.json) de Buttons `11:128` y Loader `245:19` en la raíz. Las versiones fuente indicadas por sus descripciones están preservadas por hash. [Regla Phosphor](../references/PHOSPHOR-ICONS.md) y [lectura de la key vinculada](../implementations/figma/buttons-loader-2026-11-11/phosphor-import.readback.json).

## Stepper · 2026-11-12

La [captura del nodo 1020:530](../sources/figma-snapshots/root-families-2026-11-11/stepper-source.json) conserva el set de 18 variantes, el ejemplo de cuatro pasos, el auxiliar remoto y los bindings por instancia. [Phosphor oficial](../sources/figma-snapshots/root-families-2026-11-11/phosphor-stepper.json) confirma CheckFat e Image Fill.

## Logos · 2026-11-12

El usuario autorizó la [página Logos de Librería v1.1.0](https://www.figma.com/design/9zs5RMR8LB5wHjW9Bd59BA/Libreria-v1.1.0?node-id=40-93) como fuente de solo lectura para consumo en AI Blueheart DS. La [captura original](../sources/figma-snapshots/logos-2026-11-12/inventory.json) identifica 5 sets, 68 variantes y 12 marcos sueltos. El [JSON delegado](../specs/data/logos.v1.0.0.json) conserva el hash de la captura y la selección parametrizada. Los cuatro logos de Beni y Navi proceden de la [selección de Playground](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=273-7961). [Mapa de origen y destino](../implementations/figma/logos-beni-navi-2026-11-13/readback.json).

## Characters · 2026-11-12

La [página 820:7 del maestro anterior](https://www.figma.com/design/tj3WIBEZDGLVs7MJWKCwgf/AI-Design-System?node-id=820-7) se autorizó como selección de solo lectura. [Captura nativa de Characters](../sources/figma-snapshots/characters-2026-11-12/selection.json) conserva la geometría editable, los fills y las reacciones de BENI Standby y NAVI Analysis.

## Conversation Composer · 2026-11-12

SRC-CONVERSATION-001 · INDEXED · Propuesta observada v0.1.0 en Playground, principal 206:1182. El nodo se conserva como fuente. SHA-256 de la captura 9ebf10c8b0eccae99c8f587e24edd4bd6db65fa3a7941aef08d2149c8c7fb429. [Figma](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=206-1182) · [Lectura estructurada](../sources/figma-snapshots/conversation-composer-2026-11-12/selection.json)

## Conversation Response · 2026-11-12

SRC-CONVERSATION-RESPONSE-001 · INDEXED. Set 218:1236 de Playground y dependencias inspeccionadas. SHA-256 de lectura 13843bbb9bc61bf06f8391247456a77562b1f09e8164c6139f4b41482ccd7d92. [Lectura estructurada](../sources/figma-snapshots/conversation-response-2026-11-12/selection.json).

## User message · 2026-11-13

Propuesta 235:174 en Playground, registrada como fuente de User message. [Lectura estructurada](../sources/figma-snapshots/user-message-2026-11-13/selection.json).

## Chat · 2026-11-13

Set provisional 238:2236 en Playground. [Lectura de Standby y Started](../sources/figma-snapshots/chat-2026-11-13/selection.json).

## Chat Sidebar · CHAT-SIDEBAR-001

Cuatro paneles, cuatro rails y muestras independientes observadas en Playground 203:93. [Selección estructurada](../sources/figma-snapshots/chat-sidebar-2026-11-13/selection.json) · [Manifiesto de SVG](../specs/data/chat-sidebar.assets.v1.0.0.json).

## Body · Contenido de producto · 2026-11-17

Solicitud explícita del usuario del 17 de noviembre de 2026: roles Body para contenido a medida, estándar interno de Cards 24/16/8/4 y separación de 32 px entre Cards independientes. Cinco demos diferentes con botones/widgets, como frames en Playground y dentro de un App Shell; no documentarlas como componentes. [Contrato y datos delegados](../specs/foundations/body.contract.v1.0.0.md).

## Política de visibilidad de tokens · 2026-11-17

SRC-TOKEN-VISIBILITY-20261117: solicitud explícita del usuario y [datos de scopes de ese corte, conservados antes de ampliar Body](../sources/figma-snapshots/body-semantic-colors-2026-11-18/visibility-policy-before.json), SHA-256 bfeff78297e413e05a989523fecf5adb8f79850f99cd15cd25196a78b2e88397. [Lecturas Figma](../implementations/figma/token-visibility-2026-11-17/before.json) conservadas antes/después; el cambio no sustituye valores ni aliases históricos.

## Chat Document Viewer y layout de documento · 2026-11-18

SRC-CHAT-DOCUMENT-VIEWER-20261118: nodos aportados 430:15516 (principal) y 430:5222 (layout), maestro yZsIpXywybsPDytjolwcP4. [Snapshots conservados](../sources/figma-snapshots/chat-document-viewer-2026-11-18/component-before.json). [Datos canónicos](../specs/tokens/chat-document-viewer.v1.0.0.json), SHA-256 5d3792222fde1e9f92b5bace9ad55021c3fc747e9abd45d869e3a68ce576bde4; distingue IDs lógicos y destino. 374 px y tracking 0.1% proceden de la fuente; normalización px explícita.

## Dropdown menu con búsqueda · 2026-11-18

SRC-DROPDOWN-SEARCH-20261118: fuente aportada 430:16410 en el maestro autorizado. [Lectura conservada](../sources/figma-snapshots/dropdown-search-2026-11-18/source-before.json). [Datos delegados](../specs/tokens/dropdown-menu.search.v1.0.0.json), SHA-256 6e815076a56f45c2c2d31a344beb10c3cf4b4460620eadf47cb08a4e25ee9ab7. 16/32/4 px observados; 318 px derivados del viewport con borde. Autorización explícita de push a main, incluida la limpieza Azure y ajustes de consumo.

## Body · Colores semánticos por propiedad · 2026-11-18

SRC-BODY-SEMANTIC-COLORS-20261118: solicitud y aclaración explícitas del usuario: scopes por texto, fondo, borde y formas/iconos para contenido específico. [Inventario y metadata previos](../sources/figma-snapshots/body-semantic-colors-2026-11-18/before-before.json). [Datos añadidos](../specs/tokens/body.semantic-colors.v1.0.0.json) SHA-256 efdc5fda96bb9ad4e06ef0a8b0d04a054f1f38e4513568328359d2b982f440e0; política vigente SHA-256 baafd084303a190465a32a99a0e09429d7fcc2b9c492e56090318387917be41a. No se alteran primitivas ni semánticos existentes. El usuario solicita avisar al chat Estado de Github para verificar Graphify y publicar main al terminar.

## SRC-BUTTON-CONTEXTUAL-USAGE-2026-11-19

PDF contextual de Buttons, 16 páginas, aprobado explícitamente en este chat con la aclaración de Focus. [Registro y digests](../sources/inventories/buttons-contextual-usage.approval.2026-11-19.json). Se excluye la antigua página de revisión por instrucción del usuario. La fuente gobierna uso contextual y patrones; no cambia geometría, datos, tokens ni API ni autoriza publicación remota.

## SRC-INPUT-DROPDOWN-CONTEXTUAL-USAGE-2026-11-19

PDF de Inputs y Dropdowns de 20 páginas aprobado explícitamente en este chat. [Registro de fuente y digests](../sources/inventories/inputs-dropdowns-contextual-usage.approval.2026-11-19.json). Alcance: tres guías contextuales, cuatro patrones y consumo local autocontenido; no modifica datos, tokens, API, Figma ni publicación remota.

## SRC-SELECTION-CONTROLS-CONTEXTUAL-USAGE-2026-11-19

PDF contextual de Checkboxes, Radio Buttons y Toggles, 20 páginas, aprobado explícitamente en este chat. [Fuente, alcance y digests](../sources/inventories/selection-controls-contextual-usage.approval.2026-11-19.json). Autoriza cuatro guías, cinco patrones e integración local autocontenida. Conserva tokens/datos/API y deja registrada la diferencia de alineación multilínea de Radio; no autoriza publicación remota ni ediciones Figma.

## SRC-CHAT-DOCUMENT-VIEWER-ACTIONS-20261119

Solicitud del usuario sobre modificaciones en 430:15516 de AI Blueheart DS. [Inspección read-only completa y modelo MD](../sources/figma-snapshots/chat-document-viewer-2026-11-19/component-contract.md), [YAML sincronizado](../sources/figma-snapshots/chat-document-viewer-2026-11-19/component-contract.yaml) y [validación/hash](../sources/figma-snapshots/chat-document-viewer-2026-11-19/validation.json). 1,140 nodos, 501 instancias, 47 componentes, 219 variables y 18 estilos; 0 pendientes. Evidencia OBSERVED de actions Slot y controles Ghost; autoridad en la [enmienda acotada](../specs/components/chat-document-viewer.actions.amendment.v1.0.0.md). 16 tokens propios y dos estilos conservados frente al readback anterior; Description Figma y acciones web STALE. No se alteraron datos ni se ejecutó escritura/implementación.

## SRC-CHAT-DOCUMENT-VIEWER-ACTIONS-COMPLETION-20261119

Solicitud EXPLICIT de completar los pendientes en Figma y web, QA y sincronización P05/P08 sin publicar ni instalar. [Metadatos sincronizados](../implementations/figma/chat-document-viewer-actions-2026-11-19/description-readback.json), [Slots en instancia](../implementations/figma/chat-document-viewer-actions-2026-11-19/slots-qa.json), [tokens](../implementations/figma/chat-document-viewer-actions-2026-11-19/token-qa.json), [preservación](../implementations/figma/chat-document-viewer-actions-2026-11-19/preservation.json) y [readback exhaustivo final](../implementations/figma/chat-document-viewer-actions-2026-11-19/full-final-readback.json). El [QA de implementación](../qa/implementations/chat-document-viewer.actions.v1.0.0.review.md) sustituye los pendientes operativos del corte documental anterior, conservado como fuente histórica. No cambian datos canónicos ni versión; React añade actions y reutiliza IconButton Ghost.

## SRC-BADGES-CHIPS-CONTEXTUAL-USAGE-2026-11-19

PDF contextual de Badges y Chips de 21 páginas aprobado explícitamente en este chat. [Registro, alcance y digests](../sources/inventories/badges-chips-contextual-usage.approval.2026-11-19.json). Autoriza dos guías y cinco patrones para consumo local autocontenido; no cambia código, tokens, datos, Figma o publicación remota. El corte productor más reciente de Chat Document Viewer se incorpora con procedencia separada, conservando las recetas revisadas de Badge/Chip.

## SRC-BODY-MEASURES-VISIBILITY-20261119

Solicitud EXPLICIT de ocultar las medidas internas de los selectores y ofrecer solo component/body/* por propiedad. [Auditoría MCP](../implementations/figma/token-visibility-measures-2026-11-19/audit.json), [readback sin cambios](../implementations/figma/token-visibility-measures-2026-11-19/readback.json) e [inspección UI nativa](../implementations/figma/token-visibility-measures-2026-11-19/ui.json). Las 1,509 variables ya cumplían la política; no se ejecutó escritura de variables. Un marco nuevo sin bindings mostró seis body/spacing en gap/padding y cuatro body/radius en corner radius; el marco se retiró tras la lectura. El binding interno activo observado en un componente no equivale a una opción disponible en el campo nuevo.

## Body shape inverse · Corrección explícita 2026-11-19

- Fuente EXPLICIT: «Para los shapes nos faltó el color inverse que consume el semántico blanco». Destino autorizado AI Blueheart DS `yZsIpXywybsPDytjolwcP4`; se conserva la restricción de no publicar ni instalar.
- OBSERVED: neutral-base `VariableID:8:192` → neutral/100 `VariableID:11:86` = #FFFFFF, ya usados por inverse de Button e Icon Button. [Captura previa](../implementations/figma/body-shape-inverse-2026-11-19/before.json).
- Implementación: body/color/shape/inverse `VariableID:547:2`, scope SHAPE_FILL, cuatro aliases al semantic existente; cadena e identidad fuente/destino en [QA PASS](../qa/implementations/body.shape-inverse.2026-11-19.review.md). Contratos/datos/política y ambas guías corregidos en versión 1.0.0. Muestra de tokens editable agregada al frame Playground existente, sin componente nuevo.
- QA: lectura posterior Figma, preservación exacta, generación CSS/manifest, TypeScript, 15 pruebas, build y Chrome en cuatro temas con contraste, teclado y anchos. Evidencia en implementations/figma/body-shape-inverse-2026-11-19/ y output/qa/body-shape-inverse-2026-11-19/. Cierre coordinado local `2026-11-19-body-shape-inverse`, sin commit/push/publicación/instalación.

## SRC-FORMS-APP-SHELL-2026-11-20

PDF contextual v0.2 de 25 páginas, revisado y aprobado en este chat el 20 de noviembre: «Está bien, documenta el MD». Incluye la aclaración «Los botones deben estar alineados a la caja del input». [Registro con SHA de PDF, Markdown y fuentes](../sources/inventories/forms-app-shell.approval.2026-11-20.json). La aprobación adopta reglas de composición de producto; no es QA de servicios, flujo, Figma ni accesibilidad global. Fuentes originales conservadas.

## Caution · 2026-11-23

SRC-CAUTION-20261123 · Decisiones explícitas del chat: escala final 100–900, Badge sin stroke y construcción de Body/Badge/Linear Progress. Namespace caution-orange elegido para conservar Servicios. [Datos canónicos](../specs/tokens/caution.v1.0.0.json) y [enmienda](../specs/foundations/caution.amendment.v1.0.0.md). Los valores de las otras familias se mantienen.

## Inline Notification · CTA opcional · 2026-11-23

Fuente EXPLICIT: «Necesitamos integrar un Call to Action en las inline alert que sea opcional, su estado default será apagado, si lo activas necesita aparecer un botón Secundario». Aclaración: «Creo que se llama Inline Notification». El usuario solicita aplicar en Figma, documentar specs y avisar al chat de Graphify para verificar conexiones/vigencia y luego notificar a Github para push.

[Enmienda y decisiones derivadas](../specs/components/inline-notification.cta.amendment.v1.0.0.md), [datos CTA](../specs/data/inline-notification.cta.v1.0.0.json), [QA](../qa/implementations/inline-notification.cta.v1.0.0.review.md). Lecturas y construcción en implementations/figma/inline-notification-cta-2026-11-23/. Se preserva el inventario histórico y las instalaciones/cierres anteriores.

## Inline Notification · CTA derecho y Logos Isotipo · 2026-11-23

Fuente EXPLICIT: «El CTA se debe de acomodar a la derecha del body», [ejemplo 589:81](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=589-81). Ampliación: «agrega que el ícono se pueda reemplazar por Logos en su formato Isotipo conservando sus dimensiones de una altura y ancho máx de 32 px sin deformarlo». Sustituye la disposición inicial debajo del mensaje. Se conservan los fuentes, maestro y arte original. [Enmienda](../specs/components/inline-notification.layout-isotipo.amendment.v1.0.0.md) y [QA](../qa/implementations/inline-notification.layout-isotipo.v1.0.0.review.md). Se avisó a Graphify de ambas instrucciones para evitar un cierre/push del corte superado. Evidencia en implementations/figma/inline-notification-right-isotipo-2026-11-23/ y output/qa/inline-notification-right-isotipo-2026-11-23/.

## Body disabled y mantenimiento de paquetes · 2026-11-23

SRC-BODY-DISABLED-2026-11-23: solicitud EXPLICIT del usuario para cuatro colores disabled con scopes por propiedad, cinco descriptions Dropdown y paquetes Figma actualizados. Continuación EXPLICIT: conservar versiones, sincronizar los dos chats autocontenidos, verificar todos los grafos y publicar el corte en GitHub una vez validado. [Contrato](../specs/foundations/body.disabled.amendment.v1.0.0.md), [QA documental](../qa/contracts/body.disabled.v1.0.0.review.md) y [evidencia real](../implementations/figma/body-disabled-2026-11-23/readback.json). Roles semánticos y arquitectura derivados de las fuentes vigentes; ninguna paleta nueva.

## Tabs · Uso contextual · 2026-11-24

SRC-TABS-CONTEXTUAL-USAGE-2026-11-24 · PDF de 22 páginas aprobado explícitamente. [Decisión, PDF y hashes](../sources/inventories/tabs-contextual-usage.approval.2026-11-24.json). Criterios de Tabs frente a Chips y uso contextual; no altera datos, API, tokens o Figma.

## SRC-CONVERSATION-PREVIEW-LAYOUT-2026-11-24

Solicitud EXPLICIT: «Modifiqué este componente, documenta el cambio», [AI Blueheart DS 222:111](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=222-111). INDEXED: [snapshot actual de solo lectura](../sources/figma-snapshots/conversation-preview-2026-11-24/raw-evidence.json), SHA-256 6bcf8265994899bd4c057072559cdbe71b8708da5c1d403a2e42310bb908b764, capturado 2026-11-24T15:18:07.324Z; [MD](../sources/figma-snapshots/conversation-preview-2026-11-24/component-contract.md), [YAML](../sources/figma-snapshots/conversation-preview-2026-11-24/component-contract.yaml), captura y comprobante conservados juntos. OBSERVED: fila de título/Badge, sizing, 11 nodos, cuatro instancias/tres componentes, 73 variables y herencia BENI/NAVI. La fuente histórica remota 218:1228 no se usa como before inmediato del ID local. [Enmienda](../specs/components/conversation-response.preview-layout.amendment.v1.0.0.md) y [QA](../qa/contracts/conversation-response.preview-layout.v1.0.0.review.md); web pendiente en este alcance, sin cambios de código o Figma.

## SRC-CHAT-HISTORY-NOTIFICATION-2026-11-24

EXPLICIT: «A este también se le hicieron modificaciones, por favor documéntalas», [257:498](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=257-498). INDEXED: [snapshot de solo lectura](../sources/figma-snapshots/chat-history-item-2026-11-24/raw-evidence.json), SHA-256 21a26b7c3a50f1d4fd2a29a9a2adaa05613b0cfb841ffeb93070b539cfd0f89b; [MD](../sources/figma-snapshots/chat-history-item-2026-11-24/component-contract.md), [YAML](../sources/figma-snapshots/chat-history-item-2026-11-24/component-contract.yaml), captura y validación del mismo modelo. Cobertura 65 nodos, 28 instancias, cuatro mains, 84 variables; propiedad show notification false y siete consumidores leídos. Datos OBSERVED, no autoridad independiente. [Enmienda](../specs/components/chat-history-item.notification.amendment.v1.0.0.md) y [QA](../qa/contracts/chat-history-item.notification.v1.0.0.review.md). Sin escritura Figma/código de esta familia; web y metadata pendientes explícitos.

## SRC-HEADER-APP-SHELL-SPACING-2026-11-24

EXPLICIT: «Header y App Shell también sufrieron modificaciones no olvides documentarlas y ajustar los paddings y gaps que puse de Body para que sean directamente tokens propios de esos componentes». INDEXED: [layout observado antes de corregir](../sources/figma-snapshots/header-app-shell-2026-11-24/before.layout.json), SHA-256 7dc32a3122bbdf242c078a546d5d53d60850063209864ac989a583a9d7497607; bindings y huellas junto a él. Header 90:439/página 90:2 y App Shell 105:7/página 105:2; ocho variantes. Autoridad: solicitud + [enmienda delegada](../specs/components/header-app-shell.spacing.amendment.v1.0.0.md) + [QA documental](../qa/contracts/header-app-shell.spacing.v1.0.0.review.md), no el snapshot aislado. Se conservan 32 exteriores Header, interiores 24/8/0, ceros y gaps de 32 en Shell. [Implementación y readback](../implementations/figma/header-app-shell-spacing-2026-11-24/README.md); 62 campos, dos nuevos FLOAT, 1,536 previos y 44 bindings de contenido Body preservados.

## SRC-CHAT-RAIL-ITEM-2026-11-24

El usuario solicitó revisar la navegación de [Chat Sidebar 258:3326](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=258-3326), conservar su apariencia neutral, permitir novedades y ubicar un maestro nuevo en otra página. Aclaró Dot medium, focus ring de marca, quitar mínimo de Rail y Panel, y documentar Content añadido a los Rail. OBSERVED: 20 controles iniciales, cuatro superficies #0F172A literales y nueve mínimos de 791. [Lectura final y mapeo](../implementations/figma/chat-rail-item-2026-11-24/readback.json) · [datos de Content](../specs/data/chat-sidebar.rail-content.v1.0.0.json).
