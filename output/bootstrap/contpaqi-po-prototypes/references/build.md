# Build y QA offline

```text
node <skill>/scripts/init.mjs <salida-nueva>
cd <salida-nueva>
npm install
npm run build
npm run capture
npm run handoff
```

El agente necesita Node compatible y dependencias locales; abrir el resultado solo
requiere navegador con JavaScript. `init` verifica el snapshot y crea package.json
con la versión del release y versiones exactas del paquete web. Conserva el
lockfile creado. Puede reutilizarse un node_modules compatible para pruebas; no
instalar globalmente. La red puede hacer falta para compilar por primera vez,
nunca para abrir el HTML final.

`prototype/` es fuente editable; `prepare.mjs` deriva `app/`, `ui/` y el mapa de
assets en cada build. La fuente Next usa una única ruta cliente. Usa estado/hash;
lee window dentro de efectos. No uses Next Link/router entre archivos, dynamic(),
imports diferidos, APIs de servidor, fetch, CDN, next/image, fuentes remotas,
Service Workers ni APIs que exijan origen HTTP. La persistencia es opcional con
fallback en memoria; no depender de localStorage bajo file://.

Los archivos locales de `public/` se embeben en un mapa de data URI. El transform
TypeScript deriva atributos JSX src/poster/xlinkHref para resolver ese mapa,
incluidos logos JSON y medios de modales mostrados después de interactuar. Usa
`/assets/...` con archivos incluidos o data URI; no srcSet. CSS y fuentes compiladas
se embeben al exportar. Assets CSS en línea deben ser data URI o referencias #
locales; no construir
DOM/URLs de assets por mecanismos externos al JSX transformado. SVG inline del DS
conserva sus geometrías. Recompila al añadir assets.

El exportador procesa out/index.html con scripts clásicos webpack. No es un
empaquetador universal de Next. Rechaza recursos externos conocidos y enlaces que
no sean hash. Next 16.4 necesita el adaptador privado asset-prefix que lee
data-original-src; actualizar Next exige volver a verificar esta integración.
No intercepta fetch, history ni errores para ocultar fallos.

`capture.mjs` usa Playwright sin servidor. Por defecto busca Chromium instalado;
`PLAYWRIGHT_CHANNEL=chrome npm run capture` permite usar Chrome disponible. Si falta
capacidad informa NOT_RUN, no instala un navegador automáticamente. La copia
aislada solo contiene el HTML renombrado; HTTP(S) y Service Workers se bloquean.
Espera hidratación React, fuentes e imágenes; detecta archivos vecinos, errores,
imágenes rotas, identidad/props inconsistentes y aserciones fallidas.

Cada estado parte de una recarga y ejecuta su receta de acciones. Incluye al menos
un estado tras interacción, teclado y recorridos completos con cancelación/retorno
cuando existan. Las pruebas independientes de estado no prueban una transición
que no se haya incluido. Captura bounding boxes, texto, props declaradas, CSS,
fuentes, colores y variables --ds-* de nodos marcados, más PNG de cada viewport.
Comprueba contenido largo y composición variable más allá del ejemplo.

Revisa las capturas y registra revisión visual separada en brief.checks. Si cambias
brief o HTML, repite capture antes del handoff: ambos hashes son vinculantes. Si
no hay navegador se puede entregar evidencia NOT_RUN y su limitación; un FAIL
requiere corregir o señalar que la entrega no está lista como prototipo funcional.
