import { useInfiniteQuery } from '@tanstack/react-query';

import { contactQueryKey, getAllContacts } from '@/entities/contact';

export const useGetAllContactsQuery = () =>
  useInfiniteQuery({
    queryKey: contactQueryKey.list(),
    queryFn: ({ pageParam = 0 }) => getAllContacts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
  });
