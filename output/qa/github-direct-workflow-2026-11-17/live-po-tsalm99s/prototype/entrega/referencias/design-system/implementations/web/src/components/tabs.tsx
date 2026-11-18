'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Tab, type TabProps, type TabType } from './tab';

export interface TabsItem {
  id: string;
  label: string;
  accessibleLabel?: string;
  icon?: TabProps['icon'];
  badgeCount?: string;
  disabled?: boolean;
  panel: ReactNode;
}

export interface TabsProps {
  label: string;
  items: readonly TabsItem[];
  selectedId: string;
  onSelectionChange: (id: string) => void;
  type?: TabType;
  className?: string;
}

export function Tabs({label, items, selectedId, onSelectionChange, type = 'underline', className}: TabsProps) {
  const groupId = useId();
  const elements = useRef(new Map<string, HTMLButtonElement>());
  const [focusId,setFocusId] = useState<string>();
  if (items.length < 2) return null;
  const enabled = items.filter(item => !item.disabled);
  const first = enabled[0]?.id;
  const selectedIsEnabled = enabled.some(item => item.id === selectedId);
  const activeId = enabled.some(item=>item.id===focusId) ? focusId : selectedIsEnabled ? selectedId : first;
  const tabId = (id: string) => `${groupId}-tab-${encodeURIComponent(id)}`;
  const panelId = (id: string) => `${groupId}-panel-${encodeURIComponent(id)}`;

  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, id: string) {
    const current = enabled.findIndex(item=>item.id===id);
    if (current < 0) return;
    let next: TabsItem | undefined;
    switch (event.key) {
      case 'ArrowLeft': next=enabled[(current-1+enabled.length)%enabled.length]; break;
      case 'ArrowRight': next=enabled[(current+1)%enabled.length]; break;
      case 'Home': next=enabled[0]; break;
      case 'End': next=enabled.at(-1); break;
      default: return;
    }
    event.preventDefault();
    if (next) elements.current.get(next.id)?.focus();
  }

  return <div className={className} data-blueheart="tabs" data-type={type}>
    <div role="tablist" aria-label={label} className="bh-tabs-list" data-type={type}
      onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocusId(undefined);}}>
      {items.map(item => <Tab key={item.id} ref={node=>{
        if (node) elements.current.set(item.id,node);
        else elements.current.delete(item.id);
      }} id={tabId(item.id)} label={item.label} type={type}
        aria-label={item.accessibleLabel} aria-controls={panelId(item.id)} selected={item.id===selectedId}
        disabled={item.disabled} icon={item.icon} badgeCount={item.badgeCount}
        tabIndex={item.id===activeId?0:-1} onFocus={()=>setFocusId(item.id)}
        onKeyDown={event=>moveFocus(event,item.id)} onClick={()=>onSelectionChange(item.id)}/>)}
    </div>
    {items.map(item => <div key={item.id} id={panelId(item.id)} role="tabpanel" aria-labelledby={tabId(item.id)}
      tabIndex={item.id===selectedId?0:-1} hidden={item.id!==selectedId} className="bh-tabs-panel">{item.panel}</div>)}
  </div>;
}
