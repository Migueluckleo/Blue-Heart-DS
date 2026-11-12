---
contract_schema: sdd-project/0.2
contract_id: null
name: null
type: tokens
status: DRAFT
version: 0.1.0
owner: null
last_updated: null
review_targets: []
sources: []
data_refs: []
dependencies: []
---

# TODO: contrato de foundations/tokens

> PLANTILLA EDITORIAL, NO CONTRATO APROBADO. Completar mediante P03. No copiar el contenido del inventario dentro del MD como un segundo catálogo editable. El esquema de contrato es una convención local del proyecto.

## 1. Propósito y alcance

TODO: qué paquete de foundations representa este contrato, qué archivos lo sustentan y qué parte del sistema queda fuera. No inferir componentes desde un inventario de variables.

## 2. Fuentes y propiedad de datos

| ID | Ruta/URL y localizador | Versión/snapshot | Hash y método | Autoridad comprobada | Campos delegados |
|---|---|---|---|---|---|
| SRC-001 | TODO | TODO | TODO | TODO | TODO |

Declarar dónde vive cada dato. El JSON referenciado es el único propietario de sus valores, aliases, modos y `description` cuando se apruebe esa delegación. El MD gobierna reglas de consumo, reconstrucción y aceptación, no corrige silenciosamente el JSON.

## 3. Inventario y cobertura

| Colección | ID | Variables contadas | Modos | Modo predeterminado | Fuente |
|---|---|---|---|---|---|
| TODO | TODO | TODO, calcular | TODO | TODO | TODO |

Registrar campos ausentes, partes no leídas, referencias externas y recursos no incluidos. Un conteo es una medida de este archivo/version, no una constante de todo el sistema.

## 4. Modelo de tokens

TODO: capas primitive/semantic efectivamente presentes, roles, tipos, escalas y límites de interpretación. No añadir capas o renombrar las existentes para adoptar otra librería.

## 5. Requisitos candidatos

| ID | Requisito | Fuerza propuesta | Procedencia | Fuente | Comprobación |
|---|---|---|---|---|---|
| REQ-001 | TODO | TODO | TODO | TODO | AC-001 |

Aún no son obligaciones aprobadas. Registrar los requisitos de preservación y consumo que correspondan al alcance, no mandatos inferidos por el nombre de un token.

## 6. Modos y resolución de aliases

TODO: modos declarados, herencia demostrada, resolución y dependencias entre colecciones. Conservar literales semánticos si existen. Registrar aliases rotos, ciclos o tipos incompatibles como hallazgos, sin corregirlos aquí.

No resolver permanentemente el alias a literal ni fusionar dos tokens por compartir valor.

## 7. Descripciones canónicas

La documentación semántica por token usa un único campo `description` en el JSON delegado. Referenciar su ubicación. No crear `usage` o descripciones independientes para Figma/web/IA.

TODO: describir la regla aplicable para primitives y semánticos y registrar insuficiencias semánticas como propuestas fuera del JSON actual. Un uso específico de componente requiere fuente propia.

## 8. Tipos, unidades y conversiones

| Grupo/campo | Tipo de origen | Unidad demostrada | Consumo Figma | Consumo web | Pendiente/fuente |
|---|---|---|---|---|---|
| TODO | TODO | UNRESOLVED | TODO | UNRESOLVED | TODO |

No convertir por intuición los FLOAT a px, porcentajes o em. No mapear strings tipográficos a pesos numéricos sin un contrato de implementación. `codeSyntax` vacío puede permanecer vacío hasta que exista ese contrato.

## 9. Reconstrucción en Figma

Referenciar P04 y su destino autorizado. Definir las entidades que se reconstruirán, los campos a preservar y el mapa de IDs de origen a IDs reales de destino.

TODO: organización visual de foundations si se solicita. No inventar una página ni una galería para cumplir una regla que aplica a familias de componentes.

## 10. Consumo web

TODO: indicar si está fuera del alcance inicial. Cuando se incluya, deben estar definidos naming, tipos, unidades, modos, transformaciones y tests. No producir CSS ni props desde `codeSyntax: {}` por suposición.

## 11. Cambios de auditoría, conflictos y límites

| Hallazgo/decisión | Fuente | Ya aplicado al JSON | Requiere decisión | Destino que afecta |
|---|---|---|---|---|
| TODO | TODO | UNRESOLVED | TODO | TODO |

No reaplicar ajustes ya contenidos en el archivo. Una auditoría externa es evidencia de su reporte, no una inspección ejecutada por este agente.

## 12. Acceptance criteria

| ID | Requisito | Destino | Comprobación | Evidencia requerida |
|---|---|---|---|---|
| AC-001 | REQ-001 | TODO | TODO | TODO |

Cubrir los campos exigidos del inventario y la integridad de referencias. No declarar aprobado el readback del destino cuando aún no hubo construcción.

## 13. Versionado y aprobación

TODO: versión, historial y ámbito de aprobación. Registrar digest de contrato y datos, aprobación humana real o delegación técnica según P03 y efectos de una sustitución. Mantener aprobación separada de preparación Figma/web y de validación de implementación.

## 14. Changelog

| Versión | Fecha | Cambio | Fuente/decisión |
|---|---|---|---|
| 0.1.0 | TODO | Primer candidato, no aprobado | TODO |

## Anexo de revisión

TODO: reporte de síntesis, cobertura, preguntas pendientes y revisión documental. No ocultar decisiones de diseño dentro de notas operativas.
 
## Guía semántica normativa

Completa la [guía de uso](../references/USAGE-GUIDE.md). Cada fila cita fuente, localizador o decisión y clase de evidencia. Usa `UNRESOLVED` con pregunta concreta para una regla material pendiente.

| Dimensión | Regla y criterio comprobable | Fuente o decisión |
|---|---|---|
| Propósito, cuándo usar y cuándo evitar | TODO | TODO |
| Alternativas, jerarquía y criterios de elección | TODO | TODO |
| Anatomía, roles y composición/Slots o aliases | TODO | TODO |
| Variantes, modos y estados aplicables | TODO | TODO |
| Contenido y accesibilidad | TODO | TODO |
| Ejemplo Haz y ejemplo Evita, con su razón | TODO | TODO |

Vincula los datos delegados por ruta, versión, hash y puntero. La única `description` canónica de un token vive en su JSON delegado.
