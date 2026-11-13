---
name: contpaqi-figma-screens
description: Crea o modifica pantallas y flujos editables en Figma desde prompts, imágenes o entregas de contpaqi-po-prototypes, consultando las Specs y tokens BlueHeart del catálogo Blue-Heart-DS en GitHub. Reutiliza componentes existentes y crea componentes locales del prototipo cuando falte cobertura; no modifica la biblioteca maestra.
---

# Pantallas BlueHeart en Figma

Construye el prototipo solicitado con componentes, textos, propiedades y estructura editables. El motor instalado consulta el catálogo Blue-Heart-DS en GitHub; no incluye una copia fija de los specs. El prompt define el producto y las imágenes aportan referencias de composición. Ninguno reemplaza las reglas del DS ni convierte una decisión del prototipo en norma compartida.

## Resolver BlueHeart antes de cada trabajo

Desde el motor instalado, ejecuta `python3 scripts/resolve_ds.py --output NUEVA_CARPETA`. El cargador consulta `Migueluckleo/Blue-Heart-DS` en GitHub, verifica el manifiesto y fija su corte durante el encargo. Usa los scripts y referencias desde la carpeta de ejecución devuelta en `PASS`. Registra la URL del catálogo, el digest, el manifiesto y la versión del motor. Si falla la consulta, revisa el comprobante y la [fuente remota](references/remote-source.md).

## Consultas dirigidas al índice de consumo

Después de resolver el snapshot, ejecuta `python3 scripts/consumer_graph.py --component ID_CANONICO --intent component` desde la carpeta de ejecución, sustituyendo el ID por la identidad canónica necesaria. El adaptador compartido valida el índice del mismo manifiesto y devuelve referencias, enmiendas, documentos y métricas. Usa `--intent dependencies`, `evidence`, `variants`, `states` o `tokens`; para un token concreto agrega `--token <nombre-exacto-o-id>`.

Para una composición, consulta `--intent dependencies` por familia anfitriona. Por ejemplo, `APP-SHELL-001` recupera Header, Sidebar, su enmienda y Section Header. Abre los contratos de las familias que realmente utilices y sus dependencias declaradas.

`PASS` con `mode: graph` acredita navegación dirigida, no aprobación de diseño. `FALLBACK` incluye motivo y cobertura limitada a contrato y enmiendas del snapshot validado: completa dependencias por lectura selectiva de las referencias originales antes de construir. `BLOCKED` no permite usar un contexto parcial; resuelve conflicto, integridad, cobertura o límite indicado. No descargues `graphify-out/graph.json` ni reindexes el repositorio. Lee las fuentes recuperadas para verificar reglas; el índice no decide precedencia normativa.

## Alcance

- Reutiliza un componente del DS cuando sus propiedades y reglas satisfagan la necesidad. Comprueba la implementación real antes de instanciarla.
- Si falta cobertura, crea un componente **local del archivo de prototipo**, compuesto con componentes y tokens existentes. La solicitud de pantalla autoriza esta composición local; no exige aprobación rutinaria por componente. Consulta [composición local](references/local-components.md).
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
- Conserva la tipografía nativa de los componentes vinculados. En el texto propio del prototipo, usa la tipografía que indiquen sus fuentes y registra la decisión local si el brief deja abierto el rol. Sigue el [flujo Figma](references/figma-workflow.md) para comprobar estilos, métricas y rangos.
- Conserva instancias vinculadas, propiedades admitidas, modos, roles semánticos, aliases y assets oficiales. No desacoples una instancia para resolver una limitación ni sustituyas un componente accesible por una imitación.
- Usa Auto Layout para relaciones estructurales, texto editable con fuentes verificadas y regiones de contenido acordes con P-SLOTS. Las imágenes completas de pantallas son referencias, nunca la pantalla entregada.
- Conserva un registro local de IDs y decisiones, construye en lotes recuperables y lee el resultado real. Si una llamada falla, sigue la recuperación de la herramienta antes de repetir escrituras.

## Verificar y entregar

Exige el gate final `verify_figma_usage.py verify` en `PASS` y aplica [handoff y QA](references/handoff-and-qa.md): compara composición, medidas, tipografía, assets, estados, bindings e interacciones con el contrato y los datos de referencia al mismo viewport. Corrige defectos deterministas y vuelve a leer/capturar lo afectado. Si no se aportó una captura o HTML de referencia, verifica contra el MD y registra esa comparación visual externa como no ejecutada. La fidelidad se sustenta con evidencias y diferencias medidas, no con una promesa universal de igualdad píxel a píxel.

Entrega el enlace real al archivo y los nodos finales, capturas, mapa de componentes utilizados/locales y un reporte breve con fuentes, decisiones, pruebas ejecutadas y límites pendientes. Distingue creación, QA técnico y aceptación humana; no declares `VALIDATED` con comprobaciones obligatorias pendientes.

## Cobertura vacía

Si el corte carece de familias aplicables, informa `BLOCKED` para el diseño que depende del DS y registra la cobertura faltante. Las ligas y las specs futuras habilitarán la siguiente fase.
