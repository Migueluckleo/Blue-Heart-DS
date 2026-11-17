# QA de implementación · Body

2026-11-17 · FOUNDATIONS-BODY-001 · PASS en Figma y web.

## Tokens y estilos

Se crearon 33 tokens body/* en component y el rol semantic warning-strong, reutilizando amber/800. No se añadió una colección ni una primitiva. Se verificaron por identidad las cadenas component → semantic → primitives en Contable, Administrativo, Servicios y Personas, tipos, scopes, descripciones y sintaxis WEB. Los cinco estilos compartidos body/heading/h1, h2, h3, description y caption conservan sus bindings y Manrope. H1/H2/H3: 24/20/16 px; descripciones 14 y caption 12. Interlineados: 32/28/24/20/16.

TOKEN-QA-01 pasó para los bindings propios de Body y overrides de controles: 440 bindings y 23 overrides revisados, sin hallazgos de capa o cadena. Se contrastaron además todos los tokens nuevos por modo y los cinco campos de cada estilo. TOKEN-QA-02, generación web y el chequeo de derivados pasaron. Las siete tintas de texto se verificaron en ambos fondos y los cuatro modos: contraste mínimo 4.501742. Warning usa el rol fuerte para conservar legibilidad; los componentes existentes conservan sus aliases.

## Composición de comprobación

Playground 203:93 contiene una instancia oficial de App Shell 347:2597. Sus cinco demos son FRAME, sin componentes o sets de Card y sin altas en el catálogo ni fichas de Cards. Se conservó el resto de Playground. El contenido está dentro del Slot Body, Fill en ancho y alto. La prueba de menú preservó los cinco frames con Body de 1272 px o 1110 px.

Las separaciones entre Cards y entre filas de bloques independientes usan body/spacing/xl, 32 px. El padding exterior del contenedor de demostración también conserva el ajuste de 32 px. Dentro de cada Card: padding 24, segmentos 16, contenido del segmento 8 y título/descripción 4. Los widgets locales usan las medidas Body que corresponden. Se comprobó por separado la escala exterior e interior. Las demos tienen composiciones diferentes y reutilizan siete Buttons, dos Icon Buttons Ghost, cinco Badges, cinco Linear Progress y dos Checkboxes oficiales. Sus controles conservan tokens y variantes propios. La revisión visual comprobó textos editables, medidas, ancho y controles dentro del contenido. Los efectos locales del Playground no definen nuevos roles o variantes del DS.

## Web y skills

TypeScript, build de Next y las 12 pruebas Node pasaron. Chrome verificó cinco composiciones distintas, las escalas tipográficas, padding y gaps, 32 px entre Cards, temas, colores resueltos, contraste y anchos con menú abierto/cerrado. Comprobó Buttons y Ghost por teclado, feedback local y cambio de casillas/progreso. El prototipo no ejecuta operaciones remotas ni persiste datos. [Prueba](../../implementations/web/tests/body-playground.browser.mjs) · [Resultado](../../output/qa/body-tokens-2026-11-17/chrome.json).

Las dos skills remiten al contrato y datos Body desde el snapshot verificado para contenido específico de producto. Su frontmatter se conserva y se validó con Ruby/Psych del proyecto; el quick_validate externo no pudo ejecutarse por ausencia de PyYAML y no se instaló ninguna dependencia. Se comprueban empaquetado e integridad en el cierre local. Las Cards continúan fuera del registro de componentes consumibles.

[Lectura Figma y QA de tokens](../../implementations/figma/body-tokens-2026-11-17/readback.json) · [Contrato Body](../../specs/foundations/body.contract.v1.0.0.md) · [Captura web](../../output/qa/body-tokens-2026-11-17/web-playground.png).
