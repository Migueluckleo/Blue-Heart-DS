---
name: azure-contpaqi-po-prototypes
description: Construye prototipos BlueHeart portables y su traspaso a Figma consumiendo Azure DevOps.
metadata:
  version: "1.0.10"
  source: azure-devops
---

# Azure · BlueHeart · 1.0.10

Consume [Blueheart Design System](https://dev.azure.com/devcontpaqi/Dise%C3%B1oUX-UI/_git/Blueheart%20Design%20System), organización `devcontpaqi`, proyecto `DiseñoUX-UI`. Invoca esta variante como `$azure-contpaqi-po-prototypes`.

## Comprobar acceso antes de bloquear

Desde esta skill instalada, ejecuta `python3 -B scripts/azure_workflow.py diagnose`. Cuando el encargo ya tenga un SHA completo fijado, agrega `--commit SHA_COMPLETO`. Si existe una copia Git confiable en una ruta aportada por el usuario, en la carpeta de trabajo o en un comprobante del encargo, agrega `--repository RUTA_COPIA`. El diagnóstico comprueba las vías remota y local por separado y comunica cuál puede utilizarse.

La autenticación comprueba los tokens explícitamente configurados y, cuando necesita reutilizar una sesión, intenta OAuth corporativo con Git Credential Manager, después Azure CLI y el helper Git disponible. La ausencia de `BLUEHEART_AZURE_TOKEN`, `AZURE_DEVOPS_EXT_PAT` o Azure CLI por sí sola deja pendiente la comprobación de Git Credential Manager. El helper se invoca sin interacción, con OAuth y el trazado de secretos desactivado. Los secretos permanecen en memoria y cabeceras HTTPS.

Distingue el fallo observado. `AUTH_UNAVAILABLE` indica que las vías de autenticación comprobadas no aportaron una sesión; `AUTH_REJECTED` indica HTTP 401 y `ACCESS_DENIED` indica HTTP 403. `NETWORK_POLICY_DENIED` o `NETWORK_UNAVAILABLE` describen acceso de red. Un fallo de red deja sin acreditar la validez de las credenciales. Registra el resultado calculado por la herramienta.

Antes de declarar bloqueado el consumo, comprueba la copia local disponible del mismo SHA. El diagnóstico verifica el origen Azure del repositorio, el objeto commit, el catálogo y los hashes de sus fuentes y workflows leyendo objetos Git. Los cambios del directorio de trabajo quedan fuera de esa lectura. Si el usuario pidió el corte vigente y la sesión no logró resolverlo, solicita únicamente el SHA esperado o el acceso para resolverlo. La presencia de un HEAD local conserva su condición de copia; no acredita la actualidad de la rama remota.

Si falta la ruta de una copia, registra `NOT_PROVIDED` y pide ese dato cuando permita continuar. Si la copia falla, conserva el código y el objeto o hash afectado. Solo declara bloqueada la parte dependiente cuando las vías aplicables estén comprobadas o sus datos indispensables sigan ausentes. Continúa el análisis del brief y las partes independientes con la evidencia disponible. Cuando haga falta iniciar sesión, dirige al inicio corporativo oficial de Git Credential Manager o Azure CLI y su MFA. La autenticación se completa fuera del chat.

## Iniciar el encargo desde el corte verificado

1. Usa el commit fijado por el diagnóstico o el indicado por el usuario. El diagnóstico remoto resuelve `defaultBranch` de Azure y selecciona la referencia exacta antes de fijar su `objectId`. Cada nuevo encargo que pida el corte vigente vuelve a resolverla.
2. Para acceso remoto, ejecuta `python3 -B scripts/azure_workflow.py start --skill azure-contpaqi-po-prototypes --commit SHA_COMPLETO --output NUEVA_CARPETA`. Para la copia local verificada, agrega `--repository RUTA_COPIA` al mismo comando. Esta modalidad conserva Azure como origen, el mismo commit y los hashes del catálogo, y registra `source_mode: LOCAL_GIT`.
3. Continúa con la ruta `runtime` del comprobante PASS. Lee íntegro `workflows/skills/contpaqi-po-prototypes/WORKFLOW.md` del corte y sus referencias. El cargador coloca ese archivo como `WORKFLOW.md` en el runtime y obtiene las herramientas del mismo commit. En modo local materializa las fuentes verificadas del catálogo para que las consultas posteriores puedan completarse sin red.
4. Sigue el workflow y sus controles de inventario, planificación y QA. Registra commit, manifiesto, digest, vía de acceso y resultados reales. Mantén el mismo SHA en todas las lecturas. Una discrepancia de identidad o integridad bloquea el alcance afectado.

La instalación incluye el punto de entrada y las herramientas de diagnóstico y acceso. Los workflows, contratos, tokens, componentes, assets e índice de consumo proceden de Azure o de la copia Git verificable de ese mismo corte. El prefijo `azure-` conserva una identidad distinta de las skills GitHub. Una copia de otro commit o un paquete histórico requiere que el usuario haya solicitado expresamente ese corte. El módulo compartido `github_workflow.py` usa el proveedor Azure en estas sesiones.
