export const metadata = {
  title: "Offline",
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-4xl font-bold text-blue-900">
          You're Offline
        </h1>

        <p className="mt-6 text-gray-600">
          It looks like you don't have an internet connection.
          Please reconnect and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 bg-blue-900 text-white px-6 py-3 rounded-xl"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}