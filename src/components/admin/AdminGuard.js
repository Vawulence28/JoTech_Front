"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

// ==========================================
// ADMIN GUARD
// ==========================================
//
// Protects all Admin pages by:
//
// 1. Checking for an admin token
// 2. Verifying the token with the backend
// 3. Confirming the authenticated user is an admin
// 4. Redirecting unauthenticated users
//
// ==========================================

export default function AdminGuard({
  children,
}) {

  const router = useRouter();

  const [checking, setChecking] =
    useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  // ==========================================
  // VERIFY ADMIN
  // ==========================================

  useEffect(() => {

    verifyAdmin();

  }, []);

  async function verifyAdmin() {

    try {

      const token =
        localStorage.getItem(
          "admin_token"
        );

      if (!token) {

        router.replace(
          "/admin/login"
        );

        return;

      }

      // Backend middleware verifies JWT
      // and confirms role === admin

      const {
        data
      } = await API.get(
        "/admin/dashboard"
      );

      if (
        data?.success === true
      ) {

        setAuthorized(true);

      } else {

        localStorage.removeItem(
          "admin_token"
        );

        router.replace(
          "/admin/login"
        );

      }

    } catch (error) {

      console.error(
        "Admin authentication failed:",
        error
      );

      localStorage.removeItem(
        "admin_token"
      );

      router.replace(
        "/admin/login"
      );

    } finally {

      setChecking(false);

    }

  }

  // ==========================================
  // LOADING
  // ==========================================

  if (checking) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="w-14 h-14 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h2 className="text-2xl font-bold text-blue-900">
            Loading Admin Panel...
          </h2>

          <p className="mt-3 text-gray-500">
            Verifying administrator credentials.
          </p>

        </div>

      </div>

    );

  }

  // ==========================================
  // BLOCK RENDERING
  // ==========================================

  if (!authorized) {

    return null;

  }

  // ==========================================
  // RENDER ADMIN PAGE
  // ==========================================

  return children;

}