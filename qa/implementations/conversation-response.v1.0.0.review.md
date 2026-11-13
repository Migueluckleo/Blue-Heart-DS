# QA de implementación · Conversation Response

2026-11-12 · CONVERSATION-RESPONSE-001 v1.0.0 · PASS Figma y Chrome. [Contrato](../../specs/components/conversation-response.contract.v1.0.0.md).

## Figma

La página 222:309 contiene el set 222:72 y el auxiliar Preview 222:111. Se confirmaron dos variantes, tres booleanas, Description, enlace, semánticos locales y dependencias de Button, Badge, Characters e Icon Button. Se corrigió visualmente el escalado de los vectores de ambos personajes a 32 px. Los personajes mantienen vínculos a Characters y reacciones de temporizador con destinos de su propio set. La homologación da una altura de 282 px frente a 276 px de la propuesta.

La lectura verificó 32 páginas oficiales A–Z, preservó las posiciones de portada, separadores y Playground, y confirmó el set fuente 218:1236. Para ambos agentes se probaron los cinco Slots con vacío, más y menos hijos que la muestra, orden y sustitución en instancias de 320 px. El cambio BENI a NAVI conservó los overrides de los cinco Slots. [Lectura del maestro](../../implementations/figma/conversation-response-2026-11-12/readback.json).

## Chrome y catálogo Next

Pasaron TypeScript, nueve pruebas Node, build Next y la suite de Chrome. Chrome verificó BENI y NAVI, glyph de 32 px, Preview con glyph Table de 24 px, Button secondary, los cinco Slots, visibilidad, cinco acciones por teclado, foco y reflujo a 320 px. Copiar mantiene el SVG de origen como recurso embebido de 16 px. Los controles del ejemplo comunican activaciones locales. [Ficha técnica](../../implementations/web/docs/components/conversation-response.md) · [Prueba de Chrome](../../implementations/web/tests/conversation-response.browser.mjs).
