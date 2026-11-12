# QA de implementación · Radio group

Corte 2026-11-11 · RADIO-GROUP-001 v1.0.0. [QA documental](../contracts/radio-group.v1.0.0.review.md).

Figma PASS. Set `35:108` en Radio Buttons `32:119`, cuatro variantes. [Lectura independiente](../../implementations/figma/root-families-2026-11-11/radio-group.readback.json) con 346 comprobaciones y cero discrepancias. Incluye geometría, estilos, 148 bindings en la lectura conjunta de contenedor y opciones, y 12 vínculos a variantes del set oficial Radio `32:142`. Captura del set 726 × 312 inspeccionada. No quedan instancias de prueba en la página.

P-SLOTS REQUIRED · PASS para la prueba programática. Options es una propiedad SLOT con el key del Radio oficial. La instancia de prueba aceptó 2/5 opciones verticales y 2/3 horizontales. Reportó BELOW_MIN para 0/1, ABOVE_MAX para 6 y HAS_NON_PREFERRED al insertar un frame. Figma reporta la violación sobre el contenido insertado. La prueba agregó, retiró y reordenó opciones; conservó el orden, Label editado y selección al cambiar direction/state; comprobó expansión con etiqueta larga, mensaje fijo en error, visibilidad independiente y texto editable en default. La cardinalidad común de Figma permite 4 horizontal. La API web aplica el límite específico de 3 del contrato. No se abrió reproducción visual interactiva nativa.

Web PASS. Ejemplo local con selección controlada y dos casos. Chrome probó Espacio, flechas, exclusividad, nombre y asociación del mensaje fijo por aria-describedby. Node verificó cardinalidades, título oculto y mensaje fijo. TypeScript y exportación estática Next pasaron. La prueba de navegador no midió el tamaño táctil en un dispositivo físico.

El maestro y la documentación de consumo permanecen en el alcance local. La fuente se leyó sin escritura.
