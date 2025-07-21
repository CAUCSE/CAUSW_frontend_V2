'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Bell, LogOut } from 'lucide-react';

import { NotificationWidget } from '@/fsd_widgets/notification';

import { getNotificationCount } from '@/fsd_entities/notification';
import { useUserInfo } from '@/fsd_entities/user';
import { useMyInfoStore } from '@/fsd_entities/user';

import { ProfileImage, SubHeader } from '@/entities';
import { Button } from '@/shadcn/components/ui';
import { AuthRscService } from '@/shared';

interface SideBarProps {
  className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
  const { signout } = AuthRscService();
  const { updateMyInfoStore } = useUserInfo();

  const name = useMyInfoStore((state) => state.name);
  const email = useMyInfoStore((state) => state.email);
  const profileImage = useMyInfoStore((state) => state.profileImageUrl);

  const [alarmCount, setAlarmCount] = useState<number>(0);
  const messageCount: number = 0;

  const handleNoRefresh = async () => {
    await signout();
    location.href = '/auth/signin';
  };

  useEffect(() => {
    updateMyInfoStore();
  }, []);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      const count = await getNotificationCount();
      setAlarmCount(count);
    };

    fetchNotificationCount();
  }, []);

  return (
    <aside className={className}>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-3 left-3 flex cursor-pointer flex-col gap-2 p-0 text-black shadow-none xl:top-4 xl:right-4 xl:left-auto"
        onClick={handleNoRefresh}
      >
        <LogOut className="size-6 xl:size-8" />
        <p className="hidden text-xs font-light xl:block xl:text-sm">로그아웃</p>
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="absolute top-3 left-12 flex cursor-pointer flex-col gap-2 p-0 text-black shadow-none xl:hidden"
        asChild
      >
        <Link href="/setting/notification">
          <div className="relative">
            <Bell className="size-6" />
            {alarmCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 px-[2px] text-[10px] font-bold text-white">
                {alarmCount > 9 ? '9+' : alarmCount}
              </span>
            )}
          </div>
        </Link>
      </Button>

      {/* 쪽지 기능 구현될 때까지 주석 처리 */}
      {/* <Button
        size="icon"
        variant="ghost"
        className="absolute top-3 left-22 flex cursor-pointer flex-col gap-2 p-0 text-black shadow-none xl:hidden"
        asChild
      >
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault(); // 이동 막기
            alert('⚠️ 개발 중인 기능입니다.');
          }}
        >
          <div className="relative">
            <img src={'/icons/message_icon.svg'} alt="message" className="h-6 w-6 object-contain" />
            {messageCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 px-[2px] text-[10px] font-bold text-white">
                {messageCount > 9 ? '9+' : messageCount}
              </span>
            )}
          </div>
        </Link>
      </Button> */}

      <div className="max-xl:hidden">
        <ProfileImage src={profileImage} />
      </div>
      <div className="mr-2 flex flex-col items-center xl:mr-0 xl:items-center">
        <SubHeader big>{name}</SubHeader>
        <SubHeader gray>{email}</SubHeader>
      </div>

      <div className="xl:hidden">
        <ProfileImage src={profileImage} />
      </div>

      <NotificationWidget />
    </aside>
  );
};
