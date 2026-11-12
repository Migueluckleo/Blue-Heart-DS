---
contract_schema: sdd-project/0.2
contract_id: FOUNDATIONS-BLUEHEART-VARIABLES-001
name: Variables BlueHeart en tres colecciones
type: tokens
status: DELEGATED_FOR_BUILD
version: 0.1.1
last_updated: 2026-11-11
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
source_data_ref: drafts/foundations/blueheart-variables.v0.1.1.json
source_data_digest_sha256: a0f01bc04e54f3c99080210892d3c25dd51f0e7c60837b7a62333d33d170e60e
data_refs:
  - drafts/foundations/blueheart-variables.v0.1.1.json
  - sources/figma-snapshots/variables-2026-11-11/capture-manifest.json
---

# Variables BlueHeart en tres colecciones

La corrección explícita del usuario sustituye el destino del plan inicial. En el maestro quedan exactamente tres colecciones locales, con nombres `primitives`, `semantic` y `component`. Los 19 grupos usan nombres de variable con barra dentro de `primitives`, por ejemplo `orange/100` y `font-family/inter`. Conserva el orden de modos observado, los nombres y la estructura fuente de `semantic` y `component`.

## Autoridad y datos

El [JSON delegado](../foundations/blueheart-variables.v0.1.1.json) gobierna los datos y la descripción canónica de cada variable. La [captura y sus hashes](../../sources/figma-snapshots/variables-2026-11-11/capture-manifest.json) conservan los IDs y los valores de origen. Los IDs y keys reales del maestro se registran en una evidencia de implementación. El QA documental está en [el comprobante](../../qa/contracts/blueheart-variables.v0.1.1.review.md).

## Mapa de grupos de primitivas

Una colección, un modo `Value`, 173 variables.

| Grupo | Variables | Muestra de nombres dentro del grupo |
|---|---:|---|
| `amber` | 9 | 500, 100, 600 |
| `blue` | 9 | 500, 600, 700 |
| `cyan` | 9 | 500, 100, 600 |
| `emerald` | 9 | 400, 100, 600 |
| `font-family` | 2 | manrope, inter |
| `font-letter-spacing` | 7 | tight, normal, wide |
| `font-line-height` | 11 | 16, 20, 24 |
| `font-size` | 10 | 12, 14, 16 |
| `font-weight` | 4 | semibold, regular, medium |
| `green` | 9 | 100, 200, 300 |
| `neutral` | 10 | 300, 600, 700 |
| `orange` | 9 | 100, 200, 300 |
| `purple` | 9 | 100, 200, 300 |
| `radius` | 9 | 0, 32, 2 |
| `red` | 9 | 500, 100, 600 |
| `shadow` | 1 | md |
| `size` | 25 | 12, 8, 16 |
| `spacing` | 15 | 0, 56, 64 |
| `stroke` | 7 | 0, 1, 2 |

## Reconstrucción y recuperación

1. Verificar que las colecciones adicionales y sus variables correspondan a los IDs creados durante el plan interrumpido. Conservar evidencia del estado intermedio.
2. Crear `primitives` y sus 173 variables con ruta de grupo. Preservar valores, tipos, scopes, descripción, codeSyntax, visibilidad y modo fuente. Validar cada identidad antes de reorientar consumidores.
3. Reorientar los 134 aliases semánticos a los nuevos IDs de `primitives`. Conservar el mismo ID real de cada semántica existente. Los 3.520 aliases de componente apuntan a esas mismas semánticas. Completar las 355 variables de componente faltantes según la lectura intermedia.
4. Comprobar que ningún consumidor local conserve un alias hacia las 19 colecciones que se retiran. Retirar solo colecciones creadas por este encargo e identificadas por IDs y keys en los recibos. Releer la cobertura total y campos del resultado.
5. Mantener intacta la raíz. No crear nodos de lienzo ni publicar. QA visual del usuario es opcional después de la verificación técnica.

## Guía semántica normativa

Consume el rol de componente o semántico establecido por la spec de familia. Las primitivas proveen los valores de las escalas y medidas observadas. Evita seleccionar una primitiva por similitud de valor. Conserva aliases y modos. Los grupos expresan identidad y categoría. Un nombre de medida no establece una unidad. Estados, decisiones de uso, contenido, composición visual, Slots y accesibilidad se especifican con evidencia por familia. Las 23 descripciones vacías se conservan.

**Haz.** Usa la referencia real a `primitives` y su nombre de ruta en el alias Figma. **Evita.** Crear una colección por cada paleta, completar niveles ausentes o cambiar un alias a literal.
