import { useInfiniteQuery } from '@tanstack/react-query';
import { getCeremonyData, CeremonyState } from '@/fsd_entities/notification/api';

export const useCeremonyListQuery = (ceremonyState: CeremonyState) => {
  return useInfiniteQuery<Notification.NotificationResponse, Error, Notification.NotificationResponse, [string, string], number>({
    queryKey: ['ceremonies', ceremonyState],
    queryFn: ({ pageParam = 0 }) => getCeremonyData(ceremonyState, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    staleTime: 0,
  });
};
