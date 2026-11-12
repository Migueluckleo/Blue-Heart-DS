---
contract_schema: sdd-project/0.2
contract_id: null
name: null
type: component
status: DRAFT
version: 0.1.0
owner: null
last_updated: null
review_targets: []
figma_page_name: null
sources: []
data_refs: []
dependencies: []
---

# TODO: nombre canónico del componente

> PLANTILLA EDITORIAL, NO CONTRATO APROBADO. Aplicar P03. Sustituir los campos con evidencia y retirar estas instrucciones al preparar el contrato real. `sdd-project/0.2` es una convención local, no un estándar externo.
>
> La estructura conserva las 21 secciones del ejemplo de Button compartido. No hereda su API, medidas, variantes, comportamiento, tokens, madurez ni paquete. Todos los requisitos redactados en DRAFT/IN_REVIEW son candidatos hasta QA documental y delegación técnica conforme P03, o aprobación humana explícita.

## Alcance de la revisión

TODO: entidad/familia cubierta, nodo o inventario inspeccionado, versiones, alcance Figma/web y límites de cobertura. Diferenciar definiciones principales, instancias y ejemplos.

## 1. Purpose

TODO: propósito sustentado, intención de uso y límites demostrados. Si la fuente solo acredita apariencia, escribir `UNRESOLVED` para la intención no demostrada y vincular la pregunta al reporte.

No convertir el propósito del Button educativo en propósito de todos los componentes.

## 2. Contract

Declarar requisitos individuales y comprobables. `MUST` es obligatorio, `MUST NOT` prohibido, `SHOULD` recomendado con excepción justificada y `MAY` permitido. En este candidato todavía no tienen aprobación.

| ID | Requisito candidato | Fuerza | Procedencia | Fuente/localizador | Criterio de aceptación |
|---|---|---|---|---|---|
| REQ-001 | TODO | TODO | TODO | TODO | AC-001 |

Las inferencias sin respaldo permanecen en el reporte de síntesis, no como obligaciones demostradas.

## 3. Anatomy

| Parte conceptual | Nodo/rol observado | Obligatoria/opcional | Condición | Fuente |
|---|---|---|---|---|
| TODO | TODO | UNRESOLVED | TODO | TODO |

TODO: diagrama de jerarquía real, slots y dependencias. No añadir loader, iconos ni label si las fuentes no los establecen. Diferenciar elementos siempre presentes de los ocultos por estado.

## 4. Properties

| Propiedad conceptual | Tipo | Requerida | Nullable | Default | Valores admitidos | Fuente |
|---|---|---|---|---|---|---|
| TODO | UNRESOLVED | UNRESOLVED | UNRESOLVED | UNRESOLVED | UNRESOLVED | TODO |

TODO: reglas de contenido y condiciones entre propiedades. Un campo desconocido no tiene default implícito. Verificar que `required` no contradiga casos como contenido solo de icono.

Separar propiedades conceptuales de nombres nativos de Figma y de props web propuestas. No renombrar los originales durante extracción.

## 5. Variants

| Variante | Intención demostrada | Diferencias | Combinaciones permitidas | Fuente |
|---|---|---|---|---|
| TODO | UNRESOLVED | TODO | UNRESOLVED | TODO |

Registrar conjunto observado y cobertura. No asumir `primary`, `secondary`, `tertiary`, `danger` ni otras opciones por el ejemplo.

## 6. Sizes

| Tamaño | Propiedad | Token/ref o literal explícito | Unidad | Layout fijo/flexible | Fuente |
|---|---|---|---|---|---|
| TODO | TODO | TODO | UNRESOLVED | UNRESOLVED | TODO |

Si hay un token canónico, referenciarlo en vez de mantener un número editable duplicado. Si la fuente tiene un literal no tokenizado, registrarlo como observado y abrir la decisión de implementación correspondiente.

## 7. States

| Estado | Condición | Diferencia visual | Interacción demostrada | Coexistencias/prioridad | Fuente |
|---|---|---|---|---|---|
| TODO | UNRESOLVED | TODO | UNRESOLVED | UNRESOLVED | TODO |

Un estado visual no demuestra lógica de ejecución. No asumir que todos los estados son excluyentes o que existen todas las combinaciones.

## 8. Behavior

| Evento | Precondición | Resultado/transición | Efecto externo | Destino | Fuente |
|---|---|---|---|---|---|
| TODO | UNRESOLVED | UNRESOLVED | UNRESOLVED | TODO | TODO |

TODO: activación, procesamiento, errores y concurrencia solo cuando sean aplicables y sustentados. Un flujo asíncrono del ejemplo no es una decisión heredada.

## 9. Accessibility

| Aspecto | Requisito candidato | Destino verificable | Evidencia | Estado |
|---|---|---|---|---|
| Nombre accesible/semántica/teclado/foco, según aplique | UNRESOLVED | TODO | TODO | UNRESOLVED |

Separar lo definido de lo pendiente. No declarar accesibilidad validada en web desde Figma. Recomendaciones externas solo podrán convertirse en decisiones del sistema cuando se soliciten y aprueben explícitamente.

## 10. Design tokens

| Parte/propiedad/estado | Rol semántico | Token fuente observado | Token semántico local propuesto | Colección/modos de destino | Evidencia del mapeo y binding requerido |
|---|---|---|---|---|---|
| TODO | TODO | TODO | TODO | TODO | TODO |

Cubrir colores de fondo, borde, texto e icono, y propiedades tipográficas aplicables: familia, peso, tamaño, interlineado y espaciado de letras. Incluir el inventario JSON aprobado en `data_refs`, su digest de bytes y localizadores precisos; ese JSON gobierna nombres, tipos, modos, valores, aliases y la única `description` canónica. La tabla referencia tokens, no mantiene un segundo catálogo editable. El ID local real se verifica en el preflight P04; no se inventa al redactar. Si no hay equivalencia semántica o token existente, marcar `UNRESOLVED` y su impacto; no copiar el literal fuente ni crear la variable por intuición.

## 11. Content rules

TODO: reglas de contenido demostradas, localización, truncamiento, largos y ejemplos. Los textos observados pueden ser contenido de prueba, no reglas de redacción para toda la familia.

## 12. Composition rules

Aplicar [P-SLOTS](../protocols/SLOTS-REVIEW-AND-IMPLEMENTATION.md). Registrar `slot_applicability: REQUIRED | NOT_APPLICABLE | UNRESOLVED` con evidencia. Cuando aplique, documentar nombre/propósito de la región, anfitrión, dependencias admitidas, operaciones, muestra inicial separada de cardinalidad, reglas de layout/overflow, herencia de tokens, mecanismo propuesto y capacidad comprobada. Si no aplica, justificarlo. Referenciar SLOT-QA-01–09 en Acceptance criteria sin marcarlos ejecutados antes de comprobarlos.

TODO: contenedores, slots, dependencias, restricciones y qué capa controla la separación externa. Distinguir una relación observada de una regla aprobada de composición.

## 13. Responsive behavior

TODO: comportamiento por restricciones, ancho disponible, wrapping y breakpoints solo si están definidos. No inferir `fullWidth`, breakpoints propios o comportamiento móvil de una única medida.

## 14. Edge cases

| Caso | Resultado requerido | Fuente | Estado |
|---|---|---|---|
| TODO | UNRESOLVED | TODO | UNRESOLVED |

TODO: cubrir los casos pertinentes, sin imponer prioridades entre estados basadas en el ejemplo educativo.

## 15. Forbidden combinations

| Combinación prohibida | Regla que la prohíbe | Fuente | Comprobación |
|---|---|---|---|
| TODO | UNRESOLVED | TODO | TODO |

No deducir que una combinación está prohibida solamente porque no apareció en el nodo inspeccionado.

## 16. Design ↔ Code mapping

| Contrato | Figma observado/propuesto | Web observado/propuesto | Fuente | Límite o decisión pendiente |
|---|---|---|---|---|
| TODO | TODO | UNRESOLVED | TODO | TODO |

La API conceptual no tiene que copiar automáticamente la representación de una herramienta. No asignar Boolean, Variant o Instance swap sin evidencias/capacidades pertinentes. No asignar paquete ni nombre de import web por defecto.

Para el destino web, aplicar [P07](../protocols/07-WEB-COMPONENTS-AND-TECHNICAL-DOCUMENTATION.md): registrar export y módulo React, props TypeScript/defaults/eventos, variantes, roles de tokens, traducción de Slots, ejemplo sin backend y documento técnico del catálogo. Completar implementación y evidencia de typecheck/build/interacciones por alcance; un alta no se declara lista para web sin estos entregables. Actualizar la entrada en components.registry.json y regenerar documentación. Los valores desconocidos no se completan desde esta plantilla.

Al cerrar el alta o modificación, aplicar [P08](../protocols/08-SKILLS-AND-RELEASES.md): ambas skills deben incorporar esta familia, sus dependencias y documentación en el mismo corte versionado. Registrar el release y su comprobación fuera del contrato; el empaquetado no constituye aprobación del componente.

`figma_page_name` contiene el nombre exacto, semántico y sustentado de la página exclusiva de la familia; si falta decisión, permanece `null` y bloquea `READY` para Figma. La página debe cumplir P04. Su page ID se registra cuando se lea o cree realmente, no se inventa aquí.

## 17. Acceptance criteria

| ID | REQ vinculado | Alcance/destino | Comprobación | Evidencia requerida | Tolerancia si está aprobada |
|---|---|---|---|---|---|
| AC-001 | REQ-001 | TODO | TODO | TODO | No definida |

Todos los requisitos obligatorios deben tener criterio verificable. Los tests de implementación se ejecutarán después; no marcar casillas como aprobadas al redactar el contrato.

## 18. Examples

TODO: casos válidos e inválidos derivados de requisitos concretos. Indicar qué requisito demuestra cada caso. No incluir código React operativo si su API no está definida; usar descripción conceptual y marcar el mapeo pendiente.

## 19. Source of truth

El contrato vigente aprobado o delegado conforme P03, junto con sus datos canónicos referenciados, define el alcance normativo. Figma y web son implementaciones derivadas.

| ID fuente | Ruta relativa/URL y nodo | Versión o snapshot | Hash de bytes cuando aplique | Rol/autoridad | Campos que gobierna |
|---|---|---|---|---|---|
| SRC-001 | TODO | TODO | TODO | TODO | TODO |

TODO: sincronizar esta tabla con `sources` y `data_refs` del frontmatter mediante referencias, sin duplicar el catálogo de valores. Identificar explícitamente qué JSON posee valores, aliases, modos y `description`.

Aprobación: pendiente; su decisión y hashes se registran externamente según P03/P05. No confundir el estado del contrato con el estado de Figma/web.

## 20. Change management

Versionar modificaciones normativas y registrar impacto en consumidores. PATCH para correcciones sin cambio de requisitos/API; MINOR para adiciones compatibles; MAJOR para cambios incompatibles. Una corrección que cambia el comportamiento no se etiqueta PATCH solamente por llamarse corrección.

TODO: identificar versión anterior y requisitos afectados cuando sea una revisión. Todo cambio normativo requiere revisión y QA del alcance afectado y aprobación o delegación técnica registrada conforme P03; una versión de paquete de protocolos no es la versión del componente.

## 21. Changelog

| Versión | Fecha | Cambio | Fuentes/decisión |
|---|---|---|---|
| 0.1.0 | TODO | Primer candidato, no aprobado | TODO |

## Anexo de revisión

TODO: referenciar reporte de síntesis, preguntas pendientes y revisión documental. Los anexos no añaden requisitos ocultos. Los puntos fuera del alcance de implementación se deben identificar expresamente.
 
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

### Description Figma y ficha

| Identidad lógica de componente principal o set | Texto exacto de Description | Ficha y ancla de guía | Evidencia |
|---|---|---|---|
| TODO | TODO: propósito, jerarquía y elección de variantes | TODO | TODO |

El mapa de implementación incorpora IDs reales y lectura posterior. El QA comprueba concordancia con esta guía.
