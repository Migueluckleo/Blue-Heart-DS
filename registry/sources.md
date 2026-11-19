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
