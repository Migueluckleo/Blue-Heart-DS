# QA de implementación · Chat Rail Item

2026-11-24 · IMPLEMENTATION_REVIEW PASS para [Chat Rail Item](../../specs/components/chat-rail-item.contract.v1.0.0.md) y la [enmienda del Rail](../../specs/components/chat-sidebar.rail-item.amendment.v1.0.0.md). user_audit NOT_REQUIRED. La validación cubre el control de navegación, el ajuste de altura de los nueve maestros y el nuevo Content del Rail.

| Control | Resultado |
| --- | --- |
| Set de Chat Rail Item | 8 variantes, 2 ejes, Icon y Show notification=false. Maestro 662:19 en página propia 662:18, entre Chat Plan Usage y Chat Sidebar. El orden relativo previo de páginas permaneció. |
| Dependencias | Dot local 32:40, notification/medium/default, 12×12, inset real 4 arriba y a la derecha. Iconos Phosphor reusados por ID y peso Light. Focus Selected retuvo glyph, badge y binding al cambiar el estado. |
| TOKEN-QA-01/03 | 510 bindings, 90 overrides y cero hallazgos. 16 tokens nuevos internos con scopes=[] y cadena component → semantic → primitive por modo. Total Figma 1,554. Solo Body conserva scopes visibles, 61. |
| Color | Las cuatro superficies seleccionadas enlazan a color/bg/selected → neutral-maximum → neutral/900, #0F172A. Los dos aros Focus enlazan a color/stroke/focus → brand-strong → blue/500, #272FD5, igual que Icon Button en los cuatro modos. |
| Integración | 20 instancias migradas en cinco Rail, tamaño y posición exactos. View none sin selección, cuatro vistas con un Selected cada una. Se leyeron cuatro consumidores en App Shell y seis en Playground, con cuatro ítems heredados. |
| Altura | Cinco Rail y cuatro Panel con minHeight=null y caja original 79/264×791. Nueve instancias de prueba redimensionadas a 440 px, con ancho conservado. |
| Slot Content | Se leyeron cinco Slots Rail y cuatro Panel con la misma key Content#258:0. Prueba Rail por instancia: cuatro heredados, cero, uno y cinco; reordenar, sustituir, volver a View=Chats. Orden, instancias y Dot medium persistieron. El plan quedó fuera y no hubo violaciones de cardinalidad. |
| TOKEN-QA-02 y web | Generación/check PASS, TypeScript, 19/19 pruebas y build estático. Chrome en Contable/Administrativo/Servicios/Personas verificó negro seleccionado, hover, aro marca de 2 px, Shift+Tab/Tab, Enter/Espacio, disabled, descripción accesible y badge persistente. Chrome comprobó Rail y Panel a 440 px y el Content del Panel con overflow auto. |

[Readback e IDs](../../implementations/figma/chat-rail-item-2026-11-24/readback.json) · [Prueba Chrome](../../output/qa/chat-rail-item-2026-11-24/web-browser.json) · [Captura de foco y Dot](../../output/qa/chat-rail-item-2026-11-24/figma-focus.png).

En Figma, Content mantiene su propio mínimo observado de 32 px y carece de scroll propio en Rail. El mínimo retirado corresponde a cada maestro Chat Sidebar. La prueba de preservación de contenido personalizado cambió View entre dos Rail; no se certificó alternancia entre Mode Rail y Panel ni comportamiento a altura arbitrariamente baja. Los especímenes de prueba se retiraron. La prueba web ejecutó el alcance Chat Rail Item y Chat Sidebar en Chrome, no la suite integral del catálogo.
