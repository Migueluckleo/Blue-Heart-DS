# Evidencias finales de QA Skills · 2026-11-17

Este corte publica evidencias existentes del QA de `contpaqi-po-prototypes` y `contpaqi-figma-screens`. La publicación fue solicitada expresamente por el usuario. No se repitieron pruebas de producto, no se modificó Figma y no se instalaron skills ni dependencias.

## Po Prototypes y consumo directo de GitHub

Resultado registrado: **PASS funcional con una observación de toolchain**, sobre `e07ba22e607c4c55b0d8a810c96cba9b6c964bfb`.

- [Informe final](../github-direct-workflow-2026-11-17/final-report.json).
- [HTML autónomo final](../github-direct-workflow-2026-11-17/live-po-tsalm99s/prototype/entrega/revision-de-cierre-qa.html) y [handoff para Figma](../github-direct-workflow-2026-11-17/live-po-tsalm99s/prototype/entrega/replicar-en-figma.md).
- [Captura oficial y hashes](../github-direct-workflow-2026-11-17/live-po-tsalm99s/prototype/capture/report.json) y [QA adicional de navegador](../github-direct-workflow-2026-11-17/live-po-tsalm99s/browser-extra-report.json).
- [Consumo GitHub de Figma en ese corte](../github-direct-workflow-2026-11-17/live-figma-consumption.json).
- [Observación Next.js](../github-direct-workflow-2026-11-17/live-po-tsalm99s/next-security-observation.log): se conservó `SecurityFatalError`; el mismo build pasó al repetirse. No se actualizaron dependencias ni se completó una evaluación de seguridad.

El informe registra 156 fuentes verificadas, seis consultas Graphify, ocho estados/viewport por `file://`, cero solicitudes HTTP(S), ocho casos adicionales de temas y anchos, tres mutaciones rechazadas, 25 tests locales aprobados y dos fixtures históricos Genspark omitidos. En ese primer corte Figma se limitó a consumo remoto y gates sintéticos.

## QA vivo Figma · Anticipa AI

Resultado registrado: **PASS**, sobre `b5c4b9a0a8f8adc776ca036c5e86cb551d44b69f`.

- [Informe final](../figma-live-playground-2026-11-17/QA-FIGMA-ANTICIPA-AI.md), [resultado verificable](../figma-live-playground-2026-11-17/final-report.json) y [manifiesto original de 42 evidencias](../figma-live-playground-2026-11-17/final-evidence-manifest.json).
- [Prototipo navegable](https://www.figma.com/proto/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=385-5169&starting-point-node-id=385%3A5169) y [Playground](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=385-5168).
- [Vista de seis pantallas](../figma-live-playground-2026-11-17/final-overview.png) y [captura final](../figma-live-playground-2026-11-17/final-screen.png).

La evidencia registra seis pantallas, 54 instancias oficiales, 30 moléculas Body, 18 textos editables, 16 casos de tema/ancho/menú, 14 rutas reales y 17 tests de regresión. Preflight y readback final pasan sin hallazgos; las tres mutaciones negativas fueron rechazadas y restauradas. Se publican también las cuatro lecturas originales necesarias para comparar la preservación. Quedan fuera los destinos externos de controles globales y una auditoría completa de accesibilidad. No se publicó la biblioteca Figma.

## Integridad y selección

El [manifiesto de publicación](manifest.json) enumera los archivos de evidencia, sus tamaños, SHA-256 y blobs Git. Se comprobaron los 42 hashes del manifiesto Figma, la igualdad JSON de las cuatro lecturas originales salvo su fecha `observed_at`, el hash del HTML y las 16 capturas (ocho originales y sus ocho copias de entrega). También se conservaron y verificaron contra su manifiesto las 156 fuentes que forman parte del snapshot del handoff final autosuficiente. Estas son comprobaciones de integridad, no una repetición de las pruebas de producto.

Se conservan los bytes originales de informes y entregables, incluidas las rutas absolutas del entorno y los estados intermedios de comprobantes. Por ejemplo, `summary.json` documenta la preparación y el manifiesto HTML precede al QA de navegador; los informes finales y los reportes de captura documentan la aceptación posterior. Los nombres de carpetas con identificadores de sesión se mantienen para conservar la trazabilidad.

Se excluyeron runtimes descargados, copias de trabajo de fuentes del DS, compilaciones intermedias, HTML de trabajo duplicado, intentos anteriores, diagnósticos sustituidos, fragmentos paginados de transporte, cachés, temporales y catálogos históricos. El snapshot dentro de `entrega/referencias/design-system/` pertenece a la entrega final y se conserva para que sus referencias funcionen. Los cambios ajenos del directorio de trabajo no pertenecen a esta publicación.

Todos los archivos añadidos están en `output/qa/`, fuera del corpus DS según `config/ds-project.json`; no se reconstruyeron Graphify ni el catálogo y no se alteraron las fuentes del sistema de diseño.
