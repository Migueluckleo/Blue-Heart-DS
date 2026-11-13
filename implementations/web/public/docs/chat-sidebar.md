# Chat Sidebar · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHAT-SIDEBAR-001` · API local 0.1.0 · categoría conversación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/chat-sidebar.contract.v1.0.0.md#guía-semántica-normativa).

Usa el rail para cambiar de vista y el panel para mostrar acciones y listas de esa vista. Mantén visibles la selección y los nombres de acción.

## Uso sin backend

Composición y acciones de muestra del panel lateral.

```tsx
'use client';

import { useState } from 'react';
import { ChatIcon } from '@phosphor-icons/react/dist/csr/Chat';
import { DotsThreeIcon } from '@phosphor-icons/react/dist/csr/DotsThree';
import { FolderIcon } from '@phosphor-icons/react/dist/csr/Folder';
import { LinkIcon } from '@phosphor-icons/react/dist/csr/Link';
import { PushPinIcon } from '@phosphor-icons/react/dist/csr/PushPin';
import { TableIcon } from '@phosphor-icons/react/dist/csr/Table';
import { ChatSidebar, ChatHistoryItem, ChatSidebarSection, ChatToolItem, IconButton, type ChatSidebarProps } from '@/index';

export function ChatSidebarExample() {
  const [view, setView] = useState<Parameters<ChatSidebarProps['onViewChange']>[0]>('Chats');
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState(false);
  const [active, setActive] = useState('pinned');
  const [action, setAction] = useState('');
  const fixtures = {
    Chats: ['Personas físicas con IVA Retenido', 'Análisis de IVA', 'Reembolsos de gastos de viaje aprobados en abril', 'Nuevo chat', ChatIcon],
    Indicadores: ['EFOS 2026', 'IVA retenido superior a 10,000', 'Resico Persona Moral', 'Nuevo indicador', TableIcon],
    'Papeles de trabajo': ['RESICO Persona Física', 'Persona Física RESICO', 'Resico Persona Moral', 'Nuevo papel de trabajo', TableIcon],
    Vinculaciones: ['CONTPAQi Contabilidad Nube', '', '', 'Vinculaciones externas', LinkIcon],
  } as const;
  const [pinned, folderLabel, recent, shortcut, icon] = fixtures[view];
  function item(id: string, title: string) {
    return <ChatHistoryItem title={title} selected={active === id} updated="1 sem" onSelect={() => setActive(id)} actions={<>
      <IconButton label={`Fijar ${title}`} icon={PushPinIcon} variant="ghost" size="small" onClick={() => setAction('Fijar')}/>
      <IconButton label={`Más acciones de ${title}`} icon={DotsThreeIcon} variant="ghost" size="small" onClick={() => setAction('Más acciones')}/>
    </>}/>;
  }
  return <div className="grid gap-4">
    <div className="flex h-[791px] items-stretch">
      <ChatSidebar view={open ? view : 'none'} mode="rail" plan={{plan: 'Pro Plan', used: 42, limit: 150}}
        onViewChange={next => {setView(next); setOpen(true); setFolder(false); setActive('pinned');}}/>
      {open && <ChatSidebar view={view} onViewChange={setView} onSearch={() => setAction('Buscar')} onCollapse={() => setOpen(false)}
        shortcuts={<>
          {view === 'Vinculaciones' && <ChatToolItem label="Vinculaciones CONTPAQi"
            leading={<img src="/assets/chat-sidebar-connection.svg" alt="" width={24} height={24}/>} onActivate={() => setAction('Vinculaciones CONTPAQi')}/>}
          <ChatToolItem label={shortcut} icon={icon} onActivate={() => setAction(shortcut)}/>
        </>}>
        {view === 'Vinculaciones' ? <ChatSidebarSection title="Vinculaciones realizadas">
          <div className="bh-chat-sidebar-connection"><img src="/assets/chat-sidebar-logo.svg" alt="" width={23} height={24}/>{pinned}</div>
        </ChatSidebarSection> : <>
          <ChatSidebarSection title="Fijados">{item('pinned', pinned)}{view === 'Chats' && item('pinned-recent', recent)}</ChatSidebarSection>
          <ChatSidebarSection title="Carpetas">
            <ChatToolItem label={folderLabel} icon={FolderIcon} expanded={folder} onActivate={() => setFolder(!folder)}/>
            {folder && item('folder', recent)}
          </ChatSidebarSection>
          <ChatSidebarSection title="Recientes">{item('recent', recent)}</ChatSidebarSection>
        </>}
      </ChatSidebar>}
    </div>
    <output aria-label="Resultado de Chat Sidebar">{action}</output>
  </div>;
}
```

Ejemplo compilado en [examples/chat-sidebar.tsx](../../src/examples/chat-sidebar.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [chat-sidebar.tsx](../../src/components/chat-sidebar.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export interface ChatPlanUsageProps {
  plan: string;
  used: number;
  limit: number;
  mode?: 'expanded' | 'compact';
}

export type ChatSidebarProps = ({ mode?: 'panel'; view: View } | { mode: 'rail'; view: View | 'none' }) & {
  children?: ReactNode;
  shortcuts?: ReactNode;
  plan?: Omit<ChatPlanUsageProps, 'mode'>;
  onViewChange: (view: View) => void;
  onSearch?: () => void;
  onCollapse?: () => void;
};
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
ChatSidebar: {view, mode = 'panel', children, shortcuts, plan, onViewChange, onSearch, onCollapse}: ChatSidebarProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Región de contenido reemplazable. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [chat-sidebar.contract.v1.0.0.md](../../../../specs/components/chat-sidebar.contract.v1.0.0.md) · SHA-256 `0123dc6d1622783256a4f2cc569e60b22f365f48122099d46961d53ca9cb7fbc`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/chat-sidebar.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
