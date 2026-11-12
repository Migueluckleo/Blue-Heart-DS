# Guía semántica y descripción en Figma

La spec de cada familia es la fuente normativa de su guía. Un Figma fuente puede demostrar la anatomía, variantes y estados observados. La intención se redacta desde evidencia suficiente, contexto de uso y decisiones aplicables. Registra clase de evidencia, localizador o ID de decisión por afirmación. Si una regla material sigue abierta, incluye una pregunta concreta para el usuario y marca `UNRESOLVED` el alcance afectado.

| Guía | Contenido mínimo aplicable |
|---|---|
| Foundations y tokens | Rol semántico, cuándo usar y evitar, alternativas por intención, jerarquía de capas, composición/aliases, modos y estados, restricciones de contenido, accesibilidad y ejemplos Haz/Evita. Declara N/A con motivo para dimensiones ajenas al token. |
| Componentes | Propósito, cuándo usar y evitar, alternativas, elección de jerarquía, variantes y estados, anatomía y rol de cada parte, composición y Slots, reglas de contenido, accesibilidad y ejemplos Haz/Evita. |
| Patrones | Intención, cuándo usar y evitar, alternativas, anatomía y responsabilidades de las partes, dependencias y Slots, secuencia y estados, contenido, accesibilidad, ejemplos Haz/Evita y límites del patrón. |

## Contrato, Description y ficha

El MD contiene la guía completa y un bloque de texto exacto para el campo `Description` de cada componente principal o component set del maestro. Esa descripción comunica propósito, lugar en la jerarquía y cómo elegir las variantes aplicables. El ejemplo conceptual de Button solo orienta la estructura. Incluye el enlace de documentación mediante la propiedad disponible donde la herramienta lo admita, además de la descripción autocontenida.

La ficha técnica deriva la guía del contrato por identidad y versión. La trazabilidad conserva ID de familia, versión y hash de contrato, ancla de la guía, identidad real del nodo, Description de lectura posterior, URL de documentación y ficha. Si una enmienda cambia una regla, sincroniza los destinos afectados y valida de nuevo.

[P03](../protocols/03-CONTRACT-SYNTHESIS.md) redacta, [P04](../protocols/04-FIGMA-CONSTRUCTION.md) escribe y lee, [P06](../protocols/06-QA-AND-VALIDATION.md) verifica y [P07](../protocols/07-WEB-COMPONENTS-AND-TECHNICAL-DOCUMENTATION.md) entrega la ficha.

La documentación queda en Description, su enlace y la ficha externa. Al cierre, la página de familia contiene únicamente sus componentes y sets, con las variantes dentro de sus sets.
