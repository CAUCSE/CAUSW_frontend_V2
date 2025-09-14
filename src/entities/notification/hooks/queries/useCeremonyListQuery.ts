'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { CeremonyState } from '@/fsd_widgets/ceremony';
import { ceremonyQueryKey } from './ceremonyQueryKey';
import { getCeremonyData } from '@/entities/notification';

export const useCeremonyListQuery = (ceremonyState: CeremonyState) => {
  return useInfiniteQuery({
    queryKey: ceremonyQueryKey.list(ceremonyState),
    queryFn: ({ pageParam = 0 }) => getCeremonyData(ceremonyState, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.content),
  });
};
