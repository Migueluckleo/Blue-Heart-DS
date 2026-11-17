---
name: contpaqi-po-prototypes
description: Construye prototipos BlueHeart portables y su traspaso a Figma con el workflow vigente de GitHub.
---

# BlueHeart desde GitHub

Al comenzar cada encargo, consulta `main` de `Migueluckleo/Blue-Heart-DS` mediante las herramientas GitHub disponibles o HTTPS. Resuelve su commit actual con `https://api.github.com/repos/Migueluckleo/Blue-Heart-DS/git/ref/heads/main` y lee íntegro `https://raw.githubusercontent.com/Migueluckleo/Blue-Heart-DS/COMMIT/workflows/skills/contpaqi-po-prototypes/WORKFLOW.md`, reemplazando COMMIT por el SHA de `object.sha` recibido. Sigue ese workflow y sus referencias desde el mismo commit. Si no puedes leerlo, comunica el fallo y conserva el trabajo pendiente.

Este archivo es solo el punto de entrada. Las instrucciones operativas, herramientas, plantillas, contratos, tokens e índice Graphify se consultan en GitHub. No uses paquetes históricos, copias instaladas ni datos de encargos anteriores como alternativa. El workflow remoto determina los recursos necesarios y sus verificaciones. Registra el commit utilizado; vuelve a consultar `main` en el siguiente encargo.
