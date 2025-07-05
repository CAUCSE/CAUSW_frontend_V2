'use client';

import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { likePost } from '../../api';
import { postQueryKey } from '../../config';

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const { boardId } = useParams() as { boardId: string };

  return useMutation({
    mutationFn: async ({ postId }: { postId: Post.PostDto['id'] }) => {
      await likePost({ postId });
      return { postId };
    },
    onSuccess: ({ postId }) => {
      queryClient.invalidateQueries({ queryKey: postQueryKey.detail({ postId }) });
      queryClient.invalidateQueries({ queryKey: postQueryKey.list(boardId) });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message ?? '게시글 좋아요 도중 에러가 발생했습니다.');
      }
      toast.error('게시글 좋아요 도중 에러가 발생했습니다.');
    },
  });
};
