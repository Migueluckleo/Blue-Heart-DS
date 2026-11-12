---
contract_schema: sdd-project/0.2
contract_id: TOGGLE-001
name: Toggle
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Toggle
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/toggle.v1.0.0.json
source_data_digest_sha256: 92b7e82ac3fc039fc4beb58d391fbcb0e3fce540e411ded54e769b397996105e
data_refs: [specs/data/toggle.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Toggle · TOGGLE-001

Conservar las 8 combinaciones observadas, sus propiedades, geometría, estilos y bindings. El [JSON delegado](../data/toggle.v1.0.0.json) conserva la anatomía, valores observados y relaciones del set fuente 684:69. El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/toggle.1.0.0.md.txt) aporta el comportamiento y los límites. El [inventario raíz](../../sources/figma-snapshots/root-families-2026-11-11/inventory.json) vincula el set con su página y sus dependencias.

El alcance de esta ficha es el componente individual. Las variantes y propiedades acotadas de texto/visibilidad no requieren Slots arbitrarios. El QA verifica solo el comportamiento sustentado, con controles Figma y web separados. Los referentes orientan casos de uso, sin ampliar la API observada.

## Guía semántica normativa

Usa Toggle para una preferencia binaria cuyo cambio se aplica al alternarla. Para selección de varios elementos usa Checkbox. Para opciones excluyentes usa Radio. Si la persona debe revisar y guardar varios cambios juntos, elige el flujo de formulario adecuado.

| Situación | Haz | Evita |
|---|---|---|
| Preferencia | «Avisos por correo» permanece como nombre tanto encendido como apagado. | Cambiar la etiqueta a «Activar» o «Desactivar» según el estado. |
| Actualización asíncrona | Mantén la preferencia a cargo del anfitrión y explica un fallo donde se pueda corregir. | Inventar variantes loading o error en Toggle. |
| Espacio estrecho | Ajusta el anfitrión, permite envolver la etiqueta y conserva la señal de foco. | Estirar el riel para llenar el ancho del texto. |

Riel, perilla y foco son partes fijas. Label es opcional visualmente, con máximo observado de 320 px. Mantén nombre accesible si ocultas Label. La posición de la perilla comunica el valor además del color. Default, hover, focus y disabled son estados observados. En web, usa un switch con estado anunciado y activación por Espacio. El anfitrión decide persistencia, asincronía y el área táctil.

Contraste editorial sobre preferencias binarias y etiqueta estable. [Atlassian Toggle](https://atlassian.design/components/toggle/usage) · [W3C Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)

## Description exacta

TOGGLE-001 · Usa Toggle para preferencias binarias que aplican al alternar, como «Avisos por correo». Conserva el mismo nombre en ambos estados, foco visible y activación por Espacio en web. Usa Checkbox para selección múltiple y Radio para opciones excluyentes. El anfitrión gestiona persistencia y fallos. No uses el switch como acción Guardar. Ficha local: Toggle / TOGGLE-001.

## Aceptación

Verificar cobertura, bindings, estilo, propiedad de cada capa y reacciones almacenadas según la captura. Probar en navegador el comportamiento aplicable. El código web aplica px únicamente a dimensiones y tipografía medidas. Los temas y aliases se resuelven por los datos canónicos.
