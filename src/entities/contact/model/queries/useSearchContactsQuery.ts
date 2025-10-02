import { useInfiniteQuery } from '@tanstack/react-query';

import { contactQueryKey, getContacts } from '@/entities/contact';

// 타입 import

/**
 * 동문수첩 목록을 무한 스크롤로 조회하는 훅
 * @param filters - 검색어 및 필터 조건 객체
 */
export const useSearchContactsQuery = (filters: Contact.ContactFilters) => {
  return useInfiniteQuery({
    queryKey: contactQueryKey.list(filters),
    queryFn: ({ pageParam = 0 }) =>
      getContacts({ pageNum: pageParam, filters }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
  });
};
