'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { ProfileImage, SubHeader } from '@/entities';
import { AuthRscService, useLayoutStore, UserService, useUserStore } from '@/shared';

interface NotificationItemProps {
  title: string;
  timeInfo: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, timeInfo }) => {
  return (
    <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 p-3 shadow">
      <div className="mr-3 text-xl text-yellow-400">📝</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{timeInfo}</p>
      </div>
    </div>
  );
};

const notifications = [
  { title: '홍길동(17) - 결혼', timeInfo: '2025.03.01' },
  { title: '홍길동(17) - 결혼', timeInfo: '2025.03.01' },
  { title: '홍길동(17) - 결혼', timeInfo: '2025.03.01' },
  { title: '홍길동(17) - 결혼', timeInfo: '2025.03.01' },
]; // 나중에 api 호출 받아오는 걸로 변경

export const SideBar = () => {
  const { getMe } = UserService();
  const { signout } = AuthRscService();

  const md = useLayoutStore(state => state.md);
  const sm = useLayoutStore(state => state.sm);

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
    <>
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
      </div>
    </>
  );
};
