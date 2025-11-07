'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { postChildComment } from '../../api';
import { commentQueryKey } from '../../config';
import type { PostChildCommentRequestDto } from '../../type';

export const usePostChildComment = ({
  setChildCommentActiveId,
  setCommentContent,
  postId,
}: Comment.PostChildCommentProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dto }: { dto: PostChildCommentRequestDto }) =>
      postChildComment(dto),
    onMutate: () => {
      return toast.loading('로딩 중...');
    },
    onSuccess: (data, variables, context) => {
      toast.dismiss(context);

      queryClient.invalidateQueries({
        queryKey: commentQueryKey.list({ postId }),
      });
      setChildCommentActiveId(undefined);
      setCommentContent('');
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message ?? '댓글 작성에 실패했습니다.',
        );
        return;
      }
      toast.error('댓글 작성에 실패했습니다.');
    },
  });
};
