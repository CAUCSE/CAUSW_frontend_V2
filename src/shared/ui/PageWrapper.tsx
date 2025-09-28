'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const backgroundClass = useMemo(() => {
    if (pathname.startsWith('/contacts') || pathname.startsWith('/home')) {
      return 'bg-white';
    }
    return 'bg-slate-100';
  }, [pathname]);

  return <main className={`w-full min-h-screen ${backgroundClass}`}>{children}</main>;
};
