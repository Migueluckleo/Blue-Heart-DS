# Construcción verificable en Figma

## Preparar herramientas y archivo

Descubre las herramientas Figma disponibles y carga sus esquemas conjuntamente cuando se ofrezcan como herramientas diferidas. Usa los manuales oficiales `figma-use` y `figma-generate-design`; carga `figma-generate-library` únicamente cuando construyas componentes locales. Si falta la capacidad necesaria, conserva el mapeo y describe el límite sin afirmar que la pantalla fue creada.

Para un archivo nuevo pedido por el usuario, carga `figma-create-new-file`, resuelve el plan mediante su procedimiento y usa el `file_key` devuelto. Si requiere escoger entre varios planes, la selección es una decisión real pendiente. No inventes un plan o un file key. El destino de todas las mutaciones es el prototipo autorizado; el archivo maestro BlueHeart se consulta en lectura.

Antes de escribir, inspecciona páginas, frames existentes, principales locales, variables, estilos y convenciones del destino. Limita la edición a los nodos identificados; no reorganices contenido ajeno. Registra el archivo, las páginas y los IDs reales, tanto para trabajo nuevo como para modificaciones.

Lee la tipografía de los componentes utilizados en sus [contratos y datos delegados](design-system.md). Conserva el estilo, métricas, decoración y bindings que trae el principal. Comprueba los rangos cuyo contenido cambia desde propiedades de instancia.

## Resolver componentes, variables y estilos

El diseñador proporciona el archivo destino; no necesita pegar la URL de la biblioteca maestra. Los localizadores del catálogo permiten identificarla, pero no conceden acceso. Para reutilizar componentes publicados, comprueba que la cuenta pueda consumir la biblioteca del DS y que esté disponible en el destino. Si no hay componentes utilizables allí y falta la biblioteca, informa: «Habilita la biblioteca del sistema de diseño en este archivo de Figma y comprueba que tu cuenta tenga acceso». No exijas permiso de edición del maestro ni confundas specs públicos con una biblioteca instalada. No cambies la configuración de bibliotecas automáticamente.

Prioriza componentes reales del DS, incluidos los que ya estén disponibles en el destino con identidad comprobada. La falta de acceso a una familia existente no autoriza reconstruirla: conserva `UNAVAILABLE_EXISTING_COMPONENT`. Crea un componente local nuevo cuando el catálogo no cubra la necesidad, según [composición local](local-components.md). La configuración del cliente, MCP y biblioteca se comprueba mediante lecturas; no prometas compatibilidad universal.

1. Comienza por contratos e índice del paquete. En el flujo oficial de pantallas, revisa Code Connect de las familias necesarias si está incluido; registra ausencia si no lo está.
2. Usa localizadores documentados para leer el componente y su set en el archivo fuente. Revisa también instancias pertinentes ya presentes en el prototipo. Verifica claves, propiedades reales, variantes, overrides, Slots, modos y bindings contra el contrato; conserva la diferencia entre un set, principal e instancia.
3. Si aún hay familias sin resolver, descubre bibliotecas disponibles antes de buscar, según el manual oficial. Busca por intención individual y restringe a la biblioteca BlueHeart verificada. No elijas una coincidencia de otra biblioteca por parecido.
4. Importa componentes/sets por **claves leídas**, o reutiliza instancias/principales locales válidos del destino. No confundas node ID, component key y file key. Un ID histórico del snapshot debe verificarse antes de usarlo.
5. Resuelve variables y estilos con la misma evidencia. Una consulta local vacía no cubre las variables remotas. Verifica colecciones/modos, aliases y scopes antes de enlazar; aplica [fuentes y autoridad](design-system.md) si necesitas réplicas locales de tokens canónicos.

Si la implementación real discrepa del contrato, no cambies el contrato para hacerla pasar ni repares el principal del DS dentro de esta tarea. Registra la diferencia y determina qué partes del prototipo pueden continuar con fidelidad comprobable.

Antes de las escrituras, exige el preflight de [controles de consumo](figma-usage-gates.md). La falta de acceso no permite pasar de una familia existente a una réplica. Al cierre, exige el readback del mismo mapa además del QA visual y semántico.

## Componer pantallas editables

Prepara un mapa por pantalla: ID lógico estable → frame destino; y por instancia: ID lógico → contrato/componente → propiedades → ID real. Mantén el mapa en un archivo de trabajo del prototipo para poder recuperar la ejecución sin depender de la conversación. No guardes el estado del flujo como descripciones arbitrarias de frames.

Usa Auto Layout para contenedores con relaciones estructurales y define explícitamente sus reglas de ancho/alto, padding, gap, alineación, wrap y clipping. Las medidas deben venir del handoff, la referencia medida o una decisión local sustentada en el DS. Conserva límites/overflow contractuales; no reduzcas texto o controles para ocultar discrepancias.

Carga las fuentes y estilos reales antes de escribir texto, verificando su disponibilidad. No sustituyas silenciosamente tipografía. Los textos deben poder editarse; los controles y regiones reutilizables deben conservar instancias y propiedades. Respeta las dimensiones y estados documentados, incluido el alcance de modos light/dark que efectivamente se solicite.

Para editar texto, carga las fuentes reales de los rangos afectados antes de mutar. Aplica las métricas especificadas al texto propio. Cuando el contrato requiera un TextStyle compartido, usa el estilo verificado y conserva los rangos, bindings y propiedades de componente.

Reutiliza iconos y assets oficiales. Sigue el flujo de captura/importación de imágenes del manual oficial cuando la fuente sea una web renderizable con imágenes de contenido. Para otras entradas, usa el mecanismo de imagen que soporte realmente la herramienta. Una captura completa de pantalla sirve para comparar; nunca la uses como fill o hijo de la pantalla final. Si generas capturas temporales en Figma, sepáralas y retira solo esos recursos propios identificados al concluir; no confundas logos/fotos de contenido con UI aplanada.

Crea conexiones de prototipo desde la tabla de transiciones: origen, evento, condición si existe, destino, overlay/cierre y estado resultante. Verifica reacciones y destinos por lectura. Donde una función de navegador no pueda representarse, declara su demostración parcial; no anuncies equivalencia de teclado, ARIA, backend o validaciones web.

## Recuperación y evidencia

Usa lotes recuperables y mutaciones secuenciales según la skill oficial. Devuelve todos los IDs y datos de diagnóstico necesarios; guarda ese resultado antes de continuar. Si el resultado de una escritura es incierto, lee el área afectada antes de recrear nodos. Las APIs y propiedades se consultan en los typings vigentes; no derives un método del nombre conceptual de una función.

Reutiliza recursos ya creados por identidad verificada. Ante una diferencia visual, modifica solo los nodos afectados y vuelve a capturar esa composición. Retira los indicadores de trabajo y objetos temporales propios. El cierre requiere lectura y revisión visual reales, detalladas en [handoff y QA](handoff-and-qa.md).

Para tipografía, lee métricas, decoración, bindings y estilos por rango en el resultado. Coteja cada instancia con su contrato y su principal, y cada texto propio con las métricas de referencia. Prueba las propiedades TEXT editadas y comprueba que las instancias conserven sus vínculos.
