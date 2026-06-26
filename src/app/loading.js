export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">

        <div className="h-14 w-14 mx-auto rounded-full border-4 border-blue-900 border-t-transparent animate-spin"></div>

        <p className="mt-6 text-blue-900 font-medium">
          Loading JoTech Learn...
        </p>

      </div>
    </main>
  );
}