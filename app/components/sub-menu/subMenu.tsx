"use client";
import "./subMenu.css";
import ProfileMenu from "@/app/components/sub-menu/profile-menu/profileMenu";
import { useState } from "react";
import LoginMenu from "@/app/components/sub-menu/login-menu/loginMenu";

export default function SubMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className={"sub-menu"}>
      {isLoggedIn ? <ProfileMenu /> : <LoginMenu />}
    </div>
  );
}
