'use client';

import { useMutation } from '@tanstack/react-query';

import { LikeCommentParam } from '@/fsd_entities/comment/type';

import { likeComment } from '../../api';

export const useLikeComment = () => {
  return useMutation({
    mutationFn: ({ param }: { param: LikeCommentParam }) => likeComment(param),
  });
};
