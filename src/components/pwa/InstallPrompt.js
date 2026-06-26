"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect if already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone
    ) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);

      console.log("✅ JO-Tech Learn installed.");
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, []);

  if (isInstalled || !deferredPrompt) {
    return null;
  }

  const installApp = async () => {
    deferredPrompt.prompt();

    const { outcome } =
      await deferredPrompt.userChoice;

    console.log("Install prompt:", outcome);

    setDeferredPrompt(null);
  };

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-2xl bg-blue-900 p-5 text-white shadow-2xl">

      <h3 className="text-lg font-bold">
        Install JO-Tech Learn
      </h3>

      <p className="mt-2 text-sm text-blue-100">
        Install JoTech Learn for faster access, offline learning,
        and an app-like experience.
      </p>

      <div className="mt-5 flex gap-3">

        <button
          onClick={installApp}
          className="rounded-xl bg-orange-500 px-5 py-2 font-semibold hover:bg-orange-600 transition"
        >
          Install
        </button>

        <button
          onClick={() => setDeferredPrompt(null)}
          className="rounded-xl border border-white/20 px-5 py-2 hover:bg-white/10 transition"
        >
          Not Now
        </button>

      </div>

    </div>
  );
}