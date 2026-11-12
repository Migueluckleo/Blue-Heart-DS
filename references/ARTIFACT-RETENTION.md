# Retención de artefactos y peso de Git

Política operativa 1.0 · 2026-10-13 · [DEC-ARTIFACT-RETENTION-001](../registry/decisions.md).

## Clasificación

La clasificación depende del contenido. La ubicación en una carpeta de salida no basta para descartar un archivo. Esta política regula el seguimiento en Git y la recuperación local; no altera autoridad documental ni aprueba contratos.

| Clase | Seguimiento en Git | Conservación local |
|---|---|---|
| Fuentes, inventarios, contratos, enmiendas, decisiones, QA, capturas y evidencia de implementación | Conservar | Indefinida; sin eliminación automática. |
| Entregables de output, fuentes de .codex-build y evidencia de .codex-finalizer | Conservar | Indefinida. Incluye versiones de PDF/PPTX, manifiestos, scripts y validaciones. |
| Paquetes de skills bajo output/skills: snapshots reproducibles, ZIP y staging de generación | Excluir únicamente esta ruta de Git | Conservar releases locales versionadas. Fuentes, configuración, generador, registro de hashes y QA permanecen en Git; el paquete se regenera desde el corte de fuentes correspondiente. No supone copia remota ni habilita borrado automático. |
| Grafo activo: JSON, HTML, reporte, manifiesto, salud, etiquetas, firma, coste y ds-closure.json | Conservar | Un corte operativo verificable. El grafo sigue siendo un índice derivado. |
| Semántica por lote: chunk-*, delta-*, planes, scripts, verification/manifest-check/closure, consultas y logs de QA | Conservar | Indefinida. La extracción semántica no se presume reproducible byte a byte. |
| Memoria, reflections y .graphify_learning.json | Conservar | Indefinida; pueden contener evidencia que no se obtiene de AST. |
| cache, vocabulario e intermedios .graphify_* expresamente enumerados en .gitignore | Excluir | Caché de trabajo prescindible solo con un grafo activo verificado, fuentes y contribuciones semánticas por lote preservadas. |
| runs/*/ast.json, combined.json, combined-raw.json y structural-supplement.json | Excluir | Intermedios. Conservar hasta verificar el cierre del lote y su recuperación. |
| runs/*/before, staged y after | Excluir | Copias de outputs del motor Graphify. Preservar los respaldos de los dos últimos cierres verificados y todos los lotes abiertos o fallidos. No colocar evidencia única en estas carpetas. |
| graphify-out/AAAA-MM-DD/graph.json | Excluir | Snapshot completo. Sus manifiestos, reportes y comprobantes pequeños siguen disponibles en Git. |

Las exclusiones exactas están en .gitignore. No se excluyen globalmente graphify-out, output, tmp, .codex-build ni .codex-finalizer. Los previews existentes permanecen por su bajo peso y posible uso como evidencia. Una nueva clase requiere revisión; no ampliar exclusiones por tamaño únicamente.

La clase de paquetes de skills se incorpora el 2026-10-14 por [DEC-DS-SKILLS-001](../registry/DEC-DS-SKILLS-001.md) y [P08](../protocols/08-SKILLS-AND-RELEASES.md). Sus copias del corpus se excluyen también de Graphify para evitar indexación recursiva; las fuentes y la evidencia de release sí se indexan. Esta adición no retira archivos ya seguidos ni modifica las bajas de retención anteriores.

## Retención y cambios seguros

1. Inventariar los candidatos que Git sigue, con ruta, bytes, SHA-256 y blob del índice. Comprobar también los enlaces documentales a archivos concretos.
2. Crear un archivo de recuperación que incluya los bytes actuales, incluso cambios locales. Guardar manifiesto y hash del archivo. Verificar cada miembro y restaurar en una carpeta temporal para comparar bytes.
3. Retirar del índice exclusivamente la lista verificada con git rm --cached. Mantener los archivos en disco; no usar git clean ni reescribir historia.
4. Comprobar que las únicas bajas del índice son las previstas, que los archivos locales siguen presentes y que las fuentes/entregables protegidos conservan sus hashes.
5. Cerrar el grafo conforme a [P05](../protocols/05-SELF-DOCUMENTATION-AND-TRACEABILITY.md) y la [guía local](PROJECT-TOOLING.md).

Este lote no borra archivos locales ni crea tareas de purga. Los archivos de recuperación se conservan indefinidamente hasta que exista otra copia verificada. Una futura compactación física puede retirar intermedios de lotes cerrados con más de 30 días, conservando además los dos últimos cierres verificados; fallos, lotes abiertos y evidencia única quedan fuera. Esa operación requiere inventario y verificación propios, no se ejecuta por cumplir la edad.

## Recuperación

El manifiesto del lote inicial (antecedente histórico) contiene rutas, SHA-256, tamaños, blobs originales de Git, commit de partida y ubicación/hash del respaldo local. El verificador (antecedente histórico) valida el archivo y puede comparar los archivos locales. Ejecutarlo con el Python indicado por graphify-out/.graphify_python; no instala paquetes.

~~~sh
"$(cat graphify-out/.graphify_python)" -B qa/tooling/retention.2026-10-13.verify.py
~~~

El respaldo local vive bajo graphify-out/retention y se excluye de Git. No es una copia remota ni acompaña a un clon. Para recuperar los bytes locales exactos del momento de la limpieza se necesita ese archivo. Para recuperar la versión histórica ya comprometida, el manifiesto identifica el blob: git cat-file blob BLOB_ID permite escribirlo a una ruta temporal y verificarlo. Conservar el historial; no ejecutar filtros ni garbage collection destructivo como parte de esta política.

Un clon conserva el grafo activo y las contribuciones semánticas por lote que estén incluidas en su commit. Los caches e intermedios pueden volver a generarse con las fuentes y el cierre mantenido. Para volver a seguir un archivo excluido, restaurar primero en un directorio temporal, verificar su hash y añadir únicamente esa ruta de forma explícita, revisando la excepción a esta política.

La reducción medida corresponde a los archivos que el índice seguirá en el próximo commit. No reduce retroactivamente la historia de Git ni el espacio local: los originales y el respaldo permanecen en disco. No se hace commit ni publicación remota en este lote.

## Pruebas de los paquetes de skills

`output/skills-validation/` conserva entregas HTML/Markdown, capturas y fixtures reproducibles de las pruebas locales. Se excluye del corpus y del snapshot para evitar duplicar el DS incluido en una entrega. `qa/skills/` conserva el informe, hashes, resultados y capturas representativas; el script de regresión mantenido en la skill permite repetir la prueba.
