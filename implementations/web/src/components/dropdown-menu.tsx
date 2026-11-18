'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent,
  type KeyboardEventHandler, type InputHTMLAttributes } from 'react';
import { DropdownItem, type DropdownEntry, type DropdownSize } from './dropdown-item';
import { InputTrigger } from './input';
import { Search } from './search';

export interface DropdownMenuProps {
  id: string;
  label: string;
  entries: readonly DropdownEntry[];
  size?: DropdownSize;
  selectedId?: string;
  activeId?: string;
  onSelectionChange: (id: string) => void;
  maxHeight?: number;
  hidden?: boolean;
  showSearch?: boolean;
  searchLabel?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  searchInputProps?: Pick<InputHTMLAttributes<HTMLInputElement>,
    'role' | 'aria-expanded' | 'aria-controls' | 'aria-activedescendant' | 'aria-autocomplete'>;
}

const optionId = (menuId: string, id: string) => `${menuId}-option-${encodeURIComponent(id)}`;
const normalize = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().trim();

/** Keep only groups with matches and separators between surviving options. */
export function filterDropdownEntries(entries: readonly DropdownEntry[], query: string): readonly DropdownEntry[] {
  const needle = normalize(query);
  if (!needle) return entries;
  const result: DropdownEntry[] = [];
  let heading: DropdownEntry | undefined;
  let rows: DropdownEntry[] = [];
  const flush = () => {
    const matches = rows.filter(entry => entry.type !== 'option'
      || normalize(`${entry.label} ${entry.description ?? ''}`).includes(needle));
    if (matches.some(entry => entry.type === 'option')) {
      if (heading) result.push(heading);
      let pendingDivider: DropdownEntry | undefined;
      let hasOption = false;
      for (const entry of matches) {
        if (entry.type === 'divider') { if (hasOption) pendingDivider = entry; }
        else {
          if (pendingDivider) result.push(pendingDivider);
          result.push(entry);
          pendingDivider = undefined;
          hasOption = true;
        }
      }
    }
    rows = [];
  };
  for (const entry of entries) {
    if (entry.type === 'header') { flush(); heading = entry; }
    else rows.push(entry);
  }
  flush();
  return result;
}

export function DropdownMenu({id, label, entries, size = 'medium', selectedId, activeId,
  onSelectionChange, maxHeight = 320, hidden = false, showSearch = false,
  searchLabel = `Buscar en ${label}`, searchPlaceholder = 'Buscar…', searchValue,
  onSearchChange, onSearchKeyDown, searchInputProps}: DropdownMenuProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const [localQuery, setLocalQuery] = useState('');
  const query = searchValue ?? localQuery;
  const visibleEntries = showSearch ? filterDropdownEntries(entries, query) : entries;
  useEffect(() => {
    if (hidden || !activeId) return;
    const list = viewport.current;
    const option = document.getElementById(optionId(id, activeId));
    if (!list || !option) return;
    const row = option.getBoundingClientRect(), bounds = list.getBoundingClientRect();
    if (row.top < bounds.top) list.scrollTop -= bounds.top - row.top;
    else if (row.bottom > bounds.bottom) list.scrollTop += row.bottom - bounds.bottom;
  }, [activeId, hidden, id]);
  const groups: {heading?: Extract<DropdownEntry, {type: 'header'}>; rows: DropdownEntry[]}[] = [];
  for (const entry of visibleEntries) {
    if (entry.type === 'header') groups.push({heading: entry, rows: []});
    else {
      if (!groups.length) groups.push({rows: []});
      groups[groups.length - 1].rows.push(entry);
    }
  }
  const noResults = showSearch && !visibleEntries.some(entry => entry.type === 'option');
  return <div hidden={hidden} className="bh-dropdown-menu" data-blueheart="dropdown-menu"
    data-search={showSearch || undefined} style={{'--bh-dropdown-max': `${maxHeight}px`} as CSSProperties}>
    {showSearch && <div className="bh-dropdown-search">
      <Search embedded id={`${id}-search`} label={searchLabel} size="small" placeholder={searchPlaceholder}
        value={query} inputProps={{...searchInputProps, onKeyDown: onSearchKeyDown}}
        onValueChange={value => {setLocalQuery(value); onSearchChange?.(value);}}/>
    </div>}
    <div ref={viewport} id={id} role="listbox" aria-label={label} tabIndex={-1} className="bh-dropdown-options">
      {groups.filter(group => group.rows.length).map((group, index) => {
        const headingId = `${id}-group-${index}`;
        return <div key={group.heading?.id ?? `ungrouped-${index}`}
          role={group.heading ? 'group' : 'presentation'} aria-labelledby={group.heading ? headingId : undefined}>
          {group.heading && <DropdownItem id={headingId} entry={group.heading} size={size}/>}
          {group.rows.map(entry => <DropdownItem key={entry.id} id={optionId(id, entry.id)} entry={entry} size={size}
            selected={entry.id === selectedId} active={entry.id === activeId}
            onMouseDown={event => event.preventDefault()}
            onActivate={() => onSelectionChange(entry.id)}/>)}
        </div>;
      })}
    </div>
    {noResults && <div role="status" className="bh-dropdown-empty bh-dropdown-item"
      data-blueheart="dropdown-item" data-type="header">Sin resultados</div>}
  </div>;
}

export interface DropdownFieldProps extends Omit<DropdownMenuProps,
  'id' | 'activeId' | 'hidden' | 'searchValue' | 'onSearchChange' | 'onSearchKeyDown' | 'searchInputProps'> {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DropdownField({label, entries, selectedId, onSelectionChange, size = 'medium',
  placeholder = 'Selecciona una opción', disabled = false, maxHeight = 320, className = '',
  showSearch = false, searchLabel, searchPlaceholder}: DropdownFieldProps) {
  const id = useId(), root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string>();
  const allOptions = entries.filter(entry => entry.type === 'option' && !entry.disabled);
  const options = filterDropdownEntries(entries, showSearch ? query : '')
    .filter(entry => entry.type === 'option' && !entry.disabled);
  const selected = entries.find(entry => entry.type === 'option' && entry.id === selectedId);
  const expanded = open && !disabled && allOptions.length > 0;
  const currentId = options.some(entry => entry.id === activeId) ? activeId : options[0]?.id;
  const menuId = `${id}-menu`;
  function close(restoreFocus = false) {
    setOpen(false); setQuery('');
    if (restoreFocus) root.current?.querySelector<HTMLButtonElement>('.bh-input-trigger button')?.focus();
  }
  useEffect(() => {
    if (!expanded) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {setOpen(false); setQuery('');}
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [expanded]);
  useEffect(() => {
    if (expanded && showSearch) root.current?.querySelector<HTMLInputElement>('.bh-dropdown-search input')?.focus();
  }, [expanded, showSearch]);
  function show(last = false) {
    if (!allOptions.length || disabled) return;
    setQuery('');
    setActiveId(allOptions.some(entry => entry.id === selectedId) ? selectedId : allOptions[last ? allOptions.length - 1 : 0]?.id);
    setOpen(true);
  }
  function choose(value: string) {
    if (!options.some(entry => entry.id === value)) return;
    onSelectionChange(value); close(true);
  }
  function move(direction: number) {
    const index = options.findIndex(entry => entry.id === currentId);
    setActiveId(options[Math.min(options.length - 1, Math.max(0, index + direction))]?.id);
  }
  function searchKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); move(event.key === 'ArrowDown' ? 1 : -1);
    } else if (event.key === 'Enter') {
      event.preventDefault(); if (currentId) choose(currentId);
    } else if (event.key === 'Escape') {
      event.preventDefault(); close(true);
    }
  }
  function triggerKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!expanded) show(event.key === 'ArrowUp');
      else move(event.key === 'ArrowDown' ? 1 : -1);
    } else if ((event.key === 'Home' || event.key === 'End') && expanded) {
      event.preventDefault(); setActiveId(options[event.key === 'Home' ? 0 : options.length - 1]?.id);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!expanded) show();
      else if (currentId) choose(currentId);
    } else if (event.key === 'Escape' && expanded) {event.preventDefault(); close();}
    else if (event.key === 'Tab') close();
  }
  return <div ref={root} className={`bh-dropdown-field ${className}`} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
  }} onKeyDown={event => {
    if (event.key === 'Escape' && expanded && !event.defaultPrevented && !event.nativeEvent.isComposing) {
      event.preventDefault(); close(true);
    }
  }}>
    <InputTrigger id={`${id}-trigger`} label={label} value={selected?.type === 'option' ? selected.label : undefined}
      placeholder={placeholder} size={size} disabled={disabled || !allOptions.length}
      role={showSearch ? undefined : 'combobox'} aria-haspopup="listbox" aria-expanded={expanded}
      aria-controls={expanded ? menuId : undefined}
      aria-activedescendant={!showSearch && expanded && currentId ? optionId(menuId, currentId) : undefined}
      onClick={() => expanded ? close() : show()} onKeyDown={triggerKey}/>
    <DropdownMenu id={menuId} label={label} entries={entries} size={size} selectedId={selectedId}
      activeId={currentId} onSelectionChange={choose} maxHeight={maxHeight} hidden={!expanded}
      showSearch={showSearch} searchLabel={searchLabel} searchPlaceholder={searchPlaceholder}
      searchValue={query} onSearchChange={value => {setQuery(value); setActiveId(undefined);}}
      onSearchKeyDown={searchKey} searchInputProps={{role: 'combobox', 'aria-expanded': expanded,
        'aria-controls': menuId, 'aria-autocomplete': 'list',
        'aria-activedescendant': expanded && currentId ? optionId(menuId, currentId) : undefined}}/>
  </div>;
}
