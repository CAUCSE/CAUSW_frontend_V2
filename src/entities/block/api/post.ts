import type { AxiosResponse } from 'axios';

import { API } from '@/shared';

export type BlockRes = { message: string };

// 📌 게시글 차단
export const blockByPost = async (postId: string) => {
  const res: AxiosResponse<BlockRes> = await API.post(`/api/v1/blocks/by-post/${postId}`);
  return res.data;
};

// 📌 댓글 차단
export const blockByComment = async (commentId: string) => {
  const res: AxiosResponse<BlockRes> = await API.post(`/api/v1/blocks/by-comment/${commentId}`);
  return res.data;
};

// 📌 대댓글 차단
export const blockByChildComment = async (childCommentId: string) => {
  const res: AxiosResponse<BlockRes> = await API.post(`/api/v1/blocks/by-child-comment/${childCommentId}`);
  return res.data;
};
