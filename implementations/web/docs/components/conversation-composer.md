# Conversation Composer · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CONVERSATION-001` · API local 0.1.0 · categoría conversación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/conversation-composer.contract.v1.0.0.md#guía-semántica-normativa).

Usa Conversation Composer en la zona de redacción de una conversación. Usa Text Area para un campo multilínea autónomo en un formulario e Inline Notification para avisos que gobiernan una sección completa. Mantén la jerarquía de acciones secundaria/primaria visible y utiliza los Slots únicamente para contenido pertinente al borrador. [Contrato Text Area](text-area.contract.v1.0.0.md) · [Contrato Inline Notification](inline-notification.contract.v1.0.0.md)

| Situación | Haz | Evita |
|---|---|---|
| Contexto de redacción | Pon un aviso breve en `message` si afecta a la conversación actual. | Usar el mensaje de cuota de la muestra como regla del producto. |
| Herramientas | Coloca las acciones secundarias en `Tools` y nómbralas por su efecto. | Duplicar la acción principal o añadir botones de relleno. |
| Etiqueta y ayuda | Conserva una etiqueta asociada y deja la instrucción imprescindible a la vista. | Usar solo el placeholder o el pictograma para explicar una acción. |
| Envío | Entrega el borrador al callback del anfitrión y deja allí el resultado y la validación. | Iniciar un envío al escribir o borrar el borrador al activar una herramienta. |

## Uso sin backend

Redacta varias líneas, muestra un aviso contextual y activa las herramientas. El resultado de cada acción es local a la muestra.

```tsx
'use client';

import { useState } from 'react';
import { Button, ConversationComposer } from '@/index';

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
```

Ejemplo compilado en [examples/conversation-composer.tsx](../../src/examples/conversation-composer.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [conversation-composer.tsx](../../src/components/conversation-composer.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
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
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
ConversationComposer: {
  label, value, onValueChange, onSend, onExtraActions, onAttach, onMicrophone,
  placeholder = 'Escribe aquí tu requerimiento o necesidad',
  disclaimer = 'Te recomendamos revisar la información importante para asegurar un resultado óptimo',
  showDisclaimer = true, showMessage = false, showExtraActions = true,
  message, tools, className,
}: ConversationComposerProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. message y Tools admiten edición de composición en una instancia vinculada. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [conversation-composer.contract.v1.0.0.md](../../../../specs/components/conversation-composer.contract.v1.0.0.md) · SHA-256 `a08cfeb05a34628a166b45bf9d95a314d19e77bab38ee5b1911c001b69fc845e`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/conversation-composer.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
