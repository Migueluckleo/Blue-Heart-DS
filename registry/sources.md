# Recepción de fuentes BlueHeart

Registrar las primeras ligas en [config/figma-links.json](../config/figma-links.json) y completar esta bitácora según [P02](../protocols/02-DOCUMENT-INGESTION-AND-STORAGE.md). Las listas vacías y campos null representan pendientes.

| Campo | Rol y datos a registrar |
|---|---|
| root_source | Raíz de solo lectura para Specs, variables, JSON canónicos y componentes. |
| foundation_sources | Fuentes de variables, estilos y assets. Entradas con URL, alcance, versión o captura, y localizadores observados. |
| family_sources | Una entrada por fuente de familia o patrón, con familia, URL, nodo, versión o captura y alcance. |
| master_destination | Archivo maestro confirmado para construcción P04. URL, file key leído, permiso y alcance autorizado. |
| consumption_sandbox | Archivo separado para prototipos editables. URL, file key leído, permiso y alcance autorizado. |

Conservar la URL original, quién la entregó, cuándo, rol, versión y hash del snapshot. Confirmar identidad y accesos en la fase solicitada. Para cada artefacto distinguir IDs de origen y destino, guardar el original y vincularlo desde el contrato. Las ligas son evidencias de entrada. La autoridad se registra con su alcance y QA.

## Ligas recibidas

El usuario confirmó los roles el 11 de noviembre de 2026. Blue Heart DS queda como raíz de solo lectura y AI Blueheart DS como destino de trabajo P04. [La configuración](../config/figma-links.json) conserva las ligas tal como se entregaron. El selector de la URL no asigna página de trabajo. La comprobación de solo lectura mediante el conector oficial de la cuenta de CONTPAQi devolvió Cover en la raíz y Page 1 en el maestro. Una lectura con Plugin API confirmó editor Design y una página en el maestro. La escritura efectiva sigue `UNVERIFIED`. Page 1 es una observación, sin asignación de familia. La verificación de acceso se recibió del chat coordinador. No se creó ni modificó contenido.

[Captura de variables](../sources/figma-snapshots/variables-2026-11-11/capture-manifest.json) de solo lectura. Se reconciliaron las 3 colecciones y 1.187 IDs. Quedan pendientes fuentes por familia, estilos y assets fuera del alcance, la página de cada familia y el sandbox de consumo.

## Buttons, Loader y Phosphor

[Manifiesto de lectura](../sources/figma-snapshots/buttons-loader-2026-11-11/manifest.json) de Buttons `11:128` y Loader `245:19` en la raíz. Las versiones fuente indicadas por sus descripciones están preservadas por hash. [Regla Phosphor](../references/PHOSPHOR-ICONS.md) y [lectura de la key vinculada](../implementations/figma/buttons-loader-2026-11-11/phosphor-import.readback.json).

## Stepper · 2026-11-12

La [captura del nodo 1020:530](../sources/figma-snapshots/root-families-2026-11-11/stepper-source.json) conserva el set de 18 variantes, el ejemplo de cuatro pasos, el auxiliar remoto y los bindings por instancia. [Phosphor oficial](../sources/figma-snapshots/root-families-2026-11-11/phosphor-stepper.json) confirma CheckFat e Image Fill.

## Logos · 2026-11-12

El usuario autorizó la [página Logos de Librería v1.1.0](https://www.figma.com/design/9zs5RMR8LB5wHjW9Bd59BA/Libreria-v1.1.0?node-id=40-93) como fuente de solo lectura para consumo en AI Blueheart DS. La [captura original](../sources/figma-snapshots/logos-2026-11-12/inventory.json) identifica 5 sets, 68 variantes y 12 marcos sueltos. El [JSON delegado](../specs/data/logos.v1.0.0.json) conserva el hash de la captura y la selección parametrizada.
