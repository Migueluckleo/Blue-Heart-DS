# QA de implementación · Characters

2026-11-12 · CHARACTERS-001 v1.0.0. [Maestro Characters](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=187-14) y [contrato](../../specs/components/characters.contract.v1.0.0.md).

## Figma

La lectura verificó los maestros BENI Standby `187:51` y NAVI Analysis `187:112`, sus 13 fases y los 13 cambios de variante con destinos, esperas, curvas, duraciones y retorno originales. Se cotejaron 64 vectores, 47 bindings y el origen de los vectores sin desplazamiento respecto de cada variante. Los 47 vectores pintados conservaron sus rutas exactas. Cinco rutas de sombra sin relleno difieren como máximo 0.0000000596046448 px por redondeo del editor. La revisión visual encontró los strokes predeterminados de Figma durante la primera reproducción y se retiraron de los 64 vectores. La lectura final confirmó cero strokes y efectos.

El [mapa de lectura](../../implementations/figma/characters-2026-11-12/readback.json) registra cuatro primitivas, cuatro semánticas y cuatro variables de componente. Se leyeron 24 valores o aliases por modo y 188 resoluciones de fills desde instancias en Contable, Administrativo, Servicios y Personas. Las 52 selecciones de fase mantuvieron su vínculo a los maestros. Se conservaron las tres colecciones.

Los PNG de los dos sets completos coincidieron byte a byte con la fuente en la comparación final. El presentador nativo se reinició y mostró ambos ciclos desde instancias enlazadas. Se observaron parpadeos, desplazamiento de BENI, estiramiento de los ojos de NAVI, la sombra lateral y continuidad después de volver a las fases iniciales. Se retiró la página de QA `188:2`; la página Characters conserva únicamente sus dos sets.

## Web

El componente usa SVG derivado de las rutas de la selección y variables CSS de componente. Los ciclos traducen la secuencia a CSS. El anfitrión decide cuándo empezar o detener, y la preferencia de movimiento reducido mantiene la pose seleccionada. [Ficha web](../../implementations/web/docs/components/characters.md).

TypeScript, nueve pruebas Node, build Next y la suite de Chrome pasaron. Chrome comprobó seis poses de BENI y siete de NAVI, interpolación intermedia, retorno de ciclo, duraciones de 5801 y 6300 ms, cuatro colores en los cuatro temas, arranque y detención y movimiento reducido sin animaciones. El cotejo de matrices del navegador admite la diferencia observada de 0.0001 px de serialización entre una pose fija y animada.
