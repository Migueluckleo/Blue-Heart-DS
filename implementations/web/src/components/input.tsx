'use client';

import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import type { Icon } from '@phosphor-icons/react';
import { useId, useState, type ButtonHTMLAttributes, type ChangeEvent, type FocusEvent, type HTMLInputTypeAttribute, type ReactNode } from 'react';
import { Badge } from './badge';

export type InputSize = 'large' | 'medium' | 'small';
export type InputStatus = 'default' | 'hover' | 'focus' | 'success' | 'error' | 'read-only' | 'disabled';

export interface InputProps {
  id?: string;
  name?: string;
  type?: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'search' | 'url' | 'tel' | 'password'>;
  size?: InputSize;
  status?: InputStatus;
  label: string;
  placeholder?: string;
  helperText?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  showLabel?: boolean;
  showPlaceholder?: boolean;
  showHelper?: boolean;
  showTooltip?: boolean;
  showIcon?: boolean;
  icon?: Icon;
  showBadge?: boolean;
  badgeLabel?: string;
  className?: string;
}

function InputSurface({children, icon: Glyph}: {children: ReactNode; icon?: Icon}) {
  return <div className="bh-input-field">
    {children}
    {Glyph && <Glyph className="bh-input-icon" weight="light" aria-hidden="true"/>}
  </div>;
}

export function Input({id, name, type = 'text', size = 'large', status = 'default', label,
  placeholder, helperText, value, defaultValue = '', onValueChange, onBlur, required = true,
  showLabel = true, showPlaceholder = true, showHelper = true, showTooltip = false,
  showIcon = true, icon: Glyph = CaretDownIcon, showBadge = false, badgeLabel = 'MXN', className}: InputProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const helperId = showHelper && helperText ? `${controlId}-help` : undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  return <div className={['bh-input',className].filter(Boolean).join(' ')} data-blueheart="input"
    data-size={size} data-status={status} data-filled={currentValue.length > 0}>
    {showLabel && <div className="bh-input-label-row">
      <label className="bh-input-label" htmlFor={controlId}>
        {label}{required && <span className="bh-input-required" aria-hidden="true">*</span>}
      </label>
      {showTooltip && <QuestionIcon className="bh-input-question" weight="light" aria-hidden="true"/>}
    </div>}
    <div>
      <InputSurface icon={showIcon ? Glyph : undefined}>
        <input id={controlId} name={name} type={type} className="bh-input-control" value={currentValue}
          placeholder={showPlaceholder ? placeholder : undefined} required={required} disabled={status === 'disabled'}
          readOnly={status === 'read-only'} aria-label={showLabel ? undefined : label}
          aria-invalid={status === 'error' || undefined} aria-describedby={helperId} onBlur={onBlur}
          onChange={event => {
            if (value === undefined) setInternalValue(event.currentTarget.value);
            onValueChange?.(event.currentTarget.value, event);
          }}/>
        {showBadge && <Badge type="subtle" size="small" label={badgeLabel}/>}
      </InputSurface>
      {helperId && <p className="bh-input-helper" id={helperId}>{helperText}</p>}
    </div>
  </div>;
}

export function InputChoice({label, value, options, onValueChange}: {
  label: string;
  value: number;
  options: readonly number[];
  onValueChange: (value: number) => void;
}) {
  return <div className="bh-input bh-input-choice" data-blueheart="input"
    data-size="small" data-status="default" data-filled="true">
    <InputSurface icon={CaretDownIcon}>
      <select className="bh-input-control" aria-label={label} value={value}
        onChange={event => onValueChange(Number(event.currentTarget.value))}>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </InputSurface>
  </div>;
}

export function InputTrigger({id, label, value, placeholder, size = 'medium', ...attrs}: {
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  size?: InputSize;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>,'id'|'type'|'value'|'children'>) {
  const labelId = `${id}-label`;
  return <div className="bh-input bh-input-choice bh-input-trigger" data-blueheart="input"
    data-size={size} data-status={attrs.disabled?'disabled':'default'} data-filled={Boolean(value)}>
    <label className="bh-input-label" id={labelId} htmlFor={id}>{label}</label>
    <InputSurface icon={CaretDownIcon}>
      <button {...attrs} id={id} type="button" aria-labelledby={labelId} className="bh-input-control"
        data-placeholder={!value||undefined}>{value || placeholder}</button>
    </InputSurface>
  </div>;
}
