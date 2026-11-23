# Cierre · Dropdown, Body disabled y paquetes actuales

23 de noviembre de 2026. Estado: **PASS** de implementación, datos, consumo, paquetes y grafos. Corte canónico `febe6b32c7e02ddc5d8a33e5d1882560e2ff867bda1afc5971b17a9d884c960d`.

Se corrigieron en Figma las cinco descriptions de variables Dropdown para coincidir literalmente con su JSON delegado, conservando IDs, keys, valores, aliases, scopes y codeSyntax. Se añadieron cuatro colores disabled de Body para text, bg, stroke y shape, cada uno con scopes específicos y aliases semánticos existentes. Focus significa scopes por propiedad; no es un nuevo estado de foco. Las dimensiones, componentes, estilos y bindings anteriores permanecen.

El inventario efectivo tiene **1,536 tokens**: 201 primitives, 159 semantic y 1,176 component. Body tiene 61 tokens, incluidos 37 colores. Los 21 Caution están completos y las 5,064 entradas por modo resuelven sin errores. La policy de consumo se corrigió para enumerar sus cuatro fuentes Body y tres enmiendas; una regresión comprueba que esa lista cubra todas las fuentes Body activas.

La autoridad sigue siendo el contrato base y sus enmiendas con JSON delegados. `config/web-inputs.json` enumera las 16 fuentes activas; el consolidado web `implementations/web/src/generated/tokens.manifest.json` conserva DERIVED_NOT_AUTHORITY y SHA-256 `657c56d570a2db68954c7d266b500e5dfc3d8b6bd93ddbee7154d9c9286b11b5`. El histórico `blueheart-variables.v0.1.2.json` conserva su SHA-256 original.

## Verificación ejecutada

- Figma: cuatro variables nuevas (VariableID:616:2–5), 16 aliases correctos, cinco descriptions exactas y preservación de las 11 definiciones previas leídas. Body 61 visibles; cero internos visibles y cero ALL_SCOPES.
- Datos: comparación completa del inventario efectivo, con baseline integral y delta real identificados; cero diferencias pendientes, aliases ausentes, ciclos o saltos de capa. [Evidencia](comparison.json).
- Web: `pnpm verify` PASS, TypeScript, 18 pruebas y build; Chrome en cuatro temas, 16 comprobaciones disabled y regresión de Caution, inverse, cinco Cards y Shell.
- Consumo: 12 tests Python y cinco Node PASS; el preflight acepta Caution/disabled y detecta fuentes faltantes.
- Tooling: `scripts/ds test` PASS, 34 tests. Se corrigió la normalización de identidades de documentos antes de consolidar aristas, conservando todas las evidencias de dependencias y citas. [Detalle del fallo verificado y corrección](graph-normalization-correction.json).
- Graphify: CURRENT, 6,237 nodos, 12,325 relaciones y 157/157 dependencias declaradas verificadas. Vista, catálogo y lanzadores CURRENT; cero findings documentales. [Check](ds-check.json).
- Cierre final: `scripts/ds close --run 2026-11-23-body-disabled-final`, COMPLETE_LOCAL. Las preparaciones anteriores se conservan como evidencia parcial, no como cierres vigentes. [Recibo](../../closures/2026-11-23-body-disabled-final.json) y [pins congelados](canonical-phase-completed.json).

## Paquetes y grafos de consumo

Se actualizaron en sus chats «PO Prototypes autocontenida» y «Diseño Figma autocontenido», conservando versiones y releases anteriores. Los tres ZIP actuales, checksums y accesos se actualizaron; las instalaciones anteriores y su memoria permanecen intactas.

| Paquete | Versión conservada | Archivos ZIP | Nodos / relaciones del grafo |
|---|---|---:|---:|
| PO universal | 1.1.0 | 118 | 7,335 / 15,115 |
| Figma portable | 1.1.0 | 46 | 4,303 / 12,476 |
| Figma local | 1.0.5 | 43 | 4,303 / 12,476 |

Cada paquete coincide byte a byte con las 16 fuentes canónicas de tokens y con el consolidado web; conserva el Body de la policy de consumo, los pins de su grafo y el digest canónico vigente. Integridad ZIP/manifiesto/SQLite correcta y cero variables sin resolver. Memoria portable y PO preservada byte a byte. [Validación independiente y hashes ZIP](consumer-verification.json).

El traspaso PO real pasó PREPARED en ambos lectores Figma con 1,319 fuentes compartidas sin divergencias. Los paquetes Figma pasaron 105 pruebas cada uno, más 11 del gate por fase. La PO verificó memoria entre procesos, reconstrucción, traslado sin red, HTML/Markdown final, 61 tokens Body en cuatro temas, 84 valores Caution y 16 disabled. Su renderer incorpora aria-disabled con validación estricta; el atributo y el color no bloquean eventos por sí solos.

Entregas locales: `05-HISTORICO/ENTREGAS/po-prototypes-1.1.0-body-disabled-2026-11-23` y `05-HISTORICO/ENTREGAS/figma-body-disabled-2026-11-23-revision`, desde el workspace padre. ZIP actuales reales en `01-SKILLS/ZIP-ACTUALES`. Revisión de artefacto `body-disabled-2026-11-23`; no se incrementaron versiones.

El commit fuente `f2d21f392ca5e28ac7d34f7c030a9d9032841c89` reúne los cambios activos del DS y su catálogo/Graphify. La publicación GitHub se ejecuta después de este cierre conjunto. No se instala una skill ni se publica la biblioteca Figma como parte de este corte. La comprobación de whitespace conserva los bytes originales de SVG y YAML capturados, con [excepciones de formato identificadas](whitespace-evidence.json); los cambios redactados pasan esa revisión.
