import { BASEURL, setRscHeader } from '@/shared';
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
  const response = await fetch(`${BASEURL}/api/v1/posts?boardId=${boardId}&pageNum=${page}`, {
    headers,
    cache: 'no-store',
  }).then((res) => res.json());
  return response;
};

export const getPostDetail = async ({ postId }: { postId: string }) => {
  try {
    const { data }: { data: Post.PostDto } = await API.get(`/api/v1/posts/${postId}`);
    return { data, deleted: false };
  } catch (err: any) {
    if (err.response?.data?.errorCode === 4004) {
      return { data: null, deleted: true };
    }
    throw err;
  }
};
