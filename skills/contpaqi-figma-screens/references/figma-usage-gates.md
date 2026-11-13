# Controles obligatorios de consumo Figma

Ejecutar desde el runtime devuelto por `resolve_ds.py`. El catálogo y el snapshot deben pasar antes de resolver componentes. El `PASS` del cargador acredita datos; los siguientes controles acreditan el alcance declarado en Figma. Una skill no intercepta herramientas MCP externas: exige estos comprobantes y prohíbe construir o declarar el cierre si faltan o fallan. No presentar el control como una garantía de ejecución frente a un agente que omita el flujo.

## Preparar fuentes y mapa

Ejecuta `python3 scripts/verify_figma_usage.py inventory --runtime . --output trabajo/inventario.json`. El comando reconcilia el manifiesto y las Specs verificadas del corte. Usa la lista completa para preparar `family_tracking`. Evalúa las familias por función, comportamiento y estados que pide el brief. `figma: null` requiere descubrir el localizador mediante lecturas; no acredita ausencia. Conservar el maestro `FILE_KEY_MAESTRO_CONFIRMADO` como fuente de lectura.

Usar el colector instalado para obtener evidencia de los principales reales. Su cuerpo JavaScript es de solo lectura, verifica archivo/página y no importa ni crea recursos. Cargar `figma-use`, sus referencias/API y la sesión de archivo antes de ejecutarlo con `use_figma`. Guardar el objeto JSON devuelto sin editar; no fabricar un resultado ni sustituir un error o truncamiento por `complete: true`.

Solicitud fuente en un archivo JSON: `{"kind":"source","master_file_key":"FILE_KEY_MAESTRO_CONFIRMADO","file_key":"FILE_KEY_MAESTRO_CONFIRMADO","page_id":"ID_REAL","node_ids":["ID_REAL_DE_COMPONENTE_O_SET"]}`. Un set se expande a sus componentes: escoger la variante mediante sus propiedades verificadas, no usar la clave del set como principal. Leer una página por llamada y paralelizar páginas independientes según el manual oficial. Si la respuesta supera el límite, dividir los IDs/set solicitado en lecturas menores; no truncar evidencia.

Crear un plan JSON v1 fuera del snapshot, junto a sus readbacks. Campos:

- `schema_version: 1`, `snapshot`: `manifest_sha256` del recibo remoto, `destination_file_key`: prototipo autorizado, `destination_url`: su URL Figma si el catálogo carece de sandbox aplicable, `screens`: IDs lógicos únicos.
- `family_tracking`: una fila `{family, applicability, reason}` por cada familia del inventario del corte. Usa `APPLIES` o `NOT_APPLICABLE` y justifica cada decisión. `requirements` enumera exactamente las familias que aplican. Cada una requiere usos previstos y nodos comprobados al cierre.
- `source_readbacks: [{path, sha256}]`: rutas relativas al plan y hashes de los JSON reales del colector fuente.
- `uses`: una entrada por instancia prevista o contenido/composición local: `id`, `screen`, `kind`, `family`.
- `kind: ds-instance`: `family` existente, `source_node_id` del principal real, `component_key` verificada y `variant_properties` opcionales, con valores presentes en ese principal.
- `kind: local-content`: `family: null` y `reason`; reservado para textos/adornos propios, sin disfrazar controles.
- `kind: local-composition`: `family` indica la familia aplicable o `null` cuando el catálogo carece de una familia equivalente. Declara `reason`, `composition_of` con IDs de los usos hijos y `functional_exception: {purpose, search, candidates}`. Para cada alternativa relevante incluye `{family, gap, unmet, evidence: {path, excerpt}}`. Usa `PURPOSE`, `BEHAVIOR` o `STATE` y cita texto comprobable de la spec o una enmienda de esa familia. Incluye la evaluación de la propia `family` cuando esté declarada. Usa `COMPATIBLE` para señalar que debe usarse la instancia oficial. Un componente inaccesible o un export web ausente no acredita un hueco funcional en Figma. Los hijos de la composición deben existir dentro de su estructura editable.

Una decoración primitiva puede declarar `decoration_of` con un uso DS de la misma pantalla y su motivo. Debe tener binding, cero hijos y cero reacciones; no satisface familias requeridas ni permite tratar un FRAME de control como adorno. Las capas que tapan o reinterpretan assets/componentes no se justifican por esa clasificación: requieren revisión de propósito en el QA.

El plan queda fijado antes de construir, usando IDs lógicos. No contiene IDs destino aún desconocidos. El mapa lógico → nodo real viaja después en `placements`; cambiar requisitos, fuentes o claves invalida el preflight.

```sh
python3 scripts/verify_figma_usage.py collect --runtime . --plan trabajo/plan.json --request trabajo/fuente-request.json --output trabajo/lectura.js
# Ejecutar lectura.js con use_figma y guardar su resultado original en trabajo/fuente.json.
# Completar source_readbacks, sus SHA-256 y las claves reales del plan.
python3 scripts/verify_figma_usage.py preflight --runtime . --plan trabajo/plan.json --output trabajo/preflight.json
```

Solo `PASS` permite construir ese alcance. `UNAVAILABLE_EXISTING_COMPONENT`, falta de cobertura, conflicto, estado documental no elegible o clave no verificada bloquean las familias afectadas. Continuar partes independientes exige un plan separado que declare su alcance, sin presentar el conjunto como completo. Una excepción humana explícita se registra como desviación; no se transforma en `PASS` de reutilización oficial.

El colector fuente verifica principales del maestro. Para reutilizar una instancia/principal local con procedencia previa, resolver su clave contra esa fuente; una copia local con otra clave requiere demostrar su procedencia y una excepción específica, no aprobarla por nombre.

## Leer el resultado y cerrar

Tras la última escritura del alcance, crear una solicitud por pantalla: `{"kind":"target","file_key":"DESTINO_REAL","page_id":"PAGINA_REAL","root_id":"FRAME_REAL","screen":"ID_LOGICO","placements":{"ID_USO":"ID_NODO_REAL"}}`.

```sh
python3 scripts/verify_figma_usage.py collect --runtime . --plan trabajo/plan.json --request trabajo/pantalla-request.json --output trabajo/readback.js
# Ejecutar el script con use_figma. Guardar el objeto íntegro en trabajo/pantalla.json.
python3 scripts/verify_figma_usage.py verify --runtime . --plan trabajo/plan.json --receipt trabajo/preflight.json --readback trabajo/pantalla.json --output trabajo/figma-usage-qa.json
```

Repetir `--readback` para otras pantallas. El readback debe ser posterior al preflight, del mismo destino y plan. El colector inventaría las instancias superiores y candidatos con nombres/IDs de familias conocidas dentro del frame, sin tratar el interior heredado de una instancia DS verificada como controles independientes. El interior de instancias locales y el contenido de Slots sí se inventaría; mapear también sus controles e instancias (incluidos defaults conservados). Nombres solo descubren candidatos: su identidad se prueba por el principal y su clave. Todo candidato o instancia inventariado debe tener una entrada coherente; renombrar un control para evadirlo no está autorizado. Controles de semántica desconocida requieren revisión del mapa: el colector no interpreta cualquier intención visual o textual.

El gate detecta frames/rectángulos que reemplazan instancias conocidas, claves/variantes incorrectas, pantallas/usos omitidos, pérdida de campos vinculados, estilos compartidos y layout frente al principal fuente. Compara también cada texto/rango por su ruta relativa; conservar una clave agregada no oculta la pérdida de estilo en otro texto. Para texto local exige lectura de métricas por rango; para composiciones verifica Auto Layout y descendencia real de sus dependencias.

La comparación de bindings comprueba presencia de los campos; no demuestra por sí sola rol, alias, valores o modos. Los estilos se comparan por clave; una réplica técnica autorizada con otra clave requiere su mapeo y QA específico. Las excepciones nativas, Slots variables y cambios contractuales que alteren esos conjuntos requieren evidencia específica: conservar `BLOCKED` en vez de borrar restricciones para obtener un PASS.

La entrega exige ambos gates PASS **y** el QA de tokens/aliases, tipografía nativa/rangos, Slots, propiedades, estados, comportamiento y revisión visual de [handoff y QA](handoff-and-qa.md). El control automatizado no certifica píxeles, semántica de tokens, aprobación humana ni conformidad integral. Enlaza el plan, recibo y readbacks en la entrega. El informe final conserva la identidad del corte, los nodos comprobados y un resultado `VERIFIED`, `NOT_APPLICABLE` o `EXCEPTION` por familia. Nunca etiquetar `VALIDATED` con requisitos pendientes.
