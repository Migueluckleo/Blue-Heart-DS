# QA documental · Chat History Item / notificación opcional

2026-11-24 · CONTRACT_REVIEW **PASS** para [CHAT-HISTORY-ITEM-001-NOTIFICATION](../../specs/components/chat-history-item.notification.amendment.v1.0.0.md). DELEGATED_FOR_BUILD, user_audit NOT_REQUIRED y human_review_policy OPTIONAL_NON_BLOCKING. Alcance solicitado: documentación, sin escrituras Figma o código de esta familia.

| Criterio | Evidencia / resultado |
|---|---|
| CHI-N01 | PASS. Sexta propiedad show notification#628:0, BOOLEAN=false; cuatro refs visible en Dot. No crea nuevas variantes. |
| CHI-N02/03 | PASS de lectura. Dot local notification/small/default, 8×8, absoluto, MAX/MIN, top/right de referencia 4; apartado de Actions y de Badge internos de Ghost. |
| CHI-N04 / TOKEN-QA-01/03 | PASS acotado. 26 variables directas, 29 semantic y 29 primitives; 84 locales, 104 cadenas por cuatro modos, cero unresolved. 16 roles History, cinco Dot y cinco Icon Button; todos component y scopes internos []. No se crean tokens. |
| CHI-N05 | PASS. Siete instancias oficiales de Chat Sidebar con Fill y nueva propiedad false leídas; el alcance de búsqueda por nombre exacto queda registrado. No se atribuye un ensayo de toggling. |
| CHI-N06 | PASS. 65 nodos completos, 28 instancias, cuatro mains únicos, cero estilos; MD/YAML/JSON del mismo modelo, Ruby/Psych roundtrip PASS. [Comprobante](../../sources/figma-snapshots/chat-history-item-2026-11-24/validation.json). |
| Slots / P-SLOTS | REQUIRED conservado. Title y Actions con keys/settings observados. Operaciones, responsive y alternancia de variantes no se reejecutaron en esta tarea documental. |
| Metadata y web | Diferencias registradas: descriptions de variantes con v0.1.0 y API web sin booleana/Dot. No se presentan como errores corregidos ni como paridad validada. |

Fuente: [MD](../../sources/figma-snapshots/chat-history-item-2026-11-24/component-contract.md), [YAML](../../sources/figma-snapshots/chat-history-item-2026-11-24/component-contract.yaml), [snapshot](../../sources/figma-snapshots/chat-history-item-2026-11-24/raw-evidence.json), [consumidores](../../sources/figma-snapshots/chat-history-item-2026-11-24/consumers.json) y captura. El antecedente 246:3536 pertenece al origen; las keys/IDs locales se leen directamente. Tres lotes con hijos invisibles no resolubles por ID se completaron por referencias directas desde recorrido explícito, sin pendientes finales ni mutaciones.

No se define lógica de notificaciones, criterios de leído, selección o pin. Accesibilidad, estado encendido y QA navegador NOT_EXECUTED. El PASS documental y la sincronización local derivada no sustituyen esas pruebas ni renuevan el QA histórico.
