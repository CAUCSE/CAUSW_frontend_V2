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
      <div className="fixed right-0 top-0 flex h-28 w-full items-center justify-end space-y-4 pr-4 lg:h-screen lg:w-72 lg:flex-col lg:justify-center">
        <div className="absolute left-2 top-3 flex flex-col items-center text-black lg:left-52 lg:top-11">
          <span
            className="icon-[codicon--sign-out] text-2xl lg:text-4xl"
            onClick={() => {
              handleNoRefresh();
            }}
          ></span>
          <span className="text-xs text-black underline lg:text-sm">
            로그아웃
          </span>
        </div>

        {sm || md ? null : <ProfileImage />}
        <div className="mr-2 flex flex-col items-end md:mr-0 md:items-center">
          <Header wide>{name}</Header>
          <SubHeader gray>{email}</SubHeader>
        </div>
        {sm || md ? <ProfileImage /> : null}
      </div>
    </>
  );
};
