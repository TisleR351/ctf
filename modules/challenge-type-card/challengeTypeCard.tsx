"use client";

import "./challengeTypeCard.css";
import ChallengeCard from "@/components/challenge-card/challengeCard";
import { HTMLAttributes } from "react";
import { Challenge } from "@/utils/types/challenge";

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
        {challenges.map((challenge) => (
          <ChallengeCard key={`${challenge._id}`} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}
