# Seguridad previa a publicar BlueHeart en Azure · 2026-11-18

## Solicitud y condición de publicación

El usuario indicó: «antes de subir el repo ve que no haya vulnerabilidades». La publicación debe esperar el resultado de esta revisión. El registro ejecutado, huellas de archivos, estado de pruebas y disposición de cada alerta están en [reporte local](../../output/security/2026-11-18-pre-azure/report.json). Los reportes y respaldos de seguridad se excluyen de Git mediante `.gitignore`; los candidatos de secretos se redactan al 100 %.

## Hallazgos corregidos

La auditoría npm del lockfile activo encontró cinco avisos en Next.js 16.4.0: dos críticos, uno alto y dos moderados. Se actualizó únicamente la versión de Next.js a 16.4.5, con sus dependencias de plataforma en el lockfile. Las demás versiones directas se conservaron. Se instaló sin ejecutar scripts de paquetes; se respaldó de forma reversible la instalación anterior y se usó un store local del proyecto, sin modificar el store de otro repositorio.

- [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw): RCE en optimización de imágenes SVG.
- [GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr): RCE en funciones `use cache` con typed arrays.
- [GHSA-p3m5-59mp-jv5r](https://github.com/advisories/GHSA-p3m5-59mp-jv5r): denegación de servicio en Server Actions.
- [GHSA-mfr8-8qww-v76h](https://github.com/advisories/GHSA-mfr8-8qww-v76h) y [GHSA-vc7v-qv4w-wrv8](https://github.com/advisories/GHSA-vc7v-qv4w-wrv8): filtraciones de datos en caché.

El nuevo `pnpm audit --json` informó 0 vulnerabilidades conocidas en 157 dependencias contabilizadas. `pip-audit` no encontró vulnerabilidades conocidas en las 30 dependencias del runtime Graphify registrado, sin omisiones. Se conservaron ambas evidencias.

Se sustituyeron seis `assert` de gates del índice por excepciones explícitas: Python `-O` ya no puede omitir cobertura semántica, endpoints, comprobación de bucles, verificación PASS o integridad del manifiesto. Dos pruebas ejecutadas con `-O` comprueban rechazo de cobertura ausente y prohibición de publicar un manifiesto tras FAIL. El MD5 de compatibilidad con la caché Graphify se declaró `usedforsecurity=False`; la integridad sigue usando SHA-256. El adaptador Azure resuelve las rutas de los ejecutables y limita el envío de su cabecera de autenticación a la ruta exacta del API de este repositorio o sus subrutas.

## Secretos y revisión de código

Gitleaks 8.30.1 se obtuvo del release oficial y su SHA-256 se comprobó contra el archivo de checksums. Se analizó el historial completo de 16 commits y un snapshot de 11 048 archivos Git actuales y nuevos no ignorados, sin incluir instalaciones de dependencias. No se usaron allowlists globales ni se desactivaron reglas del escáner.

La regla `generic-api-key` emitió 62 979 alertas históricas y 113 262 del snapshot actual. Se releyeron los 879 blobs históricos implicados y los 4 086 archivos actuales con candidatos. La clasificación verificó valores con formatos restringidos: claves publicadas de Figma de 40 caracteres hexadecimales, IDs de archivos conocidos, hashes de fuentes SHA-256 y referencias semánticas de tokens de diseño. Cuando las columnas del diff no identificaban directamente el valor, se comprobó el conjunto completo de valores de ese campo en el blob; solo se clasificó si todos correspondían a esos formatos. Quedaron 0 candidatos sin resolver. No se confirmó una credencial real. Las reglas específicas de credenciales no emitieron resultados.

Bandit revisó los scripts activos, workflows y herramientas de implementación Figma. Tras las correcciones conservó 27 observaciones: 25 bajas, una media y una alta. Se revisaron por contexto:

- `B324` alta en `github_workflow.py`: cálculo del object ID SHA-1 requerido por el formato Git del repositorio (`git rev-parse --show-object-format` devuelve `sha1`). No cifra secretos ni sustituye SHA-256 del catálogo; cambiar de algoritmo rompería la comprobación de blobs Git. Se conserva visible en el reporte como observación del protocolo, no como un hallazgo de ejecución o exposición de credenciales confirmado.
- `B102` media en `prepare-radio-group-audit.py`: ejecuta una herramienta local fija del mismo repositorio, sin interpolar entrada externa. No es un endpoint de producto ni ejecuta contenido recibido por red.
- Observaciones bajas: invocaciones locales sin shell y comprobaciones de scripts de implementación histórica. No se ocultaron mediante `nosec`.

También se revisaron descarga autenticada, redirecciones, rutas de archivos, extracción de bundles, consultas del índice y puntos de lectura/escritura del inicializador y exportador HTML. Las reglas de producto siguen en sus contratos; esta revisión no modifica el diseño.

## Validación y límites

`pnpm verify` pasó con Next.js 16.4.5: 50 familias al día, TypeScript, 12 pruebas y exportación estática de producción. Se regeneraron tres derivados de Header que el primer check encontró desactualizados; el generador no modificó los contratos ni componentes.

La suite Python incorpora dos pruebas nuevas de seguridad. Tras cambiar dependencias, una prueba de materialización rechazó correctamente el manifiesto anterior por hash de `package.json` distinto; se regenera el catálogo antes de la comprobación final. El resultado final de las 27 pruebas y del cierre está en el reporte local. Los ZIP Azure 1.0.9 se conservan como lanzadores; el DS remoto se versiona por el commit y los hashes del nuevo catálogo.

El análisis de dependencias corresponde al corte activo. Los paquetes y lockfiles históricos se preservan para trazabilidad y no constituyen el canal soportado; las skills prohíben utilizarlos como fallback. No se reescribió el historial Git ni se afirmó una prueba de penetración o una validación de permisos de escritura de Azure. Los análisis de secretos no descomprimen archivos anidados; los ZIP nuevos Azure fueron inspeccionados por separado y contienen únicamente su SKILL.md.

El intento REST anónimo no acreditó acceso. La prueba posterior del adaptador sí autenticó la lectura con las credenciales Git existentes y confirmó el repositorio Azure habilitado, tamaño 0 y sin rama predeterminada. No se registraron valores de credenciales. La publicación y la integración real tienen comprobantes propios y no se deducen del éxito de un escáner.

## Referencias y evidencia

- [Guía Azure 1.0.9](../../references/AZURE-SKILL-CONSUMPTION.md).
- [API y configuración de Gitleaks](https://github.com/gitleaks/gitleaks/tree/v8.30.1).
- [pnpm audit](https://pnpm.io/cli/audit).
- [pip-audit](https://github.com/pypa/pip-audit).
- Evidencia local: `output/security/2026-11-18-pre-azure/` (audit inicial/final, Gitleaks redactado, clasificación, Bandit, respaldos y resultado final).
- Cierre de este corte: `output/closures/2026-11-18-azure-security.json`.
