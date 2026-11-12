---
contract_schema: sdd-project/0.2
contract_id: AVATAR-GROUP-001
name: Avatar group
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Avatars
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/data/avatar-group.v1.0.0.json
source_data_digest_sha256: c6c6f17677fc1ef546ea608a69f93829af439f021051f5c9d4295d0fcc3675cc
data_refs: [specs/data/avatar-group.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, AVATAR-001]
---

# Avatar group · AVATAR-GROUP-001

El [contrato fuente v3.0.0](../../sources/figma-snapshots/root-families-2026-11-11/avatar-group.3.0.0.md.txt) y el [JSON delegado](../data/avatar-group.v1.0.0.json) fijan cuatro tamaños y un Slot Avatars nativo con preferencia exclusiva por Avatar. P-SLOTS REQUIRED. Admite de dos a cuatro instancias del tamaño del grupo, con Show status apagado. Los alternos y el contador conservan roles propios y el anillo del Avatar. La muestra nativa usa cuatro instancias de texto y sigue disponible con la reconstrucción del fill fotográfico pendiente.

## Guía semántica normativa

Usa Avatar group para representar varias identidades asociadas al mismo trabajo. Muestra dos a cuatro identidades. Cuando haya más de cuatro, muestra tres y el contador +N, donde N es el total menos tres. El anfitrión proporciona los nombres accesibles y decide cómo mostrar la lista completa cuando haga falta.

| Situación | Haz | Evita |
|---|---|---|
| Dos a cuatro participantes | Usa el mismo tamaño y conserva el orden del anfitrión. | Mezclar tamaños o añadir indicadores de presencia. |
| Siete participantes | Muestra tres y «+4», con «y 4 más» como texto accesible. | Tratar el +4 de muestra como una constante. |
| Una identidad | Usa Avatar individual. | Mantener un grupo vacío o de un solo hijo. |

La edición en Figma es manual. Los colores alternos distinguen representaciones y conservan la excepción de contraste del contrato fuente. [Atlassian Avatar group](https://atlassian.design/components/avatar-group/examples)

## Description exacta

AVATAR-GROUP-001 · Usa Avatar group para varias identidades del mismo contexto. Coloca 2–4 Avatar del mismo tamaño, sin Status. Para más de cuatro, muestra tres y +N. Conserva nombres accesibles. Evita tratar +4 como constante. Ficha local: Avatar group / AVATAR-GROUP-001.

## Aceptación

Verificar cuatro variantes, Slot común, preferencia, límites, vínculos, fondos alternos y contador. Desde instancias comprobar inserción, retirada y orden con Avatar de texto o icono. En web verificar cálculo y nombre accesible de +N.
