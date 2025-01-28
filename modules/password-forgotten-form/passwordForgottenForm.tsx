"use client";

import React, { useState } from "react";
import SignupFormInput from "@/components/signup-form-input/signupFormInput";
import { Message } from "@/components/message/message";
import { MessageEnums } from "@/utils/enums/MessageEnums";
import "./passwordForgottenForm.css";

export default function PasswordForgottenForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/password-forgotten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to send reset link. Please try again.",
        );
      }

      setMessage("A reset link has been sent to your email.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(
          error.message || "An error occurred. Please try again later.",
        );
      } else {
        setMessage("An unknown error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="password-forgotten-form-container">
      <form className="password-forgotten-form-content" onSubmit={handleSubmit}>
        <div className="password-forgotten-form-title">Insert your email</div>
        <SignupFormInput
          label="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        {message && (
          <Message
            key={message}
            type={MessageEnums.SUCCESS}
            message={message}
            className="password-forgotten-message"
          />
        )}
        <button
          type="submit"
          className="password-forgotten-submit-button"
          disabled={!email}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
