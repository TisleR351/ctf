import "./challengeTypeCard.css";
import ChallengeCard from "@/app/components/challenge-type-card/challenge-card/challengeCard";

export default function ChallengeTypeCard() {
  return (
    <div className={"challenge-type-card-container"}>
      <p className={"challenge-type-card-title"}>Programming</p>
      <div className={"challenge-card-container"}>
        <ChallengeCard type={"available"} />
        <ChallengeCard type={"correct"} />
        <ChallengeCard type={"incorrect"} />
        <ChallengeCard type={"neutral"} />
        <ChallengeCard type={"available"} />
        <ChallengeCard type={"correct"} />
        <ChallengeCard type={"incorrect"} />
        <ChallengeCard type={"neutral"} />
        <ChallengeCard type={"available"} />
        <ChallengeCard type={"correct"} />
        <ChallengeCard type={"incorrect"} />
        <ChallengeCard type={"neutral"} />
      </div>
    </div>
  );
}
