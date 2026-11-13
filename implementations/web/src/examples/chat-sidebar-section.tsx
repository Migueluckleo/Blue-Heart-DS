import { ChatHistoryItem, ChatSidebarSection } from '../index';

// example: chat-sidebar-section
export function ChatSidebarSectionExample() {
  return <div className="max-w-[232px]"><ChatSidebarSection title="Recientes">
    <ChatHistoryItem title="Reembolsos de gastos de viaje" updated="1 sem"/>
  </ChatSidebarSection></div>;
}
