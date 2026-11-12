# Componentes locales del prototipo

## Decidir con evidencia

| Resultado de comparar necesidad y DS | Acción |
|---|---|
| Existe un componente que cubre el requisito | Reutilízalo con sus propiedades, variantes y Slots admitidos. |
| Existe una composición de componentes que lo cubre | Compón instancias; crea un anfitrión local reutilizable si aporta estructura o propiedades necesarias. |
| Ninguna familia cubre la necesidad | Crea un componente local con anatomía y comportamiento de prototipo justificados por patrones/tokens del DS. |
| El componente adecuado existe pero está inaccesible o no es importable | Registra `UNAVAILABLE_EXISTING_COMPONENT`; no lo clasifiques como faltante ni lo redibujes en silencio. Continúa lo independiente. |
| Fuentes normativas discrepan o falta un token necesario | Registra el conflicto/hueco y bloquea únicamente el alcance dependiente. |

La autorización para componer elementos nuevos locales no autoriza a reemplazar una familia existente inaccesible con una imitación. Si el usuario ya autorizó expresamente esa reconstrucción local, puedes realizarla desde geometría y contratos documentados, identificándola como réplica local sin vínculo con la biblioteca. Si falta esa autorización y es indispensable, presenta la limitación concreta y la decisión pendiente una sola vez, no una confirmación por instancia.

Los títulos, textos y adornos propios de una pantalla pueden llegar como `kind: local-content`, con tokens canónicos, razón y `identity: null`. Represéntalos mediante capas editables dentro de la composición; no requieren fingir una familia del DS, un principal reutilizable o una lista `compositionOf`. Conserva su identidad local y las medidas/jerarquía documentadas.

## Ficha local mínima

Guarda fuera del archivo maestro una ficha por componente local, que puede ser una entrada del reporte o del handoff:

- ID estable local, nombre, propósito y razón por la que los componentes existentes no bastan.
- Contratos/versiones/enmiendas y patrones reutilizados; IDs de las dependencias y `compositionOf` cuando proceda.
- Anatomía, propiedades editables, variantes/estados realmente necesarios y contenido de muestra.
- Tokens por propiedad, layout, medidas, overflow, fuentes y comportamiento de las regiones variables.
- `slot_applicability: REQUIRED | NOT_APPLICABLE | UNRESOLVED`, justificación y mecanismo real.
- Decisiones de producto/composición locales, sin presentarlas como reglas del DS; faltantes materiales separados.
- IDs reales de principal, variantes, instancias consumidoras y evidencia de QA posterior.

No requiere una nueva norma de 21 secciones ni aprobación rutinaria del DS. No modifica el contrato base, no añade componentes al índice y no publica nada. Usa un área de componentes locales del archivo de prototipo y separa sus principales de las pantallas de revisión; sigue las convenciones existentes del destino cuando sean compatibles.

## Slots y propiedades

Lee `assets/design-system/protocols/SLOTS-REVIEW-AND-IMPLEMENTATION.md` para regiones cuya cantidad, orden o composición cambie. Un texto editable usa propiedad de texto; visibilidad de una parte fija puede usar booleana; sustitución única puede usar instance swap. Esos mecanismos no acreditan una lista extensible.

Cuando corresponda un Slot, verifica en la documentación de la API disponible que pueda crearse, editarse y leerse. Prefiere el mecanismo nativo si cumple el contrato. No basta un frame llamado Slot, Auto Layout, editar hijos del principal o exponer una cantidad fija de instancias. No equipares `children`/props de React con el Slot de Figma.

Prueba desde una instancia consumidora las operaciones requeridas: agregar, quitar y, si aplica, reordenar/sustituir; conserva su vínculo y los bindings. Incluye una cantidad menor y mayor que la muestra, contenido largo y ancho reducido. Prueba vacío solo con su política conocida; si no existe, registra el efecto estructural y el pendiente de producto. Los números de prueba no definen límites.

Si una capacidad esencial no está soportada, declara `TOOL_LIMITATION` y deja el requisito pendiente. Una alternativa requiere autorización aplicable y debe describirse como alternativa, nunca como Slot nativo validado. Continúa el resto de la pantalla sin simular el resultado faltante.

## Estilo y comportamiento

Los valores normativos provienen de los contratos y datos canónicos. Para la geometría nueva del contenedor, utiliza patrones, escalas y tokens documentados y registra cualquier medida local necesaria como decisión de composición. No presentes un número inferido de una captura como regla universal ni inventes tokens para etiquetarlo.

Expón las propiedades necesarias para que el usuario pueda editar el prototipo. Conecta los estados/interacciones solicitados mediante capacidades Figma comprobadas; no inventes variantes para completar un producto cartesiano. Las acciones de prototipo son demostraciones de flujo, no backend ni validación de comportamiento web.
