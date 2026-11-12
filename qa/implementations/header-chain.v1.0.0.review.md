# QA de implementación · Header y dependencias

2026-11-11 · COMPANY-SELECTOR-001, USER-SELECTOR-001, HEADER-ACTIONS-001 y HEADER-001. PASS en Figma y web.

| Maestro | Fuente | Destino | Variantes | Diferencias en lectura |
|---|---|---|---:|---:|
| [Company selector](../../implementations/figma/root-families-2026-11-11/company-selector-0.readback.json) | `500:44` | `90:105` | 4 | 0 |
| [User selector](../../implementations/figma/root-families-2026-11-11/user-selector-0.readback.json) | `500:85` | `90:138` | 4 | 0 |
| [Header actions](../../implementations/figma/root-families-2026-11-11/header-actions-0.readback.json) | `500:132` | `90:437` | 5 | 0 |
| [Header](../../implementations/figma/root-families-2026-11-11/header-0.readback.json) | `500:1189` | `90:439` | 1 | 0 |

La [prueba desde instancias](../../implementations/figma/root-families-2026-11-11/header-chain-consumer.readback.json) pasó 23 comprobaciones. Verificó Company abierto, nombre largo y tres anchos, User abierto con Avatar de texto de 48 px, cinco recuentos con la notificación conservada, y Header a 1280 y 1152 × 96, con los bloques opcionales y el key oficial de contabilidad. Retiró las instancias temporales. Los estados y reacciones guardados de Company y User tienen evidencia de escritura y lectura. Reproducción nativa NOT_RUN.

TypeScript, 9 pruebas Node y el build de Next pasaron. [Chrome en localhost](../../implementations/web/tests/buttons-loader.browser.mjs) verificó apertura y cierre por teclado, restauración del foco de Company, foco de apertura en User, nombre accesible con 103 notificaciones y presentación 99+, evento de acción, altura, ancho mínimo y decodificación del logo junto al Badge Alpha 1.
