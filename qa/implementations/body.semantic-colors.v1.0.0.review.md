# QA de implementación · Body colores semánticos

Fecha: 2026-11-18. Resultado Figma/web: PASS. Integración final de catálogo: ver el log vinculado. [Enmienda](../../specs/foundations/body.semantic-colors.amendment.v1.0.0.md). user_audit NOT_REQUIRED; human_review_policy OPTIONAL_NON_BLOCKING.

## Figma y preservación

Se agregaron 19 COLOR en component (VariableID:502:2–502:20): cinco bg, siete stroke y siete shape. Se conservaron los siete textos y dos fondos originales. Body suma 52 tokens y 28 colores. Todos consumen aliases semantic existentes y estos primitives existentes, sin nuevas primitivas o semánticos.

TOKEN-QA-01/03 PASS: 208 cadenas por modo, 504 bindings incluyendo la raíz del specimen y cero hallazgos. Maestro: 1,509 variables; 52 Body visibles y 1,457 internas ocultas. Scopes exactos por tipo/función, sin ALL_SCOPES/ALL_FILLS. Los 53 registros previos de Body/dependencias y los cinco estilos Body se compararon íntegros, iguales en IDs, nombres, valores, aliases, codeSyntax, scopes, métricas, bindings y publicación. [Lectura posterior](../../implementations/figma/body-semantic-colors-2026-11-18/preserved-after.json) y [resumen](../../output/qa/body-semantic-colors-2026-11-18/figma-validation.json).

[Specimen 504:9685](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=504-9685) editable en Playground: siete filas de roles con texto, fondo, borde y forma. 30 frames incluyendo raíz, 44 textos, siete ellipses; sin imágenes ni componentes nuevos. Manrope y estilos Body compartidos verificados. Se verificaron los cuatro modos y se limpió el override temporal al terminar. Los 11 hijos anteriores de Playground conservan identidad y bounds. La captura visual comprobó contenido legible, sin solapamientos ni recortes.

Los 112 colores resueltos en Figma coinciden con las fuentes de web en cuatro temas, con tolerancia 1e-7 por FLOAT32. Los 19 registros nuevos coinciden en nombre, descripción, scopes y codeSyntax con sus datos delegados. [Paridad](../../output/qa/body-semantic-colors-2026-11-18/color-parity.json).

## Web, contraste y consumo

TOKEN-QA-02 y build/TypeScript PASS. /playground/body consume los colores nuevos por propiedad y mantiene las cinco Cards anteriores. Chrome verificó los 52 tokens, la política global de scopes, los colores renderizados de 28 roles por cuatro temas, widths del Shell 1272/1110/1272, controles por teclado y scroll de la muestra a 320 px. Se preservan las separaciones exteriores de 32 px y el estándar interior 24/16/8/4. [Reporte Chrome](../../output/qa/body-semantic-colors-2026-11-18/chrome.json) y [captura](../../output/qa/body-semantic-colors-2026-11-18/web-color-roles.png).

Pares semánticos text/bg del mismo tono: mínimo 4.590449; el mínimo del conjunto inicial de textos sobre primary/emphasis permanece 4.501742. Formas significativas y bordes primary/brand/semánticos superan 3 en sus pares comprobados. stroke/secondary es un separador decorativo sutil (1.232781 sobre primary) y no se ofrece como única señal de control o estado. No se declara contraste universal entre pares arbitrarios.

Se corrigió el consumidor Figma, que leía solo el JSON inicial de Body: body.data_sources incluye ambas fuentes verificadas, conserva body.data y reconoce los 52 nombres. Tests cubren los 19 tokens nuevos y rechazo cuando falta la ampliación. La suite Python contiene 21 tests de preflight/readback, inmutabilidad por commit e integridad del consumo. La primera ejecución previa a regenerar el catálogo rechazó los hashes antiguos, como corresponde. La validación final se ejecuta contra el catálogo regenerado y su resultado se conserva en el log. [Log](../../output/qa/body-semantic-colors-2026-11-18/python-tests.txt).

Contratos Body, visibilidad y consumo, datos canónicos, registry y ambas guías operativas actualizados. Se conserva el paquete lanzador 1.0.9. La publicación en main se delega a Estado de Github por instrucción explícita del usuario después del cierre de Graphify/catálogo; este QA no implica haber publicado ni instalado. La biblioteca Figma no se publica.

Limitación de Figma: SHAPE_FILL no distingue formas, vectores e iconos; también se usa para fondos de shapes. Los grupos se distinguen por nombre y descripción. Para un icono dibujado con stroke corresponde el token de borde; no existe ICON_FILL. COLOR admitió todos los scopes solicitados sin rechazo.
