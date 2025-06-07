'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

export const useNotificationTabParam = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const tabIndex = tabParam === 'ceremony' ? 1 : 0;
    setActiveTab(tabIndex);
  }, [tabParam]);

  return { activeTab, setActiveTab };
};
