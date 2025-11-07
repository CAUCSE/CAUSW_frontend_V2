'use client';

import { useMutation } from '@tanstack/react-query';

import { deleteChildComment } from '../../api';
import type { DeleteChildCommentParam } from '../../type';

export const useDeleteChildComment = () => {
  return useMutation({
    mutationFn: ({ param }: { param: DeleteChildCommentParam }) =>
      deleteChildComment(param),
  });
};
