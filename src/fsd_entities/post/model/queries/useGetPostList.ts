'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getPostList } from '../../api';
import { postQueryKey } from '../../config';

export const useGetPostList = ({ boardId }: { boardId: string }) => {
  return useInfiniteQuery({
    queryKey: postQueryKey.list(boardId),
    queryFn: async ({ pageParam }) => {
      return await getPostList({ boardId, pageNum: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.post.last ? null : lastPage.post.number + 1;
    },
    select: (data) => {
      const { post, ...rest } = data.pages[0];
      return { ...rest, postList: data.pages.flatMap((page) => page.post.content) };
    },
  });
};
