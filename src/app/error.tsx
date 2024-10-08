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
import Link from "next/link";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const router = useRouter();
  const { signout } = AuthRscService();
  const { updateAccess } = AuthRscService();

  const handleNoRefresh = async () => {
    await signout();
    location.href = "/auth/signin";
  };

  const handleNoAccesss = async () => {
    const refresh = await getRscRefresh();
    if (!refresh) {
      handleNoRefresh();
    } else {
      try {
        await updateAccess(refresh);
        const timer = setTimeout(() => {
          reset();
        }, 1000);
        return () => clearTimeout(timer);
      } catch {
        handleNoRefresh();
      }
    }
  };

  useEffect(() => {
    if (noAccessTokenCode.includes(error.message)) {
      handleNoAccesss();
    } else if (noPermissionCode.includes(error.message))
      router.push("/no-permission");
    else if (noRefreshTokenCode.includes(error.message)) {
      handleNoRefresh();
    }
  }, [error]);

  if (allErrorCode.includes(error.message)) return <LoadingComponent />;

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-xl font-bold">
      <Image
        src="/images/puang-proud.png"
        alt="404"
        width={200}
        height={250}
      ></Image>
      <span>일시적으로 서비스를 이용할 수 없습니다.</span>

      <button
        className="mt-3 h-12 w-60 rounded-xl bg-focus text-center text-lg text-white"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        다시 시도하기
      </button>

      <Link
        className="mt-3 flex h-12 w-60 items-center justify-center rounded-xl bg-error text-lg text-white"
        href={"/auth/signin"}
      >
        로그인 페이지로 이동하기
      </Link>
    </div>
  );
};

export default Error;
