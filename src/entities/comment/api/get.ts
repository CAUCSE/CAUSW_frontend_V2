import { GetCommentListQuery } from '@/entities/comment/type';

import { API } from '@/fsd_shared';

export const getCommentList = async (query: GetCommentListQuery) => {
  const { data }: { data: Comment.GetCommentListResponseDto } = await API.get(`/api/v1/comments`, {
    params: {
      postId: query.postId,
      pageNum: query.pageNum,
    },
  });

  return data;
};
