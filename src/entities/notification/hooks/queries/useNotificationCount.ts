'use client';

import { useQuery } from '@tanstack/react-query';

import { getNotificationCount } from '../../api/get';
import { notificationQueryKey } from './notificationQueryKey';

export const useNotificationCount = (enabled: boolean = true) => {
  return useQuery({
    queryKey: notificationQueryKey.count(),
    queryFn: getNotificationCount,
    staleTime: 1000 * 30, // 30초간 캐시 유지
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
  });
};
