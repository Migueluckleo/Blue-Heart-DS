# QA documental · Body shape inverse

Fecha: 2026-11-19. Resultado documental: PASS. Preparación READY; delegación DELEGATED_FOR_BUILD. user_audit NOT_REQUIRED; human_review_policy OPTIONAL_NON_BLOCKING.

EXPLICIT: el usuario solicita el color inverse para shapes consumiendo el semántico blanco. La [enmienda vigente](../../specs/foundations/body.semantic-colors.amendment.v1.0.0.md) define un único nuevo rol COLOR, `component/body/color/shape/inverse`, alias a neutral-base → neutral/100 (#FFFFFF) en los cuatro temas. La evidencia previa identifica neutral-base `VariableID:8:192` en destino y `VariableID:6:166` en los datos fuente; el nuevo targetId se registra después de crearlo. No confundir esos espacios de identidad.

La política admite solo SHAPE_FILL; no ofrece inverse como color de texto, fondo de frame o borde. Se conservan los 52 Body previos, semánticos, primitivas y cinco estilos con bindings. El estándar de espaciado y los tokens internos de componentes permanecen. Body suma 53 tokens y 29 colores, sin nueva versión. P-SLOTS NOT_APPLICABLE: foundation y muestra editable, sin alta de componente.

Los datos delegados y la política enumeran el mismo rol; las dos guías consumen las mismas fuentes. La muestra propuesta es una forma inverse sobre una forma brand, con bindings de componente Body, y debe verificar contraste y resolución en los cuatro temas en Figma/web. La implementación y el cierre se acreditan en un QA independiente tras la lectura posterior; este PASS no los sustituye. Sin publicación ni instalación.
