"use client";
import Divider from "@/app/components/divider/divider";
import LoginMenuButton from "@/app/components/sub-menu/login-menu/login-menu-button/loginMenuButton";

export default function LoginMenu() {
  return (
    <>
      <LoginMenuButton
        icon={"fa-right-to-bracket"}
        href={"/signin"}
        label={"Sign in"}
      />
      <Divider direction={"vertical"} className="sub-menu-divider" />
      <LoginMenuButton icon={"fa-dragon"} href={"/signup"} label={"Sign up"} />
    </>
  );
}
