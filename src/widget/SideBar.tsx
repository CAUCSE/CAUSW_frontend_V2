"use client";

import { useEffect } from "react";

import { ProfileImage, Header, SubHeader } from "@/entities";
import {
  UserService,
  useUserStore,
  AuthRscService,
  useLayoutStore,
} from "@/shared";

export const SideBar = () => {
  const { getUserInfo } = UserService();
  const { signout } = AuthRscService();
  const sm = useLayoutStore((state) => state.sm);

  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="w-full md:w-72 h-28 md:h-screen fixed top-0 right-0 flex md:flex-col justify-end md:justify-center items-center space-y-4 mr-10">
        <div className="absolute flex flex-col items-center top-2 md:top-11 left-2 md:right-11 text-black">
          <span
            className="icon-[codicon--sign-out] text-2xl md:text-4xl"
            onClick={() => {
              signout();
            }}
          ></span>
          <span className="text-xs md:text-sm text-black underline">
            로그아웃
          </span>
        </div>
        {sm ? null : <ProfileImage />}
        <div className="flex flex-col items-center">
          <Header wide>{name}</Header>
          <SubHeader gray>{email}</SubHeader>
        </div>
        {sm ? <ProfileImage /> : null}
      </div>
    </>
  );
};
