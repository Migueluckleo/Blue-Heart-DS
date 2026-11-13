# Pagination · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `PAGINATION-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/pagination.contract.v1.0.0.md#guía-semántica-normativa).

Usa Pagination para un conjunto de resultados que pueda dividirse en páginas. GOV.UK conserva la posición actual y ofrece destinos anterior y siguiente. Carbon añade el tamaño de página cuando ayuda a controlar el volumen visible. En BlueHeart, Default muestra números y Compact concentra el avance en dos flechas y un texto de posición. [GOV.UK Pagination](https://design-system.service.gov.uk/components/pagination/) · [Carbon Pagination](https://www.carbondesignsystem.com/building-blocks/core/components/pagination/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Listado extenso | Conserva extremos, vecinos y elipsis alrededor de la página actual. | Renderizar todos los números si la secuencia ya es extensa. |
| Cambio de filas por página | Actualiza página, rango y datos de forma coherente en el anfitrión. | Presentar un rango viejo con un conjunto de filas nuevo. |
| Interacción táctil | Elige Compact cuando convenga y habilita targets de 44 px desde el anfitrión. | Tratar 32 px visuales como objetivo táctil suficiente. |

## Uso sin backend

Mantiene una página actual y recibe opciones de filas del anfitrión. Compact puede ampliar targets a 44 px.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem, UserMessage, type ChatSidebarProps, Pagination, PaginationItem, Tabs, TextArea, DropdownField, FloatingActions, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from '@/index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

export function PaginationExample() {
  const [page, setPage] = useState(5);
  const [rows, setRows] = useState(20);
  const [compactPage, setCompactPage] = useState(1);
  const results = useRef<HTMLHeadingElement>(null);
  const total = 240;
  return <div className="my-4 space-y-4">
    <h3 id="demo-pagination-results" ref={results} tabIndex={-1}>Comprobantes de la página {page}</h3>
    <div className="overflow-x-auto">
      <Pagination label="Paginación de comprobantes" currentPage={page} totalPages={Math.ceil(total / rows)}
        onPageChange={next => {setPage(next);results.current?.focus();}}
        range={`${(page - 1) * rows + 1}–${Math.min(page * rows,total)} de ${total}`}
        rows={{value:rows,options:[20,50,100],onChange:next=>{setRows(next);setPage(1);}}}/>
    </div>
    <Pagination label="Paginación de vista compacta" type="compact" currentPage={compactPage}
      totalPages={3} onPageChange={setCompactPage} touchTargets/>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [pagination.tsx](../../src/components/pagination.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  type?: 'default' | 'compact';
  label?: string;
  range?: string;
  pageLabel?: string;
  touchTargets?: boolean;
  rows?: {
    label?: string;
    value: number;
    options: readonly number[];
    onChange: (value: number) => void;
  };
}

```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Pagination: {currentPage, totalPages, onPageChange, type = 'default', label = 'Paginación',
  range, pageLabel, touchTargets = false, rows}: PaginationProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Pages admite inserción, retiro y orden de ítems. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [pagination.contract.v1.0.0.md](../../../../specs/components/pagination.contract.v1.0.0.md) · SHA-256 `a41e1cba8b736289575af08a6db2ca01a44112ccc6eaf190618345b7f5e4cb65`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/pagination-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
