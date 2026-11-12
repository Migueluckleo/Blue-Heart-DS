---
contract_schema: sdd-project/0.2
contract_id: FOUNDATIONS-BLUEHEART-VARIABLES-001
name: Variables BlueHeart y propuesta de reorganización de primitivas
type: tokens
status: DELEGATED_FOR_BUILD
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
version: 0.1.0
last_updated: 2026-11-11
source_data_ref: drafts/foundations/blueheart-variables.v0.1.0.json
source_data_digest_sha256: cfa129e7658a482dbfd27f08c337a8fdb4dcc451afb06448231c07d993c816be
data_refs:
  - drafts/foundations/blueheart-variables.v0.1.0.json
  - sources/figma-snapshots/variables-2026-11-11/capture-manifest.json
---

# Variables BlueHeart y propuesta de reorganización de primitivas

**Estado de construcción:** `AUTHORIZED_TECHNICAL_PREFLIGHT`. Este contrato candidato describe el alcance de la decisión. El [JSON propuesto](../foundations/blueheart-variables.v0.1.0.json) contiene nombres, tipos, modos, valores, aliases y la única `description` por variable. El [manifiesto de ingesta](../../sources/figma-snapshots/variables-2026-11-11/capture-manifest.json) preserva capturas y hashes. El [QA documental](../../qa/contracts/blueheart-variables.v0.1.0.review.md) cubre la propuesta.

## Alcance y procedencia

- **EXPLICIT.** Reorganizar únicamente la capa primitiva. Para colores numerados, usar una colección por familia y cada nivel existente como nombre. Conservar semánticas y variables de componente en su organización fuente. El usuario autorizó aplicar directamente el mapa en el maestro.
- **OBSERVED.** La raíz Blue Heart DS contiene `primitive` (173), `semantic` (134) y `component` (880). El maestro AI Blueheart DS devolvió cero colecciones locales. Lecturas realizadas con Plugin API desde la cuenta de CONTPAQi.
- **DERIVED.** La propuesta divide `primitive` en 19 colecciones. La tabla muestra el resultado de clasificar por tipo y por prefijo de origen. El usuario autorizó aplicar estas agrupaciones directamente.

## Mapa propuesto de primitivas

Todas estas colecciones conservan un solo modo `Value`. Los niveles listados son los encontrados en la fuente.

| Colección | Tipo Figma | Variables | Nombres o muestra | Rol sustentado por la fuente |
|---|---|---:|---|---|
| `amber` | COLOR | 9 | 100, 200, 300, 400, 500, 600, 700, 800, 900 | Paleta cromática numerada |
| `blue` | COLOR | 9 | 100, 200, 300, 400, 500, 600, 700, 800, 900 | Paleta cromática numerada |
| `cyan` | COLOR | 9 | 100, 200, 300, 400, 500, 600, 700, 800, 900 | Paleta cromática numerada |
| `emerald` | COLOR | 9 | 100, 200, 300, 400, 500, 600, 700, 800, 900 | Paleta cromática numerada |
| `font-family` | STRING | 2 | inter, manrope | Familia tipográfica |
| `font-letter-spacing` | FLOAT | 7 | label-px, minus-0p2, minus-0p24, minus-0p28… | Espaciado entre letras |
| `font-line-height` | FLOAT | 11 | 15p0, 18p0, 22p4, 16… | Interlineado |
| `font-size` | FLOAT | 10 | 10, 12, 14, 16, 20, 24, 32, 40, 48, 56 | Tamaño tipográfico |
| `font-weight` | STRING | 4 | bold, medium, regular, semibold | Nombre de peso tipográfico |
| `green` | COLOR | 9 | 100, 200, 300, 400, 500, 600, 700, 800, 900 | Paleta cromática numerada |
| `neutral` | COLOR | 10 | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 | Paleta cromática numerada |
| `orange` | COLOR | 9 | 100, 200, 300, 400, 500, 600, 700, 800, 900 | Paleta cromática numerada |
| `purple` | COLOR | 9 | 100, 200, 300, 400, 500, 600, 700, 800, 900 | Paleta cromática numerada |
| `radius` | FLOAT | 9 | 0, 2, 4, 8, 12, 16, 24, 32, 9999 | Radios |
| `red` | COLOR | 9 | 100, 200, 300, 400, 500, 600, 700, 800, 900 | Paleta cromática numerada |
| `shadow` | COLOR | 1 | md | Color de sombra, con alfa preservado |
| `size` | FLOAT | 25 | 4, 6, 8, 12, 16, 18, 20, 24, 32, 40, 48, 56, 64, 72, 88, 104, 120, 200, 234, 240, 294, 320, 358, 554, 1152 | Dimensiones |
| `spacing` | FLOAT | 15 | negative-2, negative-4, negative-6, negative-8… | Espaciado |
| `stroke` | FLOAT | 7 | 1-5, 0, 1, 2… | Grosor de trazo |

`orange-100 → orange / 100`. `neutral-50 → neutral / 50`. `shadow-md → shadow / md` conserva el color RGBA. `font-family-manrope → font-family / manrope` conserva el valor de texto `Manrope`. `stroke-1-5 → stroke / 1-5` conserva el valor FLOAT 1.5. Se preservan los sufijos de origen en nombres no cromáticos, incluidos decimales y negativos. Una etiqueta de tamaño no establece por sí sola la unidad.

## Modos, dependencias y aceptación

1. Conservar los 173 valores primitivos, metadatos, scopes, visibilidad y `codeSyntax`. Mantener textos vacíos donde el origen no contiene una descripción. No sintetizar unidades o equivalencias.
2. Mantener `semantic` con modo `Value` y sus 134 nombres. Cada alias apuntará a la primitiva correspondiente mediante su ID real nuevo. Mantener `component` con 880 nombres y cuatro modos en su orden observado: Contable, Administrativo, Servicios y Personas. Sus 3.520 valores por modo conservarán los aliases semánticos por identidad.
3. Al dividir una colección se crean controles de modo independientes en Figma. Todas las primitivas seguirían teniendo solo `Value`, por lo que la división conserva la selección efectiva y el valor. La prueba local recorre todos los aliases hasta el literal final. El readback deberá confirmar los modos reales y su modo predeterminado después de una construcción autorizada.
4. Aplicar P04 en el maestro y verificar sus precondiciones técnicas. Comprobar el maestro y su capacidad para 21 colecciones y cuatro modos de componente antes del lote dependiente. Registrar IDs reales de colecciones, modos y variables. El JSON guarda IDs fuente y rutas propuestas. El mapa de IDs reales se generará al escribir.
5. Aplicar P06 con lectura independiente de valores, aliases, scopes, descripción y code syntax. Si el adaptador normaliza un dato, registrar la diferencia con evidencia. Cualquier colisión, límite o cambio del destino se resuelve en su alcance antes de avanzar.

## Guía semántica normativa

Las primitivas son valores base. Al diseñar componentes, selecciona el rol semántico o de componente acreditado por el contrato de familia. Evita elegir una primitiva por coincidencia de color o magnitud. El inventario demuestra la composición de aliases y modos. Una alternativa entre roles, estado, contenido o criterio de accesibilidad necesita evidencia de la familia. Slots, anatomía visual y contenido no aplican al inventario de variables.

**Haz.** Conserva el alias observado del token semántico al mismo ID lógico de origen al mover la primitiva a su colección propuesta. Verifícalo en el [JSON](../foundations/blueheart-variables.v0.1.0.json) con el mapa completo. **Evita.** Crear un nivel de color ausente, convertir un FLOAT por intuición o reemplazar el alias por el valor literal.


