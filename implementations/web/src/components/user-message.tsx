export interface UserMessageProps {
  message: string;
  className?: string;
}

export function UserMessage({message, className}: UserMessageProps) {
  return <div data-blueheart="user-message"
    className={['bh-user-message flex w-full min-w-0 flex-col items-end', className].filter(Boolean).join(' ')}>
    <div className="bh-user-message-bubble flex w-full min-w-0 flex-col">
      <p className="bh-user-message-text m-0">{message}</p>
    </div>
  </div>;
}
