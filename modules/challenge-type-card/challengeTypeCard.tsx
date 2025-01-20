import "./challengeTypeCard.css";
import ChallengeCard from "@/components/challenge-card/challengeCard";
import { ChallengeCardTypeEnums } from "@/public/enums/ChallengeCardEnums";
import { HTMLAttributes } from "react";

interface ChallengeTypeCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
}

export default function ChallengeTypeCard({
  title,
  ...props
}: ChallengeTypeCardProps) {
  return (
    <div className={"challenge-type-card-container"} {...props}>
      <p className={"challenge-type-card-title"}>{title}</p>
      <div className={"challenge-card-container"}>
        <ChallengeCard type={ChallengeCardTypeEnums.CORRECT} />
        <ChallengeCard type={ChallengeCardTypeEnums.NEUTRAL} />
        <ChallengeCard type={ChallengeCardTypeEnums.AVAILABLE} />
        <ChallengeCard type={ChallengeCardTypeEnums.CORRECT} />
        <ChallengeCard type={ChallengeCardTypeEnums.NEUTRAL} />
      </div>
    </div>
  );
}
