# Badge · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `BADGE-001` · API local 0.1.0 · categoría estado.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/badge.contextual-usage.amendment.v1.0.1.md#guía-semántica-normativa).

### Intención y alternativas

**BADGE-INTENT-01.** Usa Badge para comunicar un estado o atributo sin interacción: Conciliado, En proceso o MXN. Colócalo junto al objeto o dato que describe. El texto transmite significado; color e icono lo acompañan. Badge no recibe foco propio ni se pulsa. Para elegir opciones o quitar filtros aplicados usa Chip; Guardar, Enviar o navegar requieren Button/enlace y su patrón. La forma compacta no vuelve intercambiables estas responsabilidades.

**BADGE-INTENT-02.** El anfitrión es la pantalla o flujo que aporta el contexto del dato, comprueba el resultado y comunica actualizaciones relevantes. Cambiar Label no genera por sí solo un anuncio accesible ni acredita un proceso completado o una operación remota exitosa.

| Situación | Haz | Evita |
|---|---|---|
| Estado de un comprobante | Texto específico y tipo consistente junto al objeto. | Apilar estados incompatibles del mismo proceso. |
| Unidad de un importe | Subtle/small con moneda ISO pertinente, como MXN. | Hacer del Badge un selector o convertir el valor. |
| Acción | Usar el control apropiado y su nombre accesible. | Badge con apariencia de botón, foco o icono derecho que aparenta cerrar. |
| Falta de espacio | Revisar el texto o usar un patrón que admita explicación. | Truncar, escalar tipografía o depender de una etiqueta ambigua. |

### Seis tipos por significado

**BADGE-TYPE-01.** Mantén el mismo significado de tipo entre objetos y productos. No elijas el color por decoración, marca o prioridad visual.

| Tipo existente | Cuándo usar | Ejemplo y límite |
|---|---|---|
| subtle | Metadato discreto o unidad; tipo predeterminado, con borde propio. | MXN. No modifica moneda ni importe. |
| neutral | Metadato neutro sin borde, útil sobre superficies de color conforme a la receta. | Nacional. No es una nueva interacción. |
| info | Contexto, avance o situación informativa. | En proceso no afirma que concluyó. |
| success | Resultado realmente confirmado. | Conciliado requiere que la comprobación/proceso haya concluido. |
| warning | Atención sin presentarla como fallo bloqueante. | Requiere revisión. Mantiene la excepción de contraste registrada. |
| error | Fallo o resultado negativo. | Falló el envío. La pantalla explica recuperación cuando sea necesaria. |

No hay eje state, hover, pressed, focus, selected o disabled; los tipos success/error son significado de la etiqueta, no estados de interacción. Seis tipos × tres tamaños = 18 variantes. Los iconos y la visibilidad no multiplican esta matriz.

### Tamaño y escala coherente

| Regla | Tamaño y altura | Contexto apropiado | Evita |
|---|---|---|---|
| BADGE-SIZE-01 | small · 20 px | Tablas/listas densas, metadatos compactos y unidades junto al dato. Default vigente. | Reducirlo para ocultar una etiqueta larga. |
| BADGE-SIZE-02 | medium · 24 px | Lectura estándar en tarjeta o sección, junto a elementos de escala equivalente. | Interpretarlo como un cambio de default. |
| BADGE-SIZE-03 | large · 32 px | Vista de detalle o composición de baja densidad. | Usarlo para expresar urgencia o importancia del estado. |

**BADGE-SIZE-04.** Conserva un tamaño por lista o tabla. El ancho es HUG y crece con Label e iconos; no fuerces un ancho uniforme ni alteres padding/tipografía para igualar filas. Small usa texto 12/20 e icono 12; medium texto 12/16 e icono 16; large texto 14/24 e icono 16. Normaliza “middle” a `medium`; Badge no tiene extra-small. Solo subtle conserva su borde de 1 px.

### Iconos izquierdo y derecho

**BADGE-ICON-01.** Ambos lados son opcionales, independientes y decorativos. Propón el izquierdo para reconocer un estado conocido antes de leer, por ejemplo CheckCircle con Conciliado. El texto mantiene el significado si el icono no se percibe. No uses un glyph sin nombre comprensible como única señal del resultado.

**BADGE-ICON-02.** Usa icono derecho solo si aporta una pista secundaria clara y convenida. No significa abrir menú, navegar ni cerrar. Ocúltalo si no ayuda. Evita duplicar la misma señal en ambos lados: dos iconos no expresan dos acciones ni justifican ruido visual en cada fila. Una X decorativa sugiere remoción que Badge no implementa.

**BADGE-ICON-03.** Show left icon / Show right icon son false por defecto. Presentation Outline/Fill es el placeholder intercambiable de la raíz, sin significado de estado. El API web conserva Presentation y `leftWeight/rightWeight='fill'`; los ejemplos CheckCircle, WarningCircle e Info pueden usar Light según la receta. Consume Phosphor oficial y los roles internos de tamaño/color; el swap no crea una variante ni un control nuevo.

### Label, ubicación y longitud

**BADGE-CONTENT-01.** Usa sentence case y una frase específica, normalmente 1–3 palabras. ≤20 caracteres es recomendación editorial, no máximo del API. Haz: Requiere revisión. Evita: Estado 2. Mantén vocabulario, tipo y escala en objetos comparables. No uses montos o datos sensibles como Label ni reemplaces con Badge una explicación de recuperación.

**BADGE-CONTENT-02.** Una línea sin truncamiento ni saltos automáticos; no hay un máximo de ancho inventado. Si no cabe, revisa redacción o el patrón, sin recortar la diferencia significativa, encoger la tipografía ni dejar el dato inaccesible fuera del viewport. El anfitrión resuelve espacio y explicación adicional.

**BADGE-UNIT-01.** MXN identifica la unidad de un importe; no cambia la moneda ni convierte el valor. La composición existente de Input consume subtle/small con moneda pertinente. La obligatoriedad, formato y cálculo del importe corresponden al dato y a su anfitrión; no se deducen de Badge.

### Foco, temas y contraste

**BADGE-FOCUS-01.** Badge es una etiqueta no interactiva, sin foco propio, reacciones o estados de teclado. Los iconos son `aria-hidden`. No le agregues Tab, onClick o un cierre simulado para resolver una necesidad de interacción. El anfitrión comunica cambios relevantes, incluidos anuncios cuando correspondan, sin asumir aria-live automático.

**BADGE-THEME-01.** Todos los roles son invariantes en Contable, Administrativo, Servicios y Personas. La marca del producto no cambia estado, tipo ni significado. Los valores/aliases pertenecen al JSON delegado del contrato base; esta guía no crea un catálogo editable paralelo ni recolorea el DS.

**BADGE-CONTRAST-01.** El QA vigente registra warning en 2.962:1 en la muestra, inferior a 4.5:1 para texto pequeño. Se conserva por la decisión previa documentada; no redondear a conformidad AA ni extender la excepción a Chip. El texto describe el estado y puede reforzarse con el icono pertinente, sin presentar ese refuerzo como corrección del contraste o certificación de accesibilidad global en cualquier superficie.

### Mapeo de propiedades y límites

| Propiedad | Capacidad existente |
|---|---|
| Label / label | Texto editable; default Label, no un dato de producto. |
| type | neutral/subtle/info/success/warning/error; default subtle. |
| size | small/medium/large; default small. |
| Show left/right icon | Visibilidad independiente, false por defecto. |
| Left/Right icon / leftIcon/rightIcon | Swaps de Phosphor; Presentation por defecto. |
| leftWeight/rightWeight | API web, default fill; ejemplos de estado Light conforme a receta. |

No hay state ni callbacks propios; no expone selected, disabled o eliminación. P-SLOTS NOT_APPLICABLE: Left icon, Label y Right icon son anatomía fija con texto/visibilidad/swaps acotados. Counter de Chip y Dot conservan sus identidades; no se sustituyen por un Badge privado.

## Uso sin backend

Compara una moneda, un estado confirmado y una advertencia. Los iconos son decorativos. Caution usa la gama caution-orange en los cuatro temas. Badge Caution no tiene borde; Linear Progress Caution conserva el valor real y admite indeterminado.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem, UserMessage, type ChatSidebarProps, Pagination, PaginationItem, Tabs, TextArea, DropdownField, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function BadgeExample() {
  return <div className="my-4 flex flex-wrap items-center gap-4" id="demo-badge">
    <Badge label="MXN"/>
    <Badge label="Conciliado" type="success" size="medium"
      showLeftIcon leftIcon={CheckCircleIcon} leftWeight="light"/>
    <Badge label="Requiere revisión" type="warning" size="large"/>
    <Badge label="Precaución" type="caution" size="large"/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [badge.tsx](../../src/components/badge.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type BadgeType = 'neutral' | 'subtle' | 'info' | 'success' | 'warning' | 'caution' | 'error';

export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps {
  label?: string;
  type?: BadgeType;
  size?: BadgeSize;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: Icon;
  rightIcon?: Icon;
  leftWeight?: IconWeight;
  rightWeight?: IconWeight;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Badge: {label = 'Label', type = 'subtle', size = 'small',
  showLeftIcon = false, showRightIcon = false, leftIcon: Left = PresentationIcon,
  rightIcon: Right = PresentationIcon, leftWeight = 'fill', rightWeight = 'fill'}: BadgeProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. El texto y ambos iconos forman una anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [badge.contract.v1.0.0.md](../../../../specs/components/badge.contract.v1.0.0.md) · SHA-256 `ce3dcad202dc780415c618cc08f09c5130ea8d55c9dc0061e0c46f5e8b2b495b`.
- [badge.contextual-usage.amendment.v1.0.1.md](../../../../specs/components/badge.contextual-usage.amendment.v1.0.1.md) · SHA-256 `59a48a8a290034ec7a36dcfa64fde9147a820320453e770eb25f54a93ac6ab1a`.
- [badges-chips.status-filters.amendment.v1.0.0.md](../../../../specs/patterns/badges-chips.status-filters.amendment.v1.0.0.md) · SHA-256 `d730fa5d62f171469afaf7315f01b36d13a1bd8901e95c333080e76b042aa119`.
- [caution.amendment.v1.0.0.md](../../../../specs/foundations/caution.amendment.v1.0.0.md) · SHA-256 `3a1f2c61951535da83f92dc942feac5744846cfbe12bd7a2f14e53ff1b564503`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/badge.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
