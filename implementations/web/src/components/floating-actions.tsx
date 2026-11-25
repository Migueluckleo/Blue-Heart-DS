'use client';

import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Button } from './button';
import { Dot } from './dot';
import { IconButton } from './icon-button';

export type FloatingSelectionScope = 'page' | 'all';

export interface FloatingSelectionOption {
  countLabel: string;
  context: string;
  disabled?: boolean;
}

export interface FloatingSelectionProps {
  page: FloatingSelectionOption;
  all: FloatingSelectionOption;
  onSelect: (scope: FloatingSelectionScope) => void;
}

export interface FloatingActionsProps {
  count: string;
  label: string;
  actions?: ReactNode;
  selection?: FloatingSelectionProps;
  selectAll?: {label: string; onSelect: () => void};
  onDismiss?: () => void;
  dismissLabel?: string;
  className?: string;
}

function FloatingSelection({page, all, onSelect}: FloatingSelectionProps) {
  const id = useId();
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const triggerId = id + '-trigger';
  const options = [
    {scope:'page', label:'Seleccionar solo esta página', ...page},
    {scope:'all', label:'Seleccionar todo', ...all},
  ] as const;

  const trigger = () => document.getElementById(triggerId);
  const enabledItems = () => Array.from(menu.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);

  useEffect(() => {
    if (!open || !menu.current) return;
    const panel = menu.current;
    const place = () => {
      const anchor = document.getElementById(triggerId)?.getBoundingClientRect();
      if (!anchor) return;
      const style = getComputedStyle(panel);
      const gap = Number(style.getPropertyValue('--floating-actions-selection-spacing-anchor'));
      const {width, height} = panel.getBoundingClientRect();
      const above = anchor.top - height - gap;
      const below = anchor.bottom + gap;
      panel.style.left = Math.max(gap, Math.min(anchor.left, window.innerWidth - width - gap)) + 'px';
      panel.style.top = Math.max(gap, above >= gap ? above : Math.min(below, window.innerHeight - height - gap)) + 'px';
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, triggerId]);

  function close(restoreFocus = false) {
    if (menu.current?.matches(':popover-open')) {
      menu.current.hidePopover();
      setOpen(false);
    }
    if (restoreFocus) trigger()?.focus();
  }

  function show(last = false) {
    if (!menu.current) return;
    menu.current.showPopover();
    setOpen(true);
    const items = enabledItems();
    (last ? items.at(-1) : items[0])?.focus({preventScroll:true});
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    const {key} = event;
    if (!menu.current?.matches(':popover-open')) {
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault();
        show(key === 'ArrowUp');
      }
      return;
    }
    if (key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    }
    if (!['ArrowDown','ArrowUp','Home','End'].includes(key)) return;
    event.preventDefault();
    const items = enabledItems();
    const current = items.findIndex(item => item === document.activeElement);
    const next = key === 'Home' ? 0 : key === 'End' ? items.length - 1
      : (current + (key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
    items[next]?.focus();
  }

  return <div className="bh-floating-selection" onKeyDown={handleKeys} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  }}>
    <Button id={triggerId} variant="text" size="large" label="Seleccionar" showRightIcon
      rightIcon={{component:CaretDownIcon}} aria-haspopup="menu" aria-expanded={open}
      aria-controls={id} disabled={page.disabled && all.disabled} onClick={() => menu.current?.matches(':popover-open') ? close() : show()}/>
    <div ref={menu} id={id} role="menu" aria-label="Alcance de selección" popover="auto"
      className="bh-floating-selection-menu" onToggle={event=>setOpen(event.newState==='open')}>
      {options.map(({scope,label,countLabel,context,disabled}) => <button key={scope} type="button"
        role="menuitem" tabIndex={-1} disabled={disabled} className="bh-floating-selection-item"
        onClick={() => {close(true);onSelect(scope);}}>
        <span>{label}</span>
        <span className="bh-floating-selection-meta">{countLabel}<span aria-hidden="true">·</span>{context}</span>
      </button>)}
    </div>
  </div>;
}

export function FloatingActions({count,label,actions,selection,selectAll,onDismiss,dismissLabel='Cerrar acciones de selección',
  className}: FloatingActionsProps) {
  return <div className={['bh-floating-actions',className].filter(Boolean).join(' ')}
    role="group" aria-label="Acciones de selección" data-blueheart="floating-actions">
    <div className="bh-floating-summary">
      <div className="bh-floating-summary" role="status">
        <Dot type="count" size="large" color="neutral" count={count}/>
        <span><span className="sr-only">{count} </span>{label}</span>
      </div>
      {selection ? <FloatingSelection {...selection}/> : selectAll && <button
        className="bh-floating-select-all" type="button" onClick={selectAll.onSelect}>{selectAll.label}</button>}
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
