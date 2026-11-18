# Prefijo Azure para las skills 1.0.9 · 2026-11-18

Solicitud explícita: «A las skills de Azure ponles el prefijo Azure para que se diferencien».

Los nombres instalables y sus ZIP son `azure-contpaqi-po-prototypes` y `azure-contpaqi-figma-screens`. Se conservan la versión 1.0.9 y las entregas históricas. El nuevo canal de paquetes usa `output/skills/azure-prefixed/1.0.9/`; cada ZIP contiene su carpeta con prefijo y un único SKILL.md cuyo `name` coincide.

Azure acepta los nombres nuevos al arrancar y resuelve las carpetas canónicas de workflows compartidos. La sesión y el release registran la identidad con prefijo; `companion_skill` también identifica al proveedor. El traspaso Markdown usa esa identidad para invocar la skill Figma correcta. Las skills GitHub siguen usando sus nombres originales.

La validación oficial de ambos SKILL.md pasó. El empaquetado e inspección de integridad pasaron. La primera prueba de materialización detectó correctamente el hash anterior de la guía modificada, por lo que el catálogo se regenera antes de la comprobación final. Las pruebas de regresión verifican las identidades y el compañero de las dos sesiones Azure. El resultado final y la publicación se registran en `output/qa/azure-prefix-2026-11-18/report.json`; cierre del corte: `output/closures/2026-11-18-azure-prefix.json`.

No se modificaron dependencias ni reglas visuales. Se mantiene el control de seguridad previo a publicar: la revisión del delta comprueba que no se agregan secretos y que el lockfile coincide con el auditado. No se instalaron las skills en esta máquina.

`user_audit: NOT_REQUIRED` · `human_review_policy: OPTIONAL_NON_BLOCKING`.
