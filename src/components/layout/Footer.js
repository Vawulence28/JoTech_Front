"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Footer() {
  const pathname = usePathname();

  const { user } = useAuth();

  const year = new Date().getFullYear();

  const isAuthPage =
    pathname === "/auth/login" ||
    pathname === "/auth/register";

  const publicLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Login",
      href: "/auth/login",
    },
    {
      label: "Register",
      href: "/auth/register",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  const authenticatedLinks = [
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
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  const navigation = user
    ? authenticatedLinks
    : publicLinks;

  return (
    <footer className="bg-blue-950 text-white border-t border-blue-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}

          <div>

            <h2 className="text-2xl font-bold">
              Jo
              <span className="text-orange-400">
                Tech
              </span>
              {" "}
              Learn
            </h2>

            <p className="mt-4 text-blue-200 leading-7">
              Your personalized learning platform.
            </p>

          </div>

          {/* Navigation */}

          <div>

            <h3 className="text-lg font-semibold mb-5">
              Navigation
            </h3>

            <div className="flex flex-col gap-3">

              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-blue-200 hover:text-orange-400 transition"
                >
                  {item.label}
                </Link>
              ))}

            </div>

          </div>

          {/* Legal & Version */}

          <div>

            <h3 className="text-lg font-semibold mb-5">
              Information
            </h3>

            <div className="space-y-3">

              {isAuthPage && (
                <>
                  <Link
                    href="/privacy"
                    className="block text-blue-200 hover:text-orange-400 transition"
                  >
                    Privacy Policy
                  </Link>

                  <Link
                    href="/terms"
                    className="block text-blue-200 hover:text-orange-400 transition"
                  >
                    Terms of Service
                  </Link>
                </>
              )}

              <Link
                href="/contact"
                className="block text-blue-200 hover:text-orange-400 transition"
              >
                Contact Support
              </Link>

              <p className="text-blue-300 pt-2">
                Version
                {" "}
                <span className="font-semibold text-orange-400">
                  v1.0.0
                </span>
              </p>

            </div>

          </div>

        </div>

        <div className="border-t border-blue-900 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-blue-300 text-center md:text-left">
            © {year} JO-Tech Learn. All rights reserved.
          </p>

          <p className="text-sm text-blue-400 text-center md:text-right">
            Built with ❤️ to make learning smarter.
          </p>

        </div>

      </div>
    </footer>
  );
}