'use client';

import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { cn } from '@/shadcn/lib/utils';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const backgroundClass = useMemo(() => {
    if (
      pathname.startsWith('/contacts') ||
      pathname.startsWith('/home') ||
      pathname.startsWith('/setting') ||
      pathname.startsWith('/board')
    ) {
      return 'bg-white';
    }
    return 'bg-slate-100';
  }, [pathname]);

  return <div className={cn('min-h-screen w-full', backgroundClass)}>{children}</div>;
};
