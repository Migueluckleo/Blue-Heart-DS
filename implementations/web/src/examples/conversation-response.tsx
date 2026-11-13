'use client';

import { ThumbsDownIcon } from '@phosphor-icons/react/dist/csr/ThumbsDown';
import { ThumbsUpIcon } from '@phosphor-icons/react/dist/csr/ThumbsUp';
import { useState } from 'react';
import { Button, ConversationResponse, ConversationResponseCopyIcon, ConversationResponsePreview, IconButton } from '../index';

// example: conversation-response
export function ConversationResponseExample() {
  const [agent, setAgent] = useState<'BENI' | 'NAVI'>('BENI');
  const [showPreviews, setShowPreviews] = useState(true);
  const [showSecondaryContent, setShowSecondaryContent] = useState(true);
  const [showAdditionalActions, setShowAdditionalActions] = useState(true);
  const [feedback, setFeedback] = useState('');
  return <div className="grid gap-4">
    <div className="flex flex-wrap gap-4">
      <label className="flex items-center gap-2">
        Agente de respuesta
        <select value={agent} onChange={event => setAgent(event.target.value === 'NAVI' ? 'NAVI' : 'BENI')}>
          <option>BENI</option><option>NAVI</option>
        </select>
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={showPreviews} onChange={event => setShowPreviews(event.target.checked)}/>
        Mostrar previews
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={showSecondaryContent} onChange={event => setShowSecondaryContent(event.target.checked)}/>
        Mostrar contenido secundario
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={showAdditionalActions} onChange={event => setShowAdditionalActions(event.target.checked)}/>
        Mostrar acciones adicionales
      </label>
    </div>
    <ConversationResponse agent={agent} showPreviews={showPreviews} showSecondaryContent={showSecondaryContent}
      showAdditionalActions={showAdditionalActions}
      body={<p>Aquí es donde va la respuesta de {agent === 'BENI' ? 'Beni' : 'NAVI'}</p>}
      previews={<ConversationResponsePreview title="Distribución de facturas de personas físicas con IVA retenido en marzo 2025"/>}
      secondaryContent={<p>Esta solicitud puede convertirse en un indicador. ¿Deseas que lo creemos?</p>}
      additionalActions={<>
        <Button variant="primary" size="small" label="Crear indicador" onClick={() => setFeedback('Crear indicador')}/>
        <Button variant="secondary" size="small" label="Agregar a dashboard" onClick={() => setFeedback('Agregar a dashboard')}/>
      </>}
      feedbackActions={<>
        <IconButton variant="ghost" size="small" label="Me gusta" icon={ThumbsUpIcon} onClick={() => setFeedback('Me gusta')}/>
        <IconButton variant="ghost" size="small" label="No me gusta" icon={ThumbsDownIcon} onClick={() => setFeedback('No me gusta')}/>
        <IconButton variant="ghost" size="small" label="Copiar respuesta" icon={ConversationResponseCopyIcon}
          onClick={() => setFeedback('Copiar respuesta')}/>
      </>}/>
    <output aria-label="Resultado de la acción de respuesta">{feedback}</output>
  </div>;
}
