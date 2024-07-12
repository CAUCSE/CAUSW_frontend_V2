"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  numberMatch,
  noRefreshTokenCode,
  noAccessTokenCode,
  noPermissionCode,
} from "@/shared";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);

    if (noAccessTokenCode.includes(error.message)) router.push("/signin");
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
