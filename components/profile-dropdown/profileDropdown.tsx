"use client";
import "./profileDropdown.css";
import { useRef } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

interface ProfileDropdownProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  name: string;
  isOpen: boolean;
  setIsOpenAction: (open: boolean) => void;
  className?: string;
}

export default function ProfileDropdown({
  name,
  isOpen,
  setIsOpenAction,
  className,
  ...props
}: ProfileDropdownProps) {
  const textRef = useRef<HTMLDivElement>(null);

  name += " ▼";
  const letters = name.split("");

  const dropdownOptions = ["Option 1", "Option 2", "Option 3"];

  return (
    <div className="profile-button-container">
      <motion.button
        layout
        onClick={() => setIsOpenAction(!isOpen)}
        className={`profile-button ${className || ""}`.trim()}
        {...props}
      >
        <motion.div key={name} layout ref={textRef}>
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                duration: 0.5,
                delay: index * 0.03,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              type: "keyframes",
              stiffness: 200,
              damping: 50,
            }}
          >
            {dropdownOptions.map((option) => (
              <motion.div
                key={option}
                className="dropdown-option"
                onClick={() => {
                  setIsOpenAction(false);
                }}
              >
                {option}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
