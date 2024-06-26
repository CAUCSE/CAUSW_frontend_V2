declare namespace Layout {
  //Store
  export interface UseLayoutStore {
    windowWidth: number;
    setWindowWidth: (width: number) => void;
    isMobileScreen: () => boolean;
    isHalfScreen: () => boolean;
    isFullScreen: () => boolean;
  }
}
