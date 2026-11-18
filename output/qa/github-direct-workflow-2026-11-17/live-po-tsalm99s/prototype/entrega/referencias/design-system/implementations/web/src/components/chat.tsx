'use client';

import type { ComponentProps, ReactNode } from 'react';
import { Characters } from './characters';
import { Chip } from './chip';
import { ConversationComposer } from './conversation-composer';

export type ChatProps = {
  composer: ComponentProps<typeof ConversationComposer>;
  className?: string;
} & (
  | { state?: 'standby'; userName: string; suggestions?: readonly string[]; onSuggestion?: (message: string) => void }
  | { state: 'started'; messages: ReactNode; status?: string }
);

export function Chat(props: ChatProps) {
  const {composer, className} = props;
  const started = props.state === 'started';
  return <div data-blueheart="chat" data-state={started ? 'started' : 'standby'}
    className={['bh-chat flex min-w-0 flex-col items-center', className].filter(Boolean).join(' ')}>
    {started ? <div className="bh-chat-history flex w-full min-w-0 flex-1 flex-col justify-end">
      <div className="bh-chat-messages flex min-w-0 flex-col" data-slot="messages">{props.messages}</div>
      {props.status && <p className="bh-chat-status m-0" role="status">{props.status}</p>}
    </div> : <div className="bh-chat-welcome flex w-full min-w-0 flex-col items-center">
      <Characters character="beni" playing className="max-w-full h-auto"/>
      <div className="bh-chat-greeting flex w-full min-w-0 flex-col items-center">
        <p className="bh-chat-title m-0">Hola, <strong>{props.userName}</strong></p>
        <p className="bh-chat-subtitle m-0">¿En qué necesitas que te ayude?</p>
      </div>
    </div>}
    <ConversationComposer {...composer} className={[composer.className, 'bh-chat-composer'].filter(Boolean).join(' ')}/>
    {!started && Boolean(props.suggestions?.length) && <div className="bh-chat-suggestions flex w-full flex-wrap justify-center">
      {props.suggestions?.map((label, index) => <Chip key={index} mode="multiple" size="medium"
        label={label} selected={composer.value === label} disabled={!props.onSuggestion}
        onSelectedChange={selected => props.onSuggestion?.(selected ? label : '')}/>)}
    </div>}
  </div>;
}
