# Chat Sidebar · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `CHAT-SIDEBAR-001` · API local 0.1.0 · categoría conversación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/chat-sidebar.contract.v1.0.0.md#guía-semántica-normativa).

Usa V1 para abrir o cerrar el historial de chats con un único control a la derecha. Usa V2, predeterminada, si el Rail cambia entre módulos y muestra selección y novedades por vista. Compón Content con el disparador o los ítems de navegación en Rail y con las secciones en Panel. El plan se mantiene fuera de Content.

## Uso sin backend

V2 predeterminada mantiene los cuatro módulos, el foco de marca y el Dot medium. version='v1' y view='Chats' muestran el historial con acceso único. onViewChange abre y onCollapse cierra; el anfitrión controla mode, búsqueda y datos. En V1, shortcuts precede a children en Content y plan se muestra al pie en modo panel. La notificación de fila de Chat History Item sigue disponible en Figma.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatIcon } from '@phosphor-icons/react/dist/csr/Chat';
import { DotsThreeIcon } from '@phosphor-icons/react/dist/csr/DotsThree';
import { FolderIcon } from '@phosphor-icons/react/dist/csr/Folder';
import { LinkIcon } from '@phosphor-icons/react/dist/csr/Link';
import { PushPinIcon } from '@phosphor-icons/react/dist/csr/PushPin';
import { TableIcon } from '@phosphor-icons/react/dist/csr/Table';
import { ChatSidebar, ChatHistoryItem, ChatSidebarSection, ChatToolItem, IconButton, type ChatSidebarProps } from '@/index';

export function ChatSidebarExample() {
  return <div className="grid gap-8">
    <section aria-label="Chat Sidebar V2"><ChatSidebarV2Example/></section>
    <section aria-label="Chat Sidebar V1"><ChatSidebarV1Example/></section>
  </div>;
}

function ChatSidebarV2Example() {
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
        railItems={{Chats: {showNotification: true}}}
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


function ChatSidebarV1Example() {
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState<string>();
  const [selected, setSelected] = useState(false);
  const [action, setAction] = useState('');
  const preview = useRef<HTMLDivElement>(null);
  const moveFocus = useRef(false);

  useEffect(() => {
    if (moveFocus.current) preview.current?.querySelector<HTMLButtonElement>('.bh-chat-sidebar-disclosure')?.focus();
    moveFocus.current = false;
  }, [open]);

  function showPanel(expanded: boolean) {
    moveFocus.current = true;
    setOpen(expanded);
  }

  return <div className="grid gap-4">
    <div ref={preview} className="flex h-[775px] items-stretch">
      <ChatSidebar version="v1" mode={open ? 'panel' : 'rail'} view="Chats"
        onViewChange={() => showPanel(true)} onCollapse={() => showPanel(false)}
        onSearch={() => setAction('Buscar chats')} plan={{plan: 'Pro Plan', used: 41, limit: 150}}
        shortcuts={<ChatToolItem label="Nuevo chat" onActivate={() => setAction('Nuevo chat')}/>}>
        {open ? <div className="bh-chat-sidebar-history-groups">
          <ChatSidebarSection title="Carpetas">
            {['Indicadores', 'Papeles de trabajo 2026'].map(label => <ChatToolItem
              key={label} icon={FolderIcon} label={label} expanded={folder === label}
              onActivate={() => {setFolder(folder === label ? undefined : label); setAction(label);}}/>)}
          </ChatSidebarSection>
          <ChatSidebarSection title="Chats">
            <ChatHistoryItem title="Reporte de Ingresos 2026" updated="1 sem"
              selected={selected} onSelect={() => setSelected(true)}/>
          </ChatSidebarSection>
        </div> : undefined}
      </ChatSidebar>
    </div>
    <output aria-label="Resultado del historial de chats">{action}</output>
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

export type ChatSidebarV2Props = ({ mode?: 'panel'; view: View } | {
  mode: 'rail';
  view: View | 'none';
  railItems?: Partial<Record<View, Pick<ChatRailItemProps, 'disabled' | 'showNotification'>>>;
}) & {version?: 'v2'};

export type ChatSidebarV1Props = {version: 'v1'; mode?: 'rail' | 'panel'; view: 'Chats'; title?: string};

export type ChatSidebarProps = (ChatSidebarV1Props | ChatSidebarV2Props) & {
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
ChatSidebar: props: ChatSidebarProps
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Content nativo compartido por ambos modos y versiones. children sustituye el acceso o la navegación en Rail y compone las secciones en Panel. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [chat-sidebar.contract.v1.0.0.md](../../../../specs/components/chat-sidebar.contract.v1.0.0.md) · SHA-256 `04b36d5084784ff73b59a3ff202c936fa6326844796b2caba32cd1f807da0150`.
- [chat-sidebar.rail-item.amendment.v1.0.0.md](../../../../specs/components/chat-sidebar.rail-item.amendment.v1.0.0.md) · SHA-256 `fb639d9127733ebbcf686bb744f5d1a2d3b6235cac8e4f6d71192e191fc3e00f`.
- [chat-sidebar.v1-rail-panel.amendment.v1.0.0.md](../../../../specs/components/chat-sidebar.v1-rail-panel.amendment.v1.0.0.md) · SHA-256 `9fe8dd44e7e79ed581adbbd4e5e58a6acfa57b13fabbf0b5d5e792788508b839`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/chat-sidebar.v1-rail-panel.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
