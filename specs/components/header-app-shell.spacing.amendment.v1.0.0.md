---
contract_schema: sdd-project/0.2
contract_id: HEADER-APP-SHELL-SPACING-001
name: Header y App Shell · Layout y tokens propios de espaciado
type: amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
applies_to: [HEADER-001, APP-SHELL-001]
amends: [HEADER-001, APP-SHELL-001]
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["90:439", "105:7"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/tokens/header-app-shell.spacing.v1.0.0.json
source_data_digest_sha256: 33e03dbc7c8557a467758de98e7b255b43643ebd7047b25491d32f1cc6ccef19
data_refs: [specs/tokens/header-app-shell.spacing.v1.0.0.json, specs/data/header-app-shell.spacing.v1.0.0.json]
dependencies: [HEADER-001, APP-SHELL-001, FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Header y App Shell · Layout y tokens propios de espaciado

## Alcance y precedencia

EXPLICIT, 2026-11-24: «Header y App Shell también sufrieron modificaciones no olvides documentarlas y ajustar los paddings y gaps que puse de Body para que sean directamente tokens propios de esos componentes». Se documentan las medidas actuales y se reemplazan únicamente los bindings Body de la estructura propia, incluidos los overrides del Header en las ocho variantes de App Shell. Se conservan versión 1.0.0, IDs, props, instancias, Slots, arte y valores observados. No se publica o instala desde este ajuste.

La enmienda sustituye solo padding exterior de Header, gap Header–Content, padding superior/inferior de Content y separación de la composición de conversación. Los demás requisitos de [Header](header.contract.v1.0.0.md), [App Shell](app-shell.contract.v1.0.0.md) y su [layout de documento](app-shell.document-preview.amendment.v1.0.0.md) permanecen. La corrección no habilita modificaciones de los componentes internos ni del contenido de producto insertado en sus Slots.

Fuentes OBSERVED: [layout previo a la corrección](../../sources/figma-snapshots/header-app-shell-2026-11-24/before.layout.json), [bindings Body](../../sources/figma-snapshots/header-app-shell-2026-11-24/before.body-bindings.json), [cobertura completa y exclusiones](../../sources/figma-snapshots/header-app-shell-2026-11-24/before.all-body-bindings.json), [variables existentes](../../sources/figma-snapshots/header-app-shell-2026-11-24/before.tokens.json) y [huellas de preservación](../../sources/figma-snapshots/header-app-shell-2026-11-24/before.fingerprints.json). Se leyeron 120 nodos en Header y 5,659 en App Shell; el inventario propio comprende 16 y 67 nodos respectivamente. Las dependencias y contenidos anidados se conservaron como tales.

## Header vigente

H-AS-01 MUST: en el maestro local 90:439, página Header 90:2, el padding exterior es 32 px por lado. Consumir `header/spacing/container-padding` → semantic spacing-2xl → primitive spacing/32. La referencia mide 1280×112, HORIZONTAL/NO_WRAP, FIXED/HUG, Space between/CENTER y mínimo de ancho 1152. El alto 112 deriva de logo/controles de 48 más 64 de padding; no se fija como alto obligatorio para todo contenido.

H-AS-02 MUST: conservar `header/spacing/padding` de 24 px para el gap y padding derecho de Version, Actions y Company. El token anterior se sigue usando en esos bloques; no se cambia su alias para obtener 32. Content conserva gap/padding 0 mediante spacing/none, y Version info gap/padding vertical 8 mediante spacing/content. El logo conserva 48 px y su proporción. Los seis props, defaults, versión de muestra y HEADER-FIRST-001 se mantienen.

La referencia fuente original tiene Header de 96 px y padding 24. Es otro ID de origen, 500:1189, por lo que se presenta como antecedente del contrato, no como una captura local inmediatamente anterior. La modificación actual observada cambia el exterior a 32 y conserva la composición interna.

## App Shell vigente

| Requisito | Regla del corte | Medida y consumo |
|---|---|---|
| H-AS-03 | Header seguido de Content sin separación extra en las ocho variantes. | itemSpacing=0 → app-shell/spacing/none. Sustituye el gap de 8 del corte anterior. |
| H-AS-04 | Content conserva padding izquierdo, derecho e inferior de 32; superior 0. | [top,right,bottom,left]=[0,32,32,32]. Top → spacing/none; demás → spacing/content. |
| H-AS-05 | Content y Main conservan separación de 32. Conversation layout usa 32 tanto en conversation como conversation-preview. | app-shell/spacing/content → semantic spacing-2xl → primitive spacing/32. |
| H-AS-06 | Las ocho instancias Header internas conservan sus 32 por lado usando el token de Header. | Corregir también sus overrides de binding; no asignarles un token de App Shell por estar anidadas. |

El set local 105:7, página App Shell 105:2, conserva ocho variantes: menu collapsed/expanded × grid/flex/conversation/conversation-preview. Sus tamaños de muestra siguen siendo 1440×1024. Con Header de 112 y gap 0, Content empieza en y=112 y mide 912 de alto; tras padding inferior 32, Main dispone de 880. Su ancho continúa en 1272/1110 con el menú colapsado/expandido. Son medidas de referencia; no se impone 1024 a todo producto.

En conversation, Body ocupa 1161 con Rail de 79 y gap de 32 en la referencia colapsada; en expanded, 999. En conversation-preview, Chat conserva 374, el documento 755/593 y Rail 79 con dos gaps de 32. Los valores no definen una regla nueva de mínimo ni fuerzan la altura del contenido. Body y los dos Slots de conversación mantienen sus IDs/settings y sus responsabilidades de sizing.

## Tokens y mapa de bindings

H-AS-07 MUST: añadir únicamente dos FLOAT internos en la colección component, con scopes=[], codeSyntax WEB y aliases semánticos por los cuatro modos. Los [datos canónicos nuevos](../tokens/header-app-shell.spacing.v1.0.0.json) son la única descripción editable de estos tokens. Los [datos delegados del cambio](../data/header-app-shell.spacing.v1.0.0.json) rigen las 62 propiedades exactas, valores esperados, propietarios y mapa de IDs origen/destino; sus IDs lógicos no son IDs Figma.

| Token propio | Rol y alias | Campos solicitados |
|---|---|---|
| header/spacing/container-padding | Exterior 32 → spacing-2xl. Nuevo. | 4 del maestro Header y 32 de sus ocho instancias en App Shell. |
| app-shell/spacing/none | Ausencia de espacio 0 → spacing-none. Nuevo. | 8 gaps raíz y 8 paddingTop de Content. |
| app-shell/spacing/content | Separación/inset 32 → spacing-2xl. Existente. | 8 paddingBottom de Content y 2 gaps Conversation layout. |

`header/spacing/padding`=24, `app-shell/spacing/header-gap`=8 y todos los tokens anteriores se conservan con sus valores, aliases, IDs, metadata y scopes. El rol histórico header-gap de 8 deja de consumirse en la separación raíz del nuevo layout; la enmienda delega el cero al nuevo rol none. No se renombra, elimina o repunta un token existente para cambiar otra zona accidentalmente. Se preservan los 61 Body como interfaz visible para contenido específico de producto.

Los 44 bindings Body detectados dentro de contenido reemplazable de Chat/Chat Document Viewer —toolbar, visualización, tabla de muestra y mensajes— están fuera de la estructura propia de Header/App Shell y permanecen. El nombre de una capa Body no decide la propiedad de sus tokens; la frontera es maestro/instancia, Slot y contenido real. No convertir muestras de producto en nuevos consumibles del DS.

## Web y verificación

H-AS-08 MUST: CSS de Header consume el nuevo padding exterior; el interior mantiene roles 0/8/24 propios. Reproducir los grupos Version info y los separadores de sus bloques sin cambiar props o callbacks. App Shell consume spacing/none para gap raíz y padding superior, spacing/content para los 32 y para la fila conversation. No referenciar Body en las reglas propias de estas familias.

P-SLOTS NOT_APPLICABLE a esta operación de tokens: no añade ni cambia cardinalidad o mecanismos de composición. App Shell conserva REQUIRED, Header conserva NOT_APPLICABLE; se releen sus settings y keys antes/después. No se atribuyen nuevas pruebas de edición de Slots por una simple sustitución de bindings.

Aceptación: QA documental y preparación READY antes de escribir. Comprobar 62 bindings, aliases y valores por modo; cero Body en las zonas propias corregidas; preservar los 44 bindings de muestras, 1,536 variables anteriores, tres colecciones/modos/publicabilidad y cinco estilos Body; esperar 1,538 variables efectivas tras las dos altas. Comparar geometría, texto, fuentes y apariencia con la captura previa para asegurar que el cambio de referencias no altera el diseño del usuario. El contenido anidado ya presenta fuentes mixtas heredadas; no se edita en esta corrección de espaciado.

Ejecutar TOKEN-QA-01 con el verificador del proyecto, TOKEN-QA-02/generación web y TOKEN-QA-03/scopes. QA navegador de padding, gaps y grupos en cuatro temas, referencias de 1280/1440 y estados pertinentes; TypeScript, pruebas y build aplicables. Actualizar fichas, catálogo e índice Graphify del mismo corte local. El resultado ejecutado se registra en [QA de implementación](../../qa/implementations/header-app-shell.spacing.v1.0.0.review.md); los PASS históricos no sustituyen esta comprobación.

## Historial

2026-11-24 · v1.0.0 · Revisión del layout editado por el usuario y corrección delegada Body → tokens propios, conservando medidas y datos anteriores.
