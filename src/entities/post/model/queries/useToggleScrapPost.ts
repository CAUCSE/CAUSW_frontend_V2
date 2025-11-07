'use client';

import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { scrapPost, unSrapPost } from '../../api';
import { postQueryKey } from '../../config';

export const useToggleScrapPost = () => {
  const queryClient = useQueryClient();
  const { boardId } = useParams() as { boardId: string };

  return useMutation({
    mutationFn: async ({
      postId,
      isPostFavorite,
    }: {
      postId: Post.PostDto['id'];
      isPostFavorite: boolean;
    }) => {
      if (isPostFavorite) {
        await unSrapPost({ postId });
      } else {
        await scrapPost({ postId });
      }
      return { postId };
    },
    onSuccess: ({ postId }) => {
      queryClient.invalidateQueries({
        queryKey: postQueryKey.detail({ postId }),
      });
      queryClient.invalidateQueries({ queryKey: postQueryKey.list(boardId) });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message ?? '즐겨찾기 관련 에러가 발생했습니다.',
        );
        return;
      }
      toast.error('즐겨찾기 관련 에러가 발생했습니다.');
    },
  });
};
