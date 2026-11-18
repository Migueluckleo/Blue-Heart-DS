'use client';

import { MicrophoneIcon } from '@phosphor-icons/react/dist/csr/Microphone';
import { PaperclipIcon } from '@phosphor-icons/react/dist/csr/Paperclip';
import { PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/csr/PaperPlaneTilt';
import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus';
import { useId, type ReactNode } from 'react';
import { IconButton } from './icon-button';

export interface ConversationComposerProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  onSend?: (draft: string) => void;
  onExtraActions?: () => void;
  onAttach?: () => void;
  onMicrophone?: () => void;
  placeholder?: string;
  disclaimer?: string;
  showDisclaimer?: boolean;
  showMessage?: boolean;
  showExtraActions?: boolean;
  message?: ReactNode;
  /** Pass null for an empty Tools slot. Undefined shows the default controls. */
  tools?: ReactNode;
  className?: string;
}

export function ConversationComposer({
  label, value, onValueChange, onSend, onExtraActions, onAttach, onMicrophone,
  placeholder = 'Escribe aquí tu requerimiento o necesidad',
  disclaimer = 'Te recomendamos revisar la información importante para asegurar un resultado óptimo',
  showDisclaimer = true, showMessage = false, showExtraActions = true,
  message, tools, className,
}: ConversationComposerProps) {
  const id = useId();
  const disclaimerId = showDisclaimer && disclaimer ? `${id}-disclaimer` : undefined;
  return <div data-blueheart="conversation-composer" className={['bh-conversation-composer flex min-w-0 flex-col', className].filter(Boolean).join(' ')}>
    {disclaimerId && <p id={disclaimerId} className="bh-conversation-disclaimer">{disclaimer}</p>}
    <div className="min-w-0">
      {showMessage && <div className="bh-conversation-message flex flex-wrap items-center">{message}</div>}
      <div className="bh-conversation-field flex min-w-0 flex-col">
        <label htmlFor={id} className="sr-only">{label}</label>
        <textarea id={id} rows={1} className="bh-conversation-draft w-full"
          aria-describedby={disclaimerId} placeholder={placeholder} value={value}
          onChange={event => onValueChange(event.currentTarget.value)}/>
        <div className="bh-conversation-divider" aria-hidden="true"/>
        <div className="bh-conversation-actions flex min-w-0 items-start">
          {showExtraActions && <IconButton label="Más acciones" variant="ghost" size="small"
            className="shrink-0" icon={PlusIcon} onClick={onExtraActions} disabled={!onExtraActions}/>}
          <div className="bh-conversation-actions flex min-w-0 flex-1 items-start justify-end">
            <div className="bh-conversation-tools flex min-w-0 flex-wrap justify-end">
              {tools === undefined ? <>
                <IconButton label="Adjuntar archivo" variant="ghost" size="small"
                  className="shrink-0" icon={PaperclipIcon} onClick={onAttach} disabled={!onAttach}/>
                <IconButton label="Micrófono" variant="ghost" size="small"
                  className="shrink-0" icon={MicrophoneIcon} onClick={onMicrophone} disabled={!onMicrophone}/>
              </> : tools}
            </div>
            <IconButton label="Enviar mensaje" variant="primary" size="small" className="shrink-0"
              icon={PaperPlaneTiltIcon} disabled={!onSend} onClick={() => onSend?.(value)}/>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
