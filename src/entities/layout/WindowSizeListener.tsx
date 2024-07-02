"use client";

import { useEffect } from "react";
import { useLayoutStore, breakpoint } from "@/shared";

export const WindowSizeListener = () => {
  const setBreakpoint = useLayoutStore((state) => state.setBreakpoint);

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(
        window.innerWidth < breakpoint.sm
          ? "sm"
          : window.innerWidth < breakpoint.md
          ? "md"
          : window.innerWidth < breakpoint.lg
          ? "lg"
          : "xl"
      );
    };

    window.addEventListener("resize", handleResize);

    //Initial settings
    setBreakpoint(
      window.innerWidth < breakpoint.sm
        ? "sm"
        : window.innerWidth < breakpoint.md
        ? "md"
        : window.innerWidth < breakpoint.lg
        ? "lg"
        : "xl"
    );

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
};
