# DEC-EFFICIENT-CLOSURE-001 · Cierre coordinado e incremental

Fecha: 2026-10-23. Decisión explícita del usuario: aplicar los cinco cambios propuestos tras revisar el costo del cierre de Button: coordinación única, incremental por hashes/dependencias, comando común, automatización mecánica y contexto/medición acotados.

Alcance: herramientas locales, documentación operativa y contexto de agentes. No modifica requisitos visuales, tokens ni estados de contratos. Mantiene el HOLD de publicación Git solicitado por el usuario.

Se adopta [el cierre eficiente](../references/EFFICIENT-CLOSURE.md) como entrada común de P05/P08. Sustituye la necesidad operativa de ejecutar secuencias redundantes de sync/check/export cuando el comando común verifica el mismo corte. Los comandos anteriores siguen disponibles y participan en el bloqueo compartido. No elimina criterios de QA, cobertura, procedencia ni comprobaciones globales.

Las reglas detalladas trasladadas desde AGENTS se conservan en [reglas de diseño](../references/DESIGN-RULES.md); se cargan según tarea. El índice es derivado, y la extracción semántica sigue requiriendo evidencia y el procedimiento Graphify.

Implementación: scripts/ds_close.py, scripts/ds_session.py y scripts/ds_incremental.py. Pruebas de regresión en tests/test_efficient_closure.py y suites existentes. Evidencia de ejecución y medición en output/closures/2026-10-23-efficient-closure.json y output/closure-refactor/; consultar los resultados reales, no inferir PASS por la existencia de esta decisión.

user_audit: NOT_REQUIRED. human_review_policy: OPTIONAL_NON_BLOCKING. Publicación remota: no autorizada en este lote.
