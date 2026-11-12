'use client';

import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { MinusIcon } from '@phosphor-icons/react/dist/csr/Minus';
import type { ComponentPropsWithoutRef } from 'react';

export type CheckboxSelection = boolean | 'indeterminate';

export type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>,
  'type' | 'role' | 'checked' | 'defaultChecked' | 'onChange' | 'aria-label' | 'aria-checked' | 'aria-invalid'> & {
  label: string;
  showLabel?: boolean;
  selected: CheckboxSelection;
  invalid?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  previewState?: 'hover' | 'focus';
};

export function Checkbox({label, showLabel = false, selected, onSelectedChange, invalid, previewState, className, ...input}: CheckboxProps) {
  const mixed = selected === 'indeterminate';
  const Mark = mixed ? MinusIcon : selected ? CheckIcon : null;
  return <label className={['bh-checkbox', className].filter(Boolean).join(' ')}
    data-blueheart="checkbox" data-preview={previewState} data-selected={selected}>
    <input {...input} type="checkbox" className="sr-only" checked={selected === true}
      aria-label={showLabel ? undefined : label} aria-invalid={invalid || undefined}
      aria-checked={mixed ? 'mixed' : undefined}
      ref={node => { if (node) node.indeterminate = mixed; }}
      onChange={event => {
        if (mixed) event.currentTarget.indeterminate = true;
        onSelectedChange?.(mixed || event.currentTarget.checked);
      }}/>
    <span className="bh-checkbox-control" aria-hidden="true">
      <span className="bh-checkbox-box">{Mark && <Mark weight={mixed ? 'regular' : 'light'}/>}</span>
    </span>
    {showLabel && <span className="bh-checkbox-label">{label}</span>}
  </label>;
}
