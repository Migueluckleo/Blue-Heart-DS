# Chat Rail Item y Chat Sidebar

2026-11-24 · Implementación y QA del Rail de navegación, altura de Chat Sidebar y Slot Content.

La [página Chat Rail Item](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=662-18) contiene el set oficial con ocho variantes. Los cinco Rail de Chat Sidebar usan cuatro instancias cada uno. Fondo seleccionado #0F172A con neutral-maximum, aro de foco de marca brand-strong, y Dot notification medium de 12×12 opcional. Los 16 tokens nuevos tienen scopes vacíos y están disponibles solo como dependencias internas. Las cinco variantes Rail y cuatro Panel carecen de altura mínima. Content es el Slot compartido y el plan está fuera.

[Contratos y datos](../../../implementations/figma/chat-rail-item-2026-11-24/README.md) · [QA](../../../qa/implementations/chat-rail-item.v1.0.0.review.md) · [Readback Figma](figma-final.json) · [Chrome](web-browser.json) · [Build y pruebas](web-verify.log).

Capturas revisadas: [aro y badge de Figma](figma-focus.png), [Rail Figma seleccionado](figma-chat-selected.png), [estados web](web-states.png) y [Rail web](web-rail.png). Los nueve ejemplares Figma se ajustaron a 440 px y se retiraron al terminar. Chrome verificó cuatro temas, navegador y altura 440 de ambos modos. Las operaciones de Slot preservaron contenido y Dot al cambiar entre vistas Rail.

La [prueba final de altura con el Slot incorporado](figma-final-height-with-slot.json) reconfirmó 9/9 variantes a 440 px. En los cinco Rail los cuatro ítems se mantuvieron dentro de Content.

Cierre **COMPLETE_LOCAL**, catálogo de 53 familias y Graphify **CURRENT** con 1520 fuentes, 6993 nodos, 14085 aristas y 175/175 dependencias verificadas. Inventario efectivo de 1,554 tokens a partir de 18 fuentes. Los 16 nuevos tienen 64 coincidencias de alias por modo y sus hashes coinciden con el catálogo. Body conserva 61 tokens visibles y Caution sus 21 tokens efectivos.

[Comprobante de cierre](../../closures/2026-11-24-chat-rail-item-content.json) · [Integridad y hashes](final-integrity.json) · [Relaciones de Graphify](graph-proof.json) · [QA canónico](canonical-qa.json). DS digest `dc5a6c963215c844c3bfebe39685d1a3a3a058163824720a2d0e280e3adb75ec`. Launchers GitHub directo 1.0.9 verificados en el cierre local. Publicación e instalación fuera de este corte.

Los paquetes PO universal y Figma local/portable se verificaron frente a este corte, con versiones conservadas y el traspaso PO → Figma comprobado. [Hashes y grafos de consumo](consumer-verification.json).
