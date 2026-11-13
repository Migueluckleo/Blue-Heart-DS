# P04. Construcción en Figma

**Versión:** 0.2.4 · **Sustituye al antiguo P03 de construcción.**

## 1. Propósito y precondiciones

Materializar un contrato MD aprobado en el archivo de reconstrucción. Lee [AGENTS.md](../AGENTS.md), [P03](03-CONTRACT-SYNTHESIS.md), [P05](05-SELF-DOCUMENTATION-AND-TRACEABILITY.md) y la validación de implementación de [P06](06-QA-AND-VALIDATION.md).

Antes de escribir deben cumplirse todas estas condiciones: contrato aprobado y vigente para el alcance **o** contrato `DELEGATED_FOR_BUILD` bajo la delegación de [P03](03-CONTRACT-SYNTHESIS.md) y [DEC-AI-TECHNICAL-CLOSURE-001](../registry/DEC-AI-TECHNICAL-CLOSURE-001.md); JSON referenciado verificable si aplica; dependencias resueltas; preparación `READY` para Figma; permisos y capacidades comprobados con [P01](01-ENVIRONMENT-AND-TOOLS.md); y solicitud de construcción autorizada. En modo delegado, la revisión humana es opcional y no bloqueante; registra la delegación y no atribuyas aprobación del contenido al usuario.

No construyas directamente desde un nodo fuente o un JSON recién recibido. Esos materiales pasan por P02/P03. No interpretes la aprobación de documentación operativa como aprobación del diseño.

## 2. Destino autorizado de reconstrucción

Lee el maestro confirmado en [Recepción de fuentes](../registry/sources.md). Un destino pendiente bloquea la escritura. Verifica el file key real, la página y el permiso antes de mutar. Mantén separados archivo fuente, maestro y sandbox de consumo.

## 3. Regla obligatoria: una página por familia de componente

Cada familia tiene una página dedicada. Al cierre de una operación que la afecte, sus hijos directos son únicamente los componentes principales o component sets de la familia. Las variantes viven dentro de sus sets. Description y enlace son metadatos de los nodos.

No crees páginas por variante, tamaño o estado. No mezcles familias no relacionadas. No utilices `Page 1` por conveniencia.

Antes de crear una página, lista las existentes, resuelve el nombre canónico de la familia desde el contrato y consulta el registro de implementaciones. Reutiliza la página correcta cuando exista. Si hay dos candidatas o una identidad ambigua, registra el conflicto en vez de duplicar.

### Nombramiento semántico y creación

El nombre exacto de la página se toma del contrato aprobado o de una decisión aprobada y acotada a esa familia. Debe identificar **qué componente es** mediante el sustantivo funcional de la taxonomía del sistema, no cómo se ve o en qué estado está. No incluyas color, variante, tamaño, estado, versión, proveedor, archivo de origen ni prefijos genéricos de trabajo. La convención de idioma y pluralización se resuelve por decisión aplicable.

En el preflight, compara el nombre aprobado con la lista de páginas, el contenido y el registro. Si la página de la familia existe, reutilízala. Si no existe y la operación `CREATE` está autorizada, crea **una sola página** con ese nombre exacto y lee de vuelta su ID y nombre antes de añadir componentes. Si el nombre falta, hay colisión, una página candidata contiene otra familia o haría falta renombrar/mover contenido, registra `CONFLICT`/`BLOCKED` y solicita la decisión específica; no crees `Page 1`, una página alternativa o un duplicado silencioso.

Registra nombre y page ID reales. No inventes la taxonomía ni el nombre de página a partir de un ejemplo genérico. No muevas contenido ajeno para forzar esta regla sin autorización.

Las instancias de dependencias pueden anidarse dentro del componente consumidor. Las definiciones principales de dependencias permanecen en sus propias páginas. No dupliques un componente principal para simular una dependencia.

Foundations/tokens no son familias de componentes. Su representación visual requiere una organización aprobada específica. Crear variables no obliga a inventar una página de muestras.

### Orden de las páginas al dar de alta un componente

Al cierre de cada alta de componentes en AI Blueheart DS, aplica [DEC-FIGMA-FAMILY-PAGE-ORDER-001](../registry/decisions.md#dec-figma-family-page-order-001). Lee el listado del maestro, identifica las páginas oficiales de familias por sus nombres canónicos e IDs y ordena ese conjunto de A a Z por el nombre visible. Mantén las familias en un bloque contiguo antes del separador de Playground. Conserva en su lugar portadas y foundations. Playground y su separador permanecen juntos después de la última familia y avanzan una posición cuando crece el bloque. La operación conserva los IDs, nombres, variantes y contenido. Cada página oficial sigue reservada a los maestros y sets de su familia.

Guarda la lectura inicial y final del listado y aplica el [control de P06](06-QA-AND-VALIDATION.md#orden-de-las-páginas-en-altas-de-componentes). El disparador de esta regla es el alta de un componente en el maestro.

## 4. Preflight de cada construcción

Incluye la revisión de [P-SLOTS](SLOTS-REVIEW-AND-IMPLEMENTATION.md): decisión de aplicabilidad, contrato de cada región y capacidad real de edición/lectura desde instancias consumidoras. Si se requiere Slot, una colección fija de hijos, booleanas o un frame nombrado Slot no satisface el requisito. No construyas el alcance afectado sin definir el mecanismo y las pruebas correspondientes; conserva el estado pendiente de las limitaciones, sin extender el bloqueo a familias no afectadas.

Lee la versión exacta del contrato y datos. Confirma aprobación y que no haya cambios de fuentes posteriores. Inspecciona el estado real del destino, localiza implementaciones existentes y clasifica la tarea como `CREATE`, `UPDATE`, `MIGRATE` o `VALIDATE_ONLY`.

Prepara un plan con requisitos `REQ-...`, nombre exacto de página, objetos afectados, dependencias, campos que se escribirán, bindings esperados y comprobaciones de lectura posterior. No añadas variantes por completar combinaciones teóricas.

Verifica primero los bytes y el digest del inventario JSON delegado por el contrato de foundations. Resuelve el mapa de tokens del componente desde sus IDs lógicos y aliases en ese JSON hacia las variables **locales** del maestro registrado, con ID de origen, ID de destino, colección, modo y rol de uso por parte/estado. Comprueba que los tokens de color y tipografía necesarios existen, tienen el tipo compatible, conservan sus aliases y resuelven en los modos aplicables. No marques `READY` a una familia cuyos bindings obligatorios o nombre de página no puedan determinarse. Si el JSON vigente cambió respecto del aprobado, detén el mapeo afectado hasta decidir la nueva versión.

Haz una captura estructural previa de los elementos que vayas a actualizar cuando la herramienta lo permita. No ejecutes cambios si no puedes determinar qué recurso estarías reemplazando.

## 5. Identidad y reconstrucción de tokens

Mantén separados los IDs de origen y los IDs asignados por el destino. No cambies el inventario original para reemplazarlos. Genera un mapa derivado de implementación que permita resolver:

```text
source file + collection ID + variable ID + mode ID
                ↓
destination file + collection ID + variable ID + mode ID
```

Crea/reutiliza primero las colecciones y modos requeridos, después las variables y finalmente los aliases cuando todas las referencias necesarias existan. Conserva nombres, valores, tipos, descripciones, scopes y `codeSyntax` aprobados; si una API no permite representarlos, registra `TOOL_LIMITATION`, no una equivalencia inventada.

Los aliases en el destino deben apuntar a sus variables correspondientes del destino según el mapa, no a IDs antiguos ni a valores literales resueltos. Comprueba las relaciones por identidad lógica, no por igualdad del color.

Los valores primitivos siguen siendo literales cuando así están definidos. La prohibición de hardcodear aplica a consumidores que deben usar una referencia, no a borrar los valores fuente del sistema.

Si una operación se interrumpe, lee qué se creó antes de repetirla. Actualiza el mapa y el diario por lote. No ejecutes toda la importación de nuevo a ciegas.

## 6. Construcción de componentes

Implementa únicamente anatomía, jerarquía, propiedades, variantes, estados, layout, dimensiones, contenido, tokens, interacciones y accesibilidad documentados para Figma.

Usa bindings reales donde los exige el contrato. Un color pegado con el mismo valor no satisface un binding. No sustituyas un token por otro de igual apariencia ni desacoples instancias para resolver faltantes.

Para componentes reconstruidos desde otra biblioteca, consume por defecto los roles de **color** y **tipografía** mediante variables locales de componente que apuntan a semánticos del maestro registrado y conserva los aliases hacia primitivas. Enlaza cada propiedad que Figma permita: fills, strokes y color de texto; familia, peso, tamaño, interlineado y espaciado de letras cuando existan variables compatibles; además de spacing, size, radius y stroke cuando el contrato los exija. Un estilo o literal observado en la fuente no reemplaza automáticamente una variable local. Si falta token, binding o capacidad de la herramienta, registra la excepción o bloqueo concreto y vuelve a P03 para decidirlo; no hardcodees ni fabriques equivalencias. En el flujo normal, una excepción de uso directo de primitive o literal necesita aprobación explícita para esa propiedad y familia. Cuando falte una categoría compatible, una excepción para conservar un literal observado se decide y registra por propiedad y familia.

Para una extensión semántica autorizada, verifica el nuevo token, sus modos, scopes y aliases antes de vincular consumidores. El rol de uso del contrato y la descripción canónica gobiernan el binding. Conserva intactos los bytes del inventario de origen.

Si hay una propiedad conceptual sin correspondencia demostrada en la herramienta, usa el mapeo aprobado o detén la operación afectada. No declares que Figma implementa comportamiento de navegador a partir de una etiqueta visual.

El diseño interno de la página sigue el contrato o una decisión de organización aprobada. No impongas nuevas secciones ni componentes para embellecer la documentación.

## 7. Cambios y recuperación

Trabaja en lotes pequeños y verificables, con dependencias antes que consumidores. Registra acciones planeadas y realizadas. La escritura parcial debe reflejarse como parcial, no como `IMPLEMENTED` de todo el componente.

Eliminar, reemplazar destructivamente, renombrar en bloque, desconectar instancias, aplanar o alterar relaciones requiere autorización explícita aplicable. La migración de contratos no autoriza por sí misma estas acciones.

Ante error, detén escrituras dependientes, lee el estado real, registra los recursos afectados y decide recuperación basada en evidencia. No prometas rollback automático si el adaptador no lo ofrece; usa restauración comprobable o escala.

## 8. Lectura posterior y cierre

Después de cada lote significativo y de la última corrección, lee los recursos reales. Comprueba identidad, página, jerarquía, propiedades, valores por modo, referencias y bindings disponibles. Ejecuta el control TOKEN-QA-01 de [P06](06-QA-AND-VALIDATION.md#control-obligatorio-de-tokens-en-altas-y-correcciones). Captura respuestas y IDs para [P05](05-SELF-DOCUMENTATION-AND-TRACEABILITY.md).

Entrega el resultado a [P06](06-QA-AND-VALIDATION.md). Una respuesta exitosa de escritura no demuestra conformidad. Si solo puedes confirmar la creación pero no los atributos obligatorios, registra la limitación y no declares `VALIDATED`.

La implementación debe poder reconstruirse y compararse contra la misma especificación sin alterar el contrato para hacer pasar QA.

## Description de componentes y sets

En el lote autorizado escribe el texto de la [guía normativa](../references/USAGE-GUIDE.md) en `Description` de cada componente principal o component set del maestro. La descripción comunica propósito, jerarquía y selección de variantes. Añade el enlace a la documentación mediante el campo disponible. Registra cualquier limitación comprobada de ese campo. Lee Description y enlace en cada nodo real y vincula esa evidencia con el contrato y la ficha.

## Inventario de la página de familia

Lee la lista completa de hijos de la página afectada y los hijos de cada set. Comprueba que solo queden componentes principales y sets propios, con las variantes dentro de sus sets. Guarda IDs, tipos y resultado en el comprobante. Un nodo ajeno se registra como hallazgo. Pide una decisión de disposición antes de borrarlo o moverlo y conserva el alcance afectado pendiente. La guía y el enlace residen en metadatos.
