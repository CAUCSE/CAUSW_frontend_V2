'use client';

import { useMutation } from '@tanstack/react-query';

import { unsubscribeComment } from '../../api';
import type { UnsubscribeCommentParam } from '../../type';

export const useUnsubscribeComment = () => {
  return useMutation({
    mutationFn: ({ param }: { param: UnsubscribeCommentParam }) =>
      unsubscribeComment(param),
  });
};
