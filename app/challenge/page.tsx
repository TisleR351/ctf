import "@fortawesome/fontawesome-free/css/all.min.css";
import "./page.css";
import React from "react";
import ChallengeTypeCard from "@/modules/challenge-type-card/challengeTypeCard";
import BaseLayout from "@/modules/layout/layout";

export default function Challenge() {
  return (
    <BaseLayout>
      <div className={"challenges-container"}>
        <ChallengeTypeCard title={"Programming"} />
        <ChallengeTypeCard title={"Forensics"} />
        <ChallengeTypeCard title={"Programming"} />
        <ChallengeTypeCard title={"Forensics"} />
      </div>
    </BaseLayout>
  );
}
