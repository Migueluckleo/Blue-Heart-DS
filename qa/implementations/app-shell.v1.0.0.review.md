# QA de implementación · App Shell

2026-11-11 · APP-SHELL-001 · PASS en Figma y web.

## Figma

Set fuente `940:1376` → `105:7` en página App Shell `105:2`. La [lectura independiente](../../implementations/figma/root-families-2026-11-11/app-shell-0.readback.json) comprobó las cuatro variantes, 56 nodos y 108 bindings sin diferencias. Cada raíz mide 1440 × 1024. El Grid es nativo de cuatro pistas FLEX por eje, con gaps de 32 y anclas, spans y alineación cotejados. Flex conserva dos regiones de 620 o 539 px y una región de ancho completo. La Description enlaza el ejemplo fuente `941:1319`.

La [prueba desde instancias](../../implementations/figma/root-families-2026-11-11/app-shell-consumer.readback.json) pasó 37 comprobaciones. Confirmó los tres vínculos oficiales y el control Sidebar Secondary. En cada variante se comprobó el Slot Body compartido `Body#105:0` vacío, con uno y tres elementos, reordenamiento, retirada, reemplazo y conservación del override al cambiar ambos ejes. A 1280 px, Main se ajustó a 1112 o 950 px y conservó el contenido largo. La página quedó con solo el set oficial. La reproducción visible de reacciones heredadas en el presentador nativo permanece NOT_RUN.

## Web

TypeScript, nueve pruebas Node y build de Next pasaron. [Chrome en localhost](../../implementations/web/tests/buttons-loader.browser.mjs) comprobó Grid y Flex, anchos 1272/1110 con Shell de 1440, pistas 294/253.5, Enter y Espacio en Sidebar, Secondary y foco conservado. El valor editado y el orden de Body persistieron en los cuatro estados. La muestra de catálogo usa una región nombrada porque el catálogo ya tiene su propio main. App Shell usa main por defecto en una página anfitriona.
