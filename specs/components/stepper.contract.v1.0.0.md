---
contract_schema: sdd-project/0.2
contract_id: STEPPER-001
name: Stepper
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Steppers
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/stepper.v1.0.0.json
source_data_digest_sha256: 3e721dcc5d934b44f911560b3987b7901559f452a2d31d80765a8919a1c4c148
data_refs: [specs/data/stepper.v1.0.0.json, specs/data/stepper.tokens.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Stepper · STEPPER-001

## Fuentes y alcance

La [selección original](https://www.figma.com/design/98xEw6sK8FRVNEhopM5SSz/Blue-Heart-DS?node-id=1020-530) contiene un set Stepper de 18 variantes, un ejemplo de cuatro pasos y referencias a ocho conectores del set Progress line. El [registro estructurado](../../sources/figma-snapshots/root-families-2026-11-11/stepper-source.json) conserva IDs, layouts, overrides y paints observados. El [JSON delegado](../data/stepper.v1.0.0.json) rige la receta del maestro y del auxiliar privado.

## Anatomía y propiedades

Cada paso contiene marca, conector entrante y/o saliente según posición, etiqueta de paso, título y caption. El círculo mide 32 px y el glyph 16 px. El conector mide 4 px de grosor y el tramo horizontal 80 px. Se conservan el terminal horizontal de 41 px y los casos verticales de 57, 104 y 68 px de alto. El título usa Manrope SemiBold de 14 px. La etiqueta y el caption usan Manrope Regular de 10 px. Se conservan interlineado de 150% y tracking de −2%.

Los ejes son type horizontal/vertical, state checked/default/inactive y position start/middle/end. Los textos step, title y caption son editables. Las propiedades show step y show caption controlan visibilidad. El swap icon tiene CheckFat Fill como valor predeterminado y actúa donde la fuente lo vincula, en checked/start y checked/middle. Image Fill se conserva en los demás casos. Las 1512 sugerencias del selector original son metadatos de la biblioteca remota. El destino conserva el swap libre y su default, con los dos iconos efectivamente usados verificados en [Phosphor oficial](../../sources/figma-snapshots/root-families-2026-11-11/phosphor-stepper.json).

P-SLOTS NOT_APPLICABLE al maestro de un paso. Las piezas son fijas y se editan con texto, booleanos o swap. El anfitrión compone una secuencia de instancias. La cantidad del ejemplo es ilustrativa.

## Estados, color y composición

La orden del usuario conserva el tratamiento observado y lo aplica por modo. El [corte de variables](../data/stepper.tokens.v1.0.0.json) delega los aliases de marca predeterminada y de acento, más los neutros invariantes. El ejemplo azul coincide con los roles Contable. Administrativo, Servicios y Personas usan sus aliases canónicos existentes. El conector remoto tiene un modo propio que en lectura directa devuelve verde. Para la reconstrucción rige el color que consume la selección, incluido el override de acento en el tramo entrante del paso actual.

| Caso | Marca y glyph | Conectores |
|---|---|---|
| checked, start o middle | Acento y CheckFat de marca | Acento en los tramos presentes |
| checked, end | Marca e Image blanco | Entrante de acento |
| default | Marca e Image blanco | Entrante de acento y saliente neutro |
| inactive | Neutro muted e Image en neutral medium | Neutro en los tramos presentes |

La etiqueta y el título usan neutral medium. Caption usa neutral soft. El contraste de Caption sobre blanco es inferior a 4.5:1 y conserva el tratamiento solicitado. La etiqueta accesible del estado y el título identifican el paso.

## Guía semántica normativa

Usa Stepper para orientar a la persona en una secuencia estable de varias etapas. El paso actual se identifica con `aria-current="step"` en la lista ordenada. Los estados completado y pendiente se comunican también como texto accesible. La fuente carece de reacciones en el maestro y en el ejemplo. El anfitrión decide validación, navegación, controles Anterior y Continuar y foco al cambiar de paso. La orientación responde al espacio de la interfaz. [USWDS Step indicator](https://designsystem.digital.gov/components/step-indicator/) · [W3C WAI Multi-page Forms](https://www.w3.org/WAI/tutorials/forms/multi-page/)

| Situación | Haz | Evita |
|---|---|---|
| Configurar una empresa | Nombra cada etapa por su objetivo e identifica un paso actual. | Reutilizar las etiquetas como destinos de navegación global. |
| Importar movimientos | Cambia el paso después de validar y conserva el avance en el anfitrión. | Marcar un paso completado por el mero clic en la etiqueta. |
| Vista estrecha | Usa la orientación vertical para mantener los títulos legibles. | Cortar los títulos o usar el color como única señal del avance. |
| Ayuda complementaria | Coloca la información imprescindible en el título o en el contenido principal. | Delegar instrucciones críticas al caption de contraste reducido. |

## Description exacta

| Propietario | Description |
|---|---|
| Stepper | STEPPER-001 · Indica el avance en un flujo de etapas. Combina orientación, estado y posición según la secuencia. Edita título, etiqueta y caption. El anfitrión gestiona la navegación y validación. Ficha local Stepper / STEPPER-001. |
| __Stepper/Progress line | STEPPER-001 · Conector privado de los pasos. Conserva orientación, terminales y roles de acento o neutro por tema. Consúmelo desde Stepper. |

## Aceptación

Cotejar 18 variantes y ocho conectores, los cuatro modos, las identidades Phosphor, el swap y las propiedades de texto y visibilidad. Verificar color y layout en destino y una secuencia web de varios pasos con Anterior y Continuar externos, `aria-current`, y estados accesibles. Registrar resultados de contraste sin alterar los colores solicitados.
