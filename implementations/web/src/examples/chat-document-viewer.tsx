'use client';

import { useRef, useState } from 'react';
import { DownloadSimpleIcon } from '@phosphor-icons/react/dist/csr/DownloadSimple';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { FileTextIcon } from '@phosphor-icons/react/dist/csr/FileText';
import { ChatDocumentViewer, IconButton, Search, Table, TableCell, Tabs } from '../index';

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

// example: chat-document-viewer
export function ChatDocumentViewerExample() {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [content, setContent] = useState('table');
  const [action, setAction] = useState('Datos ficticios. Las acciones de descarga se delegan al anfitrión.');
  const reopen = useRef<HTMLButtonElement>(null);
  return <div className="grid gap-4">
    <div className="flex flex-wrap items-center gap-4">
      <label><input type="checkbox" checked={showDescription}
        onChange={event => setShowDescription(event.currentTarget.checked)}/> Mostrar descripción del documento</label>
      <label>Contenido del preview <select value={content} onChange={event => setContent(event.currentTarget.value)}>
        <option value="table">Tabla</option><option value="empty">Vacío</option>
        <option value="single">Un bloque</option><option value="multiple">Varios bloques</option>
      </select></label>
    </div>
    <button ref={reopen} type="button" className="bh-document-reopen" aria-expanded={open}
      onClick={() => {setOpen(true); setExpanded(false);}}>Abrir documento entregado</button>
    {open && <div className="bh-document-viewer-example" data-expanded={expanded}>
      <ChatDocumentViewer title={deliveredDocumentTitle} description={showDescription ? deliveredDocumentDescription : undefined} expanded={expanded}
        onDownload={() => setAction('El anfitrión recibe la solicitud de descarga; la demo no genera archivos.')}
        onExpand={() => setExpanded(value => !value)} onClose={() => {setOpen(false); reopen.current?.focus();}}>
        {content === 'table' ? <DeliveredDocumentPreview onAction={setAction}/>
          : content === 'empty' ? null : Array.from({length:content === 'single' ? 1 : 3},(_,index) =>
            <p key={index} className="bh-body-description" data-preview-block>Bloque de documento de muestra {index + 1}</p>)}
      </ChatDocumentViewer>
    </div>}
    <p role="status">{action}</p>
  </div>;
}
