'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getAdminCeremonyAwaitList } from '@/fsd_entities/ceremony';

import { ceremonyQueryKey } from './ceremonyQueryKey';

export const useAdminCeremonyAwaitListQuery = () => {
  return useInfiniteQuery({
    queryKey: ceremonyQueryKey.awaitList(),
    queryFn: ({ pageParam = 0 }) => getAdminCeremonyAwaitList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.content),
  });
};
