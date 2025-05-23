"use client";

import "./signinForm.css";
import SignupFormInput from "@/components/signup-form-input/signupFormInput";
import Link from "next/link";
import React, { useState } from "react";
import { Message } from "@/components/message/message";
import { MessageEnums } from "@/utils/enums/MessageEnums";
import Cookies from "js-cookie";

export default function SigninForm() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    setError("");
    setMessage("");
    e.preventDefault();

    if (!emailOrUsername || !password) {
      setError("Both fields are required.");
      setMessage("");
      return;
    }

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Sign in successful!");
        setError("");
        sessionStorage.setItem("token", data.token);
        Cookies.set("token", data.token, {
          expires: 7,
          domain: ".ectf.fr",
          secure: true,
          path: "/",
        });

        setTimeout(() => {
          window.location.href = "/challenge";
        }, 1000);
      } else {
        setError(data.error || "Invalid credentials.");
        setMessage("");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setMessage("");
    }
  };

  return (
    <div className={"signin-form-container"}>
      <form className={"signin-form-content"} onSubmit={handleSubmit}>
        <div className={"signin-form-title"}>Sign in</div>
        <SignupFormInput
          label={"email or username"}
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required={true}
        />
        <SignupFormInput
          label={"password"}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <Link
          href={"/password-forgotten"}
          className={"signin-form-forgotten-password"}
        >
          password forgotten?
        </Link>
        {error && (
          <Message
            key={error}
            type={MessageEnums.ERROR}
            message={error}
            className={"signin-message"}
          />
        )}
        {message && (
          <Message
            key={message}
            type={MessageEnums.SUCCESS}
            message={message}
            className={"signin-message"}
          />
        )}
        <button
          type={"submit"}
          className={"signin-form-submit-button"}
          disabled={!emailOrUsername || !password}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
