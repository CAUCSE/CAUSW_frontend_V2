'use client';

import { useMutation } from '@tanstack/react-query';

import { postChildComment } from '../../api';
import type { PostChildCommentRequestDto } from '../../type';

export const usePostChildComment = () => {
  return useMutation({
    mutationFn: ({ dto }: { dto: PostChildCommentRequestDto }) => postChildComment(dto),
  });
};
