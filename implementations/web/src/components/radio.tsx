'use client';

import type { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

export type RadioProps = Omit<ComponentPropsWithoutRef<'input'>,
  'type' | 'role' | 'checked' | 'defaultChecked' | 'onChange' | 'aria-label' | 'aria-invalid' | 'name' | 'value' | 'onSelect'> & {
  name: string;
  value: string;
  label: string;
  showLabel?: boolean;
  selected: boolean;
  invalid?: boolean;
  onSelect?: (value: string) => void;
  previewState?: 'hover' | 'focus';
};

export function Radio({name, value, label, showLabel = false, selected, invalid, onSelect, previewState, className, ...input}: RadioProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (event.currentTarget.checked) onSelect?.(value);
  };
  return <label className={['bh-radio', className].filter(Boolean).join(' ')}
    data-blueheart="radio" data-preview={previewState}>
    <input {...input} type="radio" className="sr-only" name={name} value={value} checked={selected}
      aria-label={showLabel ? undefined : label} aria-invalid={invalid || undefined} onChange={handleChange}/>
    <span className="bh-radio-control" aria-hidden="true"><span className="bh-radio-circle"/></span>
    {showLabel && <span className="bh-radio-label">{label}</span>}
  </label>;
}
