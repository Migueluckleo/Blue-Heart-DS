# QA documental · Conversation Response / Preview

2026-11-24 · CONTRACT_REVIEW **PASS** para la [enmienda de layout](../../specs/components/conversation-response.preview-layout.amendment.v1.0.0.md) y sus [datos delegados](../../specs/data/conversation-response.preview-layout.v1.0.0.json), versión 1.0.0. Estado DELEGATED_FOR_BUILD por DEC-AI-TECHNICAL-CLOSURE-001, user_audit NOT_REQUIRED y human_review_policy OPTIONAL_NON_BLOCKING. El alcance solicitado es documental; no habilita implementación adicional.

| Control | Evidencia y resultado |
|---|---|
| CR-PREVIEW-01 | PASS. Maestro local 222:111, key y página reales; auxiliar privado de Conversation Response, no nueva familia pública. |
| CR-PREVIEW-02/03 | PASS. Preview details HORIZONTAL/NO_WRAP, gap 8, FILL/HUG; Title FILL/HUG y Badge HUG/HUG. Título no truncado, con auto-resize HEIGHT. |
| CR-PREVIEW-04/05 | PASS. Referencia 544×82, glyph 24, padding/gap 16, stroke 1 INSIDE incluido en layout, radio 8. Medidas de muestra separadas de reglas de sizing. |
| CR-PREVIEW-06 | PASS. Única propiedad Title#765:0; tipografía 16/24 Bold con bindings propios. Estilo badge/label-medium leído; Title sin estilo nombrado. |
| CR-PREVIEW-07 / TOKEN-QA-01 | PASS de lectura acotada. 29 variables directamente ligadas, 44 dependencias alias, 73 locales resueltas por cuatro modos; usos, IDs, scopes y codeSyntax retenidos en evidencia. No se ejecutó una auditoría global ni se alteraron tokens. |
| CR-PREVIEW-08 | PASS. Instancias BENI 222:172 y NAVI 222:267 heredan la fila; solo overrides raíz width/height. |
| P-SLOTS | NOT_APPLICABLE al cambio interno del auxiliar: partes fijas y un texto editable. REQUIRED de la familia anfitriona se conserva; no se atribuyen nuevas pruebas de operaciones a esta lectura. |
| Extracción y coherencia | PASS. 11 nodos, sin pendientes o truncamiento; cuatro instancias, tres componentes únicos y un estilo nombrado. MD/YAML/JSON se generan del mismo modelo normalizado; roundtrip YAML→JSON mediante Ruby/Psych PASS. [Comprobante](../../sources/figma-snapshots/conversation-preview-2026-11-24/validation.json). |
| Referencia anterior | PASS. La fuente anterior corresponde al remoto 218:1228; se evita presentar 115→82 como before/after del mismo ID local. Los snapshots del 12 de noviembre y los datos base permanecen intactos. |
| Web / TOKEN-QA-02 | **STALE_FOR_PREVIEW_LAYOUT** por lectura de código: el contenedor título/Badge aún usa flex-col. QA de navegador, build y nuevas interacciones NOT_EXECUTED; no son evidencia de esta tarea documental. |
| Visibilidad / TOKEN-QA-03 | PASS acotado: las 29 variables component usadas mantienen scopes=[] en la lectura. El encargo no cambia scopes, bindings ni publicación y no renueva el QA global del selector. |

Fuente actual: [MD](../../sources/figma-snapshots/conversation-preview-2026-11-24/component-contract.md), [YAML](../../sources/figma-snapshots/conversation-preview-2026-11-24/component-contract.yaml), [evidencia cruda](../../sources/figma-snapshots/conversation-preview-2026-11-24/raw-evidence.json) y [captura](../../sources/figma-snapshots/conversation-preview-2026-11-24/preview.png). Los datos de layout delegan solo ese alcance; los valores de tokens siguen en foundations. No hay nuevas reglas de producto o navegación.

Limitaciones: versión/archivo de bibliotecas externas no expuestos por MCP; no se probó reflow en otros anchos ni contenido editado; la lectura no expone semántica ARIA ni acredita conformidad WCAG. No se modificó Figma ni código de aplicación. Catálogo y Graphify se verifican en el cierre local separado de este PASS documental.
