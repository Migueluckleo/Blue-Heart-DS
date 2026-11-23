# Auditoría del JSON canónico y Caution Orange

Fecha: 23 de noviembre de 2026. Archivo Figma inspeccionado en solo lectura: `yZsIpXywybsPDytjolwcP4` (AI Blueheart DS). Sesión `62569b71-0387-4b02-afa5-c5625de4e8ce`. Resultado de cobertura y datos: **PASS**. Sincronía literal de metadatos Figma: **VALIDATED_WITH_EXCEPTIONS**, por cinco descripciones de Dropdown con redacción distinta, detalladas abajo. No hay omisiones verificadas que requieran modificar el JSON normativo.

## Qué constituye el canónico vigente

La autoridad vigente es el contrato `FOUNDATIONS-BLUEHEART-VARIABLES-001`, sus enmiendas delegadas y sus datos referenciados. No existe una nueva versión normativa monolítica que sustituya el histórico v0.1.2. La composición activa se declara, en orden y con SHA-256, en:

- [config/web-inputs.json](../../../config/web-inputs.json): 15 fuentes, incluida la política de visibilidad.
- [specs/tokens/blueheart-variables.v0.1.2.json](../../../specs/tokens/blueheart-variables.v0.1.2.json): base histórica de 1,187 variables; conserva el SHA-256 `09a96d3707735fa129e3cfa99de6ccac1a9d94ccf5cc19fa5d282de867629993`.
- [specs/tokens/caution.v1.0.0.json](../../../specs/tokens/caution.v1.0.0.json): datos delegados de Caution; SHA-256 `73296fcba662f7aacf2e6b6d637a4fe06ffb83e32e238db30cd7478725f3e217`.

El JSON consolidado de consumo es [implementations/web/src/generated/tokens.manifest.json](../../../implementations/web/src/generated/tokens.manifest.json), con 1,532 tokens y SHA-256 `ab28003ad794fd66403539d11852a0f445ced226de4ba42a63346fbfe1d1e6d2`. Su marca `DERIVED_NOT_AUTHORITY` se conserva: procede de la base y las enmiendas; no las reemplaza. El manifiesto web proyecta los campos que necesita el consumidor; no es un export completo de identidades Figma. [effective-inventory.json](effective-inventory.json) conserva para esta auditoría el inventario combinado completo, con tipos, IDs de origen/lógicos y targets explícitos disponibles, codeSyntax, descripciones, valores y scopes efectivos.

El adaptador conserva `primitive` singular para la enmienda Caution, tal como documenta su contrato. Se normaliza a `primitives` al comparar con la colección real Figma; no se añade una cuarta colección.

## Cobertura completa

| Colección Figma | Variables | Modos |
|---|---:|---|
| primitives | 201 | Value |
| semantic | 159 | Value |
| component | 1,172 | Contable, Administrativo, Servicios, Personas |
| Total | 1,532 | 5,048 entradas de valor por modo |

Tipos: 603 COLOR, 807 FLOAT y 122 STRING. No hay BOOLEAN en este corte. Cero variables faltantes, extra, nombres duplicados, tipos incompatibles o variables locales marcadas remote. Todas las definiciones se leyeron por sus IDs resueltos, en lotes acotados; no es una muestra.

Se contrastaron nombres, colecciones, tipos, modos, codeSyntax, scopes y destinos de aliases para los 1,532 tokens; se resolvieron las 5,048 entradas hasta sus literales finales. Cero aliases ausentes, ciclos, literales indebidos en capas semántica/componente o saltos de capa. Las 1,187 identidades y keys de destino del mapa base conservan su identidad; también coinciden los 89 targetId explícitos de datos posteriores y las 21 identidades Caution contra su comprobante de creación. El resto queda localizado por colección/nombre y por ID/key real en la captura de esta auditoría, sin confundirlos con IDs de origen o IDs lógicos.

Figma representa algunos canales de color con precisión float32. La máxima diferencia numérica observada frente a los valores canónicos es `2.6179294954076227e-08`, menor que la tolerancia `1e-7`; se conserva el RGBA canónico, sin redondearlo para imitar el almacenamiento Figma. No hay diferencias de color, alpha, número o string fuera de esa tolerancia.

Solo los 57 tokens `component/body/*` tienen scopes visibles, específicos y compatibles con su función. Los otros 1,475 tokens tienen `[]`; cero `ALL_SCOPES`. Las colecciones observadas mantienen `hiddenFromPublishing=false`. No se cambiaron publicación, bindings ni funciones de variables. La auditoría de tokens no vuelve a certificar todas las propiedades visuales de cada nodo o cada componente; verifica la definición y la cadena de sus tokens. La generación web verifica además las referencias de las 51 familias registradas.

## Caution Orange

Autoridad: [FOUNDATIONS-CAUTION-001](../../../specs/foundations/caution.amendment.v1.0.0.md), `DELEGATED_FOR_BUILD`, con la paleta aprobada y el namespace autorizado el 23 de noviembre. Es una gama independiente del grupo histórico `orange/*` y de la marca Servicios, que permanecen conservados.

| Primitiva | Hex | ID real Figma |
|---|---|---|
| caution-orange/100 | #FDEADB | VariableID:573:2 |
| caution-orange/200 | #F6C39A | VariableID:573:3 |
| caution-orange/300 | #F5A86B | VariableID:573:4 |
| caution-orange/400 | #F28F3D | VariableID:573:5 |
| caution-orange/500 | #EE7A1A | VariableID:573:6 |
| caution-orange/600 | #C45C0A | VariableID:573:7 |
| caution-orange/700 | #9A3F06 | VariableID:573:8 |
| caution-orange/800 | #662904 | VariableID:573:9 |
| caution-orange/900 | #3B1702 | VariableID:573:10 |

Todos tienen alpha 1. Los valores RGBA sin pérdida están en los datos delegados y en [comparison.json](comparison.json).

| Semántico | Alias primitivo | Resolución |
|---|---|---|
| caution-subtle | caution-orange/100 | #FDEADB |
| caution-accent | caution-orange/200 | #F6C39A |
| caution-default | caution-orange/500 | #EE7A1A |
| caution-strong | caution-orange/700 | #9A3F06 |

Los ocho tokens de componente conservan aliases idénticos en los cuatro modos:

- `body/color/bg/caution` → caution-subtle; scopes FRAME_FILL y SHAPE_FILL.
- `body/color/text/caution` → caution-strong; scope TEXT_FILL.
- `body/color/stroke/caution` → caution-strong; scope STROKE_COLOR.
- `body/color/shape/caution` → caution-strong; scope SHAPE_FILL.
- `badge/color/bg/caution` → caution-subtle; `badge/color/text/caution` y `badge/color/icon/caution` → caution-strong; scopes vacíos. El contrato conserva Badge sin stroke y su variante type=caution en las tres tallas.
- `linear-progress/color/indicator/caution` → caution-default; scopes vacíos. El contrato conserva type=caution con sus variantes de tamaño/estado y sin inventar un nuevo rol warning.

Son 9 primitivas + 4 semánticos + 8 de componente = **21 tokens**, todos presentes en el JSON delegado, Figma, consolidado web, catálogo y PO universal vigente. Sus IDs reales están entre `VariableID:573:2` y `VariableID:573:22`; no son los IDs lógicos `caution:*` usados por los datos.

## Metadatos observados con diferencias

Las cinco diferencias son redacción de `description` en [dropdown-menu.search.v1.0.0.json](../../../specs/tokens/dropdown-menu.search.v1.0.0.json), sin cambios de valores o significado funcional:

| Token | Descripción canónica | Descripción observada Figma |
|---|---|---|
| size/318 | Interior máximo de 318 px: viewport 320 menos dos bordes de 1 px. DERIVED. | Viewport interior de Dropdown: 320 px menos dos bordes de 1 px. |
| size-318 | Límite interior de viewport de 318 px. | Viewport interior máximo de Dropdown derivado de 320 − 2 × 1. |
| dropdown/size/menu-content-max | Dropdown menu · Límite interior de 318 px. | Dropdown · Límite interior de 318 px para conservar el scroll dentro del borde. |
| dropdown/size/menu-search-height | Dropdown menu · Reserva de altura de Search small de 32 px. | Dropdown · Reserva de altura para Search small de 32 px. |
| dropdown/spacing/menu-search-gap | Dropdown menu · Separación Search–Options 16 px, alias semantic spacing-lg. | Dropdown menu · Separación de 16 px entre Search small y Options. Alias semántico spacing-lg. |

Decisión: conservar las descripciones normativas. Figma observado es evidencia, no una autoridad que sustituya esos datos. No se declara igualdad literal de todas las descripciones ni se cambian reglas para hacer pasar la comparación. Es una excepción documental observada; no se encontró contradicción entre dos autoridades aprobadas. Su eventual sincronización literal en Figma queda fuera de la inspección de solo lectura de este encargo.

## Catálogo, Graphify y consumidores

El catálogo actual tiene digest DS `cd65e2e0fb99f86b3803714cd7a63c4a5047df75defd5b5e5767490a384c0c3d`, manifiesto `94971865ccb766c97b8792e171c5b5f03133fd683586f1b8df86cb7a34f8792d` y bundle `d2d3feba589522621a46885a85b9a97bef5e7966082a90c7eac6c62a2497660d`. Hashes del manifiesto y bundle correctos. Los 15 datos configurados, tokens.manifest y tokens.css coinciden tanto en el catálogo como en su bundle: 17 rutas verificadas.

La PO de uso diario instalada es `po-prototypes-autocontenida 1.1.0`. Su digest canónico coincide con el catálogo. Se decodificaron y contrastaron las 17 rutas en sus bancos de fuentes; cero diferencias. Los 106 archivos de su manifiesto instalado y del ZIP actual verifican sus hashes y ambos manifiestos son idénticos. Caution ya está en este consumidor; no se creó ni reinstaló ninguna variante PO.

El check del repositorio devuelve Graphify CURRENT (6,028 nodos, 11,923 aristas, 154/154 dependencias declaradas conectadas), vista CURRENT y lanzadores gestionados 1.0.9 CURRENT. El estado de esos lanzadores no certifica la frescura de otros snapshots instalados ni que se haya hecho push remoto.

Limitación de consumo preexistente: `blueheart-figma-local 1.0.5` y `blueheart-figma-portable 1.0.2+claude.2` conservan una selección anterior, sin `caution.v1.0.0.json` ni `inline-notification.indicator.v1.0.0.json`, y con una corrección de scopes anterior. Se comprobó también el banco comprimido de portable, no solo los paths físicos. Ambos paquetes conservan integridad de sus archivos; no son un corte completo de los 1,532 tokens actuales. No se modificaron esos snapshots cerrados ni se instalaron paquetes. El lanzador Figma GitHub consulta la fuente remota y no distribuye por sí mismo este inventario; esta auditoría local no certifica publicación en GitHub.

## Comandos y evidencia

- `graphify query 'canonical tokens caution orange' --budget 1300` y `graphify query 'FOUNDATIONS-CAUTION-001' --budget 1100`: descubrimiento acotado, seguido por lectura de autoridades.
- `python3 scripts/generate.py --check` desde implementations/web: PASS, 51 familias, cero derivados desactualizados.
- `python3 output/qa/canonical-tokens-2026-11-23/compare.py`: 1,532 tokens y 5,048 entradas contrastados; cero fallos de datos, aliases, modos, scopes, syntax o identidad; cinco diferencias de descripción enumeradas.
- `python3 output/qa/canonical-tokens-2026-11-23/validate-consumption.py`: 15 hashes, cobertura de todos los JSON de tokens bajo specs, 17 rutas catálogo/bundle y 21 identidades Caution, PASS.
- `./scripts/ds check --json --report output/qa/canonical-tokens-2026-11-23/ds-check.json`: PASS documental, cero findings; Graphify, vista y lanzadores CURRENT.
- [figma-variables.json](figma-variables.json): captura completa de los 1,532 IDs, keys, propiedades y valores por modo; SHA-256 `18e4c7083657fd021ee29b3d796f224815ffca7fa685bfc548ad2f8b37ae862a`.
- [comparison.json](comparison.json): comparación exhaustiva y localizadores de los 21 Caution.
- [consumption.json](consumption.json): hashes, catálogo, modos y cobertura de fuentes.
- [po-consumption.json](po-consumption.json): integridad de PO universal instalada y ZIP.
- [figma-consumers.json](figma-consumers.json): límites de frescura de los dos snapshots Figma anteriores.
- [ds-check.json](ds-check.json): vigencia documental y del grafo.

No se ejecutaron nuevas pruebas de interacción o build: no cambió código ni ningún dato de tokens. No se sustituyó el JSON histórico, no se generó una versión normativa ficticia ni se hicieron instalaciones, commit, push o publicación Figma. Solo se incorporó evidencia operativa bajo output/qa, excluida del corpus y del catálogo; por ello la validación CURRENT existente permanece aplicable. Uso de tokens/cuota de las herramientas: UNAVAILABLE, no se atribuye cero consumo.
