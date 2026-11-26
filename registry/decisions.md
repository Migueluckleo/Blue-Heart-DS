---
publication_policy: AUTHORIZED_BLUE_HEART_DS_REPOSITORY
---

# Decisiones operativas de la base BlueHeart

## DEC-WEB-COMPONENTS-001

P07 mantiene React, TypeScript, Tailwind y Next.js con catálogo local, API, ejemplo y QA por familia.

## DEC-SLOTS-REVIEW-001

Aplicar P-SLOTS por familia con evidencia y QA según alcance.

## Base aislada

El workspace padre conserva la historia. Esta base empieza con cero contratos de diseño activos, familias, tokens, assets y bindings. Los protocolos gobiernan la operación. El catálogo y las dos skills usan el mismo corte local. El canal remoto está pendiente y la publicación sigue en HOLD.

## DEC-BLUEHEART-REPOSITORY-001 · 2026-11-12

El usuario designó explícitamente [Migueluckleo/Blue-Heart-DS](https://github.com/Migueluckleo/Blue-Heart-DS.git) como el repositorio de este proyecto BlueHeart y la referencia para configurar el origen de las Specs y del catálogo que consumirá la v1.0 de `contpaqi-po-prototypes` y `contpaqi-figma-screens`.

El 12 de noviembre de 2026 el usuario levantó `HOLD_LOCAL_ONLY` para este repositorio y autorizó subir el contenido del directorio `blueheart-rebuild` a su raíz. Esta decisión sustituye la pausa histórica para ese destino. El registro del repositorio en GitHub y la activación del canal remoto de consumo son operaciones distintas.

## DEC-BLUEHEART-VARIABLES-001

El 11 de noviembre de 2026 el usuario autorizó aplicar directamente la reorganización de primitivas y la reconstrucción de semánticas y variables de componente en el maestro. [Alcance delegado y datos](../specs/foundations/blueheart-variables.contract.v0.1.2.md). Las nueve paletas usan el número observado como nombre. Sombra, tipografía y medidas se clasifican por su evidencia fuente. QA visual del usuario queda disponible después del readback técnico. El alcance excluye cambios en la raíz, lienzo y publicación.

### Corrección de la estructura

La instrucción posterior sustituye la agrupación por colecciones del primer plan. El maestro debe tener exactamente tres colecciones locales. Los 19 grupos viven en `primitives`. Se autorizó reorientar aliases y retirar solo las colecciones adicionales creadas durante este trabajo después de verificar las dependencias.

### Nombres de talla en primitives / size

El usuario confirmó doce equivalencias trazables al alias semántico observado. 4→xs, 8→sm, 12→md, 16→lg, 20→xl, 24→2xl, 32→3xl, 40→4xl, 48→5xl, 56→6xl, 64→7xl y 88→8xl. Renombrar en sitio dentro de `size`. Conservar los otros trece nombres numéricos, `font-size`, valores, IDs, aliases y metadatos. Tailwind orienta la nomenclatura sin imponer medidas.

## DEC-PHOSPHOR-ICONS-001

El usuario seleccionó Phosphor Icons como fuente transversal el 11 de noviembre de 2026. [Regla y fuentes oficiales](../references/PHOSPHOR-ICONS.md).

## DEC-BUTTONS-LOADER-001

Reconstrucción y consumo web autorizados por el usuario para Buttons y Loader. El QA técnico habilita el trabajo delegado. En cada página de familia del maestro quedan los sets oficiales. El QA visual del usuario es posterior y la publicación remota sigue en HOLD.

## DEC-USAGE-ROOT-001

El usuario autorizó enriquecer las guías de Buttons y Loader y continuar por dependencias con todas las familias oficiales de la raíz. Las guías externas orientan el uso y los ejemplos. El contrato de BlueHeart conserva autoridad sobre estados, valores y comportamiento. En cada página oficial quedan los maestros y variantes propios. Publicación HOLD.

## DEC-SIDEBAR-SECONDARY-CONTROL-001 · 2026-11-11

El usuario cambió ambos controles de Sidebar en AI Blueheart DS a Icon Button/secondary y extendió explícitamente el cambio a React y al catálogo Next. La raíz fuente conserva Ghost. [Enmienda](../specs/components/sidebar.secondary-control.amendment.v1.0.1.md).

## DEC-LOGOS-FIGMA-SCOPE-001

2026-11-12 · Solicitud explícita del usuario. Los cinco sets de la [selección Logos de Librería v1.1.0](https://www.figma.com/design/9zs5RMR8LB5wHjW9Bd59BA/Libreria-v1.1.0?node-id=40-93) se consumen desde AI Blueheart DS en Figma. Conservan los parámetros fuente y el arte fijo con cero bindings a variables o tokens. Web y el prototipador PO quedan fuera del alcance de esta familia. [Contrato LOGOS-001](../specs/components/logos.contract.v1.0.0.md)

## DEC-CHARACTERS-IDENTITY-CHAIN-001

2026-11-12 · Decisión explícita del usuario para Characters en Rebuild. Se adoptan el arte y las animaciones de la selección 820:7 y una cadena dedicada primitives → semantic → component. Esta decisión reemplaza la ruta histórica directa solo para BENI y NAVI en este destino. El color de identidad conserva el mismo RGBA en los cuatro temas. [Enmienda](../specs/foundations/characters.identity-chain.amendment.v1.0.0.md)
## DEC-FIGMA-FAMILY-PAGE-ORDER-001

2026-11-12 · Decisión explícita del usuario. Al dar de alta un componente en AI Blueheart DS, deja las páginas oficiales de familias en orden alfabético de A a Z por su nombre canónico visible. Conserva en su posición las portadas y foundations. Mantén todas las familias en un bloque contiguo. Playground y su separador permanecen juntos después de la última familia. El orden se aplica al listado de páginas y preserva IDs, nombres, variantes y contenido. La notificación registra la regla para las altas futuras. [Construcción P04](../protocols/04-FIGMA-CONSTRUCTION.md#orden-de-las-páginas-al-dar-de-alta-un-componente) · [Control P06](../protocols/06-QA-AND-VALIDATION.md#orden-de-las-páginas-en-altas-de-componentes)

## Corrección de bindings de componente · 2026-11-12

La solicitud exige que las propiedades tokenizadas de los componentes consuman la colección component en Figma y web. Los aliases pasan por semantic hacia primitives. Se corrigen las versiones vigentes. [QA documental y delegación](../qa/contracts/component-token-layer.correction.review.md)

## DEC-CAUTION-001 · 2026-11-23

El usuario solicitó construir e implementar Caution en Figma desde primitivos hasta componentes, inicialmente Body, Linear Progress Bar y Badge. Conserva la decisión explícita anterior «para caution quitale el stroke». Ante el uso actual de orange por Servicios eligió «Crear caution-orange/100–900 y conservar Servicios (recomendado)». La [enmienda](../specs/foundations/caution.amendment.v1.0.0.md) registra la ampliación; no autoriza umbrales de negocio ni publicación o instalaciones.

## Body disabled y actualización de paquetes sin cambio de versión · 2026-11-23

EXPLICIT: el usuario pidió corregir las cinco descriptions Dropdown en Figma, actualizar paquetes Figma local/portable con todos los tokens, agregar disabled de Body con sus focus y hacer QA/documentación. Aclaración vigente: focus son scopes por propiedad, no estados de foco. En un mensaje posterior solicitó verificar JSON canónicos, enviar el corte a los dos chats de skills autocontenidas conservando versiones, verificar todos los grafos y hacer push GitHub cuando todo esté al día. DERIVED: disabled reutiliza neutral-soft (text/shape), neutral-subtle (bg) y neutral-muted (stroke), según usos existentes. Esta solicitud no exige instalar; se preparan y sincronizan los paquetes, preservando los cortes anteriores.

## Tabs · Uso contextual · 2026-11-24

DEC-TABS-CONTEXTUAL-USAGE-001 · El usuario aprueba la guía PDF y ordena integrarla al consumo autocontenido. Tabs abre secciones hermanas; Chips selecciona/filtra en la vista actual. Forma redondeada, tabla común o contador no deciden familia. Preparar paquetes verificables sin instalar ni publicar; conservar snapshots anteriores.

## Conversation Response · Documentar Preview modificado · 2026-11-24

DEC-CONVERSATION-PREVIEW-DOCUMENTATION-001 · EXPLICIT: «Modifiqué este componente, documenta el cambio», nodo 222:111. Autoriza inspección y documentación del ajuste del auxiliar privado, conservando familia y versión. OBSERVED: Preview details pasa de la referencia histórica vertical a una fila con Title Fill y Badge Hug. [Enmienda acotada](../specs/components/conversation-response.preview-layout.amendment.v1.0.0.md) y [QA documental](../qa/contracts/conversation-response.preview-layout.v1.0.0.review.md). La adopción documental sigue DEC-AI-TECHNICAL-CLOSURE-001, no una aprobación humana de artefactos posteriores. La web conserva su layout anterior y se registra STALE en ese alcance; esta solicitud no ejecuta código de aplicación, escrituras Figma, instalación o publicación.

## Chat History Item · Documentar indicador · 2026-11-24

DEC-CHAT-HISTORY-NOTIFICATION-DOCUMENTATION-001 · EXPLICIT: documentar las modificaciones de 257:498. OBSERVED: sexta booleana show notification apagada y cuatro Dot oficiales; se preservan versión, variantes, Title/Actions y consumidores. Delegación documental conforme DEC-AI-TECHNICAL-CLOSURE-001. No se implementa la prop web ausente ni se editan descriptions en Figma; ambas diferencias se registran, sin inventar criterios de notificación del producto. [Enmienda](../specs/components/chat-history-item.notification.amendment.v1.0.0.md).

## Header y App Shell · Sustituir Body en estructura propia · 2026-11-24

DEC-HEADER-APP-SHELL-OWN-SPACING-001 · EXPLICIT: documentar sus modificaciones y ajustar los paddings/gaps Body para consumir tokens propios. DERIVED y delegado con QA documental: crear header/spacing/container-padding=32 y app-shell/spacing/none=0 aliased a semantic existente; reutilizar app-shell/spacing/content=32. Conservar header/spacing/padding=24, app-shell/spacing/header-gap=8 y todos los datos previos. Corregir 62 campos, incluidos overrides Header de ocho variantes, sin alterar medidas o contenido. Los 44 bindings Body dentro de Slots de producto conservan su función; no se convierten muestras en componentes. Autoriza adaptación del espaciado web y QA local. [Enmienda](../specs/components/header-app-shell.spacing.amendment.v1.0.0.md). Sin publicación, reinstalación o cambio de versión.

## DEC-CHAT-RAIL-ITEM-001 · 2026-11-24

Crear un elemento de navegación separado de Icon Button por selección persistente, apertura de vistas y novedades, en una página propia. Decisiones explícitas posteriores: Dot medium, focus ring de marca, sin altura mínima en Rail y Panel, y documentar Slot Content nativo añadido por el usuario al Rail. El seleccionado mantiene exactamente #0F172A con neutral-maximum y el aro consume brand-strong. El Slot del Rail comparte key con Panel, con plan compacto separado. [Enmienda](../specs/components/chat-sidebar.rail-item.amendment.v1.0.0.md).

## DEC-CHAT-SIDEBAR-V1-V2-001 · 2026-11-24

La solicitud agrega las vistas colapsada y desplegada de Anticipa como V1. La versión oficial previa se conserva como V2 predeterminada en Figma y web. La composición reutiliza los átomos del DS y registra tokens propios internos para V1. [Enmienda](../specs/components/chat-sidebar.v1-rail-panel.amendment.v1.0.0.md).

## DEC-LOGOS-CORPORATE-SVG-001 · 2026-11-24

Agregar los tres SVG entregados a Logos. La incorporación conserva los maestros previos. Mi CONTPAQi usa light2 como composición clara alternativa. Mi Gestión y Portal Web usan light. El símbolo embebido de Portal Web conserva los píxeles PNG y el resto del logo conserva sus trazados. [Enmienda](../specs/components/logos.corporate-svg.amendment.v1.0.0.md).

## DEC-HEADER-LOGO-SIZING-001 · 2026-11-25

Logotipo y Altura son selecciones independientes en Header y App Shell. Se permite 40, 44 o 48 px de alto con 48 por defecto. El ancho deriva de la relación original. Los maestros oficiales conservan su tamaño y tienen bloqueo de proporción. [Enmienda](../specs/components/header.logo-sizing.amendment.v1.0.0.md).

## DEC-FLOATING-ACTIONS-SELECTION-SCOPE-001 · 2026-11-25

La página actual y el histórico activo son alcances distintos. El módulo aporta disponibilidad, conteo y contexto y aplica la selección. El DS aporta botón, menú y Dot proporcional al texto con 8 px a cada lado para dos o más cifras. [Enmienda](../specs/components/floating-actions.selection-scope.amendment.v1.0.0.md).

## Tablas, paginación y Floating Actions · Uso contextual · 2026-11-25

DEC-TABLES-CONTEXTUAL-USAGE-001 · Adopta el PDF vigente: comparación por ID, Default con contador a la derecha explícito, Floating Actions 2+/centro de pantalla/32 px, selector página-histórico y X como Limpiar selección. Conserva anatomía, API y tokens; no instala ni publica.
