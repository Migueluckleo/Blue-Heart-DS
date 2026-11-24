'use client';

import { useId } from 'react';
import type { Icon } from '@phosphor-icons/react';
import { Dot } from './dot';

export interface ChatRailItemProps {
  label: string;
  icon: Icon;
  selected?: boolean;
  disabled?: boolean;
  showNotification?: boolean;
  onActivate: () => void;
}

export function ChatRailItem({label, icon: Glyph, selected = false, disabled = false,
  showNotification = false, onActivate}: ChatRailItemProps) {
  const notificationId = useId();
  return <button type="button" className="bh-chat-rail-item" data-blueheart="chat-rail-item"
    aria-label={label} aria-pressed={selected}
    aria-describedby={showNotification ? notificationId : undefined}
    disabled={disabled} onClick={onActivate}>
    <Glyph className="bh-chat-rail-item-icon" weight="light" aria-hidden="true"/>
    {showNotification && <>
      <span className="bh-chat-rail-item-notification"><Dot type="notification" size="medium"/></span>
      <span className="sr-only" id={notificationId}>Tiene novedades</span>
    </>}
  </button>;
}
