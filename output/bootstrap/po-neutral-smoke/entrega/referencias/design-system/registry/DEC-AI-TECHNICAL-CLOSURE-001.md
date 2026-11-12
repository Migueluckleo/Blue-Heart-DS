# DEC-AI-TECHNICAL-CLOSURE-001 · Delegación técnica y revisión humana opcional

Fecha: 2026-10-16. Estado: **AUTORIZADA POR EL USUARIO**. Alcance: trabajo realizado por IA y agentes a partir de solicitudes del usuario en este proyecto, incluida documentación, contratos, implementación y QA.

## Solicitud y decisión

El usuario pidió retirar la espera de verificación humana del avance y cierre del trabajo. Confirmó que los agentes deben documentar lo que construyen, ejecutar las comprobaciones aplicables y continuar sin depender de una revisión que podría no ocurrir. Una observación posterior del usuario inicia la revisión correctiva del resultado afectado.

Esta decisión sustituye la aprobación humana rutinaria como gate entre QA documental y construcción solicitada, y como gate de cierre posterior al QA de implementación. Amplía la delegación técnica más allá de la migración histórica; no aprueba ficticiamente contratos ni implementaciones existentes.

## Flujo vigente

1. La solicitud del usuario delimita qué se documenta, construye o modifica. La delegación no crea trabajo nuevo fuera de ese alcance.
2. El agente conserva fuentes, redacta o revisa el contrato y ejecuta QA documental. Con requisitos sustentados, fuentes versionadas, dependencias resueltas y QA documental `PASS`, puede registrar `DELEGATED_FOR_BUILD`, citando esta decisión y la solicitud concreta. `DRAFT` o `IN_REVIEW` por sí solos no habilitan construcción.
3. La construcción solicitada continúa cuando el destino está `READY` y las capacidades están verificadas. Una tarea que solo pide análisis o documentación no activa Figma ni implementación web.
4. El agente ejecuta las comprobaciones obligatorias aplicables, lee el resultado real, corrige defectos deterministas autorizados y registra evidencia, alcance y límites. Un verificador distinto del autor revisa los cambios de flujo o de alto impacto; se reutilizan herramientas deterministas donde basten.
5. El cierre técnico procede cuando pasa el QA obligatorio, existe trazabilidad y se completan los entregables aplicables de P07/P08 y la sincronización de P05. No se espera una respuesta humana rutinaria para cerrar.
6. Si el usuario informa un defecto, se registra la observación, se identifica la versión/alcance afectado, se reproduce cuando es posible, se corrige y se repite el QA pertinente. Se conserva la historia; el cierre anterior no se presenta como garantía de ausencia de defectos.

## Estados y evidencia

- `APPROVED` sigue reservado a una aprobación humana explícita de entidad, versión y alcance. El agente usa `DELEGATED_FOR_BUILD` para la delegación técnica y `VALIDATED` solo para implementación comprobada.
- Para nuevos registros de este flujo: `user_audit: NOT_REQUIRED` y `human_review_policy: OPTIONAL_NON_BLOCKING`. La revisión humana puede ocurrir después, sin ser una obligación pendiente.
- Los registros históricos con `user_audit: PENDING` conservan sus bytes y significado histórico. Su espera de auditoría humana deja de bloquear por sí sola construcción, consumo o cierre del alcance ya autorizado. Esta decisión no convierte QA `FAIL`, `BLOCKED`, `NOT_RUN` o `STALE` en `PASS`.
- La ausencia de revisión humana no se cuenta como defecto técnico ni como trabajo del usuario pendiente. Nunca se afirma que el usuario revisó, aceptó o publicó algo por silencio.
- La documentación es responsabilidad del agente que ejecuta: fuentes y hashes, solicitud/delegación, cambios, comprobaciones efectivamente ejecutadas, resultados, límites, referencias de destino y correcciones posteriores. No depende de que el usuario entregue un reporte manual.

## Límites que permanecen

Los conflictos entre fuentes vigentes, datos indispensables ausentes, decisiones materiales de producto no definidas, pruebas fallidas y operaciones no verificables se registran y limitan la parte afectada. Se continúa con lo independiente. Pedir un dato o una decisión material indispensable no equivale a pedir aprobación rutinaria de QA.

La delegación no autoriza inventar intención, tokens, tolerancias, fuentes, IDs ni estados; no amplía permisos de herramientas ni autoriza publicaciones externas, operaciones destructivas o cambios de diseño fuera de la solicitud. Una desviación de requisitos no pasa automáticamente por esta decisión. La aceptación excepcional necesita autoridad específica o resolución del defecto.

## Sustituciones acotadas

Sustituye únicamente la exigencia de aprobación/revisión humana rutinaria para avance o cierre en AGENTS, P02/P03/P04/P05/P06/P07/P08 y sus plantillas/instrucciones de consumo. Conserva requisitos de diseño, estados históricos y condiciones técnicas. Las menciones históricas a auditoría posterior obligatoria en DEC-LEGACY-MIGRATION-DELEGATION-001 y DEC-MIGRATION-SPECS-AUDIT-001 quedan subordinadas a esta política opcional; sus demás autorizaciones y restricciones permanecen.

La publicación documental de contratos delegados, con QA documental e implementación técnica `PASS`, puede utilizar `specs/` conservando su estado delegado. Si solo se solicita síntesis, se conserva el candidato y el QA sin afirmar una implementación. Las revisiones normativas posteriores siguen el versionado y la ubicación canónica de P03/P05.

El diseño de Evolution Lab propone además consumo central versionado del DS; esta decisión no afirma que ese mecanismo remoto ya esté implementado. Hasta su migración comprobada, los paquetes actuales se mantienen con P08 para que esta política llegue a ambas skills.
