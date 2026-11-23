# QA documental · Formularios dentro de App Shell

Fecha: 2026-11-20. CONTRACT_REVIEW PASS para FORMS-APP-SHELL-PATTERNS-001 v1.0.0. [Registro de aprobación y hashes](../../sources/inventories/forms-app-shell.approval.2026-11-20.json). Se cotejaron las 25 páginas del PDF v0.2 y sus cinco páginas añadidas de filas, acciones, relaciones y jerarquías con el Markdown; el PDF y fuentes originales permanecen intactos.

DOC-01–06/09–16 PASS en alcance documental: se trata de un patrón de composición asociado a APP-SHELL-001 y doce familias existentes, sin familia Form ni maestros, variantes, props, tokens o estados nuevos. La solicitud de documentación posterior al PDF acredita APPROVED para las reglas contextuales. Los doce patrones conservan tareas simples, secciones/pasos/revisión, filas 1/2/3 y rechazo contextual de cuatro o más, alcance de acciones locales, relación/jerarquía, grupos repetibles, validación, envío y salida. No transforma esa convención en límite universal de accesibilidad.

La alineación FORM-INLINE-ALIGN-01/02 conserva la instrucción explícita: referencia a caja del control, bordes superior/inferior compartidos con altura equivalente, excluyendo Label, helper y error; mensaje variable no desplaza el botón. El QA de las escenas registra cuatro comparaciones de cajas en tres filas, delta superior/inferior cero. Es evidencia visual concreta, no implementación de un Row o de todo el comportamiento del formulario.

DOC-07/08/10/18 PASS para referencias y límites: Body rige contenido propio y métricas existentes; los controles conservan sus tokens, recetas y defaults. 720/960 son anchos contextuales del patrón, sin tokens ni breakpoint nuevos. No se copian inventarios de variables. Se conservan DropdownField sin error/helper/required propios, mensaje Radio group fijo, diferencia Radio multilínea y excepciones de contraste. No se fabrican capacidades para eliminar esas brechas.

P-SLOTS NOT_APPLICABLE al patrón como nueva entidad: consume Body/Slots ya existentes de App Shell y Section Header, y composición de anfitrión. No cambia sus restricciones ni añade Slots en Input/Button. DOC-17 NOT_APPLICABLE: no crea página Figma ni una familia que necesite nombre nuevo. No afirma ejecución/readback Figma.

El nuevo corte productor completado añade shape/inverse a Body: 53 tokens, sin cambio en los 52 anteriores. Se incorpora a los consumidores con su procedencia propia; no se atribuye ese alta a la aprobación del PDF de formularios. Las fuentes del PDF v0.2 coinciden con el corte actual antes de la integración. Las guías previas y el código de los controles se preservan.

El cierre de catálogo/Graphify, la integridad de los paquetes y su consumo se registran aparte. Las pruebas de un generador o fixture no certifican todos los formularios, validación de negocio, backend, lector de pantalla, uso táctil físico o accesibilidad global. Alcance local, sin publicación remota.
