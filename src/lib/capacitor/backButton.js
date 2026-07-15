import { Capacitor } from "@capacitor/core";

let initialized = false;

export async function initializeBackButton() {
  if (!Capacitor.isNativePlatform()) return;

  if (initialized) return;
  initialized = true;

  const { App } = await import("@capacitor/app");

  App.addListener("backButton", () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      App.exitApp();
    }
  });
}