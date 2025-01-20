"use client";
import "./loginMenu.css";

import Divider from "@/components/divider/divider";
import LoginMenuButton from "@/components/login-menu-button/loginMenuButton";

export default function LoginMenu() {
  return (
    <div className={"login-menu"}>
      <LoginMenuButton
        icon={"fa-right-to-bracket"}
        href={"/signin"}
        label={"Sign in"}
      />
      <Divider direction={"vertical"} className="sub-menu-divider" />
      <LoginMenuButton icon={"fa-dragon"} href={"/signup"} label={"Sign up"} />
    </div>
  );
}
