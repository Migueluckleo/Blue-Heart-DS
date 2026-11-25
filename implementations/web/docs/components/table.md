# Table · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TABLE-001` · API local 0.1.0 · categoría data.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/table.contract.v1.0.0.md#guía-semántica-normativa).

Usa Table para comparar valores alineados por columna y recorrer filas. La tabla HTML conserva semántica de filas y encabezados, con controles de fila alcanzables por el teclado. Carbon mantiene cabecera y cuerpo a la misma altura e incorpora paginación para lotes. BlueHeart mantiene 40 px por fila y reutiliza Pagination. [W3C WAI Table](https://www.w3.org/WAI/ARIA/apg/patterns/table/) · [Carbon Data table](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines)

| Situación | Haz | Evita |
|---|---|---|
| Comparar comprobantes | Mantén encabezados de columna y alinea su contenido. | Mezclar densidades entre filas y encabezado. |
| Desborde en contenedor reducido | Conserva el ancho de columnas y permite desplazar el viewport. | Fijar un límite de filas igual a la muestra o prometer cabecera congelada. |
| Cambiar página o tamaño | Reutiliza Pagination y sincroniza los datos en el anfitrión. | Atribuir filtrado o persistencia al componente visual. |

## Uso sin backend

El anfitrión mantiene filas, orden y paginación. El viewport desplaza ambos ejes y Pagination queda fuera del área desplazable. stickyActions=true fija la última columna (cabecera y cuerpo) a la derecha, con sombra lateral y superficie opaca. Coloca Icon Buttons Ghost small en sus celdas y declara su ancho en columnWidths. La cabecera acompaña el scroll vertical y Pagination permanece fuera.

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

export function TableExample() {
  const [stickyActions,setStickyActions] = useState(false);
  const [lastAction,setLastAction] = useState('');
  const [rows,setRows] = useState(() => Array.from({length:12},(_,index)=>index+1));
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(4);
  const [selected,setSelected] = useState<number[]>([]);
  const [reversed,setReversed] = useState(false);
  const [nextRow,setNextRow] = useState(13);
  const totalPages=Math.max(1,Math.ceil(rows.length/pageSize));
  const current=Math.min(page,totalPages);
  const ordered=reversed ? [...rows].reverse() : rows;
  const start=(current-1)*pageSize;
  const visible=ordered.slice(start,start+pageSize);
  return <div className="grid min-w-0 gap-3">
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" size="small" label="Invertir orden" onClick={()=>{setReversed(value=>!value);setPage(1);}}/>
      <Button variant="secondary" size="small" label="Agregar fila de muestra" onClick={()=>{
        setRows(value=>[...value,nextRow]);setNextRow(value=>value+1);setPage(1);
      }}/>
      <Button variant="secondary" size="small" label="Retirar primera fila" disabled={rows.length===0} onClick={()=>{
        const first=ordered[0];setRows(value=>value.filter(row=>row!==first));setSelected(value=>value.filter(row=>row!==first));setPage(1);
      }}/>
    </div>
    <Checkbox label="Fijar acciones a la derecha" selected={stickyActions} onSelectedChange={setStickyActions}/>
    <p id="demo-table-selection" role="status">{selected.length} seleccionados de {rows.length} comprobantes</p>
    <p role="status" id="demo-table-action">{lastAction}</p>
    <Table label="Comprobantes ficticios" className="max-w-[560px]" viewportHeight={124}
      stickyActions={stickyActions} columnWidths={stickyActions ? [100,148,220,280,136] : [100,148,220,280]}
      pagination={{currentPage:current,totalPages,onPageChange:setPage,label:'Páginas de comprobantes',
        totalRecords:rows.length,
        rows:{value:pageSize,options:[4,6],onChange:value=>{setPageSize(value);setPage(1);}}}}>
      <thead><tr>
        <TableCell item="header" label="Selección"/>
        <TableCell item="header" label="Folio" sort={reversed ? 'descending' : 'ascending'}/>
        <TableCell item="header" label="Proveedor"/>
        <TableCell item="header" label="Concepto"/>
        {stickyActions && <TableCell item="header" label="Acciones"/>}
      </tr></thead>
      <tbody>{visible.map(row=>{
        const checked=selected.includes(row);
        const state=checked ? 'selected' : 'default';
        return <tr key={row}>
          <TableCell kind="checkbox" state={state}>
            <Checkbox label={`Seleccionar folio ${row}`} selected={checked} onSelectedChange={value=>setSelected(prev=>value?[...prev,row]:prev.filter(id=>id!==row))}/>
          </TableCell>
          <TableCell label={`Folio ${row}`} state={state}/>
          <TableCell label={`Proveedor ficticio ${row}`} state={state}/>
          <TableCell label="Servicios de conciliación contable del periodo de muestra" state={state}/>
          {stickyActions && <TableCell kind="action" state={state}>
            <div className="bh-table-cell-actions">
              <IconButton variant="ghost" size="small" icon={EyeIcon} label={`Ver folio ${row}`} title={`Ver folio ${row}`}
                onClick={()=>setLastAction(`Vista local del folio ${row}`)}/>
              <IconButton variant="ghost" size="small" icon={PencilSimpleIcon} label={`Editar folio ${row}`} title={`Editar folio ${row}`}
                onClick={()=>setLastAction(`Edición local del folio ${row}`)}/>
            </div>
          </TableCell>}
        </tr>;
      })}</tbody>
    </Table>
  </div>;
}
```

Ejemplo compilado en [examples.tsx](../../src/examples.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [table.tsx](../../src/components/table.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface TableProps {
  label: string;
  viewportLabel?: string;
  viewportHeight?: number;
  columnWidths?: readonly number[];
  stickyActions?: boolean;
  children: ReactNode;
  pagination?: PaginationProps;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Table: {label, viewportLabel = `Desplazamiento de ${label}`, viewportHeight = 360,
  columnWidths, stickyActions = false, children, pagination, className}: TableProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Rows admite una cabecera y cantidad variable de filas con identidad estable. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [table.contract.v1.0.0.md](../../../../specs/components/table.contract.v1.0.0.md) · SHA-256 `11a10407cc962ea6c2bbf5e2fd8ecb16e3f106cbbc5f100820284f098ccd602b`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/table-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
