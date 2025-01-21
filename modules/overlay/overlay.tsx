"use client";
import "./overlay.css";
import MainMenu from "@/modules/main-menu/mainMenu";
import { useState } from "react";
import ProfileMenu from "@/modules/profile-menu/profileMenu";
import LoginMenu from "@/components/login-menu/loginMenu";
import { CreateChallengeSection } from "@/modules/create-challenge-section/createChallengeSection";
import { usePathname } from "next/navigation";

export default function Overlay() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const pathname = usePathname();

  return (
    <div className="overlay">
      <div className="main-menu-container">
        <MainMenu />
      </div>
      <div className="sub-menu-container">
        {isAdmin && pathname === "/challenge" && <CreateChallengeSection />}
        {isLoggedIn ? <ProfileMenu /> : <LoginMenu />}
      </div>
    </div>
  );
}
