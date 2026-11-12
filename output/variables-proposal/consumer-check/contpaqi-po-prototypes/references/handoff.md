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
- Si falta una familia usa `kind:'local-composition'`, `componentId:'LOCAL-...'`,
  `reason` y `compositionOf` con IDs DS existentes, además del resto de campos.
  Captura también sus componentes DS hijos. Es una decisión local sin aprobación
  de biblioteca; registra cualquier incertidumbre de comportamiento.
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

Marca instancias con el helper incluido (o atributos equivalentes):

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
La identidad y props del brief se cotejan con data-ds-node/data-ds-component/data-ds-props;
esto verifica correspondencia de la declaración, no infiere la API desde píxeles.
Incluye props de estado actual en cada instancia; si cambian entre estados,
usa instancias distintas o `stateProps` por `screen/state` en la entrada del brief.
La captura usa texto visible, excluye descendientes ocultos y falla si encuentra
texto visible fuera de una instancia DS o nodo local-content explícito.

La captura añade `typography_style_id` leído de la propiedad CSS calculada
`--ds-type-style-id`; no deduce la identidad por tamaño o apariencia. `text_runs`
conserva texto visible y métricas de cada fragmento interno, incluidos valores y
placeholders de controles, porque una raíz puede contener varios roles. El
handoff coteja los IDs presentes con el catálogo y adjunta sus hashes en el
Markdown autosuficiente. Comprueba que `sources` incluya el catálogo activo 0.1.2,
la enmienda de formato y las enmiendas tipográficas de las familias utilizadas,
además de sus bases y dependencias. `typography.status` distingue IDENTIFIED, PARTIAL y
NOT_RUN; un marker ausente queda explícito y una captura anterior sin fragmentos
no acredita esta cobertura. IDENTIFIED verifica IDs, no conformidad de métricas:
un descendiente puede sobrescribir una propiedad manteniendo un marker heredado.
Compara métricas y decoración calculadas con la receta canónica antes de Figma;
un dato no capturado queda pendiente, no se infiere. Los cuatro estilos con
`derivedFormattingFrom` incorporan UNDERLINE: conserva su ID completo, no el ID
de origen más una instrucción para añadir subrayado. El consumidor Figma debe
aplicar el TextStyle completo mediante `setRangeTextStyleIdAsync(start,end,id)`
según su flujo y el rango real del destino, sin setters posteriores de formato;
este handoff no ejecuta esa escritura.

Conserva en `limitations` el estado específico de los consumidores utilizados,
según registros y enmiendas. Para la excepción nativa0.1.2, distingue el ID de
receta materializada web del TextStyle real del principal y su escala nativa.
`typography.native_inheritance` conserva fuente/hash del overlay y el estado
reportado, con `destination_validation: NOT_RUN`; la evidencia del DS no valida
la instancia del diseñador. El generador exige esta fuente si la familia incluye
la enmienda nativa o captura un estilo con `derivedFrom`, incluso sin captura
cuando la familia la necesita. No omitir la dependencia si falta: resolver el
snapshot o conservar el bloqueo. Un ID local vacío no demuestra herencia; no
pedir asignar el derivado a la instancia, escalarlo otra vez o restablecerla.
Los estados `VALIDATION_PENDING`/`BLOCKED` se transmiten como tales. El QA web,
un piloto o los 79 estilos no prueban aceptación Figma global ni del prototipo.

El handoff conserva digest/versión compartidos, fuentes por hash, HTML SHA-256,
contratos, enmiendas, props, tokens, Slots, decisiones y capturas con mediciones.
El layout declarado complementa las medidas; si discrepan registra el conflicto.
Un null Figma o un mapeo de propiedades pendiente son omisiones explícitas.
El diseñador debe resolverlos contra el DS real antes de escribir, conservar
Auto Layout/instancias editables y leer de vuelta el resultado. No puede deducir
QA Figma del QA web, aplanar pantallas ni ejecutar reglas de backend.

## Consumo Figma con comprobantes

El consumidor `contpaqi-figma-screens` exige preflight y readback del mapa de componentes. Conservar IDs lógicos, familias, propiedades, fuentes y motivos locales en el traspaso; no inventar claves o nodos Figma que el productor HTML no haya observado. El consumidor resuelve esas claves reales en el maestro BlueHeart confirmado y verifica las instancias, incluidos contenidos de Slots. Una familia inaccesible no es una ausencia de cobertura. El PASS de integridad del paquete no acredita la homologación del resultado Figma.
