'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/csr/ImageSquare';
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple';
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle';
import { Button, buttonSizes, buttonVariants, Dot, Radio, RadioGroup, Toggle, Tooltip, LinearProgress, Checkbox, FileUpload, Search, BreadcrumbItem, Breadcrumb, MenuItem, TopBar, IconButton, Sidebar, Badge, Avatar, AvatarGroup, CompanySelector, UserSelector, HeaderActions, Header, Input, SectionHeader, AppShell, AppShellGridItem, Chat, ChatSidebar, ChatSidebarSection, ChatHistoryItem, UserMessage, type ChatSidebarProps, Pagination, PaginationItem, Tabs, TextArea, DropdownField, FloatingActions, InlineNotification, Chip, Table, TableCell, TableCaptureCell, Stepper, type StepperOrientation, type DropdownEntry, type AppShellBodyLayout, type InputSize, type InputStatus, type CheckboxSelection, type FileUploadState, Loader, loaderColors, loaderSizes, type ButtonState } from './index';

const states: ButtonState[] = ['default', 'hover', 'pressed', 'focus', 'loading', 'disabled'];

// example: buttons
export function ButtonsExample() {
  const [busy, setBusy] = useState(false);
  const [activations, setActivations] = useState(0);
  return (
    <div className="my-4 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button id="demo-primary" label="Guardar cambios" loadingLabel="Guardando…" loading={busy}
          showLeftIcon onClick={() => {setActivations(count => count + 1); setBusy(true);}}/>
        <Button id="demo-reset" variant="secondary" label="Terminar demo" onClick={() => setBusy(false)}/>
        <Button id="demo-disabled" variant="danger" label="Eliminar" disabled describedBy="demo-disabled-note"/>
        <Button id="demo-link" variant="link" label="Ver indicador" href="#loader-example"/>
      </div>
      <p id="demo-disabled-note">Selecciona un elemento para eliminar.</p>
      <p role="status" id="demo-activations">Activaciones locales: {activations}</p>
      <details>
        <summary>Matriz de 90 variantes</summary>
        {buttonVariants.map(variant => (
          <div key={variant} className="my-3 overflow-auto">
            <h3 className="mb-2 font-medium">{variant}</h3>
            {buttonSizes.map(size => <div key={size} className="mb-3 flex w-max gap-4 p-1">
              {states.map(state => <div key={state} className="space-y-1">
                <p className="text-xs">{size} · {state}</p>
                <Button variant={variant} size={size} disabled={state === 'disabled'} loading={state === 'loading'}
                  previewState={state !== 'disabled' && state !== 'loading' ? state : undefined}/>
              </div>)}
            </div>)}
          </div>
        ))}
      </details>
    </div>
  );
}

// example: loader
export function LoaderExample() {
  return (
    <div id="loader-example" className="my-4 space-y-4">
      <Loader size="small" label="Cargando archivos…"/>
      <details>
        <summary>Matriz de 24 variantes</summary>
        {loaderSizes.map(size => <div className="my-3 flex flex-wrap items-center gap-4" key={size}>
          <span className="w-28">{size}</span>
          {loaderColors.map(color => <span key={color} className={color === 'on-color' ? 'bg-slate-900 p-2 text-white' : 'p-2'}>
            <Loader size={size} color={color}/>
            <span className="ml-2">{color}</span>
          </span>)}
        </div>)}
      </details>
    </div>
  );
}

// example: dot
export function DotExample() {
  return <ul id="demo-dot" className="my-4 flex flex-wrap items-center gap-6">
    <li className="flex items-center gap-2"><Dot type="active"/> Atención disponible</li>
    <li className="flex items-center gap-2">
      <Dot type="count" color="brand" count="7"/>
      <span><span className="sr-only">7 </span>Pendientes</span>
    </li>
    <li className="flex items-center gap-2">
      <Dot type="count-expand" color="white" maxCount="99+"/>
      <span><span className="sr-only">Más de 99 </span>Mensajes</span>
    </li>
  </ul>;
}

// example: toggle
export function ToggleExample() {
  const [enabled, setEnabled] = useState(false);
  return <div className="my-4 flex flex-wrap items-center gap-6">
    <Toggle showLabel id="demo-toggle" label="Notificaciones" selected={enabled} onSelectedChange={setEnabled}/>
    <Toggle showLabel id="demo-toggle-disabled" label="Alertas del sistema" selected disabled/>
  </div>;
}

// example: radio
export function RadioExample() {
  const [delivery, setDelivery] = useState('email');
  return <fieldset className="my-4 space-y-3">
    <legend>Entrega del comprobante</legend>
    <div className="flex flex-wrap gap-6">
      <Radio showLabel id="demo-radio-email" name="delivery" value="email" label="Correo electrónico"
        selected={delivery === 'email'} onSelect={setDelivery}/>
      <Radio showLabel id="demo-radio-download" name="delivery" value="download" label="Descarga"
        selected={delivery === 'download'} onSelect={setDelivery}/>
      <Radio showLabel id="demo-radio-post" name="delivery" value="post" label="Correo postal" selected={false} disabled/>
    </div>
    <p id="demo-radio-hint">Selecciona un medio de entrega disponible.</p>
  </fieldset>;
}

// example: radio-group
export function RadioGroupExample() {
  const [value, setValue] = useState<string>();
  return <div className="my-4 space-y-6">
    <RadioGroup name="receipt-delivery" title="Entrega del comprobante" helperText="Elige una alternativa."
      options={[{value:'email', label:'Correo electrónico'}, {value:'download', label:'Descarga'}]}
      value={value} onValueChange={setValue}/>
    <RadioGroup name="receipt-format" title="Formato del archivo" state="error" direction="horizontal"
      options={[{value:'pdf', label:'PDF'}, {value:'xml', label:'XML'}]}/>
  </div>;
}

// example: tooltip
export function TooltipExample() {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const close = () => {
    clearTimeout(timer.current);
    setVisible(false);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!visible) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [visible]);
  return <div className="my-4 space-y-4">
    <span className="relative inline-block" onMouseEnter={() => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setVisible(true), 300);
    }} onMouseLeave={event => {
      if (!event.currentTarget.contains(document.activeElement)) close();
    }}>
      <button type="button" id="demo-tooltip-trigger" className="rounded border px-3 py-2"
        aria-describedby="demo-tooltip" onFocus={() => {
          clearTimeout(timer.current);
          setVisible(true);
        }} onBlur={close}>
        Panel de actividad
      </button>
      <span className="absolute left-0 top-full z-10">
        <Tooltip id="demo-tooltip" placement="bottom" type="rich" title="Movimientos recientes"
          label="Consulta la actividad del periodo" hidden={!visible}/>
      </span>
    </span>
  </div>;
}

// example: linear-progress
export function LinearProgressExample() {
  const [value, setValue] = useState(0);
  return <div className="my-4 max-w-md space-y-4">
    <LinearProgress id="demo-progress" label="Cargando comprobantes" size="medium"
      value={value} type={value === 100 ? 'success' : 'primary'}
      helperText={value === 100 ? 'Carga de muestra completada' : `${value / 25} de 4 comprobantes`}/>
    <button type="button" className="rounded border px-3 py-2" disabled={value === 100}
      onClick={() => setValue(current => Math.min(100, current + 25))}>Completar siguiente paso de muestra</button>
    <LinearProgress id="demo-progress-unknown" label="Calculando total" size="large"/>
  </div>;
}

// example: checkbox
export function CheckboxExample() {
  const [selected, setSelected] = useState<CheckboxSelection>('indeterminate');
  return <div className="my-4 flex flex-wrap gap-6">
    <Checkbox id="demo-checkbox" label="Seleccionar comprobantes visibles" showLabel selected={selected}
      onSelectedChange={setSelected}/>
    <Checkbox id="demo-checkbox-disabled" label="Selección no disponible" showLabel selected disabled/>
  </div>;
}

// example: file-upload
export function FileUploadExample() {
  const [state, setState] = useState<FileUploadState>('default');
  const [feedback, setFeedback] = useState('Selecciona un archivo de muestra. El archivo permanece en tu dispositivo.');
  return <div className="my-4 space-y-4">
    <FileUpload id="demo-file-upload" state={state} showButton
      formats="Formatos de muestra: XLS, XLSX o CSV"
      supportingText={feedback} onFiles={([file]) => {
        if (!file) return;
        const accepted = /\.(xls|xlsx|csv)$/i.test(file.name);
        setState(accepted ? 'success' : 'error');
        setFeedback(accepted ? 'Selección de muestra confirmada. No se transfirió ningún archivo.'
          : 'Para esta muestra elige un archivo XLS, XLSX o CSV.');
      }}/>
    <FileUpload id="demo-file-upload-disabled" label="Selección no disponible" state="disabled" showHelper={false}/>
  </div>;
}

// example: search
export function SearchExample() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState('');
  return <div className="my-4 max-w-md space-y-2">
    <Search id="demo-search" label="Buscar comprobantes" showLabel
      placeholder="Nombre, RFC o folio" size="medium" value={value}
      onValueChange={setValue} onSearch={setSubmitted}/>
    <p id="demo-search-status" role="status">{submitted ? `Consulta de muestra: ${submitted}` : 'Escribe una consulta y pulsa Enter.'}</p>
  </div>;
}

// example: breadcrumb-item
export function BreadcrumbItemExample() {
  const [expanded, setExpanded] = useState(false);
  return <nav className="my-4 space-y-2" aria-label="Ruta de muestra">
    <ol className="flex flex-wrap items-center gap-1">
      <BreadcrumbItem type="icon" href="#demo-breadcrumb-home"/>
      <BreadcrumbItem type="overflow" label="Mostrar ancestros de muestra" expanded={expanded}
        onActivate={() => setExpanded(value => !value)}/>
      <BreadcrumbItem label="Comprobantes" current/>
    </ol>
    {expanded && <a href="#demo-breadcrumb-home">Documentos</a>}
    <span className="sr-only" id="demo-breadcrumb-home">Inicio de muestra</span>
  </nav>;
}

// example: breadcrumb
export function BreadcrumbExample() {
  const ancestors = [
    {label:'Inicio', href:'#demo-breadcrumb-root', type:'icon'},
    {label:'Contabilidad', href:'#demo-breadcrumb-accounting'},
    {label:'Pólizas', href:'#demo-breadcrumb-parent'},
  ] as const;
  return <div className="my-4 space-y-4">
    <Breadcrumb label="Ruta jerárquica de muestra" ancestors={ancestors} current="Póliza P-0458" collapsed/>
    <Breadcrumb label="Retorno de muestra" ancestors={ancestors} current="Póliza P-0458" compact/>
    <div className="sr-only">
      <span id="demo-breadcrumb-root">Inicio</span>
      <span id="demo-breadcrumb-accounting">Contabilidad</span>
      <span id="demo-breadcrumb-parent">Pólizas</span>
    </div>
  </div>;
}

// example: menu-item
export function MenuItemExample() {
  const [open, setOpen] = useState(false);
  return <nav aria-label="Menú de muestra" className="my-4 flex flex-wrap items-start gap-6">
    <MenuItem label="Inicio" href="#demo-menu-home" current tooltipLabel="Página de inicio"/>
    <div>
      <MenuItem label="Documentos" type="expanded" expanded={open} controls="demo-menu-children"
        onActivate={() => setOpen(value => !value)}/>
      <div id="demo-menu-children" hidden={!open}>
        <MenuItem label="Comprobantes" type="sub-menu" href="#demo-menu-home" active={false}/>
      </div>
    </div>
    <span id="demo-menu-home" className="sr-only">Destino de muestra</span>
  </nav>;
}

// example: top-bar
export function TopBarExample() {
  return <div className="my-4 overflow-x-auto">
    <TopBar label="Secciones de muestra" items={[
      {id:'home',label:'Inicio',href:'#demo-top-bar-target',active:true,current:true,showRightIcon:false},
      {id:'sales',label:'Ventas',href:'#demo-top-bar-target',active:false,showRightIcon:false},
      {id:'reports',label:'Reportes',href:'#demo-top-bar-target',active:false,showRightIcon:false},
    ]}/>
    <span id="demo-top-bar-target" className="sr-only">Destino de muestra</span>
  </div>;
}

// example: icon-button
export function IconButtonExample() {
  const [selected, setSelected] = useState(false);
  return <div className="my-4 flex flex-wrap items-center gap-6">
    <IconButton id="demo-icon-button" variant="secondary" label="Alternar notificaciones" selected={selected}
      showBadge badgeCount="7" onClick={() => setSelected(value => !value)}/>
    <IconButton id="demo-icon-button-disabled" variant="ghost" label="Notificaciones no disponibles" disabled/>
  </div>;
}

// example: sidebar
export function SidebarExample() {
  const [collapsed, setCollapsed] = useState(true);
  return <div className="my-4">
    <Sidebar label="Navegación lateral de muestra" collapsed={collapsed} onCollapsedChange={setCollapsed} className="h-72"
      collapsedMenuItems={<MenuItem label="Inicio" href="#demo-sidebar-target" current/>}
      collapsedLowerOptions={<MenuItem label="Ayuda" href="#demo-sidebar-target" active={false}
        fillIcon={QuestionIcon} lightIcon={QuestionIcon}/>}
      expandedMenuItems={<>
        <MenuItem label="Inicio" type="expanded" href="#demo-sidebar-target" current showRightIcon={false}/>
        <MenuItem label="Comprobantes" type="expanded" href="#demo-sidebar-target" active={false} showRightIcon={false}/>
      </>}
      expandedLowerOptions={<MenuItem label="Ayuda" type="expanded" href="#demo-sidebar-target" active={false}
        fillIcon={QuestionIcon} lightIcon={QuestionIcon} showRightIcon={false}/>}/>
    <span id="demo-sidebar-target" className="sr-only">Destino de muestra</span>
  </div>;
}

// example: badge
export function BadgeExample() {
  return <div className="my-4 flex flex-wrap items-center gap-4" id="demo-badge">
    <Badge label="MXN"/>
    <Badge label="Conciliado" type="success" size="medium"
      showLeftIcon leftIcon={CheckCircleIcon} leftWeight="light"/>
    <Badge label="Requiere revisión" type="warning" size="large"/>
  </div>;
}

// example: avatar
export function AvatarExample() {
  return <div className="my-4 flex items-center gap-4">
    <Avatar name="Cuenta de muestra" imageSrc="/assets/avatar-portrait.png" initials="JA" presence="active"/>
    <Avatar name="Julia Ávila" initials="JÁ" size="large" presence="busy"/>
    <Avatar name="Cuenta de trabajo" size="medium"/>
  </div>;
}

// example: avatar-group
export function AvatarGroupExample() {
  return <div className="my-4">
    <AvatarGroup label="Participantes de muestra" people={[
      {id:'1',name:'Julia Ávila',initials:'JÁ'},
      {id:'2',name:'María Álvarez',initials:'MÁ'},
      {id:'3',name:'Karla Martínez',initials:'KM'},
      {id:'4',name:'Hugo Lara',initials:'HL'},
      {id:'5',name:'Sofía Ortega',initials:'SO'},
      {id:'6',name:'Diego Peña',initials:'DP'},
      {id:'7',name:'Andrea Núñez',initials:'AN'},
    ]}/>
  </div>;
}

// example: company-selector
export function CompanySelectorExample() {
  const [open, setOpen] = useState(false);
  const close = () => {setOpen(false);document.getElementById('demo-company-selector')?.focus();};
  useEffect(()=>{if(open)document.getElementById('demo-company-option')?.focus();},[open]);
  return <div className="my-4 space-y-2" onKeyDown={event=>{if(open&&event.key==='Escape')close();}}>
    <CompanySelector id="demo-company-selector" companyName="Empresa de muestra" rfc="XAXX010101000"
      open={open} onToggle={()=>setOpen(value=>!value)} controls="demo-company-list"/>
    <ul id="demo-company-list" role="listbox" aria-label="Empresas de muestra" hidden={!open}>
      <li id="demo-company-option" role="option" aria-selected="true" tabIndex={0}
        onClick={close} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();close();}}}>
        Empresa de muestra
      </li>
    </ul>
  </div>;
}

// example: user-selector
export function UserSelectorExample() {
  const [open, setOpen] = useState(false);
  const close = () => {setOpen(false);document.getElementById('demo-user-selector')?.focus();};
  useEffect(()=>{if(open)document.getElementById('demo-user-option')?.focus();},[open]);
  return <div className="my-4 space-y-2" onKeyDown={event=>{if(open&&event.key==='Escape')close();}}>
    <UserSelector id="demo-user-selector" name="Julia Ávila" avatar={{initials:'JÁ'}}
      open={open} onToggle={()=>setOpen(value=>!value)} controls="demo-user-menu"/>
    <div id="demo-user-menu" role="menu" aria-label="Cuenta de muestra" hidden={!open}>
      <button id="demo-user-option" type="button" role="menuitem" onClick={close}>Preferencias de muestra</button>
    </div>
  </div>;
}

// example: header-actions
export function HeaderActionsExample() {
  const [last, setLast] = useState('');
  return <div className="my-4 space-y-2">
    <HeaderActions actions={4} notifications={103} onAction={setLast}/>
    <p id="demo-header-action-status" role="status">{last && `Acción de muestra: ${last}`}</p>
  </div>;
}

// example: header
export function HeaderExample() {
  const [open, setOpen] = useState<'company'|'user'>();
  const [message, setMessage] = useState('');
  const toggle = (next:'company'|'user') => setOpen(current=>current===next ? undefined : next);
  const close = () => {
    if (open) document.getElementById(`demo-header-${open}`)?.focus();
    setOpen(undefined);
  };
  useEffect(()=>{if(open)document.getElementById(`demo-header-${open}-option`)?.focus();},[open]);
  return <div className="my-4 space-y-2" onKeyDown={event=>{if(open&&event.key==='Escape')close();}}>
    <div className="overflow-x-auto">
      <Header company={{id:'demo-header-company',companyName:'Empresa de muestra',rfc:'XAXX010101000',
        open:open==='company',onToggle:()=>toggle('company'),controls:'demo-header-company-list'}}
        user={{id:'demo-header-user',name:'Julia Ávila',avatar:{initials:'JÁ'},
          open:open==='user',onToggle:()=>toggle('user'),controls:'demo-header-user-menu'}}
        actions={{actions:5,onAction:action=>setMessage(`Acción de muestra: ${action}`)}}/>
    </div>
    <ul id="demo-header-company-list" role="listbox" aria-label="Empresas del encabezado" hidden={open!=='company'}>
      <li id="demo-header-company-option" role="option" aria-selected="true" tabIndex={0}
        onClick={close} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();close();}}}>
        Empresa de muestra
      </li>
    </ul>
    <div id="demo-header-user-menu" role="menu" aria-label="Cuenta del encabezado" hidden={open!=='user'}>
      <button id="demo-header-user-option" type="button" role="menuitem" onClick={close}>Preferencias</button>
    </div>
    <p role="status">{message}</p>
  </div>;
}

// example: input
export function InputExample() {
  const [amount, setAmount] = useState('');
  const [attempted, setAttempted] = useState(false);
  const invalid = attempted && !/^\d+(\.\d{2})?$/.test(amount);
  const sizes: InputSize[] = ['large','medium','small'];
  const statuses: InputStatus[] = ['default','hover','focus','success','error','read-only','disabled'];
  return <div className="my-4 space-y-4">
    <form className="grid max-w-[464px] justify-items-start gap-4" noValidate
      onSubmit={event => {event.preventDefault();setAttempted(true);}}>
      <Input className="w-full" id="demo-input-amount" name="amount" label="Importe" value={amount}
        onValueChange={next => {setAmount(next);setAttempted(false);}} placeholder="1200.00"
        helperText={invalid ? 'Escribe el importe con dos decimales o sin centavos.' : 'Usa un punto para separar los centavos.'}
        status={invalid ? 'error' : attempted ? 'success' : 'default'} showBadge/>
      <Button label="Comprobar importe" type="submit"/>
    </form>
    <div className="grid max-w-[464px] gap-4">
      <Input id="demo-input-read-only" label="Folio de consulta" defaultValue="A-2026-183" size="medium"
        status="read-only" showIcon={false} required={false}/>
      <Input id="demo-input-disabled" label="Referencia externa" size="small" status="disabled"
        helperText="Disponible al vincular una cuenta." showIcon={false} required={false}/>
    </div>
    <details>
      <summary>Matriz de 42 variantes</summary>
      <div className="grid max-w-[464px] gap-4 p-2">
        {[false,true].flatMap(filled => sizes.flatMap(size => statuses.map(status => {
          const label = `${filled ? 'Con valor' : 'Vacío'} · ${size} · ${status}`;
          return <Input key={label} label={label} size={size} status={status} placeholder="Ejemplo"
            defaultValue={filled ? 'A-2026-183' : ''} helperText="Texto de ayuda"/>;
        })))}
      </div>
    </details>
  </div>;
}

// example: section-header
export function SectionHeaderExample() {
  const [message, setMessage] = useState('');
  const [showLogo, setShowLogo] = useState(false);
  const metadata = <><Badge type="success" size="small" label="Actualizado"/><time dateTime="2026-11-11">11 nov 2026</time></>;
  return <div className="my-4 space-y-4">
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={showLogo} onChange={event => setShowLogo(event.target.checked)}/>
      Mostrar el logo en lugar del título
    </label>
    <SectionHeader className="max-w-[1225px]" title={showLogo ? "Beni" : "Comprobantes"} headingLevel={3} logoInsteadTitle={showLogo}
      description="Consulta los comprobantes registrados y ajusta los filtros del listado."
      breadcrumbs={<Breadcrumb ancestors={[{label:'Inicio',href:'#demo-section-start'}]} current="Comprobantes"/>}
      metadata={metadata}
      inputs={['Periodo','Empresa','Tipo','Moneda','Ejercicio'].map(label =>
        <Input key={label} label={label} placeholder={label} showLabel={false} showHelper={false} required={false}/>)}
      actions={<>
        <IconButton label="Configurar filtros" variant="secondary" size="large" icon={GearIcon}
          onClick={()=>setMessage('Configuración de filtros abierta.')}/>
        <Button label="Aplicar filtros" onClick={()=>setMessage('Filtros aplicados.')}/>
      </>}/>
    <p id="demo-section-action-status" role="status">{message}</p>
    <div id="demo-section-start" className="max-w-[640px]">
      <SectionHeader title="Comprobantes recientes" headingLevel={3} metadata={metadata}
        description="Revisa los registros del periodo seleccionado."
        inputs={<Input label="Periodo reciente" placeholder="Periodo" showLabel={false} showHelper={false} required={false}/>}
        actions={<Button label="Consultar periodo" onClick={()=>setMessage('Consulta de muestra ejecutada.')}/>}/>
    </div>
  </div>;
}

// example: app-shell
export function AppShellExample() {
  const [collapsed, setCollapsed] = useState(true);
  const [bodyLayout, setBodyLayout] = useState<AppShellBodyLayout>('grid');
  const [action, setAction] = useState('');
  const [tool, setTool] = useState<ChatSidebarProps['view']>('none');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const inConversation = bodyLayout === 'conversation';
  const composer = {label:'Redactar en conversación de App Shell',value:draft,onValueChange:setDraft,
    onSend:(text: string) => {
      if (!text.trim()) return;
      setMessages(current => [...current,text]);
      setDraft('');
    }};
  const rightSidebar = <>
    {tool !== 'none' && <ChatSidebar view={tool} onViewChange={setTool} onCollapse={() => setTool('none')}>
      {tool === 'Chats' && messages.length > 0 && <ChatSidebarSection title="Recientes">
        <ChatHistoryItem title={messages[0]} selected onSelect={() => setAction(messages[0])}/>
      </ChatSidebarSection>}
    </ChatSidebar>}
    <ChatSidebar mode="rail" view={tool} onViewChange={setTool} plan={{plan:'Pro Plan',used:42,limit:150}}/>
  </>;
  const moduleStyle = 'grow basis-0 rounded-lg bg-slate-100 p-4';
  return <div className="my-4 space-y-4">
    <label className="inline-flex items-center gap-2">
      Distribución del contenido
      <select className="rounded border px-2 py-1" value={bodyLayout}
        onChange={event => setBodyLayout(event.currentTarget.value as AppShellBodyLayout)}>
        <option value="grid">Grid</option>
        <option value="flex">Flex</option>
        <option value="conversation">Conversación</option>
      </select>
    </label>
    <div className="overflow-x-auto">
      <AppShell className="w-[1440px] min-h-[1024px]" bodyLayout={bodyLayout}
        contentAs="section" contentLabel="Área de trabajo de muestra" rightSidebar={rightSidebar}
        header={{actions:{actions:3,onAction:next => setAction(next)}}}
        sidebar={{label:'Navegación del área de trabajo',collapsed,onCollapsedChange:setCollapsed,
          collapsedMenuItems:<MenuItem label="Inicio del área" href="#demo-shell-heading" current showRightIcon={false} showBeta={false}/>,
          expandedMenuItems:<MenuItem type="expanded" label="Inicio del área" href="#demo-shell-heading" current showRightIcon={false} showBeta={false}/>}}
        sectionHeader={{title:inConversation ? 'Beni' : 'Resumen contable',headingLevel:3,
          logoInsteadTitle:inConversation,description:inConversation ? 'Asistente de CONTPAQi'
            : 'Revisa los comprobantes del periodo y su estado de conciliación.'}}>
        {inConversation ? (messages.length ? <Chat state="started" composer={composer} messages={messages.map((text,index) =>
          <UserMessage key={index} message={text}/>)}/> : <Chat userName="Bruce Wayne" composer={composer}
          onSuggestion={setDraft} suggestions={['Muéstrame mis ingresos del mes','¿Cuánto IVA tengo por pagar?']}/>) : <>
        <div className={bodyLayout === 'grid' ? 'contents' : 'flex gap-[var(--bh-app-shell-gap)]'}>
          <AppShellGridItem span={2} className={moduleStyle}>
            <h4>Comprobantes registrados</h4>
            <p>128 en el periodo</p>
          </AppShellGridItem>
          <AppShellGridItem span={2} className={moduleStyle}>
            <h4>Por conciliar</h4>
            <p>7 pendientes</p>
          </AppShellGridItem>
        </div>
        <AppShellGridItem span={4} className={moduleStyle}>
          <h4 id="demo-shell-heading">Revisión del periodo</h4>
          <Input id="demo-shell-note" label="Nota de revisión" placeholder="Añade una nota"
            required={false} showIcon={false} className="max-w-sm"/>
        </AppShellGridItem>
        </>}
      </AppShell>
    </div>
    <p role="status">{action && `Acción de muestra: ${action}`}</p>
  </div>;
}

// example: pagination-item
export function PaginationItemExample() {
  const [page, setPage] = useState(1);
  return <div className="my-4 flex items-center gap-2">
    <PaginationItem type="icon" direction="previous" accessibleLabel="Anterior de la muestra"
      disabled={page===1} onActivate={()=>setPage(1)}/>
    <PaginationItem type="page" label="1" selected={page===1} onActivate={()=>setPage(1)}/>
    <PaginationItem type="ellipsis"/>
    <PaginationItem type="page" label="12345" selected={page===12345} onActivate={()=>setPage(12345)}/>
    <PaginationItem type="icon" direction="next" accessibleLabel="Siguiente de la muestra"
      disabled={page===12345} onActivate={()=>setPage(12345)}/>
  </div>;
}

// example: pagination
export function PaginationExample() {
  const [page, setPage] = useState(5);
  const [rows, setRows] = useState(20);
  const [compactPage, setCompactPage] = useState(1);
  const results = useRef<HTMLHeadingElement>(null);
  const total = 240;
  return <div className="my-4 space-y-4">
    <h3 id="demo-pagination-results" ref={results} tabIndex={-1}>Comprobantes de la página {page}</h3>
    <div className="overflow-x-auto">
      <Pagination label="Paginación de comprobantes" currentPage={page} totalPages={Math.ceil(total / rows)}
        onPageChange={next => {setPage(next);results.current?.focus();}}
        range={`${(page - 1) * rows + 1}–${Math.min(page * rows,total)} de ${total}`}
        rows={{value:rows,options:[20,50,100],onChange:next=>{setRows(next);setPage(1);}}}/>
    </div>
    <Pagination label="Paginación de vista compacta" type="compact" currentPage={compactPage}
      totalPages={3} onPageChange={setCompactPage} touchTargets/>
  </div>;
}

// example: tab
export function TabExample() {
  const [selected, setSelected] = useState('summary');
  return <div className="my-4">
    <Tabs type="segmented" label="Vistas de la cuenta" selectedId={selected} onSelectionChange={setSelected}
      items={[
        {id:'summary',label:'Resumen',accessibleLabel:'Resumen, 12 pendientes',icon:ImageSquareIcon,badgeCount:'12',
          panel:<p className="pt-3">Doce comprobantes requieren revisión.</p>},
        {id:'documents',label:'Documentos',panel:<p className="pt-3">Documentos registrados de la cuenta.</p>},
      ]}/>
  </div>;
}

// example: tabs
export function TabsExample() {
  const [selected, setSelected] = useState('invoices');
  return <div className="my-4">
    <Tabs label="Tipos de comprobante" selectedId={selected} onSelectionChange={setSelected}
      items={[
        {id:'invoices',label:'Facturas',panel:<p className="pt-3">Facturas del periodo seleccionado.</p>},
        {id:'payments',label:'Pagos',disabled:true,panel:<p className="pt-3">Los pagos no están disponibles.</p>},
        {id:'credit-notes',label:'Notas de crédito',panel:<p className="pt-3">Notas de crédito registradas.</p>},
        {id:'complements',label:'Complementos',panel:<p className="pt-3">Complementos del periodo.</p>},
      ]}/>
  </div>;
}

// example: text-area
export function TextAreaExample() {
  const [value, setValue] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const error = attempted && !value.trim();
  return <div className="my-4 space-y-4">
    <form className="grid w-full max-w-[305px] justify-items-start gap-3" noValidate
      onSubmit={event=>{event.preventDefault();setAttempted(true);}}>
      <TextArea id="demo-text-area" label="Comentarios de revisión" value={value}
        onValueChange={next=>{setValue(next);setAttempted(false);}} placeholder="Describe la situación"
        helperText={error ? 'Escribe un comentario antes de continuar.' : 'Incluye los datos útiles para la revisión.'}
        state={error ? 'error' : 'default'} maxLength={300} className="w-full" fieldHeight={expanded ? 180 : undefined}/>
      <div className="flex flex-wrap gap-2">
        <Button label="Comprobar comentario" type="submit"/>
        <Button label={expanded ? 'Reducir campo' : 'Ampliar campo'} variant="secondary" onClick={()=>setExpanded(!expanded)}/>
      </div>
    </form>
    <TextArea id="demo-text-area-disabled" label="Comentario archivado" defaultValue="Revisión concluida."
      state="disabled" helperText="El periodo está cerrado." className="max-w-[305px]"/>
  </div>;
}

// example: dropdown-item
export function DropdownItemExample() {
  const [selected,setSelected]=useState('general');
  return <div className="my-4 max-w-[320px]">
    <DropdownField label="Tipo de comprobante" size="small" selectedId={selected} onSelectionChange={setSelected}
      entries={[
        {id:'group',type:'header',label:'Clasificación'},
        {id:'general',type:'option',label:'General',description:'Disponible para todos los comprobantes',showLeftIcon:true},
        {id:'operations',type:'option',label:'Operaciones',description:'Aplicable a revisiones del periodo'},
        {id:'archived',type:'option',label:'Archivado',disabled:true},
        {id:'line',type:'divider'},
        {id:'other',type:'option',label:'Otro tipo'},
      ]}/>
  </div>;
}

// example: dropdown-menu
export function DropdownMenuExample() {
  const [currency,setCurrency]=useState('MXN');
  const names=[['MXN','Peso mexicano'],['USD','Dólar estadounidense'],['EUR','Euro'],
    ['CAD','Dólar canadiense'],['BRL','Real brasileño'],['COP','Peso colombiano'],
    ['CLP','Peso chileno'],['PEN','Sol peruano'],['JPY','Yen japonés'],['GBP','Libra esterlina']] as const;
  const entries: DropdownEntry[]=[
    {id:'group',type:'header',label:'Monedas'},
    ...names.map(([id,description])=>({id,type:'option' as const,label:id,description,disabled:id==='EUR'})),
  ];
  return <div className="my-4 grid max-w-[320px] gap-4">
    <DropdownField label="Moneda del comprobante" entries={entries} selectedId={currency}
      onSelectionChange={setCurrency}/>
    <p id="demo-dropdown-currency" role="status">Moneda elegida: {currency}</p>
  </div>;
}

// example: floating-actions
export function FloatingActionsExample() {
  const [count,setCount]=useState(3);
  const [message,setMessage]=useState('');
  return <div className="my-4 space-y-3">
    <Button id="demo-floating-open" label="Preparar selección" onClick={()=>{setCount(3);setMessage('');}}/>
    {count>0&&<div className="overflow-x-auto">
      <FloatingActions className="w-[1024px]" count={String(count)} label="Elementos seleccionados"
        selectAll={count<8?{label:'Seleccionar todos (8)',onSelect:()=>{
          setCount(8);document.getElementById('demo-floating-review')?.focus();
        }}:undefined}
        actions={<Button id="demo-floating-review" variant="text" label="Marcar como revisados" showLeftIcon
          onClick={()=>setMessage(`Se marcaron ${count} comprobantes de muestra.`)}/>}
        onDismiss={()=>{setCount(0);document.getElementById('demo-floating-open')?.focus();}}/>
    </div>}
    <p id="demo-floating-result" role="status">{message}</p>
  </div>;
}

// example: inline-notification
export function InlineNotificationExample() {
  const [show,setShow]=useState(true);
  return <div className="my-4 grid max-w-[602px] gap-3">
    <Button id="demo-inline-restore" variant="secondary" label="Mostrar aviso informativo" onClick={()=>setShow(true)}/>
    {show&&<InlineNotification type="info" title="Actualización disponible"
      description="Consulta el historial de la revisión." link={{href:'#demo-inline-details',label:'Ver historial'}}
      dismissLabel="Cerrar aviso informativo"
      onDismiss={()=>{setShow(false);document.getElementById('demo-inline-restore')?.focus();}}/>}
    <InlineNotification type="neutral" title="Resumen" description="Los datos corresponden al periodo seleccionado."/>
    <InlineNotification type="success" title="Conciliación completa" description="Puedes continuar con la siguiente revisión."/>
    <InlineNotification type="warning" title="Revisión pendiente" description="Hay comprobantes que requieren atención."/>
    <InlineNotification type="error" title="Archivo pendiente" description="Adjunta el archivo para completar el registro." showDismiss={false}/>
    <p id="demo-inline-details">Historial de revisión del catálogo.</p>
  </div>;
}

// example: chip
export function ChipExample() {
  const [currency, setCurrency] = useState('MXN');
  const [pending, setPending] = useState(false);
  const [reviewed, setReviewed] = useState(true);
  const [applied, setApplied] = useState(['Este mes', 'Sucursal Mérida']);
  const reset = useRef<HTMLButtonElement>(null);
  const removeButtons = useRef(new Map<string, HTMLButtonElement>());
  const nextFocus = useRef<string | null>(null);
  useEffect(() => {
    if (nextFocus.current === null) return;
    const next = removeButtons.current.get(nextFocus.current) ?? reset.current;
    next?.focus();
    nextFocus.current = null;
  }, [applied]);
  function remove(index: number) {
    nextFocus.current = applied[index + 1] ?? applied[index - 1] ?? '';
    setApplied(applied.filter((_, current) => current !== index));
  }
  return <div className="grid gap-5">
    <fieldset className="min-w-0">
      <legend>Moneda del comprobante</legend>
      <div className="mt-2 flex flex-wrap gap-3">
        {['MXN','USD'].map(value=><Chip key={value} mode="single" size="large" name="chip-example-currency"
          label={value} value={value} selected={currency===value} onSelect={()=>setCurrency(value)}/>)}
      </div>
    </fieldset>
    <div role="group" aria-label="Estados de comprobantes" className="flex flex-wrap gap-3">
      <Chip mode="multiple" label="Pendiente" counter="0" showLeftIcon selected={pending} onSelectedChange={setPending}/>
      <Chip mode="multiple" label="Revisado" counter="12" showRightIcon selected={reviewed} onSelectedChange={setReviewed}/>
      <Chip mode="multiple" label="Archivado" selected={false} disabled onSelectedChange={()=>{}}/>
    </div>
    <div role="group" aria-label="Filtros aplicados" className="flex flex-wrap items-center gap-3">
      {applied.map((label,index)=><Chip key={label} mode="removable" size="small" label={label} onRemove={()=>remove(index)}
        removeRef={node=>{if(node)removeButtons.current.set(label,node);else removeButtons.current.delete(label);}}/>)}
      <button type="button" ref={reset} className="underline" onClick={()=>setApplied(['Este mes','Sucursal Mérida'])}>Restaurar filtros</button>
    </div>
  </div>;
}

// example: table-cell
export function TableCellExample() {
  const [selected, setSelected] = useState(false);
  const [edited, setEdited] = useState(false);
  const [enabled, setEnabled] = useState(true);
  return <div className="grid gap-3">
    <Table label="Ejemplos de celdas de comprobantes" viewportHeight={88} columnWidths={[64,154,190,100,110,100]}>
      <thead><tr>
        <TableCell item="header" label="Selección"/>
        <TableCell item="header" label="Comprobante"/>
        <TableCell item="header" label="Moneda"/>
        <TableCell item="header" label="Visible"/>
        <TableCell item="header" label="Validación"/>
        <TableCell item="header" label="Acciones"/>
      </tr></thead>
      <tbody><tr>
        <TableCell kind="checkbox" state={selected ? 'selected' : 'default'}>
          <Checkbox label="Seleccionar FAC-001" selected={selected} onSelectedChange={setSelected}/>
        </TableCell>
        <TableCell kind="link" label="FAC-001" href="#demo-table-cell-details"/>
        <TableCaptureCell capture={edited} label={edited ? 'MXN' : 'Selecciona moneda'} showRightIcon/>
        <TableCell kind="toggle"><Toggle label="Mostrar FAC-001" selected={enabled} onSelectedChange={setEnabled}/></TableCell>
        <TableCell kind="badge" showRightIcon={edited}>
          <Badge type={edited ? 'success' : 'error'} size="medium" label={edited ? 'Listo' : 'Pendiente'}/>
        </TableCell>
        <TableCell kind="action" actions={[{id:'edit',label:'Editar moneda de FAC-001',icon:PencilSimpleIcon,
          onActivate:()=>setEdited(value=>!value)}]}/>
      </tr></tbody>
    </Table>
    <p id="demo-table-cell-details">FAC-001 · Comprobante ficticio de la muestra</p>
  </div>;
}

// example: table
export function TableExample() {
  const [rows,setRows] = useState(() => Array.from({length:12},(_,index)=>index+1));
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(4);
  const [selected,setSelected] = useState<number[]>([]);
  const [reversed,setReversed] = useState(false);
  const [nextRow,setNextRow] = useState(13);
  const totalPages=Math.max(1,Math.ceil(rows.length/pageSize));
  const current=Math.min(page,totalPages);
  const ordered=reversed ? [...rows].reverse() : rows;
  const start=(current-1)*pageSize;
  const visible=ordered.slice(start,start+pageSize);
  return <div className="grid min-w-0 gap-3">
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" size="small" label="Invertir orden" onClick={()=>{setReversed(value=>!value);setPage(1);}}/>
      <Button variant="secondary" size="small" label="Agregar fila de muestra" onClick={()=>{
        setRows(value=>[...value,nextRow]);setNextRow(value=>value+1);setPage(1);
      }}/>
      <Button variant="secondary" size="small" label="Retirar primera fila" disabled={rows.length===0} onClick={()=>{
        const first=ordered[0];setRows(value=>value.filter(row=>row!==first));setSelected(value=>value.filter(row=>row!==first));setPage(1);
      }}/>
    </div>
    <p id="demo-table-selection" role="status">{selected.length} seleccionados de {rows.length} comprobantes</p>
    <Table label="Comprobantes ficticios" className="max-w-[560px]" viewportHeight={124}
      columnWidths={[100,148,220,280]}
      pagination={{currentPage:current,totalPages,onPageChange:setPage,label:'Páginas de comprobantes',
        range:rows.length ? `${start+1}–${Math.min(start+pageSize,rows.length)} de ${rows.length}` : undefined,
        rows:{value:pageSize,options:[4,6],onChange:value=>{setPageSize(value);setPage(1);}}}}>
      <thead><tr>
        <TableCell item="header" label="Selección"/>
        <TableCell item="header" label="Folio" sort={reversed ? 'descending' : 'ascending'}/>
        <TableCell item="header" label="Proveedor"/>
        <TableCell item="header" label="Concepto"/>
      </tr></thead>
      <tbody>{visible.map(row=>{
        const checked=selected.includes(row);
        const state=checked ? 'selected' : 'default';
        return <tr key={row}>
          <TableCell kind="checkbox" state={state}>
            <Checkbox label={`Seleccionar folio ${row}`} selected={checked} onSelectedChange={value=>setSelected(prev=>value?[...prev,row]:prev.filter(id=>id!==row))}/>
          </TableCell>
          <TableCell label={`Folio ${row}`} state={state}/>
          <TableCell label={`Proveedor ficticio ${row}`} state={state}/>
          <TableCell label="Servicios de conciliación contable del periodo de muestra" state={state}/>
        </tr>;
      })}</tbody>
    </Table>
  </div>;
}

// example: stepper
export function StepperExample() {
  const steps = [
    {id:'company',title:'Datos de la empresa',caption:'Identificación'},
    {id:'tax',title:'Datos fiscales',caption:'Configuración'},
    {id:'access',title:'Accesos',caption:'Personas'},
    {id:'review',title:'Revisión',caption:'Confirmación'},
  ];
  const [current,setCurrent] = useState(1);
  const [orientation,setOrientation] = useState<StepperOrientation>('horizontal');
  const heading = useRef<HTMLHeadingElement>(null);
  const changedStep = useRef(false);
  useEffect(()=>{
    if (changedStep.current) heading.current?.focus();
  },[current]);
  const go = (index: number) => {
    changedStep.current = true;
    setCurrent(index);
  };
  return <div className="grid gap-4">
    <label className="flex items-center gap-2">Orientación del progreso
      <select value={orientation} onChange={event=>setOrientation(event.target.value as StepperOrientation)}>
        <option value="horizontal">Horizontal</option>
        <option value="vertical">Vertical</option>
      </select>
    </label>
    <Stepper label="Progreso del registro de empresa" steps={steps} currentStep={steps[current].id} orientation={orientation}/>
    <h3 ref={heading} tabIndex={-1}>{steps[current].title}</h3>
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" size="small" label="Volver al paso anterior" disabled={current===0} onClick={()=>go(current-1)}/>
      <Button size="small" label="Continuar registro" disabled={current===steps.length-1} onClick={()=>go(current+1)}/>
    </div>
  </div>;
}
