import { API } from '@/shared';

export const getPostList = async ({ boardId, pageNum }: { boardId: string; pageNum: number }) => {
  const { data }: { data: Board.BoardWithPostResponseDto } = await API.get(
    `api/v1/posts?boardId=${boardId}&pageNum=${pageNum}`,
  );
  return data;
};
