'use client';

import { useMutation } from '@tanstack/react-query';

import { LikeChildCommentParam } from '@/fsd_entities/comment/type';

import { likeChildComment } from '../../api';

export const useLikeChildComment = () => {
  return useMutation({
    mutationFn: ({ param }: { param: LikeChildCommentParam }) => likeChildComment(param),
  });
};
