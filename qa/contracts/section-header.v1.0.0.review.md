# QA documental · Section Header

2026-11-11 · SECTION-HEADER-001 · PASS · DELEGATED_FOR_BUILD.

La fuente viva `891:28` confirma principal único, tres Slots y nueve propiedades. Los Slots admiten cero o más elementos y son independientes. Se verificaron geometría wrap, dos estilos de texto, dependencias oficiales, key Phosphor Gear Light y muestra «Configuración completa» `893:69` como enlace Figma de evidencia. La norma y la guía se conservan en la ficha local. La decisión cromática aplica al texto Updated y queda explícita para QA.

## Lectura previa a la corrección · 2026-11-13

PASS documental. Se registraron la propiedad y su default, la dependencia LOGOS-001, los tres Slots y el alcance del ajuste en Figma. El contrato describe el comportamiento probado, que mantiene el título visible al mostrar el logo. [Lectura de Figma](../../implementations/figma/section-header-2026-11-13/readback.json).

## Corrección de reemplazo del título

PASS. En Figma, `false` muestra texto y `true` muestra el logo. El ensayo conservó un título personalizado y una acción insertada en General actions al ir y volver. Las cuatro instancias oficiales de App Shell mantienen el modo de texto y el espécimen de Playground conserva el modo de logo. TOKEN-QA-01 pasó con 80 bindings y 22 overrides. En Chrome se validó el cambio por teclado, el logo de 87 × 32 px, el encabezado accesible y la presencia de las acciones. [Evidencia](../../implementations/figma/section-header-logo-replacement/readback.json).
