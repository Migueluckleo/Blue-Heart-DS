---
contract_schema: sdd-project/0.2
contract_id: SEARCH-001
name: Search
type: component
status: DELEGATED_FOR_BUILD
version: 1.0.0
figma_page_name: Search
target_file_key: yZsIpXywybsPDytjolwcP4
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: NOT_APPLICABLE
source_data_ref: specs/data/search.v1.0.0.json
source_data_digest_sha256: e59e8ea78b292287337f50321acfda6984047b5b46bc8d2ba6bb8204e4124271
data_refs: [specs/data/search.v1.0.0.json]
dependencies: [FOUNDATIONS-BLUEHEART-VARIABLES-001]
---

# Search · SEARCH-001

El [contrato fuente](../../sources/figma-snapshots/root-families-2026-11-11/search.1.0.0.md.txt) y el [JSON delegado](../data/search.v1.0.0.json) conservan 15 variantes, tres tamaños, Placeholder, Value, Label y Show label. Placeholder y Value son independientes y se consumen en los estados de su propiedad. MagnifyingGlass y X reutilizan Phosphor oficial. Resultados y criterios de búsqueda pertenecen al anfitrión. P-SLOTS NOT_APPLICABLE por anatomía fija.

## Guía semántica normativa

Usa Search para localizar o filtrar elementos dentro de un conjunto identificable. Explica qué se puede buscar y conserva el nombre accesible aunque Label se oculte. El anfitrión decide cuándo ejecutar la consulta y cómo presentar resultados, errores y estados vacíos. Mantén el texto introducido por la persona y conserva el foco al limpiar.

| Situación | Haz | Evita |
|---|---|---|
| Catálogo de comprobantes | Usa «Nombre, RFC o folio» para indicar el alcance. | Usar el campo como captura de un dato de negocio. |
| Consulta explícita | Permite enviar con Enter y conserva el texto con acentos o Ñ. | Atribuir al campo un algoritmo o servicio de búsqueda. |
| Consulta escrita | Usa X con el nombre «Limpiar búsqueda» y devuelve el foco al campo. | Dejar un control sin nombre o mover el foco a resultados vacíos. |

El anfitrión controla el tamaño de toque y la región de resultados. El contraste del borde default observado conserva la limitación de la fuente. [Carbon Search](https://www.carbondesignsystem.com/building-blocks/core/components/search/guidelines)

## Description exacta

SEARCH-001 · Usa Search para buscar o filtrar en una vista. Explica qué se puede buscar, conserva un nombre accesible y devuelve el foco al limpiar. El anfitrión decide consulta y resultados. Evita usar Search como captura de un dato. Ejemplo: Nombre, RFC o folio. Ficha local: Search / SEARCH-001.

## Aceptación

Verificar 15 variantes, propiedades independientes, truncamiento, estilos, anillo, 30 variables y 18 iconos vinculados. Comprobar Enter, limpieza, foco y texto con acentos en web.
