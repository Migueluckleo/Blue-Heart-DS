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
Consulta la configuración de tipografía y las referencias de la spec activa para identificar roles y recetas.

Antes de construir, lee `registry/contracts.md` y `registry/implementations.md`.
El catálogo conserva 79 estilos; la excepción nativa0.1.2 tiene evidencia y QA
por consumidor. Un reporte `VALIDATION_PENDING` no significa PASS. Los fallos
históricos no bloquean automáticamente otras familias y el QA web no valida
Figma; transmite los límites pertinentes de la futura reproducción.

Los tres IDs con `derivedFrom` conservan métricas materializadas: consume su
clase sin multiplicar por `scaleFactor` ni añadir otra transformación. La receta
se compara con `recipeScale=1`. La enmienda nativa distingue esa identidad métrica
del estilo real del principal y `nativeScale` en Figma. No pidas asignar el estilo
materializado a la instancia nativa ni aceptar un ID vacío sin cadena real y
pruebas. El handoff debe incluir la enmienda y evidencia del overlay para las
familias afectadas, conservando el estado observado y futura ejecución NOT_RUN.
No generalices estos estilos a otros consumidores ni crees más derivados.

No edites el snapshot ni las recetas para decorar una pantalla; usa Tailwind
para composición local con roles semánticos. No sobrescribas `.ds-*` ni sustituyas
componentes/íconos/artwork por aproximaciones dibujadas.

Aplica un modo únicamente cuando esté definido por los datos delegados del corte. Respeta cualquier excepción de identidad que esté respaldada por el contrato: tokens directos de la colección fija
`character-identity`, sin alias semántico ni variación por tema. Es una excepción
limitada, no permiso para usar primitivas o colores fijos en el resto de la UI.

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
