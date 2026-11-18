'use client';

import { MenuItem, type MenuItemAction } from './menu-item';

export type TopBarItem = MenuItemAction & {
  id: string;
  label: string;
  active?: boolean;
  showRightIcon?: boolean;
};

export interface TopBarProps {
  label: string;
  items: readonly TopBarItem[];
  className?: string;
}

export function TopBar({label, items, className}: TopBarProps) {
  return <nav aria-label={label} className={['bh-top-bar', className].filter(Boolean).join(' ')} data-blueheart="top-bar">
    <ul className="bh-top-bar-items">
      {items.map(({id,...item}) => <li key={id}><MenuItem {...item} orientation="horizontal" type="collapsed"/></li>)}
    </ul>
  </nav>;
}
