"use client";
import "./profileMenu.css";

import Divider from "@/components/divider/divider";
import ProfileDropdown from "@/components/profile-dropdown/profileDropdown";
import ProfileCredits from "@/components/profile-credits/profileCredits";
import { HTMLAttributes, useState } from "react";
import { motion } from "framer-motion";

interface ProfileMenuProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

export default function ProfileMenu({ name }: ProfileMenuProps) {
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);
  const [displayedName, setDisplayedName] = useState<string>(name);

  return (
    <>
      <motion.div
        className="sub-menu"
        layout
        onMouseEnter={() => {
          setDisplayedName(name);
        }}
        onMouseLeave={() => {
          setDisplayedName("Me");
          setIsDropDownOpened(false);
        }}
      >
        <ProfileCredits />
        <Divider direction="vertical" className="sub-menu-divider" />
        <ProfileDropdown
          name={displayedName}
          setIsOpenAction={setIsDropDownOpened}
          isOpen={isDropDownOpened}
        />
      </motion.div>
    </>
  );
}
