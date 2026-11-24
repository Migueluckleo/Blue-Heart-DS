# .Conversation / Preview · contrato de evidencia

Fuente: [222:111](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=222-111). Inspección **COMPLETE**, generada 2026-11-24T15:18:07.324Z. **Evidencia Figma de solo lectura**; no se modificó el archivo ni se generó código de aplicación.

## Component Identity

| Campo | Observado en Figma |
| --- | --- |
| ID / key | 222:111 / d654798f1650f1f46d2e0f62ba4ed15e5f08639d |
| Página | Conversation Response 222:309 |
| Tipo | COMPONENT |
| Referencia | 544 × 82 px |
| Description | CONVERSATION-RESPONSE-001. Tarjeta auxiliar para mostrar el título de un resultado tabular. Insértala en Previews de Conversation Response. |

## Anatomy

**Observado en Figma:** 11 nodos, sin pendientes; dos instancias con visible=false y sus vectores incluidos en la lectura. Los vectores se agregan bajo su icono funcional.

```text
.Conversation / Preview [COMPONENT] 222:111
  Table [INSTANCE] 222:112
  Preview details [FRAME] 222:113
    Title [TEXT] 222:114
    Agent category [INSTANCE] 222:120
      Left icon [INSTANCE] I222:120;64:116
      Label [TEXT] I222:120;64:118
      Right icon [INSTANCE] I222:120;64:119
```

## Dependencies

**Estructura derivada:** 4 instancias, 3 componentes únicos (1 local y 2 remotos), todos RESOLVED para su superficie activa.

| Main component | Key | Instancias | Activo |
| --- | --- | --- | --- |
| 64:12 | 3f0d7ae9a02577d4fb4e615737d09fa1b49ec230 | 2 | Presentation / Format=Outline, Weight=Fill |
| 218:1205 | 90e6fea88275f3f4a8691a863e5a3bbb3bfc17e8 | 1 | Table / Format=Outline, Weight=Light |
| 64:115 | 60dc48c2c95327923c11c5b14d5fa7025762680a | 1 | Badge / type=subtle, size=medium |

## Properties

**Observado en Figma:** el maestro expone únicamente `Title#765:0` (TEXT). Su default y el texto observado coinciden. Las propiedades de Badge pertenecen a la dependencia y no se exponen como nuevos props del Preview. El label observado es «Tabla»; Show left icon y Show right icon están apagados.

## Variants

Es un COMPONENT sin ejes de variantes propios. Las variantes activas de dependencias y sus alternativas expuestas están en YAML; no se inspeccionaron profundamente las alternativas.

## States

Referencia visible. No se exponen estados hover, pressed, loading o disabled propios; los dos iconos opcionales de Badge están ocultos.

## Layout

**Observado en Figma:**

| Nodo | Layout / sizing | Caja | Separación |
| --- | --- | --- | --- |
| 222:111 | HORIZONTAL, NO_WRAP; FIXED/HUG | 544 × 82 px | Gap 16; padding 16 por lado |
| 222:113 | HORIZONTAL, NO_WRAP; FILL/HUG | 470 × 48 px | Gap 8; padding 0; MIN/MIN |
| 222:114 | FILL/HUG, auto-resize HEIGHT | 416 × 48 px | Sin truncamiento ni máximo de líneas |
| 222:120 | HUG/HUG | 46 × 24 px | Label Tabla, sin iconos |
| 222:112 | FIXED/FIXED | 24 × 24 px | Table Outline Light |

**Estructura derivada:** `470 = 544 − 2×(16+1) − 24 − 16`; `416 = 470 − 8 − 46`; `82 = max(48,24) + 2×(16+1)`. Stroke incluido en layout. Los dos consumidores BENI/NAVI usan el Preview FILL/HUG y heredan la fila horizontal; solo tienen overrides de tamaño. No se ejecutaron redimensionamientos.

## Visual Styles

**Observado en Figma:** superficie blanca, borde 1 px INSIDE, radio 8 px, sin efectos; todos sus bindings propios consumen Conversation Response. El borde resuelve `blue/200` en las cuatro cadenas leídas; no se inventa un acento distinto por producto. Badge mantiene sus tokens propios.

## Typography

| Texto | Familia / peso | Tamaño / interlineado | Estilo |
| --- | --- | --- | --- |
| Title | Manrope Bold / 700 | 16 / 24 px | textStyleId vacío; bindings component |
| Label | Manrope Regular / 400 | 12 / 16 px | badge/label-medium local |

Ambos tienen tracking 0 px. El título observado ocupa dos líneas por wrapping, no por un salto de línea insertado. Su contenido es un ejemplo.

## Tokens

**Estructura derivada:** 73 variables locales resueltas: 29 ligadas directamente (14 Conversation Response y 15 Badge) y 44 dependencias de aliases (22 semantic + 22 primitives). Cero referencias sin resolver y un estilo tipográfico local. Los cuatro modos se resolvieron por lectura de sus cadenas.

| Token de Conversation Response | ID real | Valor Contable |
| --- | --- | --- |
| conversation-response/color/bg/preview | VariableID:227:39 | {"r": 1, "g": 1, "b": 1, "a": 1} |
| conversation-response/color/border/preview | VariableID:227:37 | {"r": 0.7490196228027344, "g": 0.8078431487083435, "b": 0.9960784316062927, "a": 1} |
| conversation-response/color/text/primary | VariableID:227:38 | {"r": 0.05882352963089943, "g": 0.09019608050584793, "b": 0.16470588743686676, "a": 1} |
| conversation-response/font/bold | VariableID:227:42 | "bold" |
| conversation-response/font/family | VariableID:227:40 | "Manrope" |
| conversation-response/font/line-height-preview-title | VariableID:227:46 | 24 |
| conversation-response/font/size-preview-title | VariableID:227:44 | 16 |
| conversation-response/font/tracking | VariableID:227:47 | 0 |
| conversation-response/radius/preview | VariableID:227:35 | 8 |
| conversation-response/size/preview-icon | VariableID:227:48 | 24 |
| conversation-response/spacing/inset | VariableID:227:34 | 16 |
| conversation-response/spacing/none | VariableID:227:32 | 0 |
| conversation-response/spacing/stack | VariableID:227:33 | 8 |
| conversation-response/stroke/preview | VariableID:227:36 | 1 |

El YAML conserva las 73 referencias con key, colección, valor resuelto, used_by y evidencia. Los inventarios de componentes, variables y estilos se contabilizan por separado. No se cambiaron tokens, aliases o scopes.

## Content

Texto de ejemplo: «Distribución de facturas de personas físicas con IVA retenido en marzo 2025». Label de ejemplo observado: «Tabla». Title es editable; el texto y la fecha del ejemplo no son reglas de negocio. No se define otro formato de documento por la mera presencia de un Badge.

## Interactions

**Requiere definición:** reactions=[] en maestro y descendientes; no se documenta un nuevo gesto para abrir documentos, navegar o descargar. El cambio de posición no acredita comportamiento de producto.

## Accessibility

**Requiere definición:** título y etiqueta visibles e icono de 24 px observados. Figma no expone ARIA, foco de navegador o teclado. No se realizó una evaluación WCAG.

## External Dependencies

| Main | Remote | Procedencia / versión |
| --- | --- | --- |
| 64:12 | True | NOT_EXPOSED_BY_FIGMA_MCP |
| 218:1205 | True | NOT_EXPOSED_BY_FIGMA_MCP |

Las dos dependencias remotas son los iconos activos Table y Presentation descritos arriba; los Presentation son interiores ocultos heredados de Badge. La identidad/key están resueltas; no se reconstruye el archivo fuente o versión desde el nombre.

## Unresolved Information

No hay nodos, componentes activos, variables o estilos pendientes. Las limitaciones son: procedencia externa no expuesta; reflow en otros anchos no probado; falta de captura local inmediatamente anterior; interacción/semántica accesible no definida por la lectura.

## Implementation Notes

La fuente histórica del 12 de noviembre usa el ID remoto 218:1228, con Preview details VERTICAL y caja 544 × 115 px. No se presenta ese alto como el before del ID local 222:111. La implementación web actual todavía usa flex-col para título/Badge: se registra una diferencia pendiente de sincronización, sin modificar código en este encargo.

Se conserva el auxiliar dentro de Conversation Response, en la página actual; no se crea una familia pública nueva ni contratos profundos de sus dependencias. La Description actual continúa describiendo su propósito.

## Evidence / Confidence

Confianza **HIGH**: Se inspeccionaron los 11 nodos sin pendientes, cuatro instancias agrupadas en tres componentes, 73 variables con cadenas completas y un estilo; las limitaciones externas y de alcance están identificadas.

[Modelo YAML](component-contract.yaml) · [Modelo JSON de generación](component-contract.json) · [Evidencia cruda](raw-evidence.json) · [Captura](preview.png). Las propiedades materiales tienen fuentes `node:`, `variable:` o `style:` e IDs de evidencia en el YAML.
