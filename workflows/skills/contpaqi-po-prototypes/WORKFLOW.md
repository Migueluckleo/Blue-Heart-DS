---
name: contpaqi-po-prototypes
description: Construye prototipos BlueHeart con React, TypeScript, Tailwind y Next.js, entrega un HTML interactivo que abre sin servidor y un Markdown con evidencia para replicarlo mediante contpaqi-figma-screens. Úsala para pantallas y flujos de producto portables.
---

# Prototipos BlueHeart para producto

Entrega un HTML con nombre del producto o flujo, como `entrega/emision-de-facturas.html`, y `entrega/replicar-en-figma.md`, con referencias y
capturas. El usuario abre el HTML directamente, sin Node, servidor ni red. La
fuente editable permanece fuera de la entrega. Preparar el Markdown no ejecuta
Figma: invoca **`$contpaqi-figma-screens`** en la futura sesión del diseñador.

El workflow y el contenido del DS se resuelven desde GitHub. Los contratos conservan su autoridad y sus estados; consultarlos no aprueba documentos ni valida implementaciones.

## Contrato primordial obligatorio

Antes de planificar, construir o escribir en Figma, lee desde GitHub el [contrato primordial de consumo](../../../specs/foundations/product-consumption.contract.v1.0.0.md) y sus [datos](../../../specs/policies/product-consumption.v1.0.0.json) en el mismo commit del encargo. Aplica CONSUMPTION-01 a 06. Los componentes y controles son oficiales del DS; solo se construyen moléculas locales de producto (módulos, tarjetas y secciones) con Body. Cada pantalla y estado de producto se aloja en AppShell oficial y usa sus slots; las moléculas viven en Body. Una barra de progreso consume Linear Progress del DS. Una carencia atómica bloquea esa parte; ninguna excepción autoriza inventar controles.

## Iniciar una sesión desde GitHub

La skill instalada contiene solo el lanzador. Lee este workflow y sus referencias directamente en GitHub usando el commit que resolviste al iniciar el encargo. Los enlaces Markdown relativos se resuelven desde `workflows/skills/contpaqi-po-prototypes/` en ese mismo commit. Las rutas canónicas de fuentes, como `scripts/github_workflow.py`, parten de la raíz del repositorio.

Para ejecutar las herramientas, lee [scripts/github_workflow.py](../../../scripts/github_workflow.py) desde la raíz del repositorio en el commit fijado. Por HTTPS, usa `https://raw.githubusercontent.com/Migueluckleo/Blue-Heart-DS/COMMIT/scripts/github_workflow.py`, reemplazando COMMIT por ese SHA. Con el conector GitHub, usa la ruta de repositorio `scripts/github_workflow.py` y el mismo commit. Guarda el archivo como `github_workflow.py` en la carpeta temporal del trabajo. Ejecuta `python3 -B github_workflow.py start --skill contpaqi-po-prototypes --commit COMMIT --output NUEVA_CARPETA`. El servicio obtiene herramientas y plantillas vigentes de GitHub, comprueba sus objetos Git y fija el catálogo y el índice de consumo del mismo commit. Usa la ruta `runtime` del comprobante PASS. No ejecuta scripts desde la instalación ni obtiene `data.tar.gz`.

Los contratos, datos y assets permanecen en GitHub hasta que una consulta o la construcción los necesita. `python3 -B <runtime>/scripts/github_workflow.py read --runtime <runtime> --path RUTA_REPO` obtiene una fuente por su ruta canónica y verifica su hash. En `--path` usa la ruta del repositorio sin el prefijo local `assets/design-system/`. Las referencias operativas de esta carpeta se leen desde GitHub. Las copias de trabajo de herramientas y fuentes sirven para ejecutar y verificar este encargo; no son un catálogo instalado ni se reutilizan como fallback en otro encargo. Si la conexión o la integridad fallan, conserva el diagnóstico y detén la parte dependiente.

Registra commit, URLs, manifiesto, digest y comprobantes. Mantén el mismo commit durante el encargo; para incorporar cambios posteriores inicia otra sesión. El próximo encargo consulta `main` de nuevo. Las actualizaciones de workflows, validadores, componentes, tokens y Graphify publicadas en GitHub no requieren cambiar el lanzador.

## Consultas dirigidas al índice de consumo

Después de iniciar la sesión GitHub, ejecuta `python3 scripts/consumer_graph.py --component ID_CANONICO --intent component` desde la carpeta de ejecución, sustituyendo el ID por la identidad canónica necesaria. El adaptador compartido valida el índice del mismo manifiesto y devuelve referencias, enmiendas, documentos y métricas. Usa `--intent dependencies`, `evidence`, `variants`, `states` o `tokens`; para un token concreto agrega `--token <nombre-exacto-o-id>`.

Para una composición, consulta `--intent dependencies` por familia anfitriona. Por ejemplo, `APP-SHELL-001` recupera Header, Sidebar, su enmienda y Section Header. Abre los contratos de las familias que realmente utilices y sus dependencias declaradas.

Para una pantalla cuyo flujo principal es una conversación con Beni o Navi, resuelve primero `APP-SHELL-001` y `CHAT-001`. Si el corte ofrece App Shell en modo conversación, mapea y marca la instancia `AppShell`, usa `bodyLayout="conversation"` y monta `Chat` en su Slot Body. Incluye ambas instancias en cada estado de captura de la conversación. Si el producto usa herramientas laterales de Chat, colócalas en el Slot Right sidebar y conserva las reglas de Rail y Panel del contrato. El contenido particular del flujo vive en los slots y en el estado del anfitrión.

`PASS` con `mode: graph` acredita navegación dirigida, no aprobación de diseño. `FALLBACK` incluye motivo y cobertura limitada a contrato y enmiendas del snapshot validado: completa dependencias por lectura selectiva de las referencias originales antes de construir. `BLOCKED` no permite usar un contexto parcial; resuelve conflicto, integridad, cobertura o límite indicado. No descargues `graphify-out/graph.json` ni reindexes el repositorio. Lee las fuentes recuperadas para verificar reglas; el índice no decide precedencia normativa.

1. Extrae objetivo, pantallas, contenido, acciones, tema y viewport. Resuelve solo
   decisiones materiales faltantes. En ausencia de indicación registra el viewport provisional y omite el modo si no está definido en el corte. Emplea datos ficticios y memoria.
2. Lee [consumo del DS](references/design-system.md) y contratos/enmiendas de las
   familias utilizadas. Usa sus componentes, CSS, artwork y tokens incluidos.
   Conserva la tipografía que define cada componente en su contrato y datos delegados. Registra las métricas del texto visible en el traspaso.
   Busca por propósito, comportamiento y estado aunque el brief use otro nombre. Si falta cobertura, documenta qué necesidad no cubre cada alternativa pertinente y compón los componentes disponibles; no la declares variante o componente oficial ni inventes una aprobación.
3. Lee [build y QA offline](references/build.md). Ejecuta
   `python3 -B <runtime>/scripts/github_workflow.py web --runtime <runtime>` para obtener las fuentes de construcción y planificación por HTTPS. Después ejecuta `node <runtime>/scripts/init.mjs <proyecto-nuevo>` con la ruta absoluta del campo
   `runtime` que devolvió el cargador en `PASS`. El proyecto requiere una carpeta
   nueva fuera del runtime. Ejecuta `npm run inventory` y completa `componentFamilyTracking` en `brief.json` para todas las familias del corte, indicando cuáles aplican al brief y el motivo. Completa también `componentRequirements` desde el brief original. Inventaría los controles por propósito y estado, incluidos menús y sus ítems, desplegables, paginación, breadcrumbs y avisos. Para cada uno, contrasta la spec, sus enmiendas, sus dependencias y el API web del corte. Registra el export compatible o la causa concreta y su evidencia. Ejecuta `npm run plan` y exige que pase antes de escribir `prototype/`.
4. Implementa desde ese mapa. Usa `DSNode` con el export público como hijo directo en las instancias oficiales. Ejercita cada control en un estado de captura. Si cambia el alcance, actualiza y vuelve a verificar el mapa antes de implementar el cambio. Consulta el [esquema de evidencia](references/handoff.md).
5. Ejecuta `npm run build`, `npm run enforce` y `npm run capture`. Coteja todo el código y los estados contra el mapa, incluidas las composiciones locales y los controles de contenido condicional. Si encuentras un sustituto para un export compatible, corrige el código y repite el build y la captura. Revisa cada excepción contra la fuente aplicable y consérvala en el traspaso. La captura comprueba el HTML aislado por `file://` con HTTP(S) bloqueado.
6. Completa decisiones, limitaciones y checks reales; repite captura tras cualquier
   cambio de brief/HTML. Ejecuta `npm run handoff` y revisa el Markdown contra las
   capturas. Incluye IDs/contratos/hashes/props y omisiones reales; nunca inventes
   un ID Figma. Un destino Figma aún desconocido no bloquea la entrega del prompt.

Entrega enlaces al HTML, Markdown y carpeta/ZIP completos. Abre el HTML si el visor
disponible admite JavaScript; de lo contrario indica doble clic en navegador.
Si falta capacidad de navegador, registra `NOT_RUN` y entrega el diagnóstico de los controles pendientes. La entrega final de controles aplicables exige observaciones PASS. Si
la ejecución falla, conserva `FAIL` y corrige; no presentes el prototipo como
funcional ni uses localhost para cubrir el fallo. No publicar, ejecutar Figma ni
modificar el maestro o las habilidades instaladas durante este flujo.

## Cobertura vacía

Si el corte carece de familias aplicables, informa `BLOCKED` para el diseño que depende del DS y registra la cobertura faltante. Las ligas y las specs futuras habilitarán la siguiente fase.

## Contenido específico de producto con Body

Obtén con `github_workflow.py read` y consulta también `assets/design-system/specs/foundations/token-visibility.contract.v1.0.0.md` y `assets/design-system/specs/tokens/visibility.body-only.correction.json`. Body es exclusivamente el prefijo `body/` en la colección `component`: es la interfaz de tokens para contenido específico de producto. Los componentes oficiales siguen consumiendo sus tokens internos y aliases, aunque tengan scopes vacíos en Figma; no los sustituyas por Body, semánticos o valores literales. Los nombres de otras familias que contengan body no pertenecen a Body. Consume el manifest efectivo generado o aplica esta corrección sobre los inventarios históricos para interpretar scopes. Conserva variables CSS, modos y cadena component → semantic → primitive. Toda alta/corrección debe cumplir TOKEN-QA-03 en Figma y web, con scopes específicos declarados por función y preservación de estilos Body y bindings. Esta política no autoriza publicar ni instalar.

Para Cards, Widgets y composiciones bajo demanda, obtén con `github_workflow.py read` y lee `assets/design-system/specs/foundations/body.contract.v1.0.0.md` y sus datos `assets/design-system/specs/tokens/body.v1.0.0.json` desde el snapshot ya verificado. Body es una foundation; se abre por su ruta verificada, no como una familia de componente del índice. Aplica sus roles `body/*`, estilos tipográficos y estándar de espaciado. Sus tallas lg/md/xs tienen su propio mapeo a la escala semántica: consulta los aliases, no deduzcas valores por el nombre.

Estas composiciones pertenecen al producto o prototipo. Reutiliza dentro de ellas los controles oficiales que correspondan y conserva los tokens propios de esos controles. El contenido visual a medida consume Body → semantic → primitives; las muestras de Playground no definen una familia de Cards del DS.

## HEADER-FIRST-001 · Header obligatorio en el primer resultado

Al construir una plataforma nueva o una función nueva, el primer resultado entregado incluye completo el apartado [Header / Content](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=90-1189): Version, Actions, Company y User interaction, con los componentes oficiales y sus tokens internos. El AppShell conserva este Header; no lo omitas por criterio del agente ni porque el brief no lo mencione. Esta regla aplica tanto al PO Prototype como a la pantalla editable de Figma.

Solo una solicitud explícita del usuario permite omitir un bloque. Por ejemplo, después de mostrar el resultado completo, «remueve el user interaction» retira únicamente ese bloque del prototipo o de las pantallas Figma que se estén trabajando. La referencia inicial siempre es la composición completa; registra la solicitud de retirada como un cambio explícito del usuario, no como un nuevo valor por defecto para otras plataformas o funciones. Usa las propiedades soportadas por el Header, conserva los otros bloques y sus tokens, y no modifiques el principal del DS. Registra qué se quitó y la instrucción que lo sustenta en el mapa, el traspaso y el QA. Sin esa solicitud, la aceptación exige los cuatro bloques visibles en el primer resultado.

El canal de ambas skills permanece en la serie `1.0.x`: después de `1.0.9` siguen `1.0.10`, `1.0.11`, etc. El paquete lanzador no requiere instalación ni actualización para consultar cambios del workflow o del DS publicados en GitHub; esas fuentes se resuelven en cada encargo.
