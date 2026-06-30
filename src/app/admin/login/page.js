"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API =
  "https://jo-tech-b7lk.onrender.com/api";

export default function AdminLoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================
  // REDIRECT IF ALREADY LOGGED IN
  // =====================================

  useEffect(() => {

    const token =
      localStorage.getItem(
        "admin_token"
      );

    const user =
      localStorage.getItem(
        "admin_user"
      );

    if (
      token &&
      user
    ) {
      router.replace("/admin");
    }

  }, [router]);

  // =====================================
  // LOGIN
  // =====================================

  const handleLogin =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      try {

        const response =
          await axios.post(
            `${API}/auth/login`,
            {
              email,
              password
            }
          );

        if (
          !response.data.success
        ) {

          throw new Error(
            response.data.message ||
            "Login failed."
          );

        }

        const token =
          response.data.token;

        const user =
          response.data.user;

        // =====================================
        // ADMIN CHECK
        // =====================================

        if (
          user.role !==
          "admin"
        ) {

          throw new Error(
            "You are not authorized to access the Admin Panel."
          );

        }

        // =====================================
        // STORE SESSION
        // =====================================

        localStorage.setItem(
          "admin_token",
          token
        );

        localStorage.setItem(
          "admin_user",
          JSON.stringify(user)
        );

        router.replace(
          "/admin"
        );

      } catch (err) {

        console.error(
          err
        );

        setError(

          err.response?.data
            ?.message ||

          err.message ||

          "Unable to login."

        );

      } finally {

        setLoading(false);

      }

    };

  // =====================================
  // PAGE
  // =====================================

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        {/* Logo */}

        <div className="flex justify-center">

          <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">

            <span className="text-4xl">
              🛡️
            </span>

          </div>

        </div>

        {/* Heading */}

        <h1 className="mt-6 text-center text-4xl font-black text-blue-900">

          Admin Panel

        </h1>

        <p className="mt-3 text-center text-gray-500">

          Sign in to manage the Jo-Tech Learning Platform.

        </p>

        {/* Error */}

        {error && (

          <div className="mt-6 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">

            {error}

          </div>

        )}

        {/* Form */}

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-6"
        >

          {/* Email */}

          <div>

            <label className="block text-sm font-semibold text-blue-900 mb-2">

              Email Address

            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="admin@example.com"
            />

          </div>

          {/* Password */}

          <div>

            <label className="block text-sm font-semibold text-blue-900 mb-2">

              Password

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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="********"
            />

          </div>

          {/* Button */}

          <button
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white rounded-xl py-4 font-semibold transition"
          >

            {

              loading

                ? "Signing In..."

                : "Login"

            }

          </button>

        </form>

        {/* Footer */}

        <div className="mt-10 text-center text-sm text-gray-400">

          © {new Date().getFullYear()} Jo-Tech Learning Platform

        </div>

      </div>

    </div>

  );

}