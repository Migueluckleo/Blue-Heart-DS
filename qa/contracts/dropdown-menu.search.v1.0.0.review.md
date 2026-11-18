# QA documental · Dropdown menu con búsqueda

Fecha: 2026-11-18. Resultado: PASS. user_audit: NOT_REQUIRED; human_review_policy: OPTIONAL_NON_BLOCKING.

Fuente inspeccionada: 430:16410. El contrato base DROPDOWN-MENU-001 conserva identidad 119:17/key 55501bd7b5aa5a9cbd18a7f2760368de95b1cad2. La enmienda distingue composición OBSERVED de comportamiento web DERIVED y delega únicamente búsqueda opcional, sin migrar la familia a un nuevo set. Dependencias existentes Dropdown item, Search e Input verificadas en contratos y código.

Requisitos DM-S01–08 verificables. P-SLOTS REQUIRED: preservar Options#119:0, minChildren=1, sin máximo y preferencias Dropdown item. Search fuera del Slot. Se reutiliza la escala: 16 px corresponde a spacing-lg, no a spacing-md (12 px). La nueva capa de componente no consume Body ni semánticos directamente; scopes vacíos y cuatro aliases idénticos. No modifica datos históricos, estilos Body, visibilidad de publicación o versión del contrato base.

Preparación: READY. Delegación DELEGATED_FOR_BUILD para Figma, web, documentación y cierre; push GitHub autorizado por solicitud actual. La evidencia de implementación se registra por separado tras ejecutar QA.
