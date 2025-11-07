'use client';

import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { likeComment, unLikeComment } from '../../api';
import { commentQueryKey } from '../../config';

export const useToggleLikeComment = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams() as { postId: string };
  return useMutation({
    mutationFn: async ({
      commentId,
      isCommentLike,
    }: {
      commentId: string;
      isCommentLike: boolean;
    }) => {
      if (isCommentLike) {
        await unLikeComment(commentId);
      } else {
        await likeComment({ commentId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentQueryKey.list({ postId }),
      });
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message ??
            '댓글 좋아요 관련 에러가 발생했습니다.',
        );
        return;
      }
      toast.error('댓글 좋아요 관련 에러가 발생했습니다.');
    },
  });
};
