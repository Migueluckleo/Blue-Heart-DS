# Chat Document Viewer · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHAT-DOCUMENT-VIEWER-001` · API local 0.1.0 · categoría conversación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/chat-document-viewer.actions.amendment.v1.0.0.md#guía-semántica-normativa).

Usa Chat Document Viewer para leer un documento entregado junto a la conversación. Title y Description identifican el resultado; preview contiene el documento específico de producto. actions aloja controles oficiales para actuar sobre ese documento. Su muestra usa Descargar xls Secondary y Expandir/Cerrar Icon Buttons Ghost medium; la composición y cantidad pueden variar sin convertirlas en variantes de documento.

Conserva ambos Slots y sus responsabilidades de sizing: preview estira hijos al insertarlos; actions no lo hace automáticamente. Usa un toolbar FILL con alineación al final y separación de 16 px para reproducir la muestra. Mantén los nombres accesibles de los iconos y la responsabilidad del anfitrión sobre archivo, visibilidad y foco. El contenido tabular es un ejemplo. En web usa actions para contenido de acciones y children para preview. Omite actions para el toolbar estándar o pasa null para vacío; el anfitrión conserva accesibilidad y comportamiento del contenido que suministra.

## Uso sin backend

actions reemplaza el toolbar predeterminado; undefined conserva Descargar Secondary y Expandir/Cerrar Ghost medium, null lo deja vacío. children conserva preview. El anfitrión define handlers, nombres accesibles y foco de las acciones suministradas.

```tsx
'use client';

import { useRef, useState } from 'react';
import { DownloadSimpleIcon } from '@phosphor-icons/react/dist/csr/DownloadSimple';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { FileTextIcon } from '@phosphor-icons/react/dist/csr/FileText';
import { ChatDocumentViewer, IconButton, Search, Table, TableCell, Tabs } from '@/index';

export const deliveredDocumentTitle = 'Distribución de facturas de personas físicas con IVA retenido en marzo 2025';
export const deliveredDocumentDescription = 'Los datos mostrados son solo informativos. Si quieres conocer toda la relación de elementos descarga el xls.';
const invoices = [11600, 5800, 7250, 8900, 10450, 6200, 9000, 12500].map((amount, index) => ({
  id: index, date: `${String(30 + index > 30 ? index : 30).padStart(2, '0')}/${index ? '07' : '06'}/2025`,
  rfc: 'EIRK950324JC3', name: 'Rodrigo Matamoros Medina', amount,
}));

/** Example content only: this composition is not a library export or a document renderer. */
export function DeliveredDocumentPreview({onAction}: {onAction: (message: string) => void}) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('issued');
  const [size, setSize] = useState(20);
  const rows = invoices.filter(row => `${row.date} ${row.rfc} ${row.name}`.toLocaleLowerCase('es').includes(search.toLocaleLowerCase('es')));
  const table = <Table label={`Facturas ficticias ${selected === 'issued' ? 'emitidas' : 'recibidas'}`}
    stickyActions columnWidths={[120, 140, 226, 144, 94]} viewportHeight={360}
    pagination={{currentPage: 1, totalPages: 1, totalRecords: rows.length, pageSize: size, onPageChange: () => {},
      rows: {value: size, options: [10,20,50], onChange: setSize}}}>
    <thead><tr>{['Fecha', 'RFC', 'Nombre', 'Total', 'Acciones'].map(label =>
      <TableCell key={label} item="header" label={label} showVerticalDivider/>)}</tr></thead>
    <tbody>{rows.map(row => <tr key={row.id}>
      <TableCell label={row.date}/><TableCell label={row.rfc}/><TableCell label={row.name}/>
      <TableCell label={new Intl.NumberFormat('es-MX', {style:'currency',currency:'MXN'}).format(row.amount)}/>
      <TableCell><IconButton variant="ghost" size="small" label={`Ver factura ficticia ${row.id + 1}`}
        icon={FileTextIcon} onClick={() => onAction(`Consultar factura ficticia ${row.id + 1}`)}/></TableCell>
    </tr>)}</tbody>
  </Table>;
  return <>
    <div className="bh-delivered-document-toolbar">
      <Search label="Buscar facturas del documento" placeholder="Buscar por nombre, UUID y RFC" value={search} onValueChange={setSearch}/>
      <IconButton variant="ghost" size="large" label="Configurar vista del documento" icon={GearIcon}
        onClick={() => onAction('Solicitud local: configurar vista')}/>
      <IconButton variant="primary" size="large" label="Solicitar descarga de la tabla" icon={DownloadSimpleIcon}
        onClick={() => onAction('El anfitrión recibe la solicitud de descarga; la demo no genera archivos.')}/>
    </div>
    <div className="bh-delivered-document-visualization">
      <h3>Visualización</h3>
      <Tabs label="Tipo de comprobantes" type="pill" selectedId={selected} onSelectionChange={setSelected}
        items={[{id:'issued',label:'CFDIs Emitidos',panel:table},{id:'received',label:'CFDIs Recibidos',panel:table}]}/>
    </div>
  </>;
}

export function ChatDocumentViewerExample() {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [content, setContent] = useState('table');
  const [actionsMode, setActionsMode] = useState('default');
  const [actionsEnabled, setActionsEnabled] = useState(true);
  const [action, setAction] = useState('Datos ficticios. Las acciones de descarga se delegan al anfitrión.');
  const reopen = useRef<HTMLButtonElement>(null);
  const actionIds = Array.from({length: actionsMode === 'many' ? 12 : 5}, (_, index) => index + 1);
  if (actionsMode === 'reversed') actionIds.reverse();
  const customActions = actionsMode === 'default' ? undefined : actionsMode === 'empty' ? null
    : actionsMode === 'single' ? <IconButton variant="ghost" size="medium" label="Consultar documento de muestra"
      icon={FileTextIcon} onClick={() => setAction('Consulta local del documento de muestra.')}/>
    : <div className="bh-document-viewer-toolbar">
      {actionIds.map(id => <IconButton key={id} variant="ghost" size="medium" label={`Acción de muestra ${id}`}
        icon={FileTextIcon} onClick={() => setAction(`Solicitud local de acción de muestra ${id}.`)}/>)}
    </div>;
  return <div className="grid gap-4">
    <div className="flex flex-wrap items-center gap-4">
      <label><input type="checkbox" checked={showDescription}
        onChange={event => setShowDescription(event.currentTarget.checked)}/> Mostrar descripción del documento</label>
      <label>Contenido del preview <select value={content} onChange={event => setContent(event.currentTarget.value)}>
        <option value="table">Tabla</option><option value="empty">Vacío</option>
        <option value="single">Un bloque</option><option value="multiple">Varios bloques</option>
      </select></label>
      <label><input type="checkbox" checked={actionsEnabled}
        onChange={event => setActionsEnabled(event.currentTarget.checked)}/> Acciones predeterminadas habilitadas</label>
      <label>Contenido de actions <select value={actionsMode} onChange={event => setActionsMode(event.currentTarget.value)}>
        <option value="default">Predeterminado</option><option value="empty">Vacío</option>
        <option value="single">Una acción</option><option value="multiple">Cinco acciones</option>
        <option value="reversed">Cinco en orden inverso</option><option value="many">Doce acciones</option>
      </select></label>
    </div>
    <button ref={reopen} type="button" className="bh-document-reopen" aria-expanded={open}
      onClick={() => {setOpen(true); setExpanded(false);}}>Abrir documento entregado</button>
    {open && <div className="bh-document-viewer-example" data-expanded={expanded}>
      <ChatDocumentViewer title={deliveredDocumentTitle} description={showDescription ? deliveredDocumentDescription : undefined} expanded={expanded}
        actions={customActions}
        onDownload={actionsEnabled ? () => setAction('El anfitrión recibe la solicitud de descarga; la demo no genera archivos.') : undefined}
        onExpand={actionsEnabled ? () => setExpanded(value => !value) : undefined}
        onClose={actionsEnabled ? () => {setOpen(false); reopen.current?.focus();} : undefined}>
        {content === 'table' ? <DeliveredDocumentPreview onAction={setAction}/>
          : content === 'empty' ? null : Array.from({length:content === 'single' ? 1 : 3},(_,index) =>
            <p key={index} className="bh-body-description" data-preview-block>Bloque de documento de muestra {index + 1}</p>)}
      </ChatDocumentViewer>
    </div>}
    <p role="status">{action}</p>
  </div>;
}
```

Ejemplo compilado en [examples/chat-document-viewer.tsx](../../src/examples/chat-document-viewer.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [chat-document-viewer.tsx](../../src/components/chat-document-viewer.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface ChatDocumentViewerProps {
  title: string;
  description?: string;
  children?: ReactNode;
  /** Replaces the default toolbar. Omit for defaults; null leaves the Slot empty. */
  actions?: ReactNode;
  downloadLabel?: string;
  expandLabel?: string;
  closeLabel?: string;
  expanded?: boolean;
  onDownload?: () => void;
  onExpand?: () => void;
  onClose?: () => void;
  headingLevel?: 2 | 3 | 4;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
ChatDocumentViewer: {title, description, children, actions, downloadLabel = 'Descargar xls',
  expandLabel, closeLabel = 'Cerrar', expanded = false, onDownload, onExpand, onClose,
  headingLevel = 2, className}: ChatDocumentViewerProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Figma: actions#519:0 y preview#430:0 nativos. React: actions y children; contenido reemplazable y cantidades/orden editables. Un toolbar FILL reproduce la alineación al final; un hijo directo no se estira. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [chat-document-viewer.contract.v1.0.0.md](../../../../specs/components/chat-document-viewer.contract.v1.0.0.md) · SHA-256 `9c55f655d521dbeaec4e2f88f282d488b290b8b4be8fca99047da95c6cc1679e`.
- [chat-document-viewer.actions.amendment.v1.0.0.md](../../../../specs/components/chat-document-viewer.actions.amendment.v1.0.0.md) · SHA-256 `36897ddbdee0a18fdd60292b161fdc658ad73b25884368d3fc7cfac6101db533`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/chat-document-viewer.actions.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
