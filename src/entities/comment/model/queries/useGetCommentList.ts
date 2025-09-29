'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getCommentList } from '../../api';
import { commentQueryKey } from '../../config';

export const useGetCommentList = ({ postId }: { postId: Post.PostDto['id'] }) => {
  return useInfiniteQuery({
    queryKey: commentQueryKey.list({ postId }),
    queryFn: ({ pageParam = 0 }) => {
      return getCommentList({ postId, pageNum: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.content);
    },
  });
};
