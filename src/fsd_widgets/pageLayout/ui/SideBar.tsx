'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { Bell, LogOut } from 'lucide-react';

import { NotificationWidget } from '@/fsd_widgets/notification';

import { useUserInfo } from '@/fsd_entities/user';
import { useMyInfoStore } from '@/fsd_entities/user';
import { SubHeader } from '@/fsd_shared';
import { Button } from '@/shadcn/components/ui';
import { ProfileImage } from '@/fsd_shared/ui';
import { useAuthHandler } from '@/fsd_shared/hooks';

interface SideBarProps {
  className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
  const { updateMyInfoStore } = useUserInfo();
  const { redirectToLogin } = useAuthHandler();

  const name = useMyInfoStore((state) => state.name);
  const email = useMyInfoStore((state) => state.email);
  const profileImage = useMyInfoStore((state) => state.profileImageUrl);


  useEffect(() => {
    updateMyInfoStore();
  }, []);

  return (
    <aside className={className}>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-3 left-3 flex cursor-pointer flex-col gap-2 p-0 text-black shadow-none xl:top-4 xl:right-4 xl:left-auto"
        onClick={redirectToLogin}
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
          <Bell className="size-6" />
        </Link>
      </Button>

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
