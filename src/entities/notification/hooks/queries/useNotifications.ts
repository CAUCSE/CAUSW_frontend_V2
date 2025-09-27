'use client';

import { useQuery } from '@tanstack/react-query';

import { getNotifications } from '../../api/get';
import { notificationQueryKey } from './notificationQueryKey';

export const useNotifications = (enabled: boolean = true) => {
  return useQuery({
    queryKey: notificationQueryKey.top4.general(),
    queryFn: getNotifications,
    staleTime: 1000 * 60 * 2, // 2분간 캐시 유지
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
  });
};
