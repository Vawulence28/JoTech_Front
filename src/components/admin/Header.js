"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

// ==========================================
// PAGE TITLES
// ==========================================

const pageTitles = {
  "/admin": "Dashboard",
  "/admin/users": "Users",
  "/admin/analytics": "Analytics",
  "/admin/leaderboard": "Leaderboards",
  "/admin/telegram": "Telegram",
  "/admin/certificates": "Certificates",
  "/admin/settings": "Settings"
};

// ==========================================
// HEADER
// ==========================================

export default function Header({

  admin

}) {

  const pathname =
    usePathname();

  const [currentTime,
    setCurrentTime] =
    useState(new Date());

  useEffect(() => {

    const timer =
      setInterval(() => {

        setCurrentTime(
          new Date()
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  const title =
    useMemo(() => {

      return (
        pageTitles[pathname] ||
        "Admin Panel"
      );

    }, [pathname]);

  const initials =
    useMemo(() => {

      if (!admin?.full_name) {

        return "A";

      }

      return admin.full_name

        .split(" ")

        .map(
          word =>
            word.charAt(0)
        )

        .join("")

        .substring(0, 2)

        .toUpperCase();

    }, [admin]);

  // ==========================================
  // PAGE
  // ==========================================

  return (

    <header className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-30">

      <div className="flex items-center justify-between">

        {/* LEFT */}

        <div>

          <h1 className="text-3xl font-black text-blue-900">

            {title}

          </h1>

          <p className="mt-1 text-gray-500">

            Welcome back,
            {" "}
            <span className="font-semibold">

              {admin?.full_name ||
                "Administrator"}

            </span>

          </p>

        </div>

        {/* CENTER */}

        <div className="hidden lg:block w-[420px]">

          <input

            type="text"

            placeholder="Search users, certificates, roadmaps..."

            className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-orange-400"

          />

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          {/* CLOCK */}

          <div className="hidden md:block text-right">

            <p className="text-sm text-gray-500">

              {currentTime.toLocaleDateString()}

            </p>

            <p className="font-semibold text-blue-900">

              {currentTime.toLocaleTimeString()}

            </p>

          </div>

          {/* AVATAR */}

          <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-lg shadow">

            {initials}

          </div>

        </div>

      </div>

    </header>

  );

}