# Chat Rail Item · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHAT-RAIL-ITEM-001` · API local 0.1.0 · categoría conversación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/chat-rail-item.contract.v1.0.0.md#guía-semántica-normativa).

Usa Chat Rail Item para abrir una vista en el panel lateral de conversación o de un módulo asociado. Mantén Selected en la vista abierta, independiente del foco de teclado. Activa Show notification si el anfitrión tiene novedades que el usuario puede consultar en esa vista. Identifica cada vista por su nombre accesible y conserva el icono Phosphor asociado.

| Haz | Evita |
| --- | --- |
| Usa Chat Rail Item para pasar de Chats a Indicadores. | Usa un Icon Button genérico para indicar qué vista del Rail sigue activa. |
| Usa Dot medium para indicar que hay una conversación con novedades. | Interpretar Dot como cantidad o borrarlo al seleccionar por una regla implícita. |
| Usa Icon Button Ghost en acciones del Panel, como Buscar o Cerrar. | Usa Chat Rail Item para una acción inmediata que carece de vista propia. |

## Uso sin backend

Cambia la vista del panel lateral. Selección neutral, foco visible por teclado y Dot medium cuando la vista tiene novedades.

```tsx
'use client';

import { useState } from 'react';
import { ChatsIcon } from '@phosphor-icons/react/dist/csr/Chats';
import { LinkIcon } from '@phosphor-icons/react/dist/csr/Link';
import { SirenIcon } from '@phosphor-icons/react/dist/csr/Siren';
import { ChatRailItem } from '@/index';

export function ChatRailItemExample() {
  const [active, setActive] = useState('Vinculaciones');
  return <nav aria-label="Ejemplo de Chat Rail Item" className="flex items-center gap-4 px-2 py-3">
    <ChatRailItem label="Chats" icon={ChatsIcon}
      selected={active === 'Chats'} showNotification onActivate={() => setActive('Chats')}/>
    <ChatRailItem label="Vinculaciones" icon={LinkIcon}
      selected={active === 'Vinculaciones'} onActivate={() => setActive('Vinculaciones')}/>
    <ChatRailItem label="Indicadores" icon={SirenIcon} disabled onActivate={() => setActive('Indicadores')}/>
  </nav>;
}
```

Ejemplo compilado en [examples/chat-rail-item.tsx](../../src/examples/chat-rail-item.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [chat-rail-item.tsx](../../src/components/chat-rail-item.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface ChatRailItemProps {
  label: string;
  icon: Icon;
  selected?: boolean;
  disabled?: boolean;
  showNotification?: boolean;
  onActivate: () => void;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
ChatRailItem: {label, icon: Glyph, selected = false, disabled = false,
  showNotification = false, onActivate}: ChatRailItemProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **NOT_APPLICABLE**. Icono intercambiable y Dot fijo opcional. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [chat-rail-item.contract.v1.0.0.md](../../../../specs/components/chat-rail-item.contract.v1.0.0.md) · SHA-256 `60ff3acf2726e9a308f530a649fdd7ef56b303259c51d6d31c5fa4a93b177b4e`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/chat-rail-item.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
