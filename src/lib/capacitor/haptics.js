import { Capacitor } from "@capacitor/core";

import {

    Haptics,
    ImpactStyle,
    NotificationType

} from "@capacitor/haptics";

export async function lightTap() {

    if (!Capacitor.isNativePlatform()) return;

    await Haptics.impact({

        style: ImpactStyle.Light

    });

}

export async function mediumTap() {

    if (!Capacitor.isNativePlatform()) return;

    await Haptics.impact({

        style: ImpactStyle.Medium

    });

}

export async function heavyTap() {

    if (!Capacitor.isNativePlatform()) return;

    await Haptics.impact({

        style: ImpactStyle.Heavy

    });

}

export async function successTap() {

    if (!Capacitor.isNativePlatform()) return;

    await Haptics.notification({

        type: NotificationType.Success

    });

}

export async function warningTap() {

    if (!Capacitor.isNativePlatform()) return;

    await Haptics.notification({

        type: NotificationType.Warning

    });

}

export async function errorTap() {

    if (!Capacitor.isNativePlatform()) return;

    await Haptics.notification({

        type: NotificationType.Error

    });

}