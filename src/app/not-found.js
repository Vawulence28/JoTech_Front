import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-xl text-center">

        <div className="text-8xl mb-6">📚</div>

        <h1 className="text-5xl font-bold text-blue-900">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-5 text-gray-600 leading-7">
          The page you are looking for doesn't exist, may have been moved,
          or the link you followed is no longer available.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/"
            className="bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition"
          >
            Go Home
          </Link>

          <Link
            href="/dashboard"
            className="border border-blue-900 text-blue-900 px-6 py-3 rounded-xl hover:bg-blue-900 hover:text-white transition"
          >
            Dashboard
          </Link>

        </div>

      </div>
    </main>
  );
}