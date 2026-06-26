"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration =
          await navigator.serviceWorker.register("/sw.js");

        console.log(
          "✅ Service Worker registered:",
          registration.scope
        );

        // Check immediately for updates
        registration.update();

        registration.addEventListener(
          "updatefound",
          () => {
            const newWorker =
              registration.installing;

            if (!newWorker) return;

            newWorker.addEventListener(
              "statechange",
              () => {
                if (
                  newWorker.state === "installed"
                ) {
                  if (
                    navigator.serviceWorker.controller
                  ) {
                    console.log(
                      "🚀 A new version of JO-Tech Learn is available. Refresh the page to update."
                    );
                  } else {
                    console.log(
                      "✅ JO-Tech Learn is ready for offline use."
                    );
                  }
                }
              }
            );
          }
        );
      } catch (error) {
        console.error(
          "❌ Service Worker registration failed:",
          error
        );
      }
    };

    registerServiceWorker();
  }, []);

  return null;
}