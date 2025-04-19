import { BASEURL, setRscHeader } from '@/fsd_shared';
import { API } from '@/shared';

export const getPostList = async ({ boardId, pageNum }: { boardId: string; pageNum: number }) => {
  const { data }: { data: Board.BoardWithPostResponseDto } = await API.get(
    `api/v1/posts?boardId=${boardId}&pageNum=${pageNum}`,
  );
  return data;
};

export const getSearchPostList = async ({
  boardId,
  keyword,
  pageNum,
}: {
  boardId: string;
  keyword: string;
  pageNum: number;
}) => {
  const { data }: { data: Board.BoardWithPostResponseDto } = await API.get(
    `/api/v1/posts/search?boardId=${boardId}&keyword=${encodeURIComponent(keyword)}&pageNum=${pageNum}`,
  );
  return data;
};

export const getPostListServer = async (boardId: string, page: number) => {
  const headers = await setRscHeader();
  const response = fetch(`${BASEURL}/api/v1/posts?boardId=${boardId}&pageNum=${page}`, {
    headers,
    cache: 'no-store',
  }).then(res => res.json());
  return response;
};
