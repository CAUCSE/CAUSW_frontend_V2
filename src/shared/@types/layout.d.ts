declare namespace Layout {
  //Basic
  type WindowWidthState = "MOBILE" | "HALF" | "FULL";

  //Store
  export interface UseLayoutStore {
    windowWidthState: WindowWidthState;
    setWindowWidthState: (windowWidthState: WindowWidthState) => void;
  }
}
