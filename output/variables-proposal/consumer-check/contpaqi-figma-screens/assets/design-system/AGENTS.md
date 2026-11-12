# AGENTS.md

**Paquete de protocolos:** 0.5.0 · **Método:** Specs Driven Design (SDD).

## Alcance y autoridad

La solicitud actual determina qué ejecutar. Leer una fase no autoriza las siguientes. Las decisiones explícitas del usuario gobiernan el alcance; sus restricciones de publicación permanecen hasta que las cambie.

Los contratos MD aprobados o DELEGATED_FOR_BUILD con QA documental gobiernan reglas; los JSON gobiernan únicamente los datos que esos contratos les delegan. Una enmienda sustituye solo el alcance identificado. Ante fuentes aprobadas contradictorias, registrar CONFLICT y detener la operación afectada. Figma observado, código, inventarios sin aprobar y Graphify son evidencia, no autoridad.

No inventar requisitos, tokens, estados, variantes, valores ni aprobaciones. Distinguir EXPLICIT, DERIVED, OBSERVED, INFERRED, UNRESOLVED y CONFLICT. Conservar originales, versiones históricas e IDs de origen; separar IDs reales de destino. Las plantillas no aprueban contratos futuros.

[DEC-AI-TECHNICAL-CLOSURE-001](registry/DEC-AI-TECHNICAL-CLOSURE-001.md) permite avanzar dentro de lo solicitado y cerrar con QA técnico suficiente: user_audit: NOT_REQUIRED y human_review_policy: OPTIONAL_NON_BLOCKING. Un PENDING histórico no es aprobación ni QA ejecutado. Una observación posterior abre corrección y revalidación. Esto no sustituye un HOLD explícito del usuario.

## Selección de lectura

Leer el protocolo pertinente y sus dependencias necesarias; consultar registros antes de asumir estados. No cargar todos los protocolos para cada tarea.

| Tarea | Protocolo |
|---|---|
| Preparar herramientas, con autorización | [P01](protocols/01-ENVIRONMENT-AND-TOOLS.md) |
| Recibir y conservar fuentes | [P02](protocols/02-DOCUMENT-INGESTION-AND-STORAGE.md) |
| Sintetizar o enmendar contratos | [P03](protocols/03-CONTRACT-SYNTHESIS.md) |
| Construir en Figma | [P04](protocols/04-FIGMA-CONSTRUCTION.md) |
| Registrar cambios y cerrar el índice | [P05](protocols/05-SELF-DOCUMENTATION-AND-TRACEABILITY.md) |
| QA documental e implementación | [P06](protocols/06-QA-AND-VALIDATION.md) |
| Alta o modificación de componentes DS: web y documentación obligatorias | [P07](protocols/07-WEB-COMPONENTS-AND-TECHNICAL-DOCUMENTATION.md) |
| Cambios en fuentes de consumo: catálogo y ambas skills | [P08](protocols/08-SKILLS-AND-RELEASES.md) |

Antes de modificar componentes, tokens, tipografía o reconstrucciones, leer las [reglas de diseño y migración](references/DESIGN-RULES.md). Consulta los roles y destinos registrados en [Recepción de fuentes](registry/sources.md). El corpus de esta base empieza vacío de datos de diseño.

Por familia, aplicar [P-SLOTS](protocols/SLOTS-REVIEW-AND-IMPLEMENTATION.md): REQUIRED, NOT_APPLICABLE justificado o UNRESOLVED. Cantidad fija en un ejemplo, nombre Slot o instancias expuestas no prueban implementación. Un contrato aprobado se verifica, no se vuelve a sintetizar automáticamente.

Flujo de construcción solicitada: fuentes → contrato → QA documental → delegación registrada → implementación → lectura del resultado → QA → cierre. Sin fuentes suficientes, capacidad de escritura o evidencia de QA no declarar preparación ni VALIDATED.

## Cierre eficiente y medición

Aplicar [DEC-EFFICIENT-CLOSURE-001](registry/DEC-EFFICIENT-CLOSURE-001.md) y la [guía de cierre](references/EFFICIENT-CLOSURE.md).

- Usar scripts/ds close --run ID como entrada única. Reanudar el mismo ID cuando solicite semántica; usar otro si cambiaron fuentes. --install solo para copias gestionadas autorizadas.
- Ante BUSY o WAITING_FOR_SEMANTICS, consultar el comprobante del propietario y reutilizar su resultado. No lanzar otra reconstrucción ni borrar el lock.
- Mantener cobertura global, hashes, integridad, JSON/reporte/HTML y consultas del alcance. Extraer cambios y dependencias; reutilizar evidencia solo con procedencia verificable. Un fallback completo justificado conserva calidad.
- Graphify es derivado. En preguntas del repositorio consultar primero graphify query con presupuesto acotado; para relaciones usar path y para conceptos explain. Leer después las fuentes pertinentes. Usar la wiki si existe; evitar volcar el reporte completo. Si se invoca /graphify, leer la skill instalada.
- Para semántica, seguir la skill Graphify sobre el delta preparado; no sustituirla por AST o encabezados automáticos. La orquestación local no requiere agentes permanentes, servicios, instalaciones ni publicaciones.
- Operaciones mecánicas en scripts; salidas breves e hitos. No repetir checks con el mismo corte ni sondear repetidamente sin cambios. No ampliar QA tras PASS sin un cambio, fallo o incertidumbre concreta.
- Registrar observaciones de uso al inicio/final cuando la herramienta las permita, tiempos por fase, invocaciones, reintentos y contención. El porcentaje es compartido por cuenta; tokens o llamadas no observables se marcan UNAVAILABLE, nunca cero ni consumo exclusivo atribuido.

P08 mantiene ambas skills y catálogo del mismo corte; el motor y el catálogo local conservan identidades separadas. No editar paquetes históricos ni snapshots generados. La instalación debe preservar ediciones ajenas.

Antes de cerrar, persistir qué se leyó, cambió y comprobó, bloqueos y decisiones necesarias. CURRENT exige evidencia; si falla, conservar el último resultado válido y registrar STALE/BLOCKED. Una prohibición expresa de actualizar el grafo prevalece.

