# Chat History Item · Documentación de la modificación

2026-11-24 · Documentación completada en versión 1.0.0. [257:498 en AI Blueheart DS](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=257-498).

La nueva booleana show notification#628:0, default false, controla un Dot local notification/small/default por variante: 8×8, absoluto, top/right de referencia 4. Las cuatro variantes, Title/Actions nativos, Updated, Ghost y selección se conservan. Se documenta el consumo de tokens Dot propios y su herencia en siete instancias de Chat Sidebar.

[Enmienda normativa](../../../specs/components/chat-history-item.notification.amendment.v1.0.0.md), [datos delegados](../../../specs/data/chat-history-item.notification.v1.0.0.json), [QA documental](../../../qa/contracts/chat-history-item.notification.v1.0.0.review.md), [MD completo](../../../sources/figma-snapshots/chat-history-item-2026-11-24/component-contract.md), [YAML](../../../sources/figma-snapshots/chat-history-item-2026-11-24/component-contract.yaml) y [validación](../../../sources/figma-snapshots/chat-history-item-2026-11-24/validation.json).

PASS de inspección: 65 nodos, 28 instancias, cuatro componentes únicos, 84 variables (26 directas + 58 dependencias), cuatro modos, cero referencias pendientes y cero estilos. MD/YAML/JSON provienen de un modelo y su roundtrip pasó. Se conservaron fuentes, captura y lectura de consumidores. No hubo escrituras Figma ni cambios de código de esta familia.

Web STALE_FOR_NOTIFICATION: todavía falta implementar la booleana/Dot en ChatHistoryItem. Las cuatro descriptions de variantes mantienen v0.1.0: metadata pendiente registrada. Activación true, cambio de variantes, edición de Slots, teclado y responsive no se ejecutaron en esta revisión documental; el QA histórico conserva su alcance. No se inventa lógica de mensajes no leídos, selección o pin.

La ficha web y Chat Sidebar enlazan el ajuste y sus límites. Catálogo y Graphify CURRENT mediante el cierre compartido `2026-11-24-chat-history-header-app-shell`, COMPLETE_LOCAL: [comprobante](../../closures/2026-11-24-chat-history-header-app-shell.json), [informe conjunto](../header-app-shell-2026-11-24/README.md) y [pins verificados](../header-app-shell-2026-11-24/final-integrity.json). La familia conserva su enmienda en el catálogo y dos rutas verifican el enlace a Dot y a la diferencia web. El cierre documental no se convierte en QA web; sin publicación o instalación.
