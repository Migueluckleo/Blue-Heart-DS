# DEC-DS-SKILLS-001 · skills de consumo versionadas

**Fecha:** 2026-10-14. **Estado:** decisión explícita del usuario para este alcance.

El usuario solicitó dos skills actualizables como entregables de cada alta o modificación documentada del DS. Confirmó crear dos nuevas con nombres distintos de las existentes y, cuando falte una pieza en un prototipo, componer una solución local documentada siguiendo componentes, tokens y patrones existentes.

- `contpaqi-figma-screens`: construir pantallas editables mediante las herramientas Figma desde un prompt, referencias visuales o el Markdown de traspaso. Reutilizar componentes del DS que satisfagan la necesidad. Los faltantes pueden componerse como componentes locales en el archivo de la pantalla, con procedencia y sin alterar la biblioteca maestra.
- `contpaqi-po-prototypes`: producir prototipos React, TypeScript, Tailwind y Next.js para PO, entregados como HTML interactivo autónomo sin servidor de ejecución. Entregar también Markdown que invoque la primera skill con identidades, configuración, composición, estados y medidas del resultado real.
- Mantener ambas desde fuentes versionadas en este repositorio, empaquetarlas con el mismo corte de contratos/tokens/código y comprobar que no quedan desactualizadas al cerrar un componente. Conservar `contpaqi-poc-builder` y `contpaqi-html-prototype` sin modificaciones.

El antecedente explica el empaquetado de los motores. En este corte se generan y verifican los paquetes locales. Una instalación requiere su propio alcance autorizado. El mantenimiento posterior actualiza únicamente copias gestionadas verificadas; no sobrescribe ediciones ajenas. No autoriza publicación remota, cambios en la biblioteca Figma, instalación de servicios, reglas de negocio inventadas ni ampliación de tokens canónicos. Una composición local documentada no es un alta del DS.

Procedimiento: [P08](../protocols/08-SKILLS-AND-RELEASES.md). Fuentes de las skills: [Figma](../skills/contpaqi-figma-screens/SKILL.md) y [PO](../skills/contpaqi-po-prototypes/SKILL.md). Releases y evidencia se registran por separado en [skills](skills.md).
