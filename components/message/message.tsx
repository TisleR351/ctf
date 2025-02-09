import "./message.css";
import { HTMLAttributes, useEffect, useState } from "react";
import { MessageEnums } from "@/utils/enums/MessageEnums";

interface ChallengeModalMessageProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  message?: string;
  time?: number;
  type?: MessageEnums;
}

export function Message({
  className,
  message,
  time = 2500,
  type = MessageEnums.AVAILABLE,
  ...props
}: ChallengeModalMessageProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, time);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`message-container bg-${type} ${className || ""} ${
        visible ? "visible" : "hidden"
      }`.trim()}
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
