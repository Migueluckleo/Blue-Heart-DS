'use client';

import type { Icon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
import { ChatsIcon } from '@phosphor-icons/react/dist/csr/Chats';
import { LinkIcon } from '@phosphor-icons/react/dist/csr/Link';
import { MagicWandIcon } from '@phosphor-icons/react/dist/csr/MagicWand';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
import { NotePencilIcon } from '@phosphor-icons/react/dist/csr/NotePencil';
import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus';
import { SidebarIcon } from '@phosphor-icons/react/dist/csr/Sidebar';
import { SirenIcon } from '@phosphor-icons/react/dist/csr/Siren';
import { TableIcon } from '@phosphor-icons/react/dist/csr/Table';
import { IconButton } from './icon-button';

const views = [
  ['Chats', ChatsIcon],
  ['Indicadores', SirenIcon],
  ['Papeles de trabajo', TableIcon],
  ['Vinculaciones', LinkIcon],
] as const;
type View = typeof views[number][0];

export interface ChatToolItemProps {
  label: string;
  icon?: Icon;
  leading?: ReactNode;
  expanded?: boolean;
  disabled?: boolean;
  onActivate?: () => void;
  extraActions?: ReactNode;
}

export function ChatToolItem({label, icon: Glyph = NotePencilIcon, leading, expanded, disabled, onActivate, extraActions}: ChatToolItemProps) {
  return <div className="bh-chat-tool-item" data-blueheart="chat-tool-item">
    <button type="button" onClick={onActivate} disabled={disabled || !onActivate} aria-expanded={expanded}>
      {leading ?? <Glyph className="bh-chat-tool-icon" weight="light" aria-hidden="true"/>}
      <span>{label}</span>
      {expanded !== undefined && <CaretDownIcon className="bh-chat-tool-icon" weight="light" aria-hidden="true"/>}
    </button>
    {extraActions}
  </div>;
}

export interface ChatHistoryItemProps {
  title: string;
  updated?: string;
  selected?: boolean;
  onSelect?: () => void;
  actions?: ReactNode;
}

export function ChatHistoryItem({title, updated, selected = false, onSelect, actions}: ChatHistoryItemProps) {
  return <div className="bh-chat-history-item" data-blueheart="chat-history-item" data-selected={selected}>
    <button type="button" title={title} aria-current={selected ? 'true' : undefined} onClick={onSelect} disabled={!onSelect}>
      <span>{title}</span>
    </button>
    {updated && <span className="bh-chat-history-updated">{updated}</span>}
    {actions && <div className="bh-chat-history-actions">{actions}</div>}
  </div>;
}

export interface ChatSidebarSectionProps {
  title: string;
  children?: ReactNode;
  onAdd?: () => void;
}

export function ChatSidebarSection({title, children, onAdd}: ChatSidebarSectionProps) {
  return <section className="bh-chat-sidebar-section" data-blueheart="chat-sidebar-section" aria-label={title}>
    <div className="bh-chat-sidebar-heading">
      <h3>{title}</h3>
      {onAdd && <IconButton variant="ghost" size="small" icon={PlusIcon} label={`Agregar en ${title}`} onClick={onAdd}/>}
    </div>
    <div className="bh-chat-sidebar-items">{children}</div>
  </section>;
}

export interface ChatPlanUsageProps {
  plan: string;
  used: number;
  limit: number;
  mode?: 'expanded' | 'compact';
}

export function ChatPlanUsage({plan, used, limit, mode = 'expanded'}: ChatPlanUsageProps) {
  const validLimit = Number.isFinite(limit) && limit > 0 ? limit : 0;
  const usedAmount = Number.isFinite(used) ? Math.max(0, used) : 0;
  const value = Math.min(usedAmount, validLimit);
  const percent = validLimit ? value / validLimit * 100 : 0;
  const meter = {role: 'meter', 'aria-label': `Uso de IA de ${plan}`, 'aria-valuemin': 0, 'aria-valuemax': validLimit || 1,
    'aria-valuenow': value, 'aria-valuetext': validLimit ? `${usedAmount} de ${validLimit}` : 'Límite sin definir'};
  if (mode === 'compact') return <div className="bh-chat-plan-ring" {...meter} data-blueheart="chat-plan-usage">
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22" pathLength="100" className="bh-chat-plan-ring-track"/>
      <circle cx="24" cy="24" r="22" pathLength="100" transform="rotate(-90 24 24)" strokeDasharray={`${percent} 100`}
        className="bh-chat-plan-ring-value"/>
    </svg>
    <MagicWandIcon className="bh-chat-plan-icon" weight="light" aria-hidden="true"/>
  </div>;
  return <div className="bh-chat-plan-usage" data-blueheart="chat-plan-usage">
    <div className="bh-chat-plan-title"><MagicWandIcon className="bh-chat-plan-icon" weight="regular" aria-hidden="true"/>{plan}</div>
    <div>
      <div className="bh-chat-plan-values"><span>Uso de IA</span><span>{usedAmount} / {validLimit || '—'}</span></div>
      <div className="bh-chat-plan-track" {...meter}>
        <div className="bh-chat-plan-indicator" style={{inlineSize: `${percent}%`}}/>
      </div>
    </div>
    <span>{validLimit ? `${Math.round(percent)}% utilizado` : 'Límite sin definir'}</span>
  </div>;
}

export type ChatSidebarProps = ({ mode?: 'panel'; view: View } | { mode: 'rail'; view: View | 'none' }) & {
  children?: ReactNode;
  shortcuts?: ReactNode;
  plan?: Omit<ChatPlanUsageProps, 'mode'>;
  onViewChange: (view: View) => void;
  onSearch?: () => void;
  onCollapse?: () => void;
};

export function ChatSidebar({view, mode = 'panel', children, shortcuts, plan, onViewChange, onSearch, onCollapse}: ChatSidebarProps) {
  return <aside className="bh-chat-sidebar" data-blueheart="chat-sidebar" data-mode={mode} aria-label={view === 'none' ? 'Panel lateral de chat' : `Panel lateral · ${view}`}>
    {mode === 'rail' ? <>
      <nav className="bh-chat-sidebar-nav" aria-label="Herramientas de chat">
        {views.map(([name, icon]) => <IconButton key={name} variant="ghost" size="large" selected={name === view}
          icon={icon} label={name} onClick={() => onViewChange(name)}/>)}
      </nav>
      {plan && <ChatPlanUsage {...plan} mode="compact"/>}
    </> : <>
      <div className="bh-chat-sidebar-header">
        <h2>{view}</h2>
        <div className="bh-chat-sidebar-header-actions">
          {onSearch && <IconButton variant="ghost" size="small" icon={MagnifyingGlassIcon} label="Buscar" onClick={onSearch}/>}
          {onCollapse && <IconButton variant="ghost" size="small" icon={SidebarIcon} label="Cerrar panel" onClick={onCollapse}/>}
        </div>
      </div>
      {shortcuts && <div className="bh-chat-sidebar-shortcuts">{shortcuts}</div>}
      <div className="bh-chat-sidebar-content" data-slot="content">{children}</div>
    </>}
  </aside>;
}
