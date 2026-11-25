# QA de implementación · Chat Sidebar V1 y V2

## Figma

PASS. [Lectura final](../../implementations/figma/chat-sidebar-v1-2026-11-24/readback.json) y [mapa de variables](../../implementations/figma/chat-sidebar-v1-2026-11-24/tokens.json). Las 11 combinaciones viven en el set 258:3326. V2 permanece como default y los nueve maestros comparados conservan IDs, geometría, estructura, bindings y propiedades de sus hijos. Diez consumidores de App Shell y Playground conservan maestro, selección, ancho, alto y cuatro ítems en su Content.

El Rail corresponde pixel por pixel a la muestra de Anticipa. El Panel tiene caja de 310 × 775, encabezado a 16, Content a 80, footer de 144 a 615, sombra de la referencia y los grupos a la misma posición. Se usa el control reutilizable de búsqueda de 32 × 32 y el medidor representa 41 de 150. Ambas variantes se revisaron a 440 px de altura. En Panel 280 px dejan 248 px de Content. En Rail 64 px dejan 32 px de Content. Los toggles poseen destinos Change to recíprocos. El Slot Panel aceptó quitar todos los hijos, insertar dos átomos y reordenarlos con la misma propiedad. Se eliminaron todas las instancias temporales de QA.

Las 30 nuevas variables comprenden 24 de componente, tres semánticas y tres primitivas. Sus scopes están vacíos. La lectura de 1,584 variables mostró 61 visibles, todas del namespace exacto Body en la colección component. La auditoría de los bindings usó la cadena componente → semantic → primitive. Los componentes anidados son locales al DS o iconos Phosphor.

## Web

El catálogo incluye ambas recetas, con V2 predeterminada. El build confirma 52 familias al día, TypeScript y 20 pruebas. La [evidencia de navegador](../../output/qa/chat-sidebar-v1-2026-11-24/web-browser.json) registra los recorridos de V2 y V1 y las medidas del Rail, del Panel, del Slot y el footer. Las capturas y los logs están en el [lote de QA](../../output/qa/chat-sidebar-v1-2026-11-24/).
