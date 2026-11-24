# QA documental · Chat Rail Item

2026-11-24 · CONTRACT_REVIEW PASS y READY para Figma y web. La solicitud explícita delega la decisión de crear el componente y los cinco estados, permite una página propia y exige Dot de novedades, neutralidad de marca y scopes internos invisibles. Los ocho estados compuestos mantienen Selected junto con foco y disabled.

Se leyeron las cinco variantes Rail, 20 instancias, cuatro colores seleccionados #0F172A y el Dot anterior oculto. Se comprobó la equivalencia con neutral/900 y las cadenas semánticas para los 16 roles nuevos. La aclaración del usuario selecciona Dot notification medium 32:40 de 12×12 con sus tokens existentes. El contrato distingue IDs de los aliases canónicos de los IDs en destino y delimita el reemplazo al Rail, en Figma y web.

La aclaración de altura se aplica al maestro Chat Sidebar completo. La lectura de origen confirmó 791 px literales como mínimo en los cinco Rail y cuatro Panel. Se delega retirar el mínimo en las nueve variantes.

[Contrato](../../specs/components/chat-rail-item.contract.v1.0.0.md) · [Enmienda Chat Sidebar](../../specs/components/chat-sidebar.rail-item.amendment.v1.0.0.md) · [Roles](../../specs/tokens/chat-rail-item.v1.0.0.json) · [Lectura de origen](../../output/qa/chat-rail-item-2026-11-24/before.json).

El usuario pidió conservar el focus ring de marca. Solo el aro usa brand-strong, igual que Icon Button. Los demás roles del ítem permanecen neutrales y el aviso usa los tokens de Dot.

La edición posterior del usuario incorpora Content nativo en los cinco Rail con la misma key que Panel. P-SLOTS REQUIRED para Chat Sidebar, con cuatro controles de muestra y plan separado. Se revisó el dato delegado de Slots y sizing de los nueve maestros.
