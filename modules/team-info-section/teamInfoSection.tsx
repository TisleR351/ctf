import "./teamInfoSection.css";
import { HTMLAttributes } from "react";
import Divider from "@/components/divider/divider";

interface TeamPointSectionProps extends HTMLAttributes<HTMLDivElement> {
  teamName: string;
  teamPoints: number;
  className?: string;
}

export default function TeamInfoSection({
  className,
  teamPoints,
  teamName,
  ...props
}: TeamPointSectionProps) {
  return (
    <div
      className={`team-info-section-container ${className || ""}`.trim()}
      {...props}
    >
      <div className={"team-point-section"}>{teamPoints} pts</div>
      <Divider direction={"vertical"} />
      <div className={"team-name-section"}>{teamName}</div>
    </div>
  );
}
