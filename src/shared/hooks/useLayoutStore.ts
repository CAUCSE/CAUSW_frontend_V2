import { create } from 'zustand';

export const useLayoutStore = create<Layout.UseLayoutStore>((set) => ({
  sm: false,
  md: false,
  lg: false,
  xl: true,
  setBreakpoint: (breakpoint) => {
    const init = {
      sm: false,
      md: false,
      lg: false,
      xl: false,
    };
    init[breakpoint] = true;
    set(() => init);
  },

  errorMessage: false,
  setErrorMessage: (message) => {
    set(() => ({ errorMessage: message }));
  },
}));
