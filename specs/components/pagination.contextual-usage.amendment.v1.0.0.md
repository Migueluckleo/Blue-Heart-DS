---
contract_schema: sdd-project/0.2
contract_id: PAGINATION-001
amendment_id: PAGINATION-CONTEXTUAL-USAGE-001
name: Pagination · Uso contextual
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-25
base_contract: specs/components/pagination.contract.v1.0.0.md
applies_to: [PAGINATION-001]
dependencies: [PAGINATION-ITEM-001, INPUT-001]
pattern_ids: [TABLE-PAGINATION-001, TABLE-SELECTION-SCOPE-001, TABLE-RESULTS-001]
slot_applicability: REQUIRED
approval_ref: sources/inventories/tables-contextual-usage.approval.2026-11-25.json
supersedes_scope: Para la composición Default documentada exige contador a la derecha; conserva opciones left/right y default implícito del código como evidencia, sin cambiar API o Figma
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Pagination · Guía contextual

La instrucción explícita «En default el contador de registros va a la derecha del pagination» gobierna esta composición. Lee [base y cálculo](pagination.contract.v1.0.0.md), [items](pagination-item.contextual-usage.amendment.v1.0.0.md) y [patrones](../patterns/tables-pagination-selection.amendment.v1.0.0.md). La aprobación del PDF conserva las capacidades existentes; no equivale a cambiar el default técnico.

## Guía semántica normativa

**PAG-INTENT-01.** Usa Pagination para recorrer lotes del mismo conjunto. No convertir páginas en secciones del objeto, etapas de formulario, carrusel o Stepper. Una misma consulta no debe mezclar Pagination y scroll infinito como formas simultáneas de recorrerla. La elección Default/Compact depende de tarea y ancho, no cambia automáticamente por breakpoint.

| Tipo | Uso | Composición aprobada |
|---|---|---|
| Default | Saltar a números y, cuando convenga, cambiar tamaño de lote. | Primera/anterior, números con elipsis, siguiente/última; rows opcional. Contador de registros a la derecha de todos los controles. |
| Compact | Avance anterior/siguiente y lectura de posición. | Dos flechas y Página N de M; resumen visible si corresponde, a izquierda o derecha. |

**PAG-POSITION-01.** Configurar explícitamente `rangePosition="right"` en Default, tanto standalone como en `Table.pagination`. El valor implícito actual del código sigue siendo left y no aplica esta regla contextual. La base Figma ofrece cuatro combinaciones técnicas default/compact × left/right; esta guía prescribe Default/right y conserva ambos lados de Compact. No eliminar la variante técnica ni afirmar que fue modificada. El resumen se coloca después de navegación y selector de filas; cambiar su posición visual conserva foco, rango y selección.

**PAG-RANGE-01.** Distinguir posición del lote (Página 2 de 2) y registros (21-25 de 25 registros). El número de página no sustituye el total. Con `totalRecords` entero seguro >=0 y tamaño entero positivo, el componente calcula rango y páginas; usa rows.value si existe, o pageSize con default 20. `range` permite texto propio que el anfitrión debe mantener coherente. Sin total válido gobierna totalPages. No representar total desconocido como cero ni inventar cifras.

| Caso confirmado | Resumen y disponibilidad |
|---|---|
| 0 registros | 0-0 de 0 registros; una página y flechas deshabilitadas. |
| 1 registro | 1-1 de 1 registro; conserva resumen. |
| 25 registros, tamaño 20, página 1 | 1-20 de 25 registros. |
| Mismo conjunto, página 2 | 21-25 de 25 registros; no extender a 40. |

**PAG-VISIBLE-01.** Con total válido, conservar resumen incluso en una página. Sin totalRecords válido, totalPages menor que dos oculta el componente; no sustituirlo por una cifra ficticia. `aria-live=polite` anuncia rango/posición en web. Acotar visualmente currentPage no sincroniza las filas reales del anfitrión.

**PAG-ROWS-01.** rows habilita selector solo en Default. Conserva Input/filled small con ancho 88 y sin label/helper/tooltip/badge visuales; su nombre accesible identifica Filas por página. 20/50/100 son opciones de muestra, no un límite universal. Cambiar tamaño actualiza página, total, filas, rango y selección conforme a una política declarada; reiniciar a página 1 es propuesta base, no persistencia automática.

**PAG-CONSISTENCY-01.** Página, filtros, orden y tamaño describen la misma consulta. Al paginar conservar filtros/orden y actualizar rango y filas juntos. No mostrar rango nuevo con filas antiguas sin explicar espera. Al filtrar, resolver páginas fuera de rango; la propuesta vuelve a la primera. Al eliminar el último registro, ajustar solo tras resultado confirmado. El anfitrión resuelve carga, fallos, respuestas tardías, reintento y regreso de detalle; un clic no confirma consulta remota.

**PAG-SLOT-01.** P-SLOTS REQUIRED en Default: Pages admite Pagination item, mínimo uno y sin máximo declarado; insertar, retirar y reordenar conservando orden, extremos y página única. La muestra y sus dimensiones no fijan ancho ni cantidad. No crear una segunda selección con Chips/Tabs para reemplazar items.

**PAG-KEYBOARD-01.** Tab/Shift+Tab recorre controles habilitados. Enter/Espacio activa el botón pertinente; flechas del teclado no cambian páginas como Tabs. El anfitrión decide y prueba el foco tras reemplazar datos; Pagination anuncia cambios sin moverlo automáticamente. No hay size ni modo móvil automático; touchTargets amplía objetivos a 44 px sin escalar superficie de 32.

## Description exacta

PAGINATION-001 · Recorre lotes de una consulta. Default ofrece números y filas por página opcionales, con contador a la derecha mediante rangePosition right explícito. Compact concentra anterior/siguiente y posición. Sincroniza rango, página y datos; conserva cero y última página parcial. El anfitrión gestiona consulta, selección y foco. No sustituye Tabs ni Stepper.

## Aceptación

Comprobar colocación derecha en cada Default, cifras confirmadas, singular/cero/parcial, selector opcional, extremos, elipsis sin foco, nombres y coordinación con selección. No inventar props de consulta o persistencia. La [aprobación](../../sources/inventories/tables-contextual-usage.approval.2026-11-25.json) conserva las pruebas locales del PDF con sus límites.
