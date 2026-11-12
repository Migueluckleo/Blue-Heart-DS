'use client';

import { CloudArrowUpIcon } from '@phosphor-icons/react/dist/csr/CloudArrowUp';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { XCircleIcon } from '@phosphor-icons/react/dist/csr/XCircle';
import { useId, useRef, useState, type DragEvent } from 'react';
import { Button } from './button';
import { LinearProgress } from './linear-progress';

export type FileUploadState = 'default' | 'hover' | 'focus' | 'error' | 'success' | 'disabled';

export interface FileUploadProps {
  id?: string;
  label?: string;
  state?: FileUploadState;
  formats?: string;
  supportingText?: string;
  showButton?: boolean;
  showHelper?: boolean;
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
}

export function FileUpload({id, label = 'Seleccionar archivos', state = 'default',
  formats = 'Supported formats: XLS, XLSX or CSV · Max 50 MB', supportingText = 'Optional helper text',
  showButton = false, showHelper = true, accept, multiple = false, onFiles}: FileUploadProps) {
  const uid = useId();
  const control = id ?? uid;
  const picker = useRef<HTMLInputElement>(null);
  const depth = useRef(0);
  const [dragging, setDragging] = useState(false);
  const disabled = state === 'disabled';
  const error = state === 'error';
  const success = state === 'success';
  const visual = dragging && state === 'default' ? 'hover' : state;
  const Glyph = error ? XCircleIcon : success ? CheckCircleIcon : CloudArrowUpIcon;
  const buttonLabel = error ? 'Subir nuevamente' : success ? 'Subir otro archivo' : 'Subir archivo';
  const message = error ? 'Upload failed' : success ? 'File uploaded successfully' : undefined;
  const descriptions = [`${control}-formats`, message && `${control}-message`, showHelper && supportingText && `${control}-helper`]
    .filter(Boolean).join(' ');
  const notify = (files: FileList | null) => {
    if (disabled || !files?.length) return;
    const chosen = Array.from(files);
    onFiles?.(multiple ? chosen : chosen.slice(0, 1));
  };
  const fileDrag = (event: DragEvent) => event.dataTransfer.types.includes('Files');

  return <div className="bh-file-upload" data-blueheart="file-upload" data-state={visual}>
    <div className="bh-file-upload-content" onDragEnter={event => {
      if (!fileDrag(event)) return;
      event.preventDefault();
      if (!disabled) {
        depth.current++;
        setDragging(true);
      }
    }} onDragOver={event => {
      if (!fileDrag(event)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = disabled ? 'none' : 'copy';
    }} onDragLeave={() => {
      depth.current = Math.max(0, depth.current - 1);
      if (!depth.current) setDragging(false);
    }} onDrop={event => {
      if (!fileDrag(event)) return;
      event.preventDefault();
      depth.current = 0;
      setDragging(false);
      notify(event.dataTransfer.files);
    }}>
      <input className="sr-only" id={control} ref={picker} type="file" disabled={disabled} multiple={multiple}
        accept={accept} aria-label={label} aria-invalid={error || undefined} aria-describedby={descriptions}
        onChange={event => {
          notify(event.currentTarget.files);
          event.currentTarget.value = '';
        }}/>
      {!disabled && <label className="bh-file-upload-target" htmlFor={control}><span className="sr-only">{label}</span></label>}
      <Glyph className="bh-file-upload-icon" weight={message ? 'fill' : 'light'} aria-hidden="true"/>
      <div className="bh-file-upload-text">
        {message ? <p id={`${control}-message`} className="bh-file-upload-message" role={error ? 'alert' : 'status'}>{message}</p>
          : <p className="bh-file-upload-instruction">Arrastra tus archivos aquí<br/> o <strong>selecciónalos desde tu equipo</strong></p>}
        <p className="bh-file-upload-formats" id={`${control}-formats`}>{formats}</p>
      </div>
      {success && <LinearProgress label={message ?? label} type="success" size="large" value={100} showHeader={false}/>}
      {showButton && <Button className="bh-file-upload-action" variant="secondary" size="small" label={buttonLabel}
        disabled={disabled} onClick={() => picker.current?.click()}/>}
    </div>
    {showHelper && supportingText && <p className="bh-file-upload-helper" id={`${control}-helper`}>{supportingText}</p>}
  </div>;
}
