---
contract_schema: sdd-project/0.2
contract_id: BADGE-001
amendment_id: BADGE-CHIP-STATUS-FILTER-PATTERNS-001
name: Badges y Chips · Patrones de estado y filtros
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/badge.contract.v1.0.0.md
applies_to: [BADGE-001, CHIP-001]
pattern_ids: [STATUS-ATTRIBUTE-001, VALUE-UNIT-001, CHIP-SINGLE-FILTER-001, CHIP-MULTIPLE-FILTER-001, APPLIED-FILTER-REMOVAL-001]
related_components: [BADGE-001, CHIP-001, INPUT-001, RADIO-001, CHECKBOX-001, DROPDOWN-MENU-001, BUTTON-001]
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/badges-chips-contextual-usage.approval.2026-11-19.json
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Badges y Chips · Patrones de estado y filtros

Composiciones del PDF de 21 páginas aprobado en este chat, no nuevas familias ni variantes. Ambas familias devuelven este documento para conservar reglas completas en consulta y traspaso. Guías propietarias: [Badge](../components/badge.contextual-usage.amendment.v1.0.1.md) y [Chip](../components/chip.contextual-usage.amendment.v1.0.1.md).

## Guía semántica normativa

### Reglas comunes

La intención determina el control. Badge comunica un estado/atributo sin foco ni interacción; Chip permite elegir o quitar filtros; una acción de negocio o destino requiere Button/enlace. El anfitrión define datos, alcance, agrupación, aplicación, disponibilidad, persistencia y feedback. Una etiqueta seleccionada o un contador no prueba filtrado o guardado concluidos.

Mantén texto breve y específico, tamaño coherente y contexto próximo. Los colores son invariantes en los cuatro temas y no cambian con la marca del producto. Glyphs acompañantes son decorativos; no conviertas un icono derecho en X, apertura de menú o acción no implementada. Badge warning conserva su excepción de contraste, sin extenderla a Chip ni atribuir AA global a las muestras.

Chip conserva un modo y tamaño por grupo. Single mantiene una alternativa activa y radios agrupados; multiple usa botones independientes con aria-pressed; removable solo quita desde X y no admite selected en el API. Los opcionales de Figma no demuestran que deba mezclarse selección y remoción. Focus de teclado usa :focus-visible y no equivale a selected; pressed es momentáneo. Badge no adquiere Focus por analogía.

### STATUS-ATTRIBUTE-001 · Estado junto al objeto

**Intención:** entender el estado o atributo vigente. **Cuándo usar:** Conciliado o En proceso junto a un comprobante. **Alternativa:** un control de selección/acción si la persona debe modificarlo, o explicación/notificación cuando el dato requiere más contexto.

**STATUS-ATTRIBUTE-01.** Usa Badge con vocabulario, tipo y tamaño consistentes entre objetos comparables. Subtle/neutral para metadatos, info para contexto/avance, success para resultado confirmado, warning para atención sin presentarla como fallo bloqueante y error para fallo. Success requiere comprobación real. Muestra el estado vigente, sin apilar estados incompatibles de un proceso.

**STATUS-ATTRIBUTE-02.** Mantén significado en el texto, como Requiere revisión, no un código Estado 2 dependiente del color. Icono izquierdo puede reforzar reconocimiento; derecho solo con pista secundaria clara, nunca cierre. El anfitrión comunica cambios relevantes y compone recuperación cuando hace falta; Label no tiene anuncio live automático.

**Haz:** colocarlo junto al objeto y conservar un tamaño por lista. **Evita:** Badge como botón/foco, X decorativa que aparenta quitar, estados afirmados antes de confirmación, montos/datos sensibles o sustituir una explicación imprescindible con una etiqueta breve.

### VALUE-UNIT-001 · Unidad junto al dato

**Intención:** reconocer la unidad de un valor. **Cuándo usar:** MXN junto a un importe, incluida la composición existente de Input. **Alternativa:** Dropdown u otro patrón de selección cuando se necesita cambiar la moneda.

**VALUE-UNIT-01.** Usa Badge subtle/small con moneda ISO pertinente y Label editable. No cambia unidad ni convierte el importe; formato, cálculo y obligatoriedad pertenecen al dato y al anfitrión. La unidad no es una elección confirmada por un clic sobre Badge.

**Haz:** proximidad clara entre importe y unidad. **Evita:** usar el Badge como selector o deducir del ejemplo reglas monetarias, permisos, conversiones o datos de producto.

### CHIP-SINGLE-FILTER-001 · Alternativa de una vista

**Intención:** una opción activa entre filtros o vistas excluyentes. **Cuándo usar:** Estado de comprobantes con Todos/Vigentes/Cancelados si esos valores existen. **Alternativas:** múltiples combinables con Chip multiple; Radio para decisión de formulario o Dropdown para catálogo cuando sean más claros.

**CHIP-SINGLE-FILTER-01.** Un nombre accesible de grupo, `name` común, valores únicos/estables y una selección controlada. Carga el dato vigente o default justificado. Todos puede representar ausencia de restricción solo como alternativa real, nunca como valor ficticio. La convención local no apaga la única opción al pulsarla ni admite varias activas.

**CHIP-SINGLE-FILTER-02.** Tab entra/sale; normalmente llega al seleccionado. Flechas cambian foco y selección entre habilitados; Espacio selecciona y disabled se omite. No extender a toolbar ni copiar la exploración de candidatos de Dropdown. Define aplicación inmediata o mediante Aplicar; elegir no envía/guarda todo el formulario ni debe causar navegación inesperada.

**Haz:** etiquetas comparables y escala uniforme. **Evita:** radios con nombres distintos en la misma decisión, defaults inferidos de orden o selected visual de Figma presentado como exclusividad automática.

### CHIP-MULTIPLE-FILTER-001 · Filtros combinables

**Intención:** combinar categorías independientes. **Cuándo usar:** Ingresos y Egresos. **Alternativa:** single cuando solo una sea válida.

**CHIP-MULTIPLE-FILTER-01.** Cada botón mantiene nombre estable y aria-pressed. Elegir una opción no borra las demás. Explica universo de resultados, combinación de filtros y qué significa cero seleccionados. El átomo no decide unión/intersección ni obligatoriedad. Tab recorre habilitados; Enter/Espacio alternan cada uno. Compón limpiar cuando el contexto lo requiera y conserva decisiones útiles ante error del flujo.

**CHIP-MULTIPLE-FILTER-02.** Counter necesita alcance: coincidencias, seleccionados u otro conjunto. El anfitrión calcula/actualiza y decide formato o abreviación como 99+. Conserva cero real; desconocido no equivale a cero ni deshabilita automáticamente. Se puede omitir Counter y componer espera externa. No cambia el nombre del botón y no anuncia actualizaciones live por sí solo.

**Haz:** mostrar aplicación/resultados/espera/fallo con feedback apropiado del flujo. **Evita:** nombre variable Quitar ingresos por selected, mezclar X/remoción en el mismo grupo, Counter inventado o variantes loading/error inexistentes de Chip. Estos botones toggle no son el componente visual Toggle.

### APPLIED-FILTER-REMOVAL-001 · Resumen de filtros aplicados

**Intención:** identificar y retirar restricciones vigentes. **Cuándo usar:** Periodo: este mes o Moneda: MXN ya aplicados. **Alternativa:** controles de selección para elegir valores aún no aplicados.

**APPLIED-FILTER-REMOVAL-01.** El Label nombra la restricción. Solo la X ejecuta Quitar filtro seguido del Label; Enter/Espacio la activan y disabled la impide. El cuerpo no es otra selección. Quitar actualiza colección y resultados sin borrar registros. El anfitrión decide feedback, persistencia y recuperación; no se atribuyen Undo o confirmación automáticos.

**APPLIED-FILTER-REMOVAL-02.** Si se quita el chip con foco, el anfitrión lo mueve al siguiente filtro disponible o al control de agregar/restaurar según el orden del flujo. Al retirar el último comunica ausencia de restricciones y mantiene acceso para agregar, sin chip ficticio seleccionado. removeRef facilita acceso al botón pero no implementa esa política. No pierdas foco en el documento.

**Haz:** nombres específicos, un modo/tamaño por agrupación y objetivo de X medido. **Evita:** confundir Right icon decorativo con Remove, mezclar selección/remoción o afirmar que la altura 48 del chip prueba el ancho activable de X.

### Layout, escala y registro de composición

Badge tiene 20/24/32 px (small/medium/large, default subtle/small). Chip tiene 48/40/32/24 px (large/medium/small/extra-small, default web medium). El tamaño acompaña densidad y proximidad; no expresa prioridad ni justifica ocultar texto. Conserva anatomía, tokens y glyphs oficiales. El anfitrión resuelve cobertura táctil para objetivos menores y evita solapamientos; las medidas no certifican accesibilidad global.

Texto de una línea y ancho HUG, sin truncamiento ni máximo inventado del API. Revisa redacción si no cabe, no comprimas tipografía ni recortes la parte distintiva. El anfitrión decide wrap/scroll del grupo con orden, descubrimiento y acceso por teclado; no hay responsive automático ni límite universal de cantidad derivado de la muestra. No recortes el halo de foco. La diferencia de ancho por borde según estado no se compensa alterando tokens.

Registra ID de patrón, intención, objeto/alcance, familias/exports reales, tipo/modo/tamaño, Label y dato de origen, selección/default justificado, iconos y opcionales, Counter y universo, aplicación, teclado/foco, disponibilidad, feedback y recuperación. No añade Slots arbitrarios ni un Chip group público; las anatomías individuales son fijas. Los datos, estilos y aliases continúan con su propietario.
