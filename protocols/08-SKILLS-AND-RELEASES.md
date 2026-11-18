# P08. Skills de consumo y releases

Por [DEC-AI-TECHNICAL-CLOSURE-001](../registry/DEC-AI-TECHNICAL-CLOSURE-001.md), la revisión humana es opcional y no bloquea el cierre de las skills. El agente conserva evidencia de integridad, vigencia y pruebas aplicables; los errores técnicos sí bloquean. La sección 6 define el consumo desde GitHub de ambos workflows.

**Versión:** 0.1.1 · **Decisión:** [DEC-DS-SKILLS-001](../registry/DEC-DS-SKILLS-001.md).

## 1. Alcance y disparador

Las dos skills de consumo son [contpaqi-figma-screens](../skills/contpaqi-figma-screens/SKILL.md) y [contpaqi-po-prototypes](../skills/contpaqi-po-prototypes/SKILL.md). Cada carpeta instalable contiene exclusivamente un SKILL.md de invocación y enlace a GitHub.

Las instrucciones operativas, scripts, referencias y plantillas residen en `workflows/skills/<nombre>/` del repositorio. Se consultan al empezar cada encargo desde el commit vigente de `main`. Actualizar estas fuentes, contratos, datos, tokens, componentes o Graphify no cambia ni requiere reinstalar el lanzador.

## 2. Fuentes y salidas

`config/ds-skills.json` usa `github-direct-v2`. El empaquetador solo distribuye los lanzadores. Su fingerprint depende exclusivamente de estos archivos y de su canal, y permanece idéntico ante cambios del workflow y del DS. Las versiones históricas se conservan. Una modificación del lanzador sí produce una nueva versión.

Las fuentes canónicas de diseño conservan sus estados y autoridad. El workflow ejecutable y las reglas de producto se obtienen desde GitHub; la instalación no contiene copias. Las herramientas requeridas para construir y validar se materializan en una carpeta nueva del trabajo desde el mismo commit, nunca en la skill. Los artefactos generados y comprobantes pertenecen al proyecto del usuario.

## 3. Verificación y entrega

Comprobar lanzadores con `scripts/ds skills sync`, `check` y `export` cuando cambie el punto de entrada. Un cambio únicamente remoto no debe emitir otro paquete. Verificar independientemente los workflows y el catálogo, incluidos integridad, vigencia, consultas Graphify y gates de los destinos afectados. Preparar paquetes no autoriza instalar ni publicar. Registrar exactamente las operaciones ejecutadas y cualquier prueba de integración remota pendiente de publicación.

## 4. Contrato entre las dos skills

La skill de Figma consume prompts, imágenes como referencias de composición y el traspaso de la skill de PO. Las referencias no autorizan a cambiar anatomía, tokens o variantes del DS. Buscar primero una solución existente; un componente local requiere fuentes, rol, composición y decisiones locales explícitas. No crear tokens ni aproximar logos/personajes para rellenar una ausencia.

La skill de PO reutiliza la biblioteca React documentada y compone faltantes localmente. Su HTML se abre sin servidor; compilarlo sí requiere herramientas de desarrollo. Mantener assets, fuentes y recursos de estados posteriores dentro del archivo final, y probarlo por `file://` aislado y sin red. No introducir APIs ni respuestas remotas simuladas.

El traspaso identifica versión/digest, contratos y hashes consumidos, tema, viewports, pantallas/estados, componentes por instancia, props/variantes, textos, Slots, tokens, decisiones locales y transiciones. Las medidas y capturas deben corresponder al HTML final, con su hash. El Markdown invoca `$contpaqi-figma-screens`; generarlo no ejecuta Figma.

La skill de Figma verifica esas fuentes y el destino real; conserva componentes e instancias editables, Auto Layout, textos, bindings y comportamiento de prototipo. Un componente existente inaccesible no equivale a uno inexistente. Un conflicto de versión o de diseño detiene solo la parte afectada. Comparar el resultado con las referencias del mismo viewport y estado; registrar diferencias sin inventar tolerancias ni prometer igualdad universal de rasterizado.

## 5. Verificación proporcional

Comprobar el generador con cambios, altas, bajas, datos alterados, rutas inválidas, ejecución sin cambios y protección de instalaciones editadas. Verificar los ZIP y que ambas skills resuelvan el mismo corpus. Validar sintaxis de las skills y probar decisiones relevantes con un evaluador independiente cuando cambie su flujo.

Si cambia el starter o empaquetador web, probar build, apertura del HTML movido y renombrado, red bloqueada, interacción y assets de estados posteriores; cotejar el Markdown con medidas y estado realmente capturados. Un build no sustituye esta prueba. La prueba del paquete Figma puede ser de instrucciones e integridad; reportar separadamente que no se construyó una pantalla si no se ejecutó Figma.

Los paquetes e informes son outputs del cierre; las reglas de diseño siguen en sus fuentes canónicas. Una pantalla producida con cualquiera de las skills conserva su propia procedencia y QA.

## 6. Consumo directo GitHub y Graphify

El lanzador resuelve el commit actual de `Migueluckleo/Blue-Heart-DS/main` y lee su WORKFLOW.md remoto. Este usa `scripts/github_workflow.py` del mismo commit. `start` obtiene las herramientas por su árbol Git, verifica los blobs y lee el catálogo y el índice de consumo. No obtiene el bundle `data.tar.gz` ni utiliza una caché entre encargos.

El índice reducido, derivado de Graphify, se valida contra el manifiesto y se usa para localizar contratos, enmiendas, dependencias, estados, variantes y tokens. Las consultas de `consumer_graph.py` leen únicamente las fuentes seleccionadas por la consulta desde GitHub, verificando sus hashes. Los límites de documentos y bytes y las referencias originales conservan su efecto. Un índice ausente o inválido permite solamente el fallback explícito por contratos y enmiendas; no permite inferir una cobertura completa ni reindexar el repositorio en el consumidor.

Figma obtiene fuentes necesarias durante inventario, preflight y consultas. La construcción web materializa el código, assets y entradas de planificación que necesita el proyecto. El corpus histórico, las evidencias masivas y el grafo completo permanecen remotos. Las fuentes ya obtenidas se verifican al reutilizarlas dentro del mismo encargo. Si una fuente falta, la red falla o el hash difiere, la decisión dependiente queda bloqueada; no se usa un paquete viejo ni un checkout local como alternativa.

El commit, el manifiesto, los hashes, las URLs y los resultados quedan en los comprobantes de la sesión. Un encargo nuevo vuelve a consultar `main`; el encargo activo conserva un commit coherente. Las fuentes y el catálogo se publican juntos mediante una autorización de publicación separada. La instalación de los lanzadores también requiere su propio alcance autorizado.

## 7. Variante Azure DevOps 1.0.9 · 2026-11-18

Por solicitud explícita del usuario, existe un canal de consumo Azure independiente de los paquetes GitHub históricos. Sus lanzadores están en `skills-azure/`; `config/azure-consumption.json` declara repositorio, versión y salida. `python3 -B scripts/ds_azure.py build` genera los dos ZIP 1.0.9 bajo `output/skills/azure/1.0.9/` y `check` comprueba su integridad sin instalarlos. La misma versión numérica identifica variantes de proveedor distintas; los manifiestos y directorios de canal las distinguen. No se modifica un paquete histórico en su lugar.

El lanzador Azure resuelve la rama predeterminada real del repositorio y fija su commit. `scripts/azure_workflow.py` usa la API Azure Repos 7.1 para obtener blobs y archivos. Comparte con `scripts/github_workflow.py` las verificaciones de catálogo, materialización y consultas; la sesión `azure-session.json` fija el proveedor y no permite pasar a GitHub ante un fallo. Los workflows y las plantillas compartidos admiten ambos orígenes. Se mantienen la lectura bajo demanda, los hashes y las reglas de las secciones anteriores.

La autenticación pertenece al entorno del consumidor y nunca a los lanzadores. La [guía Azure](../references/AZURE-SKILL-CONSUMPTION.md) conserva método, requisitos, evidencia, pruebas y límites. Solo una integración autenticada contra fuentes publicadas acredita consumo remoto; pruebas locales o una respuesta HTML de inicio de sesión no lo sustituyen.

## 8. Prefijo de las skills Azure · 2026-11-18

Por petición del usuario, los nombres instalables de Azure son `azure-contpaqi-po-prototypes` y `azure-contpaqi-figma-screens`. Las carpetas, `name` del frontmatter, ZIP, identidades de release y traspaso usan ese prefijo. Las rutas internas compartidas de workflow permanecen canónicas. El cargador Azure acepta también los nombres de arranque anteriores para compatibilidad, pero emite las identidades con prefijo. Los lanzadores GitHub conservan sus nombres.

La versión solicitada sigue siendo 1.0.9. Los ZIP renombrados se generan en `output/skills/azure-prefixed/1.0.9/` para preservar intacta la entrega anterior y su manifiesto. No se necesita reinstalar una skill de GitHub para usar la variante Azure; se puede instalar cada variante con su nombre distinto.
