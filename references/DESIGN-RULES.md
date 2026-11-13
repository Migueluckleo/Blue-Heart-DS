# Reglas de diseño y reconstrucción

[P03](../protocols/03-CONTRACT-SYNTHESIS.md) gobierna síntesis y [P04](../protocols/04-FIGMA-CONSTRUCTION.md) gobierna escritura y fidelidad. Un MD aprobado o delegado con QA gobierna reglas. El JSON versionado gobierna los datos que el MD delega. Cada token tiene una `description` canónica. Mantén el inventario original, distingue valores primitivos de usos semánticos y verifica aliases y bindings por identidad y por modo. Un color coincidente por sí solo no prueba equivalencia de uso.

Documenta diferencias entre fuente y destino por propiedad, estado y modo con localizadores. Ante discrepancias usa los estados de evidencia y registra la decisión acotada. Una aproximación o excepción material requiere soporte aplicable al nuevo alcance. Para assets de identidad conserva el arte original y verifica proporciones y rasgos, salvo cambio autorizado. Para texto, registra rol, estilo, métricas, herencia y overrides observados. Verifica la cadena real de herencia en los destinos aplicables.

Conserva la trazabilidad de la promoción documental y las versiones sustituidas. Las excepciones y matrices del maestro histórico permanecen en el proyecto padre con su alcance original. En el nuevo proyecto, identidad, estilo, aliases, modos y destino se resuelven con las fuentes registradas y las decisiones del alcance.

Para iconos aplica [Phosphor Icons](PHOSPHOR-ICONS.md) en Figma y React. Las partes nativas de indicadores conservan su contrato.

## Consumo de tokens por componente

Los bindings propios de un componente y sus referencias CSS consumen variables de la colección component. Cada variable de componente apunta a un rol semántico por tema y este a una primitiva. Una instancia hereda los roles de su maestro. Si el anfitrión sobrescribe una propiedad, usa un token de componente que exprese ese rol. Conserva las excepciones de arte original documentadas en la spec. La corrección del 12 de noviembre de 2026 se aplica a las versiones vigentes. [Datos de la corrección](../specs/tokens/component-layer.correction.json)
