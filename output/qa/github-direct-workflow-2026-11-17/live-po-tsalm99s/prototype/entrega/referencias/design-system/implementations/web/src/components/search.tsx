'use client';

import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import { useId, useRef } from 'react';

export type SearchSize = 'small' | 'medium' | 'large';

export interface SearchProps {
  id?: string;
  label: string;
  showLabel?: boolean;
  placeholder?: string;
  value: string;
  size?: SearchSize;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

export function Search({id, label, showLabel = false, placeholder = 'Search', value, size = 'large',
  disabled = false, onValueChange, onSearch}: SearchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const input = useRef<HTMLInputElement>(null);
  return <form role="search" aria-label={label} className="bh-search" data-blueheart="search"
    data-size={size} data-filled={Boolean(value)} data-disabled={disabled} onSubmit={event => {
      event.preventDefault();
      if (!disabled) onSearch?.(value);
    }}>
    {showLabel && <label className="bh-search-label" htmlFor={inputId}>{label}</label>}
    <div className="bh-search-content">
      <MagnifyingGlassIcon className="bh-search-icon" weight="light" aria-hidden="true"/>
      <input id={inputId} ref={input} type="search" className="bh-search-input" value={value}
        placeholder={placeholder} aria-label={showLabel ? undefined : label} disabled={disabled}
        onChange={event => onValueChange?.(event.currentTarget.value)}/>
      {!disabled && value && <button className="bh-search-clear" type="button" aria-label="Limpiar búsqueda" onClick={() => {
        onValueChange?.('');
        input.current?.focus();
      }}><XIcon className="bh-search-icon" weight="light" aria-hidden="true"/></button>}
    </div>
  </form>;
}
