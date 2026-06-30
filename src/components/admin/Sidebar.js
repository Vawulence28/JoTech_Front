"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// ==========================================
// SIDEBAR MENU
// ==========================================

const menu = [

  {
    name: "Dashboard",
    icon: "🏠",
    href: "/admin"
  },

  {
    name: "Users",
    icon: "👥",
    href: "/admin/users"
  },

  {
    name: "Analytics",
    icon: "📈",
    href: "/admin/analytics"
  },

  {
    name: "Leaderboards",
    icon: "🏆",
    href: "/admin/leaderboard"
  },

  {
    name: "Telegram",
    icon: "🤖",
    href: "/admin/telegram"
  },

  {
    name: "Certificates",
    icon: "🎓",
    href: "/admin/certificates"
  },

  {
    name: "Settings",
    icon: "⚙️",
    href: "/admin/settings"
  }

];

// ==========================================
// COMPONENT
// ==========================================

export default function Sidebar() {

  const pathname =
    usePathname();

  const router =
    useRouter();

  // ==========================================
  // LOGOUT
  // ==========================================

  function logout() {

    localStorage.removeItem(
      "admin_token"
    );

    localStorage.removeItem(
      "admin_user"
    );

    router.replace(
      "/admin/login"
    );

  }

  return (

    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 shadow-sm flex flex-col z-50">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="px-8 py-8 border-b">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center text-2xl">

            🎓

          </div>

          <div>

            <h2 className="font-black text-2xl text-blue-900">

              Jo-Tech

            </h2>

            <p className="text-sm text-gray-500">

              Admin Panel

            </p>

          </div>

        </div>

      </div>

      {/* ======================================
          NAVIGATION
      ====================================== */}

      <nav className="flex-1 px-5 py-8 space-y-2">

        {

          menu.map((item) => {

            const active =
              pathname === item.href;

            return (

              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all font-semibold

                ${
                  active

                  ? "bg-blue-900 text-white shadow-lg"

                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >

                <span className="text-2xl">

                  {item.icon}

                </span>

                <span>

                  {item.name}

                </span>

              </Link>

            );

          })

        }

      </nav>

      {/* ======================================
          FOOTER
      ====================================== */}

      <div className="border-t p-6">

        <button

          onClick={logout}

          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-semibold transition"

        >

          🚪 Logout

        </button>

      </div>

    </aside>

  );

}