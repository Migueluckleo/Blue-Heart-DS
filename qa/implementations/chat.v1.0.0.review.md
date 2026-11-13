# QA de implementación · Chat

2026-11-13 · CHAT-001 v1.0.0 · PASS para la referencia Figma y para web.

Figma verificó el set 242:437, sus dos estados, las dimensiones de referencia de 750 px, los cinco maestros reutilizados y 34 páginas oficiales A–Z antes de Playground. La instancia Started conservó su enlace al añadir, quitar, sustituir y reordenar hijos de Messages, con conteos 0, 1, 2 y 3. Se confirmó la edición de nombre y estado. TOKEN-QA-01 leyó 78 bindings y 7 registros de overrides con la cadena de tokens por tema. El Composer cabe en 320 px en ambos estados. En Figma, la sugerencia más larga conserva el ancho intrínseco del Chip de referencia de 329 px y sobresale 9 px en el ancho de ensayo. El ajuste estrecho de las sugerencias se comprobó en web. [Lectura del maestro](../../implementations/figma/chat-2026-11-13/readback.json).

Pasaron el control de tokens web, TypeScript, nueve pruebas Node, build Next y la suite Chrome. Chrome comprobó Standby y Started, cuatro colores de marca, sugerencias y envío por teclado, composición con los maestros web de mensaje y respuesta, estado local y ancho de 320 px sin desbordamiento. [Ficha técnica](../../implementations/web/docs/components/chat.md) · [Prueba Chrome](../../implementations/web/tests/chat.browser.mjs).
