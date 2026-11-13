'use client';

import { useState } from 'react';
import { ThumbsDownIcon } from '@phosphor-icons/react/dist/csr/ThumbsDown';
import { ThumbsUpIcon } from '@phosphor-icons/react/dist/csr/ThumbsUp';
import { Button, Chat, ConversationResponse, ConversationResponseCopyIcon, ConversationResponsePreview, IconButton, UserMessage } from '../index';

// example: chat
export function ChatExample() {
  const sample = 'Muéstrame facturas de personas físicas con IVA retenido en marzo 2025';
  const [started, setStarted] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([sample]);
  const [status, setStatus] = useState('Leyendo la información...');
  const composer = {
    label: 'Redactar mensaje en Chat', value: draft, onValueChange: setDraft,
    onSend: (value: string) => {
      if (!value.trim()) return;
      setMessages(current => started ? [...current, value] : [value]);
      setStarted(true);
      setDraft('');
      setStatus('Mensaje recibido en la muestra');
    },
    onExtraActions: () => setStatus('Más acciones'),
    onAttach: () => setStatus('Adjuntar archivo'),
    onMicrophone: () => setStatus('Micrófono'),
  };
  return <div className="mx-auto grid max-w-[750px] gap-4">
    <label className="flex items-center gap-2">
      Estado de Chat
      <select value={started ? 'started' : 'standby'} onChange={event => setStarted(event.target.value === 'started')}>
        <option value="standby">Standby</option>
        <option value="started">Started</option>
      </select>
    </label>
    {started ? <Chat state="started" status={status} composer={composer} messages={<>
      {messages.map((message, index) => <UserMessage key={index} message={message}/>)}
      <ConversationResponse className="bh-chat-response" body={<p>Aquí es donde va la respuesta de Beni</p>}
        previews={<ConversationResponsePreview title="Distribución de facturas de personas físicas con IVA retenido en marzo 2025"/>}
        secondaryContent={<p>Esta solicitud puede convertirse en un indicador. ¿Deseas que lo creemos?</p>}
        additionalActions={<>
          <Button variant="primary" size="small" label="Crear indicador" onClick={() => setStatus('Crear indicador')}/>
          <Button variant="secondary" size="small" label="Agregar a dashboard" onClick={() => setStatus('Agregar a dashboard')}/>
        </>}
        feedbackActions={<>
          <IconButton variant="ghost" size="small" label="Me gusta" icon={ThumbsUpIcon} onClick={() => setStatus('Me gusta')}/>
          <IconButton variant="ghost" size="small" label="No me gusta" icon={ThumbsDownIcon} onClick={() => setStatus('No me gusta')}/>
          <IconButton variant="ghost" size="small" label="Copiar respuesta" icon={ConversationResponseCopyIcon}
            onClick={() => setStatus('Copiar respuesta')}/>
        </>}/>
    </>}/> : <Chat userName="Bruce Wayne" composer={composer} onSuggestion={setDraft} suggestions={[
      'Muéstrame mis ingresos del mes', '¿Cuánto IVA tengo por pagar?', 'Revisa que facturas están pendientes de pago',
    ]}/>}
  </div>;
}
