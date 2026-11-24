---
contract_schema: sdd-project/0.2
contract_id: CHAT-SIDEBAR-001-RAIL-ITEM
name: Chat Sidebar · Navegación del Rail
type: amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
applies_to: [CHAT-SIDEBAR-001]
amends: CHAT-SIDEBAR-001
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["258:3326"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/chat-sidebar.rail-content.v1.0.0.json
source_data_digest_sha256: 81937696ccf2ef94aa674cb6e69e7860827aa34cbf1c273d05cebdad83296176
data_refs: [specs/data/chat-sidebar.rail-content.v1.0.0.json]
dependencies: [CHAT-SIDEBAR-001, CHAT-RAIL-ITEM-001]
---

# Chat Sidebar · Navegación del Rail

Las cinco variantes Rail consumen cuatro instancias de [Chat Rail Item](chat-rail-item.contract.v1.0.0.md) en orden Chats, Indicadores, Papeles de trabajo y Vinculaciones. `View=none` mantiene los cuatro sin selección. En cada otra vista coincide un ítem Selected con la vista. La caja 48 y el intervalo 32 mantienen la distribución existente. Las acciones Buscar y Cerrar panel del Panel siguen consumiendo Icon Button Ghost small.

Cada ítem expone Show notification, apagado por defecto, y reutiliza Dot notification medium de 12×12. El host web puede pasar `railItems` con `showNotification` y `disabled` por vista en el Rail. Los callbacks de selección conservan las vistas existentes y el badge refleja novedades del anfitrión. En Figma se editan los ítems anidados desde sus propiedades. El Rail histórico tenía cuatro rellenos de selección literales #0F172A. Ahora se consumen mediante `chat-rail-item/color/bg/selected` → neutral-maximum → neutral/900, igual en los cuatro temas.

Esta enmienda sustituye los Icon Button Ghost large de la navegación, conserva los nueve maestros Panel/Rail y el indicador de plan. P-SLOTS REQUIRED para Content en Rail y Panel. Las cuatro vistas iniciales son la composición de referencia. QA debe distinguir el Rail migrado de los Icon Button válidos que aún existen en el Panel y sus contenidos.

## Altura definida por el anfitrión

Por aclaración explícita del usuario, las nueve variantes del set tienen `minHeight=null`: cinco Rail y cuatro Panel. Los 791 px son la altura de la muestra del maestro. Rail y Panel conservan sus anchos de referencia de 79 y 264 px y pueden ajustarse a un anfitrión más bajo. En web, el contenedor admite reducción de altura y Content conserva el scroll del Panel. Los espacios demasiado bajos para los cuatro ítems fijos y el indicador del plan requieren una decisión de desbordamiento del anfitrión.

## Slot Content compartido

El usuario convirtió el contenedor de navegación de los cinco Rail en un Slot nativo. Comparte la propiedad `Content#258:0` con los cuatro Panel. En Rail, Content es hijo directo del maestro, antes del plan compacto; en Panel vive dentro de Content region después de los atajos. La descripción en Figma es «Navegación en Rail y secciones en Panel. El plan compacto queda fuera del Slot.»

Rail Content es vertical, Fill/Fill, alineado arriba y centrado horizontalmente, con gap 32, padding 0 y sin clipping ni scroll propio. El Slot tiene un mínimo propio observado de 32 px; los nueve maestros Chat Sidebar carecen de mínimo. Las instancias de referencia tienen ancho 47 px para Content, con cuatro ítems de 48×48 centrados. Con stretchChildOnInsert, un ítem insertado se ajustó a 47×48. El plan conserva su propio espacio bajo Content. Si una lista personalizada excede el espacio, el anfitrión debe resolver el desbordamiento.

Los [datos delegados](../data/chat-sidebar.rail-content.v1.0.0.json) registran los nueve IDs, sus settings y la muestra. Min/max de hijos son null, allowPreferredValuesOnly=false, preferredValues=[] y displayEmptyByDefault=false. Se recomienda elegir instancias oficiales Chat Rail Item para la navegación. Los cuatro ítems son una muestra, no un límite. Se puede insertar, quitar, reordenar y reemplazar; el cambio entre vistas Rail conserva el contenido personalizado y opciones de Dot. El anfitrión asigna significado a una lista vacía y controla qué vista figura seleccionada en ítems personalizados.

En React, `children` ocupa la región Content. Con `children` omitido se muestran las cuatro vistas de referencia con `railItems` por vista. Una colección personalizada sustituye esas vistas y el anfitrión controla sus ítems; `children={null}` deja la navegación vacía. El plan compacto se mantiene fuera de la región. El Panel conserva `children` para secciones.

El [QA de implementación](../../qa/implementations/chat-rail-item.v1.0.0.review.md) registra las operaciones de instancia y el caso de cambio de vista Rail. El comportamiento al alternar Mode entre Rail y Panel queda fuera de la prueba de preservación de overrides, ya que ambos modos esperan contenidos de distinto propósito.
