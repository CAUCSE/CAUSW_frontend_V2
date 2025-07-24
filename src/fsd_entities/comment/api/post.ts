import { API } from '@/fsd_shared';

import type {
  LikeChildCommentParam,
  LikeCommentParam,
  PostChildCommentRequestDto,
  PostCommentRequestDto,
  SubscribeCommentParam,
} from '../type';

export const subscribeComment = async (param: SubscribeCommentParam) => {
  return await API.post(`/api/v1/comments/subscribe/${param.commentId}`);
};

export const likeComment = async (param: LikeCommentParam) => {
  return await API.post(`/api/v1/comments/${param.commentId}/like`);
};

export const likeChildComment = async (param: LikeChildCommentParam) => {
  return await API.post(`/api/v1/child-comments/${param.childCommentId}/like`);
};

export const postComment = async (dto: PostCommentRequestDto) => {
  return await API.post(`/api/v1/comments`, dto);
};

export const postChildComment = async (dto: PostChildCommentRequestDto) => {
  return await API.post(`/api/v1/child-comments`, dto);
};
