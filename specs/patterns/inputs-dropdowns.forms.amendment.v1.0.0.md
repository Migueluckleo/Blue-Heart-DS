---
contract_schema: sdd-project/0.2
contract_id: INPUT-001
amendment_id: INPUT-DROPDOWN-FORM-PATTERNS-001
name: Inputs y Dropdowns · Patrones de captura y selección
type: component-amendment
version: 1.0.0
status: APPROVED
last_updated: 2026-11-19
base_contract: specs/components/input.contract.v1.0.0.md
applies_to: [INPUT-001, DROPDOWN-MENU-001, DROPDOWN-ITEM-001]
pattern_ids: [FORM-CAPTURE-SELECT-001, DEPENDENT-FIELDS-001, FILTER-CAPTURE-SELECT-001, FIELD-VALIDATION-001]
related_components: [INPUT-001, DROPDOWN-MENU-001, DROPDOWN-ITEM-001, SEARCH-001, BUTTON-001]
slot_applicability: NOT_APPLICABLE
approval_ref: sources/inventories/inputs-dropdowns-contextual-usage.approval.2026-11-19.json
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Inputs y Dropdowns · Patrones de captura y selección

Composiciones de producto aprobadas en el PDF contextual. No son altas de familias atómicas ni nuevas variantes. Se asocian explícitamente a las tres familias para que sus consultas y traspasos incluyan las reglas completas. [Input](../components/input.contextual-usage.amendment.v1.0.1.md), [Dropdown menu](../components/dropdown-menu.contextual-usage.amendment.v1.0.1.md) y [Dropdown item](../components/dropdown-item.contextual-usage.amendment.v1.0.1.md) gobiernan sus partes.

## Guía semántica normativa

### Reglas comunes

La intención determina el control: Input escribe un dato de una línea; Dropdown elige un valor definido; Search localiza o filtra. Una selección no guarda automáticamente todo el formulario. Mantén nombre del dato, ayuda necesaria, escala coherente y contexto de la elección. Los defaults técnicos no deciden obligatoriedad ni prioridad de negocio.

El foco de edición de Input y del buscador puede recibirse con teclado o clic dentro. Hover no da foco. No extrapoles la regla de Focus de Button a campos editables. En Dropdown, candidata, foco DOM y selección confirmada son conceptos distintos; mover flechas o escribir una consulta no elige un valor.

### FORM-CAPTURE-SELECT-001 · Captura y selección en formulario

**Intención:** combinar datos libres con valores de catálogo. **Cuándo usar:** formulario con Referencia y Moneda, por ejemplo. **Alternativas:** Text Area para varias líneas; controles visibles para comparar alternativas; selección múltiple solo con cobertura específica.

**FORM-CAPTURE-SELECT-01.** Usa Input para Referencia y Dropdown para Moneda. Label conserva el dato esperado y la ayuda explica formato o dependencia. Medium es punto de partida contextual de escritorio normal; aplica Small o Large por densidad y comodidad sin cambiar defaults del componente ni jerarquía por tamaño.

**Haz:** decidir explícitamente si la selección aplica de inmediato o se guarda con el formulario; conservar captura útil ante fallo. **Evita:** caret sin lista real, placeholder como única etiqueta o acciones de navegación dentro de opciones del dato. El anfitrión aporta validación, confirmación y persistencia; los componentes aportan captura, representación y elección.

### DEPENDENT-FIELDS-001 · Empresa → cuenta

**Intención:** limitar un catálogo según un dato anterior. **Cuándo usar:** cuentas válidas de una empresa u otra dependencia real. **Alternativa:** catálogo independiente cuando el dato anterior no cambia las opciones.

**DEPENDENT-FIELDS-01.** Antes de seleccionar empresa, explica por qué Cuenta no está disponible. Después presenta o carga sus cuentas válidas. La carga pertenece al flujo; no existe variante loading de DropdownField.

**DEPENDENT-FIELDS-02.** Si cambia la empresa, comprueba si la cuenta confirmada sigue siendo válida. No conserves una selección incompatible ni elijas silenciosamente el primer resultado. El anfitrión define qué datos siguen siendo útiles y comunica el cambio.

**Haz:** “Selecciona primero una empresa” cerca del campo no disponible y IDs estables para opciones. **Evita:** mensajes dentro del catálogo como opciones ficticias, valor identificado solo por posición o un Disabled sin explicación. La dependencia es regla del producto; el componente no determina la validez de empresas o cuentas.

### FILTER-CAPTURE-SELECT-001 · Filtro con alcance visible

**Intención:** localizar o reducir resultados mediante texto o selección. **Cuándo usar:** filtros de una vista con un conjunto identificable. **Alternativa:** captura de un dato de negocio cuando el valor se guardará como parte del formulario.

**FILTER-CAPTURE-SELECT-01.** Explica qué resultados cambia la elección y si aplica al momento o requiere Aplicar. Esa decisión corresponde a la pantalla. La consulta del buscador del Dropdown solo reduce opciones del catálogo; no equivale al filtro global de resultados ni confirma un valor.

**Haz:** conservar selección hasta confirmar y distinguir Sin resultados de ausencia de opciones habilitadas. **Evita:** cambiar selected por hover o por escribir la consulta. Al filtrar, mantener grupos con coincidencias y retirar separadores huérfanos. Las opciones Disabled que coincidan pueden permanecer visibles sin ser elegibles.

### FIELD-VALIDATION-001 · Capturar, validar y corregir

**Intención:** ayudar a corregir sin perder contexto. **Cuándo usar:** dato con formato o restricción real. **Alternativa:** read-only para un dato de consulta que deba leerse/copiarse y no editarse.

**FIELD-VALIDATION-01.** Mientras se escribe, evita Error por cada carácter incompleto. Evalúa al terminar la captura o intentar continuar según el flujo. Conserva lo escrito y da una solución concreta, vinculada al campo. Revalida cuando resulte útil; Success requiere comprobación concluida y no garantiza una consecuencia que no se verificó.

**FIELD-VALIDATION-02.** Foco y error pueden coexistir mientras se corrige. Disabled expresa un impedimento y necesita motivo; read-only conserva consulta/copia. No escondas la explicación en un tooltip que requiera enfocar un control deshabilitado.

**Haz:** “Incluye el dominio. Ejemplo: ana@empresa.mx.” **Evita:** “Valor inválido”, color como única señal o borrar el error por recibir foco. Un correo con formato correcto no asegura existencia ni entrega. Validación remota, carga y errores de obtención se resuelven con cobertura del flujo; no agregan props o estados inexistentes.

### Registro de composición para consumo

Por grupo registra ID de patrón, intención, familias realmente usadas, dato/alcance, tamaño, etiqueta, ejemplo y ayuda, obligatoriedad, valor y catálogo, accesorios, estados, selección/candidata, validación, disponibilidad, foco y recuperación. Registra qué depende de la pantalla y qué proporciona el componente oficial. Los Slots y tokens internos conservan el contrato de su propietario; el patrón no crea nuevos Slots ni un componente Modal, autocomplete, multiselect o selector de negocio.
