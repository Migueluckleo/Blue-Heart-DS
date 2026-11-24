'use client';

import { useState } from 'react';
import { ChatsIcon } from '@phosphor-icons/react/dist/csr/Chats';
import { LinkIcon } from '@phosphor-icons/react/dist/csr/Link';
import { SirenIcon } from '@phosphor-icons/react/dist/csr/Siren';
import { ChatRailItem } from '../index';

// example: chat-rail-item
export function ChatRailItemExample() {
  const [active, setActive] = useState('Vinculaciones');
  return <nav aria-label="Ejemplo de Chat Rail Item" className="flex items-center gap-4 px-2 py-3">
    <ChatRailItem label="Chats" icon={ChatsIcon}
      selected={active === 'Chats'} showNotification onActivate={() => setActive('Chats')}/>
    <ChatRailItem label="Vinculaciones" icon={LinkIcon}
      selected={active === 'Vinculaciones'} onActivate={() => setActive('Vinculaciones')}/>
    <ChatRailItem label="Indicadores" icon={SirenIcon} disabled onActivate={() => setActive('Indicadores')}/>
  </nav>;
}
