---
name: contpaqi-figma-screens
description: Crea o modifica pantallas y flujos editables en Figma desde prompts, imágenes o entregas de contpaqi-po-prototypes, consultando las Specs y tokens BlueHeart del catálogo Blue-Heart-DS en el repositorio de origen. Reutiliza componentes existentes y crea componentes locales del prototipo cuando falte cobertura; no modifica la biblioteca maestra.
---

# Pantallas BlueHeart en Figma

Construye el prototipo solicitado con componentes, textos, propiedades y estructura editables. El lanzador lee este workflow vigente en el repositorio de origen y este resuelve el catálogo del mismo commit. El prompt define el producto y las imágenes aportan referencias de composición. Ninguno reemplaza las reglas del DS ni convierte una decisión del prototipo en norma compartida.

## Contrato primordial obligatorio

Antes de planificar, construir o escribir en Figma, lee desde el repositorio de origen el [contrato primordial de consumo](../../../specs/foundations/product-consumption.contract.v1.0.0.md) y sus [datos](../../../specs/policies/product-consumption.v1.0.0.json) en el mismo commit del encargo. Aplica CONSUMPTION-01 a 06. Los componentes y controles son oficiales del DS; solo se construyen moléculas locales de producto (módulos, tarjetas y secciones) con Body. Cada pantalla y estado de producto se aloja en AppShell oficial y usa sus slots; las moléculas viven en Body. Una barra de progreso consume Linear Progress del DS. Una carencia atómica bloquea esa parte; ninguna excepción autoriza inventar controles.

## Iniciar una sesión desde el repositorio de origen

La skill instalada contiene solo el lanzador y determina el proveedor y el commit del encargo. Consulta sus instrucciones de autenticación y arranque en [consumo remoto](references/remote-source.md). El canal GitHub utiliza `scripts/github_workflow.py`. El nombre histórico del módulo compartido no cambia el origen de la sesión.

Lee íntegro este workflow y sus referencias en ese commit. Los enlaces Markdown relativos se resuelven desde `workflows/skills/contpaqi-figma-screens/`; las rutas canónicas parten de la raíz del repositorio. Para GitHub, el cargador se lee en `https://raw.githubusercontent.com/Migueluckleo/Blue-Heart-DS/COMMIT/scripts/github_workflow.py`, sustituyendo COMMIT por el SHA fijado. Con el conector GitHub, usa la ruta de repositorio `scripts/github_workflow.py` y ese mismo commit. Materializa el cargador en la carpeta temporal del trabajo. Ejecuta `python3 -B CARGADOR start --skill contpaqi-figma-screens --commit COMMIT --output NUEVA_CARPETA`, donde CARGADOR es la ruta al cargador del proveedor indicado por el lanzador. Usa la ruta `runtime` del comprobante PASS.

El cargador obtiene herramientas y plantillas del origen, comprueba sus blobs Git y fija el catálogo y el índice de consumo del mismo commit. No ejecuta scripts desde la instalación ni obtiene `data.tar.gz`. Los contratos, datos y assets permanecen remotos hasta que una consulta o la construcción los necesita. `python3 -B <runtime>/scripts/github_workflow.py read --runtime <runtime> --path RUTA_REPO` es la lectura compartida: detecta el comprobante GitHub y usa ese origen y verifica el hash de la fuente. En `--path` usa la ruta canónica sin `assets/design-system/`.

Las copias de trabajo sirven para ejecutar y verificar este encargo; no son un catálogo instalado ni se reutilizan como fallback en otro encargo. Si la conexión, autenticación o integridad fallan, conserva el diagnóstico y detén la parte dependiente. Registra proveedor, commit, URLs, manifiesto, digest y comprobantes. Mantén el mismo commit durante el encargo. El próximo encargo resuelve de nuevo la rama del origen. Las actualizaciones publicadas de workflows, validadores, componentes, tokens e índice no requieren cambiar el lanzador.

## Consultas dirigidas al índice de consumo

Después de iniciar la sesión remota, ejecuta `python3 scripts/consumer_graph.py --component ID_CANONICO --intent component` desde la carpeta de ejecución, sustituyendo el ID por la identidad canónica necesaria. El adaptador compartido valida el índice del mismo manifiesto y devuelve referencias, enmiendas, documentos y métricas. Usa `--intent dependencies`, `evidence`, `variants`, `states` o `tokens`; para un token concreto agrega `--token <nombre-exacto-o-id>`.

Para una composición, consulta `--intent dependencies` por familia anfitriona. Por ejemplo, `APP-SHELL-001` recupera Header, Sidebar, su enmienda y Section Header. Abre los contratos de las familias que realmente utilices y sus dependencias declaradas.

`PASS` con `mode: graph` acredita navegación dirigida, no aprobación de diseño. `FALLBACK` incluye motivo y cobertura limitada a contrato y enmiendas del snapshot validado: completa dependencias por lectura selectiva de las referencias originales antes de construir. `BLOCKED` no permite usar un contexto parcial; resuelve conflicto, integridad, cobertura o límite indicado. No descargues `graphify-out/graph.json` ni reindexes el repositorio. Lee las fuentes recuperadas para verificar reglas; el índice no decide precedencia normativa.

## Alcance

- Reutiliza un componente del DS cuando sus propiedades y reglas satisfagan la necesidad. Comprueba la implementación real antes de instanciarla.
- Si falta una estructura de producto, crea una **molécula local del archivo de prototipo**, compuesta con componentes oficiales y tokens Body. Una carencia de control atómico queda bloqueada. La solicitud de pantalla autoriza esta composición local; no exige aprobación rutinaria por componente. Consulta [composición local](references/local-components.md).
- El maestro confirmado en `config/figma-links.json` sirve para lectura e importación. Escribe solo en el sandbox autorizado.
- No modifica las skills anteriores, el snapshot distribuido ni sus fuentes canónicas. Si el usuario solicita mantenimiento del DS, ese trabajo requiere su propio alcance.

## Comprobar conexión con Figma

Antes de preparar una construcción, descubre las herramientas MCP de Figma del entorno y comprueba la conexión mediante una lectura disponible. Cada diseñador conecta su propia cuenta; la skill no incluye credenciales ni concede permisos sobre archivos o bibliotecas.

Si no hay herramientas Figma o la conexión no está activa, informa: «Es necesaria la conexión a Figma. Por favor, asegúrate de conectar tu agente con Figma mediante MCP y autenticarte con tu propia cuenta». Conserva el trabajo preparado y detén únicamente la construcción en Figma. No confundas un fallo de red con credenciales ausentes ni repitas llamadas fallidas sin un cambio de estado.

Si la conexión existe pero falta acceso al archivo, señala el permiso necesario. Si solo permite lectura, explica que para construir se necesita escritura sobre el lienzo: el flujo oficial requiere el MCP remoto de Figma y un cliente compatible. Comprueba las capacidades reales y los manuales oficiales disponibles; no presupongas compatibilidad por el nombre del cliente ni intentes una escritura de prueba. Consulta la [guía oficial de conexión](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) cuando necesites orientar la configuración. No instales ni cambies la conexión sin autorización.

## Preparar la entrada y el destino

1. Lee `assets/release.json` y ejecuta `python3 scripts/verify_snapshot.py` desde la carpeta de ejecución verificada. Verifica el resultado antes de tratar el paquete como íntegro.
2. Resuelve únicamente las familias, dependencias y tokens necesarios siguiendo [fuentes y autoridad](references/design-system.md). Conserva la tipografía definida por cada componente, incluidos rangos y bindings cuando correspondan. `references/components.json` es un índice generado, no la especificación.
3. Desde un prompt, extrae contenido, tareas, pantallas, estados y viewport; decide detalles ordinarios de composición con el DS y registra supuestos locales. Desde imágenes, inspecciónalas y separa lo observado de lo no visible. Desde un MD de `contpaqi-po-prototypes`, incluso pegado en el chat, aplica [handoff y QA](references/handoff-and-qa.md): consume su bloque JSON autosuficiente y resuelve las fuentes desde el snapshot de esta skill. El HTML, el JSON externo y las capturas son complementos opcionales; no los exijas para construir si el MD aporta los datos necesarios.
4. El usuario debe designar el archivo de prototipo mediante su enlace o pedir expresamente uno nuevo. Si falta el destino, informa: «Indica el enlace del archivo de Figma donde quieres que construya las pantallas, o dime si quieres que cree uno nuevo». Conserva la preparación; no escribas hasta resolver el destino. Si pide uno nuevo, créalo con la skill oficial `figma-create-new-file` y registra su enlace real.
5. Antes de escribir, confirma la identidad y el permiso de escritura del archivo de prototipo autorizado. El maestro es [AI Blueheart DS](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=0-1), indicado en el catálogo como fuente de instancias. El prototipo debe ser un archivo distinto del maestro y de la raíz histórica. Registra su URL real en el plan.

No conviertas datos de ejemplo en reglas de negocio ni en límites de cardinalidad. Cuando falte una decisión material, conserva `UNRESOLVED` y continúa las partes independientes.

## Gates obligatorios antes de escribir y cerrar

Aplica [los controles verificables](references/figma-usage-gates.md). Antes de construir, ejecuta `inventory` y justifica la aplicabilidad de **cada familia del corte**. Mapea todos los usos aplicables a claves reales de BlueHeart o excepciones funcionales con evidencia de cada alternativa relevante. Conserva los readbacks fuente y el comprobante del catálogo. Ejecuta `scripts/verify_figma_usage.py preflight` y exige `PASS` antes de escribir. Una familia existente inaccesible queda `UNAVAILABLE_EXISTING_COMPONENT`; no la dibujes como frames, rectángulos o textos ni la declares composición local.

Después de la última escritura, recoge el resultado con `scripts/collect_figma_usage.js`, generado por `verify_figma_usage.py collect`, y ejecuta `verify_figma_usage.py verify` con el mismo plan y recibo. El informe debe dar un resultado por cada familia y comprobar la identidad real de instancias y los controles de bindings/estilos/layout. Un nombre como “DS / Search” o “TABLE-001” no prueba reutilización. Conserva la distinción entre contenido local legítimo y controles cubiertos por el catálogo. Un plan parcial no acredita la pantalla completa.

## Construir

Usa las herramientas Figma disponibles; no generes un HTML como sustituto del resultado solicitado. Lee [flujo Figma](references/figma-workflow.md) antes de escribir.

- Carga la skill oficial `figma-use` antes de cada llamada `use_figma` y cumple sus referencias/API vigentes. Carga también `figma-generate-design` para pantallas y `figma-generate-library` si creas un componente local. Antes de `create_new_file`, carga `figma-create-new-file`. Sigue sus metadatos `skillNames` cuando apliquen. Descubre estas skills en el entorno; no dependas de una ruta del equipo del autor.
- Aplica esos manuales dentro del alcance **prototipo local**. Sus ejemplos de crear foundations no autorizan inventar tokens, cambiar aliases ni ampliar esta tarea a una biblioteca.
- Inspecciona archivo, componentes, variables y fuentes tipográficas. Resuelve claves e IDs reales; un ID histórico, un nombre coincidente o un resultado vacío de variables locales no demuestra disponibilidad o ausencia.
- Conserva la tipografía nativa de los componentes vinculados. En el texto propio del prototipo, usa los estilos y roles Body vigentes consultados en el repositorio de origen y registra el rol elegido según su función. Sigue el [flujo Figma](references/figma-workflow.md) para comprobar estilos, métricas y rangos.
- Conserva instancias vinculadas, propiedades admitidas, modos, roles semánticos, aliases y assets oficiales. No desacoples una instancia para resolver una limitación ni sustituyas un componente accesible por una imitación.
- Usa Auto Layout para relaciones estructurales, texto editable con fuentes verificadas y regiones de contenido acordes con P-SLOTS. Las imágenes completas de pantallas son referencias, nunca la pantalla entregada.
- Conserva un registro local de IDs y decisiones, construye en lotes recuperables y lee el resultado real. Si una llamada falla, sigue la recuperación de la herramienta antes de repetir escrituras.

## Verificar y entregar

Exige el gate final `verify_figma_usage.py verify` en `PASS` y aplica [handoff y QA](references/handoff-and-qa.md): compara composición, medidas, tipografía, assets, estados, bindings e interacciones con el contrato y los datos de referencia al mismo viewport. Corrige defectos deterministas y vuelve a leer/capturar lo afectado. Si no se aportó una captura o HTML de referencia, verifica contra el MD y registra esa comparación visual externa como no ejecutada. La fidelidad se sustenta con evidencias y diferencias medidas, no con una promesa universal de igualdad píxel a píxel.

Entrega el enlace real al archivo y los nodos finales, capturas, mapa de componentes utilizados/locales y un reporte breve con fuentes, decisiones, pruebas ejecutadas y límites pendientes. Distingue creación, QA técnico y aceptación humana; no declares `VALIDATED` con comprobaciones obligatorias pendientes.

## Cobertura vacía

Si el corte carece de familias aplicables, informa `BLOCKED` para el diseño que depende del DS y registra la cobertura faltante. Las ligas y las specs futuras habilitarán la siguiente fase.

## Contenido específico de producto con Body

Obtén con `github_workflow.py read` y consulta también `assets/design-system/specs/foundations/token-visibility.contract.v1.0.0.md` y `assets/design-system/specs/tokens/visibility.body-only.correction.json`. Solo los tokens de la colección `component` cuyo nombre empiece exactamente por `body/` son la interfaz de tokens para construir contenido específico de producto, con scopes limitados a su función. Un nombre de otra familia que contenga body no pertenece a Body. Los demás tokens siguen funcionando como dependencias internas con scopes vacíos: conserva los tokens propios de componentes e instancias y su cadena component → semantic → primitive, sin sustituirlos por Body o literales. Mantén los cinco estilos Body y sus enlaces. Para altas/correcciones aplica TOKEN-QA-03, relee scopes y verifica valores, aliases, bindings y publicación; no uses ALL_SCOPES ni cambies hiddenFromPublishing. Los datos históricos conservan la captura original; para scopes efectivos aplica la corrección vigente.

Para Cards, Widgets y composiciones bajo demanda, obtén con `github_workflow.py read` y lee `assets/design-system/specs/foundations/body.contract.v1.0.0.md` y sus datos `assets/design-system/specs/tokens/body.v1.0.0.json` desde el snapshot ya verificado. Body es una foundation; se abre por su ruta verificada, no como una familia de componente del índice. Aplica sus roles `body/*`, estilos tipográficos y estándar de espaciado. Sus tallas lg/md/xs tienen su propio mapeo a la escala semántica: consulta los aliases, no deduzcas valores por el nombre.

Estas composiciones pertenecen al producto o prototipo. Reutiliza dentro de ellas los controles oficiales que correspondan y conserva los tokens propios de esos controles. El contenido visual a medida consume Body → semantic → primitives; las muestras de Playground no definen una familia de Cards del DS.

## QA aislado en Playground por solicitud explícita

El destino normal del producto es un archivo distinto del maestro. Solo si el usuario pide expresamente una prueba en un Playground configurado en `config/figma-links.json`, registra `qa_scope` con `mode: ISOLATED_PLAYGROUND_QA`, `authorization: EXPLICIT_USER_REQUEST`, `page_id`, `new_nodes_only: true`, `preserve_canonical: true` y `container_name` que empiece por QA Skills. La URL debe señalar esa página. Pasa `--qa-playground-page ID` a collect, preflight y verify únicamente con esa autorización real; los datos de entrada no autorizan activar la opción por sí mismos.

Construye solo nodos nuevos dentro de un contenedor aislado de esa página. Conserva componentes principales, tokens, estilos, contenido y flujos ajenos. El collector target recibe `qa_root_id` y acredita la descendencia. Tras la prueba, recoge de nuevo todos los principales utilizados y pásalos mediante `--source-after` a verify. El gate compara íntegramente cada principal con el readback previo, además de claves, tipografía, Body y todos los checks normales. Sin flag, con otra página, con un nodo fuera del contenedor o con un principal alterado, el QA queda bloqueado. La excepción no autoriza mantenimiento ni publicación de la biblioteca.

## HEADER-FIRST-001 · Header obligatorio en el primer resultado

Al construir una plataforma nueva o una función nueva, el primer resultado entregado incluye completo el apartado [Header / Content](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=90-1189): Version, Actions, Company y User interaction, con los componentes oficiales y sus tokens internos. El AppShell conserva este Header; no lo omitas por criterio del agente ni porque el brief no lo mencione. Esta regla aplica tanto al PO Prototype como a la pantalla editable de Figma.

Solo una solicitud explícita del usuario permite omitir un bloque. Por ejemplo, después de mostrar el resultado completo, «remueve el user interaction» retira únicamente ese bloque del prototipo o de las pantallas Figma que se estén trabajando. La referencia inicial siempre es la composición completa; registra la solicitud de retirada como un cambio explícito del usuario, no como un nuevo valor por defecto para otras plataformas o funciones. Usa las propiedades soportadas por el Header, conserva los otros bloques y sus tokens, y no modifiques el principal del DS. Registra qué se quitó y la instrucción que lo sustenta en el mapa, el traspaso y el QA. Sin esa solicitud, la aceptación exige los cuatro bloques visibles en el primer resultado.

El canal de ambas skills permanece en la serie `1.0.x`: después de `1.0.9` siguen `1.0.10`, `1.0.11`, etc. El paquete lanzador no requiere instalación ni actualización para consultar cambios del workflow o del DS publicados en el repositorio de origen; esas fuentes se resuelven en cada encargo.

## Documento entregado en conversación

Obtén con `github_workflow.py read` los contratos `specs/components/chat-document-viewer.contract.v1.0.0.md` y `specs/components/app-shell.document-preview.amendment.v1.0.0.md` desde el mismo commit del encargo. Reutiliza Chat Document Viewer (430:15516) y App Shell con body layout=conversation-preview y menu collapsed/expanded. Conserva Slots nativos Body, Document preview y Right sidebar; el visor conserva su propio Slot preview. Chat ocupa 374 px y el documento llena el espacio restante en la referencia de escritorio. No conviertas la tabla de muestra en anatomía fija ni crees variantes por documento. Conserva tokens internos del visor/controles; el contenido específico consume Body. El tracking del visor normaliza 0.1% a 0.02/0.014 px para mantener bindings Figma: usa los estilos compartidos del corte. Las acciones pertenecen al anfitrión; no inventes generación o descarga remota. Verifica Slots, ancho, temas y TOKEN-QA-01/02/03. La disponibilidad en otros encargos depende de publicar fuentes y catálogo juntos; este mantenimiento local no publica.

## Dropdown con búsqueda opcional

Obtén desde el mismo commit `specs/components/dropdown-menu.search.amendment.v1.0.0.md` y `specs/tokens/dropdown-menu.search.v1.0.0.json`. Reutiliza Dropdown menu 119:17; activa Show search cuando lo pida el flujo. Conserva Options#119:0 nativo y los ítems editables; Search small está fuera del Slot y es local. El viewport Results tiene máximo 318 px y Search fijo; no desvincules estos bindings ni transformes Options en Frame. La fuente visual no ejecuta el filtrado: registra la búsqueda que necesita el producto en el traspaso. Conserva los tokens internos de cada componente y valida TOKEN-QA-01/02/03. El lanzador no cambia por esta ampliación; el catálogo y las fuentes se actualizan juntos.

## Body · Colores por propiedad

Obtén del mismo commit `specs/foundations/body.semantic-colors.amendment.v1.0.0.md` y `specs/tokens/body.semantic-colors.v1.0.0.json`, además del contrato/datos iniciales y la política de visibilidad. Body suma 52 tokens: los 33 anteriores y 19 colores de fondo, borde y formas/iconos. Consume bg brand/semántico, stroke y shape según su función, manteniendo los textos existentes. En Figma usa TEXT_FILL, FRAME_FILL/SHAPE_FILL, STROKE_COLOR y SHAPE_FILL respectivamente; Figma comparte el scope de formas e iconos. En web usa los aliases CSS Body equivalentes. Usa los pares text/bg del mismo tono, conserva el borde secondary como decorativo y no sustituyas tokens internos de componentes oficiales. La política de consumo declara body.data_sources; el preflight debe reconocer ambas fuentes y sus 52 nombres, sin volver a una lista inicial incompleta. Prueba cuatro temas y TOKEN-QA-01/02/03. Las muestras de Playground son frames de documentación y las cinco Cards siguen sin ser una familia consumible.
