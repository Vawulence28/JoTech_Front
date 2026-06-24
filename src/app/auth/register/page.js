"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import authService from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await authService.register({
        full_name,
        email,
        password,
      });

      if (!res.success) {
        setError(
          res.message || "Registration failed"
        );
        return;
      }

      login(res.token, res.user);

      router.push("/dashboard");

    } catch (error) {

      console.error(error);

      setError(
        "Unable to create account. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

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

        {/* Registration Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >

          <h2 className="text-3xl font-bold text-[#0F3D91] text-center">
            Create Account
          </h2>

          <p className="text-gray-600 text-center mt-2 mb-8">
            Start your learning journey today
          </p>

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-100 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div className="mb-5">

            <label className="block text-sm font-semibold text-[#0F3D91] mb-2">
              Full Name
            </label>

            <input
              type="text"
              required
              value={full_name}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0F3D91]"
            />

          </div>

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
          <div className="mb-6">

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
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0F3D91]"
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EA7A15] hover:bg-[#D96D0F] text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

          {/* Login Link */}
          <div className="mt-8 text-center">

            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[#EA7A15] hover:text-[#D96D0F]"
              >
                Login
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