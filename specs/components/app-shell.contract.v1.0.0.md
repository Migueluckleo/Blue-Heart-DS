---
contract_schema: sdd-project/0.2
contract_id: APP-SHELL-001
name: App Shell
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: App Shell
figma_page_id: "105:2"
target_node_ids: ["105:7"]
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/app-shell.v1.0.0.json
source_data_digest_sha256: 15c5ff0d45d7f615b58ab2d64daabd3993ba7dd7a6426d2eaff069df70f5ec26
data_refs: [specs/data/app-shell.v1.0.0.json, specs/tokens/header-app-shell.spacing.v1.0.0.json, specs/data/header-app-shell.spacing.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, HEADER-001, SIDEBAR-001, SECTION-HEADER-001, CHAT-001, CHAT-SIDEBAR-001]
---

# App Shell · APP-SHELL-001

La [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/app-shell.1.0.0.md.txt) y el [JSON delegado](../data/app-shell.v1.0.0.json) gobiernan el set `940:1376`. Header precede a Content. Content coloca Sidebar junto a Main. Main apila Section Header y Body. Los ejes menu collapsed/expanded y body layout grid/flex producen las cuatro variantes de la fuente raíz. En el destino Sidebar consume Secondary small para expandir y contraer según su [enmienda](sidebar.secondary-control.amendment.v1.0.1.md).

P-SLOTS REQUIRED. La raíz oficial actual comparte una propiedad Body entre las ocho variantes. El Slot admite inserción, retirada, reordenamiento y sustitución sin mínimo ni máximo declarados. Los patrones históricos de Laboratorio usan otras claves. Grid contiene una rejilla nativa de cuatro tracks FLEX por eje y los spans 4, 1+1+1+1, 2+2 y 3+1. Flex contiene dos regiones iguales y una región de ancho completo. Los bloques son ejemplos reemplazables.

La referencia Figma mide 1440 × 1024 y usa separaciones de 8 y 32, con las capas propias del Shell observadas como valores locales. El ancho de Main es 1272 con Sidebar de 72 o 1110 con Sidebar de 234. Figma y web consumen tokens App Shell para superficie, separación de Header e inset de Content. Los aliases conservan la superficie neutral base y las medidas de referencia. El contenido web puede crecer en el flujo del anfitrión y mantiene orden lógico de lectura. El anfitrión define desbordamiento, datos, permisos, rutas y mínimo de la pantalla.

Ese espaciado corresponde al corte inicial. La [enmienda del 24 de noviembre](header-app-shell.spacing.amendment.v1.0.0.md) rige el layout vigente: gap raíz 0, Content con 32 px superiores entre Header y el cuerpo, insets laterales e inferior de 32 y filas de conversación separadas 32. Los bindings propios consumen Header/App Shell; el contenido específico de producto mantiene Body. El inset superior es el único aporte al tramo vertical Header–cuerpo.


El Header expuesto permite elegir Logotipo y Altura. [Selección y proporciones de marca](header.logo-sizing.amendment.v1.0.0.md).

## Variantes de conversación

El set [App Shell](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=105-7) ofrece `body layout=conversation` con menú colapsado (`299:1332`) o expandido (`299:2120`). El encabezado usa la opción de logo de Section Header en ambas muestras. Body contiene una instancia de Chat en Standby y admite cualquier contenido de conversación compatible. En el Slot opcional `Right sidebar`, deja el Rail sin selección al inicio. Para una vista seleccionada, coloca el Panel antes del Rail y usa la misma vista en ambos. El anfitrión controla selección, mensajes y apertura.

La fila de conversación asigna Fill a Body y ajusta el ancho de la región derecha a su contenido. En el corte actual, a 1440 px con Rail de 79 y gap 32, Body mide 1161 px con menú colapsado y 999 px con menú expandido; abrir el Panel reduce el espacio disponible según el contenido del Slot. Las medidas 1193/929/767 del QA del 13 de noviembre conservan su alcance histórico. La altura de las muestras del Shell es 1024 px. En React, usa `bodyLayout="conversation"`, pasa Chat como `children` y el Panel y Rail como `rightSidebar`. Chat conserva sus restricciones internas de tamaño. El [ejemplo React](../../implementations/web/docs/components/app-shell.md) abre el panel por teclado, admite envío local y permite cerrarlo.

Los [layouts de Playground](../../implementations/figma/chat-playground-2026-11-13/README.md) sirven como referencias visuales. El componente reutilizable reserva el espacio del Rail en el flujo y deja el cuerpo flexible al abrir el panel. [QA de instancia](../../implementations/figma/app-shell-conversation/readback.json).

## Guía semántica normativa

Usa App Shell para reunir navegación global y el contenido principal de una pantalla de escritorio. Carbon documenta cómo Header y panel lateral organizan niveles de navegación. W3C WAI distingue las regiones semánticas que permiten recorrer la página. BlueHeart mantiene la jerarquía local en Section Header y deja Grid o Flex al contenido. [Carbon Global Header](https://www.carbondesignsystem.com/building-blocks/core/patterns/global-header) · [W3C WAI Landmark Regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)

| Situación | Haz | Evita |
|---|---|---|
| Dashboard con módulos alineados | Usa Grid y elige spans según los mínimos de cada módulo. | Fijar las alturas de los rectángulos de ejemplo. |
| Listado, formulario o detalle | Usa Flex cuando predomine un eje. Conserva el orden del contenido. | Reordenar el significado visualmente. |
| Menú expandido y contenido largo | Verifica espacio disponible y declara una región de scroll en el anfitrión. | Convertir el recorte del ejemplo Figma en contenido web inaccesible. |
| Documento entregado durante una conversación | Usa conversation-preview con Chat en Body y el visor en Document preview. | Sustituir Chat por una tabla fija o desanclar las regiones. |

La [enmienda de documento entregado](app-shell.document-preview.amendment.v1.0.0.md) añade dos variantes a las seis anteriores y documenta ancho, Slots, acciones y equivalencia web. El set vigente tiene ocho variantes; los contratos y QA anteriores conservan su alcance histórico.

## Description exacta

APP-SHELL-001 · Usa App Shell para componer navegación global y contenido de escritorio. Usa Grid para módulos alineados y Flex para flujos de un eje. Edita el Slot Body y conserva el orden al expandir Sidebar. Evita fijar las alturas de muestra. Ficha local App Shell / APP-SHELL-001.

## Aceptación

Verificar las ocho variantes, el Slot Body compartido, Right sidebar en conversación y Document preview donde corresponde, Grid nativo, spans y tamaños, dependencias, propiedades y control Secondary heredado. Probar edición de Body desde instancias y cambios de ejes cuando se modifique su composición. En web, probar menú, Grid/Flex, foco, flujo y anchos 1272/1110 en la referencia de 1440; la enmienda de espaciado rige sus nuevos gaps e insets.

## Corrección de bindings de componente · 2026-11-12

Los bindings propios y CSS consumen variables de App Shell. Cada alias conserva el rol y valor por tema. Las instancias heredan los tokens de su maestro. [Mapa delegado de la corrección](../tokens/component-layer.correction.json).
