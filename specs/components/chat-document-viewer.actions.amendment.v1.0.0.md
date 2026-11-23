---
contract_schema: sdd-project/0.2
contract_id: CHAT-DOCUMENT-VIEWER-001-ACTIONS
name: Chat Document Viewer · Slot de acciones y controles Ghost
type: amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
amends: CHAT-DOCUMENT-VIEWER-001
base_contract: specs/components/chat-document-viewer.contract.v1.0.0.md
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["430:15516"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/tokens/chat-document-viewer.v1.0.0.json
source_data_digest_sha256: 5d3792222fde1e9f92b5bace9ad55021c3fc747e9abd45d869e3a68ce576bde4
data_refs: [specs/tokens/chat-document-viewer.v1.0.0.json]
dependencies: [CHAT-DOCUMENT-VIEWER-001, BUTTON-001, ICON-BUTTON-001]
---

# Chat Document Viewer · Slot de acciones y controles Ghost

## Alcance, autoridad y evidencia

Solicitud EXPLICIT del 19 de noviembre de 2026: documentar las modificaciones del usuario en [430:15516](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=430-15516). Esta enmienda sustituye únicamente CDV-02 y el alcance de acciones de las secciones Anatomy, Properties, States, Composition rules, Design ↔ Code mapping y Acceptance criteria del [contrato base](chat-document-viewer.contract.v1.0.0.md). Conserva identidad, versión 1.0.0, datos delegados y los demás requisitos. La lectura del 18 de noviembre permanece como evidencia histórica.

La [inspección MD](../../sources/figma-snapshots/chat-document-viewer-2026-11-19/component-contract.md) y su [YAML sincronizado](../../sources/figma-snapshots/chat-document-viewer-2026-11-19/component-contract.yaml) son evidencia OBSERVED de solo lectura, no una segunda fuente normativa. La delegación documental se registra tras [QA](../../qa/contracts/chat-document-viewer.actions.v1.0.0.review.md), conforme a DEC-AI-TECHNICAL-CLOSURE-001. La lectura inicial conserva su alcance histórico; la implementación y pruebas posteriores de este encargo se registran en el QA de cierre enlazado abajo.

## Cambios y anatomía vigente

| Requisito | Regla vigente | Procedencia |
|---|---|---|
| CDV-A01 / sustituye CDV-02 | El contenido inicial de actions usa Button/secondary medium/default para Descargar xls y dos Icon Button/ghost medium/default para Expandir y Cerrar; selected=false, badge oculto. | OBSERVED en 430:13899, 430:13900 y 430:13901. |
| CDV-A02 | actions es Slot nativo 430:13897, vinculado a actions#519:0. Su hijo inicial es un toolbar FRAME 430:13898 que contiene los tres controles; no son tres hijos directos del Slot. | OBSERVED, componentPropertyReferences.slotContentId. |
| CDV-A03 | Conservar las keys Title#453:2, Description#453:3 y preview#430:0. El ID principal 430:15516 y key 8fd980d14fcda0e04773de154aeaa23677f9d4d7 permanecen. | Comparación con la lectura histórica. |
| CDV-A04 | Los controles reutilizan sus tokens Button/Icon Button; las capas propias conservan chat-document-viewer/*. No agregar tokens ni reemplazar aliases por literales para describir este cambio. | OBSERVED y política TOKEN-QA-01/03. |

Raíz vertical → Slot actions → header con Title/Description → Slot preview. El toolbar es contenido predeterminado reemplazable de actions. Las regiones de búsqueda, visualización y tabla dentro de preview siguen siendo ejemplos de producto y no anatomía obligatoria del visor.

## Propiedades y configuración de Slots

| Región | Identificador y propósito | Configuración nativa observada | Contenido inicial |
|---|---|---|---|
| actions | actions#519:0, acciones del documento; propietario: visor/contenido del anfitrión. | stretchChildOnInsert=false; displayEmptyByDefault=false; minChildren=null; maxChildren=null; allowPreferredValuesOnly=false; preferredValues=[]. | Un toolbar con Secondary y dos Ghost. |
| preview | preview#430:0, contenido específico del documento. | stretchChildOnInsert=true; displayEmptyByDefault=false; minChildren=null; maxChildren=null; allowPreferredValuesOnly=false; preferredValues=[]. | Tres bloques de muestra. |

P-SLOTS REQUIRED para ambas regiones. Permitir insertar, retirar, sustituir y reordenar contenido sin editar el principal ni desvincular instancias. Las operaciones se comprobaron en una instancia temporal vinculada al maestro; el readback y las cantidades/casos están en el [QA Figma](../../implementations/figma/chat-document-viewer-actions-2026-11-19/slots-qa.json). Null registra ausencia de un límite configurado; no promete cardinalidad o rendimiento ilimitados.

actions permite composición de controles oficiales compatibles con la acción del documento. La configuración no impone una lista técnica de tipos preferidos. La descripción de actions#519:0 se completó sin cambiar su key ni slotSettings; el [readback de metadatos](../../implementations/figma/chat-document-viewer-actions-2026-11-19/description-readback.json) conserva el texto exacto. Title y Description mantienen las propiedades TEXT y defaults anteriores; el visor no adquiere nuevas variantes de documento, tamaños ni estados propios.

## Layout, medidas y estilos

Referencia OBSERVED 755 × 717 px. Raíz VERTICAL, ancho/alto FIXED en el principal, gap 32 y padding 0. Las instancias siguen sujetas al sizing del anfitrión definido en el contrato base.

| Capa | Sizing y referencia | Layout y responsabilidad |
|---|---|---|
| actions 430:13897 | FILL/HUG, 755 × 40 | HORIZONTAL, NO_WRAP, gap 0 y padding 0. No estira automáticamente los hijos nuevos. |
| toolbar 430:13898 | FILL/HUG, 755 × 40 | HORIZONTAL/WRAP, MAX/CENTER, itemSpacing=16 y counterAxisSpacing=16, padding 0. El toolbar es quien ocupa el ancho y alinea los controles a la derecha. |
| Descargar 430:13899 | HUG/FIXED, 152 × 40 | Secondary medium; label Descargar xls, icono izquierdo visible DownloadSimple Outline/Light, derecho oculto. |
| Expandir 430:13900 | FIXED/FIXED, 40 × 40 | Ghost medium, icono activo ArrowsOutSimple Outline/Light de 20 × 20. |
| Cerrar 430:13901 | FIXED/FIXED, 40 × 40 | Ghost medium, icono activo XCircle Outline/Light de 20 × 20. |
| header 430:13904 | FILL/HUG, 755 × 50 | VERTICAL, gap 4; Title y Description FILL/HUG. |
| preview 430:13907 | FILL/FILL, 755 × 563 | VERTICAL, gap 16, clipping activo y overflow VERTICAL. |

Las posiciones de referencia de los tres controles son x=491, 659 y 715, y=0. No son offsets normativos: provienen del toolbar alineado al final con gaps de 16. Ghost conserva radio 8 y carece de fill/stroke en default. La raíz conserva superficie propia, sin borde ni sombra. Conservar geometría, tokens y temas de los controles oficiales.

El contenido insertado en actions define su composición y sizing; stretch=false no equivale a hacer HUG al Slot ni a forzar FILL a cada hijo. Se probaron vacío, 1/5 controles directos, inserción/retiro/sustitución/orden y conservación al editar Title/Description. Un toolbar con 12 Ghost a 320 px produjo dos filas y 96 px de alto. La muestra no fija máximos. En vacío, el editor Figma conserva una caja de Slot de 40 px; la adaptación web usa altura de contenido 0 sin contenido ni mensaje ficticio. Esta diferencia del editor se registra explícitamente; no se introduce un mínimo de producto ni un token nuevo. El maestro no tiene variantes, por lo que SLOT-QA-08 de alternar variantes es NOT_APPLICABLE; la preservación al editar propiedades sí se ejecutó.

## Tokens y tipografía conservados

Los 16 tokens propios chat-document-viewer/* coinciden con la lectura del 18 de noviembre en nombre, valores/aliases por los cuatro modos, scopes=[] y codeSyntax. Sus cadenas actuales resuelven a 15 semánticos y 15 primitivas, sin referencias remotas. Los dos estilos locales conservan IDs, keys, métricas y bindings: Title Manrope Bold 20/AUTO/0.02 px; Description Regular 14/AUTO/0.014 px. [Evidencia de comparación](../../sources/figma-snapshots/chat-document-viewer-2026-11-19/validation.json) y [cadenas reales](../../sources/figma-snapshots/chat-document-viewer-2026-11-19/token-aliases.json).

La lectura de los cuatro aliases no es una nueva prueba visual de los cuatro temas. El JSON delegado incluye además el token de ancho de Chat perteneciente a App Shell; no se cuenta como token propio del visor. El SHA-256 del JSON permanece 5d3792222fde1e9f92b5bace9ad55021c3fc747e9abd45d869e3a68ce576bde4. Solo body/* es interfaz visible de selectores; los controles conservan sus dependencias internas operativas.

## Comportamiento, accesibilidad y dependencias

Descargar, expandir/restaurar y cerrar siguen delegados al anfitrión conforme al contrato base. La lectura no encontró destinos de click de producto en el visor: las reacciones observadas son hover/CHANGE_TO de sus dependencias. No atribuir esos eventos a una descarga o navegación ya implementada en Figma.

Los Ghost necesitan nombres accesibles en web según ICON-BUTTON-001. El estado controlado y la gestión de foco del contrato base siguen vigentes; un glifo por sí mismo no acredita nombre, teclado ni cumplimiento WCAG. El diseño observado mantiene selected=false en ambos controles; no se deduce un estado visual alterno nuevo.

Dependencia directa añadida: ICON-BUTTON-001, sin alterar sus maestros. En el subárbol completo se resolvieron 501 instancias y 47 componentes (28 locales, 19 remotos), 219 variables locales y 18 estilos locales. Los remotos son iconos activos identificados por ID/key/set. Su biblioteca, archivo, URL, organización y versión no son expuestos por MCP: NOT_EXPOSED_BY_FIGMA_MCP. No certificar procedencia Phosphor solo por el nombre; conservar la evidencia histórica de procedencia como tal.

## Design ↔ Code mapping y estado de consumo

Figma: actions#519:0 y preview#430:0 son Slots nativos. React: `actions?: ReactNode` reemplaza el contenido completo de la región de acciones; `children` sigue siendo el contenido de preview. `actions === undefined` muestra el toolbar predeterminado; `null` lo deja vacío. Un elemento, arrays y composición propia permiten insertar, retirar, sustituir y ordenar contenido sin modificar el componente. No se interpreta la cantidad de la muestra como límite.

La región web `data-slot="actions"` conserva ancho del contenedor, disposición horizontal sin wrap, gap/padding cero y no estira automáticamente sus hijos. `.bh-document-viewer-toolbar` es el contenedor FILL con WRAP, alineación al final y gaps de 16 que reproduce el contenido inicial. Un hijo directo conserva su propio sizing; un toolbar suministrado debe declarar que llena el espacio.

Default: Button Secondary medium con DownloadSimple y dos Icon Buttons Ghost medium con ArrowsOutSimple/XCircle. Los labels existentes siguen siendo nombres accesibles; los callbacks ausentes deshabilitan cada control predeterminado. En la adaptación técnica DERIVED, `expanded=true` usa Restaurar/ArrowsInSimple y `selected=true` del Ghost para conservar aria-pressed; false coincide con selected=false observado. Esto no crea una variante del visor ni afirma que Figma tenga un prototipo expandido. Cerrar es acción momentánea sin selected.

Los props de labels/callbacks gobiernan los controles predeterminados. Cuando se proporciona actions, el anfitrión aporta nombres, handlers, disponibilidad y foco de sus propios controles; no se duplican acciones predeterminadas. El estado del documento y su contenido no se reinician al cambiar actions. El [QA de implementación](../../qa/implementations/chat-document-viewer.actions.v1.0.0.review.md) es la autoridad del resultado ejecutado. El QA del 18 de noviembre permanece histórico.

## Guía semántica normativa

Usa Chat Document Viewer para leer un documento entregado junto a la conversación. Title y Description identifican el resultado; preview contiene el documento específico de producto. actions aloja controles oficiales para actuar sobre ese documento. Su muestra usa Descargar xls Secondary y Expandir/Cerrar Icon Buttons Ghost medium; la composición y cantidad pueden variar sin convertirlas en variantes de documento.

Conserva ambos Slots y sus responsabilidades de sizing: preview estira hijos al insertarlos; actions no lo hace automáticamente. Usa un toolbar FILL con alineación al final y separación de 16 px para reproducir la muestra. Mantén los nombres accesibles de los iconos y la responsabilidad del anfitrión sobre archivo, visibilidad y foco. El contenido tabular es un ejemplo. En web usa actions para contenido de acciones y children para preview. Omite actions para el toolbar estándar o pasa null para vacío; el anfitrión conserva accesibilidad y comportamiento del contenido que suministra.

## Description exacta

CHAT-DOCUMENT-VIEWER-001 · Presenta un documento entregado junto a Chat. Edita Title, Description y los Slots actions y preview desde la instancia. La muestra usa Descargar xls Secondary y Expandir/Cerrar Icon Buttons Ghost medium. El anfitrión controla archivo, visibilidad y foco; el documento específico permanece en preview.

Esta Description se sincronizó y se leyó de vuelta en el maestro. actions#519:0 tiene ahora la descripción: «Acciones del documento. Inserta, retira, sustituye o reordena controles oficiales. La muestra usa Descargar Secondary y Expandir/Cerrar Ghost; el contenido no se estira automáticamente.». Se conservaron IDs, keys, settings, bindings y publicabilidad.

## Aceptación y cierre

QA documental: reconciliar las cuatro propiedades y sus keys, identidad principal, anatomía Slot → toolbar, tamaños, defaults, nuevo contrato de dependencia, tokens y estilos conservados; verificar sincronía MD/YAML, enlaces, fuentes e inventarios. Los 1,140 nodos incluyen 422 invisibles, sin pendientes ni truncamiento final. Los intentos que excedieron el presupuesto de salida se resolvieron por lecturas acotadas.

El cierre actual verifica SLOT-QA-01–07/09, la no aplicabilidad de variantes del anfitrión y la preservación de propiedades. TOKEN-QA-01 usa el verificador del proyecto con visor, Ghost medium y Secondary medium: 229 bindings, 26 overrides y cero hallazgos, con cadenas por los cuatro modos. Los 16 tokens propios y dos estilos permanecen; solo 52 body/* tienen scopes visibles compatibles. El marco temporal de QA se retiró por su ID real, y la página de familia conserva únicamente su maestro. El [readback completo](../../implementations/figma/chat-document-viewer-actions-2026-11-19/full-final-readback.json) conserva 1,140 nodos incluidos 422 invisibles.

Para web ejecutar generación y TOKEN-QA-02, TypeScript, pruebas, build y browser QA del visor/App Shell: geometría estándar, Ghost, nombres, callbacks, teclado, foco/borrador, disabled, acciones vacías/1/5/12/reordenadas, preview, 320 px y cuatro temas. El informe de implementación declara resultados y límites reales. Cerrar fichas, registro, catálogo, ambas guías y Graphify del mismo corte según P05/P08. No publicar ni instalar; conservar la versión 1.0.0.

## Changelog

2026-11-19: enmienda documental por modificaciones del usuario: nuevo Slot actions y reemplazo de Expandir/Cerrar Text por Icon Buttons Ghost. Identidades y datos conservados; Description Figma y paridad web registradas como pendientes concretos.

2026-11-19, cierre de implementación: descripción del maestro y Slot sincronizadas; React incorpora actions y Ghost oficiales, preservando callbacks y preview. Evidencia separada del QA documental inicial, sin publicación ni instalación.
