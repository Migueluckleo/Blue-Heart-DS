'use client';

import { ArrowsCounterClockwiseIcon } from '@phosphor-icons/react/dist/csr/ArrowsCounterClockwise';
import { GraduationCapIcon } from '@phosphor-icons/react/dist/csr/GraduationCap';
import { HeadsetIcon } from '@phosphor-icons/react/dist/csr/Headset';
import { AppWindowIcon } from '@phosphor-icons/react/dist/csr/AppWindow';
import { BellIcon } from '@phosphor-icons/react/dist/csr/Bell';
import { IconButton } from './icon-button';

export type HeaderAction = 'sync' | 'academy' | 'support' | 'apps' | 'notifications';

export interface HeaderActionsProps {
  actions?: 1 | 2 | 3 | 4 | 5;
  notifications?: number;
  onAction?: (action: HeaderAction) => void;
}

const actionOrder = {
  5:['sync','academy','support','apps','notifications'],
  4:['sync','support','apps','notifications'],
  3:['sync','apps','notifications'],
  2:['apps','notifications'],
  1:['notifications'],
} as const;
const glyphs = {
  sync:[ArrowsCounterClockwiseIcon,'Sincronizar'],
  academy:[GraduationCapIcon,'Academia'],
  support:[HeadsetIcon,'Soporte'],
  apps:[AppWindowIcon,'Aplicaciones'],
  notifications:[BellIcon,'Notificaciones'],
} as const;

export function HeaderActions({actions=5,notifications=1,onAction}:HeaderActionsProps) {
  const count = Number.isFinite(notifications) ? Math.max(0,Math.floor(notifications)) : 0;
  return <div className="bh-header-actions" role="group" aria-label="Acciones globales" data-blueheart="header-actions">
    {actionOrder[actions].map(action=>{
      const [icon,label] = glyphs[action];
      const withBadge = action==='notifications' && count>0;
      return <IconButton key={action} variant="ghost" icon={icon}
        label={withBadge ? `${label}, ${count} pendientes` : label}
        showBadge={withBadge} badgeCount={String(count)} badgeMaxCount={count>99 ? '99+' : undefined}
        onClick={()=>onAction?.(action)}/>;
    })}
  </div>;
}
