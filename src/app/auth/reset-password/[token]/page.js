"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useParams,
  useRouter,
} from "next/navigation";

import axios from "axios";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [confirm, setConfirm] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return setError(
        "Passwords do not match"
      );
    }

    setLoading(true);
    setError("");

    try {

      await axios.post(
        `https://jo-tech-b7lk.onrender.com/api/auth/reset-password/${token}`,
        {
          password
        }
      );

      setSuccess(true);

      setTimeout(() => {
        router.push("/auth/login");
      }, 2500);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        "Password reset failed"
      );

    } finally {

      setLoading(false);

    }
  };

  // =====================================
  // SUCCESS SCREEN
  // =====================================
  if (success) {
    return (
      <div className="min-h-screen bg-[#0F3D91] flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-white">
              Joel Consult
            </h1>

            <p className="text-orange-300 mt-2">
              Tech Learning Platform
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">

            <div className="text-6xl mb-4">
              🎉
            </div>

            <h2 className="text-3xl font-bold text-green-600">
              Password Updated
            </h2>

            <p className="text-gray-600 mt-4">
              Your password has been reset
              successfully.
            </p>

            <p className="text-gray-500 mt-2">
              Redirecting you to login...
            </p>

          </div>

          <p className="text-center text-white/80 text-sm mt-6">
            Learn. Build. Grow.
          </p>

        </div>

      </div>
    );
  }

  // =====================================
  // RESET FORM
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

        {/* Form Card */}
        <form
          onSubmit={handleReset}
          className="bg-white rounded-2xl shadow-xl p-8"
        >

          <h2 className="text-3xl font-bold text-[#0F3D91] text-center">
            Reset Password
          </h2>

          <p className="text-gray-600 text-center mt-2 mb-8">
            Enter your new password below.
          </p>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-100 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* New Password */}
          <div className="mb-5">

            <label className="block text-sm font-semibold text-[#0F3D91] mb-2">
              New Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0F3D91]"
            />

          </div>

          {/* Confirm Password */}
          <div className="mb-6">

            <label className="block text-sm font-semibold text-[#0F3D91] mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              required
              value={confirm}
              onChange={(e) =>
                setConfirm(
                  e.target.value
                )
              }
              placeholder="Confirm new password"
              className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0F3D91]"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EA7A15] hover:bg-[#D96D0F] text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Updating Password..."
              : "Reset Password"}
          </button>

          <div className="mt-8 text-center">

            <p className="text-gray-600">
              Remembered your password?{" "}
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