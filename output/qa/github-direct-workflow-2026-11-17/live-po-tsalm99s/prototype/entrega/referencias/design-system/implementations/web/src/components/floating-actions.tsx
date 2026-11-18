'use client';

import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import type { ReactNode } from 'react';
import { Dot } from './dot';
import { IconButton } from './icon-button';

export interface FloatingActionsProps {
  count: string;
  label: string;
  actions?: ReactNode;
  selectAll?: {label: string; onSelect: () => void};
  onDismiss?: () => void;
  dismissLabel?: string;
  className?: string;
}

export function FloatingActions({count,label,actions,selectAll,onDismiss,dismissLabel='Cerrar acciones de selección',
  className}: FloatingActionsProps) {
  return <div className={['bh-floating-actions',className].filter(Boolean).join(' ')}
    role="group" aria-label="Acciones de selección" data-blueheart="floating-actions">
    <div className="bh-floating-summary">
      <div className="bh-floating-summary" role="status">
        <Dot type="count" size="large" color="neutral" count={count}/>
        <span><span className="sr-only">{count} </span>{label}</span>
      </div>
      {selectAll&&<button className="bh-floating-select-all" type="button" onClick={selectAll.onSelect}>
        {selectAll.label}
      </button>}
    </div>
    <div className="bh-floating-controls">
      {actions}
      {onDismiss&&<>
        {actions&&<span className="bh-floating-divider" aria-hidden="true"/>}
        <IconButton variant="ghost" size="large" icon={XIcon} label={dismissLabel} onClick={onDismiss}/>
      </>}
    </div>
  </div>;
}
