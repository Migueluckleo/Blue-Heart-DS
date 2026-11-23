# Inputs y Dropdowns · Revisión documental contextual

Fecha: 2026-11-19. Alcance: tres guías y patrones de consumo local. Aprobación humana explícita del PDF de 20 páginas, con digest y transformaciones administrativas en el [registro de fuente](../../sources/inventories/inputs-dropdowns-contextual-usage.approval.2026-11-19.json).

## CONTRACT_REVIEW: PASS

- DOC-01/03/15: las enmiendas de [Input](../../specs/components/input.contextual-usage.amendment.v1.0.1.md), [Dropdown menu](../../specs/components/dropdown-menu.contextual-usage.amendment.v1.0.1.md) y [Dropdown item](../../specs/components/dropdown-item.contextual-usage.amendment.v1.0.1.md) mantienen identidad y bases. [Patrones](../../specs/patterns/inputs-dropdowns.forms.amendment.v1.0.0.md) asociados explícitamente a las tres familias; no son altas atómicas.
- DOC-02/04/05: Markdown de la propuesta aprobada con IDs estables y reglas adoptadas por aprobación. No selecciona versiones por fecha ni altera el estado de bases históricas.
- DOC-06/08/10/14: preserva datos delegados, tokens, estilos, defaults, API y reglas de búsqueda DM-S01 a DM-S08. Los digests de inputs invariantes se conservan en la fuente; no se duplica un catálogo editable de valores.
- DOC-09/11: Input conserva 42 combinaciones y 11 propiedades más ejes; Dropdown item conserva 25 combinaciones válidas. Selected + Disabled, loading/error/read-only de DropdownField y multiselección no se fabrican. La búsqueda conserva Search small y selección simple.
- DOC-09/12: foco de edición de Input por teclado o clic, hover sin foco; Button mantiene su propia regla. Candidata, foco DOM y selección del Dropdown se distinguen. Teclas, IME, cierre y recuperación conservan el contrato vigente.
- DOC-07/13/16: tres guías y patrones enlazados; la selección, lectura, fuentes completas en traspaso y paquetes se verifican en el cierre y comprobantes de entrega. Description es texto preparado, sin afirmar sincronización Figma.
- DOC-17/18: no se agregan páginas, identidades, geometría o bindings de Figma. Se mantienen las limitaciones cromáticas existentes y el alcance parcial de accesibilidad.
- P-SLOTS: Input e ítem NOT_APPLICABLE por posiciones fijas; menú REQUIRED, Options conserva cardinalidad/preferencias y Search queda fuera del Slot. El documento de patrones no crea nuevos Slots.

## Implementación y límites

La tarea integra documentación, catálogo e índices de consumidores. El código de los componentes se conserva; no acredita una nueva validación visual o escritura Figma ni una operación de backend. Los paquetes y las pruebas de consumo se registran fuera de las fuentes canónicas para evitar autorreferencia en el snapshot. Preparar o instalar localmente no publica remotamente.
