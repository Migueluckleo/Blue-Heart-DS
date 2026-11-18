# QA de implementación · Dropdown menu con búsqueda

Fecha: 2026-11-18. Resultado: PASS. [Enmienda](../../specs/components/dropdown-menu.search.amendment.v1.0.0.md). user_audit: NOT_REQUIRED; human_review_policy: OPTIONAL_NON_BLOCKING. Contrato y paquete conservan su versión; sin instalación.

## Figma

Maestro 119:17/key 55501bd7b5aa5a9cbd18a7f2760368de95b1cad2 preservado. Show search#481:0 BOOLEAN false. Search local 47:55 small/default, label oculto y edición por instancia expuesta. Options conserva SLOT, ID 119:18, key Options#119:0, preferencias, cardinalidad y cinco IDs originales. Se probó 5→10, reordenar, alternar búsqueda sin perder orden y 5→1 desde instancia. Con búsqueda: 1/5/10 opciones = 98/258/320 px; sin búsqueda cinco opciones = 210 px. Anchos Fill.

Results Hug tiene máximo interior 318 px y scroll vertical. Pinned Search es último hijo absoluto fijo, numberOfFixedChildren=1; reserva 32 px y gap 16 px conservan la geometría. Figma configura la composición y el scroll, sin ejecutar filtrado de datos. Instancias temporales eliminadas; [Slots](../../implementations/figma/dropdown-search-2026-11-18/slots-qa.json) y [lectura final](../../implementations/figma/dropdown-search-2026-11-18/final.json).

TOKEN-QA-01 PASS: 925 bindings, 69 overrides en menú, auxiliar, Dropdown item y Search small, cero hallazgos. TOKEN-QA-03 PASS: 1,490 variables, solo 33 Body visibles y 1,457 internas ocultas. Cinco nuevas variables: una primitive, una semantic y tres component, con scopes vacíos. Los 33 scopes y cinco estilos Body coinciden con el corte anterior verificado. Comparación antes/después de root fills/strokes/effects/bindings, propiedades existentes y contenido/configuración del Slot: PASS. [Readback](../../implementations/figma/dropdown-search-2026-11-18/readback.json). No se cambió hiddenFromPublishing ni se publicó la biblioteca.

## Web

showSearch false conserva el combobox simple; true reutiliza Search small embedded. Filtra label/description por caso/acentos, conserva selección, grupos válidos y disabled. Sin resultados es status fuera del listbox; sin formularios anidados. Popup 320 px, búsqueda 32 px y gap 16 px; solo listado desplazable.

Chrome PASS: filtro, limpieza/foco, vacío, disabled, Space/edición de texto, flechas/Enter, IME, Escape/foco al disparador, Tab y click exterior. El QA detectó un Tab implícito de Chrome sobre el contenedor desplazable; se corrigió con tabindex=-1 y se repitió la prueba. Cuatro temas, cero errores. [Reporte](../../output/qa/dropdown-search-2026-11-18/browser.json), [captura](../../output/qa/dropdown-search-2026-11-18/web-search.png) y [regresión global](../../output/qa/dropdown-search-2026-11-18/ds-regression.json).

TOKEN-QA-02/generación: 51 familias PASS; TypeScript y build estático PASS. Tests Node y regresión global del DS PASS, incluido selector simple, Search, Table Sticky Actions Ghost y chats. Chat Document Viewer/App Shell revalidados: callbacks, foco, borrador, Slots y cuatro temas.

Ambas guías operativas incluyen la enmienda y datos; lanzadores 1.0.9 preservados. Cierre de Graphify/catálogo mediante scripts/ds close y comprobante con hashes y consultas. Push a main autorizado, incluyendo retiro Azure y ajustes de consumo; sin instalación ni publicación de biblioteca Figma.
