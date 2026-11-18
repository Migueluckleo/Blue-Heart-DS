'use client';

import { PlusCircleIcon } from '@phosphor-icons/react/dist/csr/PlusCircle';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import type { Icon } from '@phosphor-icons/react';
import { useId, type Ref } from 'react';

export type ChipSize = 'large' | 'medium' | 'small' | 'extra-small';

export type ChipMode =
  | { mode: 'single'; name: string; value: string; selected: boolean; onSelect: () => void }
  | { mode: 'multiple'; selected: boolean; onSelectedChange: (selected: boolean) => void }
  | { mode: 'removable'; onRemove: () => void; removeRef?: Ref<HTMLButtonElement> };

export type ChipProps = ChipMode & {
  label: string;
  size?: ChipSize;
  counter?: string;
  leftIcon?: Icon;
  rightIcon?: Icon;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  disabled?: boolean;
  describedBy?: string;
  className?: string;
};

export function Chip(props: ChipProps) {
  const { label, size = 'medium', counter, leftIcon: Left = PlusCircleIcon,
    rightIcon: Right = PlusCircleIcon, showLeftIcon = Boolean(props.leftIcon),
    showRightIcon = Boolean(props.rightIcon), disabled = false, describedBy, className } = props;
  const counterId = useId();
  const selected = props.mode === 'removable' ? false : props.selected;
  const description = [counter !== undefined ? counterId : undefined, describedBy].filter(Boolean).join(' ') || undefined;
  const shared = {
    className: ['bh-chip', className].filter(Boolean).join(' '),
    'data-blueheart': 'chip', 'data-size': size, 'data-mode': props.mode,
    'data-selected': selected, 'data-disabled': disabled,
  };
  const parts = <>
    {showLeftIcon && <Left className="bh-chip-glyph" weight="light" aria-hidden="true"/>}
    <span className="bh-chip-label">{label}</span>
    {counter !== undefined && <span className="bh-chip-counter" id={counterId}>{counter}</span>}
    {showRightIcon && <Right className="bh-chip-glyph" weight="light" aria-hidden="true"/>}
  </>;
  if (props.mode === 'single') {
    return <label {...shared}>
      <input className="bh-chip-radio" type="radio" name={props.name} value={props.value}
        checked={selected} disabled={disabled} aria-label={label} aria-describedby={description} onChange={props.onSelect}/>
      {parts}
    </label>;
  }
  if (props.mode === 'multiple') {
    return <button {...shared} type="button" disabled={disabled} aria-label={label} aria-describedby={description}
      aria-pressed={selected} onClick={() => props.onSelectedChange(!selected)}>{parts}</button>;
  }
  return <span {...shared}>
    {parts}
    <button className="bh-chip-remove" type="button" aria-label={`Quitar filtro ${label}`}
      aria-describedby={description} disabled={disabled} ref={props.removeRef} onClick={props.onRemove}>
      <XIcon className="bh-chip-glyph" weight="light" aria-hidden="true"/>
    </button>
  </span>;
}
