'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { CeremonyState } from '@/fsd_widgets/ceremony';

import { ceremonyQueryKey } from '@/fsd_shared';

import { getCeremonyData } from '../../api';

export const useCeremonyListQuery = (ceremonyState: CeremonyState) => {
  return useInfiniteQuery({
    queryKey: ceremonyQueryKey.list(ceremonyState),
    queryFn: ({ pageParam = 0 }) => getCeremonyData(ceremonyState, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
  });
};
