# Table · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TABLE-001` · API local 0.1.0 · categoría data.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/table.contextual-usage.amendment.v1.0.0.md#guía-semántica-normativa).

**TABLE-INTENT-01.** Usa Table para comparar entidades del mismo tipo mediante columnas estables: folio, cliente, importe y estado de comprobantes. Una fila identifica un registro. No elegirla solo por cantidad de elementos. Para contenido narrativo o estructura variable, evaluar lista/composición; para un objeto, detalle o formulario; para secciones hermanas, Tabs. No inventar una familia Card para cubrir esas alternativas.

**TABLE-SCHEMA-01.** Antes de construir, declarar entidad, ID estable, columnas y unidades, contenido de cada celda, acciones, selección, orden, estados y paginación. Cabecera y cuerpo conservan orden y anchos aunque falte un dato o una acción. No identificar registros por posición: ordenar y paginar no cambia su identidad.

**TABLE-COMPOSE-01.** Alojar en Body de App Shell; para el listado convencional, Flex según contexto. Header/Sidebar mantienen contexto global y Section Header identifica el conjunto. Título, búsqueda y filtros describen ese conjunto. Pagination queda debajo y fuera del viewport de filas. Dos conjuntos independientes necesitan regiones y paginadores distinguibles. No crear un nuevo bodyLayout ni duplicar selector de empresa sin necesidad.

**TABLE-SLOTS-01.** P-SLOTS REQUIRED. Rows admite una cabecera y cero o más registros, sin máximo declarado; mínimo uno cuenta la cabecera. Las nueve filas y dimensiones de muestra no son límites. Web conserva una tabla nativa con thead, tbody, th scope=col y td. El scroll permite ambos ejes y la cabecera se desplaza verticalmente; no prometer cabecera congelada.

| Necesidad | Haz | Evita |
|---|---|---|
| Comparar importes | Una moneda/unidad identificada, formato consistente y columnas alineadas. | Mezclar monedas o representar ausencia como cero. |
| Texto largo | Label de una línea con elipsis y acceso claro al dato completo cuando sea necesario. | Depender solo de hover/title para información esencial. |
| Desborde | Conservar columnas y permitir scroll. | Comprimir tipografía/hijos u ocultar datos sin decisión de producto. |
| Edición intensiva | Resolver flujo, controles, validación y recuperación reales. | Prometer grid, fórmulas o edición masiva por mostrar Capture Cell. |
| Operación en lote | Checkbox por ID y Floating Actions desde dos seleccionados. | Usar Toggle, Badge o selected visual como colección de registros. |

**TABLE-STICKY-01.** Default desplaza todas las columnas. Sticky fija solo la última columna de acciones a la derecha con superficie opaca y sombra oficial. Cabecera, datos y acciones se mueven juntos al desplazar verticalmente. En Figma coordinar Rows y Actions por ID, orden y altura en cada inserción, baja o reordenación; ambas regiones conservan mínimo uno y máximo abierto. Viewport usa Fill en ancho y Hug en altura. En ambas variantes, su altura sigue la cabecera y las filas, con Pagination fuera de Viewport. Cambiar de variante con Rows sobrescrito requiere adaptar la columna separada de Actions.

**TABLE-STICKY-02.** Web usa una sola tabla; no duplicar controles ni filas para fijar acciones. `stickyActions` solo fija la celda final. Declarar su ancho en columnWidths, suficiente para sus controles; los 136 px para Ver/Editar son ejemplo. Usar Icon Button ghost/small oficial, con nombre por registro. Conservar estados de superficie y foco. No reemplazar las acciones históricas de Table Cell para afirmar que ambas composiciones son idénticas.

**TABLE-HOST-01.** El anfitrión mantiene consulta, filtros, orden y aria-sort, colección seleccionada, permisos, resultados, retorno y foco. Si ordenar se ofrece, habilitar un control real, definir criterio/dirección/desempate y actualizar datos y cabecera juntos. No hacer interactiva una columna sin respuesta ni atribuir callbacks de orden a Table Cell. Ordenar solo el lote visible debe declararse para no sugerir orden global.

**TABLE-KEYBOARD-01.** El viewport web tiene tabIndex=0 para desplazamiento; Tab/Shift+Tab recorre enlaces y controles habilitados. Las celdas de texto no se convierten en paradas ni el conjunto en grid por representar Focus. Enter activa enlaces; botones y casillas conservan su teclado. No tabindex positivos, flechas de grid ni clic de fila que compita con controles internos.

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
  /** Optional maximum viewport height in pixels. Content shorter than this hugs its rows. */
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
Table: {label, viewportLabel = `Desplazamiento de ${label}`, viewportHeight,
  columnWidths, stickyActions = false, children, pagination, className}: TableProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Rows admite una cabecera y cantidad variable de filas con identidad estable. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [table.contract.v1.0.0.md](../../../../specs/components/table.contract.v1.0.0.md) · SHA-256 `2e3cb5ac310f42b0bfce7719f7d3e9db6d694bae089b901c8a5bcdcfde017fef`.
- [table.contextual-usage.amendment.v1.0.0.md](../../../../specs/components/table.contextual-usage.amendment.v1.0.0.md) · SHA-256 `7c318281649129074f42ea7502124696becb7dd4d5cfbbba1b1c1604c5b28368`.
- [tables-pagination-selection.amendment.v1.0.0.md](../../../../specs/patterns/tables-pagination-selection.amendment.v1.0.0.md) · SHA-256 `581fa2d5311abea2a85ff738e0beeeb606f73d45689eaa030f0530c0c833c287`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/table-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
