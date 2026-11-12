---
name: contpaqi-po-prototypes
description: Construye prototipos BlueHeart con React, TypeScript, Tailwind y Next.js, entrega un HTML interactivo que abre sin servidor y un Markdown con evidencia para replicarlo mediante contpaqi-figma-screens. Úsala para pantallas y flujos de producto portables.
---

# Prototipos BlueHeart para producto

Entrega `entrega/render.html` y `entrega/replicar-en-figma.md`, con referencias y
capturas. El usuario abre el HTML directamente, sin Node, servidor ni red. La
fuente editable permanece fuera de la entrega. Preparar el Markdown no ejecuta
Figma: invoca **`$contpaqi-figma-screens`** en la futura sesión del diseñador.

El motor instalado y el contenido del DS tienen versiones independientes. Los contratos conservan su autoridad y sus estados; descargarlos no aprueba documentos ni valida implementaciones.

## Resolver BlueHeart antes de cada trabajo

Desde el motor instalado, ejecuta `python3 scripts/resolve_ds.py --output NUEVA_CARPETA`. El cargador consulta `Migueluckleo/Blue-Heart-DS` en GitHub, verifica el manifiesto y fija su corte durante el encargo. Usa los scripts y referencias desde la carpeta de ejecución devuelta en `PASS`. Registra la URL del catálogo, el digest, el manifiesto y la versión del motor. Si falla la consulta, revisa el comprobante y la [fuente remota](references/remote-source.md).

## Consultas dirigidas al índice de consumo

Después de resolver el snapshot, ejecuta `python3 scripts/consumer_graph.py --component ID_CANONICO --intent component` desde la carpeta de ejecución, sustituyendo el ID por la identidad canónica necesaria. El adaptador compartido valida el índice del mismo manifiesto y devuelve referencias, enmiendas, documentos y métricas. Usa `--intent dependencies`, `evidence`, `variants`, `states` o `tokens`; para un token concreto agrega `--token <nombre-exacto-o-id>`.

Para una composición, consulta `--intent dependencies` por familia anfitriona. Por ejemplo, `APP-SHELL-001` recupera Header, Sidebar, su enmienda y Section Header. Abre los contratos de las familias que realmente utilices y sus dependencias declaradas.

`PASS` con `mode: graph` acredita navegación dirigida, no aprobación de diseño. `FALLBACK` incluye motivo y cobertura limitada a contrato y enmiendas del snapshot validado: completa dependencias por lectura selectiva de las referencias originales antes de construir. `BLOCKED` no permite usar un contexto parcial; resuelve conflicto, integridad, cobertura o límite indicado. No descargues `graphify-out/graph.json` ni reindexes el repositorio. Lee las fuentes recuperadas para verificar reglas; el índice no decide precedencia normativa.

1. Extrae objetivo, pantallas, contenido, acciones, tema y viewport. Resuelve solo
   decisiones materiales faltantes. En ausencia de indicación registra el viewport provisional y omite el modo si no está definido en el corte. Emplea datos ficticios y memoria.
2. Lee [consumo del DS](references/design-system.md) y contratos/enmiendas de las
   familias utilizadas. Usa sus componentes, CSS, artwork y tokens incluidos.
   Conserva la tipografía que define cada componente en su contrato y datos delegados. Registra las métricas del texto visible en el traspaso.
   Para algo no cubierto, compón componentes existentes y documenta la decisión
   local; no la declares variante o componente oficial ni inventes una aprobación.
3. Lee [build y QA offline](references/build.md). Ejecuta
   `node <skill>/scripts/init.mjs <salida-nueva>`. Edita `prototype/page.tsx`, estilos
   locales y `brief.json`; `app/` y `ui/` son derivados regenerados. Todos los pasos
   viven en una entrada cliente, con estado/hash. No abras el catálogo del DS.
4. Implementa respuestas visibles y estados reales. Conserva API, tokens,
   geometría y composición. Marca instancias con `DSNode`/`data-ds-node`, identidad
   contractual y props. Marca también títulos, textos y contenedores locales
   relevantes; captura estados con acciones/aserciones en `brief.json`.
   [Esquema de evidencia y handoff](references/handoff.md).
5. Compila con `npm run build`, luego `npm run capture`. El script abre una copia
   renombrada del HTML por `file://`, aislada y con HTTP(S) bloqueado; mide nodos y
   toma capturas. Revisa esas imágenes y prueba el recorrido, teclado, retornos,
   contenido largo y viewports solicitados. Capturar no sustituye revisión visual.
6. Completa decisiones, limitaciones y checks reales; repite captura tras cualquier
   cambio de brief/HTML. Ejecuta `npm run handoff` y revisa el Markdown contra las
   capturas. Incluye IDs/contratos/hashes/props y omisiones reales; nunca inventes
   un ID Figma. Un destino Figma aún desconocido no bloquea la entrega del prompt.

Entrega enlaces al HTML, Markdown y carpeta/ZIP completos. Abre el HTML si el visor
disponible admite JavaScript; de lo contrario indica doble clic en navegador.
Si falta capacidad de navegador, conserva `NOT_RUN` y describe la limitación. Si
la ejecución falla, conserva `FAIL` y corrige; no presentes el prototipo como
funcional ni uses localhost para cubrir el fallo. No publicar, ejecutar Figma ni
modificar el maestro o las habilidades instaladas durante este flujo.

## Cobertura vacía

Si el corte carece de familias aplicables, informa `BLOCKED` para el diseño que depende del DS y registra la cobertura faltante. Las ligas y las specs futuras habilitarán la siguiente fase.
