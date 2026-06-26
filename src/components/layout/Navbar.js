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

  const publicLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  const privateLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Roadmap",
      href: "/roadmap",
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
    },
    {
      label: "Profile",
      href: "/profile",
    },
  ];

  const navLinks = user ? privateLinks : publicLinks;

  const linkClass = (href) =>
    pathname === href
      ? "text-orange-400 font-semibold"
      : "text-white hover:text-orange-300 transition";

  return (
    <nav className="sticky top-0 z-50 bg-blue-900 border-b border-blue-800 shadow-sm text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-16 flex items-center justify-between">

          {/* LOGO */}

          <Link
            href={user ? "/dashboard" : "/"}
            className="text-2xl font-bold tracking-tight"
          >
            JO<span className="text-orange-400">-Tech</span> Learn
          </Link>

          {/* DESKTOP NAVIGATION */}

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

          {/* RIGHT SIDE */}

          <div className="hidden md:flex items-center gap-5">

            {user && (
              <div className="text-right">

                <p className="text-sm font-semibold">
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
                className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-xl font-medium transition"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-3">

                <Link
                  href="/auth/login"
                  className="border border-white/40 hover:border-orange-400 px-5 py-2 rounded-xl transition"
                >
                  Login
                </Link>

                <Link
                  href="/auth/register"
                  className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-xl font-medium transition"
                >
                  Register
                </Link>

              </div>
            )}

          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-3xl"
          >
            {open ? "✕" : "☰"}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {open && (

        <div className="md:hidden bg-blue-900 border-t border-blue-800">

          <div className="px-6 py-5 space-y-5">

            {user && (

              <div className="border-b border-blue-800 pb-4">

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
                className={`block text-lg ${
                  pathname === item.href
                    ? "text-orange-400 font-semibold"
                    : "text-white hover:text-orange-300"
                }`}
              >
                {item.label}
              </Link>

            ))}

            {user ? (

              <button
                onClick={handleLogout}
                className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-medium transition"
              >
                Logout
              </button>

            ) : (

              <div className="space-y-3">

                <Link
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  className="block text-center border border-white/40 py-3 rounded-xl"
                >
                  Login
                </Link>

                <Link
                  href="/auth/register"
                  onClick={() => setOpen(false)}
                  className="block text-center bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-medium transition"
                >
                  Register
                </Link>

              </div>

            )}

          </div>

        </div>

      )}

    </nav>
  );
}