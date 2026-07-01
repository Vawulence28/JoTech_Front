"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

// ==========================================
// PAGE TITLES
// ==========================================

const pageTitles = {
  "/admin": "Dashboard",
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/analytics": "Analytics",
  "/admin/leaderboard": "Leaderboards",
  "/admin/telegram": "Telegram",
  "/admin/certificates": "Certificates",
  "/admin/settings": "Settings",
};

// ==========================================
// HEADER
// ==========================================

export default function Header({
  admin,
  onMenuClick,
}) {
  const pathname = usePathname();

  const [currentTime, setCurrentTime] = useState(
    new Date()
  );

  // ==========================================
  // LIVE CLOCK
  // ==========================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ==========================================
  // PAGE TITLE
  // ==========================================

  const title = useMemo(() => {
    const exact = pageTitles[pathname];

    if (exact) return exact;

    if (pathname.startsWith("/admin/users"))
      return "Users";

    if (pathname.startsWith("/admin/analytics"))
      return "Analytics";

    if (pathname.startsWith("/admin/leaderboard"))
      return "Leaderboards";

    if (pathname.startsWith("/admin/certificates"))
      return "Certificates";

    if (pathname.startsWith("/admin/telegram"))
      return "Telegram";

    if (pathname.startsWith("/admin/settings"))
      return "Settings";

    return "Admin Panel";
  }, [pathname]);

  // ==========================================
  // INITIALS
  // ==========================================

  const initials = useMemo(() => {
    if (!admin?.full_name) return "AD";

    return admin.full_name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }, [admin]);

  // ==========================================
  // UI
  // ==========================================

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">

      <div className="flex h-20 items-center justify-between px-4 md:px-8">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          {/* Mobile Menu */}

          <button
            onClick={onMenuClick}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 lg:hidden"
          >
            <span className="text-2xl">☰</span>
          </button>

          <div>

            <h1 className="text-2xl md:text-3xl font-black text-blue-900">
              {title}
            </h1>

            <p className="text-sm text-gray-500">

              Welcome back,&nbsp;

              <span className="font-semibold">

                {admin?.full_name ??
                  "Administrator"}

              </span>

            </p>

          </div>

        </div>

        {/* SEARCH */}

        <div className="hidden xl:block w-[420px]">

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-gray-300 px-5 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
          />

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          {/* Notification */}

          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100">

            🔔

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

          </button>

          {/* Clock */}

          <div className="hidden md:block text-right">

            <p className="text-sm text-gray-500">
              {currentTime.toLocaleDateString()}
            </p>

            <p className="font-semibold text-blue-900">
              {currentTime.toLocaleTimeString()}
            </p>

          </div>

          {/* Avatar */}

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-lg font-bold text-white shadow">

            {initials}

          </div>

        </div>

      </div>

    </header>
  );
}