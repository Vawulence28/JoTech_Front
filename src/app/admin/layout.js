"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminGuard from "@/components/admin/AdminGuard";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function AdminLayout({
  children
}) {

  const router =
    useRouter();

  const [admin, setAdmin] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // LOAD ADMIN
  // =====================================

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "admin_user"
      );

    const storedToken =
      localStorage.getItem(
        "admin_token"
      );

    if (
      !storedUser ||
      !storedToken
    ) {

      router.replace(
        "/admin/login"
      );

      return;

    }

    try {

      const user =
        JSON.parse(
          storedUser
        );

      setAdmin(user);

    } catch {

      localStorage.removeItem(
        "admin_user"
      );

      localStorage.removeItem(
        "admin_token"
      );

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
  // PAGE
  // =====================================

  return (

    <AdminGuard>

      <div className="min-h-screen bg-slate-100">

        {/* Sidebar */}

        <Sidebar />

        {/* Content */}

        <div className="lg:ml-72">

          <Header
            admin={admin}
          />

          <main className="p-8">

            {children}

          </main>

        </div>

      </div>

    </AdminGuard>

  );

}