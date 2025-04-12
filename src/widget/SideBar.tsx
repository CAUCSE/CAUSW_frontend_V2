'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { NotificationWidget } from '@/fsd_widgets/notification';

import { ProfileImage, SubHeader } from '@/entities';
import { AuthRscService, UserService, useUserStore } from '@/shared';

export const SideBar = () => {
  const { getMe } = UserService();
  const { signout } = AuthRscService();

  const name = useUserStore(state => state.name);
  const email = useUserStore(state => state.email);
  const profileImage = useUserStore(state => state.profileImageUrl);

  const handleNoRefresh = async () => {
    await signout();
    location.href = '/auth/signin';
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="fixed -top-1 right-0 flex h-[55px] w-full items-center justify-end space-y-4 pr-4 xl:h-screen xl:w-72 xl:flex-col xl:justify-center">
      <div className="absolute left-3 top-4 flex flex-col items-center text-black xl:left-52 xl:top-11">
        <span
          className="icon-[codicon--sign-out] text-2xl xl:text-4xl"
          onClick={() => {
            handleNoRefresh();
          }}
        ></span>
        <span className="hidden text-xs text-black underline xl:block xl:text-sm">로그아웃</span>
      </div>

      <div className="absolute left-12 top-0 flex flex-col items-center text-black xl:hidden">
        <Link href="/occasion">
          <span className="text-black-400 icon-[codicon--bell] text-2xl"></span>
        </Link>
      </div>

      <div className="max-xl:hidden">
        <ProfileImage src={profileImage} />
      </div>
      <div className="mr-2 flex flex-col items-end xl:mr-0 xl:items-center">
        <SubHeader big>{name}</SubHeader>
        <SubHeader gray>{email}</SubHeader>
      </div>

      <div className="xl:hidden">
        <ProfileImage src={profileImage} />
      </div>

      <NotificationWidget />
    </div>
  );
};
