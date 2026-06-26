"use client";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">

      <h1 className="text-3xl font-bold text-blue-900">
        You are offline
      </h1>

      <p className="mt-3 text-gray-600">
        Please check your internet connection and try again.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 bg-blue-900 text-white px-6 py-3 rounded-xl"
      >
        Retry
      </button>

    </div>
  );
}