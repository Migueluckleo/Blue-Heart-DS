# QA documental · Pagination y Pagination item

2026-11-11 · PAGINATION-001 y PAGINATION-ITEM-001 · PASS · DELEGATED_FOR_BUILD.

La fuente viva confirma nueve variantes de ítem, cuatro carets Outline Light con keys cotejadas en Phosphor, dos reacciones hover y dos variantes del padre. Pages se delega como Slot nativo de mínimo uno y preferencia exclusiva por Pagination item. Input/filled `282:132` aporta el disparador de filas. Los datos delegados preservan geometría, cadenas, props y destinos de reacciones. El frame guía de la raíz es `594:34`. Los contratos separan el contenido editable y la lógica del anfitrión.

## Cantidad de registros · 2026-11-17

PASS documental. El contrato define Range y Show range en ambas presentaciones, el cálculo web con totalRecords y filas por página, la última página parcial, cero y un registro. El texto se anuncia con el rango actualizado y reutiliza los tokens existentes de Pagination.

## Posición del resumen · 2026-11-17

PASS documental. Izquierda es el default. La matriz cruza Default y Compact con left y right. El cambio de posición conserva Range, Show range, Page label, Pages y el cálculo del rango web.
