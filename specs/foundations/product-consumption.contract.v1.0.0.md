---
contract_schema: sdd-project/0.2
contract_id: FOUNDATIONS-PRODUCT-CONSUMPTION-001
name: Contrato primordial de consumo de producto
type: tokens
status: DELEGATED_FOR_BUILD
version: 1.0.0
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
source_data_ref: specs/policies/product-consumption.v1.0.0.json
source_data_digest_sha256: c5d348419a96a59884345e84115f907a74013f10e928073f4d552121930395c8
data_refs: [specs/policies/product-consumption.v1.0.0.json]
dependencies: [FOUNDATIONS-BODY-001, FOUNDATIONS-TOKEN-VISIBILITY-001, LINEAR-PROGRESS-001, BUTTON-001, APP-SHELL-001]
---

# Contrato primordial de consumo de producto

Regla EXPLICIT del usuario, 17 de noviembre de 2026, obligatoria para los workflows web y Figma. Gobierna la construcción de interfaces de producto mediante el DS. Sus [datos de validación](../policies/product-consumption.v1.0.0.json) delegan identificadores, tipos de molécula y rutas; este contrato gobierna su significado. No modifica anatomías, valores ni la tipografía interna de las familias.

## CONSUMPTION-01 · Componentes oficiales obligatorios

Todo control, indicador o elemento cubierto por el DS consume explícitamente su componente real: export público verificado en web o instancia vinculada al maestro confirmado en Figma. Debe estar mapeado a la familia y al uso concreto del brief. Su parecido visual, nombre, marcador o justificación local no acreditan reutilización.

Una barra de progreso usa [Linear Progress](../components/linear-progress.contract.v1.0.0.md), con sus variantes, valores, estados y tokens. No se reemplaza por un div coloreado, un progress nativo ajeno al componente, un rectángulo, una línea ni un control dibujado. Un botón usa [Button](../components/buttons.contract.v1.0.0.md) o la familia oficial pertinente. La misma regla aplica a los demás controles y a las dependencias anidadas de las moléculas.

El HTML o las formas que implementan internamente un componente oficial forman parte de ese componente; esta regla no obliga a reemplazar sus recetas ni sus capas internas.

## CONSUMPTION-02 · Solo se construyen moléculas

La construcción local se limita a moléculas de producto: módulos, tarjetas y secciones que organizan texto, información y componentes oficiales para una función concreta. Los contenedores y el texto editable propios son contenido de la molécula. No son nuevos átomos del DS ni un catálogo universal de Cards.

Cada molécula declara su propósito, su tipo, los usos oficiales que compone y los tokens Body por propiedad. Puede contener únicamente información sin controles cuando el brief lo requiere. La composición debe conservar los slots, las dependencias y las reglas de los componentes anfitriones.

No se crean localmente botones, inputs, barras de progreso ni otros átomos o controles para cubrir una carencia. Si una necesidad atómica no tiene cobertura compatible, se registra BLOCKED_MISSING_DS_COVERAGE y se detiene esa parte. Una excepción funcional solo justifica la estructura de una molécula compuesta con piezas oficiales; no habilita reconstruir o imitar controles, incluso cuando la biblioteca sea inaccesible.

## CONSUMPTION-03 · Body gobierna el contenido de producto

Todo contenido visual propio de una molécula consume exclusivamente los roles de [Body](body.contract.v1.0.0.md) para sus colores, tipografía, separaciones, padding y radios que correspondan. Body significa colección component y prefijo exacto body/. Se conservan sus aliases, modos y estilos compartidos. Las medidas y roles se leen desde sus datos canónicos, sin copiar valores resueltos como reglas locales ni usar primitivas o semánticos directamente en la molécula.

Los componentes oficiales mantienen sus tokens internos y tipografía. Introducir un Button o Linear Progress dentro de una tarjeta Body no cambia sus tokens por Body. La [visibilidad de tokens](token-visibility.contract.v1.0.0.md) conserva activos los tokens internos aunque sus scopes estén vacíos. El inventario de cada molécula distingue tokens Body de composición y tokens propios de los componentes que contiene.

La geometría estructural que no tiene un token Body aplicable, como Fill, Hug, dirección del Auto Layout, orden o columnas responsivas, se decide según el brief y se documenta. Esta decisión no autoriza inventar colores, escalas tipográficas, espaciados o controles.

El inventario vigente incluye los colores de [Body por propiedad](body.semantic-colors.amendment.v1.0.0.md), [Caution](caution.amendment.v1.0.0.md) y [disabled](body.disabled.amendment.v1.0.0.md), con 61 tokens Body. La política enumera todas las fuentes en body.data_sources y conserva body.data como referencia inicial. El preflight lee cada fuente verificada y une solo los nombres de la colección component con prefijo exacto body/. No puede omitir una ampliación ni volver al inventario inicial si una fuente falta.

## CONSUMPTION-04 · GitHub es la fuente de consumo

El punto de entrada instalable solo enlaza el workflow vigente. Este contrato, los workflows, las herramientas, los contratos de componentes, datos y tokens residen en Migueluckleo/Blue-Heart-DS. En cada encargo se resuelve el commit vigente de main y se mantienen fuentes coherentes con ese commit. No se usan copias instaladas ni paquetes históricos como fallback.

La carpeta del trabajo puede contener el código necesario para construir, fuentes obtenidas para ese encargo y comprobantes. No es un catálogo permanente de la skill. El próximo encargo vuelve a consultar GitHub. Preparar este contrato no publica ni instala por sí mismo.

## CONSUMPTION-05 · Índice y verificación

El índice reducido derivado de Graphify debe incluir este contrato, sus datos y sus relaciones explícitas con Body, visibilidad y componentes. Ambos workflows lo leen antes de planificar o escribir. Las consultas se dirigen por identidad y propósito; recuperan bases, enmiendas, dependencias y los datos delegados de estados, variantes y tokens. El índice descubre fuentes; las fuentes originales verificadas gobiernan las decisiones.

El preflight identifica todos los componentes oficiales y todas las moléculas. Cada molécula declara su tipo, propósito, composición y tokens Body. La lectura final comprueba instancias/exports reales y el consumo de tokens o bindings. Un control imitado, un átomo local o una molécula sin evidencia de Body impide declarar conformidad. La revisión visual y funcional sigue siendo obligatoria, incluidas estructuras dibujadas que los detectores automáticos no reconozcan.

Los comprobantes registran commit, URLs, hashes de este contrato, datos, familias y fuentes utilizadas, consultas Graphify y alcance real del QA. Un PASS de integridad no equivale por sí solo a conformidad de producto ni a aprobación humana.

## CONSUMPTION-06 · AppShell como anfitrión estratégico

Toda pantalla y cada estado de un flujo de producto usan [AppShell](../components/app-shell.contract.v1.0.0.md) oficial como anfitrión. No se reconstruye su estructura mediante encabezados, sidebars y contenedores locales. El mapa registra la instancia real, sus propiedades y las familias dependientes que la pantalla requiere. El QA comprueba su identidad, regiones, layout, navegación y comportamiento aplicable.

Las moléculas de producto se montan dentro del Slot Body del AppShell. Se respetan Header, Sidebar, Section Header y las demás regiones según el contrato y sus enmiendas; su presencia y configuración dependen de la función de la pantalla, sin inventar una anatomía alternativa.

Para conversaciones, AppShell usa el modo conversation cuando el corte lo ofrece y aloja Chat en Body. Las herramientas laterales se ubican en el slot correspondiente y conservan las reglas de Rail/Panel. Se verifican AppShell y Chat en cada estado del flujo. El correcto uso del anfitrión es condición de conformidad de la pantalla, además de la corrección de cada control aislado.

## QA acotado dentro del maestro

Por solicitud explícita del usuario del 17 de noviembre de 2026, una prueba de consumo puede construirse en la página Playground configurada del maestro. Esta excepción requiere activación expresa en el preflight, contenedor aislado con nodos nuevos, URL de la página autorizada y readbacks de preservación antes/después de todos los principales utilizados. Los componentes principales, tokens, estilos y material ajeno permanecen intactos. Las pantallas de producto ordinarias siguen usando archivos separados del maestro y de la raíz histórica.

## HEADER-FIRST-001 · Header obligatorio en el primer resultado

Al construir una plataforma nueva o una función nueva, el primer resultado entregado incluye completo el apartado [Header / Content](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=90-1189): Version, Actions, Company y User interaction, con los componentes oficiales y sus tokens internos. El AppShell conserva este Header; no lo omitas por criterio del agente ni porque el brief no lo mencione. Esta regla aplica tanto al PO Prototype como a la pantalla editable de Figma.

Solo una solicitud explícita del usuario permite omitir un bloque. Por ejemplo, después de mostrar el resultado completo, «remueve el user interaction» retira únicamente ese bloque del prototipo o de las pantallas Figma que se estén trabajando. La referencia inicial siempre es la composición completa; registra la solicitud de retirada como un cambio explícito del usuario, no como un nuevo valor por defecto para otras plataformas o funciones. Usa las propiedades soportadas por el Header, conserva los otros bloques y sus tokens, y no modifiques el principal del DS. Registra qué se quitó y la instrucción que lo sustenta en el mapa, el traspaso y el QA. Sin esa solicitud, la aceptación exige los cuatro bloques visibles en el primer resultado.
