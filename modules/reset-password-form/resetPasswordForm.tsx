"use client";

import "./resetPasswordForm.css";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SignupFormInput from "@/components/signup-form-input/signupFormInput";
import { Message } from "@/components/message/message";
import { MessageEnums } from "@/utils/enums/MessageEnums";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setToken(searchParams.get("token") || "");
  }, [searchParams]);

  const validatePassword = (password: string) => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
    );
  };

  const matchPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!passwordMatch) {
      setError("Passwords do not match.");
      return;
    }

    if (!passwordValid) {
      setError(
        "Password must be at least 8 characters long, contain at least one uppercase letter and one number.",
      );
      return;
    }

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset password.");
        return;
      }

      setSuccess(true);
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleResetPassword} className="reset-password-content">
        <div className={"reset-password-title"}>Reset your password</div>
        <div className={"signup-form-password-input"}>
          <SignupFormInput
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordValid(validatePassword(e.target.value));
            }}
            required
            className={!passwordValid ? "error" : ""}
          />
          {!passwordValid && password.length > 0 && (
            <div className="password-error-message">
              The password must contain at least 12 characters, one uppercase,
              lowercase, number and special character.
            </div>
          )}
        </div>
        <div className={"signup-form-password-input"}>
          <SignupFormInput
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordMatch(matchPassword(password, e.target.value));
            }}
            required
            className={!passwordMatch ? "error" : ""}
          />
          {!passwordMatch && confirmPassword.length > 0 && (
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
            className="reset-password-message"
          />
        )}
        {success && (
          <Message
            key="success"
            type={MessageEnums.SUCCESS}
            message="Password has been reset successfully."
            className="reset-password-message"
          />
        )}
        <button
          type="submit"
          disabled={loading || !passwordMatch || !passwordValid}
          className="reset-password-button"
        >
          {loading ? "Resetting..." : "Reset"}
        </button>
      </form>
    </div>
  );
}
