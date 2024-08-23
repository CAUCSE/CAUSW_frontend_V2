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

  const md = useLayoutStore((state) => state.md);

  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);

  const handleNoRefresh = async () => {
    await signout();
    location.href = "auth/signin";
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div
        className="w-full h-28 fixed top-0 right-0 flex justify-end items-center space-y-4 pr-4 
        lg:w-72 lg:h-screen lg:flex-col lg:justify-center"
      >
        <div
          className="absolute flex flex-col items-center top-3 left-2 text-black 
          lg:top-11 lg:left-52"
        >
          <span
            className="icon-[codicon--sign-out] text-2xl lg:text-4xl"
            onClick={() => {
              handleNoRefresh();
            }}
          ></span>
          <span
            className="text-xs text-black underline 
            lg:text-sm"
          >
            로그아웃
          </span>
        </div>

        {md ? null : <ProfileImage />}
        <div className="flex flex-col items-center">
          <Header wide>{name}</Header>
          <SubHeader gray>{email}</SubHeader>
        </div>
        {md ? <ProfileImage /> : null}
      </div>
    </>
  );
};
