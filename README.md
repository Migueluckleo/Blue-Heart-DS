# BlueHeart DS · Base de reconstrucción

**Versión operativa integrada:** 0.5.0

Registra las primeras ligas en [Recepción de fuentes](registry/sources.md) y [su configuración](config/figma-links.json). Consulta [AGENTS](AGENTS.md) para seleccionar P01–P08 y P-SLOTS.

1. Registrar fuentes y roles según P02. Mantener las capturas y hashes junto al registro.
2. Preparar el contrato MD y datos delegados con las [plantillas](templates/component.contract.template.md). Pasar QA documental y registrar la delegación del alcance solicitado.
3. Implementar y verificar los destinos autorizados. Figma requiere maestro identificado y preflight P04. El consumo editable requiere el sandbox correspondiente.
4. Cerrar con `scripts/ds close --run ID`. Si pide semántica, leer el plan y la skill Graphify, extraer y reanudar con el mismo ID.

Entradas locales en [herramientas](references/PROJECT-TOOLING.md), [cierre](references/EFFICIENT-CLOSURE.md) y [catálogo web](implementations/web/README.md). El comprobante de cierre y el de verificación inicial se guardan en `output/`.
