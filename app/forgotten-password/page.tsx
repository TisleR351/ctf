"use client";

import "./page.css";
import React, { useState } from "react";
import BaseLayout from "@/modules/layout/layout";

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail: email }), // Champ 'mail' pour correspondre au backend
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
    <BaseLayout>
      <div className="password-recovery-container">
        <h2 className="password-recovery-title">Forgot Password</h2>
        <p className="password-recovery-text">
          To reset your password, please enter your email address below.
        </p>
        <form className="password-recovery-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            className="password-recovery-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="password-recovery-button">
            Submit
          </button>
        </form>
        {message && <p className="password-recovery-message">{message}</p>}
      </div>
    </BaseLayout>
  );
}
