"use client";

//TODO//
//에러 페이지 JSX 업데이트 필요

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-xl font-bold">
      <Image
        src="/images/puang-proud.png"
        alt="404"
        width={200}
        height={250}
      ></Image>
      <span>일시적으로 서비스를 이용할 수 없습니다.</span>
      <span>문제가 지속적으로 발생하는 경우</span>
      <span>아래 이메일로 문의해주세요.</span>
      <span>( caucsedongne@gmail.com )</span>
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
