# Chat · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHAT-001` · API local 0.1.0 · categoría conversación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/chat.contract.v1.0.0.md#guía-semántica-normativa).

Usa Standby para ofrecer un comienzo y Started para mostrar los mensajes de la conversación. Usa Composer para la entrada y el Slot Messages para mensajes en orden cronológico. [Conversation Composer](conversation-composer.contract.v1.0.0.md) · [Conversation Response](conversation-response.contract.v1.0.0.md) · [User message](user-message.contract.v1.0.0.md)

| Situación | Haz | Evita |
|---|---|---|
| Bienvenida | Ofrece sugerencias concretas como punto de partida. | Presentar sugerencias como mensajes ya enviados. |
| Conversación iniciada | Conserva identidad y orden de los mensajes. | Usar el estado de espera como si fuera una respuesta. |
| Integración | Define el comportamiento de las acciones en el producto. | Usar el comportamiento de muestra como regla de negocio. |

## Uso sin backend

Recorre la bienvenida, elige una sugerencia y envía un texto al historial local.

```tsx
'use client';

import { useState } from 'react';
import { ThumbsDownIcon } from '@phosphor-icons/react/dist/csr/ThumbsDown';
import { ThumbsUpIcon } from '@phosphor-icons/react/dist/csr/ThumbsUp';
import { Button, Chat, ConversationResponse, ConversationResponseCopyIcon, ConversationResponsePreview, IconButton, UserMessage } from '@/index';

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
```

Ejemplo compilado en [examples/chat.tsx](../../src/examples/chat.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [chat.tsx](../../src/components/chat.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type ChatProps = {
  composer: ComponentProps<typeof ConversationComposer>;
  className?: string;
} & (
  | { state?: 'standby'; userName: string; suggestions?: readonly string[]; onSuggestion?: (message: string) => void }
  | { state: 'started'; messages: ReactNode; status?: string }
);
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
Chat: props: ChatProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Messages admite composición de historial en Started. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [chat.contract.v1.0.0.md](../../../../specs/components/chat.contract.v1.0.0.md) · SHA-256 `8a99302d67324a53be6efff6ce9b33e48ee751876796ac71bce7ca3278bce089`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/chat.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
