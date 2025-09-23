'use client';

import { useEffect, useState } from 'react';

import { Capacitor } from '@capacitor/core';
import clsx from 'clsx';

import { VTwoForm } from '@/widgets/auth/ui';
import { NavigationBar, SideBar } from '@/widgets/pageLayout';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      setIsIOS(Capacitor.getPlatform() === 'ios');
    }
  }, []);
  return (
    <>
      <VTwoForm />
      <div
        className={clsx(
          'grid h-screen w-full xl:grid-cols-[10rem_1fr_18rem] xl:grid-rows-none',

          isIOS ? 'grid-rows-[3.4375rem_1fr_5rem]' : 'grid-rows-[3.4375rem_1fr_4rem]',
        )}
      >
        {' '}
        <NavigationBar className="relative hidden h-full w-full xl:block" />
        <SideBar className="relative flex h-full w-full items-center justify-end xl:hidden" />
        <main className="h-full w-full overflow-y-auto rounded-3xl bg-[#F8F8F8]">{children}</main>
        <SideBar className="relative hidden h-full w-full flex-col items-center justify-center xl:flex xl:px-2" />
        <NavigationBar className="block h-full w-full xl:hidden" isIOS={isIOS} />
      </div>
    </>
  );
}
