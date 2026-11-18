---
contract_schema: sdd-project/0.2
contract_id: DROPDOWN-MENU-001-SEARCH
name: Dropdown menu · búsqueda opcional
type: amendment
status: DELEGATED_FOR_BUILD
version: 1.0.0
amends: DROPDOWN-MENU-001
figma_page_name: Dropdown
target_file_key: yZsIpXywybsPDytjolwcP4
target_node_ids: ["119:17"]
user_audit: NOT_REQUIRED
human_review_policy: OPTIONAL_NON_BLOCKING
slot_applicability: REQUIRED
source_data_ref: specs/tokens/dropdown-menu.search.v1.0.0.json
source_data_digest_sha256: 6e815076a56f45c2c2d31a344beb10c3cf4b4460620eadf47cb08a4e25ee9ab7
data_refs: [specs/tokens/dropdown-menu.search.v1.0.0.json]
dependencies: [DROPDOWN-MENU-001, DROPDOWN-ITEM-001, SEARCH-001, FOUNDATIONS-TOKEN-VISIBILITY-001]
---

# Dropdown menu · búsqueda opcional

## Alcance y evidencia

La solicitud EXPLICIT del 18 de noviembre de 2026 añade la opción para mostrar búsqueda al Dropdown existente. Fuente OBSERVED: [430:16410](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=430-16410), 320 × 258 px, Search local small/default de 32 px, cinco opciones medium de 40 px, padding 4 px y separación búsqueda–opciones de 16 px. [Captura estructural](../../sources/figma-snapshots/dropdown-search-2026-11-18/source-before.json). No cambia la versión del contrato base ni la identidad del componente 119:17.

## Reglas delegadas

| ID | Regla | Procedencia y QA |
|---|---|---|
| DM-S01 | `Show search` BOOLEAN / React `showSearch` es false por defecto. Activarlo muestra Search small sobre Options. Desactivarlo conserva el selector simple. | EXPLICIT opción + DERIVED compatibilidad. Probar ambos valores y regresión. |
| DM-S02 | Search llena el ancho disponible. Padding de contenido 4 px y gap 16 px. El menú conserva ancho compartido con su disparador, superficie, borde, sombra y viewport máximo de 320 px. | OBSERVED. Geometría y tokens. |
| DM-S03 | Conservar el Slot nativo Options#119:0, su contenido, preferencias y cardinalidad; Search es anatomía del menú, fuera del Slot. | P-SLOTS y preservación. Insertar/quitar/reordenar en instancia con y sin búsqueda. |
| DM-S04 | El menú usa `dropdown/spacing/menu-search-gap` → semantic spacing-lg → primitive spacing/16. Search e ítems conservan tokens propios. Internos con scopes vacíos; solo body/* tiene scopes visibles. | EXPLICIT política vigente. TOKEN-QA-01/02/03 y cuatro temas. |
| DM-S05 | En web se filtra por label y description, sin distinguir mayúsculas ni acentos. La consulta no cambia la selección; cerrar reinicia la consulta local. | DERIVED comportamiento técnico para la opción solicitada. Teclado y selección persistente. |
| DM-S06 | Filtrar conserva grupos con coincidencias; elimina headers y dividers huérfanos. Coincidencias disabled siguen visibles y no se eligen. Sin coincidencias se anuncia `Sin resultados`, sin opción ficticia. | DERIVED adaptación accesible. Lista vacía y grupos. |
| DM-S07 | Al abrir con búsqueda, el foco pasa al campo. Flechas recorren opciones habilitadas y Enter confirma. Espacio/Home/End conservan edición de texto. Escape cierra y devuelve foco al disparador; Tab permite salir; click exterior cierra. IME no confirma mientras compone. | DERIVED accesibilidad web; no se atribuyen estos eventos al mockup Figma. |
| DM-S08 | Search permanece visible mientras se desplaza solo Options. Search no es descendiente del listbox. El input comunica combobox, controles y opción activa; el disparador es button con popup. El selector sin búsqueda conserva su combobox de solo selección. | DERIVED semántica web y adaptación del viewport. Browser/ARIA/scroll. |

La fuente Figma muestra la composición y propiedades; no ejecuta filtrado de datos. El scrollbar privado sigue siendo una indicación de diseño, no el scroll nativo del navegador. El contrato base rige todo lo no sustituido aquí. Delegación por solicitud dentro de alcance tras [QA documental](../../qa/contracts/dropdown-menu.search.v1.0.0.review.md).

## Anatomía del viewport Figma

Results conserva Hug con máximo interior de 318 px (320 menos dos bordes de 1 px). Options sigue siendo Slot nativo y Hug; Results ejecuta scroll vertical. Search se aloja en el último hijo absoluto Pinned Search, fijado por numberOfFixedChildren=1, con superficie del menú y 16 px de padding inferior. Una reserva de 32 px en el flujo mantiene la altura y el gap del ejemplo. Show search controla reserva y capa fija mediante la misma propiedad. Así 1/5/10 opciones producen 98/258/320 px con búsqueda y la búsqueda permanece fuera del contenido que se desplaza. Los tres tokens internos de esta ampliación corresponden a gap 16, reserva 32 y límite interior 318; reutilizan la escala o una medida DERIVED, siempre por semantic → primitive. No se duplican opciones ni se transforma el Slot en un frame.

## API y composición web

`DropdownField` incorpora `showSearch?: boolean`, `searchLabel?: string` y `searchPlaceholder?: string`. Defaults: false, `Buscar en ${label}` y `Buscar…`. El anfitrión sigue controlando `entries`, `selectedId` y `onSelectionChange`. `maxHeight` limita todo el popup, incluida la búsqueda; el interior de opciones ocupa el espacio restante. Seleccionar por pointer o Enter cierra y devuelve foco al disparador.

El listbox desplazable lleva tabindex=-1 para evitar un Tab extra implícito en Chrome. El foco de teclado permanece en el combobox, donde aria-activedescendant comunica la opción; Tab puede pasar al control siguiente y cerrar al salir del campo compuesto.

`DropdownMenu` conserva el listbox identificado por `id`, dentro de una superficie neutra. Para composición directa acepta `searchValue?: string`, `onSearchChange?: (value: string) => void`, `onSearchKeyDown?: KeyboardEventHandler<HTMLInputElement>` y `searchInputProps` para atributos ARIA, además de los props anteriores. En modo directo el anfitrión coordina foco/teclado y consulta; si no pasa searchValue, el menú mantiene consulta local. No integra búsqueda remota ni reglas de negocio.

Search añade `embedded?: boolean` e `inputProps` tipados: embedded usa contenedor div con landmark search, evitando formularios anidados. Su valor, label, disabled, placeholder y onValueChange siguen regidos por Search. Este ajuste técnico preserva por defecto el form existente; no cambia su diseño ni variantes Figma.

## Guía semántica normativa

Activa búsqueda cuando ayude a localizar una opción en una lista. Mantén el nombre del campo y una selección simple. Buscar reduce opciones visibles; no guarda ni cambia el valor por sí mismo. El anfitrión aporta datos, textos y permisos. Conserva Search, Dropdown item y Slot oficiales; no insertes el buscador como una opción seleccionable.

## Description exacta

DROPDOWN-MENU-001 · Usa Dropdown menu para elegir un valor del campo. Coloca Dropdown item en Options y conserva una selección. Activa Show search para localizar opciones con Search small. Mantén Search fuera del Slot y permite scroll en Options cuando se requiera. Ficha local Dropdown menu / DROPDOWN-MENU-001.

## Aceptación

Verificar identidad/key original, Show search false/true, Search local small, Options SLOT, tamaños 1/5/10 y contenido reemplazable en instancia. Probar inserción, orden y preservación al alternar búsqueda. Leer posteriormente bindings/aliases/scopes, propiedades y geometría. En Chrome probar filtrado por acentos/description, sin resultados, disabled, grupos/dividers, limpieza, IME, teclado, cierre/foco, scroll independiente, cuatro temas, ancho 320 px y ausencia de errores. Ejecutar generación/verificación de tokens, TypeScript, tests y build; cerrar catálogo y Graphify con hashes del mismo corte. La publicación GitHub a main está autorizada por el usuario; esta enmienda no publica la biblioteca Figma ni instala skills.
