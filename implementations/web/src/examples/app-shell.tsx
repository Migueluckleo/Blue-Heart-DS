'use client';

import { useRef, useState } from 'react';
import { ThumbsUpIcon } from '@phosphor-icons/react/dist/csr/ThumbsUp';
import { ThumbsDownIcon } from '@phosphor-icons/react/dist/csr/ThumbsDown';
import { AppShell, AppShellGridItem, Button, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem,
  ConversationResponse, ConversationResponseCopyIcon, ConversationResponsePreview, IconButton, Input,
  MenuItem, UserMessage, type AppShellBodyLayout, type ChatSidebarProps, ChatDocumentViewer } from '../index';
import { DeliveredDocumentPreview, deliveredDocumentTitle, deliveredDocumentDescription } from './chat-document-viewer';

// example: app-shell
export function AppShellExample({initialBodyLayout = 'grid'}: {initialBodyLayout?: AppShellBodyLayout} = {}) {
  const [collapsed, setCollapsed] = useState(true);
  const [bodyLayout, setBodyLayout] = useState<AppShellBodyLayout>(initialBodyLayout);
  const [documentOpen, setDocumentOpen] = useState(initialBodyLayout === 'conversation-preview');
  const [documentExpanded, setDocumentExpanded] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(initialBodyLayout === 'conversation-preview');
  const [documentConversation, setDocumentConversation] = useState(initialBodyLayout === 'conversation-preview');
  const [action, setAction] = useState('');
  const [tool, setTool] = useState<ChatSidebarProps['view']>('none');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const reopen = useRef<HTMLButtonElement>(null);
  const inConversation = bodyLayout === 'conversation' || bodyLayout === 'conversation-preview';
  const sample = 'Muéstrame facturas de personas físicas con IVA retenido en marzo 2025';
  const composer = {label:'Redactar en conversación de App Shell',value:draft,onValueChange:setDraft,
    onSend:(text: string) => {if (text.trim()) {setMessages(current => [...current,text]); setDraft('');setConversationStarted(true);}}};
  const rightSidebar = <>
    {tool !== 'none' && <ChatSidebar view={tool} onViewChange={setTool} onCollapse={() => setTool('none')}>
      {tool === 'Chats' && <ChatSidebarSection title="Recientes">
        <ChatHistoryItem title={sample} selected onSelect={() => setAction(sample)}/>
      </ChatSidebarSection>}
    </ChatSidebar>}
    <ChatSidebar mode="rail" view={tool} onViewChange={setTool} plan={{plan:'Pro Plan',used:42,limit:150}}/>
  </>;
  function openDocument() {setDocumentOpen(true);setDocumentExpanded(false);setBodyLayout('conversation-preview');setConversationStarted(true);setDocumentConversation(true);}
  const response = <ConversationResponse body={<p>Aquí es donde va la respuesta de Beni</p>}
    previews={<ConversationResponsePreview title={deliveredDocumentTitle}/>}
    secondaryContent={<p>Esta solicitud puede convertirse en un indicador. ¿Deseas que lo creemos?</p>}
    additionalActions={<>
      <Button variant="primary" size="small" label="Crear indicador" onClick={() => setAction('Solicitud local: crear indicador')}/>
      <Button variant="secondary" size="small" label="Agregar a dashboard" onClick={() => setAction('Solicitud local: agregar a dashboard')}/>
    </>}
    feedbackActions={<>
      <IconButton variant="ghost" size="small" label="Me gusta" icon={ThumbsUpIcon} onClick={() => setAction('Me gusta')}/>
      <IconButton variant="ghost" size="small" label="No me gusta" icon={ThumbsDownIcon} onClick={() => setAction('No me gusta')}/>
      <IconButton variant="ghost" size="small" label="Copiar respuesta" icon={ConversationResponseCopyIcon} onClick={() => setAction('Solicitud local: copiar respuesta')}/>
    </>}/>;
  return <div className="my-4 space-y-4">
    <div className="flex flex-wrap items-center gap-4">
      <label className="inline-flex items-center gap-2">Distribución del contenido
        <select value={bodyLayout} onChange={event => {
          const value = event.currentTarget.value as AppShellBodyLayout;
          setBodyLayout(value);setDocumentOpen(value === 'conversation-preview');setDocumentExpanded(false);
          if (value === 'conversation-preview') {setConversationStarted(true);setDocumentConversation(true);}
        }}>
          <option value="grid">Grid</option><option value="flex">Flex</option>
          <option value="conversation">Conversación</option>
          <option value="conversation-preview">Conversación con documento</option>
        </select>
      </label>
      {inConversation && <button ref={reopen} type="button" className="bh-document-reopen"
        aria-expanded={documentOpen} onClick={openDocument}>Abrir documento entregado</button>}
    </div>
    <div className="overflow-x-auto">
      <AppShell className="bh-conversation-document-example" bodyLayout={bodyLayout} documentExpanded={documentExpanded}
        contentAs="section" contentLabel="Área de trabajo de muestra" rightSidebar={inConversation ? rightSidebar : undefined}
        header={{actions:{actions:5,onAction:next => setAction(next)},
          company:{companyName:'Empresa S.A. de C.V.',rfc:'CAC840428RH1',
            onToggle:() => setAction('Solicitud local: cambiar empresa')},
          user:{name:'Julia Ávila',avatar:{initials:'JA'},onToggle:() => setAction('Solicitud local: opciones de cuenta')}}}
        sidebar={{label:'Navegación del área de trabajo',collapsed,onCollapsedChange:setCollapsed,
          collapsedMenuItems:<MenuItem label="Inicio del área" href="#demo-shell-heading" current showRightIcon={false} showBeta={false}/>,
          expandedMenuItems:<MenuItem type="expanded" label="Inicio del área" href="#demo-shell-heading" current showRightIcon={false} showBeta={false}/>}}
        sectionHeader={{title:inConversation ? 'Beni' : 'Resumen contable',headingLevel:3,
          logoInsteadTitle:inConversation,description:inConversation ? 'Asistente de CONTPAQi'
            : 'Revisa los comprobantes del periodo y su estado de conciliación.'}}
        documentPreview={documentOpen ? <ChatDocumentViewer title={deliveredDocumentTitle}
          description={deliveredDocumentDescription} expanded={documentExpanded} headingLevel={4}
          onDownload={() => setAction('El anfitrión recibe la solicitud de descarga; esta demo no genera archivos.')}
          onExpand={() => setDocumentExpanded(value => !value)}
          onClose={() => {setDocumentOpen(false);setDocumentExpanded(false);setBodyLayout('conversation');reopen.current?.focus();}}>
          <DeliveredDocumentPreview onAction={setAction}/>
        </ChatDocumentViewer> : undefined}>
        {inConversation ? (conversationStarted ? <Chat state="started" composer={composer} messages={<>
          {documentConversation && <><UserMessage message={sample}/>{response}</>}
          {messages.map((text,index) => <UserMessage key={index} message={text}/>)}
        </>}/> : <Chat userName="Bruce Wayne" composer={composer} onSuggestion={setDraft}
          suggestions={['Muéstrame mis ingresos del mes','¿Cuánto IVA tengo por pagar?']}/>) : <>
          <div className={bodyLayout === 'grid' ? 'contents' : 'flex gap-[var(--bh-app-shell-gap)]'}>
            <AppShellGridItem span={2} className="grow basis-0 rounded-lg bg-slate-100 p-4"><h4>Comprobantes registrados</h4><p>128 en el periodo</p></AppShellGridItem>
            <AppShellGridItem span={2} className="grow basis-0 rounded-lg bg-slate-100 p-4"><h4>Por conciliar</h4><p>7 pendientes</p></AppShellGridItem>
          </div>
          <AppShellGridItem span={4} className="grow basis-0 rounded-lg bg-slate-100 p-4">
            <h4 id="demo-shell-heading">Revisión del periodo</h4>
            <Input id="demo-shell-note" label="Nota de revisión" placeholder="Añade una nota" required={false} showIcon={false} className="max-w-sm"/>
          </AppShellGridItem>
        </>}
      </AppShell>
    </div>
    <p role="status">{action && `Acción de muestra: ${action}`}</p>
  </div>;
}
