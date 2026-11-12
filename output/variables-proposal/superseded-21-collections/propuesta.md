# Propuesta para revisar · variables BlueHeart

Se reorganizan las 173 primitivas en **19 colecciones**. Se mantienen `semantic` y `component`, para un total propuesto de **21 colecciones**.

| Colección | Tipo | Variables | Nombres o muestra | Rol |
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

- Cada colección primitiva y `semantic` conserva `Value`. `component` mantiene Contable, Administrativo, Servicios y Personas.
- La validación local recorrió los 3.654 aliases hasta su valor final. El mapa conserva identidad, metadatos y valores.
- `shadow-md` es un color con alfa y sin nivel de paleta. Se propone `shadow / md`.
- Los nombres de medidas preservan el sufijo observado, por ejemplo `stroke / 1-5`. Los valores conservan tipo y precisión. No se asignaron unidades nuevas.

Revisa el [mapa completo de las 173 primitivas](mapa-primitivas.csv), el [mapa de aliases](mapa-aliases.csv), el [contrato candidato](../../drafts/contracts/blueheart-variables.contract.v0.1.0.md) y el [QA documental](../../qa/contracts/blueheart-variables.v0.1.0.review.md).

La escritura en el maestro queda pendiente de tu confirmación.
