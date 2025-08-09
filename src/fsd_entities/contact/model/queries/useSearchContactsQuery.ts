import { useInfiniteQuery } from '@tanstack/react-query';
import { getContacts, contactQueryKey } from '@/fsd_entities/contact';

/**
 * 동문수첩 목록을 무한 스크롤로 조회하는 훅
 * @param keyword - 검색어
 */
export const useSearchContactsQuery = (keyword?: string) => {
  return useInfiniteQuery({
    queryKey: contactQueryKey.list(keyword),
    queryFn: ({ pageParam = 0 }) => getContacts({ pageNum: pageParam, keyword }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
  });
};
