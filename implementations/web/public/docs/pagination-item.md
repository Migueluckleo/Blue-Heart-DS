# Pagination item · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `PAGINATION-ITEM-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/pagination-item.contextual-usage.amendment.v1.0.0.md#guía-semántica-normativa).

| Tipo | Intención | Estados fuente |
|---|---|---|
| Page | Navegar a un número. | default, hover, selected, focus |
| Icon | Primera, anterior, siguiente o última. | default, hover, focus, disabled |
| Ellipsis | Secuencia omitida. | default |

**PAGITEM-CURRENT-01.** Una sola página actual con selected y aria-current=page. Selected comunica posición, Focus comunica navegación de teclado y no se confunden. El anillo web puede acompañar a la página actual; no crea una décima variante Figma. No inventar Page disabled, Icon selected, pressed, loading o error.

**PAGITEM-NAME-01.** Cada flecha nombra su dirección y el anfitrión aporta destino/disponibilidad. Deshabilitar solo destinos imposibles: primera/anterior al inicio, siguiente/última al final. Ellipsis es texto no interactivo, sin foco ni clic; no abrir un menú de páginas por inferencia de los puntos.

**PAGITEM-GEOMETRY-01.** Page crece para números largos, con mínimo y alto 32 px. Icon/Ellipsis conservan 32 × 32; carets Phosphor Outline Light de 16. El foco tiene anillo exterior de 2 px con separación visible; no recortarlo al cambiar Label ni copiar el stroke interior de Table Cell. El anfitrión/touchTargets puede ampliar el objetivo táctil a 44 conservando receta visual. No prometer comodidad táctil universal por la superficie de muestra.

**PAGITEM-KEYBOARD-01.** Usar Tab/Shift+Tab y Enter/Espacio de botón; no roving focus de Tabs ni selección con flechas. No atribuir una carga completada al clic. Conservar nombres, extremos y foco al cambiar lote.

## Uso sin backend

Distingue número, flecha y elipsis. Usa un nombre accesible para las flechas.

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
- [pagination-item.contextual-usage.amendment.v1.0.0.md](../../../../specs/components/pagination-item.contextual-usage.amendment.v1.0.0.md) · SHA-256 `68dba12802fd371d31ff6dbb247229bc33a25d76bc3570b6c8f82fdcbd171d86`.
- [tables-pagination-selection.amendment.v1.0.0.md](../../../../specs/patterns/tables-pagination-selection.amendment.v1.0.0.md) · SHA-256 `b4f3057e9a09e7f7651275e1a47afcba00a364bb8ffd02c562a440073d29955b`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/pagination-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
