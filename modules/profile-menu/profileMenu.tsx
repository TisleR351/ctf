"use client";
import "./profileMenu.css";

import Divider from "@/components/divider/divider";
import ProfileDropdown from "@/components/profile-dropdown/profileDropdown";
import ProfileCredits from "@/components/profile-credits/profileCredits";
import { useState } from "react";
import { motion } from "framer-motion";
import { CreateChallengeSection } from "@/modules/create-challenge-section/createChallengeSection";
import { usePathname } from "next/navigation";

export default function ProfileMenu() {
  const [name, setName] = useState("MR");
  const [isAdmin, setIsAdmin] = useState(true);
  const pathname = usePathname();
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);

  return (
    <>
      {isAdmin && pathname === "/challenge" && <CreateChallengeSection />}
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
    </>
  );
}
