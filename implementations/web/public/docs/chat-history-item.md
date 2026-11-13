# Chat History Item · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHAT-HISTORY-ITEM-001` · API local 0.1.0 · categoría conversación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/chat-history-item.contract.v1.0.0.md#guía-semántica-normativa).

Usa esta fila para identificar un elemento de historial. Mantén accesible el título completo y deja la selección, fijado y menú al anfitrión.

## Uso sin backend

Composición y acciones de muestra del panel lateral.

```tsx
'use client';

import { useState } from 'react';
import { ChatHistoryItem } from '@/index';

export function ChatHistoryItemExample() {
  const [selected, setSelected] = useState(false);
  return <div className="max-w-[232px]"><ChatHistoryItem title="Reembolsos de gastos de viaje"
    updated="1 sem" selected={selected} onSelect={() => setSelected(!selected)}/></div>;
}
```

Ejemplo compilado en [examples/chat-history-item.tsx](../../src/examples/chat-history-item.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [chat-sidebar.tsx](../../src/components/chat-sidebar.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface ChatHistoryItemProps {
  title: string;
  updated?: string;
  selected?: boolean;
  onSelect?: () => void;
  actions?: ReactNode;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
ChatHistoryItem: {title, updated, selected = false, onSelect, actions}: ChatHistoryItemProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Región de contenido reemplazable. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [chat-history-item.contract.v1.0.0.md](../../../../specs/components/chat-history-item.contract.v1.0.0.md) · SHA-256 `39ee33d51197eb8abcefd1fb61aa594be31e100e671c01bba19c219d57dff8da`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/chat-sidebar.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
