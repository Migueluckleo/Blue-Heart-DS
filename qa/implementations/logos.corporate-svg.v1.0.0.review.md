# QA de implementación · Ampliación de Logos

PASS. [Lectura de Figma](../../implementations/figma/logos-2026-11-24/readback.json). La página Logos contiene seis sets y 75 variantes. El set CONTPAQi mantuvo la clave del set, su maestro predeterminado 171:2719 y el nombre, ID, geometría, posiciones y capas directas de sus cinco maestros previos. Se seleccionaron las ocho combinaciones desde una instancia, con destino correcto en cada caso. La instancia de revisión se retiró tras la prueba.

Las dimensiones son iguales a los tres viewBox. Mi CONTPAQi tiene 15 trazados y una máscara adicional. Mi Gestión tiene 43 trazados. Portal Web conserva 19 trazados y una máscara. El símbolo PNG pesa y mide según el SVG original, con 1096 × 1095 px en una caja de 67 × 67 px y un único relleno de imagen local, sin filtros. Los tres maestros tienen cero bindings a variables, estilos externos o instancias anidadas.

Se compararon las capturas del SVG original en Chrome con el render de Figma a tamaño nativo. El solapamiento de la silueta fue 94.91 % en Mi CONTPAQi, 93.57 % en Mi Gestión y 96.19 % en Portal Web. La diferencia media absoluta por canal premultiplicado quedó entre 3.80 y 4.74 sobre 255. Los bordes presentan diferencias de rasterización. [Arte y métricas](../../output/qa/logos-2026-11-24/visual.json).
