'use client';

import { NotchesIcon } from '@phosphor-icons/react/dist/csr/Notches';
import { useId, useState } from 'react';

export type TextAreaState = 'default' | 'focus' | 'error' | 'disabled';

export interface TextAreaProps {
  id?: string;
  name?: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  showHelper?: boolean;
  showCounter?: boolean;
  maxLength?: number;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  state?: TextAreaState;
  fieldHeight?: number;
  resizable?: boolean;
  className?: string;
}

export function TextArea({id, name, label, placeholder, helperText, showHelper = true, maxLength,
  showCounter = maxLength !== undefined, required = false, value, defaultValue = '', onValueChange,
  state = 'default', fieldHeight, resizable = false, className}: TextAreaProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const helperId = showHelper && helperText ? `${controlId}-help` : undefined;
  const counterId = showCounter ? `${controlId}-count` : undefined;
  const [localValue, setLocalValue] = useState(defaultValue);
  const currentValue = value ?? localValue;
  const descriptions = [helperId,counterId].filter(Boolean).join(' ');
  const count = maxLength === undefined ? String(currentValue.length) : `${currentValue.length}/${maxLength}`;

  return <div className={['bh-text-area',className].filter(Boolean).join(' ')} data-blueheart="text-area"
    data-state={state} data-filled={currentValue.length>0}>
    <label className="bh-text-area-label" htmlFor={controlId}>{label}</label>
    <div className="bh-text-area-body">
      <div className="bh-text-area-field" data-resize={resizable && state!=='disabled' ? 'vertical' : undefined}
        style={{blockSize:fieldHeight}}>
        <textarea id={controlId} name={name} className="bh-text-area-control" value={currentValue}
          placeholder={placeholder} disabled={state==='disabled'} maxLength={maxLength} required={required}
          aria-invalid={state==='error' || undefined} aria-describedby={descriptions || undefined}
          onChange={event=>{
            const next=event.currentTarget.value;
            if (value===undefined) setLocalValue(next);
            onValueChange?.(next);
          }}/>
        <div className="bh-text-area-footer">
          {counterId && <span className="bh-text-area-counter" id={counterId}>{count}</span>}
          <NotchesIcon className="bh-text-area-notches" weight="light" aria-hidden="true"/>
        </div>
      </div>
      {helperId && <p className="bh-text-area-helper" id={helperId}>{helperText}</p>}
    </div>
  </div>;
}
