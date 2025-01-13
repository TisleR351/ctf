import "./divider.css";
import { HTMLAttributes } from "react";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction: "horizontal" | "vertical";
  className?: string;
}

export default function Divider({ direction, className = "" }: DividerProps) {
  return <div className={`divider ${direction} ${className}`}></div>;
}
