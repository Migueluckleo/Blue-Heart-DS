# Inventario raíz de BlueHeart

La [captura reconciliada](../sources/figma-snapshots/root-families-2026-11-11/inventory.json) enumera 29 páginas y conserva IDs, keys, padres, variantes y aristas observadas por maestro. 27 páginas contienen maestros. Se localizaron 53 principales/sets públicos, 12 auxiliares de implementación y un set de demostración de Tooltip. Los 66 principales/sets suman 863 variantes o componentes individuales. Excluir el demo host de 12 variantes deja 65 maestros/sets en alcance y 851 variantes o individuales.

El demo host de Tooltip se excluye por su Description explícita. Las muestras de instancia y notas se registran como hijos de página fuente, fuera del inventario de maestros. Tab y Tabs aparecen dentro de frames en la raíz, pero sus identidades y dependencias acreditan que son maestros del sistema. El maestro de destino organiza sus definiciones directamente bajo la página oficial.

La captura registra dependencias locales y remotas. Dot precede a Avatar, Icon Buttons, Tabs y Floating Actions. Radio precede a Radio group. Tooltip precede a Menu item. Header, Sidebar y Section Header preceden a App Shell. Una referencia remota requiere comprobar identidad y acceso antes de construir sus consumidores.

El estado por maestro se actualiza en la evidencia de cada lote. INVENTORIED acredita lectura, sin atribuir QA o construcción.

## Estado del destino y continuidad

El [registro por maestro](root-families-status-2026-11-11.json) reconcilia la captura inicial y la ampliación del 12 de noviembre. Los 67 maestros en alcance quedan VALIDATED con 877 variantes o componentes individuales. El demo host de Tooltip conserva EXCLUDED_DEMO con 12 variantes.

El corte anterior incorporó Dot, Toggle, Radio, Radio group y Tooltip. Los destinos son `32:33`, `32:97`, `32:142`, `35:108` y `38:22`. Las páginas oficiales se conservan sin exhibidores ni notas. Radio group prueba un único Options nativo reutilizando Radio. Las cinco familias están en el catálogo web con React/TypeScript, Tailwind, Next y QA. El inventario histórico `initialState` preserva el momento de captura y el registro por maestro contiene el avance verificado.

El corte anterior incorporó Search, Breadcrumb item y Breadcrumb. Breadcrumb reutiliza sus eslabones expuestos y desbloquea Section Header junto con las demás dependencias pendientes.

También se cerró Linear Progress Bar en tres tamaños y su auxiliar, File Upload y Checkbox. File Upload reutiliza Linear Progress Bar/large y Button secondary en Figma y React. Las tres familias tienen fichas, ejemplos Next y QA.

Este turno cerró Menu item, Top bar, Sidebar, su auxiliar privado e Icon Button en los cuatro tipos. Sidebar conserva cuatro Slots independientes y consume Icon Button Secondary small en el maestro y en web conforme a la enmienda v1.0.1. El lote valida cinco Slots nativos contando Top bar. Sidebar queda disponible para App Shell. Badge `282:3` → `64:90` quedó validado con 18 variantes y habilita Header, Input, Section Header y Table cell.

Avatar group `145:147` → `85:10` quedó validado con cuatro variantes y un Slot Avatars de 2 a 4 hijos. Company selector, User selector, Header actions y Header quedaron validados en `90:105`, `90:138`, `90:437` y `90:439`. User selector consume la variante de texto de Avatar, comprobada. Las seis familias están en el catálogo Next con sus fichas y QA.

Input/empty `282:26` → `93:72` e Input/filled `282:139` → `93:499` completaron 42 variantes. Las dos variantes lógicas consumen Badge subtle/small y conservan dos estilos nativos de foco. Chrome midió 2.564:1 para el borde vacío heredado y el acta lo registra.

Section Header `891:28` → `96:5` queda validado con Metadata, Inputs y General actions como tres Slots nativos independientes, lectura sin diferencias y caso de 640 px. Conserva la excepción fuente de contraste de Updated y completa las dependencias directas de App Shell.

App Shell `940:1376` → `105:7` queda validado en sus cuatro combinaciones. Body comparte una propiedad nativa y preserva el contenido editado al cambiar ambos ejes. Grid conserva anclas y spans. La composición hereda Sidebar Secondary.

Pagination item `585:44` → `109:17` y Pagination `585:219` → `109:36` completan 11 variantes. El Slot Pages, el Input de 88 px, los carets y la navegación del catálogo tienen QA.

Tab `79:26` → `113:86` y Tabs `105:223` → `113:207` completan 27 variantes. El Slot Tabs, el Divider y la interacción web de paneles tienen QA. Se conservaron los contrastes fuente de Segmented Selected.

Text Area `661:169` → `116:88` completa ocho variantes con Notches, ayudas y contador, edición nativa de ancho y alto y Chrome. Se registra el contraste heredado del borde vacío.

Dropdown item `394:29` → `118:42`, el auxiliar privado `395:11` → `119:11` y Dropdown menu `395:16` → `119:17` completan 27 definiciones. Options, overflow y control externo tienen QA. Se conservan los contrastes fuente.

Floating Actions `912:12164` → `122:6` e Inline Notification `565:149` → `122:274` completan seis definiciones. Pasaron lectura independiente, 48 comprobaciones desde instancias y recorrido dirigido en Chrome. Floating Actions conserva General actions como Slot abierto.

Chip queda validado en los cuatro tamaños `126:60`, `126:163`, `126:266` y `126:369`. El lote incluye 40 variantes, 16 enlaces nativos de hover, 53 controles desde instancias y recorrido dirigido en Chrome.

Table cierra Cell actions `826:188` → `128:191`, Capture cell `826:528` → `128:228`, Thumb `841:2760` → `128:261` y Scrollbar medium `827:98` → `128:264`. Son 15 definiciones auxiliares y de captura verificadas.

La autorización explícita habilitó la foto original en los cuatro fills de Avatar `83:18`. Las seis variantes que [consumen Avatar image/medium](../sources/figma-snapshots/root-families-2026-11-11/table-cell-avatar-dependency.json) completaron Table cell en `129:44`, con las 30 variantes y el orden fuente. Table `827:99` → `142:92` quedó validado con Rows nativo, nueve filas de muestra, 108 celdas y Pagination oficial. El QA probó edición desde instancias, los cuatro temas y el fit de ambos indicadores. [QA final](../qa/implementations/table-chain.v1.0.0.review.md)

Stepper `1020:594` → `156:131` y Progress line privado `1020:562` → `155:19` agregan 26 variantes. Los cuatro modos se cotejaron desde instancias y en Chrome. [QA de Stepper](../qa/implementations/stepper.v1.0.0.review.md)
