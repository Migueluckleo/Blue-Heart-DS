# QA documental · Badges y Chips

Fecha: 2026-11-19. CONTRACT_REVIEW PASS para dos guías y cinco patrones aprobados en el PDF de 21 páginas. [Fuente y hashes](../../sources/inventories/badges-chips-contextual-usage.approval.2026-11-19.json).

Se contrastaron las reglas con el PDF, los contratos base, los JSON delegados y TypeScript/CSS existentes. Badge: seis tipos × tres tamaños = 18; default subtle/small, swaps independientes, iconos decorativos y ausencia de foco/selección/disabled/cierre. Chip: cuatro tamaños × dos valores × cinco estados = 40; cuatro sets, 16 combinaciones de opcionales, single/multiple/removable excluyentes en web, Counter cero visible y diferencias entre flags Figma y API. No se crean props, variantes, tokens o modos.

Las guías distinguen intención, alternativas, tamaño por contexto, glyph izquierdo/derecho frente a X, pressed frente a selected, Focus de teclado, valores iniciales, alcance/cálculo externo del Counter y foco tras quitar el último filtro. El anfitrión conserva aplicación, combinación de filtros, disponibilidad, persistencia y feedback. Los cinco patrones se asocian explícitamente a ambas familias sin crear ciclos de dependencias normativas; related_components expresa relaciones.

P-SLOTS NOT_APPLICABLE para ambos átomos y estas composiciones: anatomía fija con texto, booleanos y swaps acotados. No aparece Chip group público ni Slot arbitrario. Se conserva la excepción cromática de Badge warning sin extenderla a Chip ni afirmar WCAG global. Las Description están preparadas para sincronización futura autorizada y no acreditan escritura/readback nuevo Figma.

La verificación contra el corte productor completado detectó cambios de Chat Document Viewer desde el paquete anterior. El delta global de CSS solo afecta a ese visor/toolbar y a su Search anfitrión; no cambia Badge/Chip. El nuevo corte completo se incorpora a los consumidores, sin mezclar la aprobación de este PDF con la autoridad de esa enmienda ya delegada y su QA propio. Se preservan las guías anteriores, incluidas sus limitaciones.

Los comprobantes de catálogo/Graphify, compilación, paquetes, prueba semántica independiente e instalación se conservan por separado. Este PASS documental no certifica UI global, servicios, lector de pantalla o toque físico. El alcance es local y no incluye publicación remota.
