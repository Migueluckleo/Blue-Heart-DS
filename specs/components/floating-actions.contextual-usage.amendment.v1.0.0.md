---
contract_schema: sdd-project/0.2
contract_id: FLOATING-ACTIONS-001
amendment_id: FLOATING-ACTIONS-CONTEXTUAL-USAGE-001
name: Floating Actions · Uso contextual en selección de tablas
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-25
base_contract: specs/components/floating-actions.contract.v1.0.0.md
applies_to: [FLOATING-ACTIONS-001]
dependencies: [DOT-001, BUTTON-001, ICON-BUTTON-001]
pattern_ids: [TABLE-BULK-SELECTION-001, TABLE-SELECTION-SCOPE-001, TABLE-ROW-ACTIONS-001]
slot_applicability: REQUIRED
approval_ref: sources/inventories/tables-contextual-usage.approval.2026-11-25.json
supersedes_scope: Añade uso en tablas con umbral 2+, anclaje y cierre adoptado del PDF; conserva selector de alcance vigente, Slot, datos, tokens y API
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Floating Actions · Guía contextual

Lee [base](floating-actions.contract.v1.0.0.md), [selector de alcance vigente](floating-actions.selection-scope.amendment.v1.0.0.md), [Dot amplio](dot.count-multi.amendment.v1.0.0.md) y los [patrones](../patterns/tables-pagination-selection.amendment.v1.0.0.md). La aprobación del PDF adopta su propuesta de X como Limpiar selección para este patrón; no cambia el cierre de otros contextos.

## Guía semántica normativa

**FA-INTENT-01.** Reúne acciones sobre una selección existente. El resumen nombra objetos y cantidad; cada operación afecta exactamente la colección indicada al activar. Las acciones de fila conservan alcance individual. Si solo parte de la selección es elegible, explicar restricción/disponibilidad; no operar silenciosamente sobre un subconjunto mientras el contador presenta otro alcance.

**FA-THRESHOLD-01.** En multiselección de tablas: cero o un registro seleccionado no muestra la barra; desde dos IDs únicos seleccionados sí aparece. No contar casilla de cabecera, Mixed, celdas o filas simplemente coloreadas. Al volver a uno/cero se oculta. La regla pertenece al patrón; no es una nueva variante ni un umbral global para cualquier uso de Floating Actions.

**FA-ANCHOR-01.** Fijar la barra centrada respecto a toda la pantalla, a 32 px de su borde inferior visible, también con Sidebar expandida/contraída y durante scroll. Medir desde la superficie inferior, sin incluir sombra. No centrar solo respecto a Body/tabla. En web el anfitrión la coloca fuera de viewports recortados y ancestros que alteren position fixed; el componente no se posiciona automáticamente.

**FA-SPACE-01.** Reservar desplazamiento inferior: altura real de barra + 32 de anclaje + espacio de lectura. El ejemplo 96+32+32=160 no es altura universal. Todos los controles finales deben quedar alcanzables por encima de la barra. 1024 × 96 es referencia, no ancho máximo de producto. No comprimir texto/padding/hijos para ajustar; priorizar acciones u omitir selector según alcance. No prometer wrap, orientación vertical, móvil o menú de más acciones automático.

### Anatomía y alcance

**FA-SUMMARY-01.** Dot large/neutral muestra cantidad ya seleccionada y Label nombra objetos. El anfitrión calcula ambos. Para dos o más dígitos, Dot usa 8 px laterales, conservando alto large 20/medium 16. Figma usa count-multi con Count; React count lo ajusta incluso con separadores. count-expand conserva Max count independiente; 99+ es ejemplo de límite, no umbral obligatorio. Comunicar cantidad accesiblemente desde el anfitrión/resumen; Dot no recibe foco.

| Región | Regla |
|---|---|
| Seleccionar | Button/text large con CaretDown abre dos comandos fijos; no ejecuta exportación ni navega. |
| Solo esta página | Registros seleccionables de la página activa; cantidad y contexto antes de activar. |
| Todo | Histórico activo según filtros/configuración, incluidas sus demás páginas; no toda la empresa ni otros históricos. |
| General actions | Slot horizontal abierto: insertar, retirar, reemplazar y reordenar controles oficiales; las cuatro acciones originales no fijan cardinalidad. |
| Divider y X | Conservan composición. En este patrón X limpia selección y restaura foco a tabla. |

**FA-SCOPE-01.** Conservar Seleccionar disponible al completar una página: permite cambiar de alcance. Los conteos del menú describen cada comando y no se suman; el de la barra describe lo ya seleccionado. El anfitrión aporta countLabel, context, disabled y onSelect; aplica el cambio y actualiza IDs/conteo. Los números 6/12 del fixture o 50/2,600 de una referencia son ejemplos, no límites ni relación aritmética universal.

**FA-MENU-01.** Selector Figma Menu Closed/Open; filas Default/Hover/Focus/Disabled. Referencia 300 × 153 a 4 px sobre el disparador. Web se ajusta al viewport con popover para evitar recorte desde tabla con overflow. Flechas recorren habilitadas; Inicio/Fin llegan a extremos; Enter/Espacio activa. Escape cierra solo menú y restaura foco a Seleccionar; clic fuera/pérdida de foco cierra sin aplicar alcance. Disabled permanece visible y no se activa. Focus comunica teclado, no hover.

### Foco, ejecución y cierre

**FA-FOCUS-01.** Marcar la segunda fila muestra la barra sin robar foco al Checkbox. Es un grupo de acciones con resumen role=status, no diálogo modal ni focus trap. El anfitrión puede ofrecer Ir a acciones de selección explícito. Conservar teclado de hijos y no recortar/cubrir su anillo.

**FA-CLEAR-01.** La X se nombra Limpiar selección: vacía IDs, oculta barra y lleva foco a control estable de tabla. Esta decisión fue propuesta complementaria y queda adoptada al aprobar el PDF; se limita a este patrón. No ocultar barra dejando 2+ seleccionados sin acceso a sus acciones. Al pasar 2→1, conservar foco en la casilla usada. Si se desmonta un control enfocado, reubicar foco en destino disponible; cerrar menú no limpia selección.

**FA-EXECUTE-01.** Capturar el conjunto al activar, evitar duplicados y mantener contexto durante operación. Button aporta Loading/Disabled cuando corresponde; no hay loading del padre. El clic no confirma éxito. En fallo conservar selección útil y ofrecer recuperación; tras resultado confirmado definir si limpiar o conservar. El componente no incorpora servicio, confirmaciones, Undo o persistencia por sí mismo.

## API, composición y Description exacta

`count` y `label` obligatorios; `selection={page, all, onSelect}` con countLabel/context/disabled por opción. `selectAll` sigue como compatibilidad si se omite selection; no reconstruir el nuevo menú con ese enlace. `actions`, `onDismiss`, `dismissLabel` y className conservan su alcance. No inventar threshold, bottom, centered, estado de barra o callbacks de datos. P-SLOTS REQUIRED solo donde rige la base: General actions abierto; los dos comandos fijos no requieren otro Slot.

FLOATING-ACTIONS-001 · Opera sobre la selección real. En tablas aparece con 2+ registros, centrada en pantalla y a 32 px del borde inferior. Seleccionar distingue página e histórico activo con conteo/contexto; no confundir cantidades del menú con seleccionados. General actions es abierto. X limpia selección y restaura foco en este patrón. El anfitrión gestiona IDs, anclaje y resultados.

## Aceptación

Comprobar 0/1/2+, centro de pantalla, 32 px, scroll/contenido alcanzable, operaciones por IDs, ambos alcances, persistencia declarada, teclado del menú, disabled, conteo amplio y foco tras cerrar. No atribuir readback Figma nuevo ni AA global a los fixtures del PDF. [Aprobación y alcance](../../sources/inventories/tables-contextual-usage.approval.2026-11-25.json).
