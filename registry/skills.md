# Releases de las skills BlueHeart

## v1.0.1 · 2026-11-12

Parche del motor de consumo. `contpaqi-po-prototypes` verifica en build el export de cada instancia DS, detecta sustituciones en el HTML y comprueba Header y Sidebar en Chromium. El traspaso conserva la evidencia ligada al HTML y al snapshot. La regresión usa la entrega original de Genspark y una composición oficial. [QA de consumo](../qa/skills/component-enforcer.v1.0.1.review.md). El motor compañero conserva el corte común del paquete. Comprobantes del cierre e instalación local en `output/closures/`.

## Incidencia OpenCode · 2026-11-12

Se observó `ENOENT` al ejecutar `init.mjs` desde el motor instalado con `github-live-v1`. El cargador crea el release y el manifiesto en el `runtime`. Se corrigieron las instrucciones del motor PO y se agregó un diagnóstico al inicializador para el caso sin snapshot. El cierre y la prueba dirigida se registran como `2026-11-12-po-init-runtime` en `output/closures/`.

`user_audit: NOT_REQUIRED` · `human_review_policy: OPTIONAL_NON_BLOCKING`.

## v1.0.0 · 2026-11-12

- Motores `contpaqi-po-prototypes` y `contpaqi-figma-screens`. Canal [Blue-Heart-DS en GitHub](https://github.com/Migueluckleo/Blue-Heart-DS), rama `main`, catálogo versionado por hashes.
- Biblioteca de consumo [AI Blueheart DS](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=0-1). Cada prototipo editable usa el archivo autorizado para ese encargo.
- Cada instancia conserva la tipografía definida por su contrato. El traspaso lleva métricas de texto y fuentes por hash. La revisión de un catálogo tipográfico adicional se difiere hasta observar una carencia concreta.
- Las consultas dirigidas al índice de Graphify incluyen las dependencias declaradas y las enmiendas de las familias relacionadas. Las fuentes del corte siguen gobernando las reglas.
- El manifiesto de los dos ZIP locales y los comprobantes de ejecución se generan bajo `output/skills/1.0.0` y `output/closures`.
