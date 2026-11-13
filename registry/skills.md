# Releases de las skills BlueHeart

## v1.0.4 · 2026-11-12

Parche local del motor Figma. El preflight reconcilia el manifiesto y las Specs para exigir seguimiento de todas las familias. Las composiciones locales registran alternativas y carencias funcionales con evidencia del corte. El informe de lectura asigna resultados por familia y conserva los nodos observados.

## v1.0.3 · 2026-11-12

Parche local del motor PO. Las composiciones locales registran la búsqueda funcional y las carencias concretas de cada alternativa relevante, con fuentes del corte. El HTML descargable deriva su nombre del producto o flujo del brief y conserva el mismo nombre y hash en el manifiesto, la captura y el traspaso. Los paquetes v1.0.2 se conservan como releases históricos.

## v1.0.2 · 2026-11-12

Parche local del motor PO. El mapa previo de controles y dependencias y el seguimiento exhaustivo por familia quedan ligados al corte GitHub verificado. Cada familia registra uso verificado, no aplicabilidad o excepción sustentada. El build y el traspaso comprueban el uso de exports, documentan la falta de implementación web y registran excepciones con evidencia de la familia. Se conserva `init.mjs` desde el runtime resuelto. La evidencia del cierre y las pruebas se registra en `output/closures/`.

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

## Corte local Conversation Composer · 2026-11-12

CONVERSATION-001 se incorpora al catálogo común de contpaqi-figma-screens y contpaqi-po-prototypes. La ruta de consumo y la versión de los motores se conservan. La verificación del corte se registra en el comprobante local `output/closures/2026-11-12-conversation-composer-final.json`.

## Corte local Conversation Response · 2026-11-12

CONVERSATION-RESPONSE-001 incorpora la spec, los IDs del set oficial y el export React al catálogo común. El comprobante local del corte está en `output/closures/2026-11-12-conversation-response.json`.

## Corte local de la corrección de tokens · 2026-11-12

El catálogo común incorpora los aliases de componente y las fichas corregidas en sus versiones vigentes. El comprobante local se genera en `output/closures/2026-11-12-component-token-layer.json`.
