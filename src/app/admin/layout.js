"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import AdminGuard from "@/components/admin/AdminGuard";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function AdminLayout({
  children,
}) {
  const router = useRouter();

  const pathname = usePathname();

  const [loading, setLoading] =
    useState(true);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [admin, setAdmin] =
    useState(null);

  // =====================================
  // LOAD ADMIN SESSION
  // =====================================

  useEffect(() => {
    if (typeof window === "undefined")
      return;

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

    const storedUser =
      localStorage.getItem(
        "admin_user"
      );

    if (storedUser) {
      try {
        setAdmin(
          JSON.parse(storedUser)
        );
      } catch {
        localStorage.removeItem(
          "admin_user"
        );
      }
    }

    setLoading(false);
  }, [router]);

  // =====================================
  // CLOSE SIDEBAR WHEN PAGE CHANGES
  // =====================================

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">

        <div className="text-center">

          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>

          <p className="mt-6 font-semibold text-blue-900">
            Loading Admin Panel...
          </p>

        </div>

      </div>
    );
  }

  // =====================================
  // PAGE
  // =====================================

  return (
    <AdminGuard>

      <div className="min-h-screen bg-slate-100">

        <Sidebar
          open={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

        <div className="min-h-screen lg:ml-72">

          <Header
            admin={admin}
            onMenuClick={() =>
              setSidebarOpen(true)
            }
          />

          <main className="p-4 md:p-6 lg:p-8">

            {children}

          </main>

        </div>

      </div>

    </AdminGuard>
  );
}
