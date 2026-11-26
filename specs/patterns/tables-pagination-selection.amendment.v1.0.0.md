---
contract_schema: sdd-project/0.2
contract_id: TABLE-001
amendment_id: TABLES-PAGINATION-SELECTION-PATTERNS-001
name: Tablas · Composición, paginación y acciones sobre selección
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-25
base_contract: specs/components/table.contract.v1.0.0.md
applies_to: [TABLE-001, TABLE-CELL-001, PAGINATION-001, PAGINATION-ITEM-001, FLOATING-ACTIONS-001, CHECKBOX-001, DOT-001, BUTTON-001, ICON-BUTTON-001, APP-SHELL-001, SECTION-HEADER-001, TABS-001, CHIP-001]
related_components: [TABLE-001, TABLE-CELL-001, PAGINATION-001, PAGINATION-ITEM-001, FLOATING-ACTIONS-001, CHECKBOX-001, DOT-001, BUTTON-001, ICON-BUTTON-001, APP-SHELL-001, SECTION-HEADER-001, TABS-001, CHIP-001]
pattern_ids: [TABLE-COMPARISON-001, TABLE-APP-SHELL-001, TABLE-ROW-ACTIONS-001, TABLE-BULK-SELECTION-001, TABLE-SELECTION-SCOPE-001, TABLE-PAGINATION-001, TABLE-RESULTS-001]
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/tables-contextual-usage.approval.2026-11-25.json
supersedes_scope: Añade patrones del PDF aprobado; no crea componentes, tokens, variantes, API o Slots
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Tablas, paginación y selección · Patrones

Uso contextual del PDF de 29 páginas aprobado con «Bien hazlo MD». Consumir completas las guías de [Table](../components/table.contextual-usage.amendment.v1.0.0.md), [Table Cell/Capture](../components/table-cell.contextual-usage.amendment.v1.0.0.md), [Pagination](../components/pagination.contextual-usage.amendment.v1.0.0.md), [Pagination item](../components/pagination-item.contextual-usage.amendment.v1.0.0.md) y [Floating Actions](../components/floating-actions.contextual-usage.amendment.v1.0.0.md). Los patrones no amplían la API de sus átomos.

## Guía semántica normativa

### TABLE-COMPARISON-001 · Decidir por la tarea

Comparar registros del mismo tipo exige entidad/ID y esquema común de columnas, unidades y formato. Para un objeto, usar detalle/formulario; para narrativas variables, evaluar otra composición. Cero es dato real y Sin dato es ausencia. La tabla no es grid de edición: Capture representa captura sin implementar input, búsqueda o validación. Respetar 40 px e hijos oficiales; no forzar densidad con overrides internos.

Tabs abre secciones hermanas; Chips agrega/quita criterios de la vista actual. Emitidos/Recibidos pueden compartir tabla si tienen identidad y alcance de panel propios. Páginas son lotes de una consulta, no secciones ni pasos. No sustituir esas tres intenciones por controles con silueta parecida. Leer también los [patrones Tabs/Chips](tabs.local-navigation.amendment.v1.0.0.md).

### TABLE-APP-SHELL-001 · Ubicación y contexto

Header/Sidebar mantienen navegación global; Section Header identifica el conjunto y Table vive en Body. En un listado convencional, Flex según contexto. Mantener título/criterios antes de tabla y Pagination debajo/fuera del viewport de filas. No duplicar empresa ni inventar bodyLayout table. El layout vigente mantiene Header con padding exterior 32, gap Header–Content 0 y Content con top 0/laterales e inferior 32, mediante sus roles propios. El contenido de producto usa Body por propiedad; no copiar esos tokens a internos oficiales.

Con dos listados independientes, identificar regiones, criterios, selecciones y paginadores por separado. La barra flotante siempre se centra en pantalla, no en el ancho disponible tras Sidebar. Su aparición no debe desplazar o sustituir la navegación global.

### TABLE-ROW-ACTIONS-001 · Un registro o una selección

Ver F-1041/Edit F-1041 opera sobre ese registro incluso con otras filas seleccionadas. El enlace del identificador abre destino real; no colorear texto como enlace ni convertir toda la fila en botón que compita con casillas/acciones. Acciones sticky usan Cell + Icon Button ghost/small, con ancho suficiente y nombre por objeto. El auxiliar histórico de Cell tiene cantidades de una a cuatro; no es regla global para todos los botones ni menú automático de DotsThree.

Una operación de Floating Actions recibe la colección seleccionada al activar. Si hay restricciones de elegibilidad, informar cuál se aplica; no ejecutar sobre una parte oculta con otro total visible. Evitar duplicados, conservar IDs durante proceso y confirmar resultado antes de modificar datos o conteos. Confirmación, exportación, persistencia y recuperación son responsabilidades del anfitrión.

### TABLE-BULK-SELECTION-001 · Umbral, posición y foco

Cada Checkbox identifica un registro y el anfitrión mantiene IDs únicos. La cabecera actúa sobre su alcance declarado de página; calcula ninguna/algunas/todas y Mixed, sin sumar la cabecera al contador. Selected de Cell y casilla se coordinan, sin inferir el valor de una por el color de la otra.

| Seleccionados reales | Comportamiento de este patrón |
|---|---|
| 0 | No mostrar Floating Actions. |
| 1 | No mostrar la barra; conservar acciones de fila disponibles. |
| 2 o más | Mostrar Floating Actions con total y acciones sobre esos IDs. |

Barra fija al viewport, centrada en pantalla completa y a 32 px del borde inferior de su superficie. Se conserva al expandir/contraer Sidebar y al desplazar. Reservar scroll para altura real + 32 + espacio de lectura; 160 px es ejemplo de barra de 96 y lectura de 32. No situar dentro de recortes/ancestros que alteren fixed; el componente no incorpora anclaje.

Aparece sin robar foco a la segunda casilla. No es modal ni atrapa teclado. Puede existir acceso explícito Ir a acciones. En este patrón la X adopta el nombre Limpiar selección: borra IDs, oculta barra y restaura foco a control estable de tabla. La aprobación adopta la propuesta de cierre del PDF; no cambia otros usos. Pasar 2→1 conserva foco en la casilla usada; un control que desaparece necesita destino válido de foco.

### TABLE-SELECTION-SCOPE-001 · Página e histórico

Seleccionar abre dos comandos fijos del componente oficial. Solo esta página incluye sus registros seleccionables; Todo incluye el histórico activo según filtros/configuración, también sus otras páginas. Presentar cantidad y contexto de cada alcance antes de activar. Los números del menú no se suman ni equivalen a seleccionados actuales. El anfitrión aplica callback, colección y conteo; no deducir permiso o carga remota de la apariencia.

El fixture aprobado usa 12 registros locales, seis por página, conserva IDs al paginar dentro del mismo histórico y reemplaza la selección por los seis actuales al elegir Solo esta página. Es una política explícita de la muestra, no persistencia automática del componente. Si otro producto conserva, combina o limpia selección, comunicar la política y garantizar que no amplíe silenciosamente el alcance del comando. La cabecera de página puede incluir/excluir sus visibles sin alterar IDs de otras páginas cuando la política conserva selección.

Cambiar empresa/histórico/filtros requiere invalidar o recalcular explícitamente la selección y sus cantidades; no trasladar una selección a otra empresa ni mantener total y colección divergentes. Aun fuera de pantalla, la acción de Todo conserva el universo anunciado. Si el anfitrión no puede resolverlo, no ofrecerlo como disponible. Una opción disabled sigue visible y no se activa.

Flechas/Inicio/Fin recorren habilitadas, Enter/Espacio aplica; Escape cierra menú y devuelve foco al disparador sin limpiar selección. Clic fuera/pérdida de foco cierra sin aplicar. General actions conserva su Slot abierto. El menú de alcance no es Dropdown de formulario ni menú genérico de acciones; no reconstruirlo mediante selectAll de compatibilidad.

### TABLE-PAGINATION-001 · Consulta coherente

Default lleva contador de registros a la derecha de todos los controles, usando rangePosition right explícito, también en Table.pagination. Compact conserva ambos lados. No afirmar que cambió el valor implícito left del código o las cuatro combinaciones técnicas Figma. Default ofrece números y rows opcional; Compact anterior/siguiente y posición. Pages es Slot abierto según contrato, no todos los números de un histórico extenso.

Sincronizar total, tamaño, página, filas, rango y selección. No presentar filas viejas con rango nuevo sin explicar espera. Al filtrar resolver página fuera de rango; volver a la primera es propuesta base. Guardar filtros/orden al volver del detalle cuando corresponda; no prometer memoria remota. Eliminar último registro ajusta consulta tras éxito confirmado. Cero y una página conservan resumen cuando hay total válido; desconocido no equivale a cero. Tab/Shift+Tab y Enter/Espacio, no flechas de Tabs.

### TABLE-RESULTS-001 · Espera, vacío y fallo

Comunicar estado del conjunto desde el anfitrión sin inventar loading/error/empty de Table Cell ni filas ficticias. Conservar cabecera cuando facilite entender el resultado. Todavía no hay comprobantes orienta a crear; Sin coincidencias orienta a revisar filtros; un fallo ofrece Reintentar conservando contexto útil. No afirmar cero durante carga ni éxito al terminar una animación. Si se retienen datos previos durante actualización, identificarlos como tales.

## Registro previo, consumo y aceptación

Antes de implementar: entidad/IDs, columnas/hijos/unidades, contexto global y panel, filtros/orden, acciones de fila vs lote, umbral 2+, centro/32 px y reserva, alcance/persistencia, conteo actual y por comando, elegibilidad, página/rango, vacíos/carga/error y foco/cierre. Resolver exports o instancias oficiales después de decidir intención. No crear otra familia Table, Form, Content Switcher o Floating Actions local por conveniencia.

Resolver cualquier familia de applies_to debe recuperar este patrón y sus fuentes pertinentes. El handoff conserva reglas completas aplicables, datos/API con procedencia y límites. La aprobación del MD no prueba ejecución nueva en Figma, backend, importación remota ni accesibilidad global; las verificaciones se registran con su artefacto exacto.
