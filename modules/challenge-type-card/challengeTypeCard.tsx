"use client";

import "./challengeTypeCard.css";
import ChallengeCard from "@/components/challenge-card/challengeCard";;
import { HTMLAttributes } from "react";
import {Challenge} from "@/utils/types/challenge";
import {ChallengeCardTypeEnums} from "@/utils/enums/ChallengeCardEnums";

interface ChallengeTypeCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
  challenges: Challenge[];
}

export default function ChallengeTypeCard({
  title,
  challenges,
  ...props
}: ChallengeTypeCardProps) {
  return (
    <div className={"challenge-type-card-container"} {...props}>
      <p className={"challenge-type-card-title"}>{title}</p>
      <div className={"challenge-card-container"}>
        <ChallengeCard type={ChallengeCardTypeEnums.SUCCESS} />
        <ChallengeCard type={ChallengeCardTypeEnums.NEUTRAL} />
        <ChallengeCard type={ChallengeCardTypeEnums.PRIMARY} />
        <ChallengeCard type={ChallengeCardTypeEnums.SUCCESS} />
        <ChallengeCard type={ChallengeCardTypeEnums.NEUTRAL} />
      </div>
    </div>
  );
}
