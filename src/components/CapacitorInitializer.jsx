"use client";

import { useEffect } from "react";

import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";

import { initializeStatusBar } from "@/lib/capacitor/statusBar";
import { initializeBackButton } from "@/lib/capacitor/backButton";

export default function CapacitorInitializer() {

    useEffect(() => {

        if (!Capacitor.isNativePlatform()) return;

        async function initialize() {

            await initializeStatusBar();

            initializeBackButton();

            await SplashScreen.hide();

        }

        initialize();

    }, []);

    return null;

}