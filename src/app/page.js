import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">
        JoTech Learning Platform
      </h1>

      <p className="mt-4 text-gray-600">
        The best powered learning roadmaps and progress tracking for any course or skill.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/auth/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Login
        </Link>

        <Link
          href="/auth/register"
          className="px-6 py-3 border rounded-lg"
        >
          Register
        </Link>
      </div>
    </main>
  );
}