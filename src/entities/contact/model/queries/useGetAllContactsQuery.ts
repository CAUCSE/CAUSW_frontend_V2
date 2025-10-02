import { useInfiniteQuery } from '@tanstack/react-query';

import { contactQueryKey, getContacts } from '@/entities/contact';

export const useGetAllContactsQuery = () =>
  useInfiniteQuery({
    queryKey: contactQueryKey.list({}),
    queryFn: ({ pageParam = 0 }) =>
      getContacts({ pageNum: pageParam, filters: {} }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
  });
