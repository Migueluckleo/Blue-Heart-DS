# QA Skills · Figma · Anticipa AI

Resultado: **PASS**. Corte GitHub `b5c4b9a0a8f8adc776ca036c5e86cb551d44b69f`. Manifiesto `0f221d39af954b1a1e6e4c66ae01270dfa74f964863ff830cde5b2da1ac84d5d`. Sin instalar skills ni dependencias y sin publicar la biblioteca de Figma.

[Prueba en Playground](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=385-5168) · [Prototipo navegable](https://www.figma.com/proto/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=385-5169&starting-point-node-id=385%3A5169)

## Evidencia de aceptación

| Control | Resultado |
|---|---|
| Preflight y readback del código publicado | PASS, cero hallazgos |
| Familias del catálogo | 51 revisadas; 4 aplicables verificadas, 47 con motivo de no aplicación |
| Instancias explícitas del DS | 54: 6 AppShell, 6 Linear Progress, 12 Button y 30 Input |
| Contenido Body | 30 moléculas y 18 textos editables; sin nuevos átomos |
| Header inicial | Version, Actions, Company y User interaction visibles en las seis pantallas |
| Temas y anchos | 16 casos: cuatro temas × 1440/1280 × menú contraído/expandido |
| Navegación real | 14 rutas únicas en el reproductor y botón final deshabilitado |
| Contenido dinámico | Alta, reordenación y retiro en Slot Body; límites sin violaciones |
| Variante real de AppShell | Body conservado al expandir y restaurar la instancia |
| Texto largo | 680 caracteres, reflujo en Auto Layout, estilo Body conservado |
| Preservación | 9 principales, 105 variables/aliases, 3 colecciones, 5 estilos y 7 raíces previas del Playground |
| Pruebas negativas | Exactamente UNMAPPED_CONTROL, INTERNAL_TOKEN_CHANGED y BODY_BINDING_MISSING; restauración confirmada |
| Regresión local | 17 tests PASS con el entorno existente |

Main mide 1272/1110 px en 1440 y 1112/950 px en 1280 para menú contraído/expandido. La tarjeta conserva padding 24, gap 16 y radio 16 mediante Body. El botón conserva Manrope 14/20/700; los títulos y el contador consumen sus estilos Body correspondientes. Los tokens internos de los componentes no se sustituyen por Body.

## Reglas publicadas

`HEADER-FIRST-001` exige Header / Content completo al primer resultado de una plataforma o función nueva. Solo una instrucción explícita del usuario, como «remueve el user interaction», permite retirar ese bloque del PO Prototype o de la pantalla Figma en curso, sin modificar el principal ni establecer una omisión por defecto para otros trabajos. La serie de ambas skills continúa en `1.0.x`; el paquete lanzador local verificado es `1.0.9`, seguido por `1.0.10`, `1.0.11`, etc. No se instaló.

El QA corrigió el destino de Playground autorizado, la identidad del set de progreso, la procedencia de controles heredados de slots, el mapeo explícito de Inputs personalizados, las propiedades oficiales de visibilidad, la conservación de roles internos y el ordinal de textos cuando Figma omite hijos invisibles. La animación AFTER_TIMEOUT demostrativa de progreso se anuló únicamente en las instancias de prueba; los principales permanecen intactos.

Graphify resolvió 10 fuentes del AppShell y sus dependencias en modo graph: 253,730 bytes leídos, con límite de 400 000 bytes. El arranque consumió 17 solicitudes y 780 240 bytes; no usó data.tar.gz ni recursos instalados. Las fuentes se fijaron al mismo commit y se verificaron por hash.

## Artefactos principales

- `final-report.json`: aceptación y alcance.
- `final-evidence-manifest.json`: hashes de cada evidencia final.
- `preflight-release.json` y `verify-release.json`: gates definitivos.
- `negative-release-result.json`: rechazo real de los tres errores intencionales.
- `*-release-readback.json`: lecturas completas, recompuestas de transporte paginado sin pérdidas.
- `source-*-release-before.json` y `source-*-release-after.json`: preservación de principales.
- `player-interactions.json`: clics reales y destinos observados.
- `final-overview.png` y `final-screen.png`: capturas nativas.

Los diagnósticos de intentos previos se conservan como historial; no gobiernan la aceptación. Las 47 familias no aplicables y los destinos globales ajenos al escenario no se presentan como pruebas funcionales ejecutadas. No se realizó una auditoría completa de accesibilidad o lector de pantalla.
