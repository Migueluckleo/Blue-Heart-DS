# App Shell · React / TypeScript

Documento técnico generado por `pnpm ds:generate`. Editar la API en código, el ejemplo ejecutable o las notas de `components.registry.json`, y regenerar. No es otra aprobación del contrato visual.

Familia `APP-SHELL-001` · API local 0.1.0 · categoría navegación.

## Guía semántica normativa

Fuente: [guía del contrato](../../../../specs/components/app-shell.contract.v1.0.0.md#guía-semántica-normativa).

Usa App Shell para reunir navegación global y el contenido principal de una pantalla de escritorio. Carbon documenta cómo Header y panel lateral organizan niveles de navegación. W3C WAI distingue las regiones semánticas que permiten recorrer la página. BlueHeart mantiene la jerarquía local en Section Header y deja Grid o Flex al contenido. [Carbon Global Header](https://www.carbondesignsystem.com/building-blocks/core/patterns/global-header) · [W3C WAI Landmark Regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)

| Situación | Haz | Evita |
|---|---|---|
| Dashboard con módulos alineados | Usa Grid y elige spans según los mínimos de cada módulo. | Fijar las alturas de los rectángulos de ejemplo. |
| Listado, formulario o detalle | Usa Flex cuando predomine un eje. Conserva el orden del contenido. | Reordenar el significado visualmente. |
| Menú expandido y contenido largo | Verifica espacio disponible y declara una región de scroll en el anfitrión. | Convertir el recorte del ejemplo Figma en contenido web inaccesible. |
| Documento entregado durante una conversación | Usa conversation-preview con Chat en Body y el visor en Document preview. | Sustituir Chat por una tabla fija o desanclar las regiones. |

La [enmienda de documento entregado](../../../../specs/components/app-shell.document-preview.amendment.v1.0.0.md) añade dos variantes a las seis anteriores y documenta ancho, Slots, acciones y equivalencia web. El set vigente tiene ocho variantes; los contratos y QA anteriores conservan su alcance histórico.

## Uso sin backend

Grid, Flex, Conversación o Conversación con preview del documento. En preview, Chat conserva 374 px y el documento llena el espacio restante. Revisión 2026-11-24: Header–Content gap 0, Content con padding top 0 y laterales/bottom 32; conversación usa gap 32. Todas las medidas propias consumen tokens Header/App Shell.

```tsx
'use client';

import { useRef, useState } from 'react';
import { ThumbsUpIcon } from '@phosphor-icons/react/dist/csr/ThumbsUp';
import { ThumbsDownIcon } from '@phosphor-icons/react/dist/csr/ThumbsDown';
import { AppShell, AppShellGridItem, Button, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem,
  ConversationResponse, ConversationResponseCopyIcon, ConversationResponsePreview, IconButton, Input,
  MenuItem, UserMessage, type AppShellBodyLayout, type ChatSidebarProps, ChatDocumentViewer } from '@/index';
import { DeliveredDocumentPreview, deliveredDocumentTitle, deliveredDocumentDescription } from './chat-document-viewer';

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
```

Ejemplo compilado en [examples/app-shell.tsx](../../src/examples/app-shell.tsx). Usa React state en memoria; recargar restaura la muestra. No hay endpoint, credencial ni persistencia implícita.

## API tipada

Importar desde [src/index.ts](../../src/index.ts), con `@/index` dentro del catálogo. Código propietario: [app-shell.tsx](../../src/components/app-shell.tsx). Los atributos HTML heredados mantienen los tipos de React; callbacks y datos controlados pertenecen a la pantalla.

```tsx
export type AppShellBodyLayout = 'grid' | 'flex' | 'conversation' | 'conversation-preview';

export interface AppShellProps {
  header: HeaderProps;
  sidebar: SidebarProps;
  sectionHeader: SectionHeaderProps;
  children: ReactNode;
  rightSidebar?: ReactNode;
  documentPreview?: ReactNode;
  documentExpanded?: boolean;
  bodyLayout?: AppShellBodyLayout;
  contentAs?: 'main' | 'section';
  contentLabel?: string;
  className?: string;
}
```

## Defaults y eventos

Las firmas siguientes se extraen de las funciones, incluidos sus valores por defecto. Una prop sin asignación `=` es obligatoria o permanece undefined según su tipo; no se rellena con reglas de negocio.

```tsx
AppShell: {header, sidebar, sectionHeader, children, rightSidebar, documentPreview,
  documentExpanded = false, bodyLayout = 'grid',
  contentAs: Content = 'main', contentLabel, className}: AppShellProps
AppShellGridItem: {span = 1, children, className}: {
  span?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}
```

Props `on…` son callbacks locales. No atribuyen autorización, carga, guardado ni resultados de negocio.

## Composición y Slots

P-SLOTS: **REQUIRED**. Body admite composición reemplazable. El modo de conversación añade la región Right sidebar. ReactNode/listas tipadas son la traducción web de las regiones, no evidencia de Slots Figma. El anfitrión conserva el orden y los IDs de listas; las cantidades de las demos no son límites de producto.

## Estilos y Next.js

Importar [styles.css](../../src/styles.css) desde el layout. Consultar el manifiesto generado y los contratos vigentes para roles, modos y aliases.

Los ejemplos que usan estado/eventos requieren `'use client'`. Los datos serializables pueden venir de un Server Component; crear callbacks en una frontera cliente. No enviar funciones desde el servidor. No se requiere backend para el catálogo ni para componer con fixtures.

## Fuentes y límites

- [app-shell.contract.v1.0.0.md](../../../../specs/components/app-shell.contract.v1.0.0.md) · SHA-256 `a8875408e0668864fceb868a9827d706b2e732ebedaf1b08aed209717f624775`.
- [app-shell.document-preview.amendment.v1.0.0.md](../../../../specs/components/app-shell.document-preview.amendment.v1.0.0.md) · SHA-256 `f61282f2318487c1d050be4dc5fbea064dd50bf8a432eee9c6d8d2ff1ec8edde`.
- [forms.app-shell.amendment.v1.0.0.md](../../../../specs/patterns/forms.app-shell.amendment.v1.0.0.md) · SHA-256 `0e4c9655879b4847db021522fe49bc86f8dcac095a01c63fb3d75d03b5db8b8b`.
- [tabs.local-navigation.amendment.v1.0.0.md](../../../../specs/patterns/tabs.local-navigation.amendment.v1.0.0.md) · SHA-256 `b297a1444e4ffcb17456d8ebcbba6bcb58b8349dad25038010b852b724ab39c0`.
- [header-app-shell.spacing.amendment.v1.0.0.md](../../../../specs/components/header-app-shell.spacing.amendment.v1.0.0.md) · SHA-256 `ae33ac4bc80963d491ea867ade3b4fc0ac930be62d9f0f6d4ecb5b90fd58e818`.

Las enmiendas sustituyen solo su alcance explícito. Los estados de aprobación, auditoría y excepciones visuales permanecen en esas fuentes. La API web inicial no certifica identidad pixel a pixel ni conformidad WCAG completa.

## Verificación

`pnpm verify` comprueba generación/cobertura, TypeScript, pruebas y build estático. `pnpm test:browser` valida los recorridos locales. [Evidencia de QA](../../../../qa/implementations/app-shell.v1.0.0.review.md) identifica alcance, resultados y límites; una demo visible por sí sola no es un PASS visual.
