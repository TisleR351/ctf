import "@fortawesome/fontawesome-free/css/all.min.css";
import "./page.css";
import React from "react";
import Background from "@/components/background/background";
import SigninForm from "@/modules/signin-form/signinForm";

export default function Signin() {
  return (
    <>
      <Background />
      <SigninForm />
    </>
  );
}
