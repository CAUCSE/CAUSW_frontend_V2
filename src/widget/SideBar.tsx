'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { Bell, LogOut } from 'lucide-react';

import { NotificationWidget } from '@/fsd_widgets/notification';

import { ProfileImage, SubHeader } from '@/entities';
import { Button } from '@/shadcn/components/ui';
import { AuthRscService, UserService, useUserStore } from '@/shared';

interface SideBarProps {
  className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
  const { getMe } = UserService();
  const { signout } = AuthRscService();

  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const profileImage = useUserStore((state) => state.profileImageUrl);

  const handleNoRefresh = async () => {
    await signout();
    location.href = '/auth/signin';
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <aside className={className}>
      <Button
        size="icon"
        className="absolute top-3 left-3 flex cursor-pointer flex-col gap-2 border-none bg-transparent p-0 text-black shadow-none hover:bg-transparent xl:top-4 xl:right-4 xl:left-auto"
        onClick={handleNoRefresh}
      >
        <LogOut className="size-6 xl:size-8" />
        <p className="hidden text-xs font-light xl:block xl:text-sm">로그아웃</p>
      </Button>

      <Button
        size="icon"
        className="absolute top-3 left-12 border-none bg-transparent text-black shadow-none hover:bg-transparent xl:hidden"
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
