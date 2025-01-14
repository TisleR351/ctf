import "./challengeCard.css";
import { HTMLProps } from "react";

interface ChallengeCardProps extends HTMLProps<HTMLDivElement> {
  type: string;
  className?: string;
}

export default function ChallengeCard({
  type = "available",
  className,
}: ChallengeCardProps) {
  return (
    <div className={`challenge-card bg-${type} ${className || ""}`.trim()}>
      <div className={"challenge-card-title"}>The lost park</div>
      <div className={"challenge-card-credits"}>75 pts</div>
    </div>
  );
}
