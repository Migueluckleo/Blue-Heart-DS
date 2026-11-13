# QA de implementación · Conversation Composer

2026-11-12 · CONVERSATION-001 v1.0.0 · PASS Figma y Chrome. [Contrato](../../specs/components/conversation-composer.contract.v1.0.0.md).

## Figma

El principal 216:66 se verificó en su página 216:109 con Description y URI de ficha exactas. La página tiene un solo principal. La propuesta 206:1182 conserva su identidad, página y Description v0.1.0. El orden guardado tiene 31 familias de A a Z, con portada, separadores y Playground en sus posiciones anteriores.

Los tres controles de visibilidad, ocho bindings de paint, bindings tipográficos locales y cinco enlaces a Button/Icon Button se confirmaron en la lectura. Las reacciones heredadas de hover apuntan a destinos locales. Plus, Paperclip, Microphone y PaperPlaneTilt conservan sus componentes Phosphor. El Button secondary small homologado adopta el borde de su maestro. En una instancia de 320 px se verificaron las booleanas y los dos Slots. Se quitaron, añadieron, reordenaron y sustituyeron hijos con conteos 0, 1, 2 y 3. La instancia siguió vinculada y se retiró al terminar. Se inspeccionaron las capturas de la configuración inicial y la instancia de prueba. [Lectura final](../../implementations/figma/conversation-composer-2026-11-12/readback.json).

## Chrome y catálogo Next

Pasaron TypeScript, nueve pruebas Node, build Next y la suite de Chrome. Chrome leyó 616 × 138 px, Manrope Variable, campos y acciones nombrados, foco visible, saltos de línea en el borrador, cinco callbacks locales, hover, los cuatro temas y ajuste a 320 px sin overflow. El acento del marco se conserva en los cuatro temas y el control Enviar cambia según el tema. [Ficha técnica](../../implementations/web/docs/components/conversation-composer.md) · [Prueba Chrome](../../implementations/web/tests/conversation-composer.browser.mjs).

La URI de Figma identifica la ruta canónica de la guía en el canal configurado. El archivo de la guía se verifica localmente en este corte.
