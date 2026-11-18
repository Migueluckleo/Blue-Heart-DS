# QA de la variante Azure 1.0.9 · 2026-11-18

Solicitud explícita: preparar una versión de las skills 1.0.9 para consumir el repositorio Azure del usuario. Se revisaron P05, P06, P08, skill-creator, lanzadores actuales, adaptador compartido y documentación oficial Azure REST 7.1.

`IMPLEMENTATION_REVIEW` local: `PASS`. La suite ejecutada contiene 25 pruebas; la validación oficial de ambos lanzadores pasó. La revisión independiente pasó con 8 pruebas y una simulación sin credenciales que bloqueó antes de abrir red. Los ZIP del canal Azure fueron generados y comprobados por hashes. Se verificó que el empaquetado no altera el puntero del canal GitHub y que un archivo publicado alterado no se repara silenciosamente.

El intento REST anónimo devolvió HTTP 203 HTML de inicio de sesión. Posteriormente, el adaptador se autenticó con las credenciales Git existentes y confirmó un repositorio de tamaño 0, sin rama predeterminada. La integración de consumo queda `BLOCKED_UNPUBLISHED_SOURCES` hasta publicar el corte. Git ls-remote no se usó como prueba de autenticación. No se publicó, instaló, construyó Figma ni afirmó QA visual de una pantalla.

Guía y detalle reproducible: [consumo Azure](../../references/AZURE-SKILL-CONSUMPTION.md). Evidencia: [reporte JSON](../../output/qa/azure-skills-2026-11-18/report.json). Cierre global: `output/closures/2026-11-18-azure-skills-1-0-9-final.json`, con su resultado propio.

`user_audit: NOT_REQUIRED` · `human_review_policy: OPTIONAL_NON_BLOCKING`.

Actualización de seguridad: Next.js se corrigió a 16.4.5; la auditoría npm pasó con cero avisos conocidos. La revisión y el cierre posteriores se registran en [seguridad previa a Azure](../tooling/azure-prepublication-security-2026-11-18.md); el comprobante inicial conserva el corte que validó antes de esa actualización.
