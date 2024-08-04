"use client";

//TODO//
//에러 페이지 JSX 업데이트 필요

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  noAccessTokenCode,
  noPermissionCode,
  noRefreshTokenCode,
  allErrorCode,
  getRccRefresh,
  setRscToken,
  getRscAccess,
  getRscRefresh,
  AuthService,
  AuthRscService,
  setRscHeader,
} from "@/shared";

import { LoadingComponent } from "@/entities";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const router = useRouter();
  const { signout } = AuthService();
  const { updateAccess } = AuthRscService();

  const handleNoAccesss = async () => {
    const refresh = await getRscRefresh();
    if (!refresh) {
      signout();
    } else {
      try {
        await updateAccess(refresh);
        const timer = setTimeout(() => {
          reset();
        }, 1000);
        return () => clearTimeout(timer);
      } catch {
        signout();
      }
    }
  };

  useEffect(() => {
    if (noAccessTokenCode.includes(error.message)) {
      handleNoAccesss();
    } else if (noPermissionCode.includes(error.message))
      router.push("/no-permission");
    else if (noRefreshTokenCode.includes(error.message)) {
      signout();
    }
  }, [error]);

  if (allErrorCode.includes(error.message)) return <LoadingComponent />;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-xl font-bold">
      <Image
        src="/images/puang-proud.png"
        alt="404"
        width={200}
        height={250}
      ></Image>
      <span>일시적으로 서비스를 이용할 수 없습니다.</span>
      <button
        className="w-40 h-12 rounded-xl bg-focus text-lg text-white text-center mt-3"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try Again...
      </button>
    </div>
  );
};

export default Error;
