"use client";

import "./signinForm.css";

import SignupFormInput from "@/components/signup-form-input/signupFormInput";
import Link from "next/link";
import React, { useState } from "react";
import { Message } from "@/components/message/message";
import { MessageEnums } from "@/public/enums/MessageEnums";

export default function SigninForm() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
        setTimeout(() => {
          window.location.href = "/challenge";
        }, 1000);
      } else {
        setError(data.error || "Invalid credentials.");
        setMessage("");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
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
          href={"/forgotten-password"}
          className={"signin-form-forgotten-password"}
        >
          password forgotten?
        </Link>
        {error && (
          <Message
            type={MessageEnums.ERROR}
            message={error}
            className={"signin-message"}
          />
        )}
        {message && (
          <Message
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
