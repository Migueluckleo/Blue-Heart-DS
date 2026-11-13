# Conversation Response · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CONVERSATION-RESPONSE-001` · API local 0.1.0 · categoría conversación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/conversation-response.contract.v1.0.0.md#guía-semántica-normativa).

Usa Conversation Response para la respuesta de un agente en el historial. Usa Conversation Composer para el campo de redacción y los controles de quien pregunta. Para un resultado que puede leerse junto a la respuesta, usa Previews. Usa las acciones de resultado para efectos sobre el contenido y reserva la fila de feedback para valorar o copiar. [Conversation Composer](conversation-composer.contract.v1.0.0.md)

| Situación | Haz | Evita |
|---|---|---|
| Respuesta directa | Pon el contenido principal en Body. | Enterrar la respuesta bajo tarjetas o acciones. |
| Resultado tabular | Usa un título específico en Previews. | Dar a la tarjeta un gesto de navegación sin definir su destino. |
| Acciones | Distingue la acción principal del resultado y nombra los iconos. | Usar el pictograma como único nombre accesible. |
| Valoración | Confirma el resultado de la acción con el mecanismo de estado adecuado. | Mover el foco a un aviso rutinario. |

## Uso sin backend

Alterna BENI y NAVI, muestra u oculta regiones y acciona los controles de resultado y valoración.

```tsx
'use client';

import { ThumbsDownIcon } from '@phosphor-icons/react/dist/csr/ThumbsDown';
import { ThumbsUpIcon } from '@phosphor-icons/react/dist/csr/ThumbsUp';
import { useState } from 'react';
import { Button, ConversationResponse, ConversationResponseCopyIcon, ConversationResponsePreview, IconButton } from '@/index';

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
```

Ejemplo compilado en [examples/conversation-response.tsx](../../src/examples/conversation-response.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [conversation-response.tsx](../../src/components/conversation-response.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface ConversationResponseProps {
  agent?: keyof typeof category;
  animateAgent?: boolean;
  body: ReactNode;
  previews?: ReactNode;
  secondaryContent?: ReactNode;
  additionalActions?: ReactNode;
  feedbackActions?: ReactNode;
  showPreviews?: boolean;
  showSecondaryContent?: boolean;
  showAdditionalActions?: boolean;
  className?: string;
}

export interface ConversationResponsePreviewProps {
  title: string;
}

export type ConversationResponseCopyIconProps = IconProps;
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
ConversationResponse: {
  agent = 'BENI', animateAgent = false, body, previews, secondaryContent, additionalActions, feedbackActions,
  showPreviews = true, showSecondaryContent = true, showAdditionalActions = true, className,
}: ConversationResponseProps
ConversationResponsePreview: {title}: ConversationResponsePreviewProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Cinco Slots nativos editables desde una instancia vinculada. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [conversation-response.contract.v1.0.0.md](../../../../specs/components/conversation-response.contract.v1.0.0.md) · SHA-256 `2dc6dddaf2e1682a4a43be2684b832a9f2ff39bf98be6ba7405299be1e9442a0`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/conversation-response.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
