"use client";

import { useEffect, useRef, useState } from "react";

import { useResponseFormStore } from "@/shared";

export const useTruncateQuestion = () => {
  const form = useResponseFormStore((state) => state.form);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [isTruncated, setIsTruncated] = useState<boolean[]>([]);

  const checkTruncate = () => {
    if (form) {
      const truncateStatus = form.questionResponseDtoList.map((_, idx) => {
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
  }, [form]);

  return { textRefs, isTruncated };
};
