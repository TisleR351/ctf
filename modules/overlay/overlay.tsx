"use client";
import "./overlay.css";
import MainMenu from "@/modules/main-menu/mainMenu";
import { useState } from "react";
import ProfileMenu from "@/modules/profile-menu/profileMenu";
import LoginMenu from "@/components/login-menu/loginMenu";

export default function Overlay() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="overlay">
      <div className="main-menu-container">
        <MainMenu />
      </div>
      <div className="sub-menu-container">
        {isLoggedIn ? <ProfileMenu /> : <LoginMenu />}
      </div>
    </div>
  );
}
