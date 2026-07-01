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
    href: "/admin",
  },
  {
    name: "Users",
    icon: "👥",
    href: "/admin/users",
  },
  {
    name: "Analytics",
    icon: "📈",
    href: "/admin/analytics",
  },
  {
    name: "Leaderboards",
    icon: "🏆",
    href: "/admin/leaderboard",
  },
  {
    name: "Telegram",
    icon: "🤖",
    href: "/admin/telegram",
  },
  {
    name: "Certificates",
    icon: "🎓",
    href: "/admin/certificates",
  },
  {
    name: "Settings",
    icon: "⚙️",
    href: "/admin/settings",
  },
];

// ==========================================
// COMPONENT
// ==========================================

export default function Sidebar({
  open = false,
  onClose = () => {},
}) {
  const pathname = usePathname();

  const router = useRouter();

  // ==========================================
  // LOGOUT
  // ==========================================

  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    router.replace("/admin/login");
  }

  // ==========================================
  // ACTIVE MENU
  // ==========================================

  function isActive(href) {
    if (href === "/admin") {
      return (
        pathname === "/admin" ||
        pathname === "/admin/dashboard"
      );
    }

    return pathname.startsWith(href);
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      {/* Mobile Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/40 z-40
          transition-opacity duration-300
          lg:hidden
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Sidebar */}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-white border-r border-gray-200
          shadow-xl
          flex flex-col

          transform transition-transform duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* Header */}

        <div className="border-b px-6 py-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900 text-2xl text-white">

                🎓

              </div>

              <div>

                <h2 className="text-2xl font-black text-blue-900">

                  Jo-Tech

                </h2>

                <p className="text-sm text-gray-500">

                  Admin Panel

                </p>

              </div>

            </div>

            {/* Mobile Close */}

            <button
              onClick={onClose}
              className="lg:hidden text-3xl text-gray-500 hover:text-red-500"
            >
              ×
            </button>

          </div>

        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <div className="space-y-2">

            {menu.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-4
                    rounded-xl
                    px-5
                    py-4
                    text-base
                    font-semibold
                    transition-all

                    ${
                      active
                        ? "bg-blue-900 text-white shadow-lg"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    }
                  `}
                >
                  <span className="text-2xl">
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </Link>
              );
            })}

          </div>

        </nav>

        {/* Footer */}

        <div className="border-t p-6">

          <button
            onClick={logout}
            className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            🚪 Logout
          </button>

        </div>

      </aside>
    </>
  );
}