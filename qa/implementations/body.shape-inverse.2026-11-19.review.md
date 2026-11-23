# QA · Body shape inverse

Fecha: 2026-11-19. Resultado técnico: PASS. Corrección de FOUNDATIONS-BODY-SEMANTIC-COLORS-001, versión 1.0.0 conservada. user_audit NOT_REQUIRED; human_review_policy OPTIONAL_NON_BLOCKING. P-SLOTS NOT_APPLICABLE: token de foundation y muestra editable, sin nueva familia consumible.

## Implementación y aliases

EXPLICIT: el usuario solicita inverse para shapes consumiendo el semántico blanco. Se incorporó `component/body/color/shape/inverse`, COLOR, en [AI Blueheart DS](https://www.figma.com/design/yZsIpXywybsPDytjolwcP4/AI-Blueheart-DS?node-id=548-9686).

| Capa | Nombre | ID real de destino |
|---|---|---|
| component | body/color/shape/inverse | VariableID:547:2 |
| semantic | neutral-base | VariableID:8:192 |
| primitives | neutral/100 | VariableID:11:86 |

La nueva variable conserva key `10a9d009f244459c40882fabd01d31265ef1aecf`. Los cuatro aliases por modo apuntan al mismo semantic y resuelven RGBA(1,1,1,1), #FFFFFF. Los IDs fuente de los datos delegados son diferentes: neutral-base `VariableID:6:166` → neutral/100 `VariableID:6:92`; el `targetId` del nuevo rol registra su identidad real sin sustituir esos aliases fuente.

Scopes leídos: exclusivamente `SHAPE_FILL`. CodeSyntax WEB: `var(--body-color-shape-inverse)`. El CSS generado conserva `--body-color-shape-inverse: var(--neutral-base)` en Contable, Administrativo, Servicios y Personas. No se usa blanco literal como sustituto del alias. Inverse sirve para formas e iconos sobre superficies gráficas oscuras o intensas; la regla de pares del mismo tono con fondos sutiles no se aplica a este rol.

## Preservación y visibilidad

Lectura posterior: 1,510 variables locales; 53 Body con scopes visibles y 1,457 internas con scopes vacíos. Cero tokens ajenos al prefijo exacto body/ en component visibles y cero ALL_SCOPES. La política y Figma enumeran los mismos nombres, tipos y scopes. Body suma 29 colores, incluidos ocho roles shape; los demás grupos de colores conservan sus nombres y valores.

Se compararon exactamente las 52 definiciones Body anteriores: IDs, keys, nombres, tipos, colecciones, descripciones, aliases por modo, scopes, codeSyntax y publicabilidad permanecen iguales. neutral-base y neutral/100 conservan su definición; las colecciones mantienen IDs, keys, modos y publicabilidad. Los cinco estilos Body mantienen sus enlaces a variables. Los 33 Body iniciales y el JSON inicial completo permanecen sin cambios; los 19 registros de la ampliación anterior y los 52 registros de la política se preservan exactamente.

La muestra añadida al frame existente `504:9685` contiene una ellipse vinculada al nuevo token sobre una rectangle vinculada a shape/brand. Sus textos usan estilos Body y sus medidas internas usan spacing/radius Body. Se conservaron todos los nodos previos y su orden relativo. La muestra es FRAME, sin maestros ni sets nuevos. Captura revisada visualmente: 1040×886, sin desbordes.

## QA web

`pnpm ds:generate` y `pnpm verify`: PASS; 51 familias cubiertas, cero derivados desactualizados, TypeScript, 15/15 pruebas y build estático. El test de navegador existente se amplió para comprobar la nueva cadena, scopes y el relleno real de la muestra; solicitudes externas bloqueadas durante Chrome.

| Tema | Forma inverse | Contraste sobre shape/brand |
|---|---|---|
| Contable | rgb(255, 255, 255) | 8.559:1 |
| Administrativo | rgb(255, 255, 255) | 9.526:1 |
| Servicios | rgb(255, 255, 255) | 7.202:1 |
| Personas | rgb(255, 255, 255) | 10.006:1 |

Todos superan el umbral de 3:1 de esta muestra gráfica. Se preservan las siete filas previas, sus colores y pares de contraste, las cinco Cards, separación de 32 px entre bloques y estándar interno 24/16/8/4. También pasan teclado, widgets, cambio de temas, anchuras del Body 1272/1110/1272, y muestra inverse sin desbordes a 320 px. Cero errores de página. Captura web revisada visualmente.

## Evidencia y cierre

- [QA documental](../contracts/body.shape-inverse.2026-11-19.review.md), [contrato vigente](../../specs/foundations/body.semantic-colors.amendment.v1.0.0.md), [datos canónicos](../../specs/tokens/body.semantic-colors.v1.0.0.json) y [política de scopes](../../specs/tokens/visibility.body-only.correction.json).
- [Estado previo Figma](../../implementations/figma/body-shape-inverse-2026-11-19/before.json), [lectura posterior](../../implementations/figma/body-shape-inverse-2026-11-19/after.json), [comparaciones](../../implementations/figma/body-shape-inverse-2026-11-19/validation.json), [nueva variable](../../implementations/figma/body-shape-inverse-2026-11-19/created.json) y [muestra](../../implementations/figma/body-shape-inverse-2026-11-19/specimen-created.json).
- Evidencia local: `output/qa/body-shape-inverse-2026-11-19/` contiene data-integrity.json, chrome.json, logs de generación/verificación/navegador y capturas Figma/web.
- Datos SHA-256: Body colores `0ea0106dd8f55cb826ebdc83f4243d6828edc56207480759145edcedd2a68490`; política `cebe758ecc00ea68020bb068022e8617747d7dc7e1af6dbb916caedcbd1504d2`. Referencias de contrato y config/web-inputs.json actualizadas; datos protegidos ajenos conservados.

Las dos guías de consumo describen el mismo rol, scope, alias y 53 nombres. El cierre coordinado `scripts/ds close --run 2026-11-19-body-shape-inverse` sincroniza índice, catálogo, ZIP de ambas skills y Graphify del mismo corte; su comprobante local `output/closures/2026-11-19-body-shape-inverse.json` acredita el estado derivado. Los launchers conservan versión. Sin publicación, instalación, commit o push. Las mediciones de tokens del agente no están disponibles y no se reportan como cero.
