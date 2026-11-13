# Layouts de Chat en Playground

Verificación del 13 de noviembre de 2026 en [Playground de AI Blueheart DS](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=203-93). Las seis composiciones usan frames de 1440 × 1024 px. Cada frame reúne instancias locales de Header, Sidebar izquierdo colapsado, Section Header con logo de Beni, Chat y Chat Sidebar. La descripción bajo el logo permanece visible. Breadcrumb, Metadata y acciones de Section Header están ocultos en la muestra.

| Frame | Chat | Rail | Panel derecho |
| --- | --- | --- | --- |
| [Chat initial](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=283-9471) | Standby · 1272 × 717 · Fill × Fill | Sin selección | Ausente |
| [Chat selected](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=283-9809) | Standby · 961 × 717 · Fixed × Fill | Chats | Chats |
| [Conversación abierta](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=290-11665) | Started · 961 × 717 · Fixed × Fill | Chats | Chats |
| [Indicadores selected](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=283-10148) | Standby · 961 × 717 · Fixed × Fill | Indicadores | Indicadores |
| [Papeles de trabajo selected](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=290-10546) | Standby · 961 × 717 · Fixed × Fill | Papeles de trabajo | Papeles de trabajo |
| [Vinculaciones selected](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=290-11110) | Standby · 961 × 717 · Fixed × Fill | Vinculaciones | Vinculaciones |

## Geometría y comportamiento observados

- El Rail mide 79 × 749 px y se coloca en posición absoluta, a partir de `x=1361, y=275` dentro del frame. Cada panel abierto mide 264 × 748 px y empieza en `x=1097, y=276`, justo al borde derecho de Chat. El Slot `Content` conserva Fill horizontal y mide 232 px.
- En Chat initial, la caja de Chat termina en `x=1408` y se superpone 47 px con la caja del Rail. El contenido centrado queda libre en la captura a 1440 px. Las cinco muestras con panel abierto fijan Chat en 961 px y colocan panel y Rail en posición absoluta. Esta evidencia cubre la composición de escritorio a 1440 px.
- En conversación abierta, el Slot `Messages` usa Fill a 897 px y contiene un `User message` seguido de un `Conversation Response`.
- Los seis frames ilustran estados separados. Las reacciones observadas cambian estados internos de los componentes, como hover. La lectura de destinos de prototipo no encontró transiciones entre estos seis frames.
- En 3315 nodos no se encontraron variables externas ni estilos externos. Las 33 claves de componentes remotos corresponden a Phosphor. En las instancias principales de Chat, Section Header y Chat Sidebar, los bindings sobrescritos que se encontraron usan la colección de componente.

Las fichas definen los maestros de [App Shell](../../../specs/components/app-shell.contract.v1.0.0.md), [Section Header](../../../specs/components/section-header.contract.v1.0.0.md), [Chat](../../../specs/components/chat.contract.v1.0.0.md) y [Chat Sidebar](../../../specs/components/chat-sidebar.contract.v1.0.0.md). Las medidas de esta ficha son las de sus instancias en Playground. [Lectura estructurada](readback.json).
