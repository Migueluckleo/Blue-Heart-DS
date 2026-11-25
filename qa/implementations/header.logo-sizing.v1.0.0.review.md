# QA de implementación · Logotipos de Header y App Shell

## Figma

PASS. [Readback](../../implementations/figma/header-logo-sizing-2026-11-25/readback.json). Probadas las 225 combinaciones de 75 opciones × 40/44/48 px, con atadura al token de cada altura, ancho proporcional dentro de 0.03 px y sin colisiones con los controles de muestra a 1280 px. La capa de Header conserva el mismo ID y sus seis claves base. Se verificaron las dimensiones de 14 instancias consumidoras.

En App Shell Grid colapsado se conservó Mi CONTPAQi / light del usuario. A 48 px su ancho pasó de 175.79 a 325.80 px al usar su variante proporcional. El Header está expuesto en las ocho variantes de App Shell. Se probaron 48 cambios en instancias de App Shell, combinando las versiones light y light2 de Mi CONTPAQi con las tres alturas en los ocho anfitriones. El readback de la corrección registró Mi CONTPAQi / light a 48 px. La revisión posterior encontró Contabilidad horizontal a 48 px y confirmó que los selectores siguen expuestos. [Lectura de sincronización](../../output/qa/header-logo-sizing-2026-11-25/sync-audit-live.json). [Captura de 40, 44 y 48 px](../../output/qa/header-logo-sizing-2026-11-25/figma-header-three-heights.png).

Los 75 maestros de Logos mantienen su geometría y tienen bloqueo de relación de aspecto. Se conservaron las capas de Portal Web y su relleno de imagen. Los dos tokens nuevos de componente siguen la cadena semántica y primitiva en los cuatro temas. Los cuatro tokens añadidos tienen scopes vacíos y los 61 de Body siguen siendo los únicos visibles. Se retiraron todas las instancias temporales.

## Web

PASS. [24 casos en Chrome](../../output/qa/header-logo-sizing-2026-11-25/web-browser.json), con cuatro marcas, tres alturas y dos anchos de anfitrión. Se comprobó ancho intrínseco, imagen completa, altura y ajuste junto a los controles. pnpm verify pasó generación, TypeScript, 20 pruebas y build.

La suite general del navegador se detuvo antes de Header en el ejemplo Badge. Espera tres badges y la galería vigente contiene cuatro. [Log](../../output/qa/header-logo-sizing-2026-11-25/web-browser.log).
