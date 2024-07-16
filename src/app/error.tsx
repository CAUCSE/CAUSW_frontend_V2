"use client";

//TODO//
//에러 페이지 JSX 업데이트 필요

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  useLayoutStore,
  noUserInfoCode,
  noRefreshTokenCode,
  noAccessTokenCode,
  noPermissionCode,
} from "@/shared";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const router = useRouter();
  const setErrorMessage = useLayoutStore((state) => state.setErrorMessage);

  useEffect(() => {
    console.error(error);
    if (noAccessTokenCode.includes(error.message)) router.push("/auth/signin");
  }, [error, router, setErrorMessage]);

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
};

export default Error;
