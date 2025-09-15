'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import * as gtag from '@/shared/lib/gtag';

export const GA = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    gtag.pageview(url);
  }, [pathname, searchParams]);

  return null;
};
