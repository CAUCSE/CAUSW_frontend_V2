'use client';

import Link from 'next/link';

import { Bell } from 'lucide-react';

import { NotificationWidget } from '@/widgets/notification';

import { useNotificationCount } from '@/entities/notification';
import { useUserProfile } from '@/entities/user';

import { ProfileImage } from '@/shared/ui';

import { Button } from '@/shadcn/components/ui';
import { SubHeader } from '@/shared';

interface SideBarProps {
  className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
  const { data: userInfo } = useUserProfile();

  const name = userInfo?.name || '';
  const email = userInfo?.email || '';
  const profileImage = userInfo?.profileImageUrl || '';

  const { data: alarmCount = 0 } = useNotificationCount();

  return (
    <aside className={className}>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-3 left-3 flex cursor-pointer flex-col gap-2 p-0 text-black shadow-none xl:hidden"
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
      <Link href="/contacts/profile" className="cursor-pointer max-xl:hidden">
        <ProfileImage src={profileImage} />
      </Link>
      <Link
        href="/contacts/profile"
        className="mr-2 flex cursor-pointer flex-col items-center xl:mr-0 xl:items-center"
      >
        <SubHeader big>{name}</SubHeader>
        <SubHeader gray>{email}</SubHeader>
      </Link>
      <Link href="/contacts/profile" className="mr-3 cursor-pointer xl:hidden">
        <ProfileImage src={profileImage} />
      </Link>

      <NotificationWidget />
    </aside>
  );
};
