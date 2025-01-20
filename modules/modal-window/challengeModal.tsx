"use client";
import React, { HTMLAttributes } from "react";
import "./challengeModal.css";

interface ModalWindowProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  onCloseAction: () => void;
}

export default function ModalWindow({
  isOpen,
  onCloseAction,
  className,
  children,
}: ModalWindowProps) {
  if (!isOpen) return null;

  return (
    <div className="challenge-modal-overlay" onClick={onCloseAction}>
      <div
        className={`challenge-modal-content ${className || ""}`.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
