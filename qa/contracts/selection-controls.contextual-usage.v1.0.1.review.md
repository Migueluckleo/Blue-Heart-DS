# QA documental · Checkboxes, Radio Buttons y Toggles

Fecha: 2026-11-19. CONTRACT_REVIEW PASS para cuatro guías contextuales y cinco patrones aprobados en el PDF de 20 páginas. [Fuente y hashes](../../sources/inventories/selection-controls-contextual-usage.approval.2026-11-19.json).

Se contrastaron las reglas con contratos base, datos delegados, TypeScript y CSS vigentes. Cobertura: Checkbox 30 variantes, Radio 10, Radio group 4 y Toggle 8; un tamaño por familia, Show label=false en átomos, labelPosition solo Checkbox, límites de Options y ayuda fija de grupo. Semántica: decisiones independientes/excluyentes/inmediatas, mixed calculado por anfitrión e indeterminate→true, Focus de teclado, flechas Radio que seleccionan, validación/disponibilidad y persistencia externa. Sin nuevas props, estados, iconos, tamaños o Slots.

P-SLOTS: Checkbox/Radio/Toggle NOT_APPLICABLE por anatomía fija; Radio group REQUIRED conserva Options nativo 2–5 Radio oficiales y límite horizontal 3 del consumidor. Los cinco patrones no crean familias ni Slots arbitrarios. Las guías se mapean por identidad; related_components expresa relaciones sin crear ciclos normativos nuevos.

RADIO-MULTILINE-ALIGNMENT permanece OBSERVED: la receta exige primera línea y la web actual centra Radio multilínea. El PDF aprobado y la guía lo declaran; no se adopta como regla, no se afirma una corrección ni se modifica CSS. La guía de Radio y sus patrones conservan ese límite para consumo y traspaso.

Las Description se preparan para una sincronización Figma autorizada futura; no acreditan nueva escritura ni readback. Se preservan originales, guías anteriores, datos, tokens, geometría y código. El QA documental no acredita accesibilidad global, servicios o persistencia remota. Cierre del catálogo y paquetes: comprobantes de ejecución separados bajo output/closures y selection-controls-documentation-delivery del workspace.
