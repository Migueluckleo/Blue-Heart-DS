import { ChatPlanUsage } from '../index';

// example: chat-plan-usage
export function ChatPlanUsageExample() {
  return <div className="flex max-w-[320px] items-start gap-4">
    <ChatPlanUsage plan="Pro Plan" used={42} limit={150}/>
    <ChatPlanUsage mode="compact" plan="Pro Plan" used={42} limit={150}/>
  </div>;
}
