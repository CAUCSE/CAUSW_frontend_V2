"use client";

import { useEffect, useRef, useState } from "react";

export const useTruncateParagraph = <T>(data?: T[]) => {
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [isTruncated, setIsTruncated] = useState<boolean[]>([]);

  const checkTruncate = () => {
    if (data) {
      const truncateStatus = data.map((_, idx) => {
        const element = textRefs.current[idx];
        if (element) {
          return element.scrollWidth > element.clientWidth;
        }
        return false;
      });
      setIsTruncated(truncateStatus);
    }
  };

  useEffect(() => {
    checkTruncate();
    window.addEventListener("resize", checkTruncate);
    return () => {
      window.removeEventListener("resize", checkTruncate);
    };
  }, [data]);

  return { textRefs, isTruncated };
};
