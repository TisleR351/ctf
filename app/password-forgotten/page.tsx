"use client";

import "./page.css";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BaseLayout from "@/modules/layout/layout";
import MainInput from "@/components/main-input/mainInput";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State variables
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Ensure token is set on the client only
  useEffect(() => {
    setToken(searchParams.get("token") || "");
  }, [searchParams]);

  // Handle input changes
  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>):
    React.ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      setter(event.target.value);
    };

  // Handle password reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Password must contain at least one uppercase letter and one number.");
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

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout>
      <div className="reset-password-container">
        <h2 className="reset-password-title">Reset Your Password</h2>
        <form onSubmit={handleResetPassword} className="reset-password-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Password has been reset successfully.</div>}
          <div className="form-group">
            <MainInput
              label="New Password"
              type="password"
              id="password"
              value={password}
              onChange={handleChange(setPassword)}
              placeholder="Enter your new password"
              required
              minLength={8}
              className="input-black-text" // Utilisation de la classe existante
            />
          </div>
          <div className="form-group">
            <MainInput
              label="Confirm New Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange(setConfirmPassword)}
              placeholder="Confirm your new password"
              required
              minLength={8}
              className="input-black-text" // Utilisation de la classe existante
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="reset-password-button"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </BaseLayout>
  );
}
