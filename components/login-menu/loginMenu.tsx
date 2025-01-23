"use client";
import "./loginMenu.css";

import Divider from "@/components/divider/divider";
import LoginMenuButton from "@/components/login-menu-button/loginMenuButton";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faRebel } from "@fortawesome/free-brands-svg-icons";

export default function LoginMenu() {
  return (
    <div className={"login-menu"}>
      <LoginMenuButton
        icon={faRightToBracket}
        href={"/signin"}
        label={"Sign in"}
      />
      <Divider direction={"vertical"} className="sub-menu-divider" />
      <LoginMenuButton icon={faRebel} href={"/signup"} label={"Sign up"} />
    </div>
  );
}
