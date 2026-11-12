'use client';

import type { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

export type ToggleProps = Omit<ComponentPropsWithoutRef<'input'>,
  'type' | 'role' | 'checked' | 'defaultChecked' | 'onChange' | 'aria-label'> & {
  label: string;
  showLabel?: boolean;
  selected: boolean;
  onSelectedChange?: (selected: boolean) => void;
  previewState?: 'hover' | 'focus';
};

export function Toggle({label, showLabel = false, selected, onSelectedChange, previewState, className, ...input}: ToggleProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => onSelectedChange?.(event.currentTarget.checked);
  return <label className={['bh-toggle', className].filter(Boolean).join(' ')}
    data-blueheart="toggle" data-preview={previewState}>
    <input {...input} type="checkbox" role="switch" className="sr-only" checked={selected}
      aria-label={showLabel ? undefined : label} onChange={handleChange}/>
    <span className="bh-toggle-track" aria-hidden="true"><span className="bh-toggle-thumb"/></span>
    {showLabel && <span className="bh-toggle-label">{label}</span>}
  </label>;
}
