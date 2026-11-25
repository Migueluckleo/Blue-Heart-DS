---
contract_schema: sdd-project/0.2
contract_id: FLOATING-ACTIONS-001-SELECTION-SCOPE
name: Floating Actions · Alcance de selección
type: amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
applies_to: [FLOATING-ACTIONS-001]
amends: FLOATING-ACTIONS-001
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["122:6", "759:29", "758:29"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/floating-actions.selection-scope.v1.0.0.json
source_data_digest_sha256: 495e4bac71f9e28436b0b4803061b341f015dd3eaf63d99453f7f3ea2bf23de0
data_refs: [specs/data/floating-actions.selection-scope.v1.0.0.json, specs/tokens/floating-actions.selection-scope.v1.0.0.json]
dependencies: [FLOATING-ACTIONS-001, DOT-001, BUTTON-001, ICON-BUTTON-001]
---

# Floating Actions · Alcance de selección

La barra presenta la cantidad ya seleccionada y el botón **Seleccionar**, que abre dos acciones. La [referencia de Anticipa](https://www.figma.com/design/9joCtnaaFn4M9SUabOjdBz/Anticipa-%7C-Blue-heart?node-id=324-37409) muestra un conteo y el contexto de cada una.

| Opción | API web | Alcance |
| --- | --- | --- |
| Seleccionar solo esta página | `page` | Registros seleccionables de la página activa. |
| Seleccionar todo | `all` | Todos los registros seleccionables del histórico activo según los filtros y la configuración del módulo, incluidas sus demás páginas. |

El anfitrión aporta ambos conteos, el contexto, la disponibilidad y el callback. Aplica el cambio y actualiza el conteo visible. Los valores 50 y 2,600 son ejemplos de dos alcances distintos. La lectura del contexto no implica una relación aritmética entre ellos. La barra no carga registros ni persiste la configuración del módulo. Una opción deshabilitada permanece visible y web evita activarla.

## Anatomía y propiedades

La composición oficial [Floating Actions](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=122-6) reutiliza Dot, Button/text large, CaretDown de Phosphor e Icon Button Ghost para cerrar la barra. **Alcance de selección** expone `Menu=Closed/Open`. El menú es de 300 px, aparece arriba del disparador en Figma y usa dos instancias de Selection menu item. Cada fila expone Acción, Conteo y Contexto, con estados Default, Hover, Focus y Disabled. Las reacciones nativas enlazan la apertura y el cierre. El estado Focus de Figma especifica el anillo de teclado.

La propiedad Figma histórica `Show select all` controla la visibilidad del selector. El texto histórico `Select all` se conserva como dato de compatibilidad. El texto visible del disparador es Seleccionar. **General actions** conserva su Slot nativo e independiente. Los dos alcances son comandos fijos y el menú no requiere un Slot adicional.

## Web y tokens

`selection` recibe `page`, `all` y `onSelect`. Cada opción acepta `countLabel`, `context` y `disabled`. Si se omite `selection`, se conserva el uso anterior de `selectAll`. En web el menú se coloca arriba cuando hay espacio y se ajusta al viewport para que se pueda usar desde una tabla con overflow. Flechas, Inicio y Fin mueven el foco. Enter o Espacio activan. Escape cierra y devuelve el foco al disparador. La pérdida de foco o un clic fuera cierran el menú sin aplicar un alcance.

Los [tokens internos](../tokens/floating-actions.selection-scope.v1.0.0.json) consumen semantic y primitives. El [mapa canónico](../data/floating-actions.selection-scope.v1.0.0.json) registra el ancho, los insets, la separación, las capas y los textos de referencia. El [contrato de Dot](dot.count-multi.amendment.v1.0.0.md) fija el padding para conteos de dos o más dígitos.
