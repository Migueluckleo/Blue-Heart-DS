# Implementaciones y bindings

Registro inicial vacío. Registrar alcance, fuente, versión y evidencia según [P05](../protocols/05-SELF-DOCUMENTATION-AND-TRACEABILITY.md).

## FOUNDATIONS-BLUEHEART-VARIABLES-001 v0.1.2

AI Blueheart DS · tres colecciones locales · `VALIDATED` para variables. [Mapa](../implementations/figma/variables-2026-11-11/id-map.json), [readback final](../implementations/figma/variables-2026-11-11/final-collections.readback.json) y [estado](../implementations/figma/variables-2026-11-11/blueheart-variables.v0.1.2.state.json). Escritura efectiva confirmada para variables.

## Buttons y Loader

Maestro AI Blueheart DS. [Página Buttons](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=22-3) y [página Loader](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=22-2). [IDs Buttons](../implementations/figma/buttons-loader-2026-11-11/buttons.state.json) y [IDs Loader](../implementations/figma/buttons-loader-2026-11-11/loader.state.json). El catálogo local Next.js exporta ambas familias.

## Logos · LOGOS-001

[Logos en AI Blueheart DS](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=170-2) · Figma VALIDATED_WITH_EXCEPTIONS por redondeo subpíxel documentado. Cinco sets y 68 variantes transferidos con copia nativa desde Librería v1.1.0. [Ficha, localizadores y matriz](../implementations/figma/logos-2026-11-12/README.md) · [Lectura final](../implementations/figma/logos-2026-11-12/fidelity.readback.json). Web NOT_APPLICABLE.

## Characters · CHARACTERS-001

[Página Characters](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=187-14) · BENI Standby `187:51`, NAVI Analysis `187:112`. [Mapa y lectura](../implementations/figma/characters-2026-11-12/readback.json) · [Ficha web](../implementations/web/docs/components/characters.md).

## Conversation Composer · CONVERSATION-001

[Maestro oficial 216:66](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=216-66), en la página Conversation Composer 216:109. React y ejemplo Next consumen los tokens y controles oficiales. [Lectura Figma](../implementations/figma/conversation-composer-2026-11-12/readback.json) · [Ficha técnica](../implementations/web/docs/components/conversation-composer.md) · [QA Figma y Chrome](../qa/implementations/conversation-composer.v1.0.0.review.md).

## Conversation Response · CONVERSATION-RESPONSE-001

[Set oficial 222:72](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=222-72) · página 222:309 y auxiliar Preview 222:111. La implementación web exporta la respuesta, la tarjeta y el glyph de copia para Icon Button. [Lectura de Figma](../implementations/figma/conversation-response-2026-11-12/readback.json) · [Ficha web](../implementations/web/docs/components/conversation-response.md).

## Consumo de tokens de componente · 2026-11-12

App Shell, Conversation Composer, Conversation Response y Stepper consumen los aliases de componente de la corrección. [Lectura posterior](../implementations/figma/component-token-layer-correction/readback.json) · [Mapa delegado](../specs/tokens/component-layer.correction.json).
