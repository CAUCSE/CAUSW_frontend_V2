"use client";

import { useEffect } from "react";
import { useLayoutStore } from "@/shared";

const HALFSCREEN = 1200;
const MOBILESCREEN = 600;

export const WindowSizeListener = () => {
  const setWindowWidthState = useLayoutStore(
    (state) => state.setWindowWidthState
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidthState(
        window.innerWidth < MOBILESCREEN
          ? "MOBILE"
          : window.innerWidth < HALFSCREEN
          ? "HALF"
          : "FULL"
      );
    };

    window.addEventListener("resize", handleResize);

    //Initial settings
    setWindowWidthState(
      window.innerWidth < MOBILESCREEN
        ? "MOBILE"
        : window.innerWidth < HALFSCREEN
        ? "HALF"
        : "FULL"
    );

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
};
