# QA de implementación · Floating Actions y Dot

## Figma

PASS. La [lectura del componente](../../implementations/figma/floating-selection-2026-11-25/readback.json) confirma Floating Actions 122:6 con caja 1024 × 96, selector cerrado por defecto y panel absoluto de 300 × 153 a 4 px sobre el disparador. La [captura final](../../output/qa/floating-selection-2026-11-25/figma-selection.png) confirma el panel visible y las dos fichas completas. Se ajustó el recorte de la barra y de Selection summary para dejar visible el panel. Se verificaron los cuatro destinos Change to, los cuatro estados visuales de fila y los dos grupos de propiedades editables. El selector conserva la propiedad de visibilidad y se probó con la barra en una instancia.

General actions conservó su ID, property key y seis capas de muestra. En una instancia se probaron cero, una y siete capas en el Slot nativo. Se retiraron las instancias temporales. Los iconos de la muestra usan Phosphor. Los componentes del menú, Dot, Button y los contenedores son locales al DS.

Las 36 variantes de Dot mantienen la altura de su tamaño de referencia. La lectura verificó 0 px por lado en Count de un dígito, 8 px por lado en count-multi y count-expand, Count editable con el mismo ID y Max count independiente. A altura large, «7» midió 20 × 20, «12» 29 × 20 y «2,600» 51 × 20. Los 25 tokens nuevos mantienen scopes vacíos. Los 61 Body siguen visibles. [Lectura de variables](../../implementations/figma/floating-selection-2026-11-25/token-readback.json).

## Web

PASS. La [prueba en Chrome](../../output/qa/floating-selection-2026-11-25/web-browser.json) verificó 300 × 153, posición sobre el botón, apertura por teclado y clic, Flechas, Inicio, Fin, Enter, Escape, restauración de foco, clic fuera, cambios diferenciados a 50 y 2,600 y cierre independiente de la barra. La lectura CSS de Dot confirmó 0 px por lado para «3» y 8 px para ambos conteos amplios. El [build](../../output/qa/floating-selection-2026-11-25/web-verify.log) pasó la comprobación de 52 familias, TypeScript, 22 pruebas y exportación estática. El ejemplo usa datos locales de muestra.
