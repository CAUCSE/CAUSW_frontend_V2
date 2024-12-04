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
    //await signout();
    //location.href = "/auth/signin";
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
    else {
      handleNoRefresh();
    }
  }, [error]);

  return <LoadingComponent />;
};

export default Error;
