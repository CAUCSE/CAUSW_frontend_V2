"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const ErrorListener = ({ error }: { error: string | null }) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push("/signin");
    }
  }, [error]);

  return null;
};
