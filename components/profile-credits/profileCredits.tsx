import "./profileCredits.css";
import { HTMLAttributes } from "react";

interface ProfileCreditsProps extends HTMLAttributes<HTMLDivElement> {
  points: number;
}

export default function ProfileCredits({
  points,
  ...props
}: ProfileCreditsProps) {
  return (
    <p className="profile-credits" {...props}>
      {points} pts
    </p>
  );
}
