---
contract_schema: sdd-project/0.2
contract_id: CHARACTERS-001
name: Characters
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Characters
figma_page_id: "187:14"
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["187:51", "187:112"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/characters.v1.0.0.json
source_data_digest_sha256: fd428c0992369ffdf642a0451fd6c2c32ade68931e9da194083ae84759280d61
data_refs: [specs/data/characters.v1.0.0.json, specs/tokens/characters.identity.v1.0.0.json, sources/figma-snapshots/characters-2026-11-12/selection.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Characters · CHARACTERS-001

La [selección Characters 820:7](https://www.figma.com/design/tj3WIBEZDGLVs7MJWKCwgf/AI-Design-System?node-id=820-7) es la fuente de solo lectura autorizada. La [lectura nativa](../../sources/figma-snapshots/characters-2026-11-12/selection.json) conserva rutas, transformaciones, paints y reacciones. El [JSON de familia](../data/characters.v1.0.0.json) gobierna los ejes y la secuencia. La página Characters de AI Blueheart DS reúne los dos maestros, cada uno con anatomía vectorial fija. P-SLOTS NOT_APPLICABLE por la composición fija de cuerpo y rasgos.

## Variantes y movimiento

| Set | Variantes del eje `Frame` | Default | Recorrido |
| --- | --- | --- | --- |
| BENI Standby | 01–06 | 01 | Parpadeo y desplazamientos laterales de ojos y boca. 06 vuelve a 01. |
| NAVI Analysis | 01–07 | 01 | Desplazamientos, estiramientos y parpadeo de los ojos. Sombra izquierda en 02 y derecha en 03. 07 vuelve a 01. |

Cada transición es `AFTER_TIMEOUT → CHANGE_TO` con `SMART_ANIMATE`. BENI espera 2000, 1, 600, 600, 600 y 600 ms y transiciona durante 100, 100, 300, 300, 300 y 300 ms. La segunda transición usa `EASE_IN_AND_OUT` y las demás `EASE_OUT`. NAVI espera 800, 400, 800, 800, 400, 800 y 200 ms y transiciona durante 300 ms con `EASE_OUT`. La inspección de Motion no encontró pistas manuales.

El web conserva las poses y traduce las esperas y transiciones a ciclos de 5801 y 6300 ms con interpolación de los vectores coincidentes y desvanecimiento de las sombras. La reproducción web es optativa. Un anfitrión que active un bucle continuo ofrece un control para detenerlo. Con `prefers-reduced-motion: reduce` se muestra la fase seleccionada de forma estática.

## Colores de identidad

El [JSON de tokens](../tokens/characters.identity.v1.0.0.json) delega cuatro variables por nivel. Cada paint de componente referencia un alias semántico de identidad y este resuelve a su primitiva nueva. Contable, Administrativo, Servicios y Personas resuelven los mismos RGBA. La [enmienda](../foundations/characters.identity-chain.amendment.v1.0.0.md) sustituye para esta migración la ruta histórica directa. Conserva las tres colecciones y los valores anteriores.

| Uso | Color fuente de referencia |
| --- | --- |
| Cuerpo BENI | #41589B |
| Cuerpo NAVI | #F58342 |
| Ojos de ambos y boca BENI | #E4E5E6 |
| Sombras laterales NAVI | #D6743D |

La autoridad numérica son los RGBA observados del JSON. Los 47 fills son sólidos y opacos. Los vectores de sombra sin fill conservan su geometría en Figma. La selección carece de gradientes, efectos, máscaras, tipografía e instancias externas.

## Guía semántica normativa

| Situación | Haz | Evita |
| --- | --- | --- |
| Asistente en espera | Usa BENI Standby como acompañamiento. | Atribuir progreso o confirmación al parpadeo. |
| Tarea de análisis en curso | Usa NAVI Analysis junto a un estado textual que aporta el anfitrión. | Comunicar el estado solo con el personaje. |
| Movimiento reducido o escena estática | Usa una pose fija. Permite detener el bucle cuando se active. | Forzar reproducción continua. |

La fase identifica una pose del ciclo. El anfitrión controla el estado real, el texto accesible y el comienzo o fin de la tarea. En web, el personaje es decorativo de forma predeterminada. Si transmite información adicional, usa un nombre accesible.

## Description y aceptación

BENI Standby · CHARACTERS-001. Ilustración de espera con seis fases. Usa Frame para elegir una pose y conserva los colores originales en los cuatro temas.

NAVI Analysis · CHARACTERS-001. Ilustración de análisis con siete fases. Acompaña el estado con texto. Usa Frame para elegir una pose y conserva los colores originales en los cuatro temas.

Cotejar geometría, propiedades, 13 reacciones, orden y retorno, 47 bindings y aliases en los cuatro modos. Probar consumo en instancias, reproducción Figma y Chrome, y movimiento reducido en web. Registrar los límites de reproducción por entorno.
