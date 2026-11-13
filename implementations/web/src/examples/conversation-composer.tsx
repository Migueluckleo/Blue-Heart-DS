'use client';

import { useState } from 'react';
import { Button, ConversationComposer } from '../index';

// example: conversation-composer
export function ConversationComposerExample() {
  const [draft, setDraft] = useState('');
  const [result, setResult] = useState('');
  const [context, setContext] = useState(false);
  const [tools, setTools] = useState(true);
  return <div className="grid gap-4">
    <div className="flex flex-wrap gap-4">
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={context} onChange={event => setContext(event.target.checked)}/>
        Mostrar mensaje contextual
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={tools} onChange={event => setTools(event.target.checked)}/>
        Mostrar herramientas
      </label>
    </div>
    <ConversationComposer label="Mensaje de la conversación" value={draft} onValueChange={setDraft}
      showMessage={context} tools={tools ? undefined : null}
      message={<>
        <p className="bh-conversation-context min-w-0 flex-1">
          <strong>Alcanzaste tu límite mensual de créditos. </strong>Se renuevan el 1 de noviembre.
        </p>
        <Button variant="secondary" size="small" label="Default" onClick={() => setResult('Acción del aviso')}/>
      </>}
      onSend={value => setResult(value ? `Borrador recibido: ${value}` : 'Borrador vacío')}
      onExtraActions={() => setResult('Más acciones')}
      onAttach={() => setResult('Adjuntar archivo')}
      onMicrophone={() => setResult('Micrófono')}/>
    <output aria-label="Resultado de muestra" className="whitespace-pre-wrap break-words">{result}</output>
  </div>;
}
