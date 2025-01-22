"use client";
import "./loginMenu.css";

import Divider from "@/components/divider/divider";
import LoginMenuButton from "@/components/login-menu-button/loginMenuButton";
import { faDragon, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function LoginMenu() {
  return (
    <div className={"login-menu"}>
      <LoginMenuButton
        icon={faRightToBracket}
        href={"/signin"}
        label={"Sign in"}
      />
      <Divider direction={"vertical"} className="sub-menu-divider" />
      <LoginMenuButton icon={faDragon} href={"/signup"} label={"Sign up"} />
    </div>
  );
}
