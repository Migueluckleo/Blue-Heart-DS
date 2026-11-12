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

El anfitrión mantiene filas, orden y paginación. El viewport desplaza ambos ejes y Pagination queda fuera del área desplazable.

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

export function TableExample() {
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
    <p id="demo-table-selection" role="status">{selected.length} seleccionados de {rows.length} comprobantes</p>
    <Table label="Comprobantes ficticios" className="max-w-[560px]" viewportHeight={124}
      columnWidths={[100,148,220,280]}
      pagination={{currentPage:current,totalPages,onPageChange:setPage,label:'Páginas de comprobantes',
        range:rows.length ? `${start+1}–${Math.min(start+pageSize,rows.length)} de ${rows.length}` : undefined,
        rows:{value:pageSize,options:[4,6],onChange:value=>{setPageSize(value);setPage(1);}}}}>
      <thead><tr>
        <TableCell item="header" label="Selección"/>
        <TableCell item="header" label="Folio" sort={reversed ? 'descending' : 'ascending'}/>
        <TableCell item="header" label="Proveedor"/>
        <TableCell item="header" label="Concepto"/>
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
  children: ReactNode;
  pagination?: PaginationProps;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Table: {label, viewportLabel = `Desplazamiento de ${label}`, viewportHeight = 360,
  columnWidths, children, pagination, className}: TableProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Rows admite una cabecera y cantidad variable de filas con identidad estable. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [table.contract.v1.0.0.md](../../../../specs/components/table.contract.v1.0.0.md) · SHA-256 `c806d0f7971730c058a181c33ba05550ea9c943315d0a0d5bb0dffc559c9f46e`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/table-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
