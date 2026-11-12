# Operación local del proyecto · herramientas de prioridades altas

Implementación autorizada por «Dale empieza con las Altas», 2026-10-13. Complementa P01/P05/P06; no cambia autoridad documental, requisitos de diseño ni aprobaciones.

## Inicio

Desde la raíz:

~~~sh
./scripts/ds check
./scripts/ds status SEARCH-001
./scripts/ds graph plan
~~~

Los tres comandos leen el estado actual. No escriben, instalan, consultan Figma ni llaman servicios externos. check sale con código 0 si pasan sus controles, 1 ante fallos y 2 ante un bloqueo. PASS es documental/determinista, nunca aprobación humana ni QA visual.

Runtime comprobado: Graphify 0.9.65 y Python 3.12, resuelto desde .graphify_python o DS_PYTHON. Ruby/Psych del sistema procesa YAML con carga segura y detección de claves repetidas. No hay instalación implícita. Si faltan capacidades, el comando informa el bloqueo; primero preparar el entorno conforme a P01.

## Vista por familia

Vista derivada (antecedente histórico) y datos en registry/generated/project-status.json:

~~~sh
./scripts/ds status --write
./scripts/ds status CHAT-SECTION-001 --json
~~~

El generador lee contratos y enmiendas con identidad y metadatos declarados. Las extracciones de origen son evidencia, no bases normativas. Las versiones elegibles son APPROVED o DELEGATED_FOR_BUILD, con estados separados. Un DRAFT no desplaza una base vigente.

También reconoce la cabecera explícita ID · nombre · versión y la etiqueta Estado de contratos antiguos sin frontmatter (Header, Modal, Sidebar, App Shell). No deduce estado desde un párrafo QA. Las enmiendas sin relación automática a una base quedan visibles en un índice aparte, sin inventar consumidor.

Entre bases usa únicamente supersedes explícito o la composición declarada por base_version. Si quedan varias candidatas elegibles, marca AMBIGUOUS y falla; no escoge por fecha ni mayor versión. Los requisitos heredados del baseline siguen enlazados. Una enmienda parcial no sustituye toda la base.

Las enmiendas con applies_to, base_contract o la misma identidad se agrupan sin aplanar alcance. Las relaciones que solo existen en prosa tienen selectores de evidencia en [configuración](../config/ds-project.json), ligados a hash y fragmento. Si cambian, falla el selector hasta revisarlo. Configuración guarda localizadores, no valores de diseño ni estados editables.

La implementación se asocia por referencias contractuales exactas o enlaces explícitos desde contrato/enmienda. Se muestran valores declarados por archivo y alcance; no se sintetiza VALIDATED global desde varios PASS. Campos ausentes: UNKNOWN. QA, publicación y auditoría humana siguen separados. Las listas de auditoría (antecedente histórico) conservan autoridad y alcance.

Los cierres y excepciones que resuelven ambigüedades conocidas (Chat, Logos, Search, seis familias, Radio/Checkbox y bases sin promover) se citan desde secciones explícitas de la auditoría/matriz. Configuración guarda título, hash y destinatarios; el texto se lee de su propietario. No usa «última fecha gana» ni mantiene una cola editable paralela.

Los outputs son derivados excluidos del corpus Graphify para evitar realimentación. check compara contenido y hashes de fuentes con una regeneración en memoria; editar la vista o cambiar una fuente la vuelve STALE.

## Controles documentales

- Sintaxis JSON, YAML y frontmatter detectados, incluidas claves duplicadas.
- Destinos de enlaces locales Markdown inline y definiciones fuera de bloques de código. No comprueba anclas, URLs remotas ni renderizado.
- Estados/versiones declarados; referencias de datos; dependencias documentadas cuando hay identidad resoluble.
- Hash de datos canónicos protegidos y pares source_data_ref/source_data_digest_sha256.
- Resolución de bases y vigencia de relaciones de prosa.
- Versión del paquete entre configuración, AGENTS, README y changelog.
- Vigencia de vista/grafo: archivos nuevos/cambiados/eliminados, integridad y hashes de outputs.

Un enlace histórico solo se clasifica HISTORICAL si coinciden ruta, línea, enlace y SHA-256. No se altera el respaldo ni se permite una excepción general para archive. Una modificación o enlace nuevo falla.

Las dependencias externas sin identidad registral resoluble se notifican WARNING; no se inventan contratos para hacerlas pasar. Un ID o nombre de icono observado no demuestra una dependencia local lista.

Durante preparación, check --docs-only omite expresamente los gates de vista/grafo y no acredita CURRENT. Para guardar evidencia se requiere --report con una ruta local. Estos controles son convenciones operativas, no un esquema externo aprobado de diseño.

## Cierre Graphify

~~~sh
./scripts/ds graph plan
./scripts/ds status --write
./scripts/ds graph prepare --run AAAA-MM-DD-lote
~~~

plan no escribe. prepare crea un lote nuevo, preserva outputs, fija hashes de todas las fuentes/configuración/prompt y produce plan semántico y listas chunk-NN.files.json. Nunca reutiliza nombre de lote ni sobrescribe respaldo. Sin delta y con outputs verificados, no regenera.

El agente sigue la skill Graphify para completar cada chunk-NN.json: leer archivos nuevos/cambiados, preservar procedencia histórica y distinguir propuestas de normas. El software no sustituye esa lectura por títulos. Si falta un fragmento, cobertura o evidencia, se detiene y conserva el grafo previo. No requiere clave API ni autoriza servicios externos.

Con los fragmentos completos:

~~~sh
./scripts/ds graph close --run AAAA-MM-DD-lote
./scripts/ds check
~~~

El cierre valida documentos/vista, extrae AST, agrega referencias y datos de diseño, fusiona semántica y genera JSON/reporte/HTML en staging. Lee outputs y verifica cobertura, integridad, consultas por identidad y manifiesto. Antes de publicar vuelve a comprobar **todas** las fuentes contra el plan. Cambiar una fuente después de preparar exige otro lote; no certifica contenido nuevo con semántica antigua.

Los destinos se reemplazan después de verificar, con recuperación desde respaldo ante errores ordinarios. El marcador ds-closure.json se publica al final e incluye hashes: una interrupción entre reemplazos se detecta como STALE. No se promete atomicidad de múltiples archivos frente a corte eléctrico. Conservar before para recuperación.

Si los outputs vigentes cambian después de prepare, close falla antes de publicar para conservar ese corte. El log detallado vive en engine.log del lote. No admite deltas semánticos fuera del plan preparado.

El HTML usa comunidades con más de 5,000 nodos. Uso medido de extracción semántica: UNAVAILABLE si la sesión no entrega contadores, nunca cero atribuido. El corpus admite datos y diagramas suplementarios declarados. Este corte carece de datos de diseño; se conservan los filtros de secretos.

graphify update . por sí solo hace AST y no acredita cierre documental. La entrada de cierre P05 es scripts/ds close --run ID; el script fechado bajo graphify-out queda como evidencia histórica.

## Configuración y mantenimiento

config/ds-project.json declara versión comprobada, exclusiones de derivados, suplementos, datos protegidos, consultas, excepciones históricas exactas y selectores de relaciones. Cambiar configuración invalida el cierre. Ampliar fuentes, filtros o excepciones exige evidencia/registro; nunca ocultar un FAIL.

Los verificadores .cjs existentes continúan como evidencia y controles por componente. El comando común no ejecuta scripts de creación/Figma ni convierte QA histórico en readback actual. Para correr un verificador específico hace falta Node disponible y confirmar su alcance.

~~~sh
./scripts/ds test
~~~

Retención Git, simplificación transversal de protocolos y frontend quedan fuera de este lote. No se cambian hooks, bibliotecas, paletas o contratos para obtener PASS.

En un lote posterior autorizado el mismo día se aplica la [política de retención de derivados](ARTIFACT-RETENTION.md): before/staged/after permanecen locales y se excluyen de Git; el grafo activo, las contribuciones semánticas y los comprobantes del cierre continúan bajo seguimiento. Conservar before para recuperación sigue siendo obligatorio.

## Extensión web · 2026-10-13

P07 incorpora en la configuración tres fuentes exactas que el detector genérico omite: los dos CSS de autoría y pnpm-lock.yaml. supplemental_web_sources solo permite texto CSS/YAML dentro de implementations/web; se extrae semánticamente y participa en la guarda de hashes. Los CSS/tokens generados, assets copiados, dependencias y build se excluyen como derivados. Esta extensión no amplía reglas de detección para el resto del corpus.

## Skills versionadas · 2026-10-14

[P08](../protocols/08-SKILLS-AND-RELEASES.md) agrega el entregable de consumo al cierre de cada alta o modificación. Las fuentes de las dos skills están en `skills/`; `config/ds-skills.json` declara la selección compartida del DS. Los paquetes viven bajo `output/skills/<versión>/` y se excluyen del grafo para evitar duplicar el corpus.

```sh
scripts/ds skills sync
scripts/ds skills check
scripts/ds skills export
scripts/ds skills install
scripts/ds skills check-installed
```

`sync` y `export` producen el mismo release verificable. Sin cambios conservan versión y bytes; con cambios incrementan patch por defecto. `--bump minor` o `--bump major` permite indicar un incremento diferente del paquete. No selecciona contratos por número de versión ni altera su estado. Cada ZIP usa orden y metadatos estables; los manifiestos conservan hashes de fuentes y archivos del paquete. El digest del DS es SHA-256 de la serialización JSON UTF-8 compacta del mapa de rutas a hashes, con claves ordenadas.

`check` no escribe: detecta cambios de fuentes/plantillas/configuración, archivos ausentes, extras o alterados. Se incorpora a `scripts/ds check`; `--docs-only` excluye los gates derivados durante preparación. El verificador no afirma por sí solo que una pantalla Figma o un prototipo particular funcionen.

`install` es explícito y actualiza las dos skills nuevas en el directorio de skills del entorno (`CODEX_HOME/skills` o `~/.codex/skills`); `--skills-dir` permite otro destino autorizado. Solo reemplaza copias gestionadas cuyo contenido conserva sus hashes; cambios ajenos se preservan y se reportan. Usa staging, respaldo temporal y recuperación ante fallos ordinarios. `check-installed` comprueba esa copia sin escribir. El estado global del repo no depende de que todas las máquinas de los consumidores estén instaladas.

Los resultados del release y del QA se guardan en `registry/skills.md` y `qa/skills/`, fuera del fingerprint del snapshot para evitar autorreferencia. Esos registros sí se indexan en Graphify. No hay publicación remota, monitor ni actualización automática en equipos ajenos.

## Cierre eficiente

Entrada recomendada: scripts/ds close --run ID. Ver [operación, estados y medición](EFFICIENT-CLOSURE.md). Las verificaciones individuales permanecen para diagnóstico; el cierre común evita ejecutarlas repetidamente sobre fuentes intactas.
