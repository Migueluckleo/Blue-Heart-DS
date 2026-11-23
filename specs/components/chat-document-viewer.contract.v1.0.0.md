---
contract_schema: sdd-project/0.2
contract_id: CHAT-DOCUMENT-VIEWER-001
name: Chat Document Viewer
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Chat Document Viewer
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["430:15516"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/tokens/chat-document-viewer.v1.0.0.json
source_data_digest_sha256: 5d3792222fde1e9f92b5bace9ad55021c3fc747e9abd45d869e3a68ce576bde4
data_refs: [specs/tokens/chat-document-viewer.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, FOUNDATIONS-TOKEN-VISIBILITY-001, BUTTON-001]
---

# Chat Document Viewer · CHAT-DOCUMENT-VIEWER-001

Vigencia del 19 de noviembre de 2026: la [enmienda de actions y controles Ghost](chat-document-viewer.actions.amendment.v1.0.0.md) sustituye CDV-02 y solo el alcance de acciones de Anatomy, Properties, States, Composition rules, Design ↔ Code mapping y Acceptance criteria. El texto original siguiente y su QA conservan el alcance histórico del alta. Consultar la enmienda para configuración actual, Description sincronizada y QA de paridad web. La identidad y versión 1.0.0 se mantienen.

## 1. Purpose

Presenta el documento entregado durante una conversación. Mantiene acciones, título, descripción y contenido reemplazable. No define la estructura de cada documento, la generación de archivos ni reglas fiscales. La fuente EXPLICIT del encargo es el nodo [430:15516](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=430-15516), inspeccionado el 18 de noviembre de 2026.

## 2. Contract

| Requisito | Regla y procedencia | Verificación |
|---|---|---|
| CDV-01 | Conservar ID del componente y Slot preview; promover a página oficial Chat Document Viewer. DERIVED de organización P04 y nombre funcional observado. | Readback y orden A–Z. |
| CDV-02 | Acciones Secondary medium Descargar xls y Text medium Expandir/Cerrar, con iconos Phosphor Light. OBSERVED. | Maestros locales y captura. |
| CDV-03 | Título/Descripción editables; encabezado y preview ajustan ancho al contenedor. DERIVED de contenido reemplazable y corrección de sizing. | Instancias y texto largo. |
| CDV-04 | Slot preview nativo, sin límite de cantidad inventado y con contenido reemplazable. OBSERVED y P-SLOTS. | Agregar, quitar, sustituir, ordenar y vacío desde instancia. |
| CDV-05 | Tokens propios, aliases component → semantic → primitives, scopes vacíos para internos. EXPLICIT por política vigente. | TOKEN-QA-01/02/03. |

Delegación técnica tras [QA documental](../../qa/contracts/chat-document-viewer.v1.0.0.review.md), conforme DEC-AI-TECHNICAL-CLOSURE-001. No implica publicación o instalación.

## 3. Anatomy

Raíz vertical → actions/toolbar → header con Title y Description → Slot preview. Acciones y tipografía pertenecen al visor. Los tres bloques originales del preview —búsqueda/acciones, selector de visualización y Table Sticky Actions— son contenido de ejemplo del producto, no anatomía obligatoria del componente. El producto puede sustituirlos por cualquier documento compatible.

## 4. Properties

| Figma | React | Default/alcance |
|---|---|---|
| Title, TEXT | title, string requerida | Título de la muestra inspeccionada. |
| Description, TEXT | description, string opcional | Descripción informativa de la muestra. Vacía omite el párrafo en web. |
| preview#430:0, SLOT | children, ReactNode | Tres bloques de muestra; cardinalidad abierta. |
| Labels de Buttons anidados | downloadLabel, expandLabel, closeLabel | Descargar xls, Expandir, Cerrar. |
| Acción del anfitrión | onDownload, onExpand, onClose | Callbacks opcionales; su ausencia deshabilita la acción web correspondiente. |
| Contexto del anfitrión | expanded, boolean | false; comunica el estado de expandir, sin generar un archivo ni abrir un diálogo. |

La interfaz React es una adaptación técnica DERIVED; la fuente visual no acredita callbacks o destinos de navegación existentes. Conservar la key del Slot al añadir props de texto.

## 5. Variants

Un componente principal. No crear variantes por tipo de documento, tabla, producto o agente. Expandido es estado controlado por el anfitrión del layout, no una nueva familia de documento.

## 6. Sizes

Referencia 755 × 717 px. El ancho del encabezado se corrige de Fixed a Fill y su altura a Hug. El visor y preview pueden llenar la altura disponible del anfitrión; el preview aloja el contenido y su scroll. La muestra no impone una altura universal. Separación principal 32 px, toolbar/preview 16 px y título–descripción 4 px.

## 7. States

El visor presenta contenido recibido del anfitrión. No se inventan estados de carga, error, generación o ausencia del documento. Los Buttons heredan sus estados oficiales; sin callback se muestran disabled en web. El anfitrión controla abrir/cerrar/expandir y conserva la conversación.

## 8. Behavior

Descargar delega la solicitud al anfitrión, que aporta archivo/formato/permisos. Expandir solicita ocupar el espacio de conversación; en la demo oculta Chat visualmente y permite Restaurar. Cerrar retira el preview y devuelve el espacio a Chat. Son decisiones técnicas del ejemplo, identificadas como DERIVED. No se anuncia descarga exitosa si solo se emitió un evento local.

## 9. Accessibility

Web usa sección con nombre derivado del título y Buttons nativos con nombres accesibles. El contenedor de preview es región identificada. Expandir comunica aria-pressed; el anfitrión gestiona el foco al cerrar/restaurar, evita perder borrador y mantiene orden de lectura. El contenido suministrado conserva su propia semántica, accesibilidad y desplazamiento. No se afirma soporte de lectura PDF/Office por el contenedor.

## 10. Design tokens

El [JSON delegado](../tokens/chat-document-viewer.v1.0.0.json) gobierna roles, aliases, tipos, descripciones y sintaxis WEB. Los tokens `chat-document-viewer/*` sustituyen bindings Body y el peso de Conversation Response de las capas propias; los Buttons conservan sus roles. Todos los nuevos tokens son internos con scopes=[]; Body permanece como única interfaz de selectores.

La referencia usa Manrope Bold 20 y Regular 14, interlineado AUTO y tracking 0.1%. Crear dos estilos compartidos del visor y enlazar familia, estilo, tamaño y tracking a sus tokens propios. AUTO se conserva sin un falso token numérico de interlineado. La API convierte el tracking vinculado a PIXELS; para conservar la apariencia de 0.1% se normaliza el título a 0.02 px (20 × 0.1 / 100) y la descripción a 0.014 px (14 × 0.1 / 100). Cada rol tiene su propia primitiva, alias semántico y token de componente. Bold/Regular STRING equivalen a CSS 700/400; el contrato delega esas métricas y unidades al JSON. Las primitivas de tracking y sus aliases semánticos reproducen la medida observada; no alteran el tracking de Body.

## 11. Content rules

Títulos y descripciones se ajustan en varias líneas. Los textos fiscales son ejemplos, no reglas del DS. El label de descarga refleja el archivo real que proporcione el producto. La demo usa mensajes locales y no simula una generación remota.

## 12. Composition rules

P-SLOTS REQUIRED. Mantener Slot nativo preview#430:0, Stretch child on insert y sin mínimos/máximos de hijos definidos. Admite uno, varios o cero elementos, inserción, retiro, reemplazo y reordenamiento desde una instancia. El contenedor estira el ancho y mantiene 16 px de gap; los hijos definen su contenido. Retirar los tres bloques de muestra no debe retirar acciones ni encabezado.

El contenido de producto puede consumir Body y debe reutilizar los componentes oficiales. Las dos pestañas remotas no Phosphor detectadas en el ejemplo se sustituyen por Tab locales equivalentes, sin editar el maestro global de Tabs. El componente de tabla, sus celdas y paginación siguen siendo instancias locales.

## 13. Responsive behavior

El visor independiente admite ancho reducido y toolbar con wrap, título/descripcion multilínea y preview desplazable. La referencia de App Shell es de escritorio; su contenedor define el mínimo y overflow, sin prometer un Shell móvil a partir de esta muestra.

## 14. Edge cases

Comprobar título largo, descripción vacía, Slot vacío, más/menos bloques que la muestra y tabla más ancha que el preview. Un preview vacío no se convierte en error de producto. Las acciones deben seguir visibles y el contenido no invadir el Rail.

## 15. Forbidden combinations

No usar tokens Body u otra familia para las capas propias del visor; no consumir semantic/primitives directamente. No sustituir Slots por una tabla fija ni usar un raster de la interfaz. No introducir componentes o variables remotas ajenas salvo Phosphor. No tratar scopes vacíos como binding inválido ni cambiar publicabilidad para ocultar variables.

## 16. Design ↔ Code mapping

Componente Chat Document Viewer ↔ export ChatDocumentViewer. Title/Description ↔ props tipadas; Slot preview ↔ children. Buttons oficiales ↔ Button secondary/text medium. La API web usa callbacks controlados; no equivale a un prototipo Figma ya conectado. El [layout de App Shell](app-shell.document-preview.amendment.v1.0.0.md) integra Chat y visor.

## 17. Acceptance criteria

Verificar CDV-01–05, las operaciones SLOT-QA-01–09 aplicables, todos los bindings propios por cuatro modos, estilos, sólo Body visible, dependencias locales y orden A–Z. Web debe tener export, ficha, ejemplo, typecheck/build y prueba de callbacks, foco, Slot y tamaños. Captura visual final a geometría de referencia. Registrar cualquier capacidad no comprobada como límite.

## 18. Examples

Usar la composición de conversación con documento en Playground y el ejemplo web de la familia. Cambiar children por contenido propio conserva el visor. El ejemplo tabular usa Search, Tabs, Table Sticky Actions e Icon Buttons Ghost oficiales para las acciones de fila. No es una nueva familia de tabla.

## 19. Source of truth

[Lectura de capas propias](../../sources/figma-snapshots/chat-document-viewer-2026-11-18/component-before.json), [dependencias](../../sources/figma-snapshots/chat-document-viewer-2026-11-18/dependencies-before.json), [layout](../../sources/figma-snapshots/chat-document-viewer-2026-11-18/layout-before.json) y [Slots](../../sources/figma-snapshots/chat-document-viewer-2026-11-18/slots-before.json). La fuente conserva nombres y valores observados; el contrato identifica las correcciones de alta y la adaptación técnica web.

## 20. Change management

Una corrección conserva identidad y actualiza datos, bindings y QA afectados. Una nueva anatomía/variante requiere evidencia y enmienda. Todo cambio incluye TOKEN-QA-01/02/03, contrato/ficha, ejemplo, catálogo y ambas skills del mismo corte local.

## 21. Changelog

2026-11-18: alta desde propuesta 430:15516, tokens propios y estilos, Slot nativo, normalización de sizing y dependencias, integración con App Shell y web. Sin publicar ni instalar.

## Guía semántica normativa

Usa el visor cuando un resultado de conversación necesita espacio de lectura junto a Chat. Usa Conversation Response Preview para referenciar el resultado dentro del mensaje y Chat Document Viewer para su contenido ampliado. Evita convertir el contenido específico del documento en nuevas variantes del DS.

## Description exacta

Chat Document Viewer · CHAT-DOCUMENT-VIEWER-001. Presenta un documento entregado en conversación. Edita Title, Description y el Slot preview desde una instancia. Reutiliza sus acciones Secondary/Text y conserva los componentes del contenido. El anfitrión controla descargar, expandir y cerrar.
