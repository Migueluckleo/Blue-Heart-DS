# Table cell · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `TABLE-CELL-001` · API local 0.1.0 · categoría data.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/table-cell.contextual-usage.amendment.v1.0.0.md#guía-semántica-normativa).

| Tipo o hijo | Cuándo usar | Evita |
|---|---|---|
| Cabecera | Nombre de columna, unidad y scope=col; default, Checkbox o Toggle según intención. | Título visual sin relación semántica; Toggle como Seleccionar todo. |
| Default | Valor de consulta. Avatar solo si ayuda a reconocer identidad. | Avatar decorativo en folios/importes. |
| Link | Identificador con destino real, por ejemplo Abrir F-1041. | Texto azul sin destino o clic sobre toda la fila. |
| Checkbox | Incluir el registro en una operación posterior; nombre por ID. | Interpretar selección como preferencia persistida. |
| Action | Ver, Editar o Eliminar ese registro. | Extender la acción de una celda a toda la selección. |
| Toggle | Configuración o disponibilidad de efecto inmediato soportado. | Selección de registros o simular persistencia con color. |
| Badge | Estado o atributo confirmado y consultable. | Foco, selección o edición inferida del Pencil decorativo. |
| Capture | Representación del valor/estado visual de captura. | Considerarla Input/Dropdown operativo, validación o grid. |

**CELL-LAYOUT-01.** Cabecera y cuerpo conservan 40 px, Manrope 14/20, cuerpo Regular y cabecera SemiBold. No hay eje size/small/medium/large. Label es una línea con elipsis; el anfitrión decide anchos y acceso al valor completo. Hijos oficiales mantienen receta/tamaño propios. Para números, usar contenido compuesto a la derecha desde el anfitrión; no existe prop align. No sobreescribir internos .bh-* ni cambiar tokens para fabricar otra densidad.

**CELL-CONTENT-01.** Cero es un valor real; Sin dato expresa ausencia. Fechas, separadores, moneda y unidades conservan el contexto del producto. Label del padre no renombra Badge, Checkbox, Toggle o Avatar: sus propiedades pertenecen al hijo. La horizontal está visible por defecto en web y la vertical oculta; los separadores facilitan comparación, no añaden jerarquías o estados.

**CELL-ICON-01.** Los iconos izquierdo/derecho de acompañamiento son decorativos de 20 px; default oculta ambos. Mostrar solo los que aportan significado. CaretDown no abre un menú ni ordena por sí solo. El enlace web kind=link necesita href; sin él queda texto. El subrayado web y la evidencia Figma conservan sus alcances.

**CELL-STATE-01.** El estado visual del padre y el valor del control hijo son independientes. Selected de Cell no selecciona una casilla ni añade un ID. Hover no reemplaza Focus. El stroke interior de Focus es de 2 px; `state=focus` no vuelve enfocada ni tabulable una celda. Cuando se compone un control real, su foco conserva la receta oficial. No inventar disabled, error, loading o success del padre.

| Matriz existente | Estados permitidos |
|---|---|
| Cuerpo default/link/checkbox/action/toggle/badge | default, selected, hover, focus |
| Cabecera default/checkbox/toggle | default, focus |
| Capture off/on | default, selected, hover, focus |

**CELL-CAPTURE-01.** Capture off presenta texto/placeholder; on presenta un valor capturado. La superficie actual no es input/select ni editor de celda: no hay búsqueda, validación, captura numérica/fecha ni confirmación por Enter implícitas. Para edición real, el anfitrión compone controles oficiales y define activación, confirmar/cancelar, errores, ancho/alto y recuperación; no sustituir su anatomía por un Dropdown sin esa decisión.

**CELL-ACTION-01.** Dar nombres accesibles con verbo y objeto: Ver F-1041, Editar F-1041. Las acciones siguen afectando solo esa fila aunque haya multiselección. El auxiliar histórico usa glyphs Phosphor de 20 px y swaps acotados; DotsThree no crea menú automático ni acredita objetivo táctil de 44 px. Sticky usa otra composición: superficie Cell más Icon Button ghost/small oficial de 32 px. Confirmaciones y recuperación pertenecen al flujo.

## Uso sin backend

El ejemplo muestra el valor de captura, un enlace real, selección y una acción de fila. Los controles se componen con sus APIs propietarias.

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

export function TableCellExample() {
  const [selected, setSelected] = useState(false);
  const [edited, setEdited] = useState(false);
  const [enabled, setEnabled] = useState(true);
  return <div className="grid gap-3">
    <Table label="Ejemplos de celdas de comprobantes" columnWidths={[64,154,190,100,110,100]}>
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
- [table-cell.contextual-usage.amendment.v1.0.0.md](../../../../specs/components/table-cell.contextual-usage.amendment.v1.0.0.md) · SHA-256 `899845f109996db007bc92f664e2cf1e40b494dc02798c7c73af6a5702e3b35d`.
- [tables-pagination-selection.amendment.v1.0.0.md](../../../../specs/patterns/tables-pagination-selection.amendment.v1.0.0.md) · SHA-256 `b4f3057e9a09e7f7651275e1a47afcba00a364bb8ffd02c562a440073d29955b`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/table-chain.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
