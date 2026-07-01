"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminGuard from "@/components/admin/AdminGuard";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function AdminLayout({
  children,
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // CHECK ADMIN TOKEN
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

    setLoading(false);
  }, [router]);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">

          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-6 text-blue-900 font-semibold">
            Loading Admin Panel...
          </p>

        </div>
      </div>
    );
  }

  // =====================================
  // ADMIN LAYOUT
  // =====================================

  return (
    <AdminGuard>

      <div className="min-h-screen bg-slate-100">

        {/* Sidebar */}

        <Sidebar />

        {/* Main Content */}

        <div className="lg:ml-72 min-h-screen">

          <Header />

          <main className="p-8">
            {children}
          </main>

        </div>

      </div>

    </AdminGuard>
  );
}