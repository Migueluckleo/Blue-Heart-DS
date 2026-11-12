# QA de implementación · Text Area

2026-11-11 · TEXT-AREA-001 · PASS en Figma y web con la limitación de contraste fuente.

## Figma

Text Area `661:169` → `116:88` en página `116:2`. Los [primeros cuatro estados](../../implementations/figma/root-families-2026-11-11/text-area-0.readback.json) y [cuatro estados restantes](../../implementations/figma/root-families-2026-11-11/text-area-4.readback.json) pasaron lectura sin diferencias. Se comprobaron 80 nodos, 464 bindings, cuatro estilos Manrope, siete propiedades editables y ocho Notches oficiales. La altura inicial del campo es 104, con Label de 23 y conjunto de 161. La Description enlaza la guía `665:10`. No hay reacciones nativas.

La [prueba desde instancias](../../implementations/figma/root-families-2026-11-11/text-area-consumer.readback.json) pasó 39 comprobaciones. Incluye anchos 160/305/640 en cada variante, Placeholder y Value independientes, ayuda multilínea, Counter largo, color de Notches en error y alineación al ocultar el contador. El campo aumentó a 180 px en una instancia y conservó texto multilínea. El ajuste se hizo en la instancia temporal. La página conserva el set oficial.

## Web

TypeScript, nueve pruebas Node y build de Next pasaron. [Chrome en localhost](../../implementations/web/tests/buttons-loader.browser.mjs) comprobó escritura de dos líneas, foco, error asociado por aria-describedby, contador, límite de 300 en la muestra, Disabled y altura de 104 a 180 activada con Espacio sin perder el valor. El anfitrión de la muestra fija 300. La prueba de altura usa un botón accesible y el arrastre del resize nativo opcional queda NOT_RUN.

El borde vacío default midió **2.564:1** contra la superficie del campo. Se conserva el rol heredado según la [norma raíz](../../sources/figma-snapshots/root-families-2026-11-11/text-area.1.0.0.md.txt). La medición queda por debajo de 3:1 y no certifica conformidad global.
