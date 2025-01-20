import "./challengeModalMessage.css";
import { HTMLAttributes } from "react";
import { ChallengeModalMessageEnums } from "@/public/enums/ChallengeModalMessageEnums";

interface ChallengeModalMessageProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  message?: string;
  type?: ChallengeModalMessageEnums;
}

export function ChallengeModalMessage({
  className,
  message,
  type = ChallengeModalMessageEnums.AVAILABLE,
  ...props
}: ChallengeModalMessageProps) {
  return (
    <div
      className={`challenge-modal-message-container bg-${type} ${className || ""}`.trim()}
      {...props}
    >
      {!!message && message}
    </div>
  );
}
