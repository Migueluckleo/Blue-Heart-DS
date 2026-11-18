# Consumo de BlueHeart 1.0.9 desde Azure DevOps

## Solicitud y alcance

El 2026-11-18 el usuario solicitó una variante de las skills 1.0.9 que consuma el repositorio [Blueheart Design System](https://dev.azure.com/devcontpaqi/Dise%C3%B1oUX-UI/_git/Blueheart%20Design%20System) de la organización `devcontpaqi`, proyecto `DiseñoUX-UI`. Posteriormente pidió conservar los detalles para consulta al terminar la ejecución.

La variante cubre los lanzadores compañeros `contpaqi-po-prototypes` y `contpaqi-figma-screens`, el transporte de fuentes, las consultas dirigidas al índice y los comprobantes de integridad. La versión 1.0.9 de Azure se entrega en un canal independiente del paquete GitHub 1.0.9; las publicaciones históricas se conservan. La preparación no instala las skills en esta máquina.

## Decisiones

- Una sola identidad de commit durante cada encargo. La rama inicial se resuelve desde `defaultBranch` de Azure; no se presupone que el repositorio ya tenga `main`.
- La instalación contiene el lanzador. Workflows, herramientas y fuentes se leen desde Azure en el commit fijado. El lanzador se sustituye una vez para cambiar de proveedor; las actualizaciones posteriores del DS se consultan en nuevos encargos.
- Compartir las reglas y plantillas de producto de ambos proveedores. Azure tiene un adaptador de transporte propio y un comprobante `azure-session.json`; no se cambia la autoridad de contratos ni se rediseñan componentes.
- Mantener lectura bajo demanda, manifiesto SHA-256, índice reducido de consumo y comprobación de blobs de los workflows. Una sesión activa puede reutilizar fuentes ya obtenidas tras comprobar su hash; otro encargo vuelve a resolver el origen.
- No usar GitHub, un paquete histórico o un checkout anterior como sustituto ante fallo de Azure.
- Preferir Microsoft Entra para autenticación. Las credenciales se resuelven en el entorno del consumidor y no forman parte del ZIP, URLs, comprobantes o documentación.

## Evidencia de acceso

`git ls-remote` terminó sin referencias. Esa observación no prueba que el repositorio esté vacío ni acredita acceso autenticado. La consulta REST posterior respondió HTTP 203 con HTML y redirección al inicio de sesión de Microsoft, sin metadatos Git. Ese primer intento anónimo no acreditaba acceso. La prueba posterior del adaptador se autenticó mediante las credenciales Git existentes y obtuvo metadatos reales: repositorio `Blueheart Design System`, `size: 0`, `defaultBranch: null`, habilitado y fuera de mantenimiento. No se encontró Azure CLI ni variables de token; no se mostraron ni guardaron credenciales en los comprobantes. La integración de consumo queda pendiente de publicar fuentes y establecer la rama predeterminada.

## Referencias técnicas consultadas

- [Autenticación de Azure Repos](https://learn.microsoft.com/en-us/azure/devops/repos/git/auth-overview?view=azure-devops): Microsoft Entra, Git Credential Manager y PAT como alternativa.
- [Git Items, API 7.1](https://learn.microsoft.com/en-us/rest/api/azure/devops/git/items/get?view=azure-devops-rest-7.1): rutas y lectura fijada mediante `versionDescriptor.versionType=commit`.
- [Git Trees, API 7.1](https://learn.microsoft.com/en-us/rest/api/azure/devops/git/trees/get?view=azure-devops-rest-7.1): inventario de blobs del workflow.
- [Git Refs, API 7.1](https://learn.microsoft.com/en-us/rest/api/azure/devops/git/refs/list?view=azure-devops-rest-7.1): resolución de rama a commit.
- [P08](../protocols/08-SKILLS-AND-RELEASES.md), [P05](../protocols/05-SELF-DOCUMENTATION-AND-TRACEABILITY.md), [P06](../protocols/06-QA-AND-VALIDATION.md), lanzadores 1.0.9, workflows y `scripts/github_workflow.py` locales.

## Estado de ejecución

La variante local está preparada y verificada. Pasaron 25 pruebas de regresión Python, las validaciones oficiales de los dos SKILL.md y una revisión independiente con 8 pruebas del adaptador Azure. La prueba PO materializó las fuentes y ejecutó el inicializador Node en una carpeta temporal. Se comprobaron rama exacta, fijación de commit, consultas dirigidas, hashes, corrupción, sesiones ambiguas y fallo sin credenciales. El starter y las reglas de construcción de pantallas no se rediseñaron; no se construyó ni validó visualmente un HTML o una pantalla Figma en esta tarea.

La autenticación de lectura fue comprobada con el adaptador. La integración remota permanece `BLOCKED_UNPUBLISHED_SOURCES`: el repositorio vacío aún no tiene rama predeterminada ni el catálogo. No se ha publicado código en Azure ni instalado un lanzador. El cierre global del repositorio conserva su propio comprobante; no se deduce de las pruebas dirigidas.

## Cierre del índice y archivos históricos

El primer cierre `2026-11-18-azure-skills-1-0-9` pasó documentación y quedó en `NEEDS_SEMANTICS`: el detector incluyó 186 documentos de `archive/` ajenos a la variante actual. Se agregó `archive` a `config/ds-project.json:exclude_roots`, coherente con la exclusión de paquetes históricos de `config/ds-skills.json`. No se modificaron esos archivos. El cierre con esta configuración usa un nuevo ID `2026-11-18-azure-skills-1-0-9-final`; el primer comprobante se conserva como evidencia del hallazgo. Graphify es un derivado; no cambia la autoridad de las fuentes.

## Entregables y reproducción

- [Lanzador PO](../skills-azure/azure-contpaqi-po-prototypes/SKILL.md) y [lanzador Figma](../skills-azure/azure-contpaqi-figma-screens/SKILL.md).
- [Adaptador Azure](../scripts/azure_workflow.py), [empaquetador del canal](../scripts/ds_azure.py) y [configuración](../config/azure-consumption.json).
- [PO 1.0.9 ZIP](../output/skills/azure-prefixed/1.0.9/azure-contpaqi-po-prototypes-1.0.9.zip), [Figma 1.0.9 ZIP](../output/skills/azure-prefixed/1.0.9/azure-contpaqi-figma-screens-1.0.9.zip) y [manifiesto SHA-256](../output/skills/azure-prefixed/1.0.9/manifest.json).
- [Evidencia de QA](../output/qa/azure-skills-2026-11-18/report.json).

Ejecutar desde la raíz con Python 3.9 o posterior; el cierre del repositorio usa su Python 3.12 registrado. Node debe estar en PATH para la prueba del inicializador:

```sh
python3 -B scripts/ds_azure.py build
python3 -B scripts/ds_azure.py check
python3 -B -m unittest discover -s tests -p 'test_*.py' -v
```

`build` conserva los ZIP inmutables y devuelve `UNCHANGED` si sus fuentes no cambian. El manifiesto registra SHA-256 y tamaño de ambos archivos. La versión GitHub 1.0.9 conserva sus archivos, hashes y puntero de publicación. Los nombres vigentes son `$azure-contpaqi-po-prototypes` y `$azure-contpaqi-figma-screens`. El prefijo permite distinguirlos y conservar instaladas las variantes de GitHub. Los paquetes originales sin prefijo se preservan como evidencia histórica; los nuevos ZIP están bajo `output/skills/azure-prefixed/1.0.9/`.

## Preparación del entorno consumidor y publicación

1. Otorgar a cada consumidor lectura del repositorio Azure. Autenticar el CLI o el gestor Git de esa máquina con su propia identidad, o inyectar el token por el mecanismo corporativo; nunca incluirlo en los ZIP.
2. Publicar juntos el DS, `catalog/current.json` y su release, los workflows compartidos y los módulos `scripts/azure_workflow.py`, `scripts/github_workflow.py` y `scripts/consumer_graph.py`. Un ZIP lanzador por sí solo no publica el contenido remoto.
3. Comprobar que el repositorio tiene una rama predeterminada y que su commit contiene esas rutas. `python3 -B scripts/azure_workflow.py head` comprueba el acceso desde un checkout de preparación; un lanzador instalado resuelve las mismas referencias mediante REST.
4. Iniciar ambos workflows desde Azure en carpetas nuevas, consultar una familia y comprobar el comprobante de origen, commit, manifiesto y digest. Registrar la integración real antes de declarar habilitado el canal remoto.
5. Distribuir los dos ZIP del canal Azure y conservar su manifiesto. No se requiere App Service, Static Web Apps ni desplegar el catálogo web para que la skill lea Azure Repos; publicar una web sería un alcance diferente.


## Revisión de seguridad previa a publicar

El usuario pidió comprobar vulnerabilidades antes de subir el repositorio. Se realizó una revisión de dependencias, secretos en archivos e historial, código Python y puntos de descarga/ejecución. La [revisión de seguridad](../qa/tooling/azure-prepublication-security-2026-11-18.md) conserva hallazgos, correcciones y límites; el resultado ejecutado se registra en `output/security/2026-11-18-pre-azure/report.json`. Los ZIP lanzadores siguen siendo Azure 1.0.9; las fuentes del catálogo incorporan Next.js 16.4.5.
