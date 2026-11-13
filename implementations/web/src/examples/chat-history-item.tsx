'use client';

import { useState } from 'react';
import { ChatHistoryItem } from '../index';

// example: chat-history-item
export function ChatHistoryItemExample() {
  const [selected, setSelected] = useState(false);
  return <div className="max-w-[232px]"><ChatHistoryItem title="Reembolsos de gastos de viaje"
    updated="1 sem" selected={selected} onSelect={() => setSelected(!selected)}/></div>;
}
