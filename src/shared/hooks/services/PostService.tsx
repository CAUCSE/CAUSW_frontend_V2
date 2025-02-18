import { API, postQueryKey } from "@/shared";

import { useInfiniteQuery } from "@tanstack/react-query";

export const PostService = () => {
  const useGetPostList = (boardId) => {
    return useInfiniteQuery({
      queryKey: postQueryKey.list(boardId),
      queryFn: async ({ pageParam }) => {
        const { data }: { data: Board.BoardWithPostResponseDto } =
          await API.get(
            `/api/v1/posts?boardId=${boardId}&pageNum=${pageParam}`,
          );
        return data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.post.last ? null : lastPage.post.number + 1;
      },
      select: (data) => {
        return data.pages.flatMap((page) => page.post.content);
      },
    });
  };

  const useGetSearchPostList = (
    boardId: string,
    keyword: string,
    isSearch: boolean,
  ) => {
    return useInfiniteQuery({
      queryKey: postQueryKey.searchResult(boardId, keyword),
      queryFn: async ({ pageParam }) => {
        const { data }: { data: Board.BoardWithPostResponseDto } =
          await API.get(
            `/api/v1/posts/search?boardId=${boardId}&keyword=${encodeURIComponent(keyword)}&pageNum=${pageParam}`,
          );
        return data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.post.last ? null : lastPage.post.number + 1;
      },
      select: (data) => {
        return data.pages.flatMap((page) => page.post.content);
      },
      enabled: isSearch && keyword !== "",
    });
  };

  return { useGetPostList, useGetSearchPostList };
};
