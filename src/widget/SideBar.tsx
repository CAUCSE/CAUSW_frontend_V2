"use client";

import { useEffect } from "react";

import { ProfileImage, Header, SubHeader } from "@/entities";
import { UserService, useUserStore, AuthRscService } from "@/shared";

export const SideBar = () => {
  const { getUserInfo } = UserService();
  const { signout } = AuthRscService();

  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="w-72 h-screen fixed top-0 right-0 flex flex-col justify-center items-center space-y-4">
        <div className="absolute flex flex-col items-center top-11 right-11 text-black">
          <span
            className="icon-[codicon--sign-out] text-4xl"
            onClick={() => {
              signout();
            }}
          ></span>
          <span className="text-sm text-black underline">로그아웃</span>
        </div>
        <ProfileImage />
        <div className="flex flex-col items-center">
          <Header wide>{name}</Header>
          <SubHeader gray>{email}</SubHeader>
        </div>
      </div>
    </>
  );
};
