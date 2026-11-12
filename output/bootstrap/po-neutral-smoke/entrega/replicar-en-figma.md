# Replicar en Figma · Prueba local de HTML autónomo

Usa $contpaqi-figma-screens para reproducir este prototipo BlueHeart en Figma con capas editables, instancias reales y Auto Layout. Abrir [render.html](render.html) directamente; no levantar un servidor. La preparación de este paquete no ejecutó Figma.

- Objetivo: Comprobar interacción y traspaso con cobertura DS cero
- Release: 0.0.0+ds.aa0721e6079089f4; DS SHA-256: `aa0721e6079089f44b463e15c775b53d0804f6164fd6050df42ff9b5da80320f`.
- HTML SHA-256: `0153474c51bb47b13376a4e860caac7aabbfdbc870f03b5c70b3e53e7fd62d3a`.
- Tema: sin modo configurado; viewports: 1440×900.
- Destino: No proporcionado; resolver en la sesión de Figma antes de escribir.
- QA file:// sin red: **NOT_RUN**. No afirmar que el archivo sea funcional ni que las medidas estén verificadas.

[Identidades, propiedades y mediciones completas](referencias/handoff.json) · [Snapshot y hashes](referencias/snapshot-manifest.json). Este Markdown contiene el traspaso estructurado completo y puede pegarse solo en la habilidad de Figma. HTML, referencias y capturas son evidencia adicional opcional; si no están adjuntos no afirmar comparación visual con ellos.

## Reglas y autoridad

El HTML gobierna composición local y textos. Los contratos y sus enmiendas gobiernan el DS; conservar estados de aprobación y registrar cualquier discrepancia. Verificar versión y digest compartidos, o hashes de todas las fuentes usadas. No reemplazar el DS por su apariencia, no crear primitivas nuevas, no usar primitivas directamente ni modificar el maestro. Las composiciones locales documentadas no se convierten en componentes oficiales.

El campo identity.figma conserva únicamente evidencia incluida; null exige resolver el identificador real. figmaProperties representa un mapeo declarado que debe contrastarse con el componente disponible. Reutilizar instancias y bindings, respetar variantes y Slots; children de React no prueba Slots nativos. Representar el comportamiento mediante estados/conexiones, sin prometer JavaScript en Figma.

## Pantallas y estados

### offline · Prueba local

- Acceso: Abrir archivo
- Layout declarado: Columna
- Contenido: Control HTML de prueba

**initial · initial** · nodos: title, action, feedback.

Acciones reproducibles: `[]`.

**keyboard · keyboard** · nodos: title, action, feedback.

Acciones reproducibles: `[{"selector":"button","type":"press","key":"Enter"}]`.

## Componentes y composición

Identidad tipográfica observada: **NOT_RUN**; 0 fragmentos visibles, 0 sin marker y 0 nodos de captura anterior sin fragmentos. Los IDs se cotejan con el catálogo; las métricas calculadas se conservan por raíz y fragmento. Un marker heredado no acredita conformidad de métricas si un descendiente las sobrescribe.

### title · title

- Identidad: LOCAL-TITLE; local-content.
- Ubicación: Prueba local.
- Props declaradas (cotejo NOT_OBSERVED): `{}`.
- Propiedades Figma declaradas: `null`.
- Tokens: Sin tokens adicionales declarados; consultar contrato.
- Slots/composición: `[{"name":"contenido","status":"NOT_APPLICABLE","content":"Texto local"}]`.
- Decisión local: Marcador de prueba mecánica sin autoridad DS; bases: contenido local con tokens canónicos.

Omisiones:

- Instancia declarada sin captura visible PASS; propiedades y medidas no verificadas.

### action · action

- Identidad: LOCAL-ACTION; local-content.
- Ubicación: Prueba local.
- Props declaradas (cotejo NOT_OBSERVED): `{}`.
- Propiedades Figma declaradas: `null`.
- Tokens: Sin tokens adicionales declarados; consultar contrato.
- Slots/composición: `[{"name":"contenido","status":"NOT_APPLICABLE","content":"Texto local"}]`.
- Decisión local: Marcador de prueba mecánica sin autoridad DS; bases: contenido local con tokens canónicos.

Omisiones:

- Instancia declarada sin captura visible PASS; propiedades y medidas no verificadas.

### feedback · feedback

- Identidad: LOCAL-FEEDBACK; local-content.
- Ubicación: Prueba local.
- Props declaradas (cotejo NOT_OBSERVED): `{}`.
- Propiedades Figma declaradas: `null`.
- Tokens: Sin tokens adicionales declarados; consultar contrato.
- Slots/composición: `[{"name":"contenido","status":"NOT_APPLICABLE","content":"Texto local"}]`.
- Decisión local: Marcador de prueba mecánica sin autoridad DS; bases: contenido local con tokens canónicos.

Omisiones:

- Instancia declarada sin captura visible PASS; propiedades y medidas no verificadas.

## Recorrido

- Ninguna declarada.

## Decisiones locales

- Ninguna declarada.

## Limitaciones

- Cobertura DS cero; fixture de infraestructura

## QA y entrega Figma

- Ninguna declarada.

QA real file://: NOT_RUN. Revisar [datos completos](referencias/handoff.json) y errores/solicitudes por estado. La revisión visual humana o del agente debe registrarse separadamente. Entregar enlace a frames reales, mapa de estados e instancias, conexiones, diferencias pendientes y lectura/QA del resultado Figma.

## Traspaso estructurado autosuficiente

El siguiente bloque conserva las instrucciones y medidas necesarias al pegar solo este Markdown. Consulta el snapshot de la habilidad de Figma por IDs, rutas y hashes; resuelve diferencias de versión antes de construir. Las rutas de imágenes son referencias opcionales, no pruebas de haberlas visto.

```json
{"schema_version":1,"producer_skill":"contpaqi-po-prototypes","consumer_skill":"contpaqi-figma-screens","package_version":"0.0.0+ds.aa0721e6079089f4","ds_digest":"aa0721e6079089f44b463e15c775b53d0804f6164fd6050df42ff9b5da80320f","html_sha256":"0153474c51bb47b13376a4e860caac7aabbfdbc870f03b5c70b3e53e7fd62d3a","title":"Prueba local de HTML autónomo","objective":"Comprobar interacción y traspaso con cobertura DS cero","theme":null,"viewports":[{"width":1440,"height":900}],"figmaTarget":null,"sources":[{"path":"implementations/web/src/generated/tokens.manifest.json","sha256":"d058b62cbbb517762580189f7cfa3f707d251ead38110fa47d3d9306c83cf6be"}],"screens":[{"id":"offline","name":"Prueba local","entry":"Abrir archivo","layout":"Columna","content":"Control HTML de prueba","states":[{"id":"initial","name":"initial","actions":[],"expect":[{"selector":"[aria-live]","text":"Interacciones: 0","visible":true}],"nodes":["title","action","feedback"]},{"id":"keyboard","name":"keyboard","actions":[{"selector":"button","type":"press","key":"Enter"}],"expect":[{"selector":"[aria-live]","text":"Interacciones: 1","visible":true}],"nodes":["title","action","feedback"]}]}],"transitions":[],"components":[{"instanceId":"title","componentId":"LOCAL-TITLE","exportName":"title","placement":"Prueba local","props":{},"tokens":[],"slots":[{"name":"contenido","status":"NOT_APPLICABLE","content":"Texto local"}],"omissions":["Instancia declarada sin captura visible PASS; propiedades y medidas no verificadas."],"kind":"local-content","reason":"Marcador de prueba mecánica sin autoridad DS","identity":null,"authority":"LOCAL_PROTOTYPE_ONLY","evidence":{"status":"NOT_OBSERVED","observedStates":[],"unobservedStateProps":[]}},{"instanceId":"action","componentId":"LOCAL-ACTION","exportName":"action","placement":"Prueba local","props":{},"tokens":[],"slots":[{"name":"contenido","status":"NOT_APPLICABLE","content":"Texto local"}],"omissions":["Instancia declarada sin captura visible PASS; propiedades y medidas no verificadas."],"kind":"local-content","reason":"Marcador de prueba mecánica sin autoridad DS","identity":null,"authority":"LOCAL_PROTOTYPE_ONLY","evidence":{"status":"NOT_OBSERVED","observedStates":[],"unobservedStateProps":[]}},{"instanceId":"feedback","componentId":"LOCAL-FEEDBACK","exportName":"feedback","placement":"Prueba local","props":{},"tokens":[],"slots":[{"name":"contenido","status":"NOT_APPLICABLE","content":"Texto local"}],"omissions":["Instancia declarada sin captura visible PASS; propiedades y medidas no verificadas."],"kind":"local-content","reason":"Marcador de prueba mecánica sin autoridad DS","identity":null,"authority":"LOCAL_PROTOTYPE_ONLY","evidence":{"status":"NOT_OBSERVED","observedStates":[],"unobservedStateProps":[]}}],"decisions":[],"limitations":["Cobertura DS cero; fixture de infraestructura"],"checks":[],"typography":{"status":"NOT_RUN","identity_origin":"getComputedStyle().getPropertyValue(--ds-type-style-id); observed, not inferred from font size","metric_validation":"NOT_PERFORMED; compare measured metrics and inherited overrides with the canonical recipe before Figma application","text_run_count":0,"legacy_capture_nodes":0,"unidentified_text":[],"styles":[],"catalog":null,"contract":null,"amendments":[],"native_inheritance":null},"capture":{"schema_version":1,"html_sha256":"0153474c51bb47b13376a4e860caac7aabbfdbc870f03b5c70b3e53e7fd62d3a","brief_sha256":"bc64eb065ccef7132249c571f504faa357204f2dcc14100baf89d2b80bfa72ad","status":"NOT_RUN","network":"HTTP(S) blocked; isolated renamed file with no neighboring assets","browser":null,"states":[],"errors":["Navegador no disponible: browserType.launch: Target page, context or browser has been closed\nBrowser logs:\n\n<launching> /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,BlockOriginHeaderModificationOnRedirect,Translate,AutoDeElevate,OptimizationHints,NetworkTimeServiceQuerying,AimEnabled,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --disable-updater-scheduler --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=/var/folders/_9/57g2z7357r7ft9bf8dv7nrq994mxwb/T/playwright_chromiumdev_profile-acpY48 --remote-debugging-pipe --no-startup-window\n<launched> pid=40456\nCall log:\n  - <launching> /Applications/Google Chrome.app/Contents/MacOS/Google Chrome --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,BlockOriginHeaderModificationOnRedirect,Translate,AutoDeElevate,OptimizationHints,NetworkTimeServiceQuerying,AimEnabled,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --disable-updater-scheduler --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=/var/folders/_9/57g2z7357r7ft9bf8dv7nrq994mxwb/T/playwright_chromiumdev_profile-acpY48 --remote-debugging-pipe --no-startup-window\n  - <launched> pid=40456\n  - [pid=40456] <gracefully close start>\n  - [pid=40456] <kill>\n  - [pid=40456] <will force kill>\n  - [pid=40456] exception while trying to kill process: Error: kill EPERM\n  - [pid=40456] <process did exit: exitCode=null, signal=SIGABRT>\n  - [pid=40456] starting temporary directories cleanup\n  - [pid=40456] finished temporary directories cleanup\n  - [pid=40456] <gracefully close end>\n"],"generated_at":"2026-11-11T19:39:11.598Z"}}
```
