'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import {
  getCeremonyNotificationData,
  getNotificationData,
} from '@/entities/notification';

import { notificationQueryKey } from './notificationQueryKey';

export const useNotificationQuery = () =>
  useInfiniteQuery({
    queryKey: notificationQueryKey.general(),
    queryFn: ({ pageParam = 0 }) => getNotificationData(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.content),
  });

export const useCeremonyNotificationQuery = () =>
  useInfiniteQuery({
    queryKey: notificationQueryKey.ceremony(),
    queryFn: ({ pageParam = 0 }) => getCeremonyNotificationData(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.content),
  });
