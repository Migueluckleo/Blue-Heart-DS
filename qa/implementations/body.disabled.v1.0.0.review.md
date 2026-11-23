# QA · Body disabled y descripciones Dropdown

Fecha: 2026-11-23. Resultado: **PASS** en Figma, datos canónicos y consumo web. user_audit: NOT_REQUIRED; human_review_policy: OPTIONAL_NON_BLOCKING. Alcance: [FOUNDATIONS-BODY-DISABLED-001](../../specs/foundations/body.disabled.amendment.v1.0.0.md), cuatro roles nuevos y cinco descriptions Dropdown corregidas desde sus datos normativos. Las versiones de componentes y paquetes se conservan.

## Figma

Archivo AI Blueheart DS `yZsIpXywybsPDytjolwcP4`, sesión `a01775a6-65bf-490c-8127-4ed6cf0df02b`. La [lectura posterior](../../implementations/figma/body-disabled-2026-11-23/readback.json) registra los cuatro IDs reales: text `616:2`, bg `616:3`, stroke `616:4` y shape `616:5` (prefijo VariableID). Todos son COLOR en component, con 16 aliases a los tres semánticos locales y codeSyntax WEB canónico. Texto/shape resuelven #94A3B8, bg #F1F5F9 y stroke #E2E8F0 en los cuatro modos. Sus scopes son TEXT_FILL, FRAME_FILL+SHAPE_FILL, STROKE_COLOR y SHAPE_FILL respectivamente.

Conteo posterior: 1,536 variables; 61 Body visibles; cero no-Body visibles y cero ALL_SCOPES. Tres colecciones conservadas: primitives 201, semantic 159, component 1,176. No se cambiaron diseños, componentes, estilos ni bindings previos; no se publicaron variables o biblioteca.

Se compararon las 11 definiciones previas seleccionadas, registradas en [before.json](../../implementations/figma/body-disabled-2026-11-23/before.json). Solo cambiaron cinco descriptions: `dropdown/spacing/menu-search-gap`, `size/318`, `size-318`, `dropdown/size/menu-content-max` y `dropdown/size/menu-search-height`. Coinciden literalmente con [dropdown-menu.search.v1.0.0.json](../../specs/tokens/dropdown-menu.search.v1.0.0.json); IDs, keys, scopes, valores, aliases, sintaxis y publicación permanecen iguales. Los seis semánticos/primitivos leídos permanecen idénticos.

## JSON canónicos y cadena de tokens

La comparación completa reutiliza la captura integral de 1,532 variables de la auditoría anterior y aplica el delta real leído de 11 variables existentes y cuatro nuevas; no se presenta como una segunda lectura integral de todo Figma. La captura baseline y su SHA-256 se registran en [la validación](body-disabled-2026-11-23/canonical-validation.json).

Inventario efectivo: 1,536 tokens (607 COLOR, 807 FLOAT, 122 STRING), 5,064 entradas por modo; cero faltantes/extras, diferencias de description/codeSyntax/scopes/valores, aliases sin resolver, ciclos o saltos de capa. Las 1,187 identidades base y los 89 targetId explícitos conservan su correspondencia. Caution sigue completo: 9 primitivas + 4 semánticos + 8 de componente, 21 tokens. Se preserva el SHA-256 del inventario histórico v0.1.2; la fuente activa incorpora la enmienda disabled y la política ampliada mediante config/web-inputs.json.

## Web

`pnpm verify`: PASS; generación/verificación P07 de 51 familias, TypeScript, 18 tests y build Next.js estático. Se actualizaron CSS y manifest desde los datos delegados, sin cambiar las APIs de componentes.

`BODY_QA_DIR=qa/implementations/body-disabled-2026-11-23 node tests/body-playground.browser.mjs`: PASS en Chrome. [Resultados](body-disabled-2026-11-23/chrome.json): 61 tokens Body, 37 colores, 16 comprobaciones de propiedades disabled en cuatro temas, shape/inverse y Caution conservados, cinco Cards, anchos del Shell 1272/1110/1272, interacciones de teclado y scroll a 320 px. Las comprobaciones de contraste para contenido activo permanecen; disabled se valida como paleta inactiva y no se aplica a ella el umbral del texto activo. El primer intento fue limitado por el sandbox al abrir 127.0.0.1; el QA se completó con la ejecución local permitida por el entorno. La captura del specimen registra la regresión de los roles existentes, no un nuevo componente o demo disabled.

## Cierre y consumo

El cierre local coordinado de este corte usa `scripts/ds close --run 2026-11-23-body-disabled-consumption`. Su comprobante operativo queda en output/closures; catálogo y Graphify se validan antes de distribuir el corte a los chats de las dos skills autocontenidas. Los paquetes se actualizan sin cambiar versiones ni editar releases anteriores. La verificación de los paquetes/grafos y el push GitHub tienen comprobantes de coordinación separados; este QA no los da por ejecutados anticipadamente.

La revisión de consumo detectó una omisión verificada en body.data_sources/body.amendments de la policy de producto. Se corrigieron sus cuatro fuentes (Body inicial, colores semánticos, Caution y disabled) y sus tres enmiendas, conservando versión 1.0.0. La union por colección/prefijo coincide con los 61 Body del manifest. Esta corrección cambia el corte y se prepara el cierre body-disabled-consumption; la preparación previa body-disabled-dropdown se conserva como evidencia parcial, sin certificarla CURRENT.

QA adicional de policy: `python3 -m unittest discover -s tests -p test_product_consumption_figma.py` PASS (12 tests) y `node --test tests/product-consumption.test.mjs` PASS (5 tests). El gate Figma acepta los ocho roles Body de Caution/disabled y conserva bloqueos por fuente ausente; una regresión nueva comprueba que body.data_sources coincida con todas las fuentes activas que contienen component/body/. Los fixtures consumen las cuatro fuentes de la policy sin listas históricas incompletas.
