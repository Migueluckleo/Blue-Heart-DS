# Pagination item · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `PAGINATION-ITEM-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/pagination-item.contract.v1.0.0.md#guía-semántica-normativa).

Usa Page para navegar a un número, Icon para un extremo o movimiento adyacente y Ellipsis para indicar una secuencia omitida. GOV.UK identifica la página actual con aria-current y da nombres a los controles de dirección. El anfitrión aporta disponibilidad, nombres y destino. [GOV.UK Pagination](https://design-system.service.gov.uk/components/pagination/)

| Situación | Haz | Evita |
|---|---|---|
| Página activa | Identifica la actual con Selected y aria-current. | Marcar varias páginas como actuales. |
| Extremo de la lista | Deshabilita solo las flechas que no tienen destino y dales un nombre. | Usar color como única explicación del extremo. |
| Secuencia omitida | Usa Ellipsis como separador sin foco. | Convertir los puntos en un botón ambiguo. |

## Uso sin backend

Distingue número, flecha y elipsis. Usa un nombre accesible para las flechas.

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

export function PaginationItemExample() {
  const [page, setPage] = useState(1);
  return <div className="my-4 flex items-center gap-2">
    <PaginationItem type="icon" direction="previous" accessibleLabel="Anterior de la muestra"
      disabled={page===1} onActivate={()=>setPage(1)}/>
    <PaginationItem type="page" label="1" selected={page===1} onActivate={()=>setPage(1)}/>
    <PaginationItem type="ellipsis"/>
    <PaginationItem type="page" label="12345" selected={page===12345} onActivate={()=>setPage(12345)}/>
    <PaginationItem type="icon" direction="next" accessibleLabel="Siguiente de la muestra"
      disabled={page===12345} onActivate={()=>setPage(12345)}/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [pagination-item.tsx](../../src/components/pagination-item.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type PaginationDirection = 'first' | 'previous' | 'next' | 'last';

const carets = {
  first: CaretDoubleLeftIcon,
  previous: CaretLeftIcon,
  next: CaretRightIcon,
  last: CaretDoubleRightIcon,
};

export type PaginationItemProps =
  | {type: 'page'; label: string; accessibleLabel?: string; selected?: boolean; onActivate: () => void; touchTarget?: boolean}
  | {type: 'icon'; direction: PaginationDirection; accessibleLabel: string; disabled?: boolean; onActivate: () => void; touchTarget?: boolean}
  | {type: 'ellipsis'};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
PaginationItem: props: PaginationItemProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Número, icono y elipsis son alternativas de anatomía fija. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [pagination-item.contract.v1.0.0.md](../../../../specs/components/pagination-item.contract.v1.0.0.md) · SHA-256 `3a8eff67b8f00d435faae568c0181afb267691611b845515ad19d4cf56913e85`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/pagination-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
