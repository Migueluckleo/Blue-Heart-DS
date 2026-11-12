# P08. Skills de consumo y releases

Por [DEC-AI-TECHNICAL-CLOSURE-001](../registry/DEC-AI-TECHNICAL-CLOSURE-001.md), la revisión humana es opcional y no bloquea el cierre de las skills. El agente conserva evidencia de integridad, vigencia y pruebas aplicables; los errores técnicos sí bloquean. La sección 6 define el corte local que consumen ambos motores.

**Versión:** 0.1.1 · **Decisión:** [DEC-DS-SKILLS-001](../registry/DEC-DS-SKILLS-001.md).

## 1. Alcance y disparador

Las dos skills son un entregable obligatorio del DS: [contpaqi-figma-screens](../skills/contpaqi-figma-screens/SKILL.md) y [contpaqi-po-prototypes](../skills/contpaqi-po-prototypes/SKILL.md). Leer AGENTS, P05, P06 y P07 según la parte modificada.

Aplicar este cierre después de un alta, cambio o retiro de componente, contrato, enmienda, token, asset o documentación/código de consumo. Primero completar los controles documentales y de implementación aplicables; después generar ambas skills desde el mismo corte. Publicar documentación y publicar una biblioteca Figma siguen siendo operaciones distintas: la actualización de estos paquetes no espera una publicación remota ni la simula.

La norma reside en los contratos y datos canónicos, no en la skill, el índice generado, un screenshot ni una copia Figma observada. Conservar estados documentales y límites; empaquetar un DRAFT como evidencia no lo hace elegible para gobernar un componente.

## 2. Fuente única y salidas

Las instrucciones, referencias y scripts editables viven en `skills/<nombre>/`. La selección de fuentes y el empaquetado se gobiernan por `config/ds-skills.json` y `scripts/ds_skills.py`. Los snapshots generados no se editan.

Cada versión común produce dos carpetas de skill, sus ZIP y manifiestos bajo `output/skills/`. Cada skill incluye:

- `SKILL.md` y metadatos de invocación, scripts y referencias necesarios.
- Snapshot con bytes originales de contratos, enmiendas, datos, assets y código requeridos, sin cachés, secretos, node_modules, builds ni grafo duplicado.
- `assets/snapshot-manifest.json`: rutas y SHA-256, digest común del DS y cobertura por familia.
- `assets/release.json`: versión, identidad y skill compañera. El índice de componentes es derivado, con fuentes y versiones; no inventa IDs Figma.

Las dos skills deben compartir versión y digest del DS. Los paquetes históricos se conservan; una modificación efectiva produce otra versión. Una ejecución sin cambios no genera una versión nueva ni fechas artificiales. El incremento de versión del paquete no cambia la versión o aprobación de sus contratos.

## 3. Cierre de un alta o modificación

1. Completar contrato/enmiendas, dependencias, código, ficha, ejemplo y QA aplicables de la familia conforme P03/P06/P07. Actualizar el registro web y los derivados documentales.
2. Ejecutar `scripts/ds skills sync`. El generador toma el corte actual de las fuentes y las dos plantillas. No actualizar solo una skill ni copiar archivos a mano dentro del paquete.
3. Ejecutar `scripts/ds skills check` y `scripts/ds skills export`. Verificar contenido, hashes, cobertura y reproducibilidad. Usar el incremento de versión explícito cuando corresponda; nunca reutilizar una versión histórica con bytes diferentes.
4. Actualizar las copias locales gestionadas con `scripts/ds skills install` cuando ese destino esté autorizado, como en esta decisión. Si hay cambios ajenos en una copia instalada, conservarlos y registrar el bloqueo de esa instalación; no sobrescribirlos silenciosamente. Los paquetes portables siguen disponibles para distribución manual. No afirmar que otras máquinas se actualizan solas.
5. Registrar versión, digest, paquetes, comandos, pruebas, instalación y límites en `registry/skills.md` y `qa/skills/`. Estos registros se excluyen del snapshot para evitar autorreferencia, pero permanecen en Graphify.
6. Actualizar la vista derivada y cerrar Graphify por P05. `scripts/ds check` incluye el gate de skills además de documentación, vista y grafo. `--docs-only` sirve durante preparación y no acredita el cierre completo.

Si falla el empaquetado, conservar la última versión verificable y registrar `STALE` o `BLOCKED`. No declarar terminada el alta con las skills pendientes. Este flujo no instala hooks, monitores ni servidores y no hace publicaciones externas.

## 4. Contrato entre las dos skills

La skill de Figma consume prompts, imágenes como referencias de composición y el traspaso de la skill de PO. Las referencias no autorizan a cambiar anatomía, tokens o variantes del DS. Buscar primero una solución existente; un componente local requiere fuentes, rol, composición y decisiones locales explícitas. No crear tokens ni aproximar logos/personajes para rellenar una ausencia.

La skill de PO reutiliza la biblioteca React documentada y compone faltantes localmente. Su HTML se abre sin servidor; compilarlo sí requiere herramientas de desarrollo. Mantener assets, fuentes y recursos de estados posteriores dentro del archivo final, y probarlo por `file://` aislado y sin red. No introducir APIs ni respuestas remotas simuladas.

El traspaso identifica versión/digest, contratos y hashes consumidos, tema, viewports, pantallas/estados, componentes por instancia, props/variantes, textos, Slots, tokens, decisiones locales y transiciones. Las medidas y capturas deben corresponder al HTML final, con su hash. El Markdown invoca `$contpaqi-figma-screens`; generarlo no ejecuta Figma.

La skill de Figma verifica esas fuentes y el destino real; conserva componentes e instancias editables, Auto Layout, textos, bindings y comportamiento de prototipo. Un componente existente inaccesible no equivale a uno inexistente. Un conflicto de versión o de diseño detiene solo la parte afectada. Comparar el resultado con las referencias del mismo viewport y estado; registrar diferencias sin inventar tolerancias ni prometer igualdad universal de rasterizado.

## 5. Verificación proporcional

Comprobar el generador con cambios, altas, bajas, datos alterados, rutas inválidas, ejecución sin cambios y protección de instalaciones editadas. Verificar los ZIP y que ambas skills resuelvan el mismo corpus. Validar sintaxis de las skills y probar decisiones relevantes con un evaluador independiente cuando cambie su flujo.

Si cambia el starter o empaquetador web, probar build, apertura del HTML movido y renombrado, red bloqueada, interacción y assets de estados posteriores; cotejar el Markdown con medidas y estado realmente capturados. Un build no sustituye esta prueba. La prueba del paquete Figma puede ser de instrucciones e integridad; reportar separadamente que no se construyó una pantalla si no se ejecutó Figma.

Los paquetes e informes son outputs del cierre; las reglas de diseño siguen en sus fuentes canónicas. Una pantalla producida con cualquiera de las skills conserva su propia procedencia y QA.

## 6. Catálogo GitHub y motor independiente

Cada motor v1.0 resuelve un corte con `scripts/resolve_ds.py --output NUEVA_CARPETA`. El canal autorizado usa `catalog/current.json` de `Migueluckleo/Blue-Heart-DS` en `main`. El puntero, manifiesto, paquete de datos e índice de consumo se verifican por hash. Ambos motores verifican la clave del maestro Figma del corte. Un cambio de datos compatible conserva la versión del motor.

## Índice de consumo Graph-First · 2026-10-23

El cierre local prepara el índice reducido desde Graphify CURRENT y ensambla el catálogo y su índice como una unidad. Antes de publicar, valida el resultado con `scripts/ds_consumption.py --publication-check` y `scripts/ds_remote.py --check`. Publica fuentes, puntero y objetos por hash en el mismo commit autorizado. Si falta preparación o difieren fuentes o herramientas, conserva el puntero anterior.

Los dos motores comparten `scripts/resolve_ds.py` y `scripts/consumer_graph.py`. El índice incluye las referencias verificadas de Graphify y las dependencias declaradas por ID en los contratos. La consulta de dependencias agrega las enmiendas de las familias directamente relacionadas. Cada resultado remite al corte y a los documentos originales. Los comprobantes preparados viven en `catalog/prepared/`.

Una `publication_policy` explícita que comience por `HOLD` bloquea la publicación remota aunque el corte local sea íntegro. La autorización del canal BlueHeart consta en [decisiones](../registry/decisions.md).

## Cierre coordinado e incremental · 2026-10-23

Por [DEC-EFFICIENT-CLOSURE-001](../registry/DEC-EFFICIENT-CLOSURE-001.md), usar scripts/ds close --run ID según la [guía](../references/EFFICIENT-CLOSURE.md). El comando coordina escritores, comparte comprobaciones del mismo corte y genera catálogo y ZIP con integridad final. Sustituye la ejecución redundante de subcomandos equivalentes; conserva todos los criterios de QA. Los comandos individuales siguen disponibles. Los estados BUSY/WAITING_FOR_SEMANTICS requieren reutilizar al propietario, no otro rebuild; NEEDS_SEMANTICS conserva la extracción semántica del delta según la skill. Registrar métricas reales y límites de atribución. No concede publicación remota.
