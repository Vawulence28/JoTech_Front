import { Capacitor } from "@capacitor/core";
import { Network } from "@capacitor/network";

export function initializeNetworkListener(onStatusChange) {
  if (!Capacitor.isNativePlatform()) return;

  Network.addListener("networkStatusChange", status => {
    onStatusChange(status.connected);
  });
}