---
contract_schema: sdd-project/0.2
contract_id: TAB-001
amendment_id: TAB-CONTEXTUAL-USAGE-001
name: Tab · Etiqueta, icono, conteo y estados
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-24
base_contract: specs/components/tab.contract.v1.0.0.md
applies_to: [TAB-001]
dependencies: [DOT-001]
related_components: [TABS-001, CHIP-001]
pattern_ids: [TABS-LOCAL-SECTIONS-001, TABS-CHIPS-DISAMBIGUATION-001]
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/tabs-contextual-usage.approval.2026-11-24.json
supersedes_scope: Amplía uso contextual y Description; conserva anatomía fija, 24 variantes, datos, tokens y API
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Tab · Guía contextual

Adopta el PDF de 22 páginas aprobado. Complementa [TAB-001](tab.contract.v1.0.0.md) y se consume con la [guía de Tabs](tabs.contextual-usage.amendment.v1.0.0.md) y sus [patrones](../patterns/tabs.local-navigation.amendment.v1.0.0.md). Tab identifica una sección; el conjunto Tabs coordina selección, teclado y paneles. No usar una Tab aislada como acción, filtro o respuesta de formulario.

## Guía semántica normativa

### Anatomía y contenido

**TAB-LABEL-01.** Label visible, estable y no vacío, preferentemente sustantivo o nombre de la sección: Datos generales, Movimientos, Documentos. Mantén vocabulario paralelo; evita Otros o Más sin contenido distinguible. La fuente recomienda 1–2 palabras, no un límite de caracteres. No conviertas Label en Guardar/Consultar ni cambies la frase por selected.

**TAB-ICON-01.** Solo icono izquierdo opcional para ayudar a reconocer la sección. Es Phosphor Light de 20 px, decorativo y no reemplaza Label ni crea otra acción. Si no aporta información, ocúltalo. ImageSquare es placeholder, no significado de producto. No hay icono derecho, X/Remove, caret de menú ni acción interna; no copiar la anatomía de Chip. Orden fijo: icono → Label → Dot opcional.

**TAB-COUNT-01.** `Show badge` en Figma corresponde a Dot count/medium, no al componente Badge. Complementa Label con una cantidad y alcance definidos por el anfitrión: Documentos, 12 archivos vinculados. No calcula, filtra, valida ni acredita resultado confirmado por sí solo. No mezclar alcance total y filtrado sin explicarlo.

**TAB-COUNT-02.** Mantén `"0"` si es el dato real; puede abrir un estado vacío habilitado. Desconocido no equivale a cero: omite el conteo y explica la espera en el panel cuando proceda. En web `badgeCount?: string`: undefined o cadena vacía lo oculta; `"0"` se muestra. `99+` es formato del anfitrión, sin límite ni algoritmo automático. No hay cantidad máxima delegada ni estado error en el número.

**TAB-COUNT-ACCESS-01.** Dot es `aria-hidden`. El anfitrión proporciona `accessibleLabel` en TabsItem, conservando el Label visible e incorporando número y significado, por ejemplo «Documentos, 12 archivos vinculados». `badgeCount` por sí solo no anuncia esa cantidad ni actualizaciones live. Una Tab sin conteo conserva su etiqueta como nombre; no la ocultes a lectores.

### Presentaciones y estados

**TAB-VARIANTS-01.** Tres tipos × selected false/true × default/hover/focus/disabled = 24 variantes. No crear variantes por Label, Count, glyph o visibilidad. No hay eje size, pressed, loading, error, success, checked o cierre. Underline/Pill/Segmented conservan la misma función y no son large/medium/small. Métricas, matriz, contraste y recomendaciones de selección se gobiernan por la guía de Tabs y los datos delegados.

**TAB-FOCUS-01.** Focus visible localiza teclado y es independiente de selected; hover no enfoca ni activa. El navegador aplica `:focus-visible`: distingue foco DOM de anillo y no fuerces llegada con Tab por cada clic. Conserva trazo 2 px, offset 4 exterior y halo adaptable sin recorte. En el conjunto actual las flechas exploran; Enter/Espacio abre el panel.

**TAB-DISABLED-01.** Disabled conserva el valor selected y bloquea activación. El anfitrión decide si otro panel debe seleccionarse; no hay reselección automática. No deshabilitar solo por conteo cero ni reemplazar errores de consulta con disabled. Empty, loading, error y reintento pertenecen al panel.

### Propiedades y composición

| Dimensión | Figma y web actuales |
|---|---|
| Identidad visual | Type underline/pill/segmented; selected=false; state=default. Default web underline. |
| Contenido | Label=Tab en muestra; Label obligatorio en web. No usar el placeholder como nombre de producto. |
| Icono | Show icon=false e Icon swap; en Tab web pasar `icon` activa `showIcon` por defecto, salvo flag explícito. Sin icono custom, showIcon=false. TabsItem expone `icon`, sin showIcon. |
| Conteo | Show badge=false en muestra; Dot con Count. En web presencia de `badgeCount` no vacío. |
| Coordinación | `Tab` expone selected, disabled, ref y atributos/eventos HTML compatibles; no coordina otros Tab ni paneles. Usa `Tabs` para el patrón completo. |

P-SLOTS NOT_APPLICABLE: anatomía fija con texto, dos opcionales y swap acotado. No hay children arbitrarios. Los tokens internos siguen siendo de Tab/Dot; no aplicarles Body ni colores privados para imitar Chips.

## Description exacta

Texto para futura sincronización autorizada, sin afirmar cambios Figma ejecutados.

TAB-001 · Uso contextual v1.0.0. Nombra una sección vinculada a su panel dentro de Tabs. Conserva Label visible y estable, icono izquierdo Light opcional y Dot count solo si aporta cantidad con significado accesible. No uses Tab como filtro ni copies icono derecho/X de Chip. Tres tipos y 24 variantes; Focus de teclado es independiente de selected. Disabled no cambia de panel automáticamente. El anfitrión controla selección y conteo.

## Aceptación y procedencia

Resolver TAB-001 recupera guía y patrones de navegación. Verificar Label/icono/conteo, cero/desconocido, nombre accesible, ausencia de size/icono derecho/Remove y diferencia Focus/selected. La documentación preserva el API existente; no afirma que corrija inputs inconsistentes ni implementa persistencia o responsive. Procedencia contextual EXPLICIT en aprobación; propiedades y datos en contrato/JSON; comportamiento web OBSERVED en `tab.tsx`/`tabs.tsx` y pruebas locales del PDF.
