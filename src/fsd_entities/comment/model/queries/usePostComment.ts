'use client';

import { useMutation } from '@tanstack/react-query';

import { postComment } from '../../api';
import type { PostCommentRequestDto } from '../../type';

export const usePostComment = () => {
  return useMutation({
    mutationFn: ({ dto }: { dto: PostCommentRequestDto }) => postComment(dto),
  });
};
