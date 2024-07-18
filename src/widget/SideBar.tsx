"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

import { ProfileImage } from "@/entities";
import { UserService, AuthRscService } from "@/shared";

export const SideBar = () => {
  const firstRouter = `/${usePathname().split("/")[1]}`;
  const router = useRouter();
  const { getUserInfo } = UserService();
  const { signout } = AuthRscService();

  useEffect(() => {
    getUserInfo();
  }, []);

  if (firstRouter === "/auth") return null;

  return (
    <>
      <div className="w-72 h-screen fixed top-0 right-0 bg-white flex flex-col justify-center items-center space-y-10">
        <ProfileImage />
      </div>
      <div className="absolute flex flex-col items-center top-11 right-11 text-black">
        <span
          className="icon-[codicon--sign-out] text-4xl"
          onClick={() => {
            signout();
          }}
        ></span>
        <span className="text-sm text-black underline">로그아웃</span>
      </div>
    </>
  );
};
