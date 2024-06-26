import { create } from "zustand";

const HALFSCREEN = 1200;
const MOBILESCREEN = 600;

export const useLayoutStore = create<Layout.UseLayoutStore>((set, get) => ({
  windowWidth: window.innerWidth,
  setWindowWidth: (width) => set({ windowWidth: width }),
  isMobileScreen: () => get().windowWidth < MOBILESCREEN,
  isHalfScreen: () =>
    get().windowWidth >= MOBILESCREEN && get().windowWidth < HALFSCREEN,
  isFullScreen: () => get().windowWidth >= HALFSCREEN,
}));
