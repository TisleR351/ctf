"use client";
import Divider from "@/app/components/divider/divider";
import ProfileDropdown from "@/app/components/sub-menu/profile-menu/profile-dropdown/profileDropdown";
import ProfileCredits from "@/app/components/sub-menu/profile-menu/profile-credits/profileCredits";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProfileMenu() {
  const [name, setName] = useState("MR");
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);

  return (
    <motion.div
      className="sub-menu"
      layout
      onMouseEnter={() => {
        setName("Mathis RANSON");
      }}
      onMouseLeave={() => {
        setName("MR");
        setIsDropDownOpened(false);
      }}
    >
      <ProfileCredits />
      <Divider direction="vertical" className="sub-menu-divider" />
      <ProfileDropdown
        name={name}
        setIsOpenAction={setIsDropDownOpened}
        isOpen={isDropDownOpened}
      />
    </motion.div>
  );
}
