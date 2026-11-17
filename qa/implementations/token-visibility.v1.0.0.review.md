# QA de implementación · Visibilidad de tokens

2026-11-17 · FOUNDATIONS-TOKEN-VISIBILITY-001 · TOKEN-QA-03: **PASS**.

Corrección aplicada al maestro `yZsIpXywybsPDytjolwcP4`, sesión Figma `8590ac8f-2c0f-4c50-81b8-85d6c7eb3b36`. La única escritura documental Figma fue `scopes=[]` en 1,098 variables internas. Otras 331 ya estaban ocultas; los 33 tokens Body conservaron sus scopes específicos. Resultado: **33 visibles y 1,429 internos ocultos**, de 1,462 variables locales. No se editó el lienzo ni se publicó la biblioteca.

## Lectura posterior y preservación

- Inventario completo de IDs, nombres, keys, tipos, descripciones, valores por modo, aliases, codeSyntax, remote y hiddenFromPublishing: idéntico antes/después salvo scopes autorizados. Colecciones, modos, orden y publicación: idénticos.
- Los 4,643 valores de alias conservan sus IDs y tipos. Los 1,123 tokens component siguen enlazando semantic en cuatro modos; los 151 semantic enlazan primitives. Los 188 primitives conservan valores.
- Solo `component` con prefijo exacto `body/` tiene scopes no vacíos, todos declarados y compatibles. Nombres que contienen body en otra posición quedan ocultos. No quedan ALL_SCOPES ni scopes generales visibles.
- Los cinco estilos Body conservan IDs, keys, métricas, nombres y todos los bindings leídos.
- Huellas SHA-256 idénticas en las 43 páginas: 19,692 nodos leídos, 15,484 con bindings directos, incluyendo instancias anidadas y capas invisibles. La serialización coteja identidad/tipo, boundVariables, paints, efectos, referencias a estilos, modos explícitos y segmentos de texto con sus bindings. La función SHA-256 pasó el vector conocido `abc`. No se usó una captura visual como sustituto de enlaces reales.

Las lecturas completas están en [before](../../implementations/figma/token-visibility-2026-11-17/before.json), [after](../../implementations/figma/token-visibility-2026-11-17/after.json), [IDs mutados](../../implementations/figma/token-visibility-2026-11-17/mutation.json), [bindings antes](../../implementations/figma/token-visibility-2026-11-17/bindings-before.json), [bindings después](../../implementations/figma/token-visibility-2026-11-17/bindings-after.json), [estilos antes](../../implementations/figma/token-visibility-2026-11-17/styles-before.json) y [estilos después](../../implementations/figma/token-visibility-2026-11-17/styles-after.json). El [script de captura](../../implementations/figma/token-visibility-2026-11-17/capture-bindings.js) permite repetir la lectura en Figma.

## Web y datos canónicos

El manifest efectivo contiene 1,462 tokens: únicamente los 33 Body tienen scopes. La corrección se aplica al final de los inventarios sin reescribir sus snapshots ni campos funcionales. El CSS conserva exactamente SHA-256 `ef93eb3095f96fc4bf2fbd9824577580cec47e82d3fc76d9fa5b37bb842063f0` antes y después; el ajuste no cambia aspecto, referencias CSS ni valores por tema. El control P07/TOKEN-QA-02 verifica el generador y las 50 familias. No se modificó comportamiento visual o interactivo que requiriera otro QA de navegador.

Ejecutado `python3 implementations/web/scripts/check_token_visibility.py --evidence implementations/figma/token-visibility-2026-11-17 --output output/qa/token-visibility-2026-11-17/validation.json`: PASS. Incluye casos de frontera de namespace, otra colección, mayúsculas, rol Body no declarado y rechazo de ALL_SCOPES. La generación valida automáticamente esta política en futuras altas.

## Límites y cierre

COLOR, FLOAT y STRING admitieron y conservaron `[]` en lectura posterior. No hubo tipos presentes incompatibles. BOOLEAN no existe en este corte y no se declara probado; cualquier tipo futuro requiere verificación y reporte explícito si la API rechaza la configuración. GAP cubre gap y padding; no existe scope separado de padding. La publicabilidad se conserva íntegra y no se usa como sustituto de scopes.

El contrato, datos canónicos, protocolo QA, reglas de diseño y ambas guías de consumo incluyen la política y la regla futura. El cierre local se registra en `output/closures/2026-11-17-token-visibility.json`; Graphify, catálogo y ambos paquetes se sincronizan desde este mismo corte. La instalación y publicación permanecen fuera del alcance. Métricas de uso de cuenta/tokens no observables: UNAVAILABLE; no se atribuye consumo exclusivo a esta tarea.
