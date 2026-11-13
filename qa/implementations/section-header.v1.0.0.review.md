# QA de implementación · Section Header

2026-11-11 · SECTION-HEADER-001 · PASS en Figma y web con excepción fuente de contraste para Updated.

## Figma

El principal `891:28` se reconstruyó en `96:5`, página Section Header `96:2`. La [lectura independiente](../../implementations/figma/root-families-2026-11-11/section-header-0.readback.json) comprobó 21 nodos, 105 bindings y cero diferencias. El maestro usa nueve propiedades, tres Slots, dos estilos de texto y vínculos a Breadcrumb, Badge, Input, Icon Button Secondary con Gear y Button Primary. La primera lectura encontró cinco etiquetas de Input visibles por dos capas hermanas con el mismo nombre. Se [corrigieron los cinco controles](../../implementations/figma/root-families-2026-11-11/section-header-input-labels.adjustment.json) y la altura volvió a 219 px. El adaptador resuelve capas homónimas por orden. El maestro enlaza el ejemplo fuente de configuración completa `893:69`.

La [prueba desde instancias](../../implementations/figma/root-families-2026-11-11/section-header-consumer.readback.json) pasó 16 comprobaciones. Cada Slot admite vacío, uno o más elementos, inserción y cambio de orden. Los otros Slots conservan su contenido durante la edición. A 640 px con menos controles, Metadata pasa a otra fila y el título largo y la descripción se mantienen editables. También pasaron las cuatro visibilidades y la limpieza de la instancia temporal. Reproducción de las reacciones heredadas en el presentador nativo NOT_RUN.

## Web

TypeScript, nueve pruebas Node y build de Next pasaron. [Chrome en localhost](../../implementations/web/tests/buttons-loader.browser.mjs) comprobó encabezado de nivel 3, Breadcrumb con elemento actual, cinco Inputs con nombres accesibles, Icon Button Secondary activado con Espacio y el ejemplo a 640 px con Metadata debajo del encabezado, un Input y sin desbordamiento horizontal. La muestra elige el nivel de título y la composición estrecha. Los controles y destinos reales los aporta el anfitrión.

Se conserva la excepción de Updated aprobada en la [norma fuente](../../sources/figma-snapshots/root-families-2026-11-11/section-header.1.0.0.md.txt), 4.34:1 para #64748B sobre #F1F5F9.

## Lectura previa a la corrección · 2026-11-13

PASS en el maestro Figma 96:5. Se probó `false → true → false` en una instancia temporal y se comprobó que el título sigue visible y que la altura pasa de 219 a 259 px con el logo. Las cuatro instancias de App Shell tienen `false`. TOKEN-QA-01 revisó 40 bindings y 11 overrides sin hallazgos. La API React actual conserva el encabezado de texto y carece del control de logo. [Lectura de Figma](../../implementations/figma/section-header-2026-11-13/readback.json).

## Corrección de reemplazo del título

PASS. En Figma, `false` muestra texto y `true` muestra el logo. El ensayo conservó un título personalizado y una acción insertada en General actions al ir y volver. Las cuatro instancias oficiales de App Shell mantienen el modo de texto y el espécimen de Playground conserva el modo de logo. TOKEN-QA-01 pasó con 80 bindings y 22 overrides. En Chrome se validó el cambio por teclado, el logo de 87 × 32 px, el encabezado accesible y la presencia de las acciones. [Evidencia](../../implementations/figma/section-header-logo-replacement/readback.json).
