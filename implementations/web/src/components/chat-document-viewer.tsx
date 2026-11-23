'use client';

import { useId, type ReactNode } from 'react';
import { DownloadSimpleIcon } from '@phosphor-icons/react/dist/csr/DownloadSimple';
import { ArrowsOutSimpleIcon } from '@phosphor-icons/react/dist/csr/ArrowsOutSimple';
import { ArrowsInSimpleIcon } from '@phosphor-icons/react/dist/csr/ArrowsInSimple';
import { XCircleIcon } from '@phosphor-icons/react/dist/csr/XCircle';
import { Button } from './button';
import { IconButton } from './icon-button';

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

export function ChatDocumentViewer({title, description, children, actions, downloadLabel = 'Descargar xls',
  expandLabel, closeLabel = 'Cerrar', expanded = false, onDownload, onExpand, onClose,
  headingLevel = 2, className}: ChatDocumentViewerProps) {
  const titleId = useId();
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
  return <section className={['bh-document-viewer', className].filter(Boolean).join(' ')}
    data-blueheart="chat-document-viewer" data-expanded={expanded} aria-labelledby={titleId}>
    <div className="bh-document-viewer-actions" data-slot="actions" role="group" aria-label="Acciones del documento">
      {actions === undefined ? <div className="bh-document-viewer-toolbar">
      <Button variant="secondary" size="medium" label={downloadLabel} showLeftIcon
        leftIcon={{component: DownloadSimpleIcon}} disabled={!onDownload} onClick={onDownload}/>
      <IconButton variant="ghost" size="medium" label={expandLabel ?? (expanded ? 'Restaurar' : 'Expandir')}
          selected={expanded} icon={expanded ? ArrowsInSimpleIcon : ArrowsOutSimpleIcon}
          disabled={!onExpand} onClick={onExpand}/>
      <IconButton variant="ghost" size="medium" label={closeLabel}
        icon={XCircleIcon} disabled={!onClose} onClick={onClose}/>
      </div> : actions}
    </div>
    <header className="bh-document-viewer-header">
      <Heading id={titleId} className="bh-document-viewer-title">{title}</Heading>
      {description && <p className="bh-document-viewer-description">{description}</p>}
    </header>
    <div className="bh-document-viewer-preview" data-slot="preview" role="region" aria-label={`Preview de ${title}`}>
      {children}
    </div>
  </section>;
}
