import { Capacitor } from "@capacitor/core";

import {
    StatusBar,
    Style
} from "@capacitor/status-bar";

export async function initializeStatusBar() {

    if (!Capacitor.isNativePlatform()) return;

    await StatusBar.setStyle({

        style: Style.Dark

    });

    await StatusBar.setBackgroundColor({

        color: "#0D1117"

    });

}