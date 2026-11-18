'use client';

import { useId } from 'react';
import { Radio } from './radio';

export interface RadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  title: string;
  showTitle?: boolean;
  helperText?: string;
  showHelperText?: boolean;
  direction?: 'vertical' | 'horizontal';
  state?: 'default' | 'error';
  options: readonly RadioGroupOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export function RadioGroup({name, title, showTitle = true, helperText, showHelperText = true,
  direction = 'vertical', state = 'default', options, value, onValueChange}: RadioGroupProps) {
  const id = useId();
  const limit = direction === 'horizontal' ? 3 : 5;
  if (options.length < 2 || options.length > limit) {
    throw new RangeError(`Radio group ${direction} requires 2–${limit} options`);
  }
  if (options.some(option => !option.label.trim()) || new Set(options.map(option => option.value)).size !== options.length) {
    throw new Error('Radio group requires nonempty labels and unique option values');
  }
  const invalid = state === 'error';
  const message = invalid ? 'Select an option' : helperText;
  const description = showHelperText && message ? `${id}-helper` : undefined;
  return <fieldset className="bh-radio-group" data-blueheart="radio-group" data-state={state}
    role="radiogroup" aria-labelledby={`${id}-title`} aria-describedby={description} aria-invalid={invalid || undefined}>
    <legend className={showTitle ? 'bh-radio-group-title' : 'sr-only'} id={`${id}-title`}>{title}</legend>
    <div className="bh-radio-group-options" data-direction={direction}>
      {options.map(option => <Radio key={option.value} name={name} value={option.value} label={option.label} showLabel
        disabled={option.disabled} selected={value === option.value} onSelect={onValueChange} invalid={invalid}
        aria-describedby={description}/>)}
    </div>
    {description && <p className="bh-radio-group-helper" id={description}>{message}</p>}
  </fieldset>;
}
