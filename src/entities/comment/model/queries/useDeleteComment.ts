'use client';

import { useMutation } from '@tanstack/react-query';

import { deleteComment } from '../../api';
import type { DeleteCommentParam } from '../../type';

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: ({ param }: { param: DeleteCommentParam }) => deleteComment(param),
  });
};
