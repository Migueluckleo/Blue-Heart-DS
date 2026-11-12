# Dot · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `DOT-001` · API local 0.1.0 · categoría estado.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/dot.contract.v1.0.0.md#guía-semántica-normativa).

Indica presencia, actividad, inactividad o una notificación sin captar foco. En un canal de ayuda, usa el punto de presencia junto al nombre y estado de una persona. Para pendientes, usa Count con un número breve o Count expand con el texto de límite que decida el anfitrión. Si el estado requiere explicación o resolución, usa texto o una notificación con contexto. Si la persona debe actuar, conserva esa acción en el control anfitrión.

| Situación | Haz | Evita |
|---|---|---|
| Presencia | Acompaña el punto junto a «Atención disponible» con un nombre o texto accesible. | Confiar en la diferencia cromática entre active e inactive. |
| Contador | Muestra «7» en el acceso a pendientes y comunica «7 pendientes» con el nombre del anfitrión. | Hacer del Dot un segundo control tabulable. |
| Exceso | Usa Count expand con «99+» si el consumidor aplica ese límite. | Esperar que un texto editable de Figma calcule el umbral. |

Presencia y notificación usan 16, 12 u 8 px. Count y Count expand se ofrecen en large o medium. Los contadores admiten default, brand, neutral y white. El fondo y el separador distinguen la forma. El texto del contador pertenece a la variante. White usa texto y borde oscuros. Count y Max count son independientes. El anfitrión decide cuando ocultar cero y, si cambia el estado, aporta anuncio cuando corresponda.

Contraste editorial sobre indicadores compactos y etiquetas visibles. [Atlassian Badge](https://atlassian.design/components/badge/usage) · [Carbon Tag](https://www.carbondesignsystem.com/building-blocks/core/components/tag/guidelines)

## Uso sin backend

Consulta presencia y conteos en el contexto de su anfitrión.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Pagination, PaginationItem, Tabs, TextArea, DropdownField, FloatingActions, InlineNotification, Chip, Table, TableCell, TableCaptureCell, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function DotExample() {
  return <ul id="demo-dot" className="my-4 flex flex-wrap items-center gap-6">
    <li className="flex items-center gap-2"><Dot type="active"/> Atención disponible</li>
    <li className="flex items-center gap-2">
      <Dot type="count" color="brand" count="7"/>
      <span><span className="sr-only">7 </span>Pendientes</span>
    </li>
    <li className="flex items-center gap-2">
      <Dot type="count-expand" color="white" maxCount="99+"/>
      <span><span className="sr-only">Más de 99 </span>Mensajes</span>
    </li>
  </ul>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [dot.tsx](../../src/components/dot.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type DotSize = 'large' | 'medium' | 'small';

export type DotColor = 'default' | 'brand' | 'neutral' | 'white';

export type DotProps =
  | { type: 'active' | 'busy' | 'inactive' | 'notification'; size?: DotSize; color?: 'default'; count?: never; maxCount?: never }
  | { type: 'count'; size?: Exclude<DotSize, 'small'>; color?: DotColor; count?: string; maxCount?: never }
  | { type: 'count-expand'; size?: Exclude<DotSize, 'small'>; color?: DotColor; maxCount?: string; count?: never };
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Dot: {type, size = 'large', color = 'default', count = '1', maxCount = '99+'}: DotProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Count y Max count son propiedades acotadas de texto. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [dot.contract.v1.0.0.md](../../../../specs/components/dot.contract.v1.0.0.md) · SHA-256 `c4418c9807ff26e4b52b6e18c997f07ad06fd4fa68fbf13c474ad08b974a318a`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/dot-toggle-radio.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
