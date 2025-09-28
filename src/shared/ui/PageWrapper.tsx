'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { cn } from '@/shadcn/lib/utils';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const backgroundClass = useMemo(() => {
    if (pathname.startsWith('/contacts') || pathname.startsWith('/home')) {
      return 'bg-white';
    }
    return 'bg-slate-100';
  }, [pathname]);

  return (
    <main className={cn('w-full min-h-screen', backgroundClass)}>
      {children}
    </main>
  );
};