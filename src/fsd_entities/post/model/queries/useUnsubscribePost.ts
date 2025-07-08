'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { unsubscribePost } from '../../api';
import { postQueryKey } from '../../config';

export const useUnsubscribePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: Post.PostDto['id'] }) => unsubscribePost({ postId }),
    onSuccess: ({ postId }) => {
      queryClient.invalidateQueries({ queryKey: postQueryKey.detail({ postId }) });
    },
    onError: () => {
      toast.error('게시글 알림 끄기에 실패했습니다.');
    },
  });
};
