"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import authService from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await authService.login({
        email,
        password,
      });

      if (!res.success) {
        setError(
          res.message || "Invalid credentials"
        );
        return;
      }

      login(res.token, res.user);

      router.push("/dashboard");

    } catch (error) {

      console.error(error);

      setError(
        "Unable to login. Please try again, or Register if this is your first time."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-[#0F3D91] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-md">

        {/* Logo / Branding */}
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
            Welcome Back
          </h2>

          <p className="text-gray-600 text-center mt-2 mb-8">
            Login to continue your learning journey
          </p>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-100 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">

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

          {/* Password */}
          <div className="mb-3">

            <label className="block text-sm font-semibold text-[#0F3D91] mb-2">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0F3D91]"
            />

          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">

            <Link
              href="/auth/forgot-password"
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F3D91] hover:bg-[#0C3277] text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          {/* Register */}
          <div className="mt-8 text-center">

            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-orange-600 hover:text-orange-700"
              >
                Register
              </Link>
            </p>

          </div>

        </form>

        {/* Footer */}
        <p className="text-center text-white/80 text-sm mt-6">
          Learn. Build. Grow.
        </p>

      </div>

    </div>
  );
}