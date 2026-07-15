import { Capacitor } from "@capacitor/core";

import { App } from "@capacitor/app";

export function initializeBackButton() {

    if (!Capacitor.isNativePlatform()) return;

    App.addListener("backButton", () => {

        if (window.history.length > 1) {

            window.history.back();

        } else {

            App.exitApp();

        }

    });

}