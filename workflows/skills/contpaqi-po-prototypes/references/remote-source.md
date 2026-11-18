# Fuente de consumo remota

El lanzador instalado selecciona GitHub o Azure DevOps y resuelve un commit por encargo. Lee workflows, referencias y herramientas desde el mismo origen y commit. Las herramientas van en una carpeta nueva del trabajo. La instalación no contiene scripts, plantillas, contratos o tokens.

## GitHub

El canal existente es `Migueluckleo/Blue-Heart-DS`, rama `main`. Obtén `scripts/github_workflow.py` del commit resuelto y ejecuta su comando `start` con `--skill`, `--commit` y `--output` según el workflow.

## Azure DevOps · variante 1.0.9

El canal es [Blueheart Design System](https://dev.azure.com/devcontpaqi/Dise%C3%B1oUX-UI/_git/Blueheart%20Design%20System), proyecto `DiseñoUX-UI`, organización `devcontpaqi`. Resuelve `defaultBranch` y su referencia exacta mediante REST 7.1; usa su `objectId` como commit. El lanzador explica la descarga autenticada de `scripts/azure_workflow.py` y `scripts/github_workflow.py` del mismo commit a la misma carpeta temporal. Ejecuta `azure_workflow.py start`.

El adaptador prefiere `BLUEHEART_AZURE_TOKEN` (token Microsoft Entra). Como alternativa explícita acepta `AZURE_DEVOPS_EXT_PAT` con permiso de lectura de código. Configura solo una de esas variables, fuera del chat. Si no hay variables, intenta obtener el token de una sesión existente de Azure CLI y después consulta las credenciales Git ya configuradas, sin interacción. El inicio de sesión de navegador por sí solo no configura este acceso. Si no hay credenciales, informa el diagnóstico y conserva la parte dependiente pendiente; no solicites pegar secretos en el chat.

Los tokens permanecen en memoria y cabeceras HTTPS. No los pongas en comandos, argumentos, URLs, archivos de la skill o comprobantes. Una respuesta de inicio de sesión o un HTTP distinto de 200 no acredita acceso. No cambies de origen si falla Azure.

## Sesión y verificación

`start` consulta el catálogo y el índice reducido de consumo, verifica identidad y hashes y obtiene fuentes individuales cuando se necesitan. No descarga el bundle del corpus ni utiliza caché entre encargos. Usa el `runtime` devuelto en PASS. El comando compartido `github_workflow.py read` detecta `azure-session.json` en una sesión Azure y solo consulta Azure. Las consultas de `consumer_graph.py` usan el mismo mecanismo.

La construcción PO puede usar `github_workflow.py web` en ambos proveedores: verifica el origen de la sesión y materializa sus fuentes de construcción y planificación. El módulo compartido conserva su nombre por compatibilidad. Los comandos `azure_workflow.py read` y `web` también están disponibles para sesiones Azure.

## Identidad de invocación

En Azure los lanzadores instalados son `$azure-contpaqi-po-prototypes` y `$azure-contpaqi-figma-screens`; en GitHub son `$contpaqi-po-prototypes` y `$contpaqi-figma-screens`. El workflow compartido conserva su ruta interna. `release.skill_name` y `release.companion_skill` identifican el proveedor para que el traspaso invoque la skill correspondiente.
