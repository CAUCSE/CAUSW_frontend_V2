import { useQuery } from '@tanstack/react-query';

import { API, boardQueryKey } from '@/shared';

export const BoardService = () => {
  const useGetBoardName = (boardId: string) => {
    return useQuery({
      queryKey: boardQueryKey.name(boardId),
      queryFn: async () => {
        const { data }: { data: Board.BoardWithPostResponseDto } = await API.get(
          `/api/v1/posts?boardId=${boardId}&pageNum=0`,
        );
        return data;
      },
      select: data => {
        return data.boardName;
      },
    });
  };
  return { useGetBoardName };
};
