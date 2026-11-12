# Consumo del DS

Aplica `registry/DEC-AI-TECHNICAL-CLOSURE-001.md` del corpus: el agente documenta y verifica el trabajo solicitado; la revisión humana es opcional y no bloquea el cierre técnico. Conserva estados históricos sin simular aprobación. Los contratos delegados siguen siendo distintos de aprobaciones humanas y los fallos técnicos conservan su efecto.

Consulta `references/components.json` de la habilidad para localizar IDs,
contratos, enmiendas, exports y evidencia Figma. El corpus portable está en
`assets/design-system/`; al inicializar se copia a `references/design-system/`.
Lee `registry/contracts.md`, las bases/enmiendas seleccionadas y la documentación
web de esas familias. La fecha o el número mayor no sustituyen una enmienda por
alcance. El snapshot incorpora el corpus vigente seleccionado y su cierre de
dependencias; la lista `components` del manifiesto define cobertura, no una cifra
fija escrita en las instrucciones.

`implementations/web/src/index.ts` exporta los componentes reales;
`src/components/` y `src/generated/` contienen recetas y geometrías originales.
`src/styles.css` aplica Tailwind y los tokens configurados del corte.
`src/generated/tokens.manifest.json` remite a JSON canónico y extensiones.
La tipografía de cada componente se conserva desde su contrato, datos delegados e implementación React. Comprueba familia, peso, tamaño, altura de línea, espaciado y decoración cuando apliquen. Documenta como local la decisión tipográfica de un texto propio sin regla aplicable.

No edites el snapshot ni las recetas para decorar una pantalla; usa Tailwind
para composición local con roles semánticos. No sobrescribas `.ds-*` ni sustituyas
componentes/íconos/artwork por aproximaciones dibujadas.

Aplica los modos y las excepciones de identidad que estén definidos en el contrato y en sus datos delegados.

Revisa Slots por región: `REQUIRED`, `NOT_APPLICABLE` justificado o `UNRESOLVED`.
No limites cardinalidad por la cantidad del ejemplo. Registra contenido permitido,
operaciones y cantidades variables. `children`/arrays de React no demuestran Slots
nativos Figma. Si falta un componente, compón los disponibles conservando tokens
y registra `local-composition`, motivo, bases, comportamiento y limitaciones;
no modifiques la biblioteca ni atribuyas esa decisión al DS.

Las referencias y hashes viajan con el handoff. Si el diseñador usa otra versión,
contrasta el digest o todas las fuentes afectadas y resuelve discrepancias; nunca
mezcles versiones silenciosamente. La actualización del paquete es un release
separado, no una modificación improvisada dentro de este flujo de prototipado.

La decisión de iconografía Phosphor en `assets/design-system/references/PHOSPHOR-ICONS.md` se aplica a todo BlueHeart. Consume la key oficial verificada en Figma y el paquete oficial en React. Conserva peso, tamaño y variables del componente consumidor.
Las familias con `consumption_targets: [figma]` se consultan como referencia del traspaso al diseñador. `LOGOS-001` se instancia en AI Blueheart DS desde la skill Figma. El inventario, la conformidad y el handoff del HTML admiten únicamente familias habilitadas para web. Para Header aplica el alcance y el asset de su contrato.
