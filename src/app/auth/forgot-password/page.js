"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleRequest = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "https://jo-tech-b7lk.onrender.com/api/auth/forgot-password",
        {
          email,
        }
      );

      setSent(true);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRequest();
  };

  const resendLink = async () => {
    await handleRequest();
  };

  // =====================================
  // SUCCESS SCREEN
  // =====================================
  if (sent) {
    return (
      <div className="min-h-screen bg-[#0F3D91] flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          {/* Branding */}
          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-white">
              Joel Consult
            </h1>

            <p className="text-orange-300 mt-2">
              Tech Learning Platform
            </p>

          </div>

          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">

            <div className="text-6xl mb-4">
              📩
            </div>

            <h2 className="text-3xl font-bold text-[#0F3D91]">
              Check Telegram
            </h2>

            <p className="text-gray-600 mt-4">
              If your account exists, a password
              reset link has been sent to your
              linked Telegram account.
            </p>

            <button
              onClick={resendLink}
              disabled={loading}
              className="w-full mt-8 bg-[#EA7A15] hover:bg-[#D96D0F] text-white py-3 rounded-lg font-semibold transition"
            >
              {loading
                ? "Resending..."
                : "Resend Reset Link"}
            </button>

            <p className="text-sm text-gray-500 mt-4">
              Maximum of 3 requests per hour.
            </p>

            <div className="mt-6">
              <Link
                href="/auth/login"
                className="text-[#0F3D91] font-semibold hover:underline"
              >
                Back to Login
              </Link>
            </div>

          </div>

          <p className="text-center text-white/80 text-sm mt-6">
            Learn. Build. Grow.
          </p>

        </div>

      </div>
    );
  }

  // =====================================
  // REQUEST FORM
  // =====================================
  return (
    <div className="min-h-screen bg-[#0F3D91] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-md">

        {/* Branding */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            Joel Consult
          </h1>

          <p className="text-orange-300 mt-2">
            Tech Learning Platform
          </p>

        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >

          <h2 className="text-3xl font-bold text-[#0F3D91] text-center">
            Forgot Password
          </h2>

          <p className="text-gray-600 text-center mt-2 mb-8">
            Enter your email address and we'll
            send a reset link to your Telegram.
          </p>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-100 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">

            <label className="block text-sm font-semibold text-[#0F3D91] mb-2">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0F3D91]"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EA7A15] hover:bg-[#D96D0F] text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

          <div className="mt-8 text-center">

            <p className="text-gray-600">
              Remember your password?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[#EA7A15] hover:text-[#D96D0F]"
              >
                Login
              </Link>
            </p>

          </div>

        </form>

        <p className="text-center text-white/80 text-sm mt-6">
          Learn. Build. Grow.
        </p>

      </div>

    </div>
  );
}