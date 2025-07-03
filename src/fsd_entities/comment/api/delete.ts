import { API } from '@/shared';

import type { DeleteChildCommentParam, DeleteCommentParam, UnsubscribeCommentParam } from '../type';

export const deleteComment = async (param: DeleteCommentParam) => {
  return await API.delete(`/api/v1/comments/${param.commentId}`);
};

export const deleteChildComment = async (param: DeleteChildCommentParam) => {
  return await API.delete(`/api/v1/child-comments/${param.childCommentId}`);
};

export const unsubscribeComment = async (param: UnsubscribeCommentParam) => {
  return await API.delete(`/api/v1/comments/subscribe/${param.commentId}`);
};
