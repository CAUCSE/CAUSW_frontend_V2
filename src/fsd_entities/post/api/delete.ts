import { API } from '@/shared';

export const deletePost = async ({ postId }: { postId: Post.PostDto['id'] }) => {
  return await API.delete(`/api/v1/posts/${postId}`);
};

export const unsubscribePost = async ({ postId }: { postId: Post.PostDto['id'] }) => {
  const { data }: { data: Post.PostSubscribeResponseDto } = await API.delete(`/api/v1/posts/subscribe/${postId}`);
  return data;
};
