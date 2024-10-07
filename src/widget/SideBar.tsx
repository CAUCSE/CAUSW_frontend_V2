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
  const { getMe } = UserService();
  const { signout } = AuthRscService();

  const md = useLayoutStore((state) => state.md);
  const sm = useLayoutStore((state) => state.sm);

  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const profileImage = useUserStore((state) => state.profileImageUrl);

  const handleNoRefresh = async () => {
    await signout();
    location.href = "/auth/signin";
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <div className="fixed right-0 top-0 flex h-28 w-full items-center justify-end space-y-4 pr-4 xl:h-screen xl:w-72 xl:flex-col xl:justify-center">
        <div className="absolute left-2 top-3 flex flex-col items-center text-black xl:left-52 xl:top-11">
          <span
            className="icon-[codicon--sign-out] text-2xl xl:text-4xl"
            onClick={() => {
              handleNoRefresh();
            }}
          ></span>
          <span className="text-xs text-black underline xl:text-sm">
            로그아웃
          </span>
        </div>

        {sm || md ? null : <ProfileImage src={profileImage} />}
        <div className="mr-2 flex flex-col items-end xl:mr-0 xl:items-center">
          <Header wide>{name}</Header>
          <SubHeader gray>{email}</SubHeader>
        </div>
        {sm || md ? <ProfileImage src={profileImage} /> : null}
      </div>
    </>
  );
};
