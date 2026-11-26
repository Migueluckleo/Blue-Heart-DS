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
source_data_digest_sha256: c4c32f6b9aca7c41deb62062475b40c03ac48fc6d1068ec627006ce3503fe683
data_refs: [specs/tokens/header-app-shell.spacing.v1.0.0.json, specs/data/header-app-shell.spacing.v1.0.0.json]
dependencies: [HEADER-001, APP-SHELL-001, FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Header y App Shell · Layout y tokens propios de espaciado

## Alcance y precedencia

EXPLICIT, 2026-11-24: «Header y App Shell también sufrieron modificaciones no olvides documentarlas y ajustar los paddings y gaps que puse de Body para que sean directamente tokens propios de esos componentes». Se documentan las medidas actuales y se reemplazan únicamente los bindings Body de la estructura propia, incluidos los overrides del Header en las ocho variantes de App Shell. Se conservan versión 1.0.0, IDs, props, instancias, Slots, arte y valores observados. No se publica o instala desde este ajuste.

La enmienda sustituye solo padding exterior de Header, gap Header–Content, padding superior/inferior de Content y separación de la composición de conversación. Los demás requisitos de [Header](header.contract.v1.0.0.md), [App Shell](app-shell.contract.v1.0.0.md) y su [layout de documento](app-shell.document-preview.amendment.v1.0.0.md) permanecen. La corrección no habilita modificaciones de los componentes internos ni del contenido de producto insertado en sus Slots.

Fuentes OBSERVED: [layout previo a la corrección](../../sources/figma-snapshots/header-app-shell-2026-11-24/before.layout.json), [bindings Body](../../sources/figma-snapshots/header-app-shell-2026-11-24/before.body-bindings.json), [cobertura completa y exclusiones](../../sources/figma-snapshots/header-app-shell-2026-11-24/before.all-body-bindings.json), [variables existentes](../../sources/figma-snapshots/header-app-shell-2026-11-24/before.tokens.json) y [huellas de preservación](../../sources/figma-snapshots/header-app-shell-2026-11-24/before.fingerprints.json). Se leyeron 120 nodos en Header y 5,659 en App Shell; el inventario propio comprende 16 y 67 nodos respectivamente. Las dependencias y contenidos anidados se conservaron como tales.

## Header · Corrección del 26 de noviembre de 2026

H-AS-01 MUST: en el maestro local 90:439, página Header 90:2, el padding interior es 24 px por lado. Consume `header/spacing/container-padding` → semantic spacing-xl → primitive spacing/24. Con logo y controles de 48 px, la referencia mide 1280×96. Usa HORIZONTAL/NO_WRAP, FIXED/HUG, Space between/CENTER y mínimo de ancho 1152. El fondo `header/color/bg/default` encadena a `neutral-subtle` en los cuatro modos para delimitar esa superficie frente a Content.

H-AS-02 MUST: conservar `header/spacing/padding` de 24 px para el gap y padding derecho de Version, Actions y Company. El token anterior se sigue usando en esos bloques; no se cambia su alias para obtener 32. Content conserva gap/padding 0 mediante spacing/none, y Version info gap/padding vertical 8 mediante spacing/content. El logo conserva 48 px y su proporción. Los seis props, defaults, versión de muestra y HEADER-FIRST-001 se mantienen.

La referencia fuente original tiene Header de 96 px y padding 24. Es otro ID de origen, 500:1189, por lo que se presenta como antecedente del contrato, no como una captura local inmediatamente anterior. El corte del 24 de noviembre aplicó 32 px. La corrección del 26 de noviembre establece 24 px conforme a [Body y composición](../foundations/body.contract.v1.0.0.md#padding-y-separación-en-composición).

## App Shell vigente

| Requisito | Regla del corte | Medida y consumo |
|---|---|---|
| H-AS-03 | Gap raíz 0 en las ocho variantes. Content aporta la separación superior completa. | itemSpacing=0 → app-shell/spacing/none. Sustituye el gap de 8 del corte anterior. |
| H-AS-04 | Content mantiene los insets laterales e inferior de 32 y añade 32 arriba para separar Header del cuerpo. | `app-shell/spacing/content` en las cuatro direcciones. El inset superior cumple la función del margen de sección. |
| H-AS-05 | Content y Main conservan separación de 32. Conversation layout usa 32 tanto en conversation como conversation-preview. | app-shell/spacing/content → semantic spacing-2xl → primitive spacing/32. |
| H-AS-06 | Las ocho instancias Header internas consumen 24 por lado mediante el token de Header. | Corregir también sus overrides de binding; no asignarles un token de App Shell por estar anidadas. |

El set local 105:7, página App Shell 105:2, conserva ocho variantes: menu collapsed/expanded × grid/flex/conversation/conversation-preview. Sus tamaños de muestra siguen siendo 1440×1024. Con Header de 96 y gap raíz 0, el primer contenido de Main inicia en y=128. Su ancho continúa en 1272/1110 con el menú colapsado/expandido. Son medidas de referencia; no se impone 1024 a todo producto.

En conversation, Body ocupa 1161 con Rail de 79 y gap de 32 en la referencia colapsada; en expanded, 999. En conversation-preview, Chat conserva 374, el documento 755/593 y Rail 79 con dos gaps de 32. Los valores no definen una regla nueva de mínimo ni fuerzan la altura del contenido. Body y los dos Slots de conversación mantienen sus IDs/settings y sus responsabilidades de sizing.

## Tokens y mapa de bindings

H-AS-07 MUST: conservar los dos FLOAT internos en la colección component, con scopes=[], codeSyntax WEB y aliases semánticos por los cuatro modos. El alias de `header/spacing/container-padding` cambia a spacing-xl para este rol. La [enmienda de datos](../tokens/header-app-shell.spacing.v1.0.0.json) delega los dos FLOAT internos y el alias vigente de `header/color/bg/default` con su ID original. Los [datos delegados del cambio](../data/header-app-shell.spacing.v1.0.0.json) rigen las 62 propiedades exactas, valores esperados, propietarios y mapa de IDs origen/destino; sus IDs lógicos no son IDs Figma.

| Token propio | Rol y alias | Campos solicitados |
|---|---|---|
| header/spacing/container-padding | Interior 24 → spacing-xl. Mismo token e ID. | 4 del maestro Header y 32 de sus ocho instancias en App Shell. |
| app-shell/spacing/none | Ausencia de espacio 0 → spacing-none. Nuevo. | 8 gaps raíz. |
| app-shell/spacing/content | Separación/inset 32 → spacing-2xl. Existente. | 8 paddingTop, 8 paddingBottom de Content y 2 gaps Conversation layout. |

`header/spacing/padding`=24, `app-shell/spacing/header-gap`=8 y todos los tokens anteriores se conservan con sus valores, aliases, IDs, metadata y scopes. El rol histórico header-gap de 8 deja de consumirse en la separación raíz del nuevo layout; la enmienda delega el cero al nuevo rol none. El ajuste reutiliza el rol de padding del contenedor, separado del espaciado de los grupos internos. Body es la interfaz visible de contenido específico de producto según su inventario vigente.

Los 44 bindings Body detectados dentro de contenido reemplazable de Chat/Chat Document Viewer —toolbar, visualización, tabla de muestra y mensajes— están fuera de la estructura propia de Header/App Shell y permanecen. El nombre de una capa Body no decide la propiedad de sus tokens; la frontera es maestro/instancia, Slot y contenido real. No convertir muestras de producto en nuevos consumibles del DS.

## Web y verificación

H-AS-08 MUST: CSS de Header consume el nuevo padding exterior; el interior mantiene roles 0/8/24 propios. Reproducir los grupos Version info y los separadores de sus bloques sin cambiar props o callbacks. App Shell consume spacing/none para gap raíz y spacing/content para los 32 superiores de Content, sus insets y la fila conversation. No referenciar Body en las reglas propias de estas familias.

P-SLOTS NOT_APPLICABLE a esta operación de tokens: no añade ni cambia cardinalidad o mecanismos de composición. App Shell conserva REQUIRED, Header conserva NOT_APPLICABLE; se releen sus settings y keys antes/después. No se atribuyen nuevas pruebas de edición de Slots por una simple sustitución de bindings.

Aceptación: QA documental y preparación READY antes de escribir. Comprobar 62 bindings, aliases y valores por modo; cero Body en las zonas propias corregidas; preservar los 44 bindings de muestras, 1,536 variables anteriores, tres colecciones/modos/publicabilidad y cinco estilos Body; conservar el inventario actual, incluidos los dos FLOAT del corte histórico y el COLOR de Header con el mismo ID. Comparar geometría, texto, fuentes y apariencia con la referencia. Verificar 24 en Header y una sola separación vertical de 32 en Content. El contenido anidado ya presenta fuentes mixtas heredadas; no se edita en esta corrección de espaciado.

Ejecutar TOKEN-QA-01 con el verificador del proyecto, TOKEN-QA-02/generación web y TOKEN-QA-03/scopes. QA navegador de padding, gaps y grupos en cuatro temas, referencias de 1280/1440 y estados pertinentes; TypeScript, pruebas y build aplicables. Actualizar fichas, catálogo e índice Graphify del mismo corte local. El resultado ejecutado se registra en [QA de implementación](../../qa/implementations/header-app-shell.spacing.v1.0.0.review.md); los PASS históricos no sustituyen esta comprobación.

## Historial

2026-11-24 · v1.0.0 · Revisión del layout editado por el usuario y corrección delegada Body → tokens propios, conservando medidas y datos anteriores.

2026-11-26 · v1.0.0 · Padding interior Header a 24 y separación superior de Content a 32 en las ocho variantes.
