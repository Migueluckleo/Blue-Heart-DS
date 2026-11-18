---
contract_schema: sdd-project/0.2
contract_id: LINEAR-PROGRESS-001
name: Linear Progress Bar
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Linear Progress Bar
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/linear-progress.v1.0.0.json
source_data_digest_sha256: 0029fe258213aaf8e40206c821ec0adad9718039513a916fe040aa78feb660d0
data_refs: [specs/data/linear-progress.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Linear Progress Bar · LINEAR-PROGRESS-001

El [contrato fuente v1.0.1](../../sources/figma-snapshots/root-families-2026-11-11/linear-progress.1.0.1.md.txt) gobierna el comportamiento. El [JSON delegado](../data/linear-progress.v1.0.0.json) conserva la captura de 72 variantes públicas en tres sets, 12 fases privadas del auxiliar único y los IDs de las variables y estilos. Header, Label, Value, Track, Indicator y Helper text son composición fija. Las propiedades de texto y visibilidad acotadas justifican P-SLOTS NOT_APPLICABLE.

## Guía semántica normativa

Comunica el progreso de un proceso real. Usa el porcentaje cuando el anfitrión puede medir el avance y la variante indeterminada mientras se desconoce el total. Primary comunica progreso normal. Success comunica una finalización confirmada. Warning y error conservan el avance alcanzado y necesitan un mensaje que explique la situación. El anfitrión suministra los datos y decide cuándo retirar el indicador.

| Situación | Haz | Evita |
|---|---|---|
| Carga con total conocido | Muestra «Cargando comprobantes» y el avance real, con «2 de 4 comprobantes» si ayuda. | Incrementar el porcentaje con un temporizador sin datos. |
| Preparación con total desconocido | Usa indeterminado mientras calculas el total. | Presentar un porcentaje que el proceso aún no puede medir. |
| Carga detenida | Conserva el último avance y explica el fallo en Helper text. | Depender solo del color o mostrar success antes de confirmar 100%. |
| Indicador dentro de File Upload | Usa el set large y oculta Header cuando el anfitrión ya muestra nombre y estado. | Dejar una cabecera vacía con espacio reservado. |

En web proporciona nombre accesible, rango de 0 a 100 y valor actual si es determinado. El indeterminado omite el valor actual y respeta la preferencia de movimiento reducido. [Carbon Progress Bar](https://www.carbondesignsystem.com/building-blocks/core/components/progress-bar/guidelines) · [Material UI Progress](https://mui.com/material-ui/react-progress/)

## Composición y prototipo

El ancho mínimo es 120 px. El riel mide 4, 8 o 12 px según small, medium o large. Show label, Show value y Show helper text son independientes. En la instancia nativa se puede ocultar Header para retirar su espacio. La barra determinada conserva ratios 0/25/50/75/100. En 0%, el indicador queda recortado a la izquierda para Smart Animate. El auxiliar privado conserva rest/exit/enter y se enlaza desde las 12 variantes indeterminadas. El prototipo determinado avanza por muestras hasta 100%. Esta secuencia representa el prototipo, y el componente web recibe el avance del anfitrión.

## Description exacta

| Set | Description |
|---|---|
| __Linear Progress/Indeterminate | LINEAR-PROGRESS-001 · Auxiliar privado del indicador indeterminado. Conserva el ciclo rest→exit→enter→rest. Reutiliza el auxiliar desde los tres sets públicos. Ficha local: Linear Progress Bar / LINEAR-PROGRESS-001. |
| Linear Progress Bar/small | LINEAR-PROGRESS-001 · Usa small para progreso en un espacio compacto. Muestra el avance real o usa indeterminado si desconoces el total. Explica advertencias y errores con texto. Evita simular porcentajes. Ejemplo: validando comprobantes. Ficha local: Linear Progress Bar / LINEAR-PROGRESS-001. |
| Linear Progress Bar/medium | LINEAR-PROGRESS-001 · Usa medium para mostrar el avance de un proceso. Conserva el último valor ante un fallo y explica el motivo. Evita anunciar éxito antes de confirmar la finalización. Ejemplo: cargando 2 de 4 comprobantes. Ficha local: Linear Progress Bar / LINEAR-PROGRESS-001. |
| Linear Progress Bar/large | LINEAR-PROGRESS-001 · Usa large para dar visibilidad al avance o componer el riel en File Upload. Retira Header si el anfitrión ya nombra el proceso. Evita una cabecera vacía con espacio reservado. Ejemplo: carga del archivo al 100%. Ficha local: Linear Progress Bar / LINEAR-PROGRESS-001. |

## Aceptación

Comprobar los cuatro sets, 84 variantes, 22 variables de componente, dos estilos tipográficos, 12 enlaces a instancias del auxiliar, ratios, clipping, escalado, reacciones y guías. Cotejar el ancho mínimo y la independencia de las propiedades visibles. En web verificar valor accesible, avance controlado, indeterminado, proporciones y movimiento reducido. Documentar el alcance del presentador nativo según la evidencia ejecutada.
