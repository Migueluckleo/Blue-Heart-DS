# Chat History Item · contrato de evidencia

Fuente: [257:498](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=257-498). Lectura COMPLETE, 2026-11-24T15:44:54.161Z. Evidencia OBSERVED de solo lectura; no es un segundo contrato normativo.

## Component Identity

| Campo | Valor observado |
| --- | --- |
| Set / key | 257:498 / 312e59cef01748ee3b8a3c17942a496ab710f56e |
| Página | Chat History Item 257:586 |
| Tipo | COMPONENT_SET local |
| Matriz | Selected=false/true × State=Default/Hover: cuatro combinaciones |
| Description | Chat History Item · CHAT-HISTORY-ITEM-001. Usa esta fila para identificar un elemento de historial. Mantén accesible el título completo y deja la selección, fijado y menú al anfitrión. |

## Anatomy

Fila → Slot Title, Updated, Slot Actions y Dot absoluto. Title contiene el texto de muestra; Actions contiene dos Icon Button Ghost small para PushPin y DotsThree. El nuevo Dot no forma parte de Actions. Los ocho Badge internos ocultos de los Ghost son otra dependencia de Dot y no se confunden con los cuatro indicadores del anfitrión.

| Variante | Title / Updated / Actions / Dot |
| --- | --- |
| 257:499 | Title 257:500, Updated 257:502, Actions 257:503, Dot 628:9010 |
| 257:506 | Title 257:507, Updated 257:509, Actions 257:510, Dot 628:9015 |
| 257:513 | Title 257:514, Updated 257:516, Actions 257:517, Dot 628:9011 |
| 257:520 | Title 257:521, Updated 257:523, Actions 257:524, Dot 628:9013 |

## Dependencies

28 instancias agrupadas en 4 componentes únicos: dos locales (Ghost, Dot) y dos remotos (PushPin, DotsThree), todos resueltos para su superficie activa.

| Main | Key | Instancias | Activo |
| --- | --- | --- | --- |
| 128:134 | 33bbf11fec95bfc540e85769b270534f2db07776 | 4 | DotsThree / Format=Outline, Weight=Light |
| 246:2373 | b0d66c2c04014490bfbefe7579e0c98cd16db0a2 | 4 | PushPin / Format=Outline, Weight=Light |
| 59:154 | dc737950315cf97fb164c5fa223105f9b9ae31a9 | 8 | Icon Button/ghost / size=small, selected=false, state=default |
| 32:41 | 012c408fce0c65c1432f38da2d881e12e0fdf857 | 12 | Dot / type=notification, size=small, color=default |

## Properties

| Propiedad exacta | Tipo | Default / función observada |
| --- | --- | --- |
| show notification#628:0 | BOOLEAN | False |
| Title#796:13 | SLOT | Slot nativo |
| Updated#796:14 | TEXT | 1 sem |
| Actions#796:15 | SLOT | Slot nativo |
| Selected | VARIANT | false |
| State | VARIANT | Default |

La novedad es show notification#628:0=false, enlazada al visible de Dot en las cuatro variantes. Title y Actions siguen siendo Slots, no propiedades de texto/swap. Sus settings y keys exactas están en YAML. No se probó la activación de true.

## Variants

Se mantienen cuatro combinaciones y sus IDs/keys. La booleana no añade variantes.

| ID | Selected | State | Referencia |
| --- | --- | --- | --- |
| 257:499 | false | Default | 258 × 40 px |
| 257:506 | false | Hover | 258 × 48 px |
| 257:513 | true | Default | 258 × 40 px |
| 257:520 | true | Hover | 258 × 48 px |

## States

Default muestra Updated y oculta Actions; Hover oculta Updated y muestra Actions. Selected es independiente; Dot comparte default false. Los maestros Default tienen ON_HOVER → CHANGE_TO al Hover correspondiente, Smart Animate/EASE_OUT ~0.3 s. No se infiere navegación, fijado o menú desde esas reacciones.

## Layout

Las filas son HORIZONTAL/NO_WRAP, FIXED/HUG en el maestro, ancho de muestra 258, mínimo 40; padding 8 vertical y 16 horizontal, radio 8. Gap 8 en false/Default y 16 en las otras tres variantes. Title FILL/HUG; Actions HUG/HUG con WRAP y gap 16. Hover mide 48 por los Ghost oficiales de 32 más padding; Default mide 40. Las cajas guardadas de Actions oculto no fijan dimensiones de producto.

Dot: caja 8×8, x=246, y=4, ABSOLUTE; constraints MAX/MIN. DERIVED: inset derecho 4. No ocupa espacio del flujo. Siete instancias encontradas en el set oficial Chat Sidebar son FILL y heredan show notification=false. No se redimensionó ni editó ninguna instancia.

## Visual Styles

false/Default es transparente. false/Hover consume chat-history-item/color/bg/hover; ambos Selected=true consumen color/bg/selected. No hay borde visible de fila ni sombra. Dot notification/small/default consume sus propios tokens: fondo danger-default y separador neutral-base, stroke OUTSIDE de 1 y radio full. La captura mantiene el indicador apagado; la apariencia de true no se acredita por esa captura.

## Typography

| Texto | Familia / peso | Tamaño / línea / tracking | Ajuste |
| --- | --- | --- | --- |
| Title text | Manrope Regular 400 | 14 / 20 / 0 px | HEIGHT; ENDING; maxLines=1 |
| Updated | Manrope Medium 500 | 12 / 20 / 0 px | WIDTH_AND_HEIGHT; DISABLED; sin maxLines |

Cero estilos tipográficos nombrados usados; las ocho capas de texto conservan bindings de componente.

## Tokens

84 variables locales: 26 directamente usadas (16 Chat History Item, cinco Dot y cinco Icon Button) y 58 de aliases (29 semantic y 29 primitives). Se resolvieron 104 cadenas directas por cuatro modos, sin pendientes. Todos los componentes consumen su familia; no se agregaron tokens. IDs, keys, scopes, codeSyntax y usos están en YAML y snapshot.

| Token propio | ID |
| --- | --- |
| chat-history-item/color/bg/hover | VariableID:257:385 |
| chat-history-item/color/bg/selected | VariableID:257:386 |
| chat-history-item/color/text/body | VariableID:257:388 |
| chat-history-item/color/text/support | VariableID:257:389 |
| chat-history-item/font/body-size | VariableID:257:390 |
| chat-history-item/font/family | VariableID:257:391 |
| chat-history-item/font/line-height | VariableID:257:392 |
| chat-history-item/font/medium | VariableID:257:393 |
| chat-history-item/font/meta-size | VariableID:257:394 |
| chat-history-item/font/regular | VariableID:257:395 |
| chat-history-item/font/tracking | VariableID:257:396 |
| chat-history-item/radius/control | VariableID:257:397 |
| chat-history-item/size/row | VariableID:257:399 |
| chat-history-item/spacing/lg | VariableID:257:400 |
| chat-history-item/spacing/none | VariableID:257:401 |
| chat-history-item/spacing/sm | VariableID:257:402 |

## Content

«Nuevo chat» y «1 sem» son ejemplos. Updated es texto editable; su formato no define un cálculo de fecha. Title es contenido reemplazable de un Slot y su muestra trunca a una línea. La condición de negocio para encender/apagar Dot pertenece al anfitrión y no está definida por el nombre de la booleana.

## Interactions

FIGMA_DIRECT: dos reacciones ON_HOVER en los maestros Default. Las reacciones heredadas de Ghost pertenecen a los controles. No se verificaron efectos de selección, pin, menú, lectura/descartado de notificación o comunicación con servicios.

## Accessibility

REQUIRES_DEFINITION: no se probaron teclado, foco, anuncio de la notificación ni WCAG. Se mantiene la regla del contrato base de conservar accesible el título completo. Un indicador visual de 8 px no prueba un target interactivo ni un nombre accesible.

## External Dependencies

| Icono remoto | Main / key | Metadata externa |
| --- | --- | --- |
| Format=Outline, Weight=Light | 128:134 / 33bbf11fec95bfc540e85769b270534f2db07776 | NOT_EXPOSED_BY_FIGMA_MCP |
| Format=Outline, Weight=Light | 246:2373 / b0d66c2c04014490bfbefe7579e0c98cd16db0a2 | NOT_EXPOSED_BY_FIGMA_MCP |

Los componentes locales Dot y Ghost se resuelven en el maestro. La procedencia histórica Phosphor se conserva como antecedente y no como metadata externa expuesta por esta lectura.

## Unresolved Information

No hay nodos, componentes activos, variables o estilos pendientes. Límites: estado encendido y cambio de variantes no ejecutados, archivo/versión externos no expuestos, criterio de negocio y anuncio accesible no definidos. Las cuatro descriptions de variante conservan v0.1.0 aunque el contrato vigente es v1.0.0. Web aún no presenta la nueva booleana ni Dot.

## Implementation Notes

La fuente histórica 246:3536 expone cinco propiedades sin show notification; el set local actual expone seis. Se conserva la distinción entre IDs de origen y destino. Los tamaños 40/48 y Ghost small de 32 corresponden a la homologación oficial anterior, no se atribuyen como novedades del indicador. Title y Actions conservan el mecanismo nativo y settings observados; no se repitieron sus pruebas operativas.

Tres lotes de lecturas por ID no pudieron resolver hijos de instancias ocultas. Se completaron reteniendo referencias directas desde un recorrido explícito con skipInvisibleInstanceChildren=false. Resultado: 65/65 nodos, incluidos invisibles, sin truncamiento final.

## Evidence / Confidence

HIGH por lectura completa y dependencias resueltas, con límites nombrados. [YAML](component-contract.yaml) · [Modelo JSON](component-contract.json) · [Snapshot](raw-evidence.json) · [Consumidores](consumers.json) · [Captura](history.png). Las cifras y referencias se generan del mismo modelo; las secciones distinguen FIGMA_DIRECT, DERIVED y REQUIRES_DEFINITION.
