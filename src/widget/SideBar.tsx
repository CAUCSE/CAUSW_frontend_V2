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

        <div className="max-xl:hidden">
          <ProfileImage src={profileImage} />
        </div>
        <div className="mr-2 flex flex-col items-end xl:mr-0 xl:items-center">
          <SubHeader big>{name}</SubHeader>
          <SubHeader gray>{email}</SubHeader>
        </div>

        <div className="mt-6 w-full flex-col rounded-lg border border-yellow-500 bg-white px-3 py-3 shadow-md max-xl:hidden">
          <Link href="/occasion">
            <div className="flex gap-2 pl-1 text-xl text-black">
              <img src="/icons/ringing_bell.svg" alt="알림 아이콘" className="h-7.5 w-6 pt-1" />
              <span>알림</span>
            </div>
          </Link>
          <ul className="mt-3 space-y-2 rounded-lg bg-gray-200 p-1">
            {[1, 2, 3, 4].map((_, index) => (
              <li key={index} className="flex items-center gap-3 rounded-lg bg-white p-1">
                <img src="/icons/unread_message.svg" alt="읽지 않은 알림 아이콘" className="h-6 w-6 pl-1 pt-1" />{' '}
                <div className="flex flex-col text-sm text-gray-600">
                  <p className="text-l text-black">학생회 공지 게시판</p>
                  <p>새 게시물 공지입니다.</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 w-full rounded-lg border border-yellow-500 bg-white px-3 py-3 shadow-md max-xl:hidden">
          <Link href="/occasion">
            <div className="flex gap-2 pl-1 text-xl text-black">
              <img src="/icons/ringing_bell.svg" alt="알림 아이콘" className="h-7.5 w-6 pt-1" />
              <span>최근 경조사 알림</span>
            </div>
          </Link>
          <ul className="mt-3 space-y-2 rounded-lg bg-gray-200 p-1">
            {[1, 2, 3, 4].map((_, index) => (
              <li key={index} className="flex items-center gap-3 rounded-lg bg-white p-1">
                <img src="/icons/unread_message.svg" alt="읽지 않은 알림 아이콘" className="h-6 w-6 pl-1 pt-1" />
                <div className="flex flex-col text-sm text-gray-600">
                  <p className="text-l text-black">졸업동(17) - 결혼</p>
                  <p>2025.03.10 ~ 2025.03.11.</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
