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
        md:w-72 md:h-screen md:flex-col md:justify-center"
      >
        <div
          className="absolute flex flex-col items-center top-3 left-2 text-black 
          md:top-11 md:left-52"
        >
          <span
            className="icon-[codicon--sign-out] text-2xl md:text-4xl"
            onClick={() => {
              handleNoRefresh();
            }}
          ></span>
          <span
            className="text-xs text-black underline 
            md:text-sm"
          >
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
