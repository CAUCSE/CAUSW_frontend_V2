'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getPostList } from '../../api';
import { postQueryKey } from '../../config';

export const useGetPostList = ({
  boardId,
  keyword,
}: {
  boardId: string;
  keyword?: string;
}) => {
  return useInfiniteQuery({
    queryKey: postQueryKey.list(boardId, keyword),
    queryFn: async ({ pageParam }) => {
      return await getPostList({ boardId, pageNum: pageParam, keyword });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.post.last ? null : lastPage.post.number + 1;
    },
    select: (data) => {
      const { post: _post, ...rest } = data.pages[0];
      return {
        ...rest,
        postList: data.pages.flatMap((page) => page.post.content),
      };
    },
    placeholderData: (previousData) => previousData,
  });
};
