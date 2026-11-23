---
contract_schema: sdd-project/0.2
contract_id: FOUNDATIONS-CAUTION-001
name: Caution
type: foundation-amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
date: 2026-11-23
amends: [FOUNDATIONS-BLUEHEART-VARIABLES-001, FOUNDATIONS-BODY-001, BADGE-001, LINEAR-PROGRESS-001]
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/tokens/caution.v1.0.0.json
source_data_digest_sha256: 73296fcba662f7aacf2e6b6d637a4fe06ffb83e32e238db30cd7478725f3e217
data_refs: [specs/tokens/caution.v1.0.0.json]
consumption_targets: [figma, web]
---

# Caution · ampliación semántica

## Autoridad y alcance

EXPLICIT: el usuario adoptó la propuesta final de nueve tonos del chat, retiró el stroke del badge y solicitó construcción e implementación en Figma para Body, Linear Progress Bar y Badge. El 23 de noviembre eligió crear `caution-orange/100–900` y conservar Servicios. La gama `orange` existente conserva identidad y valores. Esta enmienda amplía exclusivamente Caution; success, warning, danger y las marcas permanecen vigentes.

Los datos JSON delegados gobiernan valores, IDs lógicos, aliases, modos, scopes, codeSyntax y la única description canónica por token. El nombre local Figma de la colección primitiva es `primitives`; el adaptador web conserva el identificador histórico `primitive`. Los IDs reales de destino se registran en el mapa de implementación, separados de los lógicos.

## Requisitos

- REQ-CAUTION-01 MUST crear nueve primitivas `caution-orange/100–900` exactamente como el JSON. No sustituir `orange` ni crear una cuarta colección.
- REQ-CAUTION-02 MUST crear semantic `caution-subtle` → 100, `caution-accent` → 200, `caution-default` → 500 y `caution-strong` → 700. Todos consumen aliases locales; no hay literales en semantic/component.
- REQ-CAUTION-03 MUST crear ocho tokens component del JSON: cuatro Body, tres Badge y uno Linear Progress. Cada uno apunta a semantic en Contable, Administrativo, Servicios y Personas. Solo Body aparece en selectores, con scopes por propiedad; el resto conserva scopes vacíos y codeSyntax WEB válido.
- REQ-CAUTION-04 MUST añadir `type=caution` a Badge en small, medium y large: fondo subtle (#FDEADB), texto e iconos strong (#9A3F06), strokes vacíos. Conservar HUG, alturas, tipografía, Label, booleanas, swaps Phosphor y default subtle/small; total resultante 21 variantes.
- REQ-CAUTION-05 MUST añadir `type=caution` a los tres sets públicos de Linear Progress Bar, con 0/25/50/75/100% e indeterminate. Indicador default (#EE7A1A). Conservar tokens internos restantes, geometría, Header, Label, Value, Helper text, visibilidad y mínimo 120 px; total 30 variantes por set.
- REQ-CAUTION-06 MUST ampliar el auxiliar privado con tres fases Caution rest/exit/enter. Los enlaces y el ciclo apuntan exclusivamente a las nuevas variantes Caution, con los mismos triggers/transiciones del baseline. Las tres instancias públicas indeterminadas consumen ese auxiliar. Las muestras determinadas conservan su secuencia dentro de Caution. Total 15 fases privadas y 105 variantes Progress (90 públicas + 15 privadas).
- REQ-CAUTION-07 MUST exponer Body Caution como roles de contenido libre, no como nueva familia ni una Card maestra. Se conserva la convención de páginas Badge y Linear Progress Bar y sus IDs. La comparación editable vive en Playground.
- REQ-CAUTION-08 MUST extender la API web con `type="caution"`, aliases CSS generados, muestras y documentación. Sin lógica de negocio añadida: el anfitrión decide los umbrales y aporta los datos, mensajes y significado concreto; Caution no impone automáticamente un rango porcentual.

## Guía semántica

Caution comunica precaución mediante la familia naranja de la propuesta, visualmente distinguible de Warning ámbar y Danger rojo. Acompañar el color con una etiqueta explícita. Badge permanece informativo y sin interacción ni borde. Linear Progress conserva el valor real y permite un mensaje de contexto; el color no representa una transición automática de estado. Body proporciona fondo, texto, contorno y formas para contenido de producto; un token stroke disponible en Body no añade un borde al Badge.

## Construcción y QA

UPDATE aditivo de las páginas existentes Badge 64:2 (set 64:90), Linear Progress Bar 39:2 (sets 39:29, 39:87, 40:175, 40:348). Reutilizar dependencias y clonar las variantes warning equivalentes como baseline estructural, reemplazando únicamente el tipo y los bindings Caution. P-SLOTS NOT_APPLICABLE: esta ampliación de color no modifica anatomía, cardinalidad ni el mecanismo de contenido.

Verificar 21 tokens, 21 variantes Badge, 105 Progress, ausencia de cambios en variantes anteriores, cadena por ID y modo, scopes, codeSyntax y descripción, swaps/booleanas y reacciones. Comprobar una muestra editable con instancias en Playground y sus cuatro temas. QA web: generación, ds:check, typecheck, build y comprobaciones de Caution determinado/indeterminado y ausencia de stroke en Badge. No atribuir QA histórico nuevo ni revisión humana no ejecutada.
