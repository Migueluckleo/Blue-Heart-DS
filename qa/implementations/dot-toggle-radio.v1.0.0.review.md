# QA de implementación · Dot, Toggle y Radio

Corte 2026-11-11. Alcance DOT-001, TOGGLE-001 y RADIO-001 versión 1.0.0. [QA documental](../contracts/dot-toggle-radio.v1.0.0.review.md).

| Familia | Set de destino | Variantes | Nodos | Bindings comprobados | Resultado |
|---|---|---:|---:|---:|---|
| Dot | `32:33` | 28 | 44 | 522 | PASS |
| Toggle | `32:97` | 8 | 42 | 234 | PASS |
| Radio | `32:142` | 10 | 57 | 438 | PASS |

La [lectura independiente](../../implementations/figma/root-families-2026-11-11/) verificó IDs, jerarquía, geometría, visibilidad, composición, estilo tipográfico aplicado, propiedades, enlaces a guías y Description. Las 10 reacciones de Toggle y las 2 de Radio conservan los destinos de sus variantes con los IDs de destino. Dot tiene cero reacciones. Las tres matrices se inspeccionaron mediante captura del set maestro. La reproducción interactiva nativa queda NOT_RUN. Las páginas de destino contienen los maestros autorizados.

P-SLOTS NOT_APPLICABLE para los tres maestros. Count y Max count, Label y Show label son propiedades acotadas. Radio group requiere Options como Slot nativo en su propio alcance.

Web PASS. Generación P07 para cinco familias, TypeScript, cuatro pruebas de Node y exportación estática Next. Chrome local verificó presencia decorativa y tamaños de Dot, foco visible con Tab y alternancia con Espacio para Toggle, y selección exclusiva con flechas para Radio. Probó controles deshabilitados y conservó las regresiones Buttons/Loader. El ensayo en Chrome comprobó una muestra de cada control y el catálogo ejecutable. El QA visual de la matriz completa corresponde a Figma.

La lectura no escribe en la raíz fuente. Publicación e instalación gestionada fuera de este corte.
