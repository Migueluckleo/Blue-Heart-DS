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
