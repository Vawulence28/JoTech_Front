"use client";

import { useEffect, useState } from "react";

export default function OfflineBanner() {
  const [online, setOnline] = useState(true);
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      setJustReconnected(true);

      // Hide "back online" message after a short delay
      setTimeout(() => setJustReconnected(false), 3000);
    };

    const handleOffline = () => {
      setOnline(false);
      setJustReconnected(false);
    };

    setOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // ONLINE STATE (temporary "back online" message)
  if (justReconnected) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg"
      >
        You're back online ✓
      </div>
    );
  }

  // OFFLINE STATE
  if (online) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-0 left-0 right-0 z-50 bg-red-600 px-4 py-2 text-center text-sm font-medium text-white shadow-md"
    >
      You're offline. Some features may not be available.
    </div>
  );
}