# QA de implementación · Chat Sidebar

2026-11-13 · v1.0.0.

Figma verifica las cuatro vistas en Panel y Rail, los átomos vinculados y el Icon Button seleccionado por vista. Los cinco Slots nativos admiten añadir, quitar, sustituir y reordenar hijos sin desprender la instancia. Content, Items y Title amplían su ancho dentro de Auto Layout. El panel y el rail conservan las restricciones de ancho de la propuesta. La capa de tokens pasó en las cinco familias y cuatro temas, con 620 bindings y 115 overrides revisados. Las 39 páginas oficiales quedaron de A a Z antes de Playground. [Evidencia Figma](../../implementations/figma/chat-sidebar-2026-11-13/readback.json).

El catálogo React ofrece los cinco exports y sus ejemplos. El escenario Chrome cubre selección por teclado de las cuatro vistas, apertura de carpeta, selección de historial, foco de acciones, ancho estrecho, arte local, cierre y reapertura del panel y lectura del medidor. [Ficha web](../../implementations/web/docs/components/chat-sidebar.md) · [Prueba Chrome](../../implementations/web/tests/chat-sidebar.browser.mjs).

## Revisión inicial del Rail editado en Figma

El set tiene cuatro paneles y cinco rails. Se comprobó que `View=none` deja cuatro botones sin selección y que el Rail de Chats activa únicamente Chats. El espécimen de Playground instancia el Rail neutral. Se leyeron 315 bindings y 84 overrides sin hallazgos y no se encontraron variables remotas. Los glyphs remotos corresponden a Phosphor. En esa revisión, la API web todavía requería una vista activa. [Lectura](../../implementations/figma/chat-sidebar-rail-review/readback.json).

## Paridad del Rail · 2026-11-13

PASS. Figma conserva cuatro paneles con Content en Fill y cinco rails. Se revisaron 640 bindings y 124 overrides en el set y sus cuatro átomos. No se detectaron variables ni estilos externos. Las claves remotas coinciden con Phosphor. En Chrome, el Rail inicia con los cuatro botones sin selección, abre las cuatro vistas por teclado y vuelve a quedar sin selección al cerrar. El medidor permanece visible y se verificó que el panel cabe en un contenedor estrecho. [Lectura Figma](../../implementations/figma/chat-sidebar-rail-parity/readback.json) · [Prueba Chrome](../../implementations/web/tests/chat-sidebar.browser.mjs).
