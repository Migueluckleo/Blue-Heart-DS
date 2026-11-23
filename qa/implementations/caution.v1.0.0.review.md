# QA técnico · Caution 1.0.0

Fecha: 2026-11-23. IMPLEMENTATION_REVIEW: PASS. user_audit: NOT_REQUIRED. human_review_policy: OPTIONAL_NON_BLOCKING.

## Fuentes y resultado

[Enmienda delegada](../../specs/foundations/caution.amendment.v1.0.0.md), datos y digest enlazados en ella. [Lectura real y mapa de IDs](../../implementations/figma/caution-2026-11-23/readback.json). Archivo Figma yZsIpXywybsPDytjolwcP4; cuenta corporativa del destino registrado.

- REQ-CAUTION-01..03 / TOKEN-QA-01,03 PASS: nueve primitivas caution-orange, cuatro semantic y ocho component. Valores, aliases por identidad y modo, scopes, codeSyntax y descriptions contrastados con el JSON. Component tiene los cuatro temas vigentes. No se crean colecciones ni se modifica orange/Servicios. Solo los cuatro Body nuevos se ofrecen en selectores por función.
- REQ-CAUTION-04 PASS: Badge set 64:90 contiene 21 variantes. Caution 574:2, 574:6 y 574:10. Strokes vacíos, texto e iconos vinculados a tokens Caution, tipos small/medium/large, Label y booleanas/swaps preservados. Default subtle/small conservado.
- REQ-CAUTION-05..06 PASS: tres sets públicos con 30 variantes cada uno y auxiliar con 15. Los 18 nuevos públicos conservan texto/visibilidad y estructura; el determinado remite a las nuevas etapas del mismo tamaño. Los tres indeterminados consumen 574:11882; ciclo rest→exit→enter→rest con destinos propios 574:11882, 574:11884 y 574:11886, transiciones/triggers del baseline. Es evidencia estructural del prototipo; no se atribuye una prueba de reproducción del presentador.
- REQ-CAUTION-07 PASS: roles Body fondo/texto/stroke/shape disponibles. Muestra editable en Playground 576:9686, compuesta con instancias oficiales, Auto Layout y estilos Body compartidos en Manrope. Inspección visual de la captura final PASS; texto Body corregido a #9A3F06 con binding conservado. Las páginas oficiales contienen sus sets originales ampliados; no hay maestros nuevos en Playground.
- REQ-CAUTION-08 / TOKEN-QA-02 PASS: API TypeScript y CSS generados, ejemplos y fichas actualizados. Chrome verifica Badge Caution sin borde, colores exactos, progreso determinado e indeterminado y los cuatro roles Body en Contable, Administrativo, Servicios y Personas. [Evidencia Chrome](caution-2026-11-23/browser.json). [Regresión Body](caution-2026-11-23/body-regression/chrome.json): teclado, ancho 320 px, métricas y cuatro temas PASS. Contraste observado texto/fondo Caution: 5.8195:1.

## Comandos ejecutados

pnpm ds:generate; pnpm ds:check (51 familias, cero derivados desactualizados); pnpm typecheck; pnpm test (15/15); pnpm build (compilación y export estático PASS); node tests/caution.browser.mjs; node tests/body-playground.browser.mjs. Para build/Chrome se usó el Node del runtime local: el Node embebido de la app no cargó el SWC nativo firmado. El build exitoso no cambió dependencias. Los tests de Chrome requirieron servidor localhost y ejecución autorizada fuera del sandbox.

## Límites y cierre

Sin publicación de biblioteca, push remoto ni instalaciones de skills. El cierre de catálogo/grafo y sus comprobantes se registra por separado; este QA no lo presume. No se cambian umbrales de negocio ni se añaden interacciones a Badge. P-SLOTS NOT_APPLICABLE por extensión cromática de anatomía fija.
