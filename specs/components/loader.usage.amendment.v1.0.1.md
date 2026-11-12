---
contract_schema: sdd-project/0.2
contract_id: LOADER-001
amendment_id: LOADER-USAGE-001
type: component-amendment
version: 1.0.1
status: DELEGATED_FOR_BUILD
base_contract: specs/components/loader.contract.v1.0.0.md
applies_to: [LOADER-001]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
---

# Loader · Guía de uso v1.0.1

Esta enmienda amplía la guía de [Loader v1.0.0](loader.contract.v1.0.0.md#guía-semántica-normativa). Conserva los seis tamaños, cuatro roles, fases y tiempos de la implementación.

## Guía semántica normativa

Usa Loader para mostrar que una operación sigue en curso sin porcentaje fiable. Acércalo a la región que espera. Si se actualiza una sección, conserva lo demás disponible. El anfitrión controla su aparición y desaparición. La fuente recomienda evitar parpadeo en esperas breves y acompañar el indicador con texto si la espera supera aproximadamente dos segundos.

| Contexto | Haz | Evita |
|---|---|---|
| Guardado en Button | Conserva el ancho y comunica «Guardando…». Usa la variante Loader indicada por la receta. | Añadir un segundo anuncio para un spinner que ya está dentro de un botón ocupado. |
| Actualización de una lista | Mantén los resultados anteriores cuando sigan siendo útiles y agrega «Actualizando movimientos…» cerca del listado. | Sustituir toda la pantalla cuando solo se actualiza una sección. |
| Importación con avance medible | Usa progreso determinado cuando se conoce el avance, por ejemplo «2 de 8 archivos». | Usar la animación circular para comunicar un porcentaje conocido. |
| Error de carga | Retira el indicador cuando termina la espera y muestra el error y la acción disponible mediante el anfitrión. | Dejar girando el indicador como único mensaje de error o presentar el fin de la animación como éxito. |

**Variantes.** Elige el diámetro entre 16, 20, 24, 40, 64 y 88 px según el espacio y la jerarquía del anfitrión. Usa brand para el tema, neutral o strong en una superficie clara y on-color sobre un fondo de color adecuado. El arco señala actividad y el riel hace visible su recorrido. El Spinner y los sets de fases son internos. La composición es fija y P-SLOTS queda NOT_APPLICABLE.

**Accesibilidad.** El indicador no toma foco. Si Loader proporciona un anuncio independiente, el anfitrión le da un mensaje con nombre de proceso y estado de lectura cortés. Cuando vive dentro de Button ocupado, es decorativo. Comprueba la legibilidad contra el fondo real y respeta movimiento reducido. La animación almacenada no mide fotogramas por segundo.

**Contraste editorial.** Carbon orienta el uso inline junto a la acción y la redacción del mensaje. Atlassian distingue esperas indeterminadas de procesos con avance medible. Sus estados y configuraciones no amplían el API BlueHeart. [Carbon Inline loading](https://www.carbondesignsystem.com/building-blocks/core/components/inline-loading/guidelines) · [Atlassian Spinner](https://atlassian.design/components/spinner/usage) · [Atlassian Progress bar](https://atlassian.design/components/progress-bar/usage)

## Description exacta por set

| Set | ID maestro | Description |
|---|---|---|
| Loader | 23:680 | LOADER-001 · Uso v1.0.1. Usa Loader para espera indeterminada cerca de la región afectada, como «Actualizando movimientos…». Si puedes medir el avance, usa progreso determinado. Elige 16/20/24/40/64/88 px según espacio, brand para tema, neutral o strong sobre claro y on-color sobre color. El anfitrión comunica espera, fin y error. Dentro de Button ocupado el indicador es decorativo. Evita dejarlo girando como aviso de error. Ficha local: Loader / LOADER-001. |
| __Loader/Frames/extra-small | 23:74 | LOADER-001 · Uso v1.0.1. Fases internas de Loader extra-small. Consume el set Loader público para elegir tamaño y rol de color. El anfitrión aporta el estado de espera. Evita instanciar una fase directamente. |
| __Loader/Frames/small | 23:171 | LOADER-001 · Uso v1.0.1. Fases internas de Loader small. Consume el set Loader público para elegir tamaño y rol de color. El anfitrión aporta el estado de espera. Evita instanciar una fase directamente. |
| __Loader/Frames/medium | 23:268 | LOADER-001 · Uso v1.0.1. Fases internas de Loader medium. Consume el set Loader público para elegir tamaño y rol de color. El anfitrión aporta el estado de espera. Evita instanciar una fase directamente. |
| __Loader/Frames/large | 23:365 | LOADER-001 · Uso v1.0.1. Fases internas de Loader large. Consume el set Loader público para elegir tamaño y rol de color. El anfitrión aporta el estado de espera. Evita instanciar una fase directamente. |
| __Loader/Frames/extra-large | 23:462 | LOADER-001 · Uso v1.0.1. Fases internas de Loader extra-large. Consume el set Loader público para elegir tamaño y rol de color. El anfitrión aporta el estado de espera. Evita instanciar una fase directamente. |
| __Loader/Frames/2x-large | 23:559 | LOADER-001 · Uso v1.0.1. Fases internas de Loader 2x-large. Consume el set Loader público para elegir tamaño y rol de color. El anfitrión aporta el estado de espera. Evita instanciar una fase directamente. |
