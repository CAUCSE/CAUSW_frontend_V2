'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Bell, LogOut, Mail } from 'lucide-react';

import { NotificationWidget } from '@/fsd_widgets/notification';

import { getNotificationCount } from '@/fsd_entities/notification';
import { useUserInfo } from '@/fsd_entities/user';
import { useMyInfoStore } from '@/fsd_entities/user';

import { ProfileImage } from '@/fsd_shared/ui';

import { SubHeader, tokenManager } from '@/fsd_shared';
import { Button } from '@/shadcn/components/ui';

interface SideBarProps {
  className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
  const { updateMyInfoStore } = useUserInfo();
  const { signoutAndRedirect } = tokenManager();

  const name = useMyInfoStore((state) => state.name);
  const email = useMyInfoStore((state) => state.email);
  const profileImage = useMyInfoStore((state) => state.profileImageUrl);

  const [alarmCount, setAlarmCount] = useState<number>(0);
  const messageCount: number = 0;

  useEffect(() => {
    updateMyInfoStore();
  }, []);

  const userId = useMyInfoStore((state) => state.id);

  useEffect(() => {
    if (!userId) return;

    const fetchNotificationCount = async () => {
      try {
        const count = await getNotificationCount();
        setAlarmCount(count);
      } catch (e) {
        console.error('Failed to fetch notification count:', e);
      }
    };

    fetchNotificationCount();
  }, [userId]);

  return (
    <aside className={className}>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-3 left-3 flex cursor-pointer flex-col gap-2 p-0 text-black shadow-none xl:top-4 xl:right-4 xl:left-auto"
        onClick={signoutAndRedirect}
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

      {/* 20250803 기획 중단으로 주석처리 */}
      {/* <Button
        size="icon"
        variant="ghost"
        className="absolute top-3 left-22 flex cursor-pointer flex-col gap-2 p-0 text-black shadow-none xl:hidden"
        asChild
      >
        <Link href="/chat">
          <Mail className="size-6" />
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
