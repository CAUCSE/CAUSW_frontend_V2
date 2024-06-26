import { useEffect } from "react";
import { useLayoutStore } from "@/shared";

export const WindowSizeListener = () => {
  const setWindowWidth = useLayoutStore((state) => state.setWindowWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowWidth]);

  return null;
};
