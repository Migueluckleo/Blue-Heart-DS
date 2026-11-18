'use client';

import { CaretLeftIcon } from '@phosphor-icons/react/dist/csr/CaretLeft';
import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight';
import { useId, type ReactNode } from 'react';
import { IconButton } from './icon-button';

export interface SidebarProps {
  label: string;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  collapsedMenuItems?: ReactNode;
  collapsedLowerOptions?: ReactNode;
  expandedMenuItems?: ReactNode;
  expandedLowerOptions?: ReactNode;
  className?: string;
}

export function Sidebar({label, collapsed, onCollapsedChange, collapsedMenuItems, collapsedLowerOptions,
  expandedMenuItems, expandedLowerOptions, className}: SidebarProps) {
  const id = useId();
  const main = collapsed ? collapsedMenuItems : expandedMenuItems;
  const lower = collapsed ? collapsedLowerOptions : expandedLowerOptions;
  const action = collapsed ? 'Expandir navegación' : 'Contraer navegación';
  return <nav aria-label={label} className={['bh-sidebar',className].filter(Boolean).join(' ')}
    data-blueheart="sidebar" data-collapsed={collapsed}>
    <div className="bh-sidebar-control">
      <IconButton variant="secondary" size="small" label={action} icon={collapsed ? CaretRightIcon : CaretLeftIcon}
        aria-expanded={!collapsed} aria-controls={id} onClick={() => onCollapsedChange(!collapsed)}/>
    </div>
    <div className="bh-sidebar-content" id={id}>
      <div className="bh-sidebar-main">{main}</div>
      {lower && <div className="bh-sidebar-lower">
        <hr className="bh-sidebar-divider" aria-hidden="true"/>
        {lower}
      </div>}
    </div>
  </nav>;
}
