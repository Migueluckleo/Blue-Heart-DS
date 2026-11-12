# QA de implementación · Stepper

2026-11-12 · STEPPER-001 · PASS en Figma y web.

## Figma

Stepper `1020:594` → `156:131`. Progress line `1020:562` → `155:19`. La página `155:2` conserva únicamente estos dos sets. La [lectura del conector](../../implementations/figma/root-families-2026-11-11/stepper-line-0.readback.json) comprobó ocho variantes. Las cinco lecturas de Stepper, desde el [primer lote](../../implementations/figma/root-families-2026-11-11/stepper-item-0.readback.json), comprobaron las 18 variantes con cero diferencias. La inspección visual confirmó orientaciones, terminales y la jerarquía entre marca, título y caption. [Maestro en Figma](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=156-131)

La [lectura desde instancias](../../implementations/figma/root-families-2026-11-11/stepper-modes.readback.json) verificó 72 pares de variante y tema, fills de marca, glyph, texto y conectores, identidades Phosphor, textos editables, toggles de visibilidad y swap. Se retiraron todas las instancias temporales. El maestro y el ejemplo de origen carecen de reacciones.

## Web

TypeScript, nueve pruebas Node, build Next y [QA dirigido en Chrome](../../implementations/web/tests/stepper.browser.mjs) pasaron. Chrome verificó los cuatro temas en ambas orientaciones, los tramos del paso actual, las dimensiones de marca y conector, una única referencia `aria-current="step"`, estados textuales y los controles del anfitrión con Enter y Espacio. El foco pasó al encabezado del nuevo paso. El catálogo incluye 40 familias.

| Modo | Marca | Acento | Glyph de marca sobre acento | Blanco sobre marca |
|---|---|---|---|---|
| Contable | #3255F7 | #BFCEFE | 3.567:1 | 5.558:1 |
| Administrativo | #037255 | #93D3BF | 3.476:1 | 5.929:1 |
| Servicios | #DC2F00 | #FFD8C8 | 3.575:1 | 4.719:1 |
| Personas | #8300F8 | #E0CAFC | 4.223:1 | 6.324:1 |

El título en #64748B sobre blanco mide 4.759:1. Caption conserva #94A3B8, con 2.564:1 sobre blanco. La ficha de uso reserva Caption para apoyo complementario. El estado del paso tiene una alternativa textual y el anfitrión presenta las instrucciones imprescindibles.
