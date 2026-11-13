# QA de la capa de tokens de componente

2026-11-12 · PASS · Corrección en las versiones vigentes.

Se inventariaron 32 páginas oficiales, 77 maestros y auxiliares y 7.599 nodos propios o raíces de instancias. Se corrigieron 1.020 referencias directas y 38 overrides directos que consumían semánticos o variables externas. Se enlazaron además las propiedades de layout y superficie de App Shell y el override del glyph Table en Preview. La lectura posterior verificó los seis maestros afectados. La inspección de 1.609 registros de overrides de instancias no encontró bindings fuera de la colección component en las propiedades expuestas por la API.

Se validaron 3.816 aliases de componente en cuatro temas y 139 aliases semánticos. El placeholder usa conversation-composer/color/text/placeholder y su alias neutral-medium. Se conservaron los pesos Regular y SemiBold, la geometría de referencia de las conversaciones y App Shell y las 18 variantes de Stepper. La longitud de Stepper mantiene sus 80 px. Logos conserva su arte original según LOGOS-001 y el auxiliar de ayuda de Sidebar hereda Menu item según SIDEBAR-001. [Lectura Figma](../../implementations/figma/component-token-layer-correction/readback.json)

En web se cruzaron 51 archivos de estilos, módulos y recetas con el manifiesto de tokens. No se detectaron referencias directas a primitivas ni semánticos en esos archivos. Pasaron la generación de fichas, TypeScript, nueve pruebas Node, el build Next y la suite Chrome. El inventario base mantiene su SHA-256. [Mapa de aliases](../../specs/tokens/component-layer.correction.json)
