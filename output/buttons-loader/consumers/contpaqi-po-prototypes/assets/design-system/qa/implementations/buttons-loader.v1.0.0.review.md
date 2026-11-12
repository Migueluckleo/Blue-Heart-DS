# QA técnico · Buttons y Loader v1.0.0

11 de noviembre de 2026. **Figma estructural PASS** y **web PASS** en los controles indicados. La revisión visual del usuario queda pendiente y es opcional.

| Área | Resultado |
|---|---|
| Figma Buttons | Cinco sets, 90 variantes, 150 instancias remotas oficiales PlusCircle Outline/Light, 15 vínculos a Loader, 23 reacciones almacenadas y cero diferencias en lectura. Geometría de variantes y foco, tipografía, propiedades editables y bindings cotejados contra la fuente. |
| Figma Loader | Un set público de 24 variantes y seis sets internos de 24 fases. 144 arcos y destinos de ciclo verificados. Dimensiones, roles, remates, opacidad y aliases confirmados. |
| Páginas | Solo sets propios y sus variantes. Descripciones de uso en todos los sets. Enlaces de documentación fuente verificados en los cinco sets Button y en Loader público. Las fichas de Rebuild se mantienen locales y se vinculan por identidad. |
| Captura visual | Se inspeccionaron renders representativos de Primary y de las 24 variantes públicas Loader. La lectura de reacciones verifica destinos almacenados. La reproducción interactiva en Figma y fps permanecen sin medir. |
| Web | TypeScript, cuatro pruebas Node y export estático Next/React/Tailwind. En Chrome se comprobó fuente Manrope Variable, foco al tabular, activación con Espacio, 48 px de altura, ancho estable en la demo, 24 px del Loader durante carga, bloqueo de repetición, recuperación, disabled, enlace, cuatro temas y movimiento reducido 1,6 s. |
| Iconografía | Lectura de la biblioteca autorizada y resolución remota de la key exacta. Web usa `@phosphor-icons/react` 2.1.10 con peso light en el icono por defecto. |

[Resultados](buttons-loader.v1.0.0.evidence.json) · [Estado Buttons](../../implementations/figma/buttons-loader-2026-11-11/buttons.state.json) · [Estado Loader](../../implementations/figma/buttons-loader-2026-11-11/loader.state.json) · [Preflight documental](../contracts/buttons-loader.v1.0.0.review.md).
