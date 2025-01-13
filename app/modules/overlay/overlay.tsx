"use client";
import "./overlay.css";
import MainMenu from "@/app/components/main-menu/mainMenu";
import ProfileMenu from "@/app/components/profile-menu/profileMenu";
import { useState } from "react";
import SubMenu from "@/app/components/login-menu/subMenu";

export default function Overlay() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="overlay">
      <div className="main-menu-container">
        <MainMenu />
      </div>
      <div className="sub-menu-container">
        {isLoggedIn ? <ProfileMenu /> : <SubMenu />}
      </div>
    </div>
  );
}
