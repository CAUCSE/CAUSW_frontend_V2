'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useNotificationTabParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = tabParam === 'ceremony' ? 1 : 0;

  const setActiveTab = (tabIndex: number) => {
    const tabKey = tabIndex === 1 ? 'ceremony' : 'general';
    router.push(`${pathname}?tab=${tabKey}`, { scroll: false });
  };

  return { activeTab, setActiveTab };
};
