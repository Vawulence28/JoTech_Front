"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardMetrics } from "@/services/adminApi";

// ==========================================
// ADMIN GUARD
// ==========================================
//
// Protects all Admin pages.
//
// Responsibilities
// ----------------
// • Check for admin token
// • Verify token with backend
// • Ensure authenticated user is an admin
// • Redirect unauthorized users
//
// ==========================================

export default function AdminGuard({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  // ==========================================
  // VERIFY ADMIN SESSION
  // ==========================================

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        if (typeof window === "undefined") return;

        const token = localStorage.getItem("admin_token");

        if (!token) {
          router.replace("/admin/login");
          return;
        }

        // Backend validates JWT + admin role
        const response = await getDashboardMetrics();

        if (response?.success) {
          setAuthorized(true);
        } else {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");

          router.replace("/admin/login");
        }
      } catch (error) {
        console.error("Admin authentication failed:", error);

        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");

        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [router]);

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">

          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-900 border-t-transparent"></div>

          <h1 className="mt-6 text-2xl font-bold text-blue-900">
            Loading Admin Panel...
          </h1>

          <p className="mt-2 text-gray-500">
            Verifying administrator credentials.
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // UNAUTHORIZED
  // ==========================================

  if (!authorized) {
    return null;
  }

  // ==========================================
  // AUTHORIZED
  // ==========================================

  return <>{children}</>;
}