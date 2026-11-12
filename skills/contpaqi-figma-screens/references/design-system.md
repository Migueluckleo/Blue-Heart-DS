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

Lee `config/figma-links.json` y `config/web-inputs.json` del corte. En componentes vinculados, conserva la tipografía del principal y verifica los bindings, estilos compartidos existentes y métricas por rango que correspondan al contrato. Para texto propio, aplica las métricas sustentadas por el brief y las fuentes del prototipo. Si eliges un estilo de forma local, documenta esa decisión en el traspaso.

Para cada binding necesario registra la identidad lógica del token y su origen, propiedad consumidora, modo y variable real del prototipo. Verifica tanto el scope técnico como el significado: texto, superficie, borde, icono y foco no son intercambiables por compartir RGB. No pegues valores resueltos donde se exige un binding ni uses primitivas directamente en la UI.

Prefiere importar variables de biblioteca verificadas. Si hace falta materializar en el prototipo una copia local de tokens canónicos, copia solo el cierre de dependencias necesario con las mismas colecciones, modos, campos y aliases; mapea IDs origen → destino y léelos de vuelta. Esta réplica técnica no crea un token nuevo ni autoriza reinterpretarlo. Si falta un rol necesario en el corpus, registra el hueco; no inventes una extensión aplicando por tu cuenta reglas de la migración.

Conserva los assets de identidad que el contrato indique y verifica su fuente vigente.

Usa logos e identidad desde los assets y manifiestos canónicos incluidos y las enmiendas de la familia. No los redibujes, recolorees, recortes ni sustituyas por texto o imágenes generadas por conveniencia. Una imagen de referencia no demuestra el asset, el token ni la fuente exactos; registra lo que no pueda identificarse.

La decisión de iconografía Phosphor en `assets/design-system/references/PHOSPHOR-ICONS.md` se aplica a todo BlueHeart. Consume la key oficial verificada en Figma y el paquete oficial en React. Conserva peso, tamaño y variables del componente consumidor.
