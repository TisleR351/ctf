import "./challengeFileButton.css";
import { HTMLAttributes } from "react";

interface ChallengeFileButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  isConnected: boolean;
}

export function ChallengeFileButton({
  className,
  isConnected,
  ...props
}: ChallengeFileButtonProps) {
  return (
    <button
      className={`challenge-file-button ${className || ""}`.trim()}
      disabled={!isConnected}
    >
      <i className={`zip-icon fa-solid fa-file-zipper`}></i>
      FileName.zip
    </button>
  );
}
