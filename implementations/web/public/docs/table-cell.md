# Table cell · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TABLE-CELL-001` · API local 0.1.0 · categoría data.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/table-cell.contract.v1.0.0.md#guía-semántica-normativa).

Usa una celda de encabezado para nombrar su columna y una celda de datos para el valor de la fila. Nombra los controles por su efecto y contexto. La guía WAI reserva el patrón de tabla para datos tabulares y recomienda el elemento HTML nativo. Carbon mantiene la densidad consistente entre encabezado y cuerpo. [W3C WAI Table](https://www.w3.org/WAI/ARIA/apg/patterns/table/) · [Carbon Data table](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Encabezado de columna | Usa un título breve y scope col. | Dar a la celda un título visual sin relación semántica. |
| Una acción de fila | Da a PencilSimple un nombre que incluya el elemento afectado. | Usar un glyph sin nombre o atribuir la acción a toda la fila. |
| Valor de captura | Muestra el texto y el estado del campo junto al control real del anfitrión. | Atribuir validación o persistencia al estado visual. |

## Uso sin backend

El ejemplo muestra el valor de captura, un enlace real, selección y una acción de fila. Los controles se componen con sus APIs propietarias.

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

export function TableCellExample() {
  const [selected, setSelected] = useState(false);
  const [edited, setEdited] = useState(false);
  const [enabled, setEnabled] = useState(true);
  return <div className="grid gap-3">
    <Table label="Ejemplos de celdas de comprobantes" viewportHeight={88} columnWidths={[64,154,190,100,110,100]}>
      <thead><tr>
        <TableCell item="header" label="Selección"/>
        <TableCell item="header" label="Comprobante"/>
        <TableCell item="header" label="Moneda"/>
        <TableCell item="header" label="Visible"/>
        <TableCell item="header" label="Validación"/>
        <TableCell item="header" label="Acciones"/>
      </tr></thead>
      <tbody><tr>
        <TableCell kind="checkbox" state={selected ? 'selected' : 'default'}>
          <Checkbox label="Seleccionar FAC-001" selected={selected} onSelectedChange={setSelected}/>
        </TableCell>
        <TableCell kind="link" label="FAC-001" href="#demo-table-cell-details"/>
        <TableCaptureCell capture={edited} label={edited ? 'MXN' : 'Selecciona moneda'} showRightIcon/>
        <TableCell kind="toggle"><Toggle label="Mostrar FAC-001" selected={enabled} onSelectedChange={setEnabled}/></TableCell>
        <TableCell kind="badge" showRightIcon={edited}>
          <Badge type={edited ? 'success' : 'error'} size="medium" label={edited ? 'Listo' : 'Pendiente'}/>
        </TableCell>
        <TableCell kind="action" actions={[{id:'edit',label:'Editar moneda de FAC-001',icon:PencilSimpleIcon,
          onActivate:()=>setEdited(value=>!value)}]}/>
      </tr></tbody>
    </Table>
    <p id="demo-table-cell-details">FAC-001 · Comprobante ficticio de la muestra</p>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [table-cell.tsx](../../src/components/table-cell.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type TableCellState = 'default' | 'selected' | 'hover' | 'focus';

export interface TableCellAction {
  id: string;
  label: string;
  icon: Icon;
  weight?: 'light' | 'regular';
  onActivate: () => void;
}


export type TableCellProps = CellContent & CellVariant & {
  avatar?: Omit<AvatarProps, 'size'>;
  href?: string;
  children?: ReactNode;
  actions?: readonly [TableCellAction, TableCellAction?, TableCellAction?, TableCellAction?];
};

export interface TableCaptureCellProps extends CellContent {
  capture?: boolean;
  state?: TableCellState;
}

```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
TableCell: {item = 'concept', kind = 'default', state = 'default', avatar, href, children, actions, sort,
  showVerticalDivider = false, showHorizontalBorders = true, showRightIcon = false, ...text}: TableCellProps
TableCaptureCell: {capture = false, state = 'default', showVerticalDivider = false,
  showHorizontalBorders = true, ...text}: TableCaptureCellProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Cada tipo usa una anatomía fija y los swaps cubren el auxiliar de hasta cuatro acciones. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [table-cell.contract.v1.0.0.md](../../../../specs/components/table-cell.contract.v1.0.0.md) · SHA-256 `9c8ff9ef9633413c2addd283b4022c88a0014db013a71f00828036660b595d99`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/table-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
