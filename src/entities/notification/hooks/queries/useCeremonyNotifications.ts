'use client';

import { useQuery } from '@tanstack/react-query';

import { getCeremonyNotifications } from '../../api/get';
import { notificationQueryKey } from './notificationQueryKey';

export const useCeremonyNotifications = (enabled: boolean = true) => {
  return useQuery({
    queryKey: notificationQueryKey.top4.ceremony(),
    queryFn: getCeremonyNotifications,
    staleTime: 1000 * 60 * 2, // 2분간 캐시 유지
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
  });
};
