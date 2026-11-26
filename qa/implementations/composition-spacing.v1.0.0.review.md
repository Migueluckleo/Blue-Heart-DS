# QA · Padding y separación de composición · 2026-11-26

## Regla y fuentes

La solicitud del usuario fija 24 px internos para superficies con un límite visible, 0 para contenedores de producto transparentes o primary sin borde, 32 entre bloques independientes, 16 entre un control y el contenido que gobierna y un máximo efectivo de 32. El espacio entre Header y el cuerpo de App Shell es de 32 px. El corpus describe cómo se combinan gaps, márgenes e insets del mismo tramo. [Contrato Body](../../specs/foundations/body.contract.v1.0.0.md#padding-y-separación-en-composición) · [Política de consumo](../../specs/foundations/product-consumption.contract.v1.0.0.md) · [Header y App Shell](../../specs/components/header-app-shell.spacing.amendment.v1.0.0.md).

## Figma · PASS

- Header `90:439` mide 96 px con logo de 48 y cuatro insets de 24. El padding conserva su ID y toma spacing-xl. El fondo conserva su ID y toma neutral-subtle para delimitar el Header frente al fondo de Content. Cuatro modos, aliases y sintaxis revisados. Los tokens de componente conservan scopes vacíos.
- Ocho variantes en `105:7`. Gap raíz 0 y Content superior 32, con la distancia efectiva Header–cuerpo de 32. Cada Header anidado usa el token propio y cada inset nuevo de Content consume app-shell/spacing/content.
- Playground `347:2597`. Wrapper primary sin borde a 0; los 32 px entre Cards, sus filas y el siguiente bloque se midieron entre límites de cajas. Las cinco Cards usan stroke secondary y padding 24. Los dos widgets con fondo emphasis usan padding 24. La composición `834:10169` coloca las instancias oficiales de Tabs y Table a 16 px con body/spacing/md y Fill en ancho. La captura de 720 px confirmó la superficie del Header, la separación y que Table y Pagination quedan dentro del ejemplo. La muestra Figma acredita estructura y geometría del estado visible.

[Playground en Figma](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=347-2597) · [Lectura por ID y binding](../../implementations/figma/composition-spacing-2026-11-26/readback.json).

## Web · PASS

P07 verificó la generación, hashes, alcance de 52 familias y scopes. TypeScript, 22 pruebas Node y exportación estática de Next pasaron. Chrome midió 24 en Header, cinco Cards y dos widgets, 0 en el wrapper, 32 desde el borde de Header al inicio de Main, 32 en las transiciones entre bloques independientes y 16 desde el borde de Tabs al borde exterior de Table antes y después de elegir otro panel con el teclado. El Header neutral sutil se comparó con el cuerpo en los cuatro temas. Los anchos de Main fueron 1272, 1110 y 1272 al alternar Sidebar. El recorrido de logos comprobó 24 combinaciones de marca, altura y ancho.

[Geometría Body y Tabs](../../output/qa/composition-spacing-2026-11-26/chrome.json) · [Header y logos](../../output/qa/composition-spacing-2026-11-26/chrome-header.json).

## Consumo autocontenido

La verificación de los ZIP y sus grafos se registra por separado para PO 1.1.1 y Figma Portable 1.1.0 con el digest de este corte.

## Aclaración de Cards y variantes de icono sobre blanco · PASS

La regla contempla una Card primary con radio de 16 px, sombra visible o ambos. En Figma las cinco Cards primary se leyeron con radio 16, sombra visible y padding 24. El wrapper primary sin delimitación se leyó con padding 0. Los insets se resolvieron por sus tokens existentes.

Figma registró 1,616 variables y 63 nombres Body con scopes visibles. Se verificaron la cadena Warning → warning-default → amber/600 y la cadena Caution → caution-icon-on-white → caution-orange/600. El semántico añadido tiene scopes vacíos; los dos Body usan solo SHAPE_FILL. Las muestras blancas del Playground conservan el binding real al usar cada rol.

Chrome comprobó ocho combinaciones de icono y tema sobre blanco. Warning resuelve #C97B00 con 3.32:1 y Caution #C45C0A con 4.30:1. Los tonos 500 medían 2.18:1 y 2.83:1. Los roles Caution existentes mantienen sus fuentes delegadas. La suite de Body también revalidó la geometría de composición y los 63 scopes visibles con los nuevos datos.

[Tokens y criterio de contraste](../../specs/foundations/body.icons-on-white.amendment.v1.0.0.md) · [Lectura Figma](../../implementations/figma/body-icons-on-white-2026-11-26/readback.json) · [QA Chrome](../../output/qa/composition-spacing-2026-11-26/chrome.json).
