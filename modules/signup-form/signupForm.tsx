"use client";

import "./signupForm.css";

import React, { useState } from "react";
import { Message } from "@/components/message/message";
import { MessageEnums } from "@/utils/enums/MessageEnums";
import SignupFormInput from "@/components/signup-form-input/signupFormInput";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;
    return passwordRegex.test(password);
  };

  const matchPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordValid && passwordMatch) {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Sign up successfully !");
        setError("");
        setTimeout(() => {
          window.location.href = "/signin";
        }, 1000);
      } else {
        setError(data.error || "Unkown error");
        setMessage("");
      }
    }
  };

  return (
    <form className={"signup-form-container"} onSubmit={handleSubmit}>
      <div className={"signup-form-content"}>
        <div className={"signup-form-title"}>Sign up</div>
        <SignupFormInput
          label={"email"}
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <SignupFormInput
          label={"username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <div className={"signup-form-password-input"}>
          <SignupFormInput
            label={"password"}
            type={"password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordValid(validatePassword(e.target.value));
            }}
            required={true}
            className={!passwordValid ? "error" : ""}
          />
          {!passwordValid && password.length > 0 && (
            <div className="password-error-message">
              The password must contain at least 12 characters, one uppercase,
              lowercase, number and special character.
            </div>
          )}
        </div>
        <div className={"signup-form-confirm-password-input"}>
          <SignupFormInput
            label={"confirm password"}
            type={"password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordMatch(matchPassword(e.currentTarget.value, password));
            }}
            required={true}
            className={!passwordMatch ? "error" : ""}
          />
          {!passwordMatch && password.length > 0 && (
            <div className="password-error-message">
              Passwords don&#39;t match
            </div>
          )}
        </div>
        {error && (
          <Message
            key={error}
            type={MessageEnums.ERROR}
            message={error}
            className={"signup-message"}
          />
        )}
        {message && (
          <Message
            key={message}
            type={MessageEnums.SUCCESS}
            message={message}
            className={"signup-message"}
          />
        )}
        <button
          type={"submit"}
          className={"signup-form-submit-button"}
          disabled={!passwordMatch || !passwordValid}
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
