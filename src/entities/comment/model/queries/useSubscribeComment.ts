'use client';

import { useMutation } from '@tanstack/react-query';

import { subscribeComment } from '../../api';
import type { SubscribeCommentParam } from '../../type';

export const useSubscribeComment = () => {
  return useMutation({
    mutationFn: ({ param }: { param: SubscribeCommentParam }) => subscribeComment(param),
  });
};
