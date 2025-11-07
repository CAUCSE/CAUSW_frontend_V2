import { useInfiniteQuery } from '@tanstack/react-query';

import { formQueryKey } from '@/entities/form/config';

import { getFormResults } from '../../api';

export const useGetFormTotalResult = (formId: string, size: number) => {
  return useInfiniteQuery({
    queryKey: formQueryKey.totalResult(formId),
    queryFn: async ({ pageParam }) => {
      return getFormResults(formId, pageParam, size);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.replyResponseDtoPage.last
        ? null
        : lastPage.replyResponseDtoPage.pageable.pageNumber + 1;
    },
    select: (results) => {
      return results.pages.flatMap((result) => result);
    },
  });
};
