import { API, postQueryKey } from "@/shared";

import { useInfiniteQuery } from "@tanstack/react-query";

export const PostService = () => {
  const useGetPostList = (boardId) => {
    return useInfiniteQuery({
      queryKey: postQueryKey.list(boardId),
      queryFn: async ({ pageParam }) => {
        console.log(`pageParam`, pageParam);
        const { data }: { data: Board.BoardWithPostResponseDto } =
          await API.get(
            `/api/v1/posts?boardId=${boardId}&pageNum=${pageParam}`,
          );
        return data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.post.totalPages - 1 === lastPage.post.number
          ? null
          : lastPage.post.number + 1;
      },
      select: (data) => {
        return data.pages.flatMap((page) => page.post.content);
      },
    });
  };

  return { useGetPostList };
};
