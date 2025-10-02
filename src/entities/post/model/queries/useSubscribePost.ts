'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { subscribePost } from '../../api';
import { postQueryKey } from '../../config';

export const useSubscribePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: { postId: Post.PostDto['id'] }) =>
      subscribePost({ postId }),
    onSuccess: ({ postId }) => {
      queryClient.invalidateQueries({
        queryKey: postQueryKey.detail({ postId }),
      });
    },
    onError: () => {
      toast.error('게시글 알림 켜기에 실패했습니다.');
    },
  });
};
