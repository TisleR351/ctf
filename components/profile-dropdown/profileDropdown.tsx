"use client";
import "./profileDropdown.css";
import { useRef } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { faPeopleGroup, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const dropdownOptions = [
    {
      label: "My team ",
      onClick: () => {
        setIsOpenAction(false);
      },
      icon: faPeopleGroup,
    },
    {
      label: "Sign out",
      onClick: () => {
        setIsOpenAction(false);
        sessionStorage.removeItem("token");
        window.location.reload();
      },
      icon: faSignOut,
    },
  ];

  return (
    <div className="profile-button-container">
      <motion.button
        layout
        onClick={() => setIsOpenAction(!isOpen)}
        className={`profile-button ${isOpen ? "hover-open" : ""} ${className || ""}`.trim()}
        {...props}
      >
        <motion.div key={name} layout ref={textRef}>
          {letters?.map((letter, index) => (
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
                key={option.label}
                className="dropdown-option"
                onClick={option.onClick}
              >
                <FontAwesomeIcon icon={option.icon} />
                {option.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
