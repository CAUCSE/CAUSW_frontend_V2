import { create } from "zustand";

export const useLayoutStore = create<Layout.UseLayoutStore>((set, get) => ({
  windowWidthState: "FULL",
  setWindowWidthState: (windowWidthState) =>
    set({ windowWidthState: windowWidthState }),
}));
