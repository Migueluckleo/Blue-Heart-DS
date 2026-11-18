---
contract_schema: sdd-project/0.2
contract_id: AVATAR-001
name: Avatar
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Avatars
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/avatar.v1.0.0.json
source_data_digest_sha256: a21e14008572c8e45567c034e94b0ed4f4887b329cf08f0df859f5fde7ade1d6
data_refs: [specs/data/avatar.v1.0.0.json, specs/data/avatar.assets.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001, DOT-001]
---

# Avatar · AVATAR-001

El [contrato fuente v3.0.0](../../sources/figma-snapshots/root-families-2026-11-11/avatar.3.0.0.md.txt), el [JSON delegado](../data/avatar.v1.0.0.json) y el [manifiesto de la fotografía](../data/avatar.assets.v1.0.0.json) conservan doce combinaciones image, icon y text en cuatro tamaños. Status es Dot vinculado y expuesto en los tamaños de presencia. User Outline/Light y Buildings de Phosphor son los iconos preferidos del swap. P-SLOTS NOT_APPLICABLE por anatomía fija, texto, visibilidad y swap acotados.

## Guía semántica normativa

Representa una persona o entidad. Usa foto disponible, iniciales de un nombre fiable o el icono cuando no haya representación fiable. Conserva acentos y Ñ en las iniciales. El anfitrión suministra el nombre completo y decide si el Avatar es decorativo cuando el nombre ya está visible. Muestra presencia solo si aporta información al contexto, con un texto accesible.

| Situación | Haz | Evita |
|---|---|---|
| Cuenta de una persona | Usa foto autorizada o iniciales del nombre. | Derivar iniciales de identificadores fiscales. |
| Presencia relevante | Comunica «Disponible», «Ocupado» o «Inactivo» con un nombre accesible. | Depender solo del color o mostrar presencia en listados donde no aplica. |
| Nombre visible junto al avatar | Marca la representación como decorativa si el texto ya comunica su identidad. | Duplicar el anuncio del mismo nombre. |

La representación no añade navegación. El anfitrión aporta foco y área de toque cuando el avatar forma parte de un control. [Atlassian Avatar](https://atlassian.design/components/avatar)

## Description exacta

AVATAR-001 · Usa Avatar para representar personas o entidades con foto, iniciales o icono. Conserva el nombre accesible y muestra presencia solo si aporta contexto. Evita inferir iniciales desde identificadores o depender solo del color. Ejemplo: JA con estado Disponible. Ficha local: Avatar / AVATAR-001.

## Aceptación

Verificar doce variantes, los roles propios, tres estilos, User y Dot oficiales, visibilidad, nombres y geometría. Verificar la identidad binaria y el transform de la fotografía en los cuatro fills. En web comprobar las representaciones, fallback, tamaño y nombre.
