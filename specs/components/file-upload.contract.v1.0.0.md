---
contract_schema: sdd-project/0.2
contract_id: FILE-UPLOAD-001
name: File Upload
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: File Upload
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/file-upload.v1.0.0.json
source_data_digest_sha256: 9d13163e041720b6f994fc588d99f2ddc75edb52e1397cfd77806c3c7923e20b
data_refs: [specs/data/file-upload.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, BUTTON-001, LINEAR-PROGRESS-001]
---

# File Upload · FILE-UPLOAD-001

El [contrato fuente v1.0.1](../../sources/figma-snapshots/root-families-2026-11-11/file-upload.1.0.1.md.txt) y el [JSON delegado](../data/file-upload.v1.0.0.json) conservan default, hover, focus, error, success y disabled. Helper text edita formatos dentro de la zona. Show helper controla el texto exterior. La zona usa Phosphor y un Button secondary/small opcional. Success reutiliza Linear Progress success/large/100% con Header oculto. P-SLOTS NOT_APPLICABLE por composición fija. Los formatos XLS, XLSX y CSV y el máximo de 50 MB son texto inicial editable. El host define su política.

## Guía semántica normativa

Usa File Upload cuando el usuario debe entregar un archivo desde su dispositivo. Ofrece selección por teclado además de arrastre. Informa antes de seleccionar los formatos y tamaños que el producto admite. El anfitrión recibe la selección, valida el archivo y comunica el resultado de la operación. Conserva el motivo concreto y una ruta de reintento cuando falla.

| Situación | Haz | Evita |
|---|---|---|
| Elegir un archivo | Muestra los formatos admitidos y habilita el selector nativo. | Exigir arrastre o usar el texto de ejemplo como política de validación. |
| Archivo rechazado | Comunica el motivo y ofrece «Subir nuevamente». | Indicar el fallo solo con color. |
| Recepción confirmada | Muestra success y el riel completo tras confirmación del anfitrión. | Confundir selección local con transferencia confirmada. |

La excepción de contraste de la fuente conserva el formato hover por debajo de 4.5:1 en algunos temas y el formato de error observado. La zona web conserva foco visible y mensajes accesibles. [Carbon File uploader](https://www.carbondesignsystem.com/building-blocks/core/components/file-uploader/accessibility)

## Description exacta

FILE-UPLOAD-001 · Usa File Upload para elegir o arrastrar archivos. Ofrece un selector accesible, informa formatos admitidos y explica los fallos con una acción de reintento. Muestra success tras confirmación. Evita exigir arrastre o tratar los formatos de ejemplo como reglas. Ejemplo: seleccionar un archivo XLSX. Ficha local: File Upload / FILE-UPLOAD-001.

## Aceptación

Verificar seis variantes, geometría, anillo, trazos, seis estilos con rangos, Phosphor oficial, seis Buttons vinculados y un riel Linear Progress vinculado. Conservar las dos reacciones de hover observadas. Comprobar selección nativa, arrastre, disabled y feedback del anfitrión en web.
