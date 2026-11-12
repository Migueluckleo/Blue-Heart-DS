# Evidencia y prompt para Figma

Completa `brief.json` según lo implementado; nunca copies la demostración como si
fuera el resultado. `npm run handoff` entrega HTML, Markdown, referencias/handoff.json
y capturas. El Markdown invoca `$contpaqi-figma-screens`; no ejecuta esa habilidad.
Incluye un bloque JSON autosuficiente para pegar únicamente el Markdown en la
habilidad de Figma. HTML/PNG/archivos de referencia son adjuntos opcionales; si no
están disponibles no se afirma comparación visual contra ellos.

- `title`, `objective`, `theme`: tema oficial con mayúscula inicial.
- `viewports`: lista de `{width,height}` enteros positivos.
- `screens`: `{id,name,entry,hash?,layout,content,states}`. IDs estables sin espacios.
  Layout explica medidas, jerarquía, espaciado, alineación, overflow y responsive.
- Cada estado: `{id,name,hash?,actions,expect,nodes}`. `actions` reproduce desde
  recarga: `{type:'click',selector}`, `{type:'fill',selector,value}`,
  `{type:'press',selector,key}`, check/uncheck o select/value. No código arbitrario.
  `expect` tiene al menos `{selector,text?,visible?}`; `nodes` enumera instancias
  que deben verse. Incluye un estado con teclado y otros de retorno/cancelación.
- `transitions`: `{from,action,to,feedback}` con IDs de pantalla existentes;
  puede quedar vacío solo para una vista sin navegación. Estados del mismo frame
  se describen también en acciones y feedback.
- `components`: una entrada por instancia con `instanceId`, `componentId` del
  manifiesto, `exportName`, `kind:'ds'`, `placement`, `props` objeto, `tokens` lista
  de nombres canónicos, `slots` y `omissions` listas. Cada slot es
  `{name,status,content}`, status REQUIRED/NOT_APPLICABLE/UNRESOLVED con justificación
  en content. `figmaProperties` contiene el mapeo declarado real, si se conoce;
  omitirlo registra pendiente. Contrato, versión, hashes e IDs Figma provienen
  del manifiesto, no de nombres visualmente parecidos.
- `componentFamilyTracking` incluye exactamente una entrada `{componentId, applicability, reason}` por familia devuelta por `npm run inventory`. La lista se reconcilia con el manifiesto y las Specs del corte. Usa `APPLIES` si el brief requiere la familia y `NOT_APPLICABLE` con el motivo cuando no la usa. Cada familia aplicable requiere al menos un control mapeado. El resultado final se calcula como `VERIFIED`, `NOT_APPLICABLE` o `EXCEPTION` a partir del mapa, el código verificado y las instancias observadas en captura PASS.
- `componentRequirements` se escribe desde el brief antes del código. Cada entrada usa `{instanceId, role, componentId, coverage, exportName, reason, evidence}`. `role` describe lo que hace el control. `evidence` es una ruta del contrato, enmienda o ficha web de la familia en el corte. Para `COMPATIBLE`, indica el export real y explica qué parte del API satisface el brief. Para `SPEC_WITHOUT_WEB`, conserva la familia y su spec. Para `WEB_INCOMPATIBLE`, identifica qué variante, propiedad o comportamiento requerido falta en el API disponible. Ambas excepciones usan `exportName: null`. Para `NO_SPEC`, usa `componentId: null`, `exportName: null` y `evidence: "implementations/web/components.registry.json"`, con el alcance y términos de la búsqueda. Si la vista carece de controles, justifícalo en `controlsAbsent`.
- `npm run plan` fija `references/component-plan.json` al manifiesto verificado. Resuelve las dependencias transitivas declaradas en contratos y sus enmiendas, conserva hashes y exports disponibles. Al escribir el código, incluye cada control del mapa en `components` y en `nodes` de al menos un estado de captura. Para una excepción usa `kind: 'local-composition'`, el mismo `reason` y `compositionOf` con las familias web reutilizadas, si aplica. Para `SPEC_WITHOUT_WEB` o `WEB_INCOMPATIBLE`, añade `exception: {componentIds: [componentId], reason, source: evidence}`. Para `NO_SPEC`, la búsqueda y su evidencia quedan en el mapa. La excepción debe reflejar la carencia concreta de ese control.
- Antes del traspaso, revisa el código, el HTML y los estados contra el mapa. El build verifica los imports de `DSNode`, el export elegido y el inventario. El enforcer detecta además roles y estructuras reconocibles. Corrige toda sustitución de un export compatible. El traspaso conserva el mapa, el cotejo del build, las excepciones con fuentes y los hashes del código de prototipo y HTML.
- Títulos, textos, adornos y contenido local fuera de una instancia DS llevan su
  propio nodo estable `kind:'local-content'`, `componentId:'LOCAL-...'`, `reason`
  y tokens canónicos (sin compositionOf obligatorio). No basta concatenar todos
  los textos dentro de un contenedor: deben conservar su caja, orden y tipografía.
- `decisions` y `limitations`: listas de decisiones, supuestos y capacidades
  omitidas. `checks`: `{name,status,evidence}`; status PASS/FAIL/BLOCKED/NOT_RUN.
  Registra visual/teclado/recorrido por separado. Estos checks son declarados;
  no sustituyen el resultado calculado de capture/report.json.
- `figmaTarget`: URL proporcionada por el usuario o null. No inventar destino ni
  usar implícitamente el maestro.

Importa `DSNode` desde `./evidence` y el componente desde `@contpaqi/ui` o el índice de `ui/`:

```tsx
const props = {variant: 'primary' as const, showLeftIcon: false, showRightIcon: false};
<DSNode id="guardar" component="BUTTON-001" props={props}>
  <Button {...props} onClick={guardar}>Guardar</Button>
</DSNode>
```

`DSNode` usa display:contents; la captura mide su primer hijo real. Para una
composición de varios hermanos marca un contenedor común explícito. Marca también
los contenedores estructurales relevantes: la captura
registra parent_id y orden para conservar la jerarquía, además de sus medidas.
El build comprueba que el hijo directo de cada DSNode oficial sea un export de
su familia, incluso con alias de importación. Genera `data-ds-export` en la
salida. La captura coteja identidad, export y props con el inventario y guarda
los hallazgos por estado.
Incluye props de estado actual en cada instancia; si cambian entre estados,
usa instancias distintas o `stateProps` por `screen/state` en la entrada del brief.
La captura usa texto visible, excluye descendientes ocultos y falla si encuentra
texto visible fuera de una instancia DS o nodo local-content explícito.

La captura registra familia, peso, tamaño, altura de línea, espaciado y decoración en `computed_style` y `text_runs`, incluidos valores y placeholders. `typography` indica si se observaron rangos de texto. Cada instancia conserva su contrato y enmiendas por hash. Compara las medidas con esas fuentes y conserva las diferencias para el traspaso. Cuando se trate de texto propio, registra el criterio local y las métricas observadas.

El handoff conserva digest/versión compartidos, fuentes por hash, HTML SHA-256,
contratos, enmiendas, props, tokens, Slots, decisiones y capturas con mediciones.
El layout declarado complementa las medidas; si discrepan registra el conflicto.
Un null Figma o un mapeo de propiedades pendiente son omisiones explícitas.
El diseñador debe resolverlos contra el DS real antes de escribir, conservar
Auto Layout/instancias editables y leer de vuelta el resultado. No puede deducir
QA Figma del QA web, aplanar pantallas ni ejecutar reglas de backend.

## Consumo Figma con comprobantes

El consumidor `contpaqi-figma-screens` exige preflight y readback del mapa de componentes. Conservar IDs lógicos, familias, propiedades, fuentes y motivos locales en el traspaso; no inventar claves o nodos Figma que el productor HTML no haya observado. El consumidor resuelve esas claves reales en el maestro BlueHeart confirmado y verifica las instancias, incluidos contenidos de Slots. Una familia inaccesible no es una ausencia de cobertura. El PASS de integridad del paquete no acredita la homologación del resultado Figma.
