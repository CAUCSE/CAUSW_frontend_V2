'use client';

import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { likeChildComment } from '../../api';
import { unLikeChildComment } from '../../api/delete';
import { commentQueryKey } from '../../config';

export const useToggleLikeChildComment = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams() as { postId: string };

  return useMutation({
    mutationFn: async ({
      childCommentId,
      isChildCommentLike,
    }: {
      childCommentId: string;
      isChildCommentLike: boolean;
    }) => {
      if (isChildCommentLike) {
        await unLikeChildComment(childCommentId);
      } else {
        await likeChildComment(childCommentId);
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
          error.response?.data.message ?? '댓글 좋아요에 실패했습니다.',
        );
        return;
      }
      toast.error('댓글 좋아요 실패');
    },
  });
};
