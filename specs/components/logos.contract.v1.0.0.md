---
contract_schema: sdd-project/0.2
contract_id: LOGOS-001
name: Logos
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Logos
figma_page_id: "170:2"
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["171:13", "171:1289", "171:1987", "171:2293", "171:2535"]
consumption_targets: [figma]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/logos.v1.0.0.json
source_data_digest_sha256: 17400028aeb2d6c205130121144bfb4199c0f911bbdc30bb4cc3eb1518335375
data_refs: [specs/data/logos.v1.0.0.json]
dependencies: []
---

# Logos · LOGOS-001

## Fuentes y alcance

La [selección de Librería v1.1.0](https://www.figma.com/design/9zs5RMR8LB5wHjW9Bd59BA/Libreria-v1.1.0?node-id=40-93) es de solo lectura. El alcance de consumo cubre los cinco sets nativos de `Content` (`2415:1934`) y sus 68 variantes. La [captura](../../sources/figma-snapshots/logos-2026-11-12/inventory.json) distingue los cinco maestros parametrizados de la documentación y de doce marcos sueltos sin API de componente. Los marcos se conservan como evidencia de la selección. El [JSON delegado](../data/logos.v1.0.0.json) fija identidades, parámetros, defaults, combinaciones reales y geometría por variante. La página de destino usa el nombre semántico Logos, tomado del nombre de la página fuente sin sus adornos.

El usuario autorizó consumo exclusivo desde AI Blueheart DS en Figma. Web y prototipador PO tienen alcance NOT_APPLICABLE para esta familia. Los logos de marca usan esta fuente específica. Las reglas de iconografía Phosphor siguen aplicando a iconos funcionales.

## Anatomía y propiedades

Conserva el arte fuente por instancia, su geometría, vectores, grupos, máscaras, colores sólidos, gradientes y fills de imagen originales. Los logos y sus partes llevan cero bindings a variables o tokens. La inspección fuente encontró cero bindings de arte, estilos vinculados e instancias anidadas. Los parámetros seleccionan el arte fijo. P-SLOTS NOT_APPLICABLE por composición fija de marca.

## Variantes y parámetros

| Set exacto | Grupo de producto | Variantes | Parámetros y default |
| --- | --- | --- | --- |
| `administrativos` | Administrativo | 24 | `product`, `type`. Default `comercial_premium` / `vertical`. |
| `contables` | Contable | 21 | `product`, `type`. Default `conecta_tu_banco` / `vertical`. |
| `personas` | Personas | 12 | `product`, `type`. Default `nominas` / `vertical`. |
| `servicios` | Servicios | 6 | `product`, `type`. Default `respaldos` / `vertical`. Conserva `VDI` en mayúsculas. |
| `CONTPAQi` | Marca corporativa | 5 | `product`, `Mode`. Default `Mi CONTPAQi` / `light`. `light2` existe para `CONTPAQi`. |

Los sets de producto ofrecen `type=vertical`, `horizontal` e `isotipo`. En el set corporativo selecciona únicamente las parejas `product` / `Mode` existentes en el JSON. `Mode` selecciona el arte corporativo y su contraste de fondo. El anfitrión controla el espacio y el nombre accesible si la marca funciona como enlace o acción.

## Guía semántica normativa

Usa la marca para identificar el producto o a CONTPAQi. Selecciona el set por grupo, el valor exacto de `product` y el formato disponible. Mantén proporciones, legibilidad y el arte completo.

| Situación | Haz | Evita |
| --- | --- | --- |
| Encabezado de Contabilidad | Selecciona `contables`, `product=contabilidad`, `type=horizontal`. | Recolorear otra marca con el tema Contable. |
| Identificación de Nóminas en espacio compacto | Usa `personas`, `product=nominas`, `type=isotipo` cuando el contexto ya identifique el producto. | Recortar una variante horizontal para extraer su símbolo. |
| Pantalla de acceso de VDI | Selecciona `servicios`, `product=VDI` y el formato que cabe sin deformación. | Cambiar la escritura del parámetro o sustituir su símbolo. |
| Área corporativa | Elige `CONTPAQi` o `Mi CONTPAQi` y el `Mode` observado que mantenga legibilidad sobre el fondo real. | Forzar `light2` en Mi CONTPAQi o vincular un modo de variables al logo. |

## Description exacta

| Propietario | Description |
| --- | --- |
| administrativos | LOGOS-001 · Identidad de productos administrativos. Elige product y type según el producto y el espacio. Conserva el arte y las proporciones de la variante. |
| contables | LOGOS-001 · Identidad de productos contables. Elige product y type según el producto y el espacio. Conserva el arte y las proporciones de la variante. |
| personas | LOGOS-001 · Identidad de productos de Personas. Elige product y type según el producto y el espacio. Conserva el arte y las proporciones de la variante. |
| servicios | LOGOS-001 · Identidad de productos de Servicios. Elige product y type según el producto y el espacio. Conserva VDI en mayúsculas y las proporciones de la variante. |
| CONTPAQi | LOGOS-001 · Identidad corporativa CONTPAQi y Mi CONTPAQi. Elige la pareja product y Mode disponible que mantenga legibilidad sobre el fondo. Conserva el arte y las proporciones. |

## Aceptación

Leer los cinco sets oficiales y las 68 variantes. Comparar nombres, default, API, geometría, capas, color, máscaras y fills con la fuente. Verificar cero bindings y cero dependencias externas. Instanciar y seleccionar las combinaciones disponibles. La página oficial contiene únicamente los cinco sets y cada set contiene sus variantes. Confirmar alcance Figma en el catálogo y ausencia de export web.

La [ficha de consumo](../../implementations/figma/logos-2026-11-12/README.md) enlaza los cinco sets del maestro.
