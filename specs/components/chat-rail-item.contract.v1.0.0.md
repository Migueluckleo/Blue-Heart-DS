---
contract_schema: sdd-project/0.2
contract_id: CHAT-RAIL-ITEM-001
name: Chat Rail Item
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Chat Rail Item
target_file_key: yZsIpXywybsPDytjolwcP4
figma_page_id: "662:18"
target_node_ids: ["662:19"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/tokens/chat-rail-item.v1.0.0.json
source_data_digest_sha256: bbedf30b2a5ffbe286bfb082437a50e8f99a309503a4d5c4f8b7283b05622c70
data_refs: [specs/tokens/chat-rail-item.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, DOT-001]
---

# Chat Rail Item · CHAT-RAIL-ITEM-001

Abre la vista de conversaciones o de un módulo dentro del panel lateral. El anfitrión elige la vista activa y decide cuándo mostrar novedades. El maestro vive en su propia página oficial. La decisión de separar este componente de Icon Button deriva de su función de navegación, estado activo persistente y aviso de novedades.

Fuente observada: [Chat Sidebar 258:3326](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=258-3326). Sus cuatro vistas seleccionadas tienen fondo literal #0F172A, icono blanco, caja 48×48 con radio 8 e icono 24×24. La apariencia seleccionada Default se conserva usando un alias existente al mismo color. Diseño explícito del usuario: navegación agnóstica a marca con aro de foco de marca, estados Default, Hover, Focus, Disabled y Selected, badge de novedades y tokens internos fuera de los selectores.

## Estados y anatomía

| Estado | Disponible | Seleccionado |
| --- | --- | --- |
| Default | Icono neutral máximo sobre la superficie del Rail | Fondo neutral máximo #0F172A e icono blanco |
| Hover | Fondo neutral sutil | Fondo neutral profundo e icono blanco |
| Focus | Apariencia Default con aro de foco de marca | Apariencia Selected con el mismo contorno separado |
| Disabled | Icono neutral medio | Superficie neutral tenue con icono neutral medio |

Figma ofrece ocho variantes con ejes State = Default, Hover, Focus, Disabled y Selected = false/true. Default / false es la base. El foco conserva la selección. El aro consume brand-strong, el mismo rol semántico de enfoque que Icon Button. La superficie y el icono permanecen neutrales. El contorno de 56×56 tiene radio 12 y trazo interior de 2 px, con 2 px libres entre el trazo y la caja de 48×48. Disabled conserva el estado activo si ya venía seleccionado y bloquea activación. El estado Focus en Figma es una variante de diseño. Hover puede cambiar de variante conservando Selected e icono. En web se usa :focus-visible sin exigir una prop de foco.

Icon es un INSTANCE_SWAP que reutiliza Phosphor en formato Outline, peso Light en las vistas actuales. El indicador reutiliza Dot local `type=notification, size=medium, color=default` (12×12), con inset 4 px superior/derecho. Show notification es booleana y su default es false. Puede coexistir con selección, foco o Disabled. Señala presencia de novedades mediante el color semántico de Dot, sin mostrar una cantidad. El anfitrión controla su valor y puede conservarlo aunque el usuario abra la vista. P-SLOTS NOT_APPLICABLE porque contiene un icono intercambiable y un Dot fijo opcional.

El nodo web usa un botón nativo dentro de la navegación del Rail para controlar un panel en la misma pantalla. Expone `aria-pressed` para la selección, `disabled` nativo, nombre de la vista y descripción accesible «Tiene novedades» cuando Dot está visible. Enter y Espacio conservan la activación nativa. Selección y novedades conservan sus colores aunque cambie el color del aro de foco.

## Tokens

Todos los roles propios se definen en el [JSON canónico](../tokens/chat-rail-item.v1.0.0.json), bajo `component/chat-rail-item/*`, con scopes vacíos y codeSyntax WEB. Cada rol apunta al mismo alias semántico en Contable, Administrativo, Servicios y Personas y a su primitiva a través de esa cadena. El Dot conserva sus tokens, incluido el color de notificación. El intervalo de foco se deriva de las dimensiones y del grosor documentados.

## Guía semántica normativa

Usa Chat Rail Item para abrir una vista en el panel lateral de conversación o de un módulo asociado. Mantén Selected en la vista abierta, independiente del foco de teclado. Activa Show notification si el anfitrión tiene novedades que el usuario puede consultar en esa vista. Identifica cada vista por su nombre accesible y conserva el icono Phosphor asociado.

| Haz | Evita |
| --- | --- |
| Usa Chat Rail Item para pasar de Chats a Indicadores. | Usa un Icon Button genérico para indicar qué vista del Rail sigue activa. |
| Usa Dot medium para indicar que hay una conversación con novedades. | Interpretar Dot como cantidad o borrarlo al seleccionar por una regla implícita. |
| Usa Icon Button Ghost en acciones del Panel, como Buscar o Cerrar. | Usa Chat Rail Item para una acción inmediata que carece de vista propia. |

## Description exacta

Chat Rail Item · CHAT-RAIL-ITEM-001. Abre una vista de conversación o un módulo en el panel lateral. Conserva Selected para la vista activa y usa Show notification para indicar novedades del anfitrión.

## Verificación

Leer 8 variantes, 2 ejes, Icon, Show notification y todos los bindings y modos. Revisar Default y Selected contra la geometría y el color fuente, mostrar el indicador y verificar Focus y Disabled. Confirmar integración en cinco Rail y sus consumidores, cuatro glyphs, un activo por vista y cero en none. Comprobar teclado, callback, selección, disabled y descripción de novedades en navegador. Ejecutar TOKEN-QA-01/02/03 y conservar la política Body.
