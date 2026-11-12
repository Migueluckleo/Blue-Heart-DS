# Resolver el snapshot y su autoridad

## Rutas portables

Primero ejecuta el cargador descrito en [consumo remoto](remote-source.md). Resuelve las rutas respecto de la carpeta de ejecución verificada que devuelve, nunca respecto de un ZIP histórico:

| Archivo | Función |
|---|---|
| `assets/release.json` | Versión del paquete, `ds_digest`, nombre de skill y compañera. |
| `assets/snapshot-manifest.json` | `schema_version: 1`, mapa `files` de ruta relativa → SHA-256 de bytes y lista `components`. |
| `assets/design-system/` | Raíz del corpus incluido; las claves de `files` son relativas a esta raíz. |
| `references/components.json` | Copia generada de `components` para localizar familias, contratos, enmiendas y exports. |

Cada componente del índice ofrece `id`, `slug`, `name`, `contract`, `amendments`, `exports`, `version` y `figma`. `figma: null` significa que el índice no aporta un localizador comprobado; no significa que el componente no exista. Conserva IDs lógicos, rutas y versiones; no fabriques IDs de Figma a partir de ellos.

El verificador comprueba hashes, digest y correspondencia del índice. Es evidencia de integridad del paquete, no de aprobación de cada documento ni de actualidad de la biblioteca Figma. Si falla, identifica los archivos afectados; no normalices ni reescribas el snapshot para que pase. Se puede continuar preparación no dependiente de esos archivos, sin presentarla como validada.

## Lectura por necesidad

1. Busca la familia por función en el índice. Abre su contrato base y **todas las enmiendas aplicables a los requisitos que usarás**, además de dependencias relevantes.
2. Confirma estado documental, preparación por destino, fuentes y alcance en los registros incluidos. Una ubicación en `specs/` o un campo del índice no prueba aprobación humana. Conserva `DELEGATED_FOR_BUILD` y la evidencia histórica. Aplica `registry/DEC-AI-TECHNICAL-CLOSURE-001.md` del snapshot: la revisión humana es opcional y no bloquea consumo o cierre por sí sola; el QA obligatorio sí es necesario. No conviertas `PENDING` en revisión ejecutada.
3. Abre los JSON referenciados por esos contratos. Incluye las extensiones autorizadas y sus cadenas de aliases; no limites la lectura al inventario inicial si el contrato vigente delega campos a otros JSON.
4. Usa código web, snapshots, QA e inventarios observados para localizar o comparar implementaciones. Confirma reglas contra el contrato y sus datos canónicos.

El Markdown gobierna las reglas y el JSON los campos expresamente delegados. Una enmienda sustituye solo los requisitos/versiones identificados por su alcance; no elijas la de fecha o nombre más reciente. Ante fuentes normativas incompatibles registra `CONFLICT`, conserva ambas referencias y detén únicamente la decisión afectada.

Las instrucciones de migración incluidas en el corpus describen la reconstrucción de la biblioteca. Este encargo de pantallas no vuelve a ejecutar esa migración ni hereda autorización para modificar el archivo maestro. Las decisiones ordinarias de un prototipo local se documentan en su entrega, sin abrir contratos canónicos nuevos.

## Tokens y assets

Consulta los contratos de foundations y tipografía delegados por las familias activas. Lee las rutas de consumo web en `config/web-inputs.json`. Verifica estilos por rol, estado y variante y los IDs reales en el destino aplicable.

Consulta el corte vigente de `registry/contracts.md` y `registry/implementations.md`. El catálogo conserva 79 estilos; la excepción nativa0.1.2 requiere el overlay y QA de sus 103 consumidores. Un estado `VALIDATION_PENDING` no se interpreta como PASS. El mapping 0.1.1 y `qa/implementations/typography/Figma-blocker.md` conservan fallos históricos: no bloquean automáticamente familias independientes ni prueban el estado actual. Separa creación de estilos, consumo, web y validación del prototipo.

Usa un TextStyle compartido por texto o rango: conserva la asignación de los componentes del DS y elige entre los 18 estilos base para texto local nuevo según su `description`. Los complementarios tienen consumidores y restricciones explícitos; no son una escala alternativa para decorar pantallas. Importa el estilo verificado o materializa una copia local exacta del catálogo, con sus bindings disponibles, unidades y mapa de IDs. Comprueba métricas, decoración y overrides, además de `textStyleId`. Los cuatro estilos con `derivedFormattingFrom` incorporan UNDERLINE; no uses el estilo de origen más un setter posterior de decoración. La técnica por rango se detalla en [flujo Figma](figma-workflow.md). Un porcentaje no equivale a un FLOAT histórico con otra unidad.

El catálogo incluye tres recetas con `derivedFrom`: `ui-checkbox-label-scaled-two-thirds`, `ui-checkbox-label-scaled-five-sixths` y `micro-count-small-scaled-four-thirds`. Sus métricas materializadas se comparan con `recipeScale=1`. En las 103 entradas cubiertas por la enmienda nativa, el vínculo Figma se prueba mediante el estilo del principal real y la escala de instancia; no asignes el derivado a ese rango ni lo escales de nuevo. Consulta el overlay `qa/implementations/typography/consumption-v0.1.1/consumer-final.native-inheritance.v0.1.2.json` y verifica su estado, claves y hashes. Un ID local vacío solo es admisible con la cadena, escala, propiedades, ausencia de overrides incompatibles y evidencia causal exigidas. El QA del archivo de origen no valida automáticamente la nueva instancia del prototipo. Conserva cualquier bloqueo o pendiente no sustituido por evidencia específica.

Consulta los contratos de foundations y tipografía delegados por las familias activas. Lee las rutas de consumo web en `config/web-inputs.json`. Verifica estilos por rol, estado y variante y los IDs reales en el destino aplicable.

Para cada binding necesario registra la identidad lógica del token y su origen, propiedad consumidora, modo y variable real del prototipo. Verifica tanto el scope técnico como el significado: texto, superficie, borde, icono y foco no son intercambiables por compartir RGB. No pegues valores resueltos donde se exige un binding ni uses primitivas directamente en la UI.

Prefiere importar variables de biblioteca verificadas. Si hace falta materializar en el prototipo una copia local de tokens canónicos, copia solo el cierre de dependencias necesario con las mismas colecciones, modos, campos y aliases; mapea IDs origen → destino y léelos de vuelta. Esta réplica técnica no crea un token nuevo ni autoriza reinterpretarlo. Si falta un rol necesario en el corpus, registra el hueco; no inventes una extensión aplicando por tu cuenta reglas de la migración.

Conserva los assets de identidad que el contrato indique y verifica su fuente vigente.

Usa logos e identidad desde los assets y manifiestos canónicos incluidos y las enmiendas de la familia. No los redibujes, recolorees, recortes ni sustituyas por texto o imágenes generadas por conveniencia. Una imagen de referencia no demuestra el asset, el token ni la fuente exactos; registra lo que no pueda identificarse.
