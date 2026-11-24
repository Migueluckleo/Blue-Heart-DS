# Header y App Shell · Tokens propios de espaciado

2026-11-24 · Corrección solicitada, v1.0.0 · VALIDATED en el alcance de [la enmienda](../../../specs/components/header-app-shell.spacing.amendment.v1.0.0.md). Archivo AI Blueheart DS y nodos existentes conservados; no se crea familia, no se publica ni instala.

Header 90:439 conserva padding exterior 32 usando el nuevo header/spacing/container-padding; sus ocho instancias en App Shell reciben el mismo binding. App Shell 105:7 conserva gap raíz y padding superior 0 mediante el nuevo app-shell/spacing/none; padding inferior y Conversation layout usan el existente app-shell/spacing/content=32. Se corrigen 62 campos en 27 nodos; interior Header 24/8/0 permanece.

- [Mapa de IDs reales](id-map.json): dos FLOAT internos, cuatro aliases por modo y codeSyntax; los IDs lógicos del JSON no sustituyen IDs Figma.
- [Mutación Header](header-mutation.json), [mutación App Shell](app-shell-mutation.json) y scripts apply-header.js/apply-app-shell.js: escritura con $fig en dos fases por página.
- [Readback del verificador](token-qa.json), [huellas finales](after.fingerprints.json), [preservación](preservation.json) y [validación consolidada](validation.json).
- [Fuente anterior](../../../sources/figma-snapshots/header-app-shell-2026-11-24/before.layout.json), [QA Figma/web](../../../qa/implementations/header-app-shell.spacing.v1.0.0.review.md) e [informe operativo](../../../output/qa/header-app-shell-2026-11-24/README.md).

Las 1,536 variables anteriores, colecciones/modos y cinco estilos Body quedan idénticos; 44 bindings Body dentro de contenido de producto de Slots permanecen. Total efectivo 1,538, Body 61. Capturas nativas antes/después idénticas; la web replica el espaciado propio y pasa 32 casos de layout en Chrome. El QA se limita a estas propiedades y sus interacciones de composición.
