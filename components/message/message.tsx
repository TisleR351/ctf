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
      {!!message &&
        message.split("\n").map((line, index) => (
          <span key={index}>
            {line.split(/(\{.*?\})/g).map((segment, idx) => {
              if (segment.startsWith("{") && segment.endsWith("}")) {
                return <strong key={idx}>{segment.slice(1, -1)}</strong>;
              }
              return segment;
            })}
            <br />
          </span>
        ))}
    </div>
  );
}
