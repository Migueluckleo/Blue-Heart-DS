# Tabs contextual v1.0.0 · QA documental

Fecha: 2026-11-24. Resultado: **PASS** para transcripción e integración documental del PDF de 22 páginas aprobado en este chat. No acredita Figma ni correcciones de componente nuevas.

| Control | Resultado y alcance |
|---|---|
| Autoridad y procedencia | Aprobación explícita registrada con digest del PDF y de las dos guías y patrón. Contratos/JSON conservan autoridad en su alcance; API y QA históricos se identifican como evidencia. |
| Cobertura de las 22 páginas | Intención, alternativas, ambigüedad de tabla común, antipatrón Chips, tres tipos, Shell, coexistencia, Label/icono, conteo, Focus/teclado, estados/panel, cantidad/IDs/Slot, ancho, formularios, URL, casos de brief, API/consumo, temas y matriz de 24 variantes. |
| Cambios y compatibilidad | No cambia 24 variantes de Tab ni tres de Tabs, datos, tokens, default underline, métricas, activación manual o API. No size/icono derecho/Remove, vertical, activación automática, router u overflow automático inventados. |
| Semántica bidireccional | Tabs abre secciones con panel propio; Chips selecciona/filtra en el panel. Pill/Segmented conservan identidad. No whitelist de Labels ni equivalencia tabla=filtro. Misma regla accesible desde Chip y Shell. |
| Accesibilidad acotada | Label visible, tablist/paneles asociados, IDs únicos, un punto de entrada, flechas/manual, Focus separado de selected, Dot aria-hidden con nombre completo a cargo del host, cero visible. No AA global; conserva contraste Segmented 4.389:1/2.262:1. |
| Slots | REQUIRED en Tabs, NOT_APPLICABLE en Tab y patrón. Cuatro es muestra; mínimo dos sin máximo técnico; seis y 2–5 son recomendaciones de raíz. Sin nueva validación Figma. |
| Host y propuestas | URL, overflow, reglas de negocio, persistencia, carga/error, estado vacío y recuperación no se atribuyen al átomo. Montaje oculto conserva captura local, no borrador remoto. |
| Formularios | Cambio libre de sección distinto de validar pasos; error oculto activa sección antes de enfocar campo. Respeta formularios en Shell sin convertirlos en wizard. |

Se contrastaron base Tab/Tabs, JSON delegados, código `tab.tsx`/`tabs.tsx`, guía Chip y patrones previos contra la propuesta aprobada. El QA de 12 interacciones del PDF sigue siendo evidencia de ese fixture, no una ejecución nueva de esta transcripción. Las consultas, generación, paquetes y pruebas independientes del nuevo corte se cierran por separado en `output/closures/2026-11-24-tabs-contextual.json` y la entrega versionada del workspace. Sin edición de Figma ni cambios de recetas.
