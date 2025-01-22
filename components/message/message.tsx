import "./message.css";
import { HTMLAttributes } from "react";
import { MessageEnums } from "@/utils/enums/MessageEnums";

interface ChallengeModalMessageProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  message?: string;
  type?: MessageEnums;
}

export function Message({
  className,
  message,
  type = MessageEnums.AVAILABLE,
  ...props
}: ChallengeModalMessageProps) {
  return (
    <div
      className={`message-container bg-${type} ${className || ""}`.trim()}
      {...props}
    >
      {!!message && message}
    </div>
  );
}
