'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getSearchPostList } from '../../api';
import { postQueryKey } from '../../config';

interface UseGetPostSearchListProps {
  boardId: string;
  keyword: string;
  isSearch: boolean;
}

export const useGetPostSearchList = ({ boardId, keyword, isSearch }: UseGetPostSearchListProps) => {
  return useInfiniteQuery({
    queryKey: postQueryKey.searchResult(boardId, keyword),
    queryFn: async ({ pageParam }) => getSearchPostList({ boardId, keyword, pageNum: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.post.last ? null : lastPage.post.number + 1;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.post.content);
    },
    enabled: isSearch && keyword !== '',
    staleTime: 0,
    gcTime: 0,
  });
};
