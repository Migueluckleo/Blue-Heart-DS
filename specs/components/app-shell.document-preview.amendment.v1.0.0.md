---
contract_schema: sdd-project/0.2
contract_id: APP-SHELL-DOCUMENT-PREVIEW-001
name: App Shell · Conversación con preview de documento
type: amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
base_contract: specs/components/app-shell.contract.v1.0.0.md
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
data_refs: [specs/tokens/chat-document-viewer.v1.0.0.json]
dependencies: [APP-SHELL-001, CHAT-001, CHAT-DOCUMENT-VIEWER-001, CHAT-SIDEBAR-001]
---

# App Shell · Conversación con preview de documento

Solicitud del 18 de noviembre de 2026 y [layout fuente 430:5222](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=430-5222). La muestra observada es una instancia de conversación con Chat Started y el visor insertados en Body. Se conserva como fuente editable y se añade el layout reutilizable al set oficial, sin sustituir las seis variantes anteriores.

## Layout y Slots

Añadir `body layout=conversation-preview` con `menu=collapsed/expanded`. Reutilizar Header, Sidebar, Section Header, Chat Started, Chat Document Viewer y Rail locales. El set pasa de seis a ocho variantes. Conservar las keys Body#105:0 y Right sidebar#299:7; añadir Document preview como Slot nativo compartido por las dos variantes nuevas, contenido reemplazable y sin límite de cantidad impuesto por la muestra.

La fila contiene Body, Document preview y Right sidebar, separados por el token App Shell de 32 px. Body conserva ancho de referencia 374 px, respaldado por el token `app-shell/size/conversation-chat` y su nueva medida semántica/primitiva, derivada del ancho observado. El visor toma Fill en ancho y altura y el Rail conserva 79 px. En la referencia 1440 × 1024, menú colapsado, Chat=374, preview=755 y Rail=79; con menú expandido el preview absorbe el ancho restante. Header/preview del visor ajustan ancho; el título puede aumentar su altura.

Body representa la conversación y Document preview el documento; el producto puede reemplazar cada región sin desanclar las otras. El ejemplo de documento no fija su tipo, cantidad de filas o formato. Conservar la composición de Chat y su borrador al cambiar la visibilidad del documento.

## Web y acciones

`AppShell bodyLayout="conversation-preview" documentPreview={...}` acepta Chat en children y Rail/Panel en rightSidebar. `documentExpanded` comunica la decisión controlada del anfitrión: el documento ocupa el espacio del Chat mientras éste conserva su estado montado; restaurar vuelve a las dos columnas. Al cerrar, el ejemplo vuelve a conversación y ofrece reabrir el documento. Este comportamiento es adaptación técnica DERIVED de las acciones visibles, no evidencia de transiciones preexistentes en Figma.

La muestra web usa callbacks locales para descargar/expandir/cerrar y conserva nombres, foco y borrador. No simula descarga ni generación remota. El visor se mantiene independiente del layout y admite otros contenidos mediante children.

## Aceptación

P-SLOTS REQUIRED: probar edición de Body y Document preview desde instancias, contenido menor/mayor/vacío, sustitución y orden, y preservación al alternar collapsed/expanded. Comparar el layout de referencia y el ancho disponible con menú expandido, verificar Fill del documento y todos los tokens heredados. Probar expandir/restaurar/cerrar/reabrir por teclado en web y foco devuelto al control de reapertura. Preservar las seis variantes anteriores, el layout fuente y la publicabilidad. TOKEN-QA-01/02/03 y cierre P08 obligatorio.

## Description complementaria

App Shell · APP-SHELL-001. Grid y Flex para contenido general; Conversation para Chat; Conversation preview para Chat junto al documento entregado. Edita Body, Document preview y Right sidebar. El documento absorbe el ancho restante y el anfitrión controla abrir, expandir y cerrar.
