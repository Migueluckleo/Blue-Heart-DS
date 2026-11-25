'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatIcon } from '@phosphor-icons/react/dist/csr/Chat';
import { DotsThreeIcon } from '@phosphor-icons/react/dist/csr/DotsThree';
import { FolderIcon } from '@phosphor-icons/react/dist/csr/Folder';
import { LinkIcon } from '@phosphor-icons/react/dist/csr/Link';
import { PushPinIcon } from '@phosphor-icons/react/dist/csr/PushPin';
import { TableIcon } from '@phosphor-icons/react/dist/csr/Table';
import { ChatSidebar, ChatHistoryItem, ChatSidebarSection, ChatToolItem, IconButton, type ChatSidebarProps } from '../index';

// example: chat-sidebar
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
