"use client";
import "./subMenu.css";
import ProfileMenu from "@/modules/profile-menu/profileMenu";
import { useState } from "react";
import LoginMenu from "@/components/login-menu/loginMenu";

export default function SubMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className={!isLoggedIn ? "sub-menu not-logged-in" : "sub-menu"}>
      {isLoggedIn ? <ProfileMenu /> : <LoginMenu />}
    </div>
  );
}
