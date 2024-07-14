declare namespace Layout {
  //Basic
  type BreackPoint = "sm" | "md" | "lg" | "xl";

  //Store
  export interface UseLayoutStore {
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    setBreakpoint: (breakpoint: BreackPoint) => void;

    errorMessage: boolean | string;
    setErrorMessage: (message: boolean | string) => void;
  }
}
