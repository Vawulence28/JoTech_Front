"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>

        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

          <div className="max-w-xl text-center">

            <div className="text-7xl mb-6">
              ⚠️
            </div>

            <h1 className="text-4xl font-bold text-blue-900">
              Something went wrong
            </h1>

            <p className="mt-5 text-gray-600 leading-7">
              An unexpected error occurred while loading this page.
              Please try again. If the problem continues,
              contact JOTech Learn support.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <button
                onClick={() => reset()}
                className="bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition"
              >
                Try Again
              </button>

              <Link
                href="/dashboard"
                className="border border-blue-900 text-blue-900 px-6 py-3 rounded-xl hover:bg-blue-900 hover:text-white transition"
              >
                Dashboard
              </Link>

            </div>

          </div>

        </main>

      </body>
    </html>
  );
}