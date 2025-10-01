import { Capacitor } from "@capacitor/core";

export const isNativeApp = (): boolean => {
  return Capacitor.isNativePlatform();
};

export const isDesktop = (): boolean => {
  return Capacitor.getPlatform() === 'web';
};

export const isIOS = (): boolean => {
  return Capacitor.getPlatform() === 'ios';
};
