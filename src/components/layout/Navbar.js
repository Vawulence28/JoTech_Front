"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/auth/login");
  };

  const navLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Roadmap",
      href: "/roadmap",
    },
    {
      label: "Create Roadmap",
      href: "/onboarding",
    },
    {
      label: "Profile",
      href: "/profile",
    },
  ];

  const linkClass = (href) =>
    pathname === href
      ? "text-orange-400 font-semibold"
      : "text-white hover:text-orange-300 transition";

  return (
    <nav className="sticky top-0 z-50 bg-blue-900 text-white border-b border-blue-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-16 flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/dashboard"
            className="text-2xl font-bold"
          >
            Jo<span className="text-orange-400">Tech</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}

          </div>

          {/* USER AREA */}
          <div className="hidden md:flex items-center gap-4">

            {user && (
              <div className="text-right">
                <p className="text-sm font-medium">
                  {user.full_name}
                </p>

                <p className="text-xs text-blue-200">
                  Learner
                </p>
              </div>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl font-medium transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl font-medium transition"
              >
                Login
              </Link>
            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            {open ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-blue-900 border-t border-blue-800">

          <div className="px-6 py-4 space-y-4">

            {user && (
              <div className="pb-4 border-b border-blue-800">
                <p className="font-semibold">
                  {user.full_name}
                </p>

                <p className="text-sm text-blue-200">
                  Learner
                </p>
              </div>
            )}

            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block ${
                  pathname === item.href
                    ? "text-orange-400 font-semibold"
                    : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-orange-500 py-3 rounded-xl font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="block text-center bg-orange-500 py-3 rounded-xl font-medium"
              >
                Login
              </Link>
            )}

          </div>

        </div>
      )}
    </nav>
  );
}