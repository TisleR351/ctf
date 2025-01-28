"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./page.css";
import React from "react";
import SignupForm from "@/modules/signup-form/signupForm";
import Background from "@/components/background/background";

export default function SignUp() {
  return (
    <>
      <Background />
      <SignupForm />
    </>
  );
}
