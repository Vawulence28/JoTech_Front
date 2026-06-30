"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

// ==========================================
// ADMIN GUARD
// ==========================================
//
// Protects every Admin page.
//
// Flow
// -----
// 1. Ensure JWT exists
// 2. Verify token
// 3. Confirm user role = admin
// 4. Show loading while checking
// 5. Redirect unauthorized users
//
// Usage:
//
// <AdminGuard>
//     <Dashboard />
// </AdminGuard>
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

  useEffect(() => {
    verifyAdmin();
  }, []);

  async function verifyAdmin() {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      const response =
        await api.get(
          "/api/admin/dashboard"
        );

      if (
        response.data?.success === true
      ) {
        setAuthorized(true);
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.error(
        "Admin authentication failed:",
        error
      );

      localStorage.removeItem("token");

      router.replace("/login");
    } finally {
      setChecking(false);
    }
  }

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">

          <div className="w-14 h-14 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h2 className="text-xl font-semibold text-blue-900">
            Verifying Administrator
          </h2>

          <p className="mt-2 text-gray-500">
            Please wait...
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
  // ALLOW ACCESS
  // ==========================================

  return children;
}