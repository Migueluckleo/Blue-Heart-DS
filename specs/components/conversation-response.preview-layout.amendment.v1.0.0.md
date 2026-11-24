---
contract_schema: sdd-project/0.2
contract_id: CONVERSATION-RESPONSE-001-PREVIEW-LAYOUT
name: Conversation Response · Preview con título y Badge en fila
type: amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
amends: CONVERSATION-RESPONSE-001
base_contract: specs/components/conversation-response.contract.v1.0.0.md
applies_to: [CONVERSATION-RESPONSE-001]
figma_page_name: Conversation Response
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "222:309"
target_node_ids: ["222:111"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/conversation-response.preview-layout.v1.0.0.json
source_data_digest_sha256: 380474480ca64ef1e329121841de5e349dd829154e625a2992f93aa332e4af80
data_refs: [specs/data/conversation-response.preview-layout.v1.0.0.json, specs/data/conversation-response.v1.0.0.json]
dependencies: [CONVERSATION-RESPONSE-001, BADGE-001, FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Conversation Response · Preview con título y Badge en fila

## Alcance y precedencia

EXPLICIT, 2026-11-24: «Modifiqué este componente, documenta el cambio», con [referencia 222:111](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=222-111). Se documenta el auxiliar privado `.Conversation / Preview` de Conversation Response. Esta enmienda concreta su anatomía, sizing y composición actuales; sustituye para ese auxiliar cualquier referencia al título y Badge apilados verticalmente. Conserva el contrato base v1.0.0, el set de agentes, las cinco regiones Slot y las reglas de contenido y comportamiento. No crea una familia pública de Preview.

La [lectura MD](../../sources/figma-snapshots/conversation-preview-2026-11-24/component-contract.md), su [YAML](../../sources/figma-snapshots/conversation-preview-2026-11-24/component-contract.yaml) y la [captura](../../sources/figma-snapshots/conversation-preview-2026-11-24/preview.png) son evidencia OBSERVED de solo lectura. Los [datos delegados de layout](../data/conversation-response.preview-layout.v1.0.0.json) rigen exclusivamente la estructura, sizing, propiedades y localizadores de bindings de esta revisión. Los valores, aliases y descriptions de tokens siguen en sus fuentes canónicas existentes; el snapshot no los sustituye. Delegación documental conforme a DEC-AI-TECHNICAL-CLOSURE-001 y [QA documental](../../qa/contracts/conversation-response.preview-layout.v1.0.0.review.md).

## Cambio observado y referencia anterior

`Preview details` 222:113 ahora es HORIZONTAL y contiene Title seguido del Badge «Tabla» en la misma fila. El título llena el ancho disponible y el Badge conserva su ancho de contenido. La referencia histórica del 12 de noviembre muestra `Preview details` VERTICAL en el origen remoto 218:1228; la implementación web también conserva esa disposición vertical. La evidencia histórica corresponde a otro ID: su caja de 544×115 no se presenta como una medición inmediatamente anterior del maestro local 222:111. La caja actual leída sí es 544×82.

## Anatomía, layout y tamaños

| Requisito | Regla documentada | Evidencia actual |
|---|---|---|
| CR-PREVIEW-01 | Conservar el auxiliar dentro de Conversation Response: Table → fila Preview details → Title y Badge. Maestro 222:111, key d654798f1650f1f46d2e0f62ba4ed15e5f08639d, página 222:309. | COMPONENT local, sin ejes propios de variantes. |
| CR-PREVIEW-02 | La fila de detalles es HORIZONTAL, NO_WRAP, FILL/HUG, alineación MIN/MIN y gap 8 mediante conversation-response/spacing/stack. Padding cero con spacing/none. | 222:113; referencia 470×48. El nombre existente del token se conserva aunque ahora se use en fila. |
| CR-PREVIEW-03 | Title usa FILL/HUG, auto-resize HEIGHT, sin truncamiento ni límite de líneas configurado. Badge usa HUG/HUG y queda después del título, alineado arriba. | 222:114 mide 416×48; 222:120 mide 46×24. |
| CR-PREVIEW-04 | Conservar raíz HORIZONTAL, NO_WRAP, padding 16 por lado, gap 16 y Table Outline/Light fijo de 24×24. La altura se ajusta al contenido; las instancias insertadas en Previews llenan el ancho. | Maestro FIXED/HUG 544×82; consumidores BENI/NAVI FILL/HUG. |
| CR-PREVIEW-05 | Conservar superficie, borde INSIDE de 1, radio 8 y ausencia de efectos. strokesIncludedInLayout=true. | Bindings propios Conversation Response; Badge usa sus propios tokens. |

Los anchos y altos de la tabla son medidas de esta muestra, no mínimos ni máximos universales. DERIVED: `470 = 544 − 2×(16+1) − 24 − 16`; `416 = 470 − 8 − 46`; `82 = max(48,24) + 2×(16+1)`. El borde participa en layout. No se fija altura de 82 px ni ancho de 416 px al título.

## Propiedades, tipografía y contenido

CR-PREVIEW-06: el único prop propio sigue siendo `Title#765:0`, tipo TEXT, con el título de muestra «Distribución de facturas de personas físicas con IVA retenido en marzo 2025». El ejemplo no impone longitud, fecha o regla de negocio. Title usa Manrope Bold 16/24 px, tracking 0; el texto observado ocupa dos líneas por wrapping. Su textStyleId está vacío y sus métricas están ligadas a variables de componente; no se inventa un estilo tipográfico compartido.

El Badge activo es local 64:115, type=subtle, size=medium, label «Tabla», ambos iconos opcionales apagados. Su label usa `badge/label-medium`, Manrope Regular 12/16 px, tracking 0. Los props y variantes de Badge pertenecen a su dependencia; no se convierten en nuevos ejes o props públicos de Preview.

## Tokens y dependencias

CR-PREVIEW-07: conservar la cadena component → semantic → primitives y la visibilidad interna scopes=[]. Se leyeron 29 variables ligadas directamente: 14 de Conversation Response y 15 de Badge; las cadenas requieren otras 44 variables (22 semantic y 22 primitives). Las 73 son locales y resuelven en Contable, Administrativo, Servicios y Personas, sin referencias pendientes. El YAML conserva IDs, keys, usos y evidencia; no es un catálogo normativo paralelo de valores.

Las 14 referencias propias cubren inset 16, stack 8, none 0, radius 8, stroke 1, icon 24, superficie, borde y texto, además de familia, estilo, tamaño, interlineado y tracking. El borde observado resuelve a brand-accent → blue/200 (#BFCEFE) en las cuatro cadenas; no se cambia a otro color por producto. La superficie resuelve blanco y el texto neutral-maximum. No se añadieron tokens ni se modificaron sus aliases, scopes o codeSyntax.

Cuatro instancias del subárbol resuelven a tres componentes únicos: Badge local y dos iconos remotos activos, Table Outline/Light y Presentation Outline/Fill. Las dos Presentation están ocultas dentro de Badge; también se inspeccionaron sus vectores. La identidad y key de los iconos están resueltas, pero biblioteca, archivo y versión externos no son expuestos por MCP (`NOT_EXPOSED_BY_FIGMA_MCP`). La procedencia histórica Phosphor no se presenta como metadata externa obtenida en esta lectura.

## Composición, herencia y comportamiento

CR-PREVIEW-08: las instancias 222:172 (BENI) y 222:267 (NAVI), dentro de Previews, conservan main=222:111, FILL/HUG y la fila horizontal. Sus overrides leídos solo afectan width/height del nodo raíz; los detalles heredan la composición. La revisión no añade Slots al auxiliar: P-SLOTS NOT_APPLICABLE por contenido fijo más propiedad de texto. La familia anfitriona mantiene P-SLOTS REQUIRED; sus cinco regiones siguen bajo el contrato base y no se revalidan por esta inspección acotada.

El auxiliar sigue siendo una tarjeta informativa sin foco ni navegación conforme al contrato base. Las reactions leídas están vacías; la nueva fila no introduce abrir documento, descarga o expansión. No se infieren ARIA, teclado o evaluación WCAG desde esta apariencia. Las dimensiones y herencia se verificaron por lectura; no se ejecutaron redimensionamientos ni cambios de contenido en Figma.

## Mapeo web, QA y cierre

La API `ConversationResponsePreview({title})` no necesita nuevos props para representar esta revisión. **STALE en el alcance de layout:** [conversation-response.tsx](../../implementations/web/src/components/conversation-response.tsx) todavía usa `flex-col` para el contenedor de título y Badge. La actualización de código y su QA quedan pendientes de una tarea de implementación; este encargo documenta el cambio y no afirma paridad visual web. El QA histórico del componente conserva su alcance anterior.

Aceptación documental: verificar los ocho requisitos contra la lectura real, reconciliar MD/YAML y datos, inventario de 11 nodos sin pendientes, cuatro instancias/tres dependencias, 73 variables/un estilo, aliases por cuatro modos y herencia de los dos agentes. Preservar snapshots originales, versiones y funciones. Registrar por separado la diferencia web y las limitaciones de responsive/accesibilidad. Mantener contratos, registros, ficha técnica, catálogo e índice Graphify del mismo corte local; los lanzadores conservan versión. No se instalan paquetes ni se publica desde esta tarea documental.

## Historial

2026-11-24 · Enmienda documental sobre v1.0.0: título y Badge en fila, sizing y geometría observada, herencia BENI/NAVI, bindings y diferencia web registrados. Figma se inspeccionó sin escrituras.
